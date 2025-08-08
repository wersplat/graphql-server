import { z } from 'zod';
import { GraphQLError } from 'graphql';

// Common helpers
const uuid = z.string().uuid({ message: 'Must be a valid UUID' });
const nonEmpty = z.string().min(1);

// Player
export const playerCreateSchema = z.object({
  gamertag: nonEmpty,
  regionId: z.string().optional(),
  position: z.string().optional(),
  salaryTier: z.string().optional(),
});

export const playerUpdateSchema = playerCreateSchema.partial();

// Match
export const matchCreateSchema = z.object({
  eventId: uuid.optional(),
  teamAId: uuid,
  teamBId: uuid,
  playedAt: z.string().datetime().optional(),
  stage: z.string().optional(),
  gameNumber: z.number().int().min(1).max(7).optional(),
});

// Ranking points
export const awardRankingPointsSchema = z.object({
  teamId: uuid,
  eventId: uuid.optional(),
  points: z.number().int().min(1).max(10000),
  source: z.string().optional(),
});

// Match submission
export const submitMatchSchema = z.object({
  eventId: uuid,
  teamAId: uuid,
  teamBId: uuid,
  scoreA: z.number().int().min(0),
  scoreB: z.number().int().min(0),
});

export const reviewMatchSubmissionSchema = z.object({
  decision: z.enum(['approve', 'reject', 'flag']),
  notes: z.string().max(500).optional(),
});

// Roster
export const addRosterSchema = z.object({
  teamId: uuid,
  playerId: uuid,
  isCaptain: z.boolean().optional(),
  isPlayerCoach: z.boolean().optional(),
});

export function assertValid<TSchema extends z.ZodTypeAny>(schema: TSchema, value: unknown): z.infer<TSchema> {
  const result = schema.safeParse(value);
  if (!result.success) {
    throw new GraphQLError('Invalid input', {
      extensions: { code: 'BAD_USER_INPUT', details: result.error.flatten() },
    });
  }
  return result.data;
}


