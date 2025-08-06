#!/usr/bin/env node

/**
 * Script to introspect the pg_graphql schema and get actual field names
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase configuration');
  process.exit(1);
}

async function introspectSchema() {
  console.log('🔍 Introspecting pg_graphql schema...\n');

  const graphqlEndpoint = `${supabaseUrl}/graphql/v1`;

  try {
    // Get the players type fields
    console.log('1. Getting players type fields...');
    const playersResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query {
            __type(name: "players") {
              fields {
                name
                type {
                  name
                }
              }
            }
          }
        `
      })
    });

    const playersResult = await playersResponse.json();
    if (playersResult.data?.__type?.fields) {
      console.log('Players fields:');
      playersResult.data.__type.fields.forEach(field => {
        console.log(`  - ${field.name}: ${field.type.name}`);
      });
    }

    // Get the matches type fields
    console.log('\n2. Getting matches type fields...');
    const matchesResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query {
            __type(name: "matches") {
              fields {
                name
                type {
                  name
                }
              }
            }
          }
        `
      })
    });

    const matchesResult = await matchesResponse.json();
    if (matchesResult.data?.__type?.fields) {
      console.log('Matches fields:');
      matchesResult.data.__type.fields.forEach(field => {
        console.log(`  - ${field.name}: ${field.type.name}`);
      });
    }

    // Get the teams type fields
    console.log('\n3. Getting teams type fields...');
    const teamsResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query {
            __type(name: "teams") {
              fields {
                name
                type {
                  name
                }
              }
            }
          }
        `
      })
    });

    const teamsResult = await teamsResponse.json();
    if (teamsResult.data?.__type?.fields) {
      console.log('Teams fields:');
      teamsResult.data.__type.fields.forEach(field => {
        console.log(`  - ${field.name}: ${field.type.name}`);
      });
    }

    // Get the events type fields
    console.log('\n4. Getting events type fields...');
    const eventsResponse = await fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`
      },
      body: JSON.stringify({
        query: `
          query {
            __type(name: "events") {
              fields {
                name
                type {
                  name
                }
              }
            }
          }
        `
      })
    });

    const eventsResult = await eventsResponse.json();
    if (eventsResult.data?.__type?.fields) {
      console.log('Events fields:');
      eventsResult.data.__type.fields.forEach(field => {
        console.log(`  - ${field.name}: ${field.type.name}`);
      });
    }

  } catch (error) {
    console.error('❌ Error introspecting schema:', error.message);
  }
}

introspectSchema();
