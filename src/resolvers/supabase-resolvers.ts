import { createClient } from '@supabase/supabase-js';
import type { GraphQLContext } from '../types/Context';
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
