/**
 * Example: Clean vs Verbose GraphQL API Comparison
 * 
 * This script demonstrates the difference between the verbose pg_graphql API
 * and the clean GraphQL API we've created.
 */

// Example queries showing the difference

const verboseQuery = `
# Verbose pg_graphql Query
query GetPlayersVerbose {
  playersCollection(first: 5) {
    edges {
      node {
        nodeId
        id
        gamertag
        player_rp
        position
        region_id
        salary_tier
        is_rookie
        monthly_value
        performance_score
        player_rank_score
        current_team_id
        twitter_id
        created_at
        teams {
          nodeId
          id
          name
          logo_url
          region_id
          current_rp
          elo_rating
          global_rank
          leaderboard_tier
          money_won
          created_at
        }
        regions {
          nodeId
          id
          name
        }
      }
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
      totalCount
    }
  }
}
`;

const cleanQuery = `
# Clean GraphQL Query
query GetPlayersClean {
  players(pagination: { limit: 5, offset: 0 }) {
    items {
      id
      gamertag
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
        regionId
        currentRp
        eloRating
        globalRank
        leaderboardTier
        moneyWon
        createdAt
      }
      region {
        id
        name
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
`;

// Example responses

const verboseResponse = {
  "data": {
    "playersCollection": {
      "edges": [
        {
          "node": {
            "nodeId": "WyJwbGF5ZXJzIiwiMSJd",
            "id": "1",
            "gamertag": "PlayerOne",
            "player_rp": 2500,
            "position": "POINT_GUARD",
            "region_id": "1",
            "salary_tier": "A",
            "is_rookie": false,
            "monthly_value": 1000,
            "performance_score": 85.5,
            "player_rank_score": 92.3,
            "current_team_id": "1",
            "twitter_id": "playerone_twitter",
            "created_at": "2024-01-01T00:00:00Z",
            "teams": {
              "nodeId": "WyJ0ZWFtcyIsIjEiXQ==",
              "id": "1",
              "name": "Bodega Cats",
              "logo_url": "https://example.com/logo.png",
              "region_id": "1",
              "current_rp": 5000,
              "elo_rating": 1500,
              "global_rank": 1,
              "leaderboard_tier": "DIAMOND",
              "money_won": 10000,
              "created_at": "2024-01-01T00:00:00Z"
            },
            "regions": {
              "nodeId": "WyJyZWdpb25zIiwiMSJd",
              "id": "1",
              "name": "North America"
            }
          }
        }
      ],
      "pageInfo": {
        "hasNextPage": true,
        "hasPreviousPage": false,
        "startCursor": "WyJwbGF5ZXJzIiwiMSJd",
        "endCursor": "WyJwbGF5ZXJzIiwiNSJd",
        "totalCount": 100
      }
    }
  }
};

const cleanResponse = {
  "data": {
    "players": {
      "items": [
        {
          "id": "1",
          "gamertag": "PlayerOne",
          "playerRp": 2500,
          "position": "POINT_GUARD",
          "regionId": "1",
          "salaryTier": "A",
          "isRookie": false,
          "monthlyValue": 1000,
          "performanceScore": 85.5,
          "playerRankScore": 92.3,
          "currentTeamId": "1",
          "twitterId": "playerone_twitter",
          "createdAt": "2024-01-01T00:00:00Z",
          "team": {
            "id": "1",
            "name": "Bodega Cats",
            "logoUrl": "https://example.com/logo.png",
            "regionId": "1",
            "currentRp": 5000,
            "eloRating": 1500,
            "globalRank": 1,
            "leaderboardTier": "DIAMOND",
            "moneyWon": 10000,
            "createdAt": "2024-01-01T00:00:00Z"
          },
          "region": {
            "id": "1",
            "name": "North America"
          }
        }
      ],
      "pagination": {
        "total": 100,
        "page": 1,
        "limit": 5,
        "hasMore": true
      }
    }
  }
};

// Example of accessing data in JavaScript

console.log('=== Verbose API Data Access ===');
console.log('Player name:', verboseResponse.data.playersCollection.edges[0].node.gamertag);
console.log('Team name:', verboseResponse.data.playersCollection.edges[0].node.teams.name);
console.log('Region name:', verboseResponse.data.playersCollection.edges[0].node.regions.name);
console.log('Total count:', verboseResponse.data.playersCollection.pageInfo.totalCount);
console.log('Has next page:', verboseResponse.data.playersCollection.pageInfo.hasNextPage);

console.log('\n=== Clean API Data Access ===');
console.log('Player name:', cleanResponse.data.players.items[0].gamertag);
console.log('Team name:', cleanResponse.data.players.items[0].team.name);
console.log('Region name:', cleanResponse.data.players.items[0].region.name);
console.log('Total count:', cleanResponse.data.players.pagination.total);
console.log('Has more:', cleanResponse.data.players.pagination.hasMore);

// Example of frontend usage

const frontendExample = `
// Frontend usage with the verbose API
const fetchPlayersVerbose = async () => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: verboseQuery })
  });
  
  const data = await response.json();
  
  // Verbose data access
  const players = data.data.playersCollection.edges.map(edge => ({
    id: edge.node.id,
    name: edge.node.gamertag,
    team: edge.node.teams?.name,
    region: edge.node.regions?.name,
    rp: edge.node.player_rp
  }));
  
  return players;
};

// Frontend usage with the clean API
const fetchPlayersClean = async () => {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: cleanQuery })
  });
  
  const data = await response.json();
  
  // Clean data access
  const players = data.data.players.items.map(player => ({
    id: player.id,
    name: player.gamertag,
    team: player.team?.name,
    region: player.region?.name,
    rp: player.playerRp
  }));
  
  return players;
};
`;

console.log('\n=== Frontend Usage Example ===');
console.log(frontendExample);

// Benefits summary

const benefits = `
=== Benefits of Clean API ===

1. **Simpler Data Access**
   - No more edges.node nesting
   - Direct field access
   - Cleaner JavaScript code

2. **Better Field Names**
   - camelCase instead of snake_case
   - Consistent naming convention
   - More intuitive for frontend developers

3. **Simpler Pagination**
   - limit/offset instead of first/after
   - No cursor management needed
   - Clear pagination info

4. **Reduced Boilerplate**
   - No nodeId fields
   - No unnecessary nesting
   - Less data transformation needed

5. **Better Developer Experience**
   - Easier to understand
   - Less error-prone
   - Better IDE support
`;

console.log(benefits);

module.exports = {
  verboseQuery,
  cleanQuery,
  verboseResponse,
  cleanResponse
};
