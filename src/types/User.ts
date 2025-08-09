import { Team } from './Match';

export interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string | undefined;
  isActive: boolean;
  isAdmin: boolean;
  discordId?: string | undefined;
  createdAt: Date;
  updatedAt?: Date;
  player?: Player | undefined;
}

export interface Player {
  id: string;
  userId: string;
  gamertag: string;
  region?: string;
  currentRp?: number;
  peakRp?: number;
  tier?: PlayerTier;
  position?: PlayerPosition;
  salaryTier?: SalaryTier;
  teamName?: string;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt?: Date;
  user: User;
  current_teams?: Team;
}

export enum PlayerPosition {
  POINT_GUARD = 'Point_Guard',
  SHOOTING_GUARD = 'Shooting_Guard',
  LOCK = 'Lock',
  POWER_FORWARD = 'Power_Forward',
  CENTER = 'Center'
}

export enum SalaryTier {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum PlayerTier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  DIAMOND = 'diamond',
  PINK_DIAMOND = 'pink_diamond',
  GALAXY_OPAL = 'galaxy_opal'
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