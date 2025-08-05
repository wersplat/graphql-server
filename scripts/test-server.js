#!/usr/bin/env node

/**
 * Simple test script to verify the GraphQL server is working
 * Run with: node scripts/test-server.js
 */

const fetch = require('node-fetch');

const SERVER_URL = process.env.SERVER_URL || 'http://localhost:4000';

async function testServer() {
  console.log('🧪 Testing Bodega Cats GC GraphQL Server...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing health check...');
    const healthResponse = await fetch(`${SERVER_URL}/health`);
    const healthData = await healthResponse.json();
    
    if (healthResponse.ok) {
      console.log('✅ Health check passed:', healthData.status);
    } else {
      console.log('❌ Health check failed:', healthData);
    }

    // Test 2: Root endpoint
    console.log('\n2. Testing root endpoint...');
    const rootResponse = await fetch(SERVER_URL);
    const rootData = await rootResponse.json();
    
    if (rootResponse.ok) {
      console.log('✅ Root endpoint working:', rootData.message);
    } else {
      console.log('❌ Root endpoint failed:', rootData);
    }

    // Test 3: GraphQL query
    console.log('\n3. Testing GraphQL query...');
    const query = `
      query {
        getUsers(limit: 1) {
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
            tier
          }
        }
      }
    `;

    const graphqlResponse = await fetch(`${SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    const graphqlData = await graphqlResponse.json();
    
    if (graphqlResponse.ok && !graphqlData.errors) {
      console.log('✅ GraphQL query successful');
      const user = graphqlData.data.getUsers[0];
      console.log('   User:', user.username);
      console.log('   Player:', user.player?.gamertag);
    } else {
      console.log('❌ GraphQL query failed:', graphqlData.errors || graphqlData);
    }

    // Test 4: GraphQL mutation
    console.log('\n4. Testing GraphQL mutation...');
    const mutation = `
      mutation {
        submitMatch(input: {
          teamAId: "f6caad6e-0dcb-48ef-974e-460656fcdeb6"
          teamBId: "fe1ed148-bc8d-4f7f-8851-96a9fdb0d820"
          teamAName: "Spicy Boys"
          teamBName: "Feen for Food"
          stage: Group_Play
        }) {
          id
          teamAName
          teamBName
          status
          createdAt
        }
      }
    `;

    const mutationResponse = await fetch(`${SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: mutation }),
    });

    const mutationData = await mutationResponse.json();
    
    if (mutationResponse.ok && !mutationData.errors) {
      console.log('✅ GraphQL mutation successful');
      console.log('   Match ID:', mutationData.data.submitMatch.id);
      console.log('   Teams:', `${mutationData.data.submitMatch.teamAName} vs ${mutationData.data.submitMatch.teamBName}`);
    } else {
      console.log('❌ GraphQL mutation failed:', mutationData.errors || mutationData);
    }

    // Test 5: Get matches
    console.log('\n5. Testing getMatches query...');
    const matchesQuery = `
      query {
        getMatches(limit: 3) {
          id
          teamAName
          teamBName
          status
          scoreA
          scoreB
          scheduledAt
          event {
            id
            name
            eventType
          }
        }
      }
    `;

    const matchesResponse = await fetch(`${SERVER_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: matchesQuery }),
    });

    const matchesData = await matchesResponse.json();
    
    if (matchesResponse.ok && !matchesData.errors) {
      console.log('✅ GetMatches query successful');
      console.log(`   Found ${matchesData.data.getMatches.length} matches`);
      matchesData.data.getMatches.forEach((match, index) => {
        console.log(`   ${index + 1}. ${match.teamAName} vs ${match.teamBName} (${match.status})`);
      });
    } else {
      console.log('❌ GetMatches query failed:', matchesData.errors || matchesData);
    }

    console.log('\n🎉 All tests completed!');
    console.log(`\n📊 Server Status: ${healthData.status}`);
    console.log(`🌐 Server URL: ${SERVER_URL}`);
    console.log(`🔍 GraphQL Playground: ${SERVER_URL}/graphql`);

  } catch (error) {
    console.error('❌ Test failed with error:', error.message);
    console.log('\n💡 Make sure the server is running with: pnpm dev');
    process.exit(1);
  }
}

// Run tests
testServer(); 