import { CleanGraphQLService } from '../services/clean-graphql-service';
import type { GraphQLContext } from '../types/Context';

/**
 * Clean GraphQL Resolvers
 * 
 * These resolvers provide a clean, flattened API that removes the verbose
 * Relay-style structure from pg_graphql and provides simple, readable responses.
 */

export const cleanResolvers = {
  Query: {
    // Player queries
    player: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
      try {
        if (ctx.loaders?.playerById) return ctx.loaders.playerById.load(id);
        const q = `
          query GetPlayer($id: UUID!) {
            playersCollection(filter: { id: { eq: $id } }) {
              edges { node { id gamertag region_id player_rp salary_tier position created_at } }
            }
          }
        `;
        const data = await ctx.pg(q, { id });
        return data?.playersCollection?.edges?.[0]?.node ?? null;
      } catch (error) {
        console.error('Error fetching player:', error);
        throw new Error(`Failed to fetch player: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    players: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }, ctx: GraphQLContext) => {
      try {
        const limit = pagination?.limit || 20;
        const offset = pagination?.offset || 0;
        const q = `
          query GetPlayers($first: Int!) {
            playersCollection(first: $first) {
              edges { node { id gamertag region_id player_rp salary_tier position created_at } }
              pageInfo { hasNextPage }
            }
          }
        `;
        const data = await ctx.pg(q, { first: Math.min(limit, 100) });
        const items = (data?.playersCollection?.edges || []).map((e: any) => e.node);
        return {
          items,
          pagination: {
            total: items.length,
            page: Math.floor(offset / limit) + 1,
            limit,
            hasMore: Boolean(data?.playersCollection?.pageInfo?.hasNextPage),
          },
        };
      } catch (error) {
        console.error('Error fetching players:', error);
        throw new Error(`Failed to fetch players: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Team queries
    team: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
      try {
        let t = ctx.loaders?.teamById ? await ctx.loaders.teamById.load(id) : null;
        if (!t) {
          const q = `
            query GetTeam($id: UUID!) {
              teamsCollection(filter: { id: { eq: $id } }) { edges { node { id name logo_url region_id created_at } } }
            }
          `;
          const data = await ctx.pg(q, { id });
          t = data?.teamsCollection?.edges?.[0]?.node;
        }
        if (!t) return null;
        return { id: t.id, name: t.name, logoUrl: t.logo_url, regionId: t.region_id, createdAt: t.created_at };
      } catch (error) {
        console.error('Error fetching team:', error);
        throw new Error(`Failed to fetch team: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    teams: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }, ctx: GraphQLContext) => {
      try {
        const limit = pagination?.limit || 20;
        const offset = pagination?.offset || 0;
        const q = `
          query GetTeams($first: Int!) {
            teamsCollection(first: $first) { edges { node { id name logo_url region_id created_at } } pageInfo { hasNextPage } }
          }
        `;
        const data = await ctx.pg(q, { first: Math.min(limit, 100) });
        const items = (data?.teamsCollection?.edges || []).map((e: any) => ({
          id: e.node.id,
          name: e.node.name,
          logoUrl: e.node.logo_url,
          regionId: e.node.region_id,
          createdAt: e.node.created_at,
        }));
        return {
          items,
          pagination: {
            total: items.length,
            page: Math.floor(offset / limit) + 1,
            limit,
            hasMore: Boolean(data?.teamsCollection?.pageInfo?.hasNextPage),
          },
        };
      } catch (error) {
        console.error('Error fetching teams:', error);
        throw new Error(`Failed to fetch teams: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Match queries
    match: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
      try {
        const q = `
          query GetMatch($id: UUID!) {
            matchesCollection(filter: { id: { eq: $id } }) {
              edges { node { id event_id team_a_id team_b_id team_a_name team_b_name score_a score_b boxscore_url played_at stage game_number winner_id winner_name } }
            }
          }
        `;
        const data = await ctx.pg(q, { id });
        const m = data?.matchesCollection?.edges?.[0]?.node;
        if (!m) return null;
        return {
          id: m.id,
          eventId: m.event_id,
          teamAId: m.team_a_id,
          teamBId: m.team_b_id,
          teamAName: m.team_a_name,
          teamBName: m.team_b_name,
          scoreA: m.score_a,
          scoreB: m.score_b,
          boxscoreUrl: m.boxscore_url,
          playedAt: m.played_at,
          stage: m.stage,
          gameNumber: m.game_number,
          winnerId: m.winner_id,
          winnerName: m.winner_name,
        };
      } catch (error) {
        console.error('Error fetching match:', error);
        throw new Error(`Failed to fetch match: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    matches: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }, ctx: GraphQLContext) => {
      try {
        const limit = pagination?.limit || 20;
        const offset = pagination?.offset || 0;
        const q = `
          query GetMatches($first: Int!) {
            matchesCollection(first: $first) {
              edges { node { id event_id team_a_id team_b_id team_a_name team_b_name score_a score_b played_at stage game_number winner_id winner_name boxscore_url } }
              pageInfo { hasNextPage }
            }
          }
        `;
        const data = await ctx.pg(q, { first: Math.min(limit, 100) });
        const items = (data?.matchesCollection?.edges || []).map((e: any) => ({
          id: e.node.id,
          eventId: e.node.event_id,
          teamAId: e.node.team_a_id,
          teamBId: e.node.team_b_id,
          teamAName: e.node.team_a_name,
          teamBName: e.node.team_b_name,
          scoreA: e.node.score_a,
          scoreB: e.node.score_b,
          playedAt: e.node.played_at,
          stage: e.node.stage,
          gameNumber: e.node.game_number,
          winnerId: e.node.winner_id,
          winnerName: e.node.winner_name,
          boxscoreUrl: e.node.boxscore_url,
        }));
        return {
          items,
          pagination: {
            total: items.length,
            page: Math.floor(offset / limit) + 1,
            limit,
            hasMore: Boolean(data?.matchesCollection?.pageInfo?.hasNextPage),
          },
        };
      } catch (error) {
        console.error('Error fetching matches:', error);
        throw new Error(`Failed to fetch matches: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Event queries
    event: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
      try {
        const q = `
          query GetEvent($id: UUID!) {
            eventsCollection(filter: { id: { eq: $id } }) { edges { node { id name description type tier status start_date end_date region_id prize_pool } } }
          }
        `;
        const data = await ctx.pg(q, { id });
        const e = data?.eventsCollection?.edges?.[0]?.node;
        if (!e) return null;
        return {
          id: e.id,
          name: e.name,
          description: e.description,
          type: e.type,
          tier: e.tier,
          status: e.status,
          startDate: e.start_date,
          endDate: e.end_date,
          regionId: e.region_id,
          prizePool: e.prize_pool,
        };
      } catch (error) {
        console.error('Error fetching event:', error);
        throw new Error(`Failed to fetch event: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    events: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }, ctx: GraphQLContext) => {
      try {
        const limit = pagination?.limit || 20;
        const offset = pagination?.offset || 0;
        const q = `
          query GetEvents($first: Int!) {
            eventsCollection(first: $first) { edges { node { id name description type tier status start_date end_date region_id prize_pool } } pageInfo { hasNextPage } }
          }
        `;
        const data = await ctx.pg(q, { first: Math.min(limit, 100) });
        const items = (data?.eventsCollection?.edges || []).map((e: any) => ({
          id: e.node.id,
          name: e.node.name,
          description: e.node.description,
          type: e.node.type,
          tier: e.node.tier,
          status: e.node.status,
          startDate: e.node.start_date,
          endDate: e.node.end_date,
          regionId: e.node.region_id,
          prizePool: e.node.prize_pool,
        }));
        return {
          items,
          pagination: {
            total: items.length,
            page: Math.floor(offset / limit) + 1,
            limit,
            hasMore: Boolean(data?.eventsCollection?.pageInfo?.hasNextPage),
          },
        };
      } catch (error) {
        console.error('Error fetching events:', error);
        throw new Error(`Failed to fetch events: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Player stats queries
    playerMatchStats: async (_: any, { matchId }: { matchId: string }) => {
      try {
        return await CleanGraphQLService.instance.getPlayerMatchStats(matchId);
      } catch (error) {
        console.error('Error fetching player match stats:', error);
        throw new Error(`Failed to fetch player match stats: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Team roster queries
    teamRoster: async (_: any, { teamId }: { teamId: string }, ctx: GraphQLContext) => {
      try {
        const q = `
          query TeamRoster($teamId: UUID!) {
            team_rostersCollection(filter: { team_id: { eq: $teamId } }) {
              edges { node { id team_id player_id is_captain is_player_coach joined_at left_at event_id } }
            }
          }
        `;
        const data = await ctx.pg(q, { teamId });
        return (data?.team_rostersCollection?.edges || []).map((e: any) => ({
          id: e.node.id,
          teamId: e.node.team_id,
          playerId: e.node.player_id,
          isCaptain: e.node.is_captain,
          isPlayerCoach: e.node.is_player_coach,
          joinedAt: e.node.joined_at,
          leftAt: e.node.left_at,
          eventId: e.node.event_id,
        }));
      } catch (error) {
        console.error('Error fetching team roster:', error);
        throw new Error(`Failed to fetch team roster: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Event group queries
    eventGroups: async (_: any, { eventId }: { eventId: string }) => {
      try {
        return await CleanGraphQLService.instance.getEventGroups(eventId);
      } catch (error) {
        console.error('Error fetching event groups:', error);
        throw new Error(`Failed to fetch event groups: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Region queries
    regions: async () => {
      try {
        return await CleanGraphQLService.instance.getRegions();
      } catch (error) {
        console.error('Error fetching regions:', error);
        throw new Error(`Failed to fetch regions: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    // Placeholder queries for other entities (to be implemented)
    eventGroupMembers: async (_: any, { groupId }: { groupId: string }, ctx: GraphQLContext) => {
      const q = `
        query($groupId: UUID!) {
          event_group_membersCollection(filter: { group_id: { eq: $groupId } }) {
            edges { node { id group_id team_id seed created_at } }
          }
        }
      `;
      const data = await ctx.pg(q, { groupId });
      return (data?.event_group_membersCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        groupId: e.node.group_id,
        teamId: e.node.team_id,
        seed: e.node.seed,
        createdAt: e.node.created_at,
      }));
    },

    groupMatches: async (_: any, { groupId }: { groupId: string }, ctx: GraphQLContext) => {
      const q = `
        query($groupId: UUID!) {
          group_matchesCollection(filter: { group_id: { eq: $groupId } }) {
            edges { node { id group_id match_id round match_number created_at } }
          }
        }
      `;
      const data = await ctx.pg(q, { groupId });
      return (data?.group_matchesCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        groupId: e.node.group_id,
        matchId: e.node.match_id,
        round: e.node.round,
        matchNumber: e.node.match_number,
        createdAt: e.node.created_at,
      }));
    },

    groupStandings: async (_: any, { groupId }: { groupId: string }, ctx: GraphQLContext) => {
      const q = `
        query($groupId: UUID!) {
          group_standingsCollection(filter: { group_id: { eq: $groupId } }) {
            edges { node { id group_id team_id matches_played wins losses points_for points_against point_differential position updated_at } }
          }
        }
      `;
      const data = await ctx.pg(q, { groupId });
      return (data?.group_standingsCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        groupId: e.node.group_id,
        teamId: e.node.team_id,
        matchesPlayed: e.node.matches_played,
        wins: e.node.wins,
        losses: e.node.losses,
        pointsFor: e.node.points_for,
        pointsAgainst: e.node.points_against,
        pointDifferential: e.node.point_differential,
        position: e.node.position,
        updatedAt: e.node.updated_at,
      }));
    },

    rankingPoints: async (_: any, { teamId }: { teamId: string }, ctx: GraphQLContext) => {
      const q = `
        query($teamId: UUID!) {
          ranking_pointsCollection(filter: { team_id: { eq: $teamId } }) {
            edges { node { id team_id source event_id points awarded_at expires_at } }
          }
        }
      `;
      const data = await ctx.pg(q, { teamId });
      return (data?.ranking_pointsCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        teamId: e.node.team_id,
        source: e.node.source,
        eventId: e.node.event_id,
        points: e.node.points,
        awardedAt: e.node.awarded_at,
        expiresAt: e.node.expires_at,
      }));
    },

    rpTransactions: async (_: any, { teamId }: { teamId: string }, ctx: GraphQLContext) => {
      const q = `
        query($teamId: UUID!) {
          rp_transactionsCollection(filter: { team_id: { eq: $teamId } }) {
            edges { node { id team_id event_id amount description type created_at updated_at } }
          }
        }
      `;
      const data = await ctx.pg(q, { teamId });
      return (data?.rp_transactionsCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        teamId: e.node.team_id,
        eventId: e.node.event_id,
        amount: e.node.amount,
        description: e.node.description,
        type: e.node.type,
        createdAt: e.node.created_at,
        updatedAt: e.node.updated_at,
      }));
    },

    playerRpTransactions: async (_: any, { playerId }: { playerId: string }, ctx: GraphQLContext) => {
      const q = `
        query($playerId: UUID!) {
          player_rp_transactionsCollection(filter: { player_id: { eq: $playerId } }) {
            edges { node { id player_id event_id match_id amount description type created_at updated_at } }
          }
        }
      `;
      const data = await ctx.pg(q, { playerId });
      return (data?.player_rp_transactionsCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        playerId: e.node.player_id,
        eventId: e.node.event_id,
        matchId: e.node.match_id,
        amount: e.node.amount,
        description: e.node.description,
        type: e.node.type,
        createdAt: e.node.created_at,
        updatedAt: e.node.updated_at,
      }));
    },

    matchPoints: async (_: any, { matchId }: { matchId: string }, ctx: GraphQLContext) => {
      const q = `
        query($matchId: UUID!) {
          match_pointsCollection(filter: { match_id: { eq: $matchId } }) {
            edges { node { id match_id team_id group_id points_earned point_type created_at updated_at } }
          }
        }
      `;
      const data = await ctx.pg(q, { matchId });
      return (data?.match_pointsCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        matchId: e.node.match_id,
        teamId: e.node.team_id,
        groupId: e.node.group_id,
        pointsEarned: e.node.points_earned,
        pointType: e.node.point_type,
        createdAt: e.node.created_at,
        updatedAt: e.node.updated_at,
      }));
    },

    matchMVP: async (_: any, { matchId }: { matchId: string }, ctx: GraphQLContext) => {
      const q = `
        query($matchId: UUID!) {
          match_mvpCollection(filter: { match_id: { eq: $matchId } }) {
            edges { node { match_id player_id } }
          }
        }
      `;
      const data = await ctx.pg(q, { matchId });
      const node = data?.match_mvpCollection?.edges?.[0]?.node;
      return node ? { matchId: node.match_id, playerId: node.player_id } : null;
    },

    matchSubmissions: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }, ctx: GraphQLContext) => {
      const limit = pagination?.limit || 20;
      const q = `
        query($first: Int!) {
          match_submissionsCollection(first: $first) { edges { node { id event_id match_id team_a_id team_a_name team_b_id team_b_name review_status reviewed_by reviewed_at created_at } } pageInfo { hasNextPage } }
        }
      `;
      const data = await ctx.pg(q, { first: Math.min(limit, 100) });
      const items = (data?.match_submissionsCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        eventId: e.node.event_id,
        matchId: e.node.match_id,
        teamAId: e.node.team_a_id,
        teamAName: e.node.team_a_name,
        teamBId: e.node.team_b_id,
        teamBName: e.node.team_b_name,
        reviewStatus: e.node.review_status,
        reviewedBy: e.node.reviewed_by,
        reviewedAt: e.node.reviewed_at,
        createdAt: e.node.created_at,
      }));
      return {
        items,
        pagination: {
          total: items.length,
          page: 1,
          limit,
          hasMore: Boolean(data?.match_submissionsCollection?.pageInfo?.hasNextPage),
        },
      };
    },

    upcomingMatches: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }, ctx: GraphQLContext) => {
      const limit = pagination?.limit || 20;
      const q = `
        query($first: Int!) {
          upcoming_matchesCollection(first: $first) { edges { node { id event_id scheduled_at venue stream_url notes status created_at updated_at group_id round match_number team_a_id team_b_id team_a_logo team_b_logo } } pageInfo { hasNextPage } }
        }
      `;
      const data = await ctx.pg(q, { first: Math.min(limit, 100) });
      const items = (data?.upcoming_matchesCollection?.edges || []).map((e: any) => ({
        id: e.node.id,
        eventId: e.node.event_id,
        scheduledAt: e.node.scheduled_at,
        venue: e.node.venue,
        streamUrl: e.node.stream_url,
        notes: e.node.notes,
        status: e.node.status,
        createdAt: e.node.created_at,
        updatedAt: e.node.updated_at,
        groupId: e.node.group_id,
        round: e.node.round,
        matchNumber: e.node.match_number,
        teamAId: e.node.team_a_id,
        teamBId: e.node.team_b_id,
        teamALogo: e.node.team_a_logo,
        teamBLogo: e.node.team_b_logo,
      }));
      return {
        items,
        pagination: {
          total: items.length,
          page: 1,
          limit,
          hasMore: Boolean(data?.upcoming_matchesCollection?.pageInfo?.hasNextPage),
        },
      };
    },

    awardsRace: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }) => {
      // TODO: Implement
      throw new Error('awardsRace query not implemented yet');
    },

    updateRace: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }) => {
      // TODO: Implement
      throw new Error('updateRace query not implemented yet');
    },

    draftPool: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }) => {
      // TODO: Implement
      throw new Error('draftPool query not implemented yet');
    },

    eventResults: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }) => {
      // TODO: Implement
      throw new Error('eventResults query not implemented yet');
    },

    teamsPotTracker: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }) => {
      // TODO: Implement
      throw new Error('teamsPotTracker query not implemented yet');
    },

    user: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('user query not implemented yet');
    },

    users: async (_: any, { pagination }: { pagination?: { limit?: number; offset?: number } }) => {
      // TODO: Implement
      throw new Error('users query not implemented yet');
    },

    region: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('region query not implemented yet');
    }
  },

  Mutation: {
    // Player mutations
    createPlayer: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/players', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    updatePlayer: async (_: any, { id, input }: { id: string; input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi(`/players/${id}`, { method: 'PUT', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    deletePlayer: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi(`/players/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return true;
    },

    // Team mutations
    createTeam: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createTeam mutation not implemented yet');
    },

    updateTeam: async (_: any, { id, input }: { id: string; input: any }) => {
      // TODO: Implement
      throw new Error('updateTeam mutation not implemented yet');
    },

    deleteTeam: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('deleteTeam mutation not implemented yet');
    },

    // Match mutations
    createMatch: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/matches', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    updateMatch: async (_: any, { id, input }: { id: string; input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi(`/matches/${id}`, { method: 'PUT', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    deleteMatch: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi(`/matches/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return true;
    },

    // Event mutations
    createEvent: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/events', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    updateEvent: async (_: any, { id, input }: { id: string; input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi(`/events/${id}`, { method: 'PUT', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    deleteEvent: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi(`/events/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return true;
    },

    // Player stats mutations
    createPlayerMatchStats: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createPlayerMatchStats mutation not implemented yet');
    },

    updatePlayerMatchStats: async (_: any, { id, input }: { id: string; input: any }) => {
      // TODO: Implement
      throw new Error('updatePlayerMatchStats mutation not implemented yet');
    },

    deletePlayerMatchStats: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('deletePlayerMatchStats mutation not implemented yet');
    },

    // Team roster mutations
    addPlayerToRoster: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/rosters', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    removePlayerFromRoster: async (_: any, { id }: { id: string }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi(`/rosters/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return true;
    },

    // Event group mutations
    createEventGroup: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createEventGroup mutation not implemented yet');
    },

    updateEventGroup: async (_: any, { id, input }: { id: string; input: any }) => {
      // TODO: Implement
      throw new Error('updateEventGroup mutation not implemented yet');
    },

    deleteEventGroup: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('deleteEventGroup mutation not implemented yet');
    },

    // Event group member mutations
    addTeamToGroup: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('addTeamToGroup mutation not implemented yet');
    },

    removeTeamFromGroup: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('removeTeamFromGroup mutation not implemented yet');
    },

    // Group match mutations
    createGroupMatch: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createGroupMatch mutation not implemented yet');
    },

    updateGroupMatch: async (_: any, { id, input }: { id: string; input: any }) => {
      // TODO: Implement
      throw new Error('updateGroupMatch mutation not implemented yet');
    },

    deleteGroupMatch: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('deleteGroupMatch mutation not implemented yet');
    },

    // Group standings mutations
    updateGroupStandings: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('updateGroupStandings mutation not implemented yet');
    },

    // Ranking points mutations
    awardRankingPoints: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/ranking-points', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    // RP transaction mutations
    createRpTransaction: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/rp-transactions', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    createPlayerRpTransaction: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/player-rp-transactions', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    // Match points mutations
    awardMatchPoints: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/match-points', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    // Match MVP mutations
    setMatchMVP: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi('/match-mvp', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    // Match submission mutations
    submitMatch: async (_: any, { input }: { input: any }, ctx: GraphQLContext) => {
      // authenticated required
      if (ctx.role === 'anon') throw new Error('Unauthorized');
      const res = await ctx.dataApi('/submissions', { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Data API ${res.status}`);
      return await res.json();
    },

    reviewMatchSubmission: async (_: any, { id, input }: { id: string; input: any }, ctx: GraphQLContext) => {
      if (ctx.role !== 'admin') throw new Error('Forbidden');
      const res = await ctx.adminApi(`/submissions/${id}/review`, { method: 'POST', body: JSON.stringify(input) });
      if (!res.ok) throw new Error(`Admin API ${res.status}`);
      return await res.json();
    },

    // Upcoming match mutations
    createUpcomingMatch: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createUpcomingMatch mutation not implemented yet');
    },

    updateUpcomingMatch: async (_: any, { id, input }: { id: string; input: any }) => {
      // TODO: Implement
      throw new Error('updateUpcomingMatch mutation not implemented yet');
    },

    deleteUpcomingMatch: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('deleteUpcomingMatch mutation not implemented yet');
    },

    // Awards race mutations
    createAwardsRace: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createAwardsRace mutation not implemented yet');
    },

    updateAwardsRace: async (_: any, { id, input }: { id: string; input: any }) => {
      // TODO: Implement
      throw new Error('updateAwardsRace mutation not implemented yet');
    },

    deleteAwardsRace: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('deleteAwardsRace mutation not implemented yet');
    },

    // Update race mutations
    createUpdateRace: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createUpdateRace mutation not implemented yet');
    },

    // Draft pool mutations
    addToDraftPool: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('addToDraftPool mutation not implemented yet');
    },

    updateDraftPool: async (_: any, { playerId, input }: { playerId: string; input: any }) => {
      // TODO: Implement
      throw new Error('updateDraftPool mutation not implemented yet');
    },

    removeFromDraftPool: async (_: any, { playerId }: { playerId: string }) => {
      // TODO: Implement
      throw new Error('removeFromDraftPool mutation not implemented yet');
    },

    // Event results mutations
    createEventResults: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createEventResults mutation not implemented yet');
    },

    updateEventResults: async (_: any, { id, input }: { id: string; input: any }) => {
      // TODO: Implement
      throw new Error('updateEventResults mutation not implemented yet');
    },

    deleteEventResults: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('deleteEventResults mutation not implemented yet');
    },

    // Teams pot tracker mutations
    createPotTrackerEntry: async (_: any, { input }: { input: any }) => {
      // TODO: Implement
      throw new Error('createPotTrackerEntry mutation not implemented yet');
    },

    updatePotTrackerEntry: async (_: any, { id, input }: { id: string; input: any }) => {
      // TODO: Implement
      throw new Error('updatePotTrackerEntry mutation not implemented yet');
    },

    deletePotTrackerEntry: async (_: any, { id }: { id: string }) => {
      // TODO: Implement
      throw new Error('deletePotTrackerEntry mutation not implemented yet');
    }
  }
};
