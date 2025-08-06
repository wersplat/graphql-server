# Bodega Cats GC GraphQL API Server

A production-ready TypeScript-based GraphQL API server using Apollo Server with Express, deployed on Railway and integrated with Supabase for real-time data access.

## 🚀 Features

- **GraphQL API** with Apollo Server and Express
- **pg_graphql Integration** for automatic schema generation and optimized queries
- **Schema-first** approach using `.graphql` files
- **TypeScript** for type safety and better developer experience
- **Supabase Integration** for real-time database access
- **Interactive GraphQL Playground** with Apollo Studio Sandbox
- **CORS** support for multiple frontend domains
- **Production Deployment** on Railway with HTTPS
- **Health checks** and monitoring endpoints
- **Security middleware** and comprehensive error handling
- **Custom scalars** for DateTime and UUID handling

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account with configured database
- Railway account for deployment

## 🛠️ Installation

1. **Clone the repository and navigate to the graphql-server directory:**
   ```bash
   cd graphql-server
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Set up environment variables:**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   # Server Configuration
   PORT=4000
   NODE_ENV=development
   
   # Supabase Configuration (required for production)
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   
   # CORS Origins (comma-separated)
   ALLOWED_ORIGINS=https://dashboard.bodegacatsgc.gg,https://admin.bodegacatsgc.gg,https://global.bodegacatsgc.gg,https://graphql.bodegacatsgc.gg,https://studio.apollographql.com
   ```

## 🏃‍♂️ Running Locally

### Development Mode
```bash
pnpm dev
```

This starts the server with hot reloading using `tsx watch`.

### Production Build
```bash
# Build the project
pnpm build

# Start the production server
pnpm start
```

### Other Commands
```bash
# Type checking
pnpm type-check

# Linting
pnpm lint

# Linting with auto-fix
pnpm lint:fix

# Testing
pnpm test

# Test server functionality
pnpm test:server

# Test pg_graphql integration
pnpm test:pg-graphql
```

## 🌐 API Endpoints

Once running, the server will be available at:

- **GraphQL Playground**: http://localhost:4000/graphql
- **Apollo Studio**: http://localhost:4000/studio
- **Health Check**: http://localhost:4000/health
- **API Info**: http://localhost:4000/

## 🎮 GraphQL Playground

### Local Development
- **Visit**: http://localhost:4000/graphql
- **Click**: "🚀 Open GraphQL Explorer" button
- **Result**: Opens Apollo Studio Sandbox with your local endpoint

### Production (Railway)
- **Visit**: https://graphql.bodegacatsgc.gg/graphql
- **Click**: "🚀 Open GraphQL Explorer" button
- **Result**: Opens Apollo Studio Sandbox with your production endpoint

### Direct Apollo Studio Links
- **Local**: `https://studio.apollographql.com/sandbox/explorer?endpoint=http%3A//localhost%3A4000/graphql`
- **Production**: `https://studio.apollographql.com/sandbox/explorer?endpoint=https%3A//graphql.bodegacatsgc.gg/graphql`

## 📊 GraphQL Schema

The API provides comprehensive access to Bodega Cats GC data with the following main types and operations:

### Core Types
- **User/Player**: Player profiles with gamertags, RP, tiers, and team info
- **Match**: Game results with team scores, stages, and statistics
- **Team**: Team information with logos and regions
- **Event**: Tournament and event details
- **PlayerMatchStats**: Individual player performance data

### Queries
- `getUser(id: ID!): User` - Get user by ID
- `getUsers(limit: Int, offset: Int): [User!]!` - List users with pagination
- `getMatch(id: ID!): Match` - Get match by ID
- `getMatches(teamId: ID, eventId: UUID, status: MatchStatus, stage: MatchStage, limit: Int, offset: Int): [Match!]!` - List matches with filtering
- `getTeam(id: ID!): Team` - Get team by ID
- `getTeams(limit: Int, offset: Int): [Team!]!` - List teams
- `getEvent(id: ID!): Event` - Get event by ID
- `getEvents(status: EventStatus, eventType: EventType, limit: Int, offset: Int): [Event!]!` - List events
- `getPlayer(id: ID!): Player` - Get player by ID
- `getPlayers(tier: PlayerTier, region: String, limit: Int, offset: Int): [Player!]!` - List players

