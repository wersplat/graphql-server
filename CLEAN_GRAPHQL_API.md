# Clean GraphQL API Documentation

## Overview

The Clean GraphQL API provides a simplified, flattened interface that removes the verbose Relay-style structure from Supabase's `pg_graphql` extension. This makes the API much easier to use for frontend applications.

## Key Features

- **Flattened Response Structure**: No more `edges.node` nesting
- **Simple Pagination**: Clean `limit` and `offset` parameters
- **CamelCase Field Names**: Consistent naming convention
- **Nested Field Mapping**: Automatic resolution of related data
- **Type Safety**: Full TypeScript support
- **Error Handling**: Comprehensive error messages

## Comparison: Verbose vs Clean

### Verbose pg_graphql Query

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

### Clean GraphQL Query

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

## Available Queries

### Players

```graphql
# Get a single player
query GetPlayer($id: ID!) {
  player(id: $id) {
    id
    gamertag
    alternateGamertag
    discordId
    playerRp
    position
    regionId
    salaryTier
    isRookie
    monthlyValue
    performanceScore
    playerRankScore
    currentTeamId
    twitterId
    createdAt
    team {
      id
      name
      logoUrl
      currentRp
      eloRating
      globalRank
      leaderboardTier
      moneyWon
    }
    region {
      id
      name
    }
  }
}

# Get players with pagination
query GetPlayers($pagination: PaginationInput) {
  players(pagination: $pagination) {
    items {
      id
      gamertag
      playerRp
      position
      salaryTier
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

### Teams

```graphql
# Get a single team
query GetTeam($id: ID!) {
  team(id: $id) {
    id
    name
    logoUrl
    regionId
    currentRp
    eloRating
    globalRank
    leaderboardTier
    createdAt
    playerRankScore
    moneyWon
    region {
      id
      name
    }
  }
}

