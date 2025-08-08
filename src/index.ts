import { ApolloServer } from '@apollo/server';
import responseCachePlugin from '@apollo/server-plugin-response-cache';
import { ApolloServerPluginCacheControl } from '@apollo/server/plugin/cacheControl';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageProductionDefault } from '@apollo/server/plugin/landingPage/default';
import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';
import type { GraphQLContext } from './types/Context';
import depthLimit from 'graphql-depth-limit';
import { getComplexity, fieldExtensionsEstimator, simpleEstimator } from 'graphql-query-complexity';
import * as Sentry from '@sentry/node';

// Load environment variables
dotenv.config();

// Import clean resolvers
import { cleanResolvers } from './resolvers/clean-resolvers';

// Import types
import { User, Player } from './types/User';
import { Match, Team, Event, PlayerMatchStats } from './types/Match';

// Load GraphQL schema
const typeDefs = readFileSync(join(__dirname, 'schema-clean.graphql'), 'utf8');

// Use clean resolvers
const resolvers = cleanResolvers;

// Custom scalar resolvers
const scalarResolvers = {
  DateTime: {
    __serialize(value: any) {
      if (value instanceof Date) {
        return value.toISOString();
      }
      return value;
    },
    __parseValue(value: any) {
      return new Date(value);
    },
    __parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return new Date(ast.value);
      }
      return null;
    }
  },
  UUID: {
    __serialize(value: any) {
      return value;
    },
    __parseValue(value: any) {
      return value;
    },
    __parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return ast.value;
      }
      return null;
    }
  },
  JSON: {
    __serialize(value: any) {
      return value;
    },
    __parseValue(value: any) {
      return value;
    },
    __parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return JSON.parse(ast.value);
      }
      return null;
    }
  },
  BigInt: {
    __serialize(value: any) {
      return value;
    },
    __parseValue(value: any) {
      return value;
    },
    __parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return ast.value;
      }
      return null;
    }
  },
  BigFloat: {
    __serialize(value: any) {
      return value;
    },
    __parseValue(value: any) {
      return value;
    },
    __parseLiteral(ast: any) {
      if (ast.kind === 'StringValue') {
        return ast.value;
      }
      return null;
    }
  }
};

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [
    'https://dashboard.bodegacatsgc.gg',
    'https://admin.bodegacatsgc.gg',
    'https://global.bodegacatsgc.gg',
    'https://graphql.bodegacatsgc.gg',
    'https://studio.apollographql.com',
    'http://localhost:3000',
    'http://localhost:4000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'apollo-require-preflight',
    'x-apollo-operation-name',
    'x-apollo-operation-type'
  ]
};