### Mutations
- `submitMatch(input: MatchInput!): Match!` - Create a new match
- `updateMatch(id: ID!, input: MatchUpdateInput!): Match!` - Update an existing match
- `deleteMatch(id: ID!): Boolean!` - Delete a match
- `submitMatchStats(matchId: ID!, stats: [PlayerMatchStatsInput!]!): [PlayerMatchStats!]!` - Submit player statistics
- `createUser(input: UserInput!): User!` - Create a new user (admin only)
- `updateUser(id: ID!, input: UserUpdateInput!): User!` - Update a user (admin only)
- `deleteUser(id: ID!): Boolean!` - Delete a user (admin only)

## 🔧 Example Queries

### Get Player with Full Stats
```graphql
query GetPlayer($id: ID!) {
  getUser(id: $id) {
    id
    gamertag
    fullName
    teamName
    player {
      id
      gamertag
      region
      currentRp
      peakRp
      tier
      position
      salaryTier
      isVerified
    }
  }
}
```

### Get Recent Matches
```graphql
query GetRecentMatches {
  getMatches(limit: 10) {
    id
    teamA {
      name
      logoUrl
    }
    teamB {
      name
      logoUrl
    }
    scoreA
    scoreB
    winnerName
    stage
    playedAt
    event {
      id
      name
      eventType
      tier
    }
  }
}
```

### Submit a New Match
```graphql
mutation SubmitMatch($input: MatchInput!) {
  submitMatch(input: $input) {
    id
    teamA {
      name
    }
    teamB {
      name
    }
    stage
    status
    createdAt
  }
}
```

## 🚀 Production Deployment on Railway

### Current Status
✅ **Deployed and Live**: https://graphql.bodegacatsgc.gg

### Deployment Features
- **Automatic HTTPS** with Railway SSL certificates
- **Custom domain** configured
- **Environment variables** properly set
- **Health checks** and monitoring
- **Auto-deployment** from GitHub pushes

### Railway Configuration
The project includes `railway.json` with optimized settings:
- **Build**: Nixpacks with pnpm
- **Health Check**: `/health` endpoint
- **Restart Policy**: Automatic on failure
- **Timeout**: 600 seconds for health checks

### Environment Variables (Production)
```env
NODE_ENV=production
PORT=4000
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_supabase_service_role_key
ALLOWED_ORIGINS=https://dashboard.bodegacatsgc.gg,https://admin.bodegacatsgc.gg,https://global.bodegacatsgc.gg,https://graphql.bodegacatsgc.gg,https://studio.apollographql.com
```

## 🔄 Supabase Integration

### Current Implementation
✅ **pg_graphql Integration**: The API now uses pg_graphql extension for automatic schema generation and optimized queries

### Data Mapping
- **Players Table**: Mapped to User/Player GraphQL types via pg_graphql
- **Matches Table**: Complete match data with team relationships via pg_graphql
- **Teams Table**: Team information with logos and regions via pg_graphql
- **Events Table**: Tournament and event details via pg_graphql
- **Player Match Stats**: Individual performance tracking via pg_graphql

### Key Features
- **Automatic schema generation** from PostgreSQL tables
- **Direct database queries** using pg_graphql's `graphql.resolve()` function
- **Query optimization** at the database level
- **Real-time schema sync** with database changes
- **Fallback to mock data** if pg_graphql is unavailable
- **Type-safe transformations** between pg_graphql and GraphQL schema

### pg_graphql Benefits
- **Performance**: Direct database access with built-in optimization
- **Maintenance**: Automatic schema updates when database changes
- **Scalability**: Database-level query processing
- **Development**: Reduced boilerplate and manual schema management

## 🧪 Testing

### Interactive Testing
Use the GraphQL Playground for interactive testing:
- **Local**: http://localhost:4000/graphql
- **Production**: https://graphql.bodegacatsgc.gg/graphql

### Automated Testing
```bash
# Test server functionality
pnpm test:server

# Run all tests
pnpm test
```

### Example Test Queries

