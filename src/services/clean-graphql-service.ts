import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Clean GraphQL Service
 * 
 * This service transforms verbose pg_graphql responses into clean, flattened responses
 * that are easier for frontend consumption. It removes the Relay-style structure
 * (edges.node) and provides simple pagination.
 */
export class CleanGraphQLService {
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
   * Transform a pg_graphql connection response to a clean array
   */
  private transformConnection<T>(connection: any, transformNode: (node: any) => T): T[] {
    if (!connection || !connection.edges) {
      return [];
    }
    return connection.edges.map((edge: any) => transformNode(edge.node));
  }

  /**
   * Create pagination info from connection
   */
  private createPaginationInfo(connection: any, limit: number, offset: number) {
    const total = connection.pageInfo?.totalCount || 0;
    const page = Math.floor(offset / limit) + 1;
    const hasMore = connection.pageInfo?.hasNextPage || false;

    return {
      total,
      page,
      limit,
      hasMore
    };
  }

  /**
   * Get a single player by ID
   */
  async getPlayer(id: string) {
    const query = `
      query GetPlayer($id: UUID!) {
        playersCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
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
              regions {
                nodeId
                id
                name
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { id });
    const edges = result.data.playersCollection.edges;
    
    if (edges.length === 0) {
      return null;
    }

    const node = edges[0].node;
    return this.transformPlayer(node);
  }

  /**
   * Get players with pagination
   */
  async getPlayers(limit = 20, offset = 0) {
    const query = `
      query GetPlayers($limit: Int!, $offset: Int!) {
        playersCollection(first: $limit, offset: $offset) {
          edges {
            node {
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
              regions {
                nodeId
                id
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            totalCount
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { limit, offset });
    const connection = result.data.playersCollection;
    
    const items = this.transformConnection(connection, (node) => this.transformPlayer(node));
    const pagination = this.createPaginationInfo(connection, limit, offset);

    return {
      items,
      pagination
    };
  }

  /**
   * Get a single team by ID
   */
  async getTeam(id: string) {
    const query = `
      query GetTeam($id: UUID!) {
        teamsCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
              id
              name
              logo_url
              region_id
              current_rp
              elo_rating
              global_rank
              leaderboard_tier
              created_at
              player_rank_score
              money_won
              regions {
                nodeId
                id
                name
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { id });
    const edges = result.data.teamsCollection.edges;
    
    if (edges.length === 0) {
      return null;
    }

    const node = edges[0].node;
    return this.transformTeam(node);
  }

  /**
   * Get teams with pagination
   */
  async getTeams(limit = 20, offset = 0) {
    const query = `
      query GetTeams($limit: Int!, $offset: Int!) {
        teamsCollection(first: $limit, offset: $offset) {
          edges {
            node {
              id
              name
              logo_url
              region_id
              current_rp
              elo_rating
              global_rank
              leaderboard_tier
              created_at
              player_rank_score
              money_won
              regions {
                nodeId
                id
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            totalCount
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { limit, offset });
    const connection = result.data.teamsCollection;
    
    const items = this.transformConnection(connection, (node) => this.transformTeam(node));
    const pagination = this.createPaginationInfo(connection, limit, offset);

    return {
      items,
      pagination
    };
  }

  /**
   * Get a single match by ID
   */
  async getMatch(id: string) {
    const query = `
      query GetMatch($id: UUID!) {
        matchesCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
              id
              event_id
              team_a_id
              team_b_id
              winner_id
              score_a
              score_b
              played_at
              boxscore_url
              team_a_name
              stage
              game_number
              team_b_name
              winner_name
              events {
                nodeId
                id
                name
                type
                is_global
                region_id
                start_date
                end_date
                max_rp
                decay_days
                processed
                description
                banner_url
                rules_url
                processed_at
                status
                tier
                season_number
                prize_pool
              }
              teams {
                nodeId
                id
                name
                logo_url
                region_id
                current_rp
                elo_rating
                global_rank
                leaderboard_tier
                created_at
                player_rank_score
                money_won
              }
              player_statsCollection {
                edges {
                  node {
                    id
                    player_id
                    match_id
                    team_id
                    points
                    assists
                    rebounds
                    steals
                    blocks
                    turnovers
                    fouls
                    ps
                    created_at
                    fgm
                    fga
                    three_points_made
                    three_points_attempted
                    ftm
                    fta
                    plus_minus
                    player_name
                    updated_at
                  }
                }
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { id });
    const edges = result.data.matchesCollection.edges;
    
    if (edges.length === 0) {
      return null;
    }

    const node = edges[0].node;
    return this.transformMatch(node);
  }

  /**
   * Get matches with pagination
   */
  async getMatches(limit = 20, offset = 0) {
    const query = `
      query GetMatches($limit: Int!, $offset: Int!) {
        matchesCollection(first: $limit, offset: $offset) {
          edges {
            node {
              id
              event_id
              team_a_id
              team_b_id
              winner_id
              score_a
              score_b
              played_at
              boxscore_url
              team_a_name
              stage
              game_number
              team_b_name
              winner_name
              events {
                nodeId
                id
                name
                type
                is_global
                region_id
                start_date
                end_date
                max_rp
                decay_days
                processed
                description
                banner_url
                rules_url
                processed_at
                status
                tier
                season_number
                prize_pool
              }
              teams {
                nodeId
                id
                name
                logo_url
                region_id
                current_rp
                elo_rating
                global_rank
                leaderboard_tier
                created_at
                player_rank_score
                money_won
              }
            }
          }
          pageInfo {
            hasNextPage
            totalCount
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { limit, offset });
    const connection = result.data.matchesCollection;
    
    const items = this.transformConnection(connection, (node) => this.transformMatch(node));
    const pagination = this.createPaginationInfo(connection, limit, offset);

    return {
      items,
      pagination
    };
  }

  /**
   * Get a single event by ID
   */
  async getEvent(id: string) {
    const query = `
      query GetEvent($id: UUID!) {
        eventsCollection(filter: { id: { eq: $id } }) {
          edges {
            node {
              id
              name
              type
              is_global
              region_id
              start_date
              end_date
              max_rp
              decay_days
              processed
              description
              banner_url
              rules_url
              processed_at
              status
              tier
              season_number
              prize_pool
              regions {
                nodeId
                id
                name
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { id });
    const edges = result.data.eventsCollection.edges;
    
    if (edges.length === 0) {
      return null;
    }

    const node = edges[0].node;
    return this.transformEvent(node);
  }

  /**
   * Get events with pagination
   */
  async getEvents(limit = 20, offset = 0) {
    const query = `
      query GetEvents($limit: Int!, $offset: Int!) {
        eventsCollection(first: $limit, offset: $offset) {
          edges {
            node {
              id
              name
              type
              is_global
              region_id
              start_date
              end_date
              max_rp
              decay_days
              processed
              description
              banner_url
              rules_url
              processed_at
              status
              tier
              season_number
              prize_pool
              regions {
                nodeId
                id
                name
              }
            }
          }
          pageInfo {
            hasNextPage
            totalCount
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { limit, offset });
    const connection = result.data.eventsCollection;
    
    const items = this.transformConnection(connection, (node) => this.transformEvent(node));
    const pagination = this.createPaginationInfo(connection, limit, offset);

    return {
      items,
      pagination
    };
  }

  /**
   * Get player match statistics for a specific match
   */
  async getPlayerMatchStats(matchId: string) {
    const query = `
      query GetPlayerMatchStats($matchId: UUID!) {
        player_statsCollection(filter: { match_id: { eq: $matchId } }) {
          edges {
            node {
              id
              player_id
              match_id
              team_id
              points
              assists
              rebounds
              steals
              blocks
              turnovers
              fouls
              ps
              created_at
              fgm
              fga
              three_points_made
              three_points_attempted
              ftm
              fta
              plus_minus
              player_name
              updated_at
              players {
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
              }
              matches {
                nodeId
                id
                event_id
                team_a_id
                team_b_id
                winner_id
                score_a
                score_b
                played_at
                boxscore_url
                team_a_name
                stage
                game_number
                team_b_name
                winner_name
              }
              teams {
                nodeId
                id
                name
                logo_url
                region_id
                current_rp
                elo_rating
                global_rank
                leaderboard_tier
                created_at
                player_rank_score
                money_won
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { matchId });
    const connection = result.data.player_statsCollection;
    
    return this.transformConnection(connection, (node) => this.transformPlayerMatchStats(node));
  }

  /**
   * Get team roster
   */
  async getTeamRoster(teamId: string) {
    const query = `
      query GetTeamRoster($teamId: UUID!) {
        team_rostersCollection(filter: { team_id: { eq: $teamId } }) {
          edges {
            node {
              id
              team_id
              player_id
              is_captain
              is_player_coach
              joined_at
              left_at
              event_id
              teams {
                nodeId
                id
                name
                logo_url
                region_id
                current_rp
                elo_rating
                global_rank
                leaderboard_tier
                created_at
                player_rank_score
                money_won
              }
              players {
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
              }
              events {
                nodeId
                id
                name
                type
                is_global
                region_id
                start_date
                end_date
                max_rp
                decay_days
                processed
                description
                banner_url
                rules_url
                processed_at
                status
                tier
                season_number
                prize_pool
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { teamId });
    const connection = result.data.team_rostersCollection;
    
    return this.transformConnection(connection, (node) => this.transformTeamRoster(node));
  }

  /**
   * Get event groups
   */
  async getEventGroups(eventId: string) {
    const query = `
      query GetEventGroups($eventId: UUID!) {
        event_groupsCollection(filter: { event_id: { eq: $eventId } }) {
          edges {
            node {
              id
              event_id
              name
              description
              max_teams
              created_at
              updated_at
              status
              advancement_count
              sort_order
              events {
                nodeId
                id
                name
                type
                is_global
                region_id
                start_date
                end_date
                max_rp
                decay_days
                processed
                description
                banner_url
                rules_url
                processed_at
                status
                tier
                season_number
                prize_pool
              }
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query, { eventId });
    const connection = result.data.event_groupsCollection;
    
    return this.transformConnection(connection, (node) => this.transformEventGroup(node));
  }

  /**
   * Get regions
   */
  async getRegions() {
    const query = `
      query GetRegions {
        regionsCollection {
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `;

    const result = await this.executeGraphQLQuery(query);
    const connection = result.data.regionsCollection;
    
    return this.transformConnection(connection, (node) => this.transformRegion(node));
  }

  /**
   * Transform player data from pg_graphql format to clean format
   */
  private transformPlayer(node: any): any {
    return {
      id: node.id,
      gamertag: node.gamertag,
      alternateGamertag: node.alternate_gamertag,
      discordId: node.discord_id,
      playerRp: node.player_rp,
      position: node.position,
      regionId: node.region_id,
      salaryTier: node.salary_tier,
      isRookie: node.is_rookie,
      monthlyValue: node.monthly_value,
      performanceScore: node.performance_score,
      playerRankScore: node.player_rank_score,
      currentTeamId: node.current_team_id,
      twitterId: node.twitter_id,
      createdAt: node.created_at,
      team: node.teams ? this.transformTeam(node.teams) : null,
      region: node.regions ? this.transformRegion(node.regions) : null
    };
  }

  /**
   * Transform team data from pg_graphql format to clean format
   */
  private transformTeam(node: any): any {
    return {
      id: node.id,
      name: node.name,
      logoUrl: node.logo_url,
      regionId: node.region_id,
      currentRp: node.current_rp,
      eloRating: node.elo_rating,
      globalRank: node.global_rank,
      leaderboardTier: node.leaderboard_tier,
      createdAt: node.created_at,
      playerRankScore: node.player_rank_score,
      moneyWon: node.money_won,
      region: node.regions ? this.transformRegion(node.regions) : null
    };
  }

  /**
   * Transform match data from pg_graphql format to clean format
   */
  private transformMatch(node: any): any {
    return {
      id: node.id,
      eventId: node.event_id,
      teamAId: node.team_a_id,
      teamBId: node.team_b_id,
      winnerId: node.winner_id,
      scoreA: node.score_a,
      scoreB: node.score_b,
      playedAt: node.played_at,
      boxscoreUrl: node.boxscore_url,
      teamAName: node.team_a_name,
      stage: node.stage,
      gameNumber: node.game_number,
      teamBName: node.team_b_name,
      winnerName: node.winner_name,
      event: node.events ? this.transformEvent(node.events) : null,
      teamA: node.teams ? this.transformTeam(node.teams) : null,
      teamB: node.teams ? this.transformTeam(node.teams) : null,
      winner: node.winner_id ? this.transformTeam(node.teams) : null,
      playerStats: node.player_statsCollection ? 
        this.transformConnection(node.player_statsCollection, (statsNode) => this.transformPlayerMatchStats(statsNode)) : []
    };
  }

  /**
   * Transform event data from pg_graphql format to clean format
   */
  private transformEvent(node: any): any {
    return {
      id: node.id,
      name: node.name,
      type: node.type,
      isGlobal: node.is_global,
      regionId: node.region_id,
      startDate: node.start_date,
      endDate: node.end_date,
      maxRp: node.max_rp,
      decayDays: node.decay_days,
      processed: node.processed,
      description: node.description,
      bannerUrl: node.banner_url,
      rulesUrl: node.rules_url,
      processedAt: node.processed_at,
      status: node.status,
      tier: node.tier,
      seasonNumber: node.season_number,
      prizePool: node.prize_pool,
      region: node.regions ? this.transformRegion(node.regions) : null
    };
  }

  /**
   * Transform player match stats data from pg_graphql format to clean format
   */
  private transformPlayerMatchStats(node: any): any {
    return {
      id: node.id,
      playerId: node.player_id,
      matchId: node.match_id,
      teamId: node.team_id,
      points: node.points,
      assists: node.assists,
      rebounds: node.rebounds,
      steals: node.steals,
      blocks: node.blocks,
      turnovers: node.turnovers,
      fouls: node.fouls,
      ps: node.ps,
      createdAt: node.created_at,
      fgm: node.fgm,
      fga: node.fga,
      threePointsMade: node.three_points_made,
      threePointsAttempted: node.three_points_attempted,
      ftm: node.ftm,
      fta: node.fta,
      plusMinus: node.plus_minus,
      playerName: node.player_name,
      updatedAt: node.updated_at,
      player: node.players ? this.transformPlayer(node.players) : null,
      match: node.matches ? this.transformMatch(node.matches) : null,
      team: node.teams ? this.transformTeam(node.teams) : null
    };
  }

  /**
   * Transform team roster data from pg_graphql format to clean format
   */
  private transformTeamRoster(node: any): any {
    return {
      id: node.id,
      teamId: node.team_id,
      playerId: node.player_id,
      isCaptain: node.is_captain,
      isPlayerCoach: node.is_player_coach,
      joinedAt: node.joined_at,
      leftAt: node.left_at,
      eventId: node.event_id,
      team: node.teams ? this.transformTeam(node.teams) : null,
      player: node.players ? this.transformPlayer(node.players) : null,
      event: node.events ? this.transformEvent(node.events) : null
    };
  }

  /**
   * Transform event group data from pg_graphql format to clean format
   */
  private transformEventGroup(node: any): any {
    return {
      id: node.id,
      eventId: node.event_id,
      name: node.name,
      description: node.description,
      maxTeams: node.max_teams,
      createdAt: node.created_at,
      updatedAt: node.updated_at,
      status: node.status,
      advancementCount: node.advancement_count,
      sortOrder: node.sort_order,
      event: node.events ? this.transformEvent(node.events) : null
    };
  }

  /**
   * Transform region data from pg_graphql format to clean format
   */
  private transformRegion(node: any): any {
    return {
      id: node.id,
      name: node.name
    };
  }

  // Singleton pattern
  private static _instance: CleanGraphQLService;

  static get instance(): CleanGraphQLService {
    if (!CleanGraphQLService._instance) {
      CleanGraphQLService._instance = new CleanGraphQLService();
    }
    return CleanGraphQLService._instance;
  }
}
