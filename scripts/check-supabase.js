#!/usr/bin/env node

/**
 * Script to check what's in the Supabase database
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

async function checkDatabase() {
  console.log('🔍 Checking Supabase database...\n');

  try {
    // Check what tables exist
    console.log('📋 Checking tables...');
    
    // Try to get users
    console.log('\n👥 Users:');
    const { data: users, error: usersError } = await supabase
      .from('profiles')
      .select('*')
      .limit(3);
    
    if (usersError) {
      console.log('❌ Error fetching users:', usersError.message);
    } else {
      console.log('✅ Users found:', users?.length || 0);
      if (users && users.length > 0) {
        console.log('   Sample user:', users[0]);
      }
    }

    // Try to get matches
    console.log('\n🏀 Matches:');
    const { data: matches, error: matchesError } = await supabase
      .from('matches')
      .select('*')
      .limit(3);
    
    if (matchesError) {
      console.log('❌ Error fetching matches:', matchesError.message);
    } else {
      console.log('✅ Matches found:', matches?.length || 0);
      if (matches && matches.length > 0) {
        console.log('   Sample match:', matches[0]);
      }
    }

    // Try to get teams
    console.log('\n🏆 Teams:');
    const { data: teams, error: teamsError } = await supabase
      .from('teams')
      .select('*')
      .limit(3);
    
    if (teamsError) {
      console.log('❌ Error fetching teams:', teamsError.message);
    } else {
      console.log('✅ Teams found:', teams?.length || 0);
      if (teams && teams.length > 0) {
        console.log('   Sample team:', teams[0]);
      }
    }

    // Try to get events
    console.log('\n🎯 Events:');
    const { data: events, error: eventsError } = await supabase
      .from('events')
      .select('*')
      .limit(3);
    
    if (eventsError) {
      console.log('❌ Error fetching events:', eventsError.message);
    } else {
      console.log('✅ Events found:', events?.length || 0);
      if (events && events.length > 0) {
        console.log('   Sample event:', events[0]);
      }
    }

    // Try to get players
    console.log('\n👤 Players:');
    const { data: players, error: playersError } = await supabase
      .from('players')
      .select('*')
      .limit(3);
    
    if (playersError) {
      console.log('❌ Error fetching players:', playersError.message);
    } else {
      console.log('✅ Players found:', players?.length || 0);
      if (players && players.length > 0) {
        console.log('   Sample player:', players[0]);
      }
    }

  } catch (error) {
    console.error('❌ Database check failed:', error.message);
  }
}

checkDatabase(); 