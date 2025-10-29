import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { 
  mapPlayerPositionDbToGql, 
  mapMatchStageDbToGql, 
  mapStatusDbToGql,
  mapPlayerPositionGqlToDb,
  mapMatchStageGqlToDb,
  mapStatusGqlToDb
} from '../utils/enum-mapping';

export class SupabaseService {
  private client: SupabaseClient;

  constructor() {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration. Please set SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
    }

    this.client = createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false
      }
    });
  }

  // Player operations (since there's no users table, we'll use players)
  async getUser(id: string) {
    const { data, error } = await this.client
      .from('players')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching player:', error);
      throw new Error(`Failed to fetch player: ${error.message}`);
    }

    // Transform player data to match User interface
    return {
      id: data.id,
      username: data.gamertag,
      email: `${data.gamertag}@bodegacatsgc.gg`, // Generate email from gamertag
      fullName: data.gamertag,
      isActive: true,
      isAdmin: false,
      discordId: data.discord_id,
      createdAt: data.created_at,
      updatedAt: data.created_at,
      player: {
        id: data.id,
        userId: data.id,
        gamertag: data.gamertag,
        region: data.region_id || null,
        currentRp: data.player_rp || 0,
        peakRp: data.player_rp || 0,
        tier: 'bronze' as any, // Default tier
        position: mapPlayerPositionDbToGql(data.position),
        salaryTier: data.salary_tier || null,
        teamName: null,
        isVerified: false,
        createdAt: data.created_at,
        updatedAt: data.created_at,
        user: {} as any // Will be populated by resolver
      }
    };
  }

  async getUsers(limit = 10, offset = 0) {
    const { data, error } = await this.client
      .from('players')
      .select('*')
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching players:', error);
      throw new Error(`Failed to fetch players: ${error.message}`);
    }

    // Transform player data to match User interface
    return (data || []).map(player => ({
      id: player.id,
      username: player.gamertag,
      email: `${player.gamertag}@bodegacatsgc.gg`,
      fullName: player.gamertag,
      isActive: true,
      isAdmin: false,
      discordId: player.discord_id,
      createdAt: player.created_at,
      updatedAt: player.created_at,
      player: {
        id: player.id,
        userId: player.id,
        gamertag: player.gamertag,
        region: player.region_id || null,
        currentRp: player.player_rp || 0,
        peakRp: player.player_rp || 0,
        tier: 'bronze' as any, // Default tier
        position: mapPlayerPositionDbToGql(player.position),
        salaryTier: player.salary_tier || null,
        teamName: null,
        isVerified: false,
        createdAt: player.created_at,
        updatedAt: player.created_at,
        user: {} as any // Will be populated by resolver
      }
    }));
  }

  async createUser(userData: any) {
    // Transform user data to player data
    const playerData = {
      gamertag: userData.username,
      discord_id: userData.discord_id,
      position: mapPlayerPositionGqlToDb('Center'), // Default position
      current_team_id: null,
      performance_score: 50, // Default score
      player_rp: 0,
      player_rank_score: 0,
      is_rookie: true
    };

    const { data, error } = await this.client
      .from('players')
      .insert(playerData)
      .select()
      .single();

    if (error) {
      console.error('Error creating player:', error);
      throw new Error(`Failed to create player: ${error.message}`);
    }

    // Transform back to User interface
    return {
      id: data.id,
      username: data.gamertag,
      email: `${data.gamertag}@bodegacatsgc.gg`,
      fullName: data.gamertag,
      isActive: true,
      isAdmin: false,
      discordId: data.discord_id,
      createdAt: data.created_at,
      updatedAt: data.created_at,
      player: data
    };
  }

  async updateUser(id: string, userData: any) {
    // Transform user data to player data
    const playerData: any = {};
    if (userData.username) playerData.gamertag = userData.username;
    if (userData.discord_id) playerData.discord_id = userData.discord_id;

    const { data, error } = await this.client
      .from('players')
      .update(playerData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating player:', error);
      throw new Error(`Failed to update player: ${error.message}`);
    }

    // Transform back to User interface
    return {
      id: data.id,
      username: data.gamertag,
      email: `${data.gamertag}@bodegacatsgc.gg`,
      fullName: data.gamertag,
      isActive: true,
      isAdmin: false,
      discordId: data.discord_id,
      createdAt: data.created_at,
      updatedAt: data.created_at,
      player: data
    };
  }

  async deleteUser(id: string) {
    const { error } = await this.client
      .from('players')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting player:', error);
      throw new Error(`Failed to delete player: ${error.message}`);
    }

    return true;
  }

  // Match operations
  async getMatch(id: string) {
    const { data, error } = await this.client
      .from('matches')
      .select(`
        *,
        team_a:teams!team_a_id(*),
        team_b:teams!team_b_id(*),
        winner:teams!winner_id(*),
        event:events(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching match:', error);
      throw new Error(`Failed to fetch match: ${error.message}`);
    }

    // Transform to match our GraphQL schema
    return {
      id: data.id,
      eventId: data.tournament_id,
      teamAId: data.team_a_id,
      teamBId: data.team_b_id,
      teamAName: data.team_a?.name || null,
      teamBName: data.team_b?.name || null,
      stage: mapMatchStageDbToGql(data.stage) || 'Group_Play',
      gameNumber: data.game_number || 1,
      status: data.played_at ? 'completed' : 'scheduled', // Determine status based on played_at
      scoreA: data.score_a,
      scoreB: data.score_b,
      winnerId: data.winner_id,
      winnerName: data.winner?.name || null,
      scheduledAt: null, // Not in schema
      playedAt: data.played_at,
      startedAt: null, // Not in schema
      endedAt: data.played_at, // Use played_at as ended_at
      boxscoreUrl: data.boxscore_url,
      createdAt: new Date().toISOString(), // Not in schema, use current time
      updatedAt: new Date().toISOString(), // Not in schema, use current time
      isLive: false,
      teamA: data.team_a,
      teamB: data.team_b,
      winner: data.winner,
      event: data.event,
      teamAPlayers: [],
      teamBPlayers: []
    };
  }

  async getMatches(filters: any = {}, limit = 20, offset = 0) {
    let query = this.client
      .from('matches')
      .select(`
        *,
        team_a:teams!team_a_id(*),
        team_b:teams!team_b_id(*),
        winner:teams!winner_id(*)
      `);

    // Apply filters
    if (filters.teamId) {
      query = query.or(`team_a_id.eq.${filters.teamId},team_b_id.eq.${filters.teamId}`);
    }

    if (filters.eventId) {
      query = query.eq('tournament_id', filters.eventId);
    }

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.stage) {
      query = query.eq('stage', mapMatchStageGqlToDb(filters.stage));
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching matches:', error);
      throw new Error(`Failed to fetch matches: ${error.message}`);
    }

    // Transform to match our GraphQL schema
    return (data || []).map(match => ({
      id: match.id,
      eventId: match.tournament_id,
      teamAId: match.team_a_id,
      teamBId: match.team_b_id,
      teamAName: match.team_a?.name || null,
      teamBName: match.team_b?.name || null,
      stage: mapMatchStageDbToGql(match.stage) || 'Group_Play',
      gameNumber: match.game_number || 1,
      status: match.played_at ? 'completed' : 'scheduled', // Determine status based on played_at
      scoreA: match.score_a,
      scoreB: match.score_b,
      winnerId: match.winner_id,
      winnerName: match.winner?.name || null,
      scheduledAt: null, // Not in schema
      playedAt: match.played_at,
      startedAt: null, // Not in schema
      endedAt: match.played_at, // Use played_at as ended_at
      boxscoreUrl: match.boxscore_url,
      createdAt: new Date().toISOString(), // Not in schema, use current time
      updatedAt: new Date().toISOString(), // Not in schema, use current time
      isLive: false,
      teamA: match.team_a,
      teamB: match.team_b,
      winner: match.winner,
      event: match.event,
      teamAPlayers: [],
      teamBPlayers: []
    }));
  }

  async createMatch(matchData: any) {
    // Remove fields that don't exist in the schema
    const { status, scheduledAt, createdAt, updatedAt, ...validMatchData } = matchData;
    
    const { data, error } = await this.client
      .from('matches')
      .insert(validMatchData)
      .select()
      .single();

    if (error) {
      console.error('Error creating match:', error);
      throw new Error(`Failed to create match: ${error.message}`);
    }

    return data;
  }

  async updateMatch(id: string, matchData: any) {
    const { data, error } = await this.client
      .from('matches')
      .update(matchData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating match:', error);
      throw new Error(`Failed to update match: ${error.message}`);
    }

    return data;
  }

  async deleteMatch(id: string) {
    const { error } = await this.client
      .from('matches')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting match:', error);
      throw new Error(`Failed to delete match: ${error.message}`);
    }

    return true;
  }

  // Team operations
  async getTeam(id: string) {
    const { data, error } = await this.client
      .from('teams')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching team:', error);
      throw new Error(`Failed to fetch team: ${error.message}`);
    }

    // Transform to match our GraphQL schema
    return {
      id: data.id,
      name: data.name,
      description: null, // Not in schema
      logoUrl: data.logo_url,
      region: data.region_id, // Use region_id
      isActive: true, // Default to true
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.created_at || new Date().toISOString()
    };
  }

  async getTeams(limit = 10, offset = 0) {
    const { data, error } = await this.client
      .from('teams')
      .select('*')
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching teams:', error);
      throw new Error(`Failed to fetch teams: ${error.message}`);
    }

    // Transform to match our GraphQL schema
    return (data || []).map(team => ({
      id: team.id,
      name: team.name,
      description: null,
      logoUrl: team.logo_url,
      region: team.region_id,
      isActive: true,
      createdAt: team.created_at || new Date().toISOString(),
      updatedAt: team.created_at || new Date().toISOString()
    }));
  }

  // Event operations
  async getEvent(id: string) {
    const { data, error } = await this.client
      .from('events')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching event:', error);
      throw new Error(`Failed to fetch event: ${error.message}`);
    }

    // Transform to match our GraphQL schema
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      eventType: data.type || 'Tournament',
      tier: data.tier || 'T3',
      status: data.status?.toLowerCase() || 'open',
      entryFee: 0, // Not in schema
      maxParticipants: null, // Not in schema
      currentParticipants: 0, // Not in schema
      startDate: data.start_date,
      endDate: data.end_date,
      createdBy: '1', // Default
      createdAt: new Date().toISOString(), // Not in schema
      updatedAt: new Date().toISOString() // Not in schema
    };
  }

  async getEvents(filters: any = {}, limit = 10, offset = 0) {
    let query = this.client
      .from('events')
      .select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.eventType) {
      query = query.eq('type', filters.eventType);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('id', { ascending: false });

    if (error) {
      console.error('Error fetching events:', error);
      throw new Error(`Failed to fetch events: ${error.message}`);
    }

    // Transform to match our GraphQL schema
    return (data || []).map(event => ({
      id: event.id,
      name: event.name,
      description: event.description,
      eventType: event.type || 'Tournament',
      tier: event.tier || 'T3',
      status: event.status?.toLowerCase() || 'open',
      entryFee: 0,
      maxParticipants: null,
      currentParticipants: 0,
      startDate: event.start_date,
      endDate: event.end_date,
      createdBy: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
  }

  // Player match stats operations
  async submitMatchStats(matchId: string, stats: any[]) {
    const { data, error } = await this.client
      .from('player_match_stats')
      .upsert(stats.map(stat => ({ ...stat, match_id: matchId })), {
        onConflict: 'match_id,player_id'
      })
      .select();

    if (error) {
      console.error('Error submitting match stats:', error);
      throw new Error(`Failed to submit match stats: ${error.message}`);
    }

    return data || [];
  }

  // League operations
  async getLeague(id: string) {
    const { data, error } = await this.client
      .from('leagues_info')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching league:', error);
      throw new Error(`Failed to fetch league: ${error.message}`);
    }

    return data;
  }

  async getLeagues(limit = 10, offset = 0) {
    const { data, error } = await this.client
      .from('leagues_info')
      .select('*')
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching leagues:', error);
      throw new Error(`Failed to fetch leagues: ${error.message}`);
    }

    return data || [];
  }

  // League Season operations
  async getLeagueSeason(id: string) {
    const { data, error } = await this.client
      .from('league_seasons')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching league season:', error);
      throw new Error(`Failed to fetch league season: ${error.message}`);
    }

    return data;
  }

  async getLeagueSeasons(filters: any = {}, limit = 10, offset = 0) {
    let query = this.client.from('league_seasons').select('*');

    if (filters.leagueId) {
      query = query.eq('league_id', filters.leagueId);
    }
    if (typeof filters.isActive === 'boolean') {
      query = query.eq('is_active', filters.isActive);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('start_date', { ascending: false });

    if (error) {
      console.error('Error fetching league seasons:', error);
      throw new Error(`Failed to fetch league seasons: ${error.message}`);
    }

    return data || [];
  }

  // City Crew operations
  async getCityCrew(id: string) {
    const { data, error } = await this.client
      .from('city_crews')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching city crew:', error);
      throw new Error(`Failed to fetch city crew: ${error.message}`);
    }

    return data;
  }

  async getCityCrews(limit = 10, offset = 0) {
    const { data, error } = await this.client
      .from('city_crews')
      .select('*')
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching city crews:', error);
      throw new Error(`Failed to fetch city crews: ${error.message}`);
    }

    return data || [];
  }

  // Achievement operations
  async getAchievement(id: string) {
    const { data, error } = await this.client
      .from('achievements')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching achievement:', error);
      throw new Error(`Failed to fetch achievement: ${error.message}`);
    }

    return data;
  }

  async getAchievements(filters: any = {}, limit = 20, offset = 0) {
    let query = this.client.from('achievements').select('*');

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.rarity) {
      query = query.eq('rarity', filters.rarity);
    }
    if (filters.tier) {
      query = query.eq('tier', filters.tier);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching achievements:', error);
      throw new Error(`Failed to fetch achievements: ${error.message}`);
    }

    return data || [];
  }

  // Achievement Rule operations
  async getAchievementRule(id: string) {
    const { data, error } = await this.client
      .from('achievement_rules')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching achievement rule:', error);
      throw new Error(`Failed to fetch achievement rule: ${error.message}`);
    }

    return data;
  }

  async getAchievementRules(filters: any = {}, limit = 20, offset = 0) {
    let query = this.client.from('achievement_rules').select('*');

    if (typeof filters.isActive === 'boolean') {
      query = query.eq('is_active', filters.isActive);
    }
    if (filters.gameYear) {
      query = query.eq('game_year', filters.gameYear);
    }
    if (filters.leagueId) {
      query = query.eq('league_id', filters.leagueId);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching achievement rules:', error);
      throw new Error(`Failed to fetch achievement rules: ${error.message}`);
    }

    return data || [];
  }

  // Player Award operations
  async getPlayerAwards(playerId: string, filters: any = {}, limit = 20, offset = 0) {
    let query = this.client.from('player_awards').select('*').eq('player_id', playerId);

    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.rarity) {
      query = query.eq('rarity', filters.rarity);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('awarded_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Error fetching player awards:', error);
      throw new Error(`Failed to fetch player awards: ${error.message}`);
    }

    return data || [];
  }

  // Conference and Division operations
  async getLeagueConference(id: string) {
    const { data, error } = await this.client
      .from('lg_conf')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching league conference:', error);
      throw new Error(`Failed to fetch league conference: ${error.message}`);
    }

    return data;
  }

  async getLeagueConferences(limit = 10, offset = 0) {
    const { data, error } = await this.client
      .from('lg_conf')
      .select('*')
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching league conferences:', error);
      throw new Error(`Failed to fetch league conferences: ${error.message}`);
    }

    return data || [];
  }

  async getLeagueDivision(id: string) {
    const { data, error } = await this.client
      .from('lg_divisions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching league division:', error);
      throw new Error(`Failed to fetch league division: ${error.message}`);
    }

    return data;
  }

  async getLeagueDivisions(filters: any = {}, limit = 10, offset = 0) {
    let query = this.client.from('lg_divisions').select('*');

    if (filters.conferenceId) {
      query = query.eq('conference_id', filters.conferenceId);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching league divisions:', error);
      throw new Error(`Failed to fetch league divisions: ${error.message}`);
    }

    return data || [];
  }

  // Player Stats operations
  async getPlayerStats(playerId: string) {
    const { data, error } = await this.client
      .from('player_stats')
      .select('*')
      .eq('player_id', playerId)
      .single();

    if (error) {
      console.error('Error fetching player stats:', error);
      throw new Error(`Failed to fetch player stats: ${error.message}`);
    }

    return data;
  }

  async getPlayerStatsByLeagueSeason(playerId: string, leagueId?: string, seasonId?: string) {
    let query = this.client
      .from('player_stats_by_league_season')
      .select('*')
      .eq('player_id', playerId);

    if (leagueId) {
      query = query.eq('league_id', leagueId);
    }
    if (seasonId) {
      query = query.eq('season_id', seasonId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching player league season stats:', error);
      throw new Error(`Failed to fetch player league season stats: ${error.message}`);
    }

    return data || [];
  }

  // Tournament operations
  async getTournament(id: string) {
    const { data, error } = await this.client
      .from('tournaments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching tournament:', error);
      throw new Error(`Failed to fetch tournament: ${error.message}`);
    }

    return data;
  }

  async getTournaments(filters: any = {}, limit = 10, offset = 0) {
    let query = this.client.from('tournaments').select('*');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    if (filters.tier) {
      query = query.eq('tier', filters.tier);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tournaments:', error);
      throw new Error(`Failed to fetch tournaments: ${error.message}`);
    }

    return data || [];
  }

  // Analytics Marts (read-only views)
  async getPlayerPerformanceMart(playerId?: string, limit = 20, offset = 0) {
    let query = this.client.from('player_performance_mart').select('*');

    if (playerId) {
      query = query.eq('player_id', playerId);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('avg_performance_score', { ascending: false });

    if (error) {
      console.error('Error fetching player performance mart:', error);
      throw new Error(`Failed to fetch player performance mart: ${error.message}`);
    }

    return data || [];
  }

  async getTeamAnalyticsMart(teamId?: string, limit = 20, offset = 0) {
    let query = this.client.from('team_analytics_mart').select('*');

    if (teamId) {
      query = query.eq('team_id', teamId);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('win_percentage', { ascending: false });

    if (error) {
      console.error('Error fetching team analytics mart:', error);
      throw new Error(`Failed to fetch team analytics mart: ${error.message}`);
    }

    return data || [];
  }

  async getMatchAnalyticsMart(matchId?: string, limit = 20, offset = 0) {
    let query = this.client.from('match_analytics_mart').select('*');

    if (matchId) {
      query = query.eq('match_id', matchId);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('played_at', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Error fetching match analytics mart:', error);
      throw new Error(`Failed to fetch match analytics mart: ${error.message}`);
    }

    return data || [];
  }

  async getLeagueResults(leagueId?: string, seasonId?: string, limit = 20, offset = 0) {
    let query = this.client.from('league_results').select('*');

    if (leagueId) {
      query = query.eq('league_id', leagueId);
    }
    if (seasonId) {
      query = query.eq('season_id', seasonId);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('points', { ascending: false });

    if (error) {
      console.error('Error fetching league results:', error);
      throw new Error(`Failed to fetch league results: ${error.message}`);
    }

    return data || [];
  }

  async getTournamentResults(tournamentId?: string, limit = 20, offset = 0) {
    let query = this.client.from('tournament_results').select('*');

    if (tournamentId) {
      query = query.eq('tournament_id', tournamentId);
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)
      .order('placement', { ascending: true });

    if (error) {
      console.error('Error fetching tournament results:', error);
      throw new Error(`Failed to fetch tournament results: ${error.message}`);
    }

    return data || [];
  }

  // Team Roster operations
  async getTeamRosterCurrent(teamId: string) {
    const { data, error } = await this.client
      .from('team_roster_current')
      .select('*')
      .eq('team_id', teamId);

    if (error) {
      console.error('Error fetching current team roster:', error);
      throw new Error(`Failed to fetch current team roster: ${error.message}`);
    }

    return data || [];
  }

  async getTeamRosterHistory(teamId: string, limit = 20, offset = 0) {
    const { data, error } = await this.client
      .from('team_roster_history')
      .select('*')
      .eq('team_id', teamId)
      .range(offset, offset + limit - 1)
      .order('joined_at', { ascending: false });

    if (error) {
      console.error('Error fetching team roster history:', error);
      throw new Error(`Failed to fetch team roster history: ${error.message}`);
    }

    return data || [];
  }

  // Health check
  async healthCheck() {
    try {
      const { data, error } = await this.client
        .from('players')
        .select('count')
        .limit(1);

      if (error) {
        throw error;
      }

      return { status: 'healthy', database: 'connected' };
    } catch (error) {
      console.error('Health check failed:', error);
      return { status: 'unhealthy', database: 'disconnected', error: (error as Error).message };
    }
  }
}

// Export singleton instance with lazy initialization
let _supabaseService: SupabaseService | null = null;

export const supabaseService = {
  get instance(): SupabaseService {
    if (!_supabaseService) {
      _supabaseService = new SupabaseService();
    }
    return _supabaseService;
  }
}; 