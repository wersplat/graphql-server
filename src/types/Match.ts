import { Player, PlayerPosition, SalaryTier, PlayerTier } from './User';

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
  REGULAR_SEASON = 'Regular_Season',
  GROUP_PLAY = 'Group_Play',
  ROUND_1 = 'Round_1',
  ROUND_2 = 'Round_2',
  ROUND_3 = 'Round_3',
  ROUND_4 = 'Round_4',
  SEMI_FINALS = 'Semi_Finals',
  FINALS = 'Finals',
  GRAND_FINALS = 'Grand_Finals',
  L1 = 'L1',
  L2 = 'L2',
  L3 = 'L3',
  L4 = 'L4',
  L5 = 'L5',
  W1 = 'W1',
  W2 = 'W2',
  W3 = 'W3',
  W4 = 'W4',
  LF = 'LF',
  WF = 'WF'
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
  tier?: EventTier;
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
  LEAGUE = 'League',
  TOURNAMENT = 'Tournament'
}

export enum EventTier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4'
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

// =============================================================================
// PHASE 1: ENHANCED INPUT TYPES
// =============================================================================

export interface MatchInput {
  eventId: string;
  gameNumber: number;
  scheduledAt: Date;
  stage: MatchStage;
  teamAId: string;
  teamAName: string;
  teamBId: string;
  teamBName: string;
  venue?: string;
  streamUrl?: string;
  notes?: string;
}

export interface MatchUpdateInput {
  eventId?: string;
  gameNumber?: number;
  scheduledAt?: Date;
  stage?: MatchStage;
  teamAId?: string;
  teamAName?: string;
  teamBId?: string;
  teamBName?: string;
  venue?: string;
  streamUrl?: string;
  notes?: string;
  status?: MatchStatus;
  startedAt?: Date;
  endedAt?: Date;
  scoreA?: number;
  scoreB?: number;
  winnerId?: string;
  winnerName?: string;
  boxscoreUrl?: string;
}

export interface PlayerMatchStatsInput {
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
}

// =============================================================================
// PHASE 1: NEW INPUT TYPES
// =============================================================================

export interface PlayerInput {
  userId: string;
  gamertag: string;
  region?: string;
  position?: PlayerPosition;
  salaryTier?: SalaryTier;
  teamName?: string;
  isVerified?: boolean;
}

export interface PlayerUpdateInput {
  gamertag?: string;
  region?: string;
  currentRp?: number;
  peakRp?: number;
  tier?: PlayerTier;
  position?: PlayerPosition;
  salaryTier?: SalaryTier;
  teamName?: string;
  isVerified?: boolean;
}

export interface TeamInput {
  name: string;
  description?: string;
  logoUrl?: string;
  region?: string;
  isActive?: boolean;
}

export interface TeamUpdateInput {
  name?: string;
  description?: string;
  logoUrl?: string;
  region?: string;
  isActive?: boolean;
}

export interface EventInput {
  name: string;
  description?: string;
  eventType: EventType;
  tier: EventTier;
  startDate: Date;
  endDate: Date;
  entryFee?: number;
  maxParticipants?: number;
  createdBy: string;
}

export interface EventUpdateInput {
  name?: string;
  description?: string;
  eventType?: EventType;
  tier?: EventTier;
  startDate?: Date;
  endDate?: Date;
  entryFee?: number;
  maxParticipants?: number;
  status?: EventStatus;
}

export interface UserInput {
  username: string;
  email: string;
  fullName?: string;
  isActive?: boolean;
  isAdmin?: boolean;
  discordId?: string;
}

export interface UserUpdateInput {
  username?: string;
  email?: string;
  fullName?: string;
  isActive?: boolean;
  isAdmin?: boolean;
  discordId?: string;
}

// =============================================================================
// PHASE 1: ANALYTICS TYPES
// =============================================================================

export interface DashboardStats {
  totalPlayers: number;
  totalTeams: number;
  totalMatches: number;
  totalEvents: number;
  activePlayers: number;
  activeTeams: number;
  completedMatches: number;
  upcomingEvents: number;
  averagePlayerRP: number;
  averageTeamSize: number;
  topPerformingPlayer?: Player;
  mostActiveTeam?: Team;
  recentMatches: Match[];
  recentPlayers: Player[];
}

export interface LeaderboardEntry {
  rank: number;
  player: Player;
  wins: number;
  losses: number;
  winRate: number;
  totalMatches: number;
  averagePoints: number;
  averageAssists: number;
  averageRebounds: number;
}

export enum LeaderboardSortBy {
  CURRENT_RP = 'CURRENT_RP',
  PEAK_RP = 'PEAK_RP',
  WINS = 'WINS',
  WIN_RATE = 'WIN_RATE',
  AVERAGE_POINTS = 'AVERAGE_POINTS',
  AVERAGE_ASSISTS = 'AVERAGE_ASSISTS',
  AVERAGE_REBOUNDS = 'AVERAGE_REBOUNDS'
}

export enum TimeRange {
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
  LAST_90_DAYS = 'LAST_90_DAYS',
  LAST_6_MONTHS = 'LAST_6_MONTHS',
  LAST_YEAR = 'LAST_YEAR',
  ALL_TIME = 'ALL_TIME'
} 