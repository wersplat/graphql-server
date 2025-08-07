import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PlayerPosition } from '../types/User';

export class PgGraphQLService {
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

  /**
   * Execute a GraphQL query using pg_graphql extension
   * This calls the pg_graphql endpoint directly
   */
  private async executeGraphQLQuery(query: string, variables?: any): Promise<any> {
    try {
      const graphqlEndpoint = `${process.env.SUPABASE_URL}/graphql/v1`;
      
      const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': process.env.SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          query,
          variables: variables || {}
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as any;
      
      if (data.errors) {
        console.error('pg_graphql query error:', data.errors);
        throw new Error(`pg_graphql query failed: ${data.errors[0].message}`);
      }

      return data;
    } catch (error) {
      console.error('Error executing pg_graphql query:', error);
      throw error;
    }
  }

  /**
   * Get a single player by ID using pg_graphql
   */
  async getPlayer(id: string) {
    const query = `
      query GetPlayer($id: UUID!) {
        playersCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
              nodeId
              id
              gamertag
              alternate_gamertag
              discord_id
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
                global_rank
                leaderboard_tier
                money_won
                created_at
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { id });
    
    if (!result?.data?.playersCollection?.edges?.length) {
      return null;
    }

    const player = result.data.playersCollection.edges[0].node;
    
    // Transform to match your existing Player interface
    return {
      id: player.id,
      userId: player.id,
      gamertag: player.gamertag,
      region: player.region_id,
      currentRp: player.player_rp || 0,
      peakRp: player.player_rp || 0,
      tier: this.calculateTier(player.player_rp || 0),
      position: this.mapPositionValue(player.position),
      salaryTier: player.salary_tier,
      teamName: player.teams?.name || undefined,
      isVerified: false,
      createdAt: new Date(player.created_at),
      updatedAt: new Date(player.created_at)
    };
  }

  /**
   * Get players with pagination using pg_graphql
   */
  async getPlayers(limit = 20, offset = 0, filters?: any) {
    let filterClause = '';
    let variables: any = { limit };

    if (filters?.tier) {
      filterClause = `filter: { player_rp: { gte: ${this.getTierMinRp(filters.tier)} } }`;
    }

    if (filters?.region) {
      filterClause = `filter: { region_id: { eq: "${filters.region}" } }`;
    }

    const query = `
      query GetPlayers($limit: Int!) {
        playersCollection(
          first: $limit
          ${filterClause}
        ) {
          edges {
            node {
              nodeId
              id
              gamertag
              alternate_gamertag
              discord_id
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
                global_rank
                leaderboard_tier
                money_won
                created_at
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, variables);
    
    if (!result?.data?.playersCollection?.edges) {
      return [];
    }

    return result.data.playersCollection.edges.map((edge: any) => {
      const player = edge.node;
      return {
        id: player.id,
        userId: player.id,
        gamertag: player.gamertag,
        region: player.region_id,
        currentRp: player.player_rp || 0,
        peakRp: player.player_rp || 0,
        tier: this.calculateTier(player.player_rp || 0),
        position: this.mapPositionValue(player.position),
        salaryTier: player.salary_tier,
        teamName: player.teams?.name || undefined,
        isVerified: false,
        createdAt: new Date(player.created_at),
        updatedAt: new Date(player.created_at)
      };
    });
  }

  /**
   * Get a single match by ID using pg_graphql
   */
  async getMatch(id: string) {
    const query = `
      query GetMatch($id: UUID!) {
        matchesCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
              nodeId
              id
              event_id
              team_a_id
              team_b_id
              team_a_name
              team_b_name
              stage
              game_number
              score_a
              score_b
              winner_id
              winner_name
              boxscore_url
              played_at
              events {
                nodeId
                id
                name
                description
                type
                tier
                status
                prize_pool
                max_rp
                start_date
                end_date
                region_id
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { id });
    
    if (!result?.data?.matchesCollection?.edges?.length) {
      return null;
    }

    const match = result.data.matchesCollection.edges[0].node;
    
    return {
      id: match.id,
      eventId: match.event_id,
      teamAId: match.team_a_id,
      teamBId: match.team_b_id,
      teamAName: match.team_a_name,
      teamBName: match.team_b_name,
      stage: match.stage,
      gameNumber: match.game_number || 1,
      status: this.determineMatchStatus(match),
      scoreA: match.score_a,
      scoreB: match.score_b,
      winnerId: match.winner_id,
      winnerName: match.winner_name,
      boxscoreUrl: match.boxscore_url,
      scheduledAt: undefined, // Not in your schema
      playedAt: match.played_at ? new Date(match.played_at) : undefined,
      startedAt: undefined, // Not in your schema
      endedAt: undefined, // Not in your schema
      createdAt: new Date(),
      updatedAt: new Date(),
      isLive: false,
      event: match.events ? {
        id: match.events.id,
        name: match.events.name,
        description: match.events.description,
        eventType: match.events.type,
        tier: match.events.tier,
        status: match.events.status,
        entryFee: 0, // Not in schema, defaulting to 0
        maxParticipants: undefined, // Not in schema
        currentParticipants: 0, // Not in schema, defaulting to 0
        startDate: match.events.start_date ? new Date(match.events.start_date) : undefined,
        endDate: match.events.end_date ? new Date(match.events.end_date) : undefined,
        createdBy: 'system', // Not in schema, defaulting to system
        createdAt: new Date(),
        updatedAt: undefined
      } : undefined,
      teamAPlayers: [],
      teamBPlayers: []
    };
  }

  /**
   * Get matches with filtering using pg_graphql
   */
  async getMatches(filters: any = {}, limit = 20, offset = 0) {
    let filterClause = '';
    let variables: any = { limit };

    if (filters.teamId) {
      filterClause = `filter: { or: [{ team_a_id: { eq: "${filters.teamId}" } }, { team_b_id: { eq: "${filters.teamId}" } }] }`;
    }

    if (filters.eventId) {
      filterClause = `filter: { event_id: { eq: "${filters.eventId}" } }`;
    }

    if (filters.stage) {
      filterClause = `filter: { stage: { eq: "${filters.stage}" } }`;
    }

    const query = `
      query GetMatches($limit: Int!) {
        matchesCollection(
          first: $limit
          ${filterClause}
        ) {
          edges {
            node {
              nodeId
              id
              event_id
              team_a_id
              team_b_id
              team_a_name
              team_b_name
              stage
              game_number
              score_a
              score_b
              winner_id
              winner_name
              boxscore_url
              played_at
              events {
                nodeId
                id
                name
                description
                type
                tier
                status
                prize_pool
                max_rp
                start_date
                end_date
                region_id
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, variables);
    
    if (!result?.data?.matchesCollection?.edges) {
      return [];
    }

    return result.data.matchesCollection.edges.map((edge: any) => {
      const match = edge.node;
      return {
        id: match.id,
        eventId: match.event_id,
        teamAId: match.team_a_id,
        teamBId: match.team_b_id,
        teamAName: match.team_a_name,
        teamBName: match.team_b_name,
        stage: match.stage,
        gameNumber: match.game_number || 1,
        status: this.determineMatchStatus(match),
        scoreA: match.score_a,
        scoreB: match.score_b,
        winnerId: match.winner_id,
        winnerName: match.winner_name,
        boxscoreUrl: match.boxscore_url,
        scheduledAt: undefined,
        playedAt: match.played_at ? new Date(match.played_at) : undefined,
        startedAt: undefined,
        endedAt: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
        isLive: false,
        event: match.events ? {
          id: match.events.id,
          name: match.events.name,
          description: match.events.description,
          eventType: match.events.type,
          tier: match.events.tier,
          status: match.events.status,
          entryFee: 0, // Not in schema, defaulting to 0
          maxParticipants: undefined, // Not in schema
          currentParticipants: 0, // Not in schema, defaulting to 0
          startDate: match.events.start_date ? new Date(match.events.start_date) : undefined,
          endDate: match.events.end_date ? new Date(match.events.end_date) : undefined,
          createdBy: 'system', // Not in schema, defaulting to system
          createdAt: new Date(),
          updatedAt: undefined
        } : undefined,
        teamAPlayers: [],
        teamBPlayers: []
      };
    });
  }

  /**
   * Get teams using pg_graphql
   */
  async getTeams(limit = 10, offset = 0) {
    const query = `
      query GetTeams($limit: Int!) {
        teamsCollection(
          first: $limit
        ) {
          edges {
            node {
              nodeId
              id
              name
              logo_url
              region_id
              current_rp
              global_rank
              leaderboard_tier
              money_won
              created_at
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { limit });
    
    if (!result?.data?.teamsCollection?.edges) {
      return [];
    }

    return result.data.teamsCollection.edges.map((edge: any) => {
      const team = edge.node;
      return {
        id: team.id,
        name: team.name,
        description: undefined, // Not in schema
        logoUrl: team.logo_url,
        region: team.region_id,
        isActive: true, // Not in schema, defaulting to true
        createdAt: new Date(team.created_at || Date.now()),
        updatedAt: undefined
      };
    });
  }

  /**
   * Get a single team by ID using pg_graphql
   */
  async getTeam(id: string) {
    const query = `
      query GetTeam($id: UUID!) {
        teamsCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
              nodeId
              id
              name
              logo_url
              region_id
              current_rp
              global_rank
              leaderboard_tier
              money_won
              created_at
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { id });
    
    if (!result?.data?.teamsCollection?.edges?.length) {
      return null;
    }

    const team = result.data.teamsCollection.edges[0].node;
    
    return {
      id: team.id,
      name: team.name,
      description: undefined, // Not in schema
      logoUrl: team.logo_url,
      region: team.region_id,
      isActive: true, // Not in schema, defaulting to true
      createdAt: new Date(team.created_at || Date.now()),
      updatedAt: undefined
    };
  }

  /**
   * Get events using pg_graphql
   */
  async getEvents(filters: any = {}, limit = 10, offset = 0) {
    let filterClause = '';
    let variables: any = { limit };

    if (filters.status) {
      filterClause = `filter: { status: { eq: "${filters.status}" } }`;
    }

    if (filters.type) {
      filterClause = `filter: { type: { eq: "${filters.type}" } }`;
    }

    const query = `
      query GetEvents($limit: Int!) {
        eventsCollection(
          first: $limit
          ${filterClause}
        ) {
          edges {
            node {
              nodeId
              id
              name
              description
              type
              tier
              status
              prize_pool
              max_rp
              start_date
              end_date
              region_id
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, variables);
    
    if (!result?.data?.eventsCollection?.edges) {
      return [];
    }

    return result.data.eventsCollection.edges.map((edge: any) => {
      const event = edge.node;
      return {
        id: event.id,
        name: event.name,
        description: event.description,
        eventType: event.type,
        tier: event.tier,
        status: event.status,
        entryFee: 0, // Not in schema, defaulting to 0
        maxParticipants: undefined, // Not in schema
        currentParticipants: 0, // Not in schema, defaulting to 0
        startDate: event.start_date ? new Date(event.start_date) : undefined,
        endDate: event.end_date ? new Date(event.end_date) : undefined,
        createdBy: 'system', // Not in schema, defaulting to system
        createdAt: new Date(),
        updatedAt: undefined
      };
    });
  }

  /**
   * Get a single event by ID using pg_graphql
   */
  async getEvent(id: string) {
    const query = `
      query GetEvent($id: UUID!) {
        eventsCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
              nodeId
              id
              name
              description
              type
              tier
              status
              prize_pool
              max_rp
              start_date
              end_date
              region_id
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { id });
    
    if (!result?.data?.eventsCollection?.edges?.length) {
      return null;
    }

    const event = result.data.eventsCollection.edges[0].node;
    
    return {
      id: event.id,
      name: event.name,
      description: event.description,
      eventType: event.type,
      tier: event.tier,
      status: event.status,
      entryFee: 0, // Not in schema, defaulting to 0
      maxParticipants: undefined, // Not in schema
      currentParticipants: 0, // Not in schema, defaulting to 0
      startDate: event.start_date ? new Date(event.start_date) : undefined,
      endDate: event.end_date ? new Date(event.end_date) : undefined,
      createdBy: 'system', // Not in schema, defaulting to system
      createdAt: new Date(),
      updatedAt: undefined
    };
  }

  /**
   * Create a new match using pg_graphql mutation
   */
  async createMatch(matchData: any) {
    const mutation = `
      mutation CreateMatch($input: matchesInsertInput!) {
        insertIntoMatchesCollection(objects: [$input]) {
          records {
            id
            eventId
            teamAId
            teamBId
            teamAName
            teamBName
            stage
            gameNumber
            scoreA
            scoreB
            winnerId
            winnerName
            boxscoreUrl
            playedAt
          }
        }
      }
    `;

    const input = {
      eventId: matchData.event_id,
      teamAId: matchData.team_a_id,
      teamBId: matchData.team_b_id,
      teamAName: matchData.team_a_name,
      teamBName: matchData.team_b_name,
      stage: matchData.stage,
      gameNumber: matchData.game_number
    };

    const result = await this.executeGraphQLQuery(mutation, { input });
    
    if (!result?.data?.insertIntoMatchesCollection?.records?.length) {
      throw new Error('Failed to create match');
    }

    const match = result.data.insertIntoMatchesCollection.records[0];
    
    return {
      id: match.id,
      eventId: match.eventId,
      teamAId: match.teamAId,
      teamBId: match.teamBId,
      teamAName: match.teamAName,
      teamBName: match.teamBName,
      stage: match.stage,
      gameNumber: match.gameNumber || 1,
      status: 'scheduled',
      scoreA: match.scoreA,
      scoreB: match.scoreB,
      winnerId: match.winnerId,
      winnerName: match.winnerName,
      boxscoreUrl: match.boxscoreUrl,
      scheduledAt: undefined,
      playedAt: match.playedAt ? new Date(match.playedAt) : undefined,
      startedAt: undefined,
      endedAt: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      isLive: false,
      teamAPlayers: [],
      teamBPlayers: []
    };
  }

  /**
   * Submit match stats using pg_graphql mutation
   */
  async submitMatchStats(matchId: string, stats: any[]) {
    const mutation = `
      mutation SubmitMatchStats($input: [player_match_statsInsertInput!]!) {
        insertIntoPlayerMatchStatsCollection(objects: $input) {
          records {
            id
            matchId
            playerId
            teamId
            points
            assists
            rebounds
            steals
            blocks
            turnovers
            fouls
            fgm
            fga
            threePointsMade
            threePointsAttempted
            ftm
            fta
            plusMinus
            minutesPlayed
            createdAt
            updatedAt
          }
        }
      }
    `;

    const input = stats.map(stat => ({
      matchId: matchId,
      playerId: stat.player_id,
      teamId: stat.team_id,
      points: stat.points || 0,
      assists: stat.assists || 0,
      rebounds: stat.rebounds || 0,
      steals: stat.steals || 0,
      blocks: stat.blocks || 0,
      turnovers: stat.turnovers || 0,
      fouls: stat.fouls || 0,
      fgm: stat.fgm || 0,
      fga: stat.fga || 0,
      threePointsMade: stat.three_points_made || 0,
      threePointsAttempted: stat.three_points_attempted || 0,
      ftm: stat.ftm || 0,
      fta: stat.fta || 0,
      plusMinus: stat.plus_minus || 0,
      minutesPlayed: stat.minutes_played || 0
    }));

    const result = await this.executeGraphQLQuery(mutation, { input });
    
    if (!result?.data?.insertIntoPlayerMatchStatsCollection?.records) {
      throw new Error('Failed to submit match stats');
    }

    return result.data.insertIntoPlayerMatchStatsCollection.records.map((stat: any) => ({
      id: stat.id,
      matchId: stat.matchId,
      playerId: stat.playerId,
      teamId: stat.teamId,
      points: stat.points,
      assists: stat.assists,
      rebounds: stat.rebounds,
      steals: stat.steals,
      blocks: stat.blocks,
      turnovers: stat.turnovers,
      fouls: stat.fouls,
      fgm: stat.fgm,
      fga: stat.fga,
      threePointsMade: stat.threePointsMade,
      threePointsAttempted: stat.threePointsAttempted,
      ftm: stat.ftm,
      fta: stat.fta,
      plusMinus: stat.plusMinus,
      minutesPlayed: stat.minutesPlayed,
      createdAt: new Date(stat.createdAt),
      updatedAt: stat.updatedAt ? new Date(stat.updatedAt) : undefined
    }));
  }

  // Helper methods
  private calculateTier(rp: number): string {
    if (rp >= 2800) return 'galaxy_opal';
    if (rp >= 2600) return 'pink_diamond';
    if (rp >= 2400) return 'diamond';
    if (rp >= 2200) return 'platinum';
    if (rp >= 2000) return 'gold';
    if (rp >= 1800) return 'silver';
    return 'bronze';
  }

  private getTierMinRp(tier: string): number {
    const tierMap: { [key: string]: number } = {
      'bronze': 0,
      'silver': 1800,
      'gold': 2000,
      'platinum': 2200,
      'diamond': 2400,
      'pink_diamond': 2600,
      'galaxy_opal': 2800
    };
    return tierMap[tier] || 0;
  }

  private determineMatchStatus(match: any): string {
    if (match.winnerId) return 'completed';
    if (match.scoreA !== null || match.scoreB !== null) return 'in_progress';
    return 'scheduled';
  }

  /**
   * Map database position values to GraphQL enum values
   */
  private mapPositionValue(position: string | null | undefined): PlayerPosition | undefined {
    if (!position) return undefined;
    
    const positionMap: { [key: string]: PlayerPosition } = {
      'Point Guard': PlayerPosition.POINT_GUARD,
      'Shooting Guard': PlayerPosition.SHOOTING_GUARD,
      'Power Forward': PlayerPosition.POWER_FORWARD,
      'Center': PlayerPosition.CENTER,
      'Lock': PlayerPosition.LOCK
    };
    
    return positionMap[position] || undefined;
  }

  // Singleton instance
  private static _instance: PgGraphQLService;
  
  static get instance(): PgGraphQLService {
    if (!PgGraphQLService._instance) {
      PgGraphQLService._instance = new PgGraphQLService();
    }
    return PgGraphQLService._instance;
  }
}
