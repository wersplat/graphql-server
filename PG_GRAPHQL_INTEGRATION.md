# pg_graphql Integration

This GraphQL server now uses the [pg_graphql](https://supabase.github.io/pg_graphql/) PostgreSQL extension as its primary data source, providing automatic schema generation and optimized queries directly from your Supabase database.

## Overview

The pg_graphql extension automatically generates a GraphQL schema from your PostgreSQL tables and provides a `graphql.resolve()` function that can execute GraphQL queries directly in the database. This integration gives you:

- **Automatic Schema Generation**: No need to manually maintain GraphQL types
- **Optimized Queries**: Direct database access with built-in query optimization
- **Real-time Schema Sync**: Database changes automatically reflected in GraphQL
- **Better Performance**: Reduced latency and infrastructure costs

## Architecture

```
Frontend → GraphQL Server → pg_graphql → PostgreSQL (Supabase)
```

Instead of manually writing resolvers that call Supabase's REST API, the server now uses pg_graphql to execute GraphQL queries directly against your PostgreSQL database.

## Setup

### 1. Prerequisites

- pg_graphql extension installed and enabled in your Supabase database
- Supabase project with the required tables (players, matches, teams, events, etc.)

### 2. Environment Variables

Ensure your `.env` file has the correct Supabase configuration:

```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 3. Testing the Integration

Run the pg_graphql test script to verify everything is working:

```bash
pnpm test:pg-graphql
```

This will test:
- pg_graphql extension availability
- Players queries
- Matches queries
- Teams queries
- Events queries
- Variable queries

## How It Works

### 1. PgGraphQLService

The `src/services/pg-graphql.ts` file contains the `PgGraphQLService` class that:

- Connects to Supabase using the standard client
- Executes GraphQL queries using the `graphql.resolve()` RPC function
- Transforms pg_graphql results to match your existing GraphQL schema
- Provides fallback to mock data if pg_graphql is unavailable

### 2. Query Execution

```typescript
// Example: Getting players
const query = `
  query GetPlayers($limit: Int!, $offset: Int!) {
    playersCollection(
      first: $limit
      after: $offset
      orderBy: [{ playerRp: DESC_NULLS_LAST }]
    ) {
      edges {
        node {
          id
          gamertag
          playerRp
          position
          regionId
          createdAt
        }
      }
    }
  }
`;

const result = await this.executeGraphQLQuery(query, { limit: 10, offset: 0 });
```

### 3. Schema Mapping

The service automatically maps pg_graphql's schema to your existing GraphQL types:

- `playersCollection` → `Player[]`
- `matchesCollection` → `Match[]`
- `teamsCollection` → `Team[]`
- `eventsCollection` → `Event[]`

## Available Operations

### Queries

- `getPlayer(id: ID!)` - Get a single player
- `getPlayers(limit, offset, filters)` - Get players with pagination and filtering
- `getMatch(id: ID!)` - Get a single match
- `getMatches(filters, limit, offset)` - Get matches with filtering
- `getTeam(id: ID!)` - Get a single team
- `getTeams(limit, offset)` - Get teams with pagination
- `getEvent(id: ID!)` - Get a single event
- `getEvents(filters, limit, offset)` - Get events with filtering

### Mutations

- `createMatch(input)` - Create a new match
- `submitMatchStats(matchId, stats)` - Submit player statistics

## Benefits

### 1. Performance
- **Direct Database Access**: No intermediate REST API calls
- **Query Optimization**: pg_graphql automatically optimizes queries
- **Reduced Latency**: Fewer network hops

### 2. Development Experience
- **Automatic Schema Sync**: Database changes immediately available
- **Type Safety**: Full TypeScript support with generated types
- **Simplified Maintenance**: No need to manually update GraphQL schema

### 3. Scalability
- **Database-Level Processing**: Queries executed at the database level
- **Built-in Pagination**: Automatic cursor-based pagination
- **Efficient Filtering**: Database-level filtering and sorting

## Troubleshooting

### Common Issues

1. **pg_graphql extension not available**
   ```
   Error: pg_graphql extension not available
   ```
   **Solution**: Install and enable the pg_graphql extension in your Supabase database

2. **Table not found in schema**
   ```
   Error: Table "table_name" not found
   ```
   **Solution**: Ensure the table exists in your Supabase database and has the correct permissions

3. **Permission denied**
   ```
   Error: Permission denied for table
   ```
   **Solution**: Check Row Level Security (RLS) policies and user permissions

### Testing

Run the test script to diagnose issues:

```bash
# Test pg_graphql integration
pnpm test:pg-graphql

# Test the full GraphQL server
pnpm test:server
```

### Debug Mode

Enable debug logging by setting the environment variable:

```env
DEBUG=pg-graphql
```

This will log all pg_graphql queries and responses.

## Migration from Old Supabase Service

The migration from the old `SupabaseService` to `PgGraphQLService` is complete. The resolvers now use:

```typescript
// Old way
import { supabaseService } from '../services/supabase';
const users = await supabaseService.instance.getUsers(limit, offset);

// New way
import { PgGraphQLService } from '../services/pg-graphql';
const users = await PgGraphQLService.instance.getUsers(limit, offset);
```

## Future Enhancements

1. **Real-time Subscriptions**: Add GraphQL subscriptions using pg_graphql
2. **Advanced Filtering**: Implement more complex filtering options
3. **Caching**: Add Redis caching for frequently accessed data
4. **Analytics**: Add query performance monitoring
5. **Schema Introspection**: Dynamic schema generation from pg_graphql

## Resources

- [pg_graphql Documentation](https://supabase.github.io/pg_graphql/)
- [Supabase GraphQL Guide](https://supabase.com/docs/guides/graphql)
- [PostgreSQL Extensions](https://supabase.com/docs/guides/database/extensions)

---

**Note**: This integration maintains backward compatibility with your existing GraphQL schema while providing the benefits of pg_graphql's automatic schema generation and query optimization.
