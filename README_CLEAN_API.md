# Clean GraphQL API - Quick Start Guide

## 🚀 Getting Started

The Clean GraphQL API provides a simplified, flattened interface that removes the verbose Relay-style structure from Supabase's `pg_graphql` extension.

### Prerequisites

- Node.js 18+
- Supabase project with `pg_graphql` extension enabled
- Environment variables configured

### Environment Setup

Create a `.env` file in the `graphql-server` directory:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=4000
NODE_ENV=development
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

### Installation & Build

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Running the Clean Server

#### Development Mode

```bash
npm run dev:clean
```

#### Production Mode

```bash
npm run start:clean
```

### Testing

```bash
# Test the clean server
npm run test:clean-server
```

## 📊 API Endpoints

- **GraphQL Playground**: `http://localhost:4000/graphql`
- **Health Check**: `http://localhost:4000/health`
- **API Info**: `http://localhost:4000/`

## 🔍 Example Queries

### Get Players with Pagination

```graphql
query GetPlayers {
  players(pagination: { limit: 10, offset: 0 }) {
    items {
      id
      gamertag
      playerRp
      position
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

### Get a Single Player

```graphql
query GetPlayer($id: ID!) {
  player(id: $id) {
    id
    gamertag
    playerRp
    position
    salaryTier
    team {
      id
      name
      logoUrl
      currentRp
    }
    region {
      id
      name
    }
  }
}
```

### Get Teams

```graphql
query GetTeams {
  teams(pagination: { limit: 20, offset: 0 }) {
    items {
      id
      name
      logoUrl
      currentRp
      eloRating
      globalRank
      leaderboardTier
      moneyWon
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

### Get Matches with Player Stats

```graphql
query GetMatches {
  matches(pagination: { limit: 10, offset: 0 }) {
    items {
      id
      teamAName
      teamBName
      scoreA
      scoreB
      playedAt
      stage
      event {
        id
        name
        type
        tier
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

## 🎯 Key Benefits

1. **Simpler Data Access**: No more `edges.node` nesting
2. **Clean Field Names**: camelCase instead of snake_case
3. **Simple Pagination**: `limit`/`offset` instead of `first`/`after`
4. **Better Developer Experience**: Easier to understand and use
5. **Type Safety**: Full TypeScript support

## 📚 Documentation

- **Full API Documentation**: See `CLEAN_GRAPHQL_API.md`
- **Example Comparisons**: See `examples/clean-vs-verbose-comparison.js`
- **Schema Definition**: See `src/schema-clean.graphql`

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

### Available Scripts

- `npm run dev:clean` - Start development server
- `npm run start:clean` - Start production server
- `npm run test:clean-server` - Test the clean server
- `npm run build` - Build the project

## 🚨 Troubleshooting

### Common Issues

1. **TypeScript Build Errors**: Make sure all transform methods have return type annotations
2. **Connection Errors**: Verify Supabase URL and API key are correct
3. **Port Conflicts**: Change the PORT environment variable if needed

### Debug Mode

Set `NODE_ENV=development` to enable detailed error messages and GraphQL introspection.

## 🔮 Future Enhancements

- [ ] Implement remaining mutations (create, update, delete)
- [ ] Add filtering and sorting capabilities
- [ ] Implement real-time subscriptions
- [ ] Add authentication and authorization
- [ ] Add rate limiting and caching

## 📞 Support

For issues or questions about the Clean GraphQL API, please refer to the main documentation in `CLEAN_GRAPHQL_API.md` or check the example files in the `examples/` directory.
