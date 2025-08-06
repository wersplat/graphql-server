import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import resolvers
import { userResolvers } from './resolvers/user';
import { matchResolvers } from './resolvers/match';

// Import types
import { User, Player } from './types/User';
import { Match, Team, Event, PlayerMatchStats } from './types/Match';

// Load GraphQL schema
const typeDefs = readFileSync(join(__dirname, 'schema.graphql'), 'utf8');

// Merge resolvers
const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...matchResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...matchResolvers.Mutation
  },
  User: userResolvers.User,
  Player: userResolvers.Player,
  Match: matchResolvers.Match
};

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
  }
};

// CORS configuration
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || [
    'https://dashboard.bodegacatsgc.gg',
    'https://admin.bodegacatsgc.gg',
    'https://global.bodegacatsgc.gg'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

async function startServer() {
  console.log('🚀 Starting Bodega Cats GC GraphQL Server...');
  console.log('📊 Environment:', process.env.NODE_ENV || 'development');
  console.log('🔧 Port:', process.env.PORT || 4000);
  
  // Check required environment variables
  const requiredEnvVars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:', missingEnvVars);
    console.error('Please set the following environment variables:');
    missingEnvVars.forEach(varName => console.error(`  - ${varName}`));
    process.exit(1);
  }
  
  console.log('✅ Environment variables validated');
  
  const app = express();
  const httpServer = http.createServer(app);

  // Security middleware
  app.use(helmet({
    contentSecurityPolicy: false, // Disable CSP for GraphQL playground
    crossOriginEmbedderPolicy: false
  }));

  // CORS middleware
  app.use(cors(corsOptions));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers: {
      ...resolvers,
      ...scalarResolvers
    },
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
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
    introspection: true
  });

  // Start the server
  try {
    await server.start();
    console.log('✅ Apollo Server started successfully');
  } catch (error) {
    console.error('❌ Failed to start Apollo Server:', error);
    throw error;
  }

  // Apply Apollo middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        // Add authentication context here if needed
        return {
          user: req.headers.authorization ? { id: '1', isAdmin: true } : null,
          headers: req.headers
        };
      }
    })
  );

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