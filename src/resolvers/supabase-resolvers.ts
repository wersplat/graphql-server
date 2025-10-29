import { createClient } from '@supabase/supabase-js';
import type { GraphQLContext } from '../types/Context';
import { supabaseService } from '../services/supabase';
import { 
  mapPlayerPositionDbToGql, 
  mapMatchStageDbToGql, 
  mapStatusDbToGql,
  mapPlayerPositionGqlToDb,
  mapMatchStageGqlToDb,
  mapStatusGqlToDb
} from '../utils/enum-mapping';

// Type definitions for Supabase database
type Database = {
  public: {
    Tables: any;
    Views: any;
    Functions: any;
    Enums: any;
  };
};

// Initialize Supabase client
let supabaseClient: any = null;

function getSupabaseClient() {
  if (!supabaseClient) {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY environment variables are required');
    }
    
    supabaseClient = createClient(supabaseUrl, supabaseKey);
  }
  return supabaseClient;
}

/**
 * Supabase-aligned GraphQL Resolvers
 * 
 * These resolvers provide direct access to Supabase tables with proper
 * type safety and relationship handling.
 */
export const supabaseResolvers = {
  Query: {
    // Player queries
    getPlayer: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch player: ${error.message}`);
      
      // Map database enum values to GraphQL enum values
      return {
        ...data,
        position: mapPlayerPositionDbToGql(data?.position)
      };
    },

    getPlayers: async (_: any, { tier, region, limit = 20, offset = 0 }: {
      tier?: string;
      region?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('players').select('*');
      
      if (tier) query = query.eq('salary_tier', tier as any);
      if (region) query = query.eq('region_id', region);
      
      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch players: ${error.message}`);
      
      // Map database enum values to GraphQL enum values
      return (data || []).map((player: any) => ({
        ...player,
        position: mapPlayerPositionDbToGql(player.position)
      }));
    },

    // Team queries
    getTeam: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch team: ${error.message}`);
      return data;
    },

    getTeams: async (_: any, { limit = 10, offset = 0 }: {
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch teams: ${error.message}`);
      return data || [];
    },

    // Match queries
    getMatch: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch match: ${error.message}`);
      
      // Map database enum values to GraphQL enum values
      return {
        ...data,
        stage: mapMatchStageDbToGql(data?.stage),
        status: mapStatusDbToGql(data?.status)
      };
    },

    getMatches: async (_: any, { teamId, leagueId, status, stage, limit = 20, offset = 0 }: {
      teamId?: string;
      leagueId?: string;
      status?: string;
      stage?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('matches').select('*');
      
      if (teamId) {
        query = query.or(`team_a_id.eq.${teamId},team_b_id.eq.${teamId}`);
      }
      if (leagueId) query = query.eq('league_id', leagueId);
      if (status) query = query.eq('status', mapStatusGqlToDb(status));
      if (stage) query = query.eq('stage', mapMatchStageGqlToDb(stage));
      
      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('played_at', { ascending: false, nullsFirst: false });
      
      if (error) throw new Error(`Failed to fetch matches: ${error.message}`);
      
      // Map database enum values to GraphQL enum values
      return (data || []).map((match: any) => ({
        ...match,
        stage: mapMatchStageDbToGql(match.stage),
        status: mapStatusDbToGql(match.status)
      }));
    },

    // League queries
    getLeague: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('leagues_info')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch league: ${error.message}`);
      return data;
    },

    getLeagues: async (_: any, { limit = 10, offset = 0 }: {
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('leagues_info')
        .select('*')
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch leagues: ${error.message}`);
      return data || [];
    },

    // League Season queries
    getLeagueSeason: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('league_seasons')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch league season: ${error.message}`);
      return data;
    },

    getLeagueSeasons: async (_: any, { leagueId, isActive, limit = 10, offset = 0 }: {
      leagueId?: string;
      isActive?: boolean;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('league_seasons').select('*');
      
      if (leagueId) query = query.eq('league_id', leagueId);
      if (typeof isActive === 'boolean') query = query.eq('is_active', isActive);
      
      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('start_date', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch league seasons: ${error.message}`);
      return data || [];
    },

    // City Crew queries
    getCityCrew: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('city_crews')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch city crew: ${error.message}`);
      return data;
    },

    getCityCrews: async (_: any, { limit = 10, offset = 0 }: {
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('city_crews')
        .select('*')
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch city crews: ${error.message}`);
      return data || [];
    },

    // Achievement queries
    getAchievement: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch achievement: ${error.message}`);
      return data;
    },

    getAchievements: async (_: any, { category, rarity, tier, limit = 20, offset = 0 }: {
      category?: string;
      rarity?: string;
      tier?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('achievements').select('*');
      
      if (category) query = query.eq('category', category as any);
      if (rarity) query = query.eq('rarity', rarity as any);
      if (tier) query = query.eq('tier', tier as any);
      
      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch achievements: ${error.message}`);
      return data || [];
    },

    // Achievement Rule queries
    getAchievementRule: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('achievement_rules')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch achievement rule: ${error.message}`);
      return data;
    },

    getAchievementRules: async (_: any, { isActive, gameYear, leagueId, limit = 20, offset = 0 }: {
      isActive?: boolean;
      gameYear?: string;
      leagueId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('achievement_rules').select('*');
      
      if (typeof isActive === 'boolean') query = query.eq('is_active', isActive);
      if (gameYear) query = query.eq('game_year', gameYear);
      if (leagueId) query = query.eq('league_id', leagueId);
      
      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch achievement rules: ${error.message}`);
      return data || [];
    },

    // Player Award queries
    getPlayerAwards: async (_: any, { playerId, category, rarity, limit = 20, offset = 0 }: {
      playerId: string;
      category?: string;
      rarity?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('player_awards').select('*').eq('player_id', playerId);
      
      if (category) query = query.eq('category', category);
      if (rarity) query = query.eq('rarity', rarity);
      
      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('awarded_at', { ascending: false, nullsFirst: false });
      
      if (error) throw new Error(`Failed to fetch player awards: ${error.message}`);
      return data || [];
    },

    // Conference and Division queries
    getLeagueConference: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('lg_conf')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch league conference: ${error.message}`);
      return data;
    },

    getLeagueConferences: async (_: any, { limit = 10, offset = 0 }: {
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('lg_conf')
        .select('*')
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch league conferences: ${error.message}`);
      return data || [];
    },

    getLeagueDivision: async (_: any, { id }: { id: string }) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('lg_divisions')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw new Error(`Failed to fetch league division: ${error.message}`);
      return data;
    },

    getLeagueDivisions: async (_: any, { conferenceId, limit = 10, offset = 0 }: {
      conferenceId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('lg_divisions').select('*');
      
      if (conferenceId) query = query.eq('conference_id', conferenceId);
      
      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('created_at', { ascending: false });
      
      if (error) throw new Error(`Failed to fetch league divisions: ${error.message}`);
      return data || [];
    },

    // Dashboard Stats
    getDashboardStats: async () => {
      const supabase = getSupabaseClient();
      
      try {
        // Get basic counts
        const [playersResult, teamsResult, matchesResult] = await Promise.all([
          supabase.from('players').select('id', { count: 'exact', head: true }),
          supabase.from('teams').select('id', { count: 'exact', head: true }),
          supabase.from('matches').select('id', { count: 'exact', head: true })
        ]);

        return {
          totalPlayers: playersResult.count || 0,
          totalTeams: teamsResult.count || 0,
          totalMatches: matchesResult.count || 0,
          activeLeagues: 0, // You can implement this based on your needs
          upcomingMatches: 0 // You can implement this based on your needs
        };
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        // Return default values instead of null to avoid GraphQL errors
        return {
          totalPlayers: 0,
          totalTeams: 0,
          totalMatches: 0,
          activeLeagues: 0,
          upcomingMatches: 0
        };
      }
    },

    // Top Players (Leaderboard)
    getTopPlayers: async (_: any, { limit = 10, tier }: {
      limit?: number;
      tier?: string;
    }) => {
      const supabase = getSupabaseClient();
      
      try {
        const { data, error } = await supabase
          .from('achievement_eligibility_mart')
          .select('*')
          .order('total_achievements_earned', { ascending: false })
          .limit(limit);

        if (error) throw new Error(`Failed to fetch top players: ${error.message}`);

        // Transform to LeaderboardEntry format
        return (data || []).map((player: any, index: number) => ({
          rank: index + 1,
          player: {
            id: player.id,
            username: player.username,
            currentTier: null, // current_tier field doesn't exist in achievement_eligibility_mart
            totalMatchesPlayed: player.total_matches_played || 0,
            wins: player.wins || 0,
            losses: player.losses || 0,
            createdAt: player.created_at
          },
          score: player.wins || 0,
          wins: player.wins || 0,
          losses: player.losses || 0,
          winRate: player.total_matches_played > 0 
            ? ((player.wins || 0) / player.total_matches_played * 100) 
            : 0
        }));
      } catch (error) {
        console.error('Error fetching top players:', error);
        // Return empty array instead of null to avoid GraphQL errors
        return [];
      }
    },

    // Analytics Marts
    getPlayerPerformanceMart: async (_: any, { playerId, limit = 20, offset = 0 }: {
      playerId?: string;
      limit?: number;
      offset?: number;
    }) => {
      return await supabaseService.instance.getPlayerPerformanceMart(playerId, limit, offset);
    },

    getTeamAnalyticsMart: async (_: any, { teamId, limit = 20, offset = 0 }: {
      teamId?: string;
      limit?: number;
      offset?: number;
    }) => {
      return await supabaseService.instance.getTeamAnalyticsMart(teamId, limit, offset);
    },

    getMatchAnalyticsMart: async (_: any, { matchId, limit = 20, offset = 0 }: {
      matchId?: string;
      limit?: number;
      offset?: number;
    }) => {
      return await supabaseService.instance.getMatchAnalyticsMart(matchId, limit, offset);
    },

    // Additional Analytics Views and Marts
    getAchievementEligibilityMart: async (_: any, { playerId, limit = 20, offset = 0 }: {
      playerId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('achievement_eligibility_mart').select('*');
      
      if (playerId) {
        query = query.eq('player_id', playerId);
      }

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('total_achievements_earned', { ascending: false });

      if (error) throw new Error(`Failed to fetch achievement eligibility mart: ${error.message}`);
      return data || [];
    },

    getLeaguePlayerStats: async (_: any, { playerId, seasonId, teamId, leagueType = 'regular_season', limit = 20, offset = 0 }: {
      playerId?: string;
      seasonId?: string;
      teamId?: string;
      leagueType?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      
      // Determine which view to query based on league type
      const viewName = leagueType === 'open' ? 'league_open_player_stats' :
                      leagueType === 'playoff' ? 'league_playoff_player_stats' :
                      'league_regular_season_player_stats';
      
      let query = supabase.from(viewName).select('*');
      
      if (playerId) query = query.eq('player_id', playerId);
      if (seasonId) query = query.eq('season_id', seasonId);
      if (teamId) query = query.eq('team_id', teamId);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('points', { ascending: false });

      if (error) throw new Error(`Failed to fetch league player stats: ${error.message}`);
      return data || [];
    },

    getTournamentStats: async (_: any, { tournamentId, playerId, teamId, statsType = 'player', limit = 20, offset = 0 }: {
      tournamentId?: string;
      playerId?: string;
      teamId?: string;
      statsType?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      
      // Determine which view to query based on stats type
      const viewName = statsType === 'team' ? 'tournament_team_stats' : 'tournament_player_stats';
      
      let query = supabase.from(viewName).select('*');
      
      if (tournamentId) query = query.eq('tournament_id', tournamentId);
      if (playerId && statsType === 'player') query = query.eq('player_id', playerId);
      if (teamId) query = query.eq('team_id', teamId);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('points', { ascending: false });

      if (error) throw new Error(`Failed to fetch tournament stats: ${error.message}`);
      return data || [];
    },

    getHeadToHeadMatchupMart: async (_: any, { team1Id, team2Id, limit = 20, offset = 0 }: {
      team1Id?: string;
      team2Id?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('head_to_head_matchup_mart').select('*');
      
      if (team1Id) query = query.eq('team_1_id', team1Id);
      if (team2Id) query = query.eq('team_2_id', team2Id);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('total_meetings', { ascending: false });

      if (error) throw new Error(`Failed to fetch head to head matchup mart: ${error.message}`);
      return data || [];
    },

    getPlayerHotStreakMart: async (_: any, { playerId, limit = 20, offset = 0 }: {
      playerId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('player_hot_streak_mart').select('*');
      
      if (playerId) {
        query = query.eq('player_id', playerId);
      }

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('current_streak_length', { ascending: false });

      if (error) throw new Error(`Failed to fetch player hot streak mart: ${error.message}`);
      return data || [];
    },

    getRosterValueComparisonMart: async (_: any, { teamId, limit = 20, offset = 0 }: {
      teamId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('roster_value_comparison_mart').select('*');
      
      if (teamId) {
        query = query.eq('team_id', teamId);
      }

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('total_roster_value', { ascending: false });

      if (error) throw new Error(`Failed to fetch roster value comparison mart: ${error.message}`);
      return data || [];
    },

    getTeamMomentumIndicatorsMart: async (_: any, { teamId, limit = 20, offset = 0 }: {
      teamId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('team_momentum_indicators_mart').select('*');
      
      if (teamId) {
        query = query.eq('team_id', teamId);
      }

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('momentum_score', { ascending: false });

      if (error) throw new Error(`Failed to fetch team momentum indicators mart: ${error.message}`);
      return data || [];
    },

    // Complete Views and Marts Collection
    getEventStrengthMetricsMv: async (_: any, { tournamentId, gameYear, limit = 20, offset = 0 }: {
      tournamentId?: string;
      gameYear?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('event_strength_metrics_mv').select('*');
      
      if (tournamentId) query = query.eq('tournament_id', tournamentId);
      if (gameYear) query = query.eq('game_year', gameYear);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('event_strength', { ascending: false });

      if (error) throw new Error(`Failed to fetch event strength metrics: ${error.message}`);
      return data || [];
    },

    getPlayerStatsTrackingMart: async (_: any, { playerId, limit = 20, offset = 0 }: {
      playerId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('player_stats_tracking_mart').select('*');
      
      if (playerId) query = query.eq('player_id', playerId);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('last_game_date', { ascending: false, nullsFirst: false });

      if (error) throw new Error(`Failed to fetch player stats tracking mart: ${error.message}`);
      return data || [];
    },

    getTournamentPerformanceMart: async (_: any, { tournamentId, limit = 20, offset = 0 }: {
      tournamentId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('tournament_performance_mart').select('*');
      
      if (tournamentId) query = query.eq('tournament_id', tournamentId);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('end_date', { ascending: false, nullsFirst: false });

      if (error) throw new Error(`Failed to fetch tournament performance mart: ${error.message}`);
      return data || [];
    },

    getLeagueSeasonPerformanceMart: async (_: any, { seasonId, leagueId, limit = 20, offset = 0 }: {
      seasonId?: string;
      leagueId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('league_season_performance_mart').select('*');
      
      if (seasonId) query = query.eq('season_id', seasonId);
      if (leagueId) query = query.eq('league_id', leagueId);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('season_number', { ascending: false });

      if (error) throw new Error(`Failed to fetch league season performance mart: ${error.message}`);
      return data || [];
    },

    getPlayerPerformanceView: async (_: any, { playerId, limit = 20, offset = 0 }: {
      playerId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('player_performance_view').select('*');
      
      if (playerId) query = query.eq('id', playerId);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('id', { ascending: true });

      if (error) throw new Error(`Failed to fetch player performance view: ${error.message}`);
      return data || [];
    },

    getTeamPerformanceView: async (_: any, { teamId, limit = 20, offset = 0 }: {
      teamId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('team_performance_view').select('*');
      
      if (teamId) query = query.eq('team_id', teamId);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('team_id', { ascending: true });

      if (error) throw new Error(`Failed to fetch team performance view: ${error.message}`);
      return data || [];
    },

    getTeamPerformanceByGameYear: async (_: any, { teamId, gameYear, limit = 20, offset = 0 }: {
      teamId?: string;
      gameYear?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('team_performance_by_game_year').select('*');
      
      if (teamId) query = query.eq('team_id', teamId);
      if (gameYear) query = query.eq('game_year', gameYear);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('game_year', { ascending: false });

      if (error) throw new Error(`Failed to fetch team performance by game year: ${error.message}`);
      return data || [];
    },

    getTournamentChampionsByYear: async (_: any, { gameYear, limit = 20, offset = 0 }: {
      gameYear?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('tournament_champions_by_year').select('*');
      
      if (gameYear) query = query.eq('game_year', gameYear);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('game_year', { ascending: false });

      if (error) throw new Error(`Failed to fetch tournament champions by year: ${error.message}`);
      return data || [];
    },

    getTournamentMvps: async (_: any, { tournamentId, playerId, limit = 20, offset = 0 }: {
      tournamentId?: string;
      playerId?: string;
      limit?: number;
      offset?: number;
    }) => {
      const supabase = getSupabaseClient();
      let query = supabase.from('tournament_mvps').select('*');
      
      if (tournamentId) query = query.eq('tournament_id', tournamentId);
      if (playerId) query = query.eq('player_id', playerId);

      const { data, error } = await query
        .range(offset, offset + limit - 1)
        .order('tournament_id', { ascending: false });

      if (error) throw new Error(`Failed to fetch tournament MVPs: ${error.message}`);
      return data || [];
    }
  },

  // Type resolvers for relationships
  Player: {
    currentTeam: async (parent: any) => {
      if (!parent.current_team_id) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', parent.current_team_id)
        .single();
      
      if (error) return null;
      return data;
    },

    crew: async (parent: any) => {
      if (!parent.crew_affiliation) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('city_crews')
        .select('*')
        .eq('id', parent.crew_affiliation)
        .single();
      
      if (error) return null;
      return data;
    }
  },

  Team: {
    conference: async (parent: any) => {
      if (!parent.lg_conf) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('lg_conf')
        .select('*')
        .eq('id', parent.lg_conf)
        .single();
      
      if (error) return null;
      return data;
    },

    division: async (parent: any) => {
      if (!parent.lg_division) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('lg_divisions')
        .select('*')
        .eq('id', parent.lg_division)
        .single();
      
      if (error) return null;
      return data;
    }
  },

  Match: {
    teamA: async (parent: any) => {
      if (!parent.team_a_id) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', parent.team_a_id)
        .single();
      
      if (error) return null;
      return data;
    },

    teamB: async (parent: any) => {
      if (!parent.team_b_id) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', parent.team_b_id)
        .single();
      
      if (error) return null;
      return data;
    },

    winner: async (parent: any) => {
      if (!parent.winner_id) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', parent.winner_id)
        .single();
      
      if (error) return null;
      return data;
    },

    league: async (parent: any) => {
      if (!parent.league_id) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('leagues_info')
        .select('*')
        .eq('id', parent.league_id)
        .single();
      
      if (error) return null;
      return data;
    },

    season: async (parent: any) => {
      if (!parent.season_id) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('league_seasons')
        .select('*')
        .eq('id', parent.season_id)
        .single();
      
      if (error) return null;
      return data;
    }
  },

  LeagueSeason: {
    league: async (parent: any) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('leagues_info')
        .select('*')
        .eq('id', parent.league_id)
        .single();
      
      if (error) return null;
      return data;
    }
  },

  LeagueDivision: {
    conference: async (parent: any) => {
      if (!parent.conference_id) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('lg_conf')
        .select('*')
        .eq('id', parent.conference_id)
        .single();
      
      if (error) return null;
      return data;
    }
  },

  PlayerAward: {
    player: async (parent: any) => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('id', parent.player_id)
        .single();
      
      if (error) return null;
      
      // Map database enum values to GraphQL enum values
      return {
        ...data,
        position: mapPlayerPositionDbToGql(data?.position)
      };
    },

    achievement: async (parent: any) => {
      if (!parent.achievement_id) return null;
      
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('id', parent.achievement_id)
        .single();
      
      if (error) return null;
      return data;
    }
  }
};