async function startServer() {
  console.log('🚀 Starting Bodega Cats GC GraphQL Server...');
  console.log('📊 Environment:', process.env.NODE_ENV || 'development');
  console.log('🔧 Port:', process.env.PORT || 4000);
  if (process.env.SENTRY_DSN) {
    Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 0.1 });
  }
  
  // Check required environment variables
  const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'DATA_BASE_URL', 'ADMIN_BASE_URL'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars);
    console.error('Please set the following environment variables:');
    missingEnvVars.forEach(varName => console.error(`  - ${varName}`));
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated');
  if (!process.env.ADMIN_API_TOKEN && !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.warn('ℹ️ Neither ADMIN_API_TOKEN nor SUPABASE_SERVICE_ROLE_KEY is set. Admin mutations may fail.');
  }
  
  const app = express();
  const httpServer = http.createServer(app);

  // Security middleware
  app.use(helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'", 
          "'unsafe-inline'", 
          "'unsafe-eval'",
          "https://embeddable-sandbox.cdn.apollographql.com",
          "https://apollo-server-landing-page.cdn.apollographql.com"
        ],
        styleSrc: [
          "'self'", 
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://apollo-server-landing-page.cdn.apollographql.com"
        ],
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com"
        ],
        imgSrc: [
          "'self'", 
          "data:", 
          "https:",
          "https://apollo-server-landing-page.cdn.apollographql.com"
        ],
        connectSrc: [
          "'self'",
          "https://apollo-server-landing-page.cdn.apollographql.com",
          "https://sandbox.embed.apollographql.com"
        ],
        frameSrc: [
          "'self'",
          "https://sandbox.embed.apollographql.com"
        ],
        manifestSrc: [
          "'self'",
          "https://apollo-server-landing-page.cdn.apollographql.com"
        ],
      },
    },
  }));

  // CORS middleware
  app.use(cors(corsOptions));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Serve static files
  app.use(express.static(join(__dirname, '../public')));

  // Handle malformed URI requests
  app.use((req, res, next) => {
    try {
      // This will throw an error if the URL is malformed
      decodeURIComponent(req.url);
      next();
    } catch (error) {
      console.warn('Malformed URI request:', req.url);
      res.status(400).json({
        error: 'Bad Request',
        message: 'Invalid URL format'
      });
    }
  });

  // Create Apollo Server
  const server = new ApolloServer<GraphQLContext>({
    typeDefs,
    resolvers: {
      ...resolvers,
      ...scalarResolvers
    },
    cache: 'bounded',
    validationRules: [depthLimit(10)],
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageProductionDefault(),
      ApolloServerPluginCacheControl({ defaultMaxAge: 60, calculateHttpHeaders: true }),
      responseCachePlugin(),
      {
        async requestDidStart() {
          return {
            async didResolveOperation(requestContext) {
              try {
                const complexity = getComplexity({
                  schema: requestContext.schema,
                  operationName: requestContext.request.operationName || undefined,
                  query: requestContext.document!,
                  variables: requestContext.request.variables,
                  estimators: [
                    fieldExtensionsEstimator(),
                    simpleEstimator({ defaultComplexity: 1 }),
                  ],
                });
                const maxComplexity = 2000; // conservative default
                if (complexity > maxComplexity) {
                  throw new Error(`Query is too complex: ${complexity}. Max allowed: ${maxComplexity}`);
                }
              } catch (err) {
                // Re-throw to abort
                throw err as Error;
              }
            },
          };
        },
      },
    ],
    formatError: (formattedError, error) => {
      console.error('GraphQL Error:', formattedError);
      return {
        ...formattedError,
        extensions: {
          ...formattedError.extensions,
          code: formattedError.extensions?.code || 'INTERNAL_SERVER_ERROR'
        }
      };
    },
    introspection: true,
    csrfPrevention: process.env.NODE_ENV === 'production' ? {
      requestHeaders: ['content-type', 'x-apollo-operation-name', 'apollo-require-preflight']
    } : false
  });

  // Start the server
  try {
    await server.start();
    console.log('✅ Apollo Server started successfully');
  } catch (error) {
    console.error('❌ Failed to start Apollo Server:', error);
    throw error;
  }

  // Gate GET /graphql so only admins see landing page (otherwise 404 to hide surface)
  const { parseAuth } = await import('./auth');
  app.use('/graphql', async (req, res, next) => {
    if (req.method === 'GET') {
      const auth = await parseAuth(req.headers.authorization);
      if (auth.role !== 'admin') {
        res.status(404).end();
        return;
      }
    }
    return next();
  });

  // Block POST introspection for non-admins
  app.use('/graphql', async (req, res, next) => {
    if (req.method === 'POST') {
      try {
        const query = typeof req.body?.query === 'string' ? req.body.query : '';
        if (query.includes('__schema') || query.includes('__type')) {
          const auth = await parseAuth(req.headers.authorization);
          if (auth.role !== 'admin') {
            res.status(403).json({ error: 'Forbidden' });
            return;
          }
        }
      } catch {
        // fallthrough
      }
    }
    return next();
  });

  // Apply Apollo middleware for /graphql
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const { parseAuth } = await import('./auth');
        const { supabaseForRequest, pgGraphQLFetch, dataBackend, adminBackend } = await import('./gateways');
        const { createLoaders } = await import('./loaders');
        const auth = await parseAuth(req.headers.authorization);
        const ctx: GraphQLContext = {
          ...auth,
          supabase: supabaseForRequest(auth),
          pg: pgGraphQLFetch(auth),
          dataApi: dataBackend(auth),
          adminApi: adminBackend(auth),
          headers: req.headers,
          loaders: createLoaders(auth),
        };
        return ctx;
      }
    })
  );

  // Serve Apollo Studio Explorer
  app.get('/studio', (req, res) => {
    res.redirect('https://studio.apollographql.com/sandbox/explorer?endpoint=' + encodeURIComponent(req.protocol + '://' + req.get('host') + '/graphql'));
  });

  // Sentry test endpoint (non-auth)
  app.get('/sentry-test', (_req, res) => {
    try {
      Sentry.captureException(new Error('Sentry setup ping (server endpoint)'));
      res.status(202).json({ ok: true });
    } catch {
      res.status(500).json({ ok: false });
    }
  });

  // Serve GraphQL Playground at root
  app.get('/', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Bodega Cats GC GraphQL API</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 20px;
              background: #f5f5f5;
            }
            .container {
              max-width: 1200px;
              margin: 0 auto;
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              overflow: hidden;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 20px;
              text-align: center;
            }
            .content {
              padding: 20px;
            }
            .endpoints {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 20px;
              margin: 20px 0;
            }
            .endpoint {
              background: #f8f9fa;
              padding: 15px;
              border-radius: 6px;
              border-left: 4px solid #667eea;
            }
            .endpoint h3 {
              margin: 0 0 10px 0;
              color: #333;
            }
            .endpoint a {
              color: #667eea;
              text-decoration: none;
              font-weight: 500;
            }
            .endpoint a:hover {
              text-decoration: underline;
            }
            .status {
              background: #e8f5e8;
              color: #2d5a2d;
              padding: 10px;
              border-radius: 4px;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🏀 Bodega Cats GC GraphQL API</h1>
              <p>Unified API for admin and public frontends</p>
            </div>
            <div class="content">
              <div class="status">
                ✅ Server is running and healthy
              </div>
              
              <h2>Available Endpoints</h2>
              <div class="endpoints">
                <div class="endpoint">
                  <h3>GraphQL Explorer</h3>
                  <p>Interactive GraphQL playground with schema documentation</p>
                  <a href="/graphql" target="_blank">Open GraphQL Explorer →</a>
                </div>
                <div class="endpoint">
                  <h3>Apollo Studio</h3>
                  <p>Advanced GraphQL IDE with full schema exploration</p>
                  <a href="/studio" target="_blank">Open Apollo Studio →</a>
                </div>
                <div class="endpoint">
                  <h3>Health Check</h3>
                  <p>Server health and status information</p>
                  <a href="/health" target="_blank">Check Health →</a>
                </div>
                <div class="endpoint">
                  <h3>API Test</h3>
                  <p>Basic API functionality test</p>
                  <a href="/test" target="_blank">Run Test →</a>
                </div>
              </div>
              
              <h2>Quick Start</h2>
              <p>Click on "GraphQL Explorer" above to start exploring the API with the interactive playground.</p>
              
              <h2>API Documentation</h2>
              <p>This GraphQL API provides unified access to:</p>
              <ul>
                <li><strong>Users & Players:</strong> User accounts and player profiles with gaming statistics</li>
                <li><strong>Matches:</strong> Competitive matches between teams with detailed statistics</li>
                <li><strong>Teams:</strong> Team information and rosters</li>
                <li><strong>Events:</strong> Tournaments and leagues</li>
                <li><strong>Player Stats:</strong> Detailed player performance data</li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    `);
  });

  // Health check endpoint
  app.get('/health', (req, res) => {
    console.log('🏥 Health check requested');
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0'
    });
  });

  // Simple test endpoint
  app.get('/test', (req, res) => {
    console.log('🧪 Test endpoint requested');
    res.json({
      message: 'Server is running!',
      timestamp: new Date().toISOString(),
      env: {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT,
        SUPABASE_URL: process.env.SUPABASE_URL ? 'SET' : 'NOT_SET'
      }
    });
  });



  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Express Error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`
    });
  });

  const port = process.env.PORT || 4000;

  // Start HTTP server
  try {
    await new Promise<void>((resolve, reject) => {
      httpServer.listen({ port }, () => {
        console.log('✅ HTTP server started successfully');
        resolve();
      });
      
      httpServer.on('error', (error) => {
        console.error('❌ HTTP server error:', error);
        reject(error);
      });
    });
  } catch (error) {
    console.error('❌ Failed to start HTTP server:', error);
    throw error;
  }

  console.log(`
🚀 Bodega Cats GC GraphQL Server is running!
📍 Server URL: http://localhost:${port}
🔍 GraphQL Playground: http://localhost:${port}/graphql
🏥 Health Check: http://localhost:${port}/health
📊 Environment: ${process.env.NODE_ENV || 'development'}
  `);

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await server.stop();
    httpServer.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });

  process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    await server.stop();
    httpServer.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 