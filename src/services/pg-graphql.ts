import { createClient, SupabaseClient } from '@supabase/supabase-js';

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
   * This calls the graphql.resolve() function in PostgreSQL
   */
  private async executeGraphQLQuery(query: string, variables?: any) {
    try {
      // Use pg_graphql's graphql.resolve() function
      const { data, error } = await this.client.rpc('graphql_resolve', {
        query_text: query,
        variables: variables || {}
      });

      if (error) {
        console.error('pg_graphql query error:', error);
        throw new Error(`pg_graphql query failed: ${error.message}`);
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
              id
              gamertag
              alternateGamertag
              discordId
              playerRp
              position
              regionId
              salaryTier
              isRookie
              monthlyValue
              performanceScore
              playerRankScore
              currentTeamId
              twitterId
              createdAt
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
      region: player.regionId,
      currentRp: player.playerRp || 0,
      peakRp: player.playerRp || 0,
      tier: this.calculateTier(player.playerRp || 0),
      position: player.position,
      salaryTier: player.salaryTier,
      teamName: undefined, // Will be populated by resolver
      isVerified: false,
      createdAt: new Date(player.createdAt),
      updatedAt: new Date(player.createdAt)
    };
  }

  /**
   * Get players with pagination using pg_graphql
   */
  async getPlayers(limit = 20, offset = 0, filters?: any) {
    let filterClause = '';
    let variables: any = { limit, offset };

    if (filters?.tier) {
      filterClause = `filter: { playerRp: { gte: ${this.getTierMinRp(filters.tier)} } }`;
    }

    if (filters?.region) {
      filterClause = `filter: { regionId: { eq: "${filters.region}" } }`;
    }

    const query = `
      query GetPlayers($limit: Int!, $offset: Int!) {
        playersCollection(
          first: $limit
          after: $offset
          ${filterClause}
          orderBy: [{ playerRp: DESC_NULLS_LAST }]
        ) {
          edges {
            node {
              id
              gamertag
              alternateGamertag
              discordId
              playerRp
              position
              regionId
              salaryTier
              isRookie
              monthlyValue
              performanceScore
              playerRankScore
              currentTeamId
              twitterId
              createdAt
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
        region: player.regionId,
        currentRp: player.playerRp || 0,
        peakRp: player.playerRp || 0,
        tier: this.calculateTier(player.playerRp || 0),
        position: player.position,
        salaryTier: player.salaryTier,
        teamName: undefined,
        isVerified: false,
        createdAt: new Date(player.createdAt),
        updatedAt: new Date(player.createdAt)
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
              event {
                id
                name
                description
                eventType
                tier
                status
                entryFee
                maxParticipants
                currentParticipants
                startDate
                endDate
                createdBy
                createdAt
                updatedAt
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
      eventId: match.eventId,
      teamAId: match.teamAId,
      teamBId: match.teamBId,
      teamAName: match.teamAName,
      teamBName: match.teamBName,
      stage: match.stage,
      gameNumber: match.gameNumber || 1,
      status: this.determineMatchStatus(match),
      scoreA: match.scoreA,
      scoreB: match.scoreB,
      winnerId: match.winnerId,
      winnerName: match.winnerName,
      boxscoreUrl: match.boxscoreUrl,
      scheduledAt: undefined, // Not in your schema
      playedAt: match.playedAt ? new Date(match.playedAt) : undefined,
      startedAt: undefined, // Not in your schema
      endedAt: undefined, // Not in your schema
      createdAt: new Date(),
      updatedAt: new Date(),
      isLive: false,
      event: match.event ? {
        id: match.event.id,
        name: match.event.name,
        description: match.event.description,
        eventType: match.event.eventType,
        tier: match.event.tier,
        status: match.event.status,
        entryFee: match.event.entryFee,
        maxParticipants: match.event.maxParticipants,
        currentParticipants: match.event.currentParticipants,
        startDate: match.event.startDate ? new Date(match.event.startDate) : undefined,
        endDate: match.event.endDate ? new Date(match.event.endDate) : undefined,
        createdBy: match.event.createdBy,
        createdAt: new Date(match.event.createdAt),
        updatedAt: match.event.updatedAt ? new Date(match.event.updatedAt) : undefined
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
    let variables: any = { limit, offset };

    if (filters.teamId) {
      filterClause = `filter: { or: [{ teamAId: { eq: "${filters.teamId}" } }, { teamBId: { eq: "${filters.teamId}" } }] }`;
    }

    if (filters.eventId) {
      filterClause = `filter: { eventId: { eq: "${filters.eventId}" } }`;
    }

    if (filters.stage) {
      filterClause = `filter: { stage: { eq: "${filters.stage}" } }`;
    }

    const query = `
      query GetMatches($limit: Int!, $offset: Int!) {
        matchesCollection(
          first: $limit
          after: $offset
          ${filterClause}
          orderBy: [{ playedAt: DESC_NULLS_LAST }]
        ) {
          edges {
            node {
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
              event {
                id
                name
                description
                eventType
                tier
                status
                entryFee
                maxParticipants
                currentParticipants
                startDate
                endDate
                createdBy
                createdAt
                updatedAt
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
        eventId: match.eventId,
        teamAId: match.teamAId,
        teamBId: match.teamBId,
        teamAName: match.teamAName,
        teamBName: match.teamBName,
        stage: match.stage,
        gameNumber: match.gameNumber || 1,
        status: this.determineMatchStatus(match),
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
        event: match.event ? {
          id: match.event.id,
          name: match.event.name,
          description: match.event.description,
          eventType: match.event.eventType,
          tier: match.event.tier,
          status: match.event.status,
          entryFee: match.event.entryFee,
          maxParticipants: match.event.maxParticipants,
          currentParticipants: match.event.currentParticipants,
          startDate: match.event.startDate ? new Date(match.event.startDate) : undefined,
          endDate: match.event.endDate ? new Date(match.event.endDate) : undefined,
          createdBy: match.event.createdBy,
          createdAt: new Date(match.event.createdAt),
          updatedAt: match.event.updatedAt ? new Date(match.event.updatedAt) : undefined
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
      query GetTeams($limit: Int!, $offset: Int!) {
        teamsCollection(
          first: $limit
          after: $offset
          orderBy: [{ name: ASC }]
        ) {
          edges {
            node {
              id
              name
              description
              logoUrl
              region
              isActive
              createdAt
              updatedAt
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { limit, offset });
    
    if (!result?.data?.teamsCollection?.edges) {
      return [];
    }

    return result.data.teamsCollection.edges.map((edge: any) => {
      const team = edge.node;
      return {
        id: team.id,
        name: team.name,
        description: team.description,
        logoUrl: team.logoUrl,
        region: team.region,
        isActive: team.isActive,
        createdAt: new Date(team.createdAt),
        updatedAt: team.updatedAt ? new Date(team.updatedAt) : undefined
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
              id
              name
              description
              logoUrl
              region
              isActive
              createdAt
              updatedAt
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
      description: team.description,
      logoUrl: team.logoUrl,
      region: team.region,
      isActive: team.isActive,
      createdAt: new Date(team.createdAt),
      updatedAt: team.updatedAt ? new Date(team.updatedAt) : undefined
    };
  }

  /**
   * Get events using pg_graphql
   */
  async getEvents(filters: any = {}, limit = 10, offset = 0) {
    let filterClause = '';
    let variables: any = { limit, offset };

    if (filters.status) {
      filterClause = `filter: { status: { eq: "${filters.status}" } }`;
    }

    if (filters.eventType) {
      filterClause = `filter: { eventType: { eq: "${filters.eventType}" } }`;
    }

    const query = `
      query GetEvents($limit: Int!, $offset: Int!) {
        eventsCollection(
          first: $limit
          after: $offset
          ${filterClause}
          orderBy: [{ startDate: DESC_NULLS_LAST }]
        ) {
          edges {
            node {
              id
              name
              description
              eventType
              tier
              status
              entryFee
              maxParticipants
              currentParticipants
              startDate
              endDate
              createdBy
              createdAt
              updatedAt
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
        eventType: event.eventType,
        tier: event.tier,
        status: event.status,
        entryFee: event.entryFee,
        maxParticipants: event.maxParticipants,
        currentParticipants: event.currentParticipants,
        startDate: event.startDate ? new Date(event.startDate) : undefined,
        endDate: event.endDate ? new Date(event.endDate) : undefined,
        createdBy: event.createdBy,
        createdAt: new Date(event.createdAt),
        updatedAt: event.updatedAt ? new Date(event.updatedAt) : undefined
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
              id
              name
              description
              eventType
              tier
              status
              entryFee
              maxParticipants
              currentParticipants
              startDate
              endDate
              createdBy
              createdAt
              updatedAt
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
      eventType: event.eventType,
      tier: event.tier,
      status: event.status,
      entryFee: event.entryFee,
      maxParticipants: event.maxParticipants,
      currentParticipants: event.currentParticipants,
      startDate: event.startDate ? new Date(event.startDate) : undefined,
      endDate: event.endDate ? new Date(event.endDate) : undefined,
      createdBy: event.createdBy,
      createdAt: new Date(event.createdAt),
      updatedAt: event.updatedAt ? new Date(event.updatedAt) : undefined
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

  // Singleton instance
  private static _instance: PgGraphQLService;
  
  static get instance(): PgGraphQLService {
    if (!PgGraphQLService._instance) {
      PgGraphQLService._instance = new PgGraphQLService();
    }
    return PgGraphQLService._instance;
  }
}
