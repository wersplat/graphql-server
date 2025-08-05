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
    introspection: process.env.NODE_ENV !== 'production'
  });

  // Start the server
  await server.start();

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

  // Health check endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Bodega Cats GC GraphQL API',
      version: '1.0.0',
      endpoints: {
        graphql: '/graphql',
        health: '/health'
      },
      documentation: 'Visit /graphql for the GraphQL playground'
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
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

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