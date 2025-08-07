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
      },
      documentation: 'Visit /graphql for the GraphQL Playground',
    });
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