# Get teams with pagination
query GetTeams($pagination: PaginationInput) {
  teams(pagination: $pagination) {
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

### Matches

```graphql
# Get a single match with player stats
query GetMatch($id: ID!) {
  match(id: $id) {
    id
    eventId
    teamAId
    teamBId
    winnerId
    scoreA
    scoreB
    playedAt
    boxscoreUrl
    teamAName
    stage
    gameNumber
    teamBName
    winnerName
    event {
      id
      name
      type
      tier
      prizePool
    }
    teamA {
      id
      name
      logoUrl
    }
    teamB {
      id
      name
      logoUrl
    }
    winner {
      id
      name
      logoUrl
    }
    playerStats {
      id
      playerId
      teamId
      points
      assists
      rebounds
      steals
      blocks
      turnovers
      fouls
      ps
      fgm
      fga
      threePointsMade
      threePointsAttempted
      ftm
      fta
      plusMinus
      playerName
      player {
        id
        gamertag
        position
      }
      team {
        id
        name
        logoUrl
      }
    }
  }
}

# Get matches with pagination
query GetMatches($pagination: PaginationInput) {
  matches(pagination: $pagination) {
    items {
      id
      eventId
      teamAId
      teamBId
      winnerId
      scoreA
      scoreB
      playedAt
      teamAName
      teamBName
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

### Events

```graphql
# Get a single event
query GetEvent($id: ID!) {
  event(id: $id) {
    id
    name
    type
    isGlobal
    regionId
    startDate
    endDate
    maxRp
    decayDays
    processed
    description
    bannerUrl
    rulesUrl
    processedAt
    status
    tier
    seasonNumber
    prizePool
    region {
      id
      name
    }
  }
}

# Get events with pagination
query GetEvents($pagination: PaginationInput) {
  events(pagination: $pagination) {
    items {
      id
      name
      type
      isGlobal
      startDate
      endDate
      status
      tier
      prizePool
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

### Player Match Statistics

```graphql
# Get player stats for a specific match
query GetPlayerMatchStats($matchId: ID!) {
  playerMatchStats(matchId: $matchId) {
    id
    playerId
    teamId
    points
    assists
    rebounds
    steals
    blocks
    turnovers
    fouls
    ps
    fgm
    fga
    threePointsMade
    threePointsAttempted
    ftm
    fta
    plusMinus
    playerName
    player {
      id
      gamertag
      position
      team {
        id
        name
        logoUrl
      }
    }
    team {
      id
      name
      logoUrl
    }
  }
}
```

### Team Rosters

```graphql
# Get team roster
query GetTeamRoster($teamId: ID!) {
  teamRoster(teamId: $teamId) {
    id
    teamId
    playerId
    isCaptain
    isPlayerCoach
    joinedAt
    leftAt
    eventId
    team {
      id
      name
      logoUrl
    }
    player {
      id
      gamertag
      position
      playerRp
    }
    event {
      id
      name
      type
      tier
    }
  }
}
```

### Event Groups

```graphql
# Get event groups
query GetEventGroups($eventId: ID!) {
  eventGroups(eventId: $eventId) {
    id
    eventId
    name
    description
    maxTeams
    createdAt
    updatedAt
    status
    advancementCount
    sortOrder
    event {
      id
      name
      type
      tier
    }
  }
}
```

### Regions

```graphql
# Get all regions
query GetRegions {
  regions {
    id
    name
  }
}
```

## Pagination

All list queries support pagination using the `PaginationInput` type:

```graphql
input PaginationInput {
  limit: Int = 20    # Number of items to return (max: 100)
  offset: Int = 0    # Number of items to skip
}
```

Response includes pagination information:

```graphql
type PaginationInfo {
  total: Int!        # Total number of items available
  page: Int!         # Current page number
  limit: Int!        # Number of items per page
  hasMore: Boolean!  # Whether there are more items available
}
```

## Field Mapping

The clean API automatically maps database field names to camelCase:

| Database Field | GraphQL Field |
|----------------|---------------|
| `player_rp` | `playerRp` |
| `logo_url` | `logoUrl` |
| `team_a_id` | `teamAId` |
| `three_points_made` | `threePointsMade` |
| `created_at` | `createdAt` |

## Running the Clean Server

### Development

```bash
npm run dev:clean
```

### Production

```bash
npm run build
npm run start:clean
```

### Environment Variables

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=4000
NODE_ENV=production
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

## Error Handling

The API provides comprehensive error handling with meaningful error messages:

```json
{
  "errors": [
    {
      "message": "Failed to fetch player: Player not found",
      "path": ["player"],
      "extensions": {
        "code": "NOT_FOUND"
      }
    }
  ]
}
```

## Type Safety

All resolvers are fully typed with TypeScript, providing excellent IDE support and compile-time error checking.

## Performance

The clean API is optimized for performance:

- Efficient data transformation
- Minimal overhead over raw pg_graphql
- Smart caching of related data
- Optimized queries with proper field selection

## Migration from Verbose API

To migrate from the verbose pg_graphql API to the clean API:

1. Replace `edges.node` access with direct field access
2. Update pagination to use `limit`/`offset` instead of `first`/`after`
3. Update field names to camelCase
4. Remove `nodeId` fields (not needed in clean API)
5. Update nested field access patterns

### Example Migration

**Before (Verbose):**

```graphql
query {
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
        }
      }
    }
  }
}
```

**After (Clean):**

```graphql
query {
  players {
    items {
      id
      gamertag
      playerRp
      team {
        id
        name
      }
    }
  }
}
```

## Future Enhancements

- [ ] Implement remaining mutations (create, update, delete)
- [ ] Add filtering and sorting capabilities
- [ ] Implement real-time subscriptions
- [ ] Add authentication and authorization
- [ ] Add rate limiting
- [ ] Add query complexity analysis
- [ ] Add query caching
- [ ] Add performance monitoring
