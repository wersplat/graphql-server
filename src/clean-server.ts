import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { readFileSync } from 'fs';
import { join } from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import clean resolvers
import { cleanResolvers } from './resolvers/clean-resolvers';

// Load clean GraphQL schema
const typeDefs = readFileSync(join(__dirname, 'schema-clean.graphql'), 'utf8');

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

// Merge resolvers
const resolvers = {
  ...scalarResolvers,
  ...cleanResolvers
};

async function startCleanServer() {
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

  // CORS configuration
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
  }));

  // Body parsing middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Serve static files
  app.use(express.static(join(__dirname, '../public')));

  // Create Apollo Server with clean schema
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    formatError: (error) => {
      console.error('GraphQL Error:', error);
      return {
        message: error.message,
        path: error.path,
        extensions: {
          code: error.extensions?.code || 'INTERNAL_SERVER_ERROR',
        },
      };
    },
    introspection: process.env.NODE_ENV !== 'production',
  });

  await server.start();

  // Serve Apollo Studio Sandbox for GET requests to /graphql
  app.get('/graphql', (req, res) => {
    // Force HTTPS for production deployments
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : req.protocol;
    const endpoint = protocol + '://' + req.get('host') + '/graphql';
    const studioUrl = `https://studio.apollographql.com/sandbox/explorer?endpoint=${encodeURIComponent(endpoint)}`;
    
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GraphQL Explorer - Bodega Cats GC (Clean API)</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body {
              margin: 0;
              padding: 0;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: white;
              border-radius: 16px;
              padding: 40px;
              text-align: center;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              max-width: 500px;
              width: 90%;
            }
            .logo {
              font-size: 48px;
              margin-bottom: 20px;
            }
            h1 {
              color: #333;
              margin-bottom: 10px;
              font-size: 28px;
            }
            p {
              color: #666;
              margin-bottom: 30px;
              line-height: 1.6;
            }
            .btn {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 16px 32px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 600;
              font-size: 16px;
              transition: transform 0.2s, box-shadow 0.2s;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            .btn:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 25px rgba(102, 126, 234, 0.6);
            }
            .endpoint {
              background: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 8px;
              padding: 16px;
              margin-top: 20px;
              font-family: 'Monaco', 'Menlo', monospace;
              font-size: 14px;
              color: #495057;
              word-break: break-all;
            }
            .features {
              margin-top: 30px;
              text-align: left;
            }
            .features h3 {
              color: #333;
              margin-bottom: 15px;
            }
            .features ul {
              color: #666;
              line-height: 1.8;
              padding-left: 20px;
            }
            .clean-badge {
              background: #10b981;
              color: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 12px;
              font-weight: 600;
              margin-left: 8px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="logo">🏀</div>
            <h1>Bodega Cats GC GraphQL Explorer<span class="clean-badge">CLEAN API</span></h1>
            <p>Interactive GraphQL playground with simplified, flattened schema. No more verbose Relay-style queries!</p>
            
            <a href="${studioUrl}" target="_blank" class="btn">
              🚀 Open GraphQL Explorer
            </a>
            
            <div class="endpoint">
              <strong>Endpoint:</strong> ${endpoint}
            </div>
            
            <div class="features">
              <h3>Clean API Features:</h3>
              <ul>
                <li>✨ Simplified data access (no edges.node nesting)</li>
                <li>🎯 Clean field names (camelCase instead of snake_case)</li>
                <li>📄 Simple pagination (limit/offset instead of cursors)</li>
                <li>📚 Interactive schema documentation</li>
                <li>🔍 Query builder with autocomplete</li>
                <li>⚡ Real-time query execution</li>
                <li>📊 Results visualization</li>
                <li>💾 Query history and favorites</li>
              </ul>
            </div>
          </div>
        </body>
      </html>
    `);
  });

  // Apply Apollo Server middleware
  app.use('/graphql', expressMiddleware(server, {
    context: async ({ req }) => {
      // Add any context you need here (auth, etc.)
      return {
        req,
        // Add authentication context if needed
        // user: await getUserFromToken(req.headers.authorization),
      };
    },
  }));

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'clean-graphql-server',
      version: process.env.npm_package_version || '1.0.0',
    });
  });

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Bodega Cats GC Clean GraphQL API',
      version: process.env.npm_package_version || '1.0.0',
      endpoints: {
        graphql: '/graphql',
        health: '/health',
        studio: '/studio',
      },
      documentation: 'Visit /graphql for the GraphQL Playground',
    });
  });

  // Serve Apollo Studio Explorer
  app.get('/studio', (req, res) => {
    res.redirect('https://studio.apollographql.com/sandbox/explorer?endpoint=' + encodeURIComponent(req.protocol + '://' + req.get('host') + '/graphql'));
  });

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('Express error:', err);
    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
    });
  });

  // 404 handler
  app.use('*', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: `Route ${req.originalUrl} not found`,
    });
  });

  const port = process.env.PORT || 4000;

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  console.log(`🚀 Clean GraphQL Server ready at http://localhost:${port}`);
  console.log(`📊 GraphQL Playground available at http://localhost:${port}/graphql`);
  console.log(`🏥 Health check available at http://localhost:${port}/health`);

  // Graceful shutdown
  const gracefulShutdown = async () => {
    console.log('\n🛑 Received shutdown signal, closing server...');
    await server.stop();
    httpServer.close(() => {
      console.log('✅ Server closed gracefully');
      process.exit(0);
    });
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}

// Start the server
startCleanServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
