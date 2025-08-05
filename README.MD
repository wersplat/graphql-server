# Bodega Cats GC GraphQL API Server

A TypeScript-based GraphQL API server using Apollo Server with Express to unify endpoints for multiple frontends (admin and public).

## 🚀 Features

- **GraphQL API** with Apollo Server and Express
- **Schema-first** approach using `.graphql` files
- **TypeScript** for type safety and better developer experience
- **CORS** support for multiple frontend domains
- **Mock resolvers** for development (easily replaceable with Supabase integration)
- **Health checks** and monitoring endpoints
- **Production-ready** with security middleware and error handling

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Supabase account (for production database)

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
   
   # Supabase Configuration (for production)
   SUPABASE_URL=your_supabase_url_here
   SUPABASE_ANON_KEY=your_supabase_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
   
   # CORS Origins
   ALLOWED_ORIGINS=https://dashboard.bodegacatsgc.gg,https://admin.bodegacatsgc.gg,https://global.bodegacatsgc.gg
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

# Testing (when tests are added)
pnpm test
```

## 🌐 API Endpoints

Once running, the server will be available at:

- **GraphQL Playground**: http://localhost:4000/graphql
- **Health Check**: http://localhost:4000/health
- **API Info**: http://localhost:4000/

## 📊 GraphQL Schema

The API provides the following main types and operations:

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

### Get User with Player Info
```graphql
query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    username
    email
    fullName
    isActive
    isAdmin
    player {
      id
      gamertag
      region
      currentRp
      peakRp
      tier
      teamName
      isVerified
    }
  }
}
```

### Get Matches for a Team
```graphql
query GetTeamMatches($teamId: ID!) {
  getMatches(teamId: $teamId, limit: 10) {
    id
    teamAName
    teamBName
    status
    scoreA
    scoreB
    scheduledAt
    playedAt
    event {
      id
      name
      eventType
    }
  }
}
```

### Submit a New Match
```graphql
mutation SubmitMatch($input: MatchInput!) {
  submitMatch(input: $input) {
    id
    teamAName
    teamBName
    status
    scheduledAt
    createdAt
  }
}
```

## 🚀 Deployment to Railway

### 1. Prepare for Deployment

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Create a Railway account** at [railway.app](https://railway.app)

3. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

### 2. Deploy to Railway

1. **Login to Railway:**
   ```bash
   railway login
   ```

2. **Initialize Railway project:**
   ```bash
   railway init
   ```

3. **Set environment variables in Railway dashboard:**
   - Go to your project in Railway
   - Navigate to Variables tab
   - Add all the environment variables from your `.env` file
   - Make sure to set `NODE_ENV=production`

4. **Deploy:**
   ```bash
   railway up
   ```

### 3. Configure Custom Domain

1. **In Railway dashboard:**
   - Go to Settings → Domains
   - Add custom domain: `graphql.bodegacatsgc.gg`
   - Configure DNS records as instructed by Railway

2. **Update CORS origins** in your environment variables to include the production domain.

### 4. Environment Variables for Production

Set these in Railway:

```env
NODE_ENV=production
PORT=4000
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_production_supabase_service_role_key
ALLOWED_ORIGINS=https://dashboard.bodegacatsgc.gg,https://admin.bodegacatsgc.gg,https://global.bodegacatsgc.gg
```

## 🔄 Integration with Existing Backend

### Current State
- Uses mock resolvers for development
- Ready for Supabase integration
- Compatible with existing data models

### Future Integration Steps
1. **Replace mock resolvers** with Supabase service calls
2. **Add authentication middleware** using Supabase Auth
3. **Implement rate limiting** for production
4. **Add caching layer** for better performance
5. **Set up monitoring and logging**

### Supabase Integration
The `src/services/supabase.ts` file contains a complete Supabase service class ready for integration. To use it:

1. **Update resolvers** to use `supabaseService` instead of mock data
2. **Add authentication** to the context
3. **Test with real data**

## 🧪 Testing

### Manual Testing
Use the GraphQL Playground at http://localhost:4000/graphql to test queries and mutations.

### Example Test Queries

```graphql
# Test getting a user
query {
  getUser(id: "1") {
    id
    username
    email
  }
}

# Test getting matches
query {
  getMatches(limit: 5) {
    id
    teamAName
    teamBName
    status
  }
}

# Test creating a match
mutation {
  submitMatch(input: {
    teamAId: "team-1"
    teamBId: "team-2"
    teamAName: "Alpha Team"
    teamBName: "Beta Team"
    stage: GROUP
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
│   ├── index.ts               # Main server file
│   ├── types/
│   │   ├── User.ts            # User type definitions
│   │   └── Match.ts           # Match type definitions
│   ├── resolvers/
│   │   ├── user.ts            # User resolvers
│   │   └── match.ts           # Match resolvers
│   └── services/
│       └── supabase.ts        # Supabase service (for future integration)
├── package.json               # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── env.example               # Environment variables template
└── README.md                 # This file
```

## 🔒 Security

- **CORS** configured for specific domains
- **Helmet** for security headers
- **Input validation** through GraphQL schema
- **Error handling** without exposing sensitive information
- **Rate limiting** ready for production

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use:**
   ```bash
   # Change port in .env file
   PORT=4001
   ```

2. **CORS errors:**
   - Check `ALLOWED_ORIGINS` in environment variables
   - Ensure frontend domain is included

3. **TypeScript errors:**
   ```bash
   pnpm type-check
   ```

4. **Build errors:**
   ```bash
   # Clean and reinstall
   rm -rf node_modules dist
   pnpm install
   pnpm build
   ```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the GraphQL schema and types
3. Test with the GraphQL Playground
4. Check server logs for detailed error messages

## 🔄 Updates and Maintenance

- **Schema changes:** Update `src/schema.graphql` and regenerate types
- **New resolvers:** Add to appropriate resolver file and update main index
- **Environment changes:** Update `.env.example` and Railway variables
- **Dependencies:** Regular updates with `pnpm update`

---

**Built for Bodega Cats GC** 🏀