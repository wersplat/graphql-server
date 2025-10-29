/**
 * Enum Mapping Utilities
 * 
 * Maps database enum values (with spaces) to GraphQL enum values (with underscores)
 * and vice versa to maintain GraphQL naming compliance while preserving database values.
 */

// Player Position Mapping
export const PLAYER_POSITION_DB_TO_GQL = {
  'Point Guard': 'Point_Guard',
  'Shooting Guard': 'Shooting_Guard',
  'Lock': 'Lock',
  'Power Forward': 'Power_Forward',
  'Center': 'Center'
} as const;

export const PLAYER_POSITION_GQL_TO_DB = {
  'Point_Guard': 'Point Guard',
  'Shooting_Guard': 'Shooting Guard',
  'Lock': 'Lock',
  'Power_Forward': 'Power Forward',
  'Center': 'Center'
} as const;

// Achievement Type Mapping
export const ACHIEVEMENT_TYPE_DB_TO_GQL = {
  'Career Points Milestone': 'Career_Points_Milestone',
  'Single Game': 'Single_Game',
  'Career Milestones': 'Career_Milestones'
} as const;

export const ACHIEVEMENT_TYPE_GQL_TO_DB = {
  'Career_Points_Milestone': 'Career Points Milestone',
  'Single_Game': 'Single Game',
  'Career_Milestones': 'Career Milestones'
} as const;

// Award Types Mapping
export const AWARD_TYPES_DB_TO_GQL = {
  'Offensive MVP': 'Offensive_MVP',
  'Defensive MVP': 'Defensive_MVP',
  'Rookie of Tournament': 'Rookie_of_Tournament'
} as const;

export const AWARD_TYPES_GQL_TO_DB = {
  'Offensive_MVP': 'Offensive MVP',
  'Defensive_MVP': 'Defensive MVP',
  'Rookie_of_Tournament': 'Rookie of Tournament'
} as const;

// Console Mapping
export const CONSOLE_DB_TO_GQL = {
  'Cross Play': 'Cross_Play'
} as const;

export const CONSOLE_GQL_TO_DB = {
  'Cross_Play': 'Cross Play'
} as const;

// Match Stage Mapping
export const MATCH_STAGE_DB_TO_GQL = {
  'Regular Season': 'Regular_Season',
  'Group Play': 'Group_Play',
  'Round 1': 'Round_1',
  'Round 2': 'Round_2',
  'Round 3': 'Round_3',
  'Round 4': 'Round_4',
  'Semi Finals': 'Semi_Finals',
  'Finals': 'Finals',
  'Grand Finals': 'Grand_Finals',
  'L1': 'L1',
  'L2': 'L2',
  'L3': 'L3',
  'L4': 'L4',
  'L5': 'L5',
  'W1': 'W1',
  'W2': 'W2',
  'W3': 'W3',
  'W4': 'W4',
  'LF': 'LF',
  'WF': 'WF',
  'Playoffs': 'Playoffs',
  'Open': 'Open'
} as const;

export const MATCH_STAGE_GQL_TO_DB = {
  'Regular_Season': 'Regular Season',
  'Group_Play': 'Group Play',
  'Round_1': 'Round 1',
  'Round_2': 'Round 2',
  'Round_3': 'Round 3',
  'Round_4': 'Round 4',
  'Semi_Finals': 'Semi Finals',
  'Finals': 'Finals',
  'Grand_Finals': 'Grand Finals',
  'L1': 'L1',
  'L2': 'L2',
  'L3': 'L3',
  'L4': 'L4',
  'L5': 'L5',
  'W1': 'W1',
  'W2': 'W2',
  'W3': 'W3',
  'W4': 'W4',
  'LF': 'LF',
  'WF': 'WF',
  'Playoffs': 'Playoffs',
  'Open': 'Open'
} as const;

// Status Mapping
export const STATUS_DB_TO_GQL = {
  'scheduled': 'scheduled',
  'in progress': 'in_progress',
  'completed': 'completed',
  'under review': 'under_review',
  'reviewed': 'reviewed',
  'approved': 'approved'
} as const;

export const STATUS_GQL_TO_DB = {
  'scheduled': 'scheduled',
  'in_progress': 'in progress',
  'completed': 'completed',
  'under_review': 'under review',
  'reviewed': 'reviewed',
  'approved': 'approved'
} as const;

// Generic mapping functions
export function mapDbToGraphQL<T extends Record<string, string>>(
  value: string | null | undefined,
  mapping: T
): string | null {
  if (!value) return null;
  return mapping[value as keyof T] || value;
}

export function mapGraphQLToDb<T extends Record<string, string>>(
  value: string | null | undefined,
  mapping: T
): string | null {
  if (!value) return null;
  return mapping[value as keyof T] || value;
}

// Convenience functions for specific enum types
export function mapPlayerPositionDbToGql(position: string | null | undefined): string | null {
  return mapDbToGraphQL(position, PLAYER_POSITION_DB_TO_GQL);
}

export function mapPlayerPositionGqlToDb(position: string | null | undefined): string | null {
  return mapGraphQLToDb(position, PLAYER_POSITION_GQL_TO_DB);
}

export function mapMatchStageDbToGql(stage: string | null | undefined): string | null {
  return mapDbToGraphQL(stage, MATCH_STAGE_DB_TO_GQL);
}

export function mapMatchStageGqlToDb(stage: string | null | undefined): string | null {
  return mapGraphQLToDb(stage, MATCH_STAGE_GQL_TO_DB);
}

export function mapStatusDbToGql(status: string | null | undefined): string | null {
  return mapDbToGraphQL(status, STATUS_DB_TO_GQL);
}

export function mapStatusGqlToDb(status: string | null | undefined): string | null {
  return mapGraphQLToDb(status, STATUS_GQL_TO_DB);
}

export function mapAchievementTypeDbToGql(type: string | null | undefined): string | null {
  return mapDbToGraphQL(type, ACHIEVEMENT_TYPE_DB_TO_GQL);
}

export function mapAchievementTypeGqlToDb(type: string | null | undefined): string | null {
  return mapGraphQLToDb(type, ACHIEVEMENT_TYPE_GQL_TO_DB);
}

export function mapAwardTypesDbToGql(type: string | null | undefined): string | null {
  return mapDbToGraphQL(type, AWARD_TYPES_DB_TO_GQL);
}

export function mapAwardTypesGqlToDb(type: string | null | undefined): string | null {
  return mapGraphQLToDb(type, AWARD_TYPES_GQL_TO_DB);
}

export function mapConsoleDbToGql(console: string | null | undefined): string | null {
  return mapDbToGraphQL(console, CONSOLE_DB_TO_GQL);
}

export function mapConsoleGqlToDb(console: string | null | undefined): string | null {
  return mapGraphQLToDb(console, CONSOLE_GQL_TO_DB);
}
