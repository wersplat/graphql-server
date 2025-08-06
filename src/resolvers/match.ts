import { 
  Match, 
  MatchInput, 
  MatchUpdateInput, 
  PlayerMatchStatsInput,
  MatchStatus,
  MatchStage,
  Team,
  Event,
  PlayerMatchStats,
  EventType,
  EventStatus
} from '../types/Match';
import { PgGraphQLService } from '../services/pg-graphql';
import { v4 as uuidv4 } from 'uuid';

// Mock data for development (fallback)
const mockTeams: Team[] = [
  {
    id: 'team-1',
    name: 'Alpha Team',
    description: 'The original team',
    logoUrl: 'https://example.com/alpha-logo.png',
    region: 'North America',
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'team-2',
    name: 'Beta Team',
    description: 'The challengers',
    logoUrl: 'https://example.com/beta-logo.png',
    region: 'Europe',
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: 'team-3',
    name: 'Gamma Team',
    description: 'The underdogs',
    logoUrl: 'https://example.com/gamma-logo.png',
    region: 'Asia',
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-12')
  }
];

const mockEvents: Event[] = [
  {
    id: 'event-1',
    name: 'Spring Tournament 2024',
    description: 'The biggest tournament of the spring season',
    eventType: EventType.TOURNAMENT,
    status: EventStatus.OPEN,
    entryFee: 50.0,
    maxParticipants: 64,
    currentParticipants: 32,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-03-20'),
    createdBy: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: 'event-2',
    name: 'Weekly League',
    description: 'Weekly competitive matches',
    eventType: EventType.LEAGUE,
    status: EventStatus.IN_PROGRESS,
    entryFee: 10.0,
    maxParticipants: 16,
    currentParticipants: 16,
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-12-31'),
    createdBy: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-10')
  }
];

const mockMatches: Match[] = [
  {
    id: 'match-1',
    eventId: 'event-1',
    teamAId: 'team-1',
    teamBId: 'team-2',
    teamAName: 'Alpha Team',
    teamBName: 'Beta Team',
    stage: MatchStage.GROUP_PLAY,
    gameNumber: 1,
    status: MatchStatus.COMPLETED,
    scoreA: 105,
    scoreB: 98,
    winnerId: 'team-1',
    winnerName: 'Alpha Team',
    scheduledAt: new Date('2024-03-15T14:00:00Z'),
    playedAt: new Date('2024-03-15T16:30:00Z'),
    startedAt: new Date('2024-03-15T14:05:00Z'),
    endedAt: new Date('2024-03-15T16:25:00Z'),
    boxscoreUrl: 'https://example.com/boxscore/match-1',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-15T16:30:00Z'),
    isLive: false,
    teamA: mockTeams[0]!,
    teamB: mockTeams[1]!,
    winner: mockTeams[0]!,
    event: mockEvents[0]!,
    teamAPlayers: [],
    teamBPlayers: []
  },
  {
    id: 'match-2',
    eventId: 'event-1',
    teamAId: 'team-2',
    teamBId: 'team-3',
    teamAName: 'Beta Team',
    teamBName: 'Gamma Team',
    stage: MatchStage.GROUP_PLAY,
    gameNumber: 2,
    status: MatchStatus.IN_PROGRESS,
    scoreA: 45,
    scoreB: 52,
    scheduledAt: new Date('2024-03-16T15:00:00Z'),
    startedAt: new Date('2024-03-16T15:05:00Z'),
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-16T15:05:00Z'),
    isLive: true,
    timeElapsed: 'PT1H30M',
    teamA: mockTeams[1]!,
    teamB: mockTeams[2]!,
    event: mockEvents[0]!,
    teamAPlayers: [],
    teamBPlayers: []
  },
  {
    id: 'match-3',
    eventId: 'event-2',
    teamAId: 'team-1',
    teamBId: 'team-3',
    teamAName: 'Alpha Team',
    teamBName: 'Gamma Team',
    stage: MatchStage.REGULAR_SEASON,
    gameNumber: 1,
    status: MatchStatus.SCHEDULED,
    scheduledAt: new Date('2024-03-20T18:00:00Z'),
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-03-12'),
    isLive: false,
    teamA: mockTeams[0]!,
    teamB: mockTeams[2]!,
    event: mockEvents[1]!,
    teamAPlayers: [],
    teamBPlayers: []
  }
];

