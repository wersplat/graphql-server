export interface Match {
  id: string;
  eventId?: string | undefined;
  teamAId: string;
  teamBId: string;
  teamAName: string;
  teamBName: string;
  stage: MatchStage;
  gameNumber: number;
  status: MatchStatus;
  scoreA?: number;
  scoreB?: number;
  winnerId?: string;
  winnerName?: string;
  scheduledAt?: Date | undefined;
  playedAt?: Date | undefined;
  startedAt?: Date | undefined;
  endedAt?: Date | undefined;
  boxscoreUrl?: string | undefined;
  createdAt: Date;
  updatedAt?: Date;
  isLive: boolean;
  timeElapsed?: string;
  teamA?: Team | undefined;
  teamB?: Team | undefined;
  winner?: Team | undefined;
  event?: Event | undefined;
  teamAPlayers: PlayerMatchStats[];
  teamBPlayers: PlayerMatchStats[];
}

export enum MatchStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  POSTPONED = 'postponed'
}

export enum MatchStage {
  GROUP = 'group',
  ROUND_OF_32 = 'round_of_32',
  ROUND_OF_16 = 'round_of_16',
  QUARTERFINALS = 'quarterfinals',
  SEMIFINALS = 'semifinals',
  FINALS = 'finals',
  THIRD_PLACE = 'third_place',
  EXHIBITION = 'exhibition'
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  logoUrl?: string;
  region?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Event {
  id: string;
  name: string;
  description?: string;
  eventType?: EventType;
  status?: EventStatus;
  entryFee: number;
  maxParticipants?: number;
  currentParticipants: number;
  startDate?: Date;
  endDate?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt?: Date;
}

export enum EventType {
  DRAFT = 'draft',
  BYOT = 'byot',
  TOURNAMENT = 'tournament',
  LEAGUE = 'league'
}

export enum EventStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  REGISTRATION_CLOSED = 'registration_closed',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export interface PlayerMatchStats {
  id: string;
  matchId: string;
  playerId: string;
  teamId: string;
  points: number;
  assists: number;
  rebounds: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  fgm: number;
  fga: number;
  threePointsMade: number;
  threePointsAttempted: number;
  ftm: number;
  fta: number;
  plusMinus: number;
  minutesPlayed: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface MatchInput {
  eventId?: string;
  teamAId: string;
  teamBId: string;
  teamAName: string;
  teamBName: string;
  stage?: MatchStage;
  gameNumber?: number;
  scheduledAt?: Date;
}

export interface MatchUpdateInput {
  status?: MatchStatus;
  scoreA?: number;
  scoreB?: number;
  winnerId?: string;
  playedAt?: Date;
  boxscoreUrl?: string;
  stage?: MatchStage;
  gameNumber?: number;
}

export interface PlayerMatchStatsInput {
  playerId: string;
  teamId: string;
  points?: number;
  assists?: number;
  rebounds?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
  fgm?: number;
  fga?: number;
  threePointsMade?: number;
  threePointsAttempted?: number;
  ftm?: number;
  fta?: number;
  plusMinus?: number;
  minutesPlayed?: number;
} 