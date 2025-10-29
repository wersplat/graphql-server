# Supabase Schema Update Summary

## Overview
Updated the GraphQL schema to align with the comprehensive Supabase database structure. This update significantly expands the API capabilities to match the full data model available in your Supabase instance.

## Key Changes Made

### 1. Enhanced Core Types

#### Player Type Updates
- Added `alternateGamertag`, `playerRankScore`, `performanceScore`, `monthlyValue`
- Added crew-related fields: `crewAffiliation`, `crewName`
- Added social integration: `discordId`, `discordIdNo`, `twitch`, `twitterId`
- Added `isRookie` flag and improved team relationship handling
- Added relationships to `CityCrew` type

#### Team Type Updates
- Added ranking and performance fields: `currentRp`, `eloRating`, `globalRank`, `hybridScore`
- Added `playerRankScore`, `moneyWon`, `leaderboardTier`
- Added league organizational fields: `lgConf`, `lgDivision`, `teamTwitter`
- Added relationships to `LeagueConference` and `LeagueDivision`

#### Match Type Updates
- Restructured to match Supabase `matches` table exactly
- Added `gameYear`, `leagueId`, `seasonId`, `tournamentId`
- Added `verified` flag and `possibleDuplicateOf` for duplicate detection
- Added relationships to `League`, `LeagueSeason`, and `Tournament`

### 2. New Types Added

#### League & Tournament Structure
- **League**: Core league information with organizational hierarchy
- **LeagueSeason**: Season management within leagues
- **LeagueConference**: Conference organizational structure
- **LeagueDivision**: Division organizational structure
- **Tournament**: Tournament management with formats and prize pools

#### Achievement System
- **Achievement**: Player achievements with categories, rarity, and tiers
- **AchievementRule**: Rules engine for automatic achievement awarding
- **PlayerAward**: Individual awards earned by players

#### Organizational Types
- **CityCrew**: Player crew affiliations and team structures

### 3. New Enums Added

#### Game & Platform Enums
- `GameYear`: NBA 2K16 through 2K26 support
- `Console`: Cross-play, PlayStation, Xbox support
- `TournamentFormat`: Single/double elimination, Swiss, round-robin

#### Achievement System Enums
- `AchievementCategory`: Scoring, Assists, Defense, Rebounding, etc.
- `AchievementRarity`: Common, Rare, Epic, Legendary
- `AchievementScope`: Per-game, Season, Career, Streak, Event
- `AchievementTier`: Bronze through Legendary tiers

### 4. Expanded Query Operations

#### New Query Categories
- **League Operations**: `getLeague`, `getLeagues`, `getLeagueSeason`, `getLeagueSeasons`
- **Tournament Operations**: `getTournament`, `getTournaments`
- **Achievement Operations**: `getAchievement`, `getAchievements`, `getAchievementRule`, `getAchievementRules`
- **Player Awards**: `getPlayerAwards` with filtering by category and rarity
- **Organizational**: `getCityCrew`, `getLeagueConference`, `getLeagueDivision`

#### Enhanced Filtering
- All queries now support comprehensive filtering options
- Pagination support with `limit` and `offset` parameters
- Status-based filtering for active/inactive entities

### 5. New Resolver Implementation

Created `src/resolvers/supabase-resolvers.ts` with:
- **Direct Supabase Integration**: Type-safe queries to Supabase tables
- **Relationship Handling**: Automatic resolution of foreign key relationships
- **Error Handling**: Comprehensive error reporting with meaningful messages
- **Performance Optimized**: Efficient queries with proper indexing support

#### Key Resolver Features
- **Player Relationships**: Automatic crew and team resolution
- **Team Relationships**: Conference and division resolution
- **Match Relationships**: League, season, and tournament context
- **Achievement Relationships**: Player and achievement linkage

## Database Tables Covered

### Core Gaming Tables
- `players` - Enhanced player profiles with social and performance data
- `teams` - Team management with ranking and organizational structure
- `matches` - Match records with league context and verification
- `leagues_info` - League organizational structure
- `league_seasons` - Season management and scheduling

### Achievement System Tables
- `achievements` - Achievement definitions and metadata
- `achievement_rules` - Rules engine for automatic awarding
- `player_awards` - Individual player achievement records

### Organizational Tables
- `city_crews` - Player crew affiliations
- `lg_conf` - League conference structure
- `lg_divisions` - League division organization

## Migration Notes

### Backward Compatibility
- All existing queries and mutations remain functional
- Original field names preserved where possible
- New fields are additive, not replacing existing functionality

### Environment Requirements
- Requires `SUPABASE_URL` and `SUPABASE_ANON_KEY` environment variables
- Compatible with existing Supabase client configuration

### Type Safety
- Comprehensive TypeScript support
- Enum validation for all categorical fields
- Proper null handling for optional relationships

## Next Steps

### Recommended Actions
1. **Test New Queries**: Validate new query operations against your Supabase data
2. **Update Frontend**: Integrate new fields and relationships in client applications
3. **Performance Monitoring**: Monitor query performance with new relationship resolvers
4. **Data Migration**: Ensure existing data aligns with new schema expectations

### Future Enhancements
- Add mutation operations for new types (leagues, tournaments, achievements)
- Implement real-time subscriptions for live match updates
- Add advanced analytics queries for performance metrics
- Integrate with achievement rules engine for automatic awarding

## Files Modified

1. **`src/schema.graphql`** - Updated with all new types, enums, and queries
2. **`src/resolvers/supabase-resolvers.ts`** - New comprehensive resolver implementation

## Validation Results

✅ Schema validation passed successfully
✅ All existing resolvers remain functional
✅ New types properly integrated
✅ Enum definitions validated
✅ Relationship mappings confirmed

The GraphQL API now provides comprehensive access to your entire Supabase database structure while maintaining backward compatibility and adding powerful new capabilities for league management, achievements, and organizational hierarchy.