export const matchResolvers = {
  Query: {
    getMatch: async (_: any, { id }: { id: string }): Promise<Match | null> => {
      console.log(`Getting match with ID: ${id}`);
      try {
        const match = await PgGraphQLService.instance.getMatch(id);
        return match as unknown as Match;
      } catch (error) {
        console.error('Error fetching match from pg_graphql:', error);
        // Fallback to mock data
        const match = mockMatches.find(m => m.id === id);
        return match || null;
      }
    },

    getMatches: async (_: any, { 
      teamId, 
      eventId, 
      status, 
      stage, 
      limit = 20, 
      offset = 0 
    }: { 
      teamId?: string; 
      eventId?: string; 
      status?: MatchStatus; 
      stage?: MatchStage; 
      limit?: number; 
      offset?: number; 
    }): Promise<Match[]> => {
      console.log(`Getting matches with filters: teamId=${teamId}, eventId=${eventId}, status=${status}, stage=${stage}`);
      
      try {
        const filters: any = {};
        if (teamId) filters.teamId = teamId;
        if (eventId) filters.eventId = eventId;
        if (status) filters.status = status;
        if (stage) filters.stage = stage;
        
        const matches = await PgGraphQLService.instance.getMatches(filters, limit, offset);
        return matches as unknown as Match[];
      } catch (error) {
        console.error('Error fetching matches from pg_graphql:', error);
        // Fallback to mock data
        let filteredMatches = mockMatches;

        if (teamId) {
          filteredMatches = filteredMatches.filter(m => 
            m.teamAId === teamId || m.teamBId === teamId
          );
        }

        if (eventId) {
          filteredMatches = filteredMatches.filter(m => m.eventId === eventId);
        }

        if (status) {
          filteredMatches = filteredMatches.filter(m => m.status === status);
        }

        if (stage) {
          filteredMatches = filteredMatches.filter(m => m.stage === stage);
        }

        return filteredMatches.slice(offset, offset + limit);
      }
    },

    getTeam: async (_: any, { id }: { id: string }): Promise<Team | null> => {
      console.log(`Getting team with ID: ${id}`);
      try {
        const team = await PgGraphQLService.instance.getTeam(id);
        return team as unknown as Team;
      } catch (error) {
        console.error('Error fetching team from pg_graphql:', error);
        // Fallback to mock data
        const team = mockTeams.find(t => t.id === id);
        return team || null;
      }
    },

    getTeams: async (_: any, { limit = 10, offset = 0 }: { limit?: number; offset?: number }): Promise<Team[]> => {
      console.log(`Getting teams with limit: ${limit}, offset: ${offset}`);
      try {
        const teams = await PgGraphQLService.instance.getTeams(limit, offset);
        return teams as unknown as Team[];
      } catch (error) {
        console.error('Error fetching teams from pg_graphql:', error);
        // Fallback to mock data
        return mockTeams.slice(offset, offset + limit);
      }
    },

    getEvent: async (_: any, { id }: { id: string }): Promise<Event | null> => {
      console.log(`Getting event with ID: ${id}`);
      try {
        const event = await PgGraphQLService.instance.getEvent(id);
        return event as unknown as Event;
      } catch (error) {
        console.error('Error fetching event from pg_graphql:', error);
        // Fallback to mock data
        const event = mockEvents.find(e => e.id === id);
        return event || null;
      }
    },

    getEvents: async (_: any, { 
      status, 
      eventType, 
      limit = 10, 
      offset = 0 
    }: { 
      status?: string; 
      eventType?: string; 
      limit?: number; 
      offset?: number; 
    }): Promise<Event[]> => {
      console.log(`Getting events with filters: status=${status}, eventType=${eventType}`);
      
      try {
        const filters: any = {};
        if (status) filters.status = status;
        if (eventType) filters.eventType = eventType;
        
        const events = await PgGraphQLService.instance.getEvents(filters, limit, offset);
        return events as unknown as Event[];
      } catch (error) {
        console.error('Error fetching events from pg_graphql:', error);
        // Fallback to mock data
        let filteredEvents = mockEvents;

        if (status) {
          filteredEvents = filteredEvents.filter(e => e.status === status);
        }

        if (eventType) {
          filteredEvents = filteredEvents.filter(e => e.eventType === eventType);
        }

        return filteredEvents.slice(offset, offset + limit);
      }
    }
  },

  Mutation: {
    submitMatch: async (_: any, { input }: { input: MatchInput }): Promise<Match> => {
      console.log('Creating new match:', input);
      
      try {
        const matchData = {
          event_id: input.eventId,
          team_a_id: input.teamAId,
          team_b_id: input.teamBId,
          team_a_name: input.teamAName,
          team_b_name: input.teamBName,
          stage: input.stage || MatchStage.GROUP_PLAY,
          game_number: input.gameNumber || 1,
          status: MatchStatus.SCHEDULED,
          scheduled_at: input.scheduledAt
        };
        
        const newMatch = await PgGraphQLService.instance.createMatch(matchData);
        return newMatch as unknown as Match;
      } catch (error) {
        console.error('Error creating match in pg_graphql:', error);
        // Fallback to mock data
        const teamA = mockTeams.find(t => t.id === input.teamAId);
        const teamB = mockTeams.find(t => t.id === input.teamBId);
        const event = input.eventId ? mockEvents.find(e => e.id === input.eventId) : undefined;
        
        const newMatch: Match = {
          id: uuidv4(),
          eventId: input.eventId || undefined,
          teamAId: input.teamAId,
          teamBId: input.teamBId,
          teamAName: input.teamAName,
          teamBName: input.teamBName,
          stage: input.stage || MatchStage.GROUP_PLAY,
          gameNumber: input.gameNumber || 1,
          status: MatchStatus.SCHEDULED,
          scheduledAt: input.scheduledAt,
          createdAt: new Date(),
          updatedAt: new Date(),
          isLive: false,
          teamA: teamA || undefined,
          teamB: teamB || undefined,
          event: event || undefined,
          teamAPlayers: [],
          teamBPlayers: []
        };

        mockMatches.push(newMatch);
        return newMatch;
      }
    },

    updateMatch: (_: any, { id, input }: { id: string; input: MatchUpdateInput }): Match => {
      console.log(`Updating match ${id}:`, input);
      
      const matchIndex = mockMatches.findIndex(m => m.id === id);
      if (matchIndex === -1) {
        throw new Error(`Match with ID ${id} not found`);
      }

      const existingMatch = mockMatches[matchIndex]!;
      const updatedMatch: Match = {
        ...existingMatch,
        ...input,
        updatedAt: new Date()
      };

      // Handle status changes
      if (input.status === MatchStatus.IN_PROGRESS && !updatedMatch.startedAt) {
        updatedMatch.startedAt = new Date();
        updatedMatch.isLive = true;
      }

      if (input.status === MatchStatus.COMPLETED && !updatedMatch.endedAt) {
        updatedMatch.endedAt = new Date();
        updatedMatch.isLive = false;
      }

      mockMatches[matchIndex] = updatedMatch;
      return updatedMatch;
    },

    deleteMatch: (_: any, { id }: { id: string }): boolean => {
      console.log(`Deleting match with ID: ${id}`);
      
      const matchIndex = mockMatches.findIndex(m => m.id === id);
      if (matchIndex === -1) {
        throw new Error(`Match with ID ${id} not found`);
      }

      mockMatches.splice(matchIndex, 1);
      return true;
    },

    submitMatchStats: async (_: any, { matchId, stats }: { matchId: string; stats: PlayerMatchStatsInput[] }): Promise<PlayerMatchStats[]> => {
      console.log(`Submitting stats for match ${matchId}:`, stats);
      
      try {
        const statsData = stats.map(stat => ({
          player_id: stat.playerId,
          team_id: stat.teamId,
          points: stat.points || 0,
          assists: stat.assists || 0,
          rebounds: stat.rebounds || 0,
          steals: stat.steals || 0,
          blocks: stat.blocks || 0,
          turnovers: stat.turnovers || 0,
          fouls: stat.fouls || 0,
          fgm: stat.fgm || 0,
          fga: stat.fga || 0,
          three_points_made: stat.threePointsMade || 0,
          three_points_attempted: stat.threePointsAttempted || 0,
          ftm: stat.ftm || 0,
          fta: stat.fta || 0,
          plus_minus: stat.plusMinus || 0,
          minutes_played: stat.minutesPlayed || 0
        }));
        
        const playerStats = await PgGraphQLService.instance.submitMatchStats(matchId, statsData);
        return playerStats as PlayerMatchStats[];
      } catch (error) {
        console.error('Error submitting match stats to pg_graphql:', error);
        // Fallback to mock data
        const match = mockMatches.find(m => m.id === matchId);
        if (!match) {
          throw new Error(`Match with ID ${matchId} not found`);
        }

        const playerStats: PlayerMatchStats[] = stats.map((stat, index) => ({
          id: uuidv4(),
          matchId,
          playerId: stat.playerId,
          teamId: stat.teamId,
          points: stat.points || 0,
          assists: stat.assists || 0,
          rebounds: stat.rebounds || 0,
          steals: stat.steals || 0,
          blocks: stat.blocks || 0,
          turnovers: stat.turnovers || 0,
          fouls: stat.fouls || 0,
          fgm: stat.fgm || 0,
          fga: stat.fga || 0,
          threePointsMade: stat.threePointsMade || 0,
          threePointsAttempted: stat.threePointsAttempted || 0,
          ftm: stat.ftm || 0,
          fta: stat.fta || 0,
          plusMinus: stat.plusMinus || 0,
          minutesPlayed: stat.minutesPlayed || 0,
          createdAt: new Date(),
          updatedAt: new Date()
        }));

        // Update match with player stats
        match.teamAPlayers = playerStats.filter(stat => stat.teamId === match.teamAId);
        match.teamBPlayers = playerStats.filter(stat => stat.teamId === match.teamBId);

        return playerStats;
      }
    }
  },

  Match: {
    teamA: (parent: Match): Team | null => {
      return parent.teamA || mockTeams.find(t => t.id === parent.teamAId) || null;
    },

    teamB: (parent: Match): Team | null => {
      return parent.teamB || mockTeams.find(t => t.id === parent.teamBId) || null;
    },

    winner: (parent: Match): Team | null => {
      if (!parent.winnerId) return null;
      return parent.winner || mockTeams.find(t => t.id === parent.winnerId) || null;
    },

    event: (parent: Match): Event | null => {
      if (!parent.eventId) return null;
      return parent.event || mockEvents.find(e => e.id === parent.eventId) || null;
    },

    teamAPlayers: (parent: Match): PlayerMatchStats[] => {
      return parent.teamAPlayers || [];
    },

    teamBPlayers: (parent: Match): PlayerMatchStats[] => {
      return parent.teamBPlayers || [];
    }
  }
}; 