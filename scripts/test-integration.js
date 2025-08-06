#!/usr/bin/env node

/**
 * Test script to verify the full GraphQL server integration with pg_graphql
 */

require('dotenv').config();
const { PgGraphQLService } = require('../dist/services/pg-graphql');

async function testIntegration() {
  console.log('🧪 Testing full GraphQL server integration with pg_graphql...\n');

  try {
    // Test 1: Test PgGraphQLService directly
    console.log('1. Testing PgGraphQLService directly...');
    
    const service = PgGraphQLService.instance;
    
    // Test players query
    console.log('   Testing getPlayers...');
    const players = await service.getPlayers(3, 0);
    console.log(`   Found ${players.length} players`);
    players.forEach((player, index) => {
      console.log(`   ${index + 1}. ${player.gamertag} (RP: ${player.currentRp}, Tier: ${player.tier})`);
    });

    // Test matches query
    console.log('\n   Testing getMatches...');
    const matches = await service.getMatches({}, 3, 0);
    console.log(`   Found ${matches.length} matches`);
    matches.forEach((match, index) => {
      console.log(`   ${index + 1}. ${match.teamAName} vs ${match.teamBName} (${match.scoreA}-${match.scoreB})`);
    });

    // Test teams query
    console.log('\n   Testing getTeams...');
    const teams = await service.getTeams(3, 0);
    console.log(`   Found ${teams.length} teams`);
    teams.forEach((team, index) => {
      console.log(`   ${index + 1}. ${team.name} (${team.region || 'Unknown'})`);
    });

    // Test events query
    console.log('\n   Testing getEvents...');
    const events = await service.getEvents({}, 3, 0);
    console.log(`   Found ${events.length} events`);
    events.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.name} (${event.eventType}, ${event.tier})`);
    });

    console.log('\n✅ PgGraphQLService integration successful!');

  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    console.error('Stack trace:', error.stack);
  }
}

testIntegration();