```graphql
# Test getting players
query {
  getUsers(limit: 5) {
    id
    gamertag
    fullName
    teamName
    tier
    currentRp
  }
}

# Test getting matches
query {
  getMatches(limit: 5) {
    id
    teamA {
      name
    }
    teamB {
      name
    }
    scoreA
    scoreB
    stage
  }
}

# Test creating a match
mutation {
  submitMatch(input: {
    teamAId: "team-1"
    teamBId: "team-2"
    teamAName: "Spicy Boys"
    teamBName: "Feen for Food"
    stage: Group_Play
  }) {
    id
    teamAName
    teamBName
    status
  }
}
```

## 📁 Project Structure

```
graphql-server/
├── src/
│   ├── schema.graphql          # GraphQL schema definition
│   ├── index.ts               # Main server file with Apollo Studio integration
│   ├── types/
│   │   ├── User.ts            # User/Player type definitions
│   │   └── Match.ts           # Match/Team/Event type definitions
│   ├── resolvers/
│   │   ├── user.ts            # User/Player resolvers with Supabase integration
│   │   └── match.ts           # Match/Team/Event resolvers with Supabase integration
│   └── services/
│       └── supabase.ts        # Supabase service with data transformation
├── scripts/
│   ├── build.js               # Build script for schema copying
│   └── test-server.js         # Server testing script
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── railway.json              # Railway deployment configuration
├── env.example               # Environment variables template
└── README.md                 # This file
```

## 🔒 Security & Performance

### Security Features
- **CORS** configured for specific domains including Apollo Studio
- **Helmet** for security headers with GraphQL playground compatibility
- **Input validation** through GraphQL schema
- **Error handling** without exposing sensitive information
- **HTTPS enforcement** in production

### Performance Optimizations
- **Lazy initialization** of Supabase client
- **Efficient data transformation** with minimal overhead
- **Connection pooling** through Supabase client
- **Build optimization** with proper file copying

## 🐛 Troubleshooting

### Common Issues

1. **HTTPS/HTTP Mixed Content Errors:**
   - Ensure `NODE_ENV=production` is set in Railway
   - Check that Railway is serving HTTPS
   - Use the production URL: https://graphql.bodegacatsgc.gg/graphql

2. **CORS Errors:**
   - Verify `ALLOWED_ORIGINS` includes Apollo Studio domain
   - Check that frontend domains are included

3. **Supabase Connection Issues:**
   - Verify environment variables are set correctly
   - Check Supabase project status
   - Review server logs for connection errors

4. **Build Errors:**
   ```bash
   # Clean and reinstall
   rm -rf node_modules dist
   pnpm install
   pnpm build
   ```

5. **GraphQL Playground Not Loading:**
   - Use the direct Apollo Studio link
   - Check browser console for CSP errors
   - Ensure HTTPS is being used

### Debug Commands
```bash
# Check TypeScript compilation
pnpm type-check

# Test server functionality
pnpm test:server

# Check build output
pnpm build && ls -la dist/
```

## 📞 Support & Maintenance

### Getting Help
1. **Check the troubleshooting section** above
2. **Review server logs** in Railway dashboard
3. **Test with GraphQL Playground** for query issues
4. **Verify environment variables** are set correctly

### Regular Maintenance
- **Schema updates**: Modify `src/schema.graphql` and regenerate types
- **New resolvers**: Add to appropriate resolver file and update main index
- **Environment changes**: Update `.env.example` and Railway variables
- **Dependencies**: Regular updates with `pnpm update`

### Monitoring
- **Health Check**: https://graphql.bodegacatsgc.gg/health
- **Railway Dashboard**: Monitor deployment status and logs
- **Supabase Dashboard**: Monitor database performance and connections

## 🎯 Next Steps

### Planned Features
- [ ] **Authentication**: JWT-based auth with Supabase Auth
- [ ] **Rate Limiting**: Production rate limiting implementation
- [ ] **Caching**: Redis caching for frequently accessed data
- [ ] **Subscriptions**: Real-time GraphQL subscriptions
- [ ] **Analytics**: Query performance monitoring
- [ ] **Documentation**: Auto-generated API documentation

### Integration Opportunities
- **Frontend Integration**: Connect admin and public frontends
- **Mobile Apps**: GraphQL API for mobile applications
- **Third-party Services**: Webhook integrations
- **Analytics**: Performance tracking and insights

---

**Built for Bodega Cats GC** 🏀

*Production-ready GraphQL API serving real-time gaming data with interactive playground and comprehensive documentation.*