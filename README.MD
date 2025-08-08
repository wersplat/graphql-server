## Performance features

- Response caching enabled via plugin with bounded cache
- Cache-Control headers emitted (CDN-friendly)
- Depth limit and query complexity guard (max 2000)
- Per-request DataLoaders to reduce N+1s

## Automatic Persisted Queries (APQ)

The server supports APQ out of the box. To enable on the client:

```ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { createPersistedQueryLink } from '@apollo/client/link/persisted-queries';
import { sha256 } from 'crypto-hash';

const link = createPersistedQueryLink({ sha256, useGETForHashedQueries: true })
  .concat(new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_URL }));

export const client = new ApolloClient({ cache: new InMemoryCache(), link });
```

When `useGETForHashedQueries` is true, CDNs can cache GETs. Ensure your CDN honors origin Cache-Control headers.

## Structured logging & Sentry

Set `SENTRY_DSN` to enable error tracing. For structured logs, run behind a log collector and emit JSON from your hosting platform.

# Bodega Cats GC GraphQL Server

A clean, simplified GraphQL API that transforms the verbose Relay-style schema from Supabase's `pg_graphql` into a frontend-friendly interface.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase project with `pg_graphql` extension enabled

### Environment Setup
Create a `.env` file:
```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=4000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Installation & Development
```bash
# Install dependencies
npm install

# Start development server (Clean API)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📊 API Endpoints

- **GraphQL Playground**: `http://localhost:4000/graphql`
- **Health Check**: `http://localhost:4000/health`
- **API Info**: `http://localhost:4000/`

## 🎯 Clean GraphQL API Features

### ✅ **Simplified Data Access**
- No more `edges.node` nesting
- Clean, flattened response structure
- Simple pagination with `limit`/`offset`

### ✅ **Better Field Names**
- camelCase instead of snake_case
- `playerRp` instead of `player_rp`
- `logoUrl` instead of `logo_url`

### ✅ **Simple Pagination**
```graphql
query GetPlayers {
  players(pagination: { limit: 20, offset: 0 }) {
    items {
      id
      gamertag
      playerRp
      team {
        id
        name
        logoUrl
      }
    }
    pagination {
      total
      page
      limit
      hasMore
    }
  }
}
```

## 🔄 Migration from Verbose API

### Before (Verbose pg_graphql)
```graphql
query GetPlayers {
  playersCollection {
    edges {
      node {
        id
        gamertag
        player_rp
        teams {
          nodeId
          id
          name
          logo_url
        }
      }
    }
    pageInfo {
      hasNextPage
      totalCount
    }
  }
}
```

### After (Clean API)
```graphql
query GetPlayers {
  players(pagination: { limit: 20, offset: 0 }) {
    items {
      id
      gamertag
      playerRp
      team {
        id
        name
        logoUrl
      }
    }
    pagination {
      total
      page
      limit
      hasMore
    }
  }
}
```

## 📚 Available Scripts

- `npm run dev` - Start clean GraphQL server (development)
- `npm run dev:verbose` - Start original verbose server (development)
- `npm start` - Start clean GraphQL server (production)
- `npm run start:verbose` - Start original verbose server (production)
- `npm run build` - Build the project
- `npm run test:clean-server` - Test the clean server

## 🛠️ Development

### Project Structure
```
graphql-server/
├── src/
│   ├── schema-clean.graphql          # Clean GraphQL schema
│   ├── services/
│   │   └── clean-graphql-service.ts  # Data transformation service
│   ├── resolvers/
│   │   └── clean-resolvers.ts        # Clean resolvers
│   └── clean-server.ts               # Clean server configuration
├── examples/
│   └── clean-vs-verbose-comparison.js # Example comparisons
└── scripts/
    └── test-clean-server.js          # Test script
```

## 🚨 Troubleshooting

### Common Issues
1. **Port Conflicts**: Make sure port 4000 is available
2. **Environment Variables**: Verify Supabase URL and API key are correct
3. **Build Errors**: Run `npm run build` to check for TypeScript errors

### Debug Mode
Set `NODE_ENV=development` to enable detailed error messages and GraphQL introspection.

## 📞 Support

- **Full Documentation**: See `CLEAN_GRAPHQL_API.md`
- **Quick Start Guide**: See `README_CLEAN_API.md`
- **CSP Fixes**: See `CSP_FIX.md`
- **Examples**: See `examples/clean-vs-verbose-comparison.js`

## 🚀 Deployment

The server is configured for Railway deployment and will automatically use the clean GraphQL API as the default.
