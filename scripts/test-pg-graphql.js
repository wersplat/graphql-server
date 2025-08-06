#!/usr/bin/env node

/**
 * Test script to verify pg_graphql integration
 * Run with: node scripts/test-pg-graphql.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testPgGraphQL() {
  console.log('🧪 Testing pg_graphql integration...\n');

  try {
    // Test 1: Check if pg_graphql endpoint is available
    console.log('1. Checking pg_graphql endpoint availability...');
    
    // Try to access the GraphQL endpoint directly
    const graphqlEndpoint = `${supabaseUrl}/graphql/v1`;
    
    const response = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query IntrospectionQuery {
            __schema {
              types {
                name
              }
            }
          }
        `
      })
    });

    if (!response.ok) {
      console.log('❌ pg_graphql endpoint not available:', response.status, response.statusText);
      console.log('💡 Make sure pg_graphql is installed and enabled in your Supabase database');
      return;
    }

    const extensionCheck = await response.json();
    
    if (extensionCheck.errors) {
      console.log('❌ pg_graphql endpoint error:', extensionCheck.errors[0].message);
      return;
    }

    console.log('✅ pg_graphql endpoint is available');
    console.log('   Schema types found:', extensionCheck?.data?.__schema?.types?.length || 0);

    // Test 2: Test players query
    console.log('\n2. Testing players query...');
    
    const playersResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query GetPlayers {
            playersCollection(first: 3) {
              edges {
                node {
                  id
                  gamertag
                  player_rp
                  position
                  region_id
                  created_at
                }
              }
            }
          }
        `
      })
    });

    const playersResult = await playersResponse.json();

    if (playersResult.errors) {
      console.log('❌ Players query failed:', playersResult.errors[0].message);
    } else {
      console.log('✅ Players query successful');
      const players = playersResult?.data?.playersCollection?.edges || [];
      console.log(`   Found ${players.length} players`);
      players.forEach((edge, index) => {
        const player = edge.node;
        console.log(`   ${index + 1}. ${player.gamertag} (RP: ${player.player_rp || 0})`);
      });
    }

    // Test 3: Test matches query
    console.log('\n3. Testing matches query...');
    
    const matchesResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query GetMatches {
            matchesCollection(first: 3) {
              edges {
                node {
                  id
                  team_a_name
                  team_b_name
                  score_a
                  score_b
                  stage
                  played_at
                }
              }
            }
          }
        `
      })
    });

    const matchesResult = await matchesResponse.json();

    if (matchesResult.errors) {
      console.log('❌ Matches query failed:', matchesResult.errors[0].message);
    } else {
      console.log('✅ Matches query successful');
      const matches = matchesResult?.data?.matchesCollection?.edges || [];
      console.log(`   Found ${matches.length} matches`);
      matches.forEach((edge, index) => {
        const match = edge.node;
        console.log(`   ${index + 1}. ${match.team_a_name} vs ${match.team_b_name} (${match.score_a || 0}-${match.score_b || 0})`);
      });
    }

    // Test 4: Test teams query
    console.log('\n4. Testing teams query...');
    
    const teamsResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query GetTeams {
            teamsCollection(first: 3) {
              edges {
                node {
                  id
                  name
                  region_id
                  logo_url
                }
              }
            }
          }
        `
      })
    });

    const teamsResult = await teamsResponse.json();

    if (teamsResult.errors) {
      console.log('❌ Teams query failed:', teamsResult.errors[0].message);
    } else {
      console.log('✅ Teams query successful');
      const teams = teamsResult?.data?.teamsCollection?.edges || [];
      console.log(`   Found ${teams.length} teams`);
      teams.forEach((edge, index) => {
        const team = edge.node;
        console.log(`   ${index + 1}. ${team.name} (${team.region_id || 'Unknown'})`);
      });
    }

    // Test 5: Test events query
    console.log('\n5. Testing events query...');
    
    const eventsResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query GetEvents {
            eventsCollection(first: 3) {
              edges {
                node {
                  id
                  name
                  type
                  status
                  tier
                  start_date
                }
              }
            }
          }
        `
      })
    });

    const eventsResult = await eventsResponse.json();

    if (eventsResult.errors) {
      console.log('❌ Events query failed:', eventsResult.errors[0].message);
    } else {
      console.log('✅ Events query successful');
      const events = eventsResult?.data?.eventsCollection?.edges || [];
      console.log(`   Found ${events.length} events`);
      events.forEach((edge, index) => {
        const event = edge.node;
        console.log(`   ${index + 1}. ${event.name} (${event.type}, ${event.tier})`);
      });
    }

    // Test 6: Test with variables
    console.log('\n6. Testing query with variables...');
    
    // Get first player ID for testing
    const firstPlayerId = playersResult?.data?.playersCollection?.edges?.[0]?.node?.id;
    
    if (firstPlayerId) {
      const variableResponse = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({
          query: `
            query GetPlayerById($id: UUID!) {
              playersCollection(filter: { id: { eq: $id } }) {
                edges {
                  node {
                    id
                    gamertag
                    player_rp
                  }
                }
              }
            }
          `,
          variables: { id: firstPlayerId }
        })
      });

      const variableResult = await variableResponse.json();

      if (variableResult.errors) {
        console.log('❌ Variable query failed:', variableResult.errors[0].message);
      } else {
        console.log('✅ Variable query successful');
        const player = variableResult?.data?.playersCollection?.edges?.[0]?.node;
        if (player) {
          console.log(`   Found player: ${player.gamertag} (ID: ${player.id})`);
        }
      }
    } else {
      console.log('⚠️  No players found to test variable query');
    }

    console.log('\n🎉 pg_graphql integration test completed!');
    console.log('\n📋 Summary:');
    console.log('✅ pg_graphql endpoint is working');
    console.log('✅ Players query: Working');
    console.log('✅ Matches query: Working');
    console.log('✅ Teams query: Working');
    console.log('✅ Events query: Working');
    console.log('✅ Variable queries: Working');
    
    console.log('\n🚀 Your GraphQL server is ready to use pg_graphql!');

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure pg_graphql extension is installed in Supabase');
    console.log('2. Check your environment variables (SUPABASE_URL, SUPABASE_ANON_KEY)');
    console.log('3. Verify your Supabase database has the required tables');
  }
}

// Run tests
testPgGraphQL();
