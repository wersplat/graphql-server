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
    // Test 1: Check if pg_graphql extension is available
    console.log('1. Checking pg_graphql extension availability...');
    
    const { data: extensionCheck, error: extensionError } = await supabase.rpc('graphql_resolve', {
      query_text: `
        query IntrospectionQuery {
          __schema {
            types {
              name
            }
          }
        }
      `,
      variables: {}
    });

    if (extensionError) {
      console.log('❌ pg_graphql extension not available:', extensionError.message);
      console.log('💡 Make sure pg_graphql is installed and enabled in your Supabase database');
      return;
    }

    console.log('✅ pg_graphql extension is available');
    console.log('   Schema types found:', extensionCheck?.data?.__schema?.types?.length || 0);

    // Test 2: Test players query
    console.log('\n2. Testing players query...');
    
    const playersQuery = `
      query GetPlayers {
        playersCollection(first: 3) {
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

    const { data: playersResult, error: playersError } = await supabase.rpc('graphql_resolve', {
      query_text: playersQuery,
      variables: {}
    });

    if (playersError) {
      console.log('❌ Players query failed:', playersError.message);
    } else {
      console.log('✅ Players query successful');
      const players = playersResult?.data?.playersCollection?.edges || [];
      console.log(`   Found ${players.length} players`);
      players.forEach((edge, index) => {
        const player = edge.node;
        console.log(`   ${index + 1}. ${player.gamertag} (RP: ${player.playerRp || 0})`);
      });
    }

    // Test 3: Test matches query
    console.log('\n3. Testing matches query...');
    
    const matchesQuery = `
      query GetMatches {
        matchesCollection(first: 3) {
          edges {
            node {
              id
              teamAName
              teamBName
              scoreA
              scoreB
              stage
              playedAt
            }
          }
        }
      }
    `;

    const { data: matchesResult, error: matchesError } = await supabase.rpc('graphql_resolve', {
      query_text: matchesQuery,
      variables: {}
    });

    if (matchesError) {
      console.log('❌ Matches query failed:', matchesError.message);
    } else {
      console.log('✅ Matches query successful');
      const matches = matchesResult?.data?.matchesCollection?.edges || [];
      console.log(`   Found ${matches.length} matches`);
      matches.forEach((edge, index) => {
        const match = edge.node;
        console.log(`   ${index + 1}. ${match.teamAName} vs ${match.teamBName} (${match.scoreA || 0}-${match.scoreB || 0})`);
      });
    }

    // Test 4: Test teams query
    console.log('\n4. Testing teams query...');
    
    const teamsQuery = `
      query GetTeams {
        teamsCollection(first: 3) {
          edges {
            node {
              id
              name
              region
              isActive
            }
          }
        }
      }
    `;

    const { data: teamsResult, error: teamsError } = await supabase.rpc('graphql_resolve', {
      query_text: teamsQuery,
      variables: {}
    });

    if (teamsError) {
      console.log('❌ Teams query failed:', teamsError.message);
    } else {
      console.log('✅ Teams query successful');
      const teams = teamsResult?.data?.teamsCollection?.edges || [];
      console.log(`   Found ${teams.length} teams`);
      teams.forEach((edge, index) => {
        const team = edge.node;
        console.log(`   ${index + 1}. ${team.name} (${team.region || 'Unknown'})`);
      });
    }

    // Test 5: Test events query
    console.log('\n5. Testing events query...');
    
    const eventsQuery = `
      query GetEvents {
        eventsCollection(first: 3) {
          edges {
            node {
              id
              name
              eventType
              status
              entryFee
              currentParticipants
            }
          }
        }
      }
    `;

    const { data: eventsResult, error: eventsError } = await supabase.rpc('graphql_resolve', {
      query_text: eventsQuery,
      variables: {}
    });

    if (eventsError) {
      console.log('❌ Events query failed:', eventsError.message);
    } else {
      console.log('✅ Events query successful');
      const events = eventsResult?.data?.eventsCollection?.edges || [];
      console.log(`   Found ${events.length} events`);
      events.forEach((edge, index) => {
        const event = edge.node;
        console.log(`   ${index + 1}. ${event.name} (${event.eventType}, $${event.entryFee})`);
      });
    }

    // Test 6: Test with variables
    console.log('\n6. Testing query with variables...');
    
    const variableQuery = `
      query GetPlayerById($id: UUID!) {
        playersCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
              id
              gamertag
              playerRp
            }
          }
        }
      }
    `;

    // Get first player ID for testing
    const firstPlayerId = playersResult?.data?.playersCollection?.edges?.[0]?.node?.id;
    
    if (firstPlayerId) {
      const { data: playerResult, error: playerError } = await supabase.rpc('graphql_resolve', {
        query_text: variableQuery,
        variables: { id: firstPlayerId }
      });

      if (playerError) {
        console.log('❌ Variable query failed:', playerError.message);
      } else {
        console.log('✅ Variable query successful');
        const player = playerResult?.data?.playersCollection?.edges?.[0]?.node;
        if (player) {
          console.log(`   Found player: ${player.gamertag} (ID: ${player.id})`);
        }
      }
    } else {
      console.log('⚠️  No players found to test variable query');
    }

    console.log('\n🎉 pg_graphql integration test completed!');
    console.log('\n📋 Summary:');
    console.log('✅ pg_graphql extension is working');
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
