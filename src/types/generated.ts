export interface StringFilter {
  eq?: string;
  neq?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  in?: string[];
  like?: string;
  ilike?: string;
  is?: FilterIs;
}

export interface IntFilter {
  eq?: number;
  neq?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  in?: number[];
  
  is?: FilterIs;
}

export interface FloatFilter {
  eq?: number;
  neq?: number;
  gt?: number;
  gte?: number;
  lt?: number;
  lte?: number;
  in?: number[];
  
  is?: FilterIs;
}

export interface BooleanFilter {
  eq?: boolean;
  neq?: boolean;
  
  in?: boolean[];
  
  is?: FilterIs;
}

export interface UUIDFilter {
  eq?: string;
  neq?: string;
  
  in?: string[];
  
  is?: FilterIs;
}

export interface DateTimeFilter {
  eq?: Date;
  neq?: Date;
  
  in?: Date[];
  
  is?: FilterIs;
}

export interface DateFilter {
  eq?: Date;
  neq?: Date;
  
  in?: Date[];
  
  is?: FilterIs;
}

export interface BigIntFilter {
  eq?: string;
  neq?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  in?: string[];
  
  is?: FilterIs;
}

export interface BigFloatFilter {
  eq?: string;
  neq?: string;
  gt?: string;
  gte?: string;
  lt?: string;
  lte?: string;
  in?: string[];
  
  is?: FilterIs;
}

export interface IDFilter {
  eq?: string;
  neq?: string;
  
  in?: string[];
  
  is?: FilterIs;
}

export interface player_positionFilter {
  eq?: player_position;
  neq?: player_position;
  in?: player_position[];
  is?: FilterIs;
}

export interface stageFilter {
  eq?: stage;
  neq?: stage;
  in?: stage[];
  is?: FilterIs;
}

export interface salary_tierFilter {
  eq?: salary_tier;
  neq?: salary_tier;
  in?: salary_tier[];
  is?: FilterIs;
}

export interface app_roleFilter {
  eq?: app_role;
  neq?: app_role;
  in?: app_role[];
  is?: FilterIs;
}

export interface Node {
  id: string;
}

export enum FilterIs {
  NULL = 'NULL',
  NOT_NULL = 'NOT_NULL'
}

export enum OrderByDirection {
  ASCNULLSFIRST = 'AscNullsFirst',
  ASCNULLSLAST = 'AscNullsLast',
  DESCNULLSFIRST = 'DescNullsFirst',
  DESCNULLSLAST = 'DescNullsLast'
}

export enum achievement_category {
  SCORING = 'Scoring',
  ASSISTS = 'Assists',
  DEFENSE = 'Defense',
  REBOUNDING = 'Rebounding',
  MIXED_STATS = 'Mixed Stats',
  STREAK_LONGEVITY = 'Streak & Longevity',
  LEGENDARY = 'Legendary'
}

export enum achievement_event_type {
  MATCH_EVENT = 'match_event',
  PLAYER_STAT_EVENT = 'player_stat_event'
}

export enum achievement_rarity {
  COMMON = 'Common',
  RARE = 'Rare',
  EPIC = 'Epic',
  LEGENDARY = 'Legendary'
}

export enum achievement_scope {
  PER_GAME = 'per_game',
  SEASON = 'season',
  CAREER = 'career',
  STREAK = 'streak',
  EVENT = 'event'
}

export enum achievement_tier {
  BRONZE = 'bronze',
  SILVER = 'silver',
  GOLD = 'gold',
  PLATINUM = 'platinum',
  COMMON = 'common',
  RARE = 'rare',
  LEGENDARY = 'legendary',
  EPIC = 'epic'
}

export enum achievement_type {
  CAREER_POINTS_MILESTONE = 'Career Points Milestone',
  SINGLE_GAME = 'Single Game',
  EFFICIENCY = 'Efficiency',
  SEASON = 'Season',
  CAREER_MILESTONES = 'Career Milestones',
  BLOCKS = 'Blocks',
  STEALS = 'Steals',
  LOCKDOWN = 'Lockdown',
  STREAK = 'Streak',
  LONGEVITY = 'Longevity',
  MIXED_STATS = 'Mixed Stats'
}

export enum app_role {
  ADMIN = 'admin',
  LEAGUE_STAFF = 'league_staff',
  USER = 'user',
  EDITOR = 'editor',
  ANALYST = 'analyst',
  TEAM_STAFF = 'team_staff',
  PLAYER = 'player'
}

export enum award_types {
  OFFENSIVE_MVP = 'Offensive MVP',
  DEFENSIVE_MVP = 'Defensive MVP',
  ROOKIE_OF_TOURNAMENT = 'Rookie of Tournament'
}

export enum console {
  CROSS_PLAY = 'Cross Play',
  PLAYSTATION = 'Playstation',
  XBOX = 'Xbox'
}

export enum counter_scope {
  CAREER = 'career',
  SEASON = 'season',
  ROLLING10 = 'rolling10',
  GAME = 'game'
}

export enum event_tier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4',
  T5 = 'T5'
}

export enum event_type {
  LEAGUE = 'League',
  TOURNAMENT = 'Tournament',
  MATCH_EVENT = 'match_event',
  PLAYER_STAT_EVENT = 'player_stat_event'
}

export enum game_year {
  Y_2K16 = '2K16',
  Y_2K17 = '2K17',
  Y_2K18 = '2K18',
  Y_2K19 = '2K19',
  Y_2K20 = '2K20',
  Y_2K21 = '2K21',
  Y_2K22 = '2K22',
  Y_2K23 = '2K23',
  Y_2K24 = '2K24',
  Y_2K25 = '2K25',
  Y_2K26 = '2K26'
}

export enum leaderboard_tier {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum leagues {
  UNIFIED_PRO_AM_ASSOCIATION = 'Unified Pro Am Association',
  UPA_COLLEGE = 'UPA College',
  WR = 'WR',
  MPBA = 'MPBA',
  RISING_STARS = 'Rising Stars',
  STATEN_ISLAND_BASKETBALL_ASSOCIATION = 'Staten Island Basketball Association',
  HALL_OF_FAME_LEAGUE = 'Hall Of Fame League',
  DUNK_LEAGUE = 'Dunk League',
  ROAD_TO_25K = 'Road to 25K',
  ASSOCIATION = 'Association',
  USA_BASKETBALL = 'USA Basketball',
  HOF_EU = 'HOF EU',
  UPA_EU = 'UPA EU'
}

export enum match_report_status {
  PENDING = 'pending',
  SUBMITTED = 'submitted',
  PROCESSING = 'processing',
  VERIFIED = 'verified',
  DISPUTED = 'disputed'
}

export enum match_snapshot_status {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum player_position {
  POINT_GUARD = 'Point Guard',
  SHOOTING_GUARD = 'Shooting Guard',
  LOCK = 'Lock',
  POWER_FORWARD = 'Power Forward',
  CENTER = 'Center'
}

export enum queue_slot_status {
  WAITING = 'waiting',
  MATCHED = 'matched',
  LEFT = 'left'
}

export enum queue_status {
  QUEUED = 'queued',
  PROCESSING = 'processing',
  DONE = 'done',
  ERROR = 'error'
}

export enum roster_source_type {
  LEAGUE = 'league',
  CURRENT = 'current'
}

export enum salary_tier {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D'
}

export enum stage {
  REGULAR_SEASON = 'Regular Season',
  GROUP_PLAY = 'Group Play',
  ROUND_1 = 'Round 1',
  ROUND_2 = 'Round 2',
  ROUND_3 = 'Round 3',
  ROUND_4 = 'Round 4',
  SEMI_FINALS = 'Semi Finals',
  FINALS = 'Finals',
  GRAND_FINALS = 'Grand Finals',
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
  WF = 'WF',
  PLAYOFFS = 'Playoffs',
  OPEN = 'Open'
}

export enum status {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
  UNDER_REVIEW = 'under review',
  REVIEWED = 'reviewed',
  APPROVED = 'approved'
}

export enum team_queue_slot_status {
  WAITING = 'waiting',
  PENDING_LINEUP = 'pending_lineup',
  READY = 'ready',
  MATCHED = 'matched',
  LEFT = 'left'
}

export enum tournament_format {
  SINGLE_ELIMINATION = 'single-elimination',
  DOUBLE_ELIMINATION = 'double-elimination',
  SWISS = 'swiss',
  ROUND_ROBIN = 'round-robin'
}

export interface Mutation {
  apply_rp_decay?: any;
  assign_role?: boolean;
  backfill_display_gt_player_stats?: any;
  calculate_team_total_money_won?: number;
  complete_upcoming_match?: string;
  deleteFromachievement_rulesCollection: achievement_rulesDeleteResponse;
  deleteFromachievementsCollection: achievementsDeleteResponse;
  deleteFromalembic_versionCollection: alembic_versionDeleteResponse;
  deleteFromawards_raceCollection: awards_raceDeleteResponse;
  deleteFromcity_crewsCollection: city_crewsDeleteResponse;
  deleteFromcollege_majorsCollection: college_majorsDeleteResponse;
  deleteFromcollege_studentsCollection: college_studentsDeleteResponse;
  deleteFromcollegesCollection: collegesDeleteResponse;
  deleteFromdraft_poolCollection: draft_poolDeleteResponse;
  deleteFromevent_queueCollection: event_queueDeleteResponse;
  deleteFromevent_resultsCollection: event_resultsDeleteResponse;
  deleteFromevent_tiersCollection: event_tiersDeleteResponse;
  deleteFromfine_tuning_examplesCollection: fine_tuning_examplesDeleteResponse;
  deleteFromgroup_matchesCollection: group_matchesDeleteResponse;
  deleteFromgroup_standingsCollection: group_standingsDeleteResponse;
  deleteFromkv_store_10f5458bCollection: kv_store_10f5458bDeleteResponse;
  deleteFromkv_store_f16f1f5fCollection: kv_store_f16f1f5fDeleteResponse;
  deleteFromleague_openCollection: league_openDeleteResponse;
  deleteFromleague_open_matchesCollection: league_open_matchesDeleteResponse;
  deleteFromleague_playoffCollection: league_playoffDeleteResponse;
  deleteFromleague_playoff_matchesCollection: league_playoff_matchesDeleteResponse;
  deleteFromleague_rp_valuesCollection: league_rp_valuesDeleteResponse;
  deleteFromleague_seasonsCollection: league_seasonsDeleteResponse;
  deleteFromleagues_infoCollection: leagues_infoDeleteResponse;
  deleteFromlg_confCollection: lg_confDeleteResponse;
  deleteFromlg_division_conferencesCollection: lg_division_conferencesDeleteResponse;
  deleteFromlg_divisionsCollection: lg_divisionsDeleteResponse;
  deleteFrommatch_contextsCollection: match_contextsDeleteResponse;
  deleteFrommatch_mvpCollection: match_mvpDeleteResponse;
  deleteFrommatch_pointsCollection: match_pointsDeleteResponse;
  deleteFrommatch_queue_sessionsCollection: match_queue_sessionsDeleteResponse;
  deleteFrommatch_queue_slotsCollection: match_queue_slotsDeleteResponse;
  deleteFrommatch_reportsCollection: match_reportsDeleteResponse;
  deleteFrommatch_snapshotsCollection: match_snapshotsDeleteResponse;
  deleteFrommatch_submissionsCollection: match_submissionsDeleteResponse;
  deleteFrommatch_team_lineup_playersCollection: match_team_lineup_playersDeleteResponse;
  deleteFrommatch_team_lineupsCollection: match_team_lineupsDeleteResponse;
  deleteFrommatchesCollection: matchesDeleteResponse;
  deleteFromnotificationsCollection: notificationsDeleteResponse;
  deleteFromocr_accuracy_match_metricsCollection: ocr_accuracy_match_metricsDeleteResponse;
  deleteFromocr_accuracy_mismatchesCollection: ocr_accuracy_mismatchesDeleteResponse;
  deleteFromocr_accuracy_reportsCollection: ocr_accuracy_reportsDeleteResponse;
  deleteFromocr_correction_exportsCollection: ocr_correction_exportsDeleteResponse;
  deleteFromocr_correctionsCollection: ocr_correctionsDeleteResponse;
  deleteFromocr_validationsCollection: ocr_validationsDeleteResponse;
  deleteFrompast_championsCollection: past_championsDeleteResponse;
  deleteFromplayer_awardsCollection: player_awardsDeleteResponse;
  deleteFromplayer_badgesCollection: player_badgesDeleteResponse;
  deleteFromplayer_countersCollection: player_countersDeleteResponse;
  deleteFromplayer_handlesCollection: player_handlesDeleteResponse;
  deleteFromplayer_rating_weightsCollection: player_rating_weightsDeleteResponse;
  deleteFromplayer_rp_transactionsCollection: player_rp_transactionsDeleteResponse;
  deleteFromplayer_salary_tiersCollection: player_salary_tiersDeleteResponse;
  deleteFromplayer_statsCollection: player_statsDeleteResponse;
  deleteFromplayer_stats_submissionsCollection: player_stats_submissionsDeleteResponse;
  deleteFromplayersCollection: playersDeleteResponse;
  deleteFromplaylistCollection: playlistDeleteResponse;
  deleteFromprofilesCollection: profilesDeleteResponse;
  deleteFromr2_lg_foldersCollection: r2_lg_foldersDeleteResponse;
  deleteFromranking_pointsCollection: ranking_pointsDeleteResponse;
  deleteFromregionsCollection: regionsDeleteResponse;
  deleteFromrole_permissionsCollection: role_permissionsDeleteResponse;
  deleteFromrp_transactionsCollection: rp_transactionsDeleteResponse;
  deleteFromsalary_tiersCollection: salary_tiersDeleteResponse;
  deleteFromseries_formatsCollection: series_formatsDeleteResponse;
  deleteFromsponsor_infoCollection: sponsor_infoDeleteResponse;
  deleteFromteam_match_queue_lineup_playersCollection: team_match_queue_lineup_playersDeleteResponse;
  deleteFromteam_match_queue_sessionsCollection: team_match_queue_sessionsDeleteResponse;
  deleteFromteam_match_queue_slotsCollection: team_match_queue_slotsDeleteResponse;
  deleteFromteam_match_statsCollection: team_match_statsDeleteResponse;
  deleteFromteam_match_stats_submissionsCollection: team_match_stats_submissionsDeleteResponse;
  deleteFromteam_rostersCollection: team_rostersDeleteResponse;
  deleteFromteamsCollection: teamsDeleteResponse;
  deleteFromteams_pot_trackerCollection: teams_pot_trackerDeleteResponse;
  deleteFromtournament_group_membersCollection: tournament_group_membersDeleteResponse;
  deleteFromtournament_groupsCollection: tournament_groupsDeleteResponse;
  deleteFromtournamentsCollection: tournamentsDeleteResponse;
  deleteFromupcoming_matchesCollection: upcoming_matchesDeleteResponse;
  deleteFromupdate_raceCollection: update_raceDeleteResponse;
  deleteFromuser_rolesCollection: user_rolesDeleteResponse;
  deleteFromwebhook_configCollection: webhook_configDeleteResponse;
  has_permission?: boolean;
  has_role?: boolean;
  initialize_new_season?: any;
  initialize_user_roles?: any;
  insertIntoachievement_rulesCollection?: achievement_rulesInsertResponse;
  insertIntoachievementsCollection?: achievementsInsertResponse;
  insertIntoalembic_versionCollection?: alembic_versionInsertResponse;
  insertIntoawards_raceCollection?: awards_raceInsertResponse;
  insertIntocity_crewsCollection?: city_crewsInsertResponse;
  insertIntocollege_majorsCollection?: college_majorsInsertResponse;
  insertIntocollege_studentsCollection?: college_studentsInsertResponse;
  insertIntocollegesCollection?: collegesInsertResponse;
  insertIntodraft_poolCollection?: draft_poolInsertResponse;
  insertIntoevent_queueCollection?: event_queueInsertResponse;
  insertIntoevent_resultsCollection?: event_resultsInsertResponse;
  insertIntoevent_tiersCollection?: event_tiersInsertResponse;
  insertIntofine_tuning_examplesCollection?: fine_tuning_examplesInsertResponse;
  insertIntogroup_matchesCollection?: group_matchesInsertResponse;
  insertIntogroup_standingsCollection?: group_standingsInsertResponse;
  insertIntokv_store_10f5458bCollection?: kv_store_10f5458bInsertResponse;
  insertIntokv_store_f16f1f5fCollection?: kv_store_f16f1f5fInsertResponse;
  insertIntoleague_openCollection?: league_openInsertResponse;
  insertIntoleague_open_matchesCollection?: league_open_matchesInsertResponse;
  insertIntoleague_playoffCollection?: league_playoffInsertResponse;
  insertIntoleague_playoff_matchesCollection?: league_playoff_matchesInsertResponse;
  insertIntoleague_rp_valuesCollection?: league_rp_valuesInsertResponse;
  insertIntoleague_seasonsCollection?: league_seasonsInsertResponse;
  insertIntoleagues_infoCollection?: leagues_infoInsertResponse;
  insertIntolg_confCollection?: lg_confInsertResponse;
  insertIntolg_division_conferencesCollection?: lg_division_conferencesInsertResponse;
  insertIntolg_divisionsCollection?: lg_divisionsInsertResponse;
  insertIntomatch_contextsCollection?: match_contextsInsertResponse;
  insertIntomatch_mvpCollection?: match_mvpInsertResponse;
  insertIntomatch_pointsCollection?: match_pointsInsertResponse;
  insertIntomatch_queue_sessionsCollection?: match_queue_sessionsInsertResponse;
  insertIntomatch_queue_slotsCollection?: match_queue_slotsInsertResponse;
  insertIntomatch_reportsCollection?: match_reportsInsertResponse;
  insertIntomatch_snapshotsCollection?: match_snapshotsInsertResponse;
  insertIntomatch_submissionsCollection?: match_submissionsInsertResponse;
  insertIntomatch_team_lineup_playersCollection?: match_team_lineup_playersInsertResponse;
  insertIntomatch_team_lineupsCollection?: match_team_lineupsInsertResponse;
  insertIntomatchesCollection?: matchesInsertResponse;
  insertIntonotificationsCollection?: notificationsInsertResponse;
  insertIntoocr_accuracy_match_metricsCollection?: ocr_accuracy_match_metricsInsertResponse;
  insertIntoocr_accuracy_mismatchesCollection?: ocr_accuracy_mismatchesInsertResponse;
  insertIntoocr_accuracy_reportsCollection?: ocr_accuracy_reportsInsertResponse;
  insertIntoocr_correction_exportsCollection?: ocr_correction_exportsInsertResponse;
  insertIntoocr_correctionsCollection?: ocr_correctionsInsertResponse;
  insertIntoocr_validationsCollection?: ocr_validationsInsertResponse;
  insertIntopast_championsCollection?: past_championsInsertResponse;
  insertIntoplayer_awardsCollection?: player_awardsInsertResponse;
  insertIntoplayer_badgesCollection?: player_badgesInsertResponse;
  insertIntoplayer_countersCollection?: player_countersInsertResponse;
  insertIntoplayer_handlesCollection?: player_handlesInsertResponse;
  insertIntoplayer_rating_weightsCollection?: player_rating_weightsInsertResponse;
  insertIntoplayer_rp_transactionsCollection?: player_rp_transactionsInsertResponse;
  insertIntoplayer_salary_tiersCollection?: player_salary_tiersInsertResponse;
  insertIntoplayer_statsCollection?: player_statsInsertResponse;
  insertIntoplayer_stats_submissionsCollection?: player_stats_submissionsInsertResponse;
  insertIntoplayersCollection?: playersInsertResponse;
  insertIntoplaylistCollection?: playlistInsertResponse;
  insertIntoprofilesCollection?: profilesInsertResponse;
  insertIntor2_lg_foldersCollection?: r2_lg_foldersInsertResponse;
  insertIntoranking_pointsCollection?: ranking_pointsInsertResponse;
  insertIntoregionsCollection?: regionsInsertResponse;
  insertIntorole_permissionsCollection?: role_permissionsInsertResponse;
  insertIntorp_transactionsCollection?: rp_transactionsInsertResponse;
  insertIntosalary_tiersCollection?: salary_tiersInsertResponse;
  insertIntoseries_formatsCollection?: series_formatsInsertResponse;
  insertIntosponsor_infoCollection?: sponsor_infoInsertResponse;
  insertIntoteam_match_queue_lineup_playersCollection?: team_match_queue_lineup_playersInsertResponse;
  insertIntoteam_match_queue_sessionsCollection?: team_match_queue_sessionsInsertResponse;
  insertIntoteam_match_queue_slotsCollection?: team_match_queue_slotsInsertResponse;
  insertIntoteam_match_statsCollection?: team_match_statsInsertResponse;
  insertIntoteam_match_stats_submissionsCollection?: team_match_stats_submissionsInsertResponse;
  insertIntoteam_rostersCollection?: team_rostersInsertResponse;
  insertIntoteamsCollection?: teamsInsertResponse;
  insertIntoteams_pot_trackerCollection?: teams_pot_trackerInsertResponse;
  insertIntotournament_group_membersCollection?: tournament_group_membersInsertResponse;
  insertIntotournament_groupsCollection?: tournament_groupsInsertResponse;
  insertIntotournamentsCollection?: tournamentsInsertResponse;
  insertIntoupcoming_matchesCollection?: upcoming_matchesInsertResponse;
  insertIntoupdate_raceCollection?: update_raceInsertResponse;
  insertIntouser_rolesCollection?: user_rolesInsertResponse;
  insertIntowebhook_configCollection?: webhook_configInsertResponse;
  is_league_admin?: boolean;
  mark_queue_retry?: any;
  promote_to_league_admin?: boolean;
  recalculate_all_rankings?: any;
  record_match_forfeit?: any;
  refresh_all_materialized_views?: any;
  refresh_league_player_stats_views?: any;
  remove_role?: boolean;
  sign_payload?: string;
  sync_user_roles_for_user?: any;
  update_all_teams_money_won?: any;
  update_elo_after_match?: any;
  update_existing_draft_pool_records?: any;
  update_player_ps?: any;
  update_player_rank_score?: any;
  update_player_rankings?: any;
  update_team_money_won?: any;
  update_team_rankings?: any;
  update_user_claims?: boolean;
  updateachievement_rulesCollection: achievement_rulesUpdateResponse;
  updateachievementsCollection: achievementsUpdateResponse;
  updatealembic_versionCollection: alembic_versionUpdateResponse;
  updateawards_raceCollection: awards_raceUpdateResponse;
  updatecity_crewsCollection: city_crewsUpdateResponse;
  updatecollege_majorsCollection: college_majorsUpdateResponse;
  updatecollege_studentsCollection: college_studentsUpdateResponse;
  updatecollegesCollection: collegesUpdateResponse;
  updatedraft_poolCollection: draft_poolUpdateResponse;
  updateevent_queueCollection: event_queueUpdateResponse;
  updateevent_resultsCollection: event_resultsUpdateResponse;
  updateevent_tiersCollection: event_tiersUpdateResponse;
  updatefine_tuning_examplesCollection: fine_tuning_examplesUpdateResponse;
  updategroup_matchesCollection: group_matchesUpdateResponse;
  updategroup_standingsCollection: group_standingsUpdateResponse;
  updatekv_store_10f5458bCollection: kv_store_10f5458bUpdateResponse;
  updatekv_store_f16f1f5fCollection: kv_store_f16f1f5fUpdateResponse;
  updateleague_openCollection: league_openUpdateResponse;
  updateleague_open_matchesCollection: league_open_matchesUpdateResponse;
  updateleague_playoffCollection: league_playoffUpdateResponse;
  updateleague_playoff_matchesCollection: league_playoff_matchesUpdateResponse;
  updateleague_rp_valuesCollection: league_rp_valuesUpdateResponse;
  updateleague_seasonsCollection: league_seasonsUpdateResponse;
  updateleagues_infoCollection: leagues_infoUpdateResponse;
  updatelg_confCollection: lg_confUpdateResponse;
  updatelg_division_conferencesCollection: lg_division_conferencesUpdateResponse;
  updatelg_divisionsCollection: lg_divisionsUpdateResponse;
  updatematch_contextsCollection: match_contextsUpdateResponse;
  updatematch_mvpCollection: match_mvpUpdateResponse;
  updatematch_pointsCollection: match_pointsUpdateResponse;
  updatematch_queue_sessionsCollection: match_queue_sessionsUpdateResponse;
  updatematch_queue_slotsCollection: match_queue_slotsUpdateResponse;
  updatematch_reportsCollection: match_reportsUpdateResponse;
  updatematch_snapshotsCollection: match_snapshotsUpdateResponse;
  updatematch_submissionsCollection: match_submissionsUpdateResponse;
  updatematch_team_lineup_playersCollection: match_team_lineup_playersUpdateResponse;
  updatematch_team_lineupsCollection: match_team_lineupsUpdateResponse;
  updatematchesCollection: matchesUpdateResponse;
  updatenotificationsCollection: notificationsUpdateResponse;
  updateocr_accuracy_match_metricsCollection: ocr_accuracy_match_metricsUpdateResponse;
  updateocr_accuracy_mismatchesCollection: ocr_accuracy_mismatchesUpdateResponse;
  updateocr_accuracy_reportsCollection: ocr_accuracy_reportsUpdateResponse;
  updateocr_correction_exportsCollection: ocr_correction_exportsUpdateResponse;
  updateocr_correctionsCollection: ocr_correctionsUpdateResponse;
  updateocr_validationsCollection: ocr_validationsUpdateResponse;
  updatepast_championsCollection: past_championsUpdateResponse;
  updateplayer_awardsCollection: player_awardsUpdateResponse;
  updateplayer_badgesCollection: player_badgesUpdateResponse;
  updateplayer_countersCollection: player_countersUpdateResponse;
  updateplayer_handlesCollection: player_handlesUpdateResponse;
  updateplayer_rating_weightsCollection: player_rating_weightsUpdateResponse;
  updateplayer_rp_transactionsCollection: player_rp_transactionsUpdateResponse;
  updateplayer_salary_tiersCollection: player_salary_tiersUpdateResponse;
  updateplayer_statsCollection: player_statsUpdateResponse;
  updateplayer_stats_submissionsCollection: player_stats_submissionsUpdateResponse;
  updateplayersCollection: playersUpdateResponse;
  updateplaylistCollection: playlistUpdateResponse;
  updateprofilesCollection: profilesUpdateResponse;
  updater2_lg_foldersCollection: r2_lg_foldersUpdateResponse;
  updateranking_pointsCollection: ranking_pointsUpdateResponse;
  updateregionsCollection: regionsUpdateResponse;
  updaterole_permissionsCollection: role_permissionsUpdateResponse;
  updaterp_transactionsCollection: rp_transactionsUpdateResponse;
  updatesalary_tiersCollection: salary_tiersUpdateResponse;
  updateseries_formatsCollection: series_formatsUpdateResponse;
  updatesponsor_infoCollection: sponsor_infoUpdateResponse;
  updateteam_match_queue_lineup_playersCollection: team_match_queue_lineup_playersUpdateResponse;
  updateteam_match_queue_sessionsCollection: team_match_queue_sessionsUpdateResponse;
  updateteam_match_queue_slotsCollection: team_match_queue_slotsUpdateResponse;
  updateteam_match_statsCollection: team_match_statsUpdateResponse;
  updateteam_match_stats_submissionsCollection: team_match_stats_submissionsUpdateResponse;
  updateteam_rostersCollection: team_rostersUpdateResponse;
  updateteamsCollection: teamsUpdateResponse;
  updateteams_pot_trackerCollection: teams_pot_trackerUpdateResponse;
  updatetournament_group_membersCollection: tournament_group_membersUpdateResponse;
  updatetournament_groupsCollection: tournament_groupsUpdateResponse;
  updatetournamentsCollection: tournamentsUpdateResponse;
  updateupcoming_matchesCollection: upcoming_matchesUpdateResponse;
  updateupdate_raceCollection: update_raceUpdateResponse;
  updateuser_rolesCollection: user_rolesUpdateResponse;
  updatewebhook_configCollection: webhook_configUpdateResponse;
}

export interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
}

export interface Query {
  achievement_rulesCollection?: achievement_rulesConnection;
  achievementsCollection?: achievementsConnection;
  alembic_versionCollection?: alembic_versionConnection;
  awards_raceCollection?: awards_raceConnection;
  calculate_hybrid_score?: string;
  calculate_normalized_rp?: string;
  city_crewsCollection?: city_crewsConnection;
  college_majorsCollection?: college_majorsConnection;
  college_studentsCollection?: college_studentsConnection;
  collegesCollection?: collegesConnection;
  compute_hmac_hex?: string;
  custom_jwt?: any;
  draft_poolCollection?: draft_poolConnection;
  event_queueCollection?: event_queueConnection;
  event_resultsCollection?: event_resultsConnection;
  event_tiersCollection?: event_tiersConnection;
  fine_tuning_examplesCollection?: fine_tuning_examplesConnection;
  group_matchesCollection?: group_matchesConnection;
  group_standingsCollection?: group_standingsConnection;
  kv_store_10f5458bCollection?: kv_store_10f5458bConnection;
  kv_store_f16f1f5fCollection?: kv_store_f16f1f5fConnection;
  league_openCollection?: league_openConnection;
  league_open_matchesCollection?: league_open_matchesConnection;
  league_playoffCollection?: league_playoffConnection;
  league_playoff_matchesCollection?: league_playoff_matchesConnection;
  league_rp_valuesCollection?: league_rp_valuesConnection;
  league_seasonsCollection?: league_seasonsConnection;
  leagues_infoCollection?: leagues_infoConnection;
  lg_confCollection?: lg_confConnection;
  lg_division_conferencesCollection?: lg_division_conferencesConnection;
  lg_divisionsCollection?: lg_divisionsConnection;
  match_contextsCollection?: match_contextsConnection;
  match_mvpCollection?: match_mvpConnection;
  match_pointsCollection?: match_pointsConnection;
  match_queue_sessionsCollection?: match_queue_sessionsConnection;
  match_queue_slotsCollection?: match_queue_slotsConnection;
  match_reportsCollection?: match_reportsConnection;
  match_snapshotsCollection?: match_snapshotsConnection;
  match_submissionsCollection?: match_submissionsConnection;
  match_team_lineup_playersCollection?: match_team_lineup_playersConnection;
  match_team_lineupsCollection?: match_team_lineupsConnection;
  matchesCollection?: matchesConnection;
  node?: Node;
  notificationsCollection?: notificationsConnection;
  ocr_accuracy_match_metricsCollection?: ocr_accuracy_match_metricsConnection;
  ocr_accuracy_mismatchesCollection?: ocr_accuracy_mismatchesConnection;
  ocr_accuracy_reportsCollection?: ocr_accuracy_reportsConnection;
  ocr_correction_exportsCollection?: ocr_correction_exportsConnection;
  ocr_correctionsCollection?: ocr_correctionsConnection;
  ocr_validationsCollection?: ocr_validationsConnection;
  past_championsCollection?: past_championsConnection;
  player_awardsCollection?: player_awardsConnection;
  player_badgesCollection?: player_badgesConnection;
  player_countersCollection?: player_countersConnection;
  player_handlesCollection?: player_handlesConnection;
  player_rating_weightsCollection?: player_rating_weightsConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  player_salary_tiersCollection?: player_salary_tiersConnection;
  player_statsCollection?: player_statsConnection;
  player_stats_submissionsCollection?: player_stats_submissionsConnection;
  playersCollection?: playersConnection;
  playlistCollection?: playlistConnection;
  profilesCollection?: profilesConnection;
  r2_lg_foldersCollection?: r2_lg_foldersConnection;
  ranking_pointsCollection?: ranking_pointsConnection;
  regionsCollection?: regionsConnection;
  role_permissionsCollection?: role_permissionsConnection;
  rp_transactionsCollection?: rp_transactionsConnection;
  salary_tiersCollection?: salary_tiersConnection;
  series_formatsCollection?: series_formatsConnection;
  sponsor_infoCollection?: sponsor_infoConnection;
  team_match_queue_lineup_playersCollection?: team_match_queue_lineup_playersConnection;
  team_match_queue_sessionsCollection?: team_match_queue_sessionsConnection;
  team_match_queue_slotsCollection?: team_match_queue_slotsConnection;
  team_match_statsCollection?: team_match_statsConnection;
  team_match_stats_submissionsCollection?: team_match_stats_submissionsConnection;
  team_rostersCollection?: team_rostersConnection;
  teamsCollection?: teamsConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  tournament_group_membersCollection?: tournament_group_membersConnection;
  tournament_groupsCollection?: tournament_groupsConnection;
  tournamentsCollection?: tournamentsConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
  update_raceCollection?: update_raceConnection;
  user_rolesCollection?: user_rolesConnection;
  webhook_configCollection?: webhook_configConnection;
}

export interface achievement_rules {
  nodeId: string;
  id: string;
  name: string;
  tier: achievement_tier;
  scope: achievement_scope;
  game_year?: string;
  league_id?: string;
  season_id?: string;
  requires_approval: boolean;
  predicate: any;
  window_size?: number;
  window_predicate?: any;
  award_template?: any;
  is_active: boolean;
  created_at: any;
  updated_at: any;
  leagues_info?: leagues_info;
  achievements?: achievements;
  league_seasons?: league_seasons;
  player_awardsCollection?: player_awardsConnection;
}

export interface achievement_rulesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface achievement_rulesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface achievement_rulesEdge {
  cursor: string;
  node: achievement_rules;
}

export interface achievement_rulesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface achievement_rulesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface achievements {
  nodeId: string;
  id: string;
  name?: string;
  is_player?: boolean;
  is_team?: boolean;
  rarity?: achievement_rarity;
  category?: achievement_category;
  created_at: any;
  description?: string;
  type?: achievement_type;
  rp_value?: number;
  achievement_badge?: string;
  achievement_rulesCollection?: achievement_rulesConnection;
}

export interface achievementsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface achievementsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface achievementsEdge {
  cursor: string;
  node: achievements;
}

export interface achievementsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface achievementsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface alembic_version {
  nodeId: string;
  version_num: string;
}

export interface alembic_versionConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface alembic_versionDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface alembic_versionEdge {
  cursor: string;
  node: alembic_version;
}

export interface alembic_versionInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface alembic_versionUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface awards_race {
  nodeId: string;
  id: string;
  team_id: string;
  player_id?: string;
  award_type?: award_types;
  rank?: number;
  rp_bonus?: string;
  award_winner?: boolean;
  created_at: any;
  league_id?: string;
  tournament_id?: string;
  leagues_info?: leagues_info;
  players?: players;
  teams?: teams;
  tournaments?: tournaments;
  update_raceCollection?: update_raceConnection;
}

export interface awards_raceConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface awards_raceDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface awards_raceEdge {
  cursor: string;
  node: awards_race;
}

export interface awards_raceInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface awards_raceUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface city_crews {
  nodeId: string;
  id: string;
  crewName?: string;
  crewRank?: number;
  crewLead?: string;
  crewRegion?: string;
  created_at: any;
  crew_logo?: string;
  twitter_url?: string;
  discord_url?: string;
  twitch_url?: string;
  website?: string;
  youtube_url?: string;
  players?: players;
  regions?: regions;
  playersCollection?: playersConnection;
}

export interface city_crewsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface city_crewsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface city_crewsEdge {
  cursor: string;
  node: city_crews;
}

export interface city_crewsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface city_crewsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface college_majors {
  nodeId: string;
  id: string;
  name: string;
  category?: string;
}

export interface college_majorsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface college_majorsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface college_majorsEdge {
  cursor: string;
  node: college_majors;
}

export interface college_majorsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface college_majorsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface college_students {
  nodeId: string;
  id: string;
  first_name: string;
  last_initial: string;
  gamertag: string;
  player_id?: string;
  gpa?: string;
  graduation_year?: number;
  is_transfer?: boolean;
  majors_desired?: string[];
  willing_to_travel_out_of_state?: boolean;
  competitive_accomplishments?: string;
  goals_with_competing?: string;
  film_links?: string[];
  created_at?: any;
  updated_at?: any;
  players?: players;
}

export interface college_studentsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface college_studentsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface college_studentsEdge {
  cursor: string;
  node: college_students;
}

export interface college_studentsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface college_studentsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface colleges {
  nodeId: string;
  id: string;
  name: string;
  location?: string;
  size?: string;
  majors_offered?: string[];
  majors_page_url?: string;
  avg_cost_to_attend?: string;
  scholarships_offered?: string;
  program_benefits?: string;
  student_work_jobs?: string;
  other_games_offered?: string[];
  logo_url?: string;
  created_at?: any;
  updated_at?: any;
}

export interface collegesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface collegesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface collegesEdge {
  cursor: string;
  node: colleges;
}

export interface collegesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface collegesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface draft_pool {
  nodeId: string;
  player_id: string;
  declared_at?: any;
  status?: string;
  season?: string;
  draft_rating?: number;
  draft_notes?: string;
  created_at?: any;
  updated_at?: any;
  league_id?: string;
  tournament_id?: string;
  leagues_info?: leagues_info;
  players?: players;
  league_seasons?: league_seasons;
  tournaments?: tournaments;
}

export interface draft_poolConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface draft_poolDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface draft_poolEdge {
  cursor: string;
  node: draft_pool;
}

export interface draft_poolInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface draft_poolUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface event_queue {
  nodeId: string;
  id: number;
  player_stats_id: string;
  status: string;
  attempts: number;
  last_error?: string;
  visible_at: any;
  created_at: any;
  updated_at: any;
  player_stats?: player_stats;
}

export interface event_queueConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface event_queueDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface event_queueEdge {
  cursor: string;
  node: event_queue;
}

export interface event_queueInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface event_queueUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface event_results {
  nodeId: string;
  id: string;
  team_id: string;
  placement?: number;
  rp_awarded?: number;
  bonus_rp?: number;
  total_rp?: number;
  awarded_at?: Date;
  prize_amount?: number;
  winner_banner_url?: string;
  tournament_id?: string;
  league_id?: string;
  rp_decay_start_days?: number;
  season_id?: string;
  remaining_rp?: number;
  last_decay_date?: Date;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  teams?: teams;
  tournaments?: tournaments;
}

export interface event_resultsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface event_resultsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface event_resultsEdge {
  cursor: string;
  node: event_results;
}

export interface event_resultsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface event_resultsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface event_tiers {
  nodeId: string;
  id: string;
  event_tier?: event_tier;
  tier_name?: string;
  event_type?: event_type;
  is_tournament?: boolean;
  max_rp?: number;
  player_rp_bonus?: number;
  created_at: any;
}

export interface event_tiersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface event_tiersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface event_tiersEdge {
  cursor: string;
  node: event_tiers;
}

export interface event_tiersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface event_tiersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface fine_tuning_examples {
  nodeId: string;
  id: string;
  match_id?: string;
  extracted_text: string;
  team_a_name: string;
  team_b_name: string;
  mode: string;
  successful_response: any;
  validation_score?: number;
  has_validation_errors?: boolean;
  error_count?: number;
  ocr_provider?: string;
  model_version?: string;
  processing_time_ms?: number;
  used_for_training?: boolean;
  training_batch_id?: string;
  trained_at?: any;
  created_at?: any;
  matches?: matches;
}

export interface fine_tuning_examplesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface fine_tuning_examplesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface fine_tuning_examplesEdge {
  cursor: string;
  node: fine_tuning_examples;
}

export interface fine_tuning_examplesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface fine_tuning_examplesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface group_matches {
  nodeId: string;
  id: string;
  group_id: string;
  match_id: string;
  round: number;
  match_number: number;
  created_at?: any;
  tournament_groups?: tournament_groups;
  matches?: matches;
}

export interface group_matchesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface group_matchesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface group_matchesEdge {
  cursor: string;
  node: group_matches;
}

export interface group_matchesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface group_matchesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface group_standings {
  nodeId: string;
  id: string;
  group_id: string;
  team_id: string;
  matches_played?: number;
  wins?: number;
  losses?: number;
  points_for?: number;
  points_against?: number;
  point_differential?: number;
  position?: number;
  updated_at?: any;
  tournament_groups?: tournament_groups;
  teams?: teams;
}

export interface group_standingsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface group_standingsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface group_standingsEdge {
  cursor: string;
  node: group_standings;
}

export interface group_standingsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface group_standingsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface kv_store_10f5458b {
  nodeId: string;
  key: string;
  value: any;
}

export interface kv_store_10f5458bConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface kv_store_10f5458bDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface kv_store_10f5458bEdge {
  cursor: string;
  node: kv_store_10f5458b;
}

export interface kv_store_10f5458bInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface kv_store_10f5458bUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface kv_store_f16f1f5f {
  nodeId: string;
  key: string;
  value: any;
}

export interface kv_store_f16f1f5fConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface kv_store_f16f1f5fDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface kv_store_f16f1f5fEdge {
  cursor: string;
  node: kv_store_f16f1f5f;
}

export interface kv_store_f16f1f5fInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface kv_store_f16f1f5fUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface league_open {
  nodeId: string;
  id: string;
  season_id: string;
  team_count?: number;
  start_date?: Date;
  finals_date?: Date;
  open_prize?: string;
  open_champion?: string;
  hr_per_rd?: string;
  tier_label?: string;
  rp_value?: string;
  created_at: any;
  status?: status;
  tournament_type?: tournament_format;
  series_format?: string;
  teams?: teams;
  league_seasons?: league_seasons;
}

export interface league_openConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface league_openDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface league_openEdge {
  cursor: string;
  node: league_open;
}

export interface league_openInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface league_openUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface league_open_matches {
  nodeId: string;
  id: string;
  season_id?: string;
  match_id?: string;
  stage?: stage;
  series_number?: number;
  created_at: any;
  matches?: matches;
  league_seasons?: league_seasons;
}

export interface league_open_matchesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface league_open_matchesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface league_open_matchesEdge {
  cursor: string;
  node: league_open_matches;
}

export interface league_open_matchesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface league_open_matchesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface league_playoff {
  nodeId: string;
  id: string;
  season_id: string;
  team_count?: number;
  start_date?: Date;
  finals_date?: Date;
  playoff_prize?: string;
  playoff_champion?: string;
  hr_per_rd?: string;
  tier?: event_tier;
  rp_value?: string;
  created_at: any;
  status?: status;
  tournament_type?: tournament_format;
  series_format?: string;
  teams?: teams;
  league_seasons?: league_seasons;
}

export interface league_playoffConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface league_playoffDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface league_playoffEdge {
  cursor: string;
  node: league_playoff;
}

export interface league_playoffInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface league_playoffUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface league_playoff_matches {
  nodeId: string;
  id: string;
  season_id?: string;
  match_id?: string;
  stage?: stage;
  series_number?: number;
  created_at: any;
  matches?: matches;
  league_seasons?: league_seasons;
}

export interface league_playoff_matchesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface league_playoff_matchesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface league_playoff_matchesEdge {
  cursor: string;
  node: league_playoff_matches;
}

export interface league_playoff_matchesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface league_playoff_matchesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface league_rp_values {
  nodeId: string;
  id: string;
  league_id?: string;
  leagues?: leagues;
  event_tier?: event_tier;
  game_year?: game_year;
  rp_max?: number;
  player_rp_bonus?: number;
  winner_rp?: number;
  runner_up_rp?: number;
  created_at: any;
  decay_rate?: number;
  decay_days_start?: number;
  days_to_complete_decay?: number;
  leagues_info?: leagues_info;
}

export interface league_rp_valuesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface league_rp_valuesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface league_rp_valuesEdge {
  cursor: string;
  node: league_rp_values;
}

export interface league_rp_valuesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface league_rp_valuesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface league_seasons {
  nodeId: string;
  league_name: leagues;
  season_number: number;
  start_date: any;
  end_date: any;
  is_active?: boolean;
  created_at: any;
  updated_at: any;
  year?: game_year;
  id: string;
  league_id?: string;
  entry_fee?: string;
  prize_pool?: number;
  game_min?: number;
  leagues_info?: leagues_info;
  achievement_rulesCollection?: achievement_rulesConnection;
  draft_poolCollection?: draft_poolConnection;
  tournament_groupsCollection?: tournament_groupsConnection;
  event_resultsCollection?: event_resultsConnection;
  league_open_matchesCollection?: league_open_matchesConnection;
  league_open?: league_open;
  league_playoff_matchesCollection?: league_playoff_matchesConnection;
  league_playoff?: league_playoff;
  lg_confCollection?: lg_confConnection;
  lg_divisionsCollection?: lg_divisionsConnection;
  match_contextsCollection?: match_contextsConnection;
  match_submissionsCollection?: match_submissionsConnection;
  matchesCollection?: matchesConnection;
  past_champions?: past_champions;
  player_awardsCollection?: player_awardsConnection;
  player_badgesCollection?: player_badgesConnection;
  player_countersCollection?: player_countersConnection;
  player_handlesCollection?: player_handlesConnection;
  playlistCollection?: playlistConnection;
  rp_transactionsCollection?: rp_transactionsConnection;
  team_rostersCollection?: team_rostersConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
  r2_lg_folders?: r2_lg_folders;
}

export interface league_seasonsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface league_seasonsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface league_seasonsEdge {
  cursor: string;
  node: league_seasons;
}

export interface league_seasonsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface league_seasonsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface leagues_info {
  nodeId: string;
  id: string;
  league?: leagues;
  lg_logo_url?: string;
  lg_url?: string;
  lg_discord?: string;
  created_at: any;
  twitter_id?: string;
  twitch_url?: string;
  sponsor_info?: string;
  lg_rules_url?: string;
  achievement_rulesCollection?: achievement_rulesConnection;
  awards_raceCollection?: awards_raceConnection;
  draft_poolCollection?: draft_poolConnection;
  event_resultsCollection?: event_resultsConnection;
  league_rp_valuesCollection?: league_rp_valuesConnection;
  league_seasonsCollection?: league_seasonsConnection;
  lg_confCollection?: lg_confConnection;
  lg_divisionsCollection?: lg_divisionsConnection;
  match_contextsCollection?: match_contextsConnection;
  match_submissionsCollection?: match_submissionsConnection;
  matchesCollection?: matchesConnection;
  past_championsCollection?: past_championsConnection;
  player_awardsCollection?: player_awardsConnection;
  player_badgesCollection?: player_badgesConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  playlistCollection?: playlistConnection;
  ranking_pointsCollection?: ranking_pointsConnection;
  rp_transactionsCollection?: rp_transactionsConnection;
  team_rostersCollection?: team_rostersConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  tournamentsCollection?: tournamentsConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
}

export interface leagues_infoConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface leagues_infoDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface leagues_infoEdge {
  cursor: string;
  node: leagues_info;
}

export interface leagues_infoInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface leagues_infoUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_conf {
  nodeId: string;
  id: string;
  league?: string;
  season?: string;
  name?: string;
  abbr?: string;
  gm_yr?: game_year;
  conf_logo?: string;
  created_at: any;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  lg_division_conferencesCollection?: lg_division_conferencesConnection;
  lg_divisionsCollection?: lg_divisionsConnection;
  teamsCollection?: teamsConnection;
}

export interface lg_confConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface lg_confDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_confEdge {
  cursor: string;
  node: lg_conf;
}

export interface lg_confInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_confUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_division_conferences {
  nodeId: string;
  id: string;
  division_id: string;
  conference_id: string;
  created_at: any;
  lg_conf?: lg_conf;
  lg_divisions: lg_divisions;
}

export interface lg_division_conferencesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface lg_division_conferencesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_division_conferencesEdge {
  cursor: string;
  node: lg_division_conferences;
}

export interface lg_division_conferencesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_division_conferencesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_divisions {
  nodeId: string;
  id: string;
  name: string;
  abbr?: string;
  division_logo?: string;
  conference_id?: string;
  season_id?: string;
  league_id?: string;
  display_order?: number;
  created_at: any;
  lg_conf?: lg_conf;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  team_rostersCollection?: team_rostersConnection;
  lg_division_conferencesCollection?: lg_division_conferencesConnection;
  teamsCollection?: teamsConnection;
}

export interface lg_divisionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface lg_divisionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_divisionsEdge {
  cursor: string;
  node: lg_divisions;
}

export interface lg_divisionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface lg_divisionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_contexts {
  nodeId: string;
  id: string;
  match_id: string;
  league_id?: string;
  season_id?: string;
  tournament_id?: string;
  submitted_by?: string;
  is_primary: boolean;
  created_at: any;
  leagues_info?: leagues_info;
  matches?: matches;
  league_seasons?: league_seasons;
  profiles?: profiles;
  tournaments?: tournaments;
}

export interface match_contextsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_contextsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_contextsEdge {
  cursor: string;
  node: match_contexts;
}

export interface match_contextsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_contextsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_mvp {
  nodeId: string;
  match_id: string;
  player_id: string;
  matches?: matches;
  players?: players;
}

export interface match_mvpConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_mvpDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_mvpEdge {
  cursor: string;
  node: match_mvp;
}

export interface match_mvpInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_mvpUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_points {
  nodeId: string;
  id: string;
  match_id: string;
  team_id: string;
  group_id?: string;
  points_earned: number;
  point_type: string;
  created_at?: any;
  updated_at?: any;
  tournament_groups?: tournament_groups;
  matches?: matches;
  teams?: teams;
}

export interface match_pointsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_pointsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_pointsEdge {
  cursor: string;
  node: match_points;
}

export interface match_pointsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_pointsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_queue_sessions {
  nodeId: string;
  id: string;
  guild_id: string;
  channel_id: string;
  message_id?: string;
  status: string;
  team_a_strength?: string;
  team_b_strength?: string;
  skill_range?: string;
  required_positions: string[];
  created_at: any;
  matched_at?: any;
  cancelled_at?: any;
  cancelled_by?: string;
  match_queue_slotsCollection?: match_queue_slotsConnection;
  match_snapshotsCollection?: match_snapshotsConnection;
}

export interface match_queue_sessionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_queue_sessionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_queue_sessionsEdge {
  cursor: string;
  node: match_queue_sessions;
}

export interface match_queue_sessionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_queue_sessionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_queue_slots {
  nodeId: string;
  id: string;
  session_id: string;
  discord_id: string;
  player_id?: string;
  position: string;
  status: queue_slot_status;
  joined_at: any;
  left_at?: any;
  assigned_team?: string;
  match_queue_sessions?: match_queue_sessions;
  players?: players;
}

export interface match_queue_slotsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_queue_slotsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_queue_slotsEdge {
  cursor: string;
  node: match_queue_slots;
}

export interface match_queue_slotsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_queue_slotsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_reports {
  nodeId: string;
  id: string;
  match_id: string;
  snapshot_id?: string;
  team_id?: string;
  team_side?: string;
  score: number;
  opponent_score: number;
  screenshot_url?: string;
  r2_object_key?: string;
  submitted_by: string;
  submitted_at: any;
  status: match_report_status;
  ocr_payload?: any;
  ocr_completed_at?: any;
  needs_human_review?: boolean;
  verified?: boolean;
  verified_by?: string;
  verified_at?: any;
  dispute_reason?: string;
  corrections?: any;
  matches?: matches;
  match_snapshots?: match_snapshots;
  teams?: teams;
}

export interface match_reportsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_reportsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_reportsEdge {
  cursor: string;
  node: match_reports;
}

export interface match_reportsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_reportsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_snapshots {
  nodeId: string;
  id: string;
  match_id?: string;
  session_id?: string;
  guild_id: string;
  vc_channel_id?: string;
  vc_channel_b_id?: string;
  thread_id?: string;
  match_code: string;
  team_a_captain?: string;
  team_b_captain?: string;
  status: match_snapshot_status;
  ready_a?: boolean;
  ready_b?: boolean;
  started_at?: any;
  ended_at?: any;
  created_at: any;
  team_a_id?: string;
  team_b_id?: string;
  team_a_captain_player_id?: string;
  team_b_captain_player_id?: string;
  league_id?: string;
  league_season_id?: string;
  lineups_confirmed_at?: any;
  lineups_confirmed_by?: string;
  team_a_slot_id?: string;
  team_b_slot_id?: string;
  matches?: matches;
  match_queue_sessions?: match_queue_sessions;
  teams?: teams;
  players?: players;
  team_match_queue_slots?: team_match_queue_slots;
  match_reportsCollection?: match_reportsConnection;
  match_team_lineupsCollection?: match_team_lineupsConnection;
}

export interface match_snapshotsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_snapshotsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_snapshotsEdge {
  cursor: string;
  node: match_snapshots;
}

export interface match_snapshotsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_snapshotsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_submissions {
  nodeId: string;
  id: string;
  match_id?: string;
  team_a_id?: string;
  team_a_name?: string;
  team_b_id?: string;
  team_b_name?: string;
  review_status?: string;
  reviewed_by?: string;
  reviewed_at?: any;
  created_at: any;
  review_notes?: string;
  status?: string;
  payload?: any;
  tournament_id?: string;
  league_id?: string;
  tx_hash?: string;
  ipfs_cid?: string;
  played_at?: any;
  season_id?: string;
  submissions_upload_url?: string;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  teams?: teams;
  tournaments?: tournaments;
}

export interface match_submissionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_submissionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_submissionsEdge {
  cursor: string;
  node: match_submissions;
}

export interface match_submissionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_submissionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_team_lineup_players {
  nodeId: string;
  id: string;
  lineup_id: string;
  player_id: string;
  position?: string;
  jersey_number?: string;
  is_starter?: boolean;
  match_team_lineups?: match_team_lineups;
  players?: players;
}

export interface match_team_lineup_playersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_team_lineup_playersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_team_lineup_playersEdge {
  cursor: string;
  node: match_team_lineup_players;
}

export interface match_team_lineup_playersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_team_lineup_playersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface match_team_lineups {
  nodeId: string;
  id: string;
  snapshot_id: string;
  team_id: string;
  league_id?: string;
  season_id?: string;
  roster_source?: roster_source_type;
  confirmed_by?: string;
  confirmed_at: any;
  match_snapshots?: match_snapshots;
  teams?: teams;
  match_team_lineup_playersCollection?: match_team_lineup_playersConnection;
}

export interface match_team_lineupsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface match_team_lineupsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface match_team_lineupsEdge {
  cursor: string;
  node: match_team_lineups;
}

export interface match_team_lineupsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface match_team_lineupsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface matches {
  nodeId: string;
  id: string;
  team_a_id?: string;
  team_b_id?: string;
  winner_id?: string;
  score_a?: number;
  score_b?: number;
  played_at?: any;
  boxscore_url?: string;
  stage?: stage;
  game_number?: number;
  league_id?: string;
  tournament_id?: string;
  season_id?: string;
  game_year?: game_year;
  status?: string;
  verified: boolean;
  possible_duplicate_of?: string;
  leagues_info?: leagues_info;
  matches?: matches;
  league_seasons?: league_seasons;
  teams?: teams;
  tournaments?: tournaments;
  fine_tuning_examplesCollection?: fine_tuning_examplesConnection;
  group_matchesCollection?: group_matchesConnection;
  league_open_matches?: league_open_matches;
  league_playoff_matches?: league_playoff_matches;
  match_contextsCollection?: match_contextsConnection;
  match_mvp?: match_mvp;
  match_pointsCollection?: match_pointsConnection;
  matchesCollection?: matchesConnection;
  ocr_correctionsCollection?: ocr_correctionsConnection;
  ocr_validationsCollection?: ocr_validationsConnection;
  player_awardsCollection?: player_awardsConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  player_statsCollection?: player_statsConnection;
  team_match_statsCollection?: team_match_statsConnection;
  ocr_accuracy_match_metricsCollection?: ocr_accuracy_match_metricsConnection;
  ocr_accuracy_mismatchesCollection?: ocr_accuracy_mismatchesConnection;
  match_snapshotsCollection?: match_snapshotsConnection;
  match_reportsCollection?: match_reportsConnection;
}

export interface matchesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface matchesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface matchesEdge {
  cursor: string;
  node: matches;
}

export interface matchesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface matchesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface notifications {
  nodeId: string;
  id: string;
  user_id?: string;
  title: string;
  message?: string;
  type: string;
  read: boolean;
  created_at: any;
  updated_at: any;
}

export interface notificationsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface notificationsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface notificationsEdge {
  cursor: string;
  node: notifications;
}

export interface notificationsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface notificationsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_match_metrics {
  nodeId: string;
  id: string;
  report_id: string;
  match_id: string;
  game_year?: string;
  has_boxscore: boolean;
  pair_count: number;
  char_accuracy: string;
  word_accuracy: string;
  numeric_accuracy: string;
  created_at: any;
  ocr_accuracy_reports: ocr_accuracy_reports;
  matches?: matches;
}

export interface ocr_accuracy_match_metricsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface ocr_accuracy_match_metricsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_match_metricsEdge {
  cursor: string;
  node: ocr_accuracy_match_metrics;
}

export interface ocr_accuracy_match_metricsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_match_metricsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_mismatches {
  nodeId: string;
  id: string;
  report_id: string;
  match_id: string;
  team_id?: string;
  slot_index?: number;
  ocr_name?: string;
  verified_name?: string;
  char_accuracy?: string;
  char_distance?: number;
  numeric_differences?: any;
  created_at: any;
  ocr_accuracy_reports: ocr_accuracy_reports;
  matches?: matches;
  teams?: teams;
}

export interface ocr_accuracy_mismatchesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface ocr_accuracy_mismatchesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_mismatchesEdge {
  cursor: string;
  node: ocr_accuracy_mismatches;
}

export interface ocr_accuracy_mismatchesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_mismatchesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_reports {
  nodeId: string;
  id: string;
  generated_at: any;
  dataset: any;
  totals: any;
  structured_metrics: any;
  mismatch_sample_count: number;
  report_path?: string;
  created_at: any;
  ocr_accuracy_match_metricsCollection?: ocr_accuracy_match_metricsConnection;
  ocr_accuracy_mismatchesCollection?: ocr_accuracy_mismatchesConnection;
}

export interface ocr_accuracy_reportsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface ocr_accuracy_reportsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_reportsEdge {
  cursor: string;
  node: ocr_accuracy_reports;
}

export interface ocr_accuracy_reportsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_accuracy_reportsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_correction_exports {
  nodeId: string;
  id: string;
  correction_id: string;
  exported_at: any;
  export_batch: string;
  export_notes?: string;
  created_at: any;
  ocr_corrections?: ocr_corrections;
}

export interface ocr_correction_exportsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface ocr_correction_exportsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_correction_exportsEdge {
  cursor: string;
  node: ocr_correction_exports;
}

export interface ocr_correction_exportsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_correction_exportsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_corrections {
  nodeId: string;
  id: string;
  match_id?: string;
  player_stats_id?: string;
  ocr_detected_name: string;
  corrected_player_id: string;
  corrected_gamertag: string;
  correction_type: string;
  original_confidence?: string;
  match_context?: any;
  created_at?: any;
  created_by?: string;
  players?: players;
  matches?: matches;
  player_stats?: player_stats;
  ocr_correction_exportsCollection?: ocr_correction_exportsConnection;
}

export interface ocr_correctionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface ocr_correctionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_correctionsEdge {
  cursor: string;
  node: ocr_corrections;
}

export interface ocr_correctionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_correctionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_validations {
  nodeId: string;
  id: string;
  match_id?: string;
  player_stats_id?: string;
  error?: string;
  verified?: boolean;
  created_at: any;
  matches?: matches;
  player_stats?: player_stats;
}

export interface ocr_validationsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface ocr_validationsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_validationsEdge {
  cursor: string;
  node: ocr_validations;
}

export interface ocr_validationsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface ocr_validationsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface past_champions {
  nodeId: string;
  id: string;
  season?: number;
  team_id?: string;
  team_name?: string;
  event_tier?: event_tier;
  created_at: any;
  champion_logo?: string;
  lg_logo?: string;
  console?: console;
  league_name?: leagues;
  year?: game_year;
  is_tournament: boolean;
  tournament_id?: string;
  league_id?: string;
  tournament_date?: Date;
  season_id?: string;
  teams?: teams;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  tournaments?: tournaments;
}

export interface past_championsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface past_championsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface past_championsEdge {
  cursor: string;
  node: past_champions;
}

export interface past_championsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface past_championsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_awards {
  nodeId: string;
  id: string;
  rule_id: string;
  player_id: string;
  scope_key?: string;
  level: number;
  title: string;
  tier: achievement_tier;
  game_year: game_year;
  league_id: string;
  season_id?: string;
  match_id?: string;
  awarded_at: any;
  stats?: any;
  issuer: string;
  signature?: string;
  sig_alg?: string;
  version: string;
  asset_svg_url?: string;
  asset_png_url?: string;
  nft_mint_id?: string;
  token_uri?: string;
  leagues_info?: leagues_info;
  matches?: matches;
  players?: players;
  achievement_rules?: achievement_rules;
  league_seasons?: league_seasons;
}

export interface player_awardsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_awardsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_awardsEdge {
  cursor: string;
  node: player_awards;
}

export interface player_awardsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_awardsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_badges {
  nodeId: string;
  id: string;
  player_wallet: string;
  badge_type: string;
  token_id?: string;
  tx_hash?: string;
  ipfs_uri?: string;
  created_at: any;
  match_id: string;
  league_id?: string;
  tournament_id?: string;
  season_id?: string;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  tournaments?: tournaments;
}

export interface player_badgesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_badgesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_badgesEdge {
  cursor: string;
  node: player_badges;
}

export interface player_badgesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_badgesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_counters {
  nodeId: string;
  id: string;
  player_id: string;
  scope: counter_scope;
  season_id?: string;
  game_window?: any;
  pts_total: number;
  ast_total: number;
  reb_total: number;
  stl_total: number;
  blk_total: number;
  tov_total: number;
  fgm_total: number;
  fga_total: number;
  ftm_total: number;
  fta_total: number;
  tpm_total: number;
  tpa_total: number;
  games_played: number;
  has_50pt_game: boolean;
  has_triple_double: boolean;
  created_at: any;
  updated_at: any;
  players?: players;
  league_seasons?: league_seasons;
}

export interface player_countersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_countersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_countersEdge {
  cursor: string;
  node: player_counters;
}

export interface player_countersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_countersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_handles {
  nodeId: string;
  id: string;
  player_id: string;
  primary_gt?: string;
  alt_gt?: string;
  game_year?: game_year;
  season_id?: string;
  tournament_id?: string;
  valid_from?: Date;
  valid_to?: Date;
  verified_at?: any;
  created_at: any;
  players?: players;
  league_seasons?: league_seasons;
  tournaments?: tournaments;
}

export interface player_handlesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_handlesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_handlesEdge {
  cursor: string;
  node: player_handles;
}

export interface player_handlesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_handlesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_rating_weights {
  nodeId: string;
  id: string;
  event_tier: event_tier;
  weight_multiplier: string;
  bonus_points: number;
  description?: string;
  created_at?: any;
}

export interface player_rating_weightsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_rating_weightsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_rating_weightsEdge {
  cursor: string;
  node: player_rating_weights;
}

export interface player_rating_weightsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_rating_weightsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_rp_transactions {
  nodeId: string;
  id: string;
  player_id?: string;
  match_id?: string;
  amount: number;
  description: string;
  type: string;
  created_at: any;
  updated_at: any;
  league_id?: string;
  tournament_id?: string;
  leagues_info?: leagues_info;
  matches?: matches;
  players?: players;
  tournaments?: tournaments;
}

export interface player_rp_transactionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_rp_transactionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_rp_transactionsEdge {
  cursor: string;
  node: player_rp_transactions;
}

export interface player_rp_transactionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_rp_transactionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_salary_tiers {
  nodeId: string;
  id: number;
  tier_name: string;
  min_value?: string;
  max_value?: string;
  multiplier: string;
}

export interface player_salary_tiersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_salary_tiersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_salary_tiersEdge {
  cursor: string;
  node: player_salary_tiers;
}

export interface player_salary_tiersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_salary_tiersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_stats {
  nodeId: string;
  id: string;
  player_id?: string;
  match_id: string;
  team_id?: string;
  points?: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
  ps?: number;
  created_at?: any;
  fgm?: number;
  fga?: number;
  three_points_made?: number;
  three_points_attempted?: number;
  ftm?: number;
  fta?: number;
  plus_minus?: number;
  player_name?: string;
  updated_at?: any;
  display_gt?: string;
  display_gt_resolved_at?: any;
  slot_index?: number;
  grd?: string;
  needs_review?: boolean;
  verified: boolean;
  matches?: matches;
  players?: players;
  teams?: teams;
  event_queue?: event_queue;
  ocr_correctionsCollection?: ocr_correctionsConnection;
  ocr_validationsCollection?: ocr_validationsConnection;
}

export interface player_statsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_statsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_statsEdge {
  cursor: string;
  node: player_stats;
}

export interface player_statsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_statsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface player_stats_submissions {
  nodeId: string;
  id: string;
  player_id?: string;
  match_id: string;
  team_id: string;
  points?: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
  ps?: number;
  created_at?: any;
  fgm?: number;
  fga?: number;
  three_points_made?: number;
  three_points_attempted?: number;
  ftm?: number;
  fta?: number;
  plus_minus?: number;
  player_name?: string;
  updated_at?: any;
  display_gt?: string;
  display_gt_resolved_at?: any;
}

export interface player_stats_submissionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface player_stats_submissionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface player_stats_submissionsEdge {
  cursor: string;
  node: player_stats_submissions;
}

export interface player_stats_submissionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface player_stats_submissionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface players {
  nodeId: string;
  id: string;
  gamertag: string;
  position?: player_position;
  current_team_id?: string;
  performance_score?: number;
  player_rp?: number;
  player_rank_score?: number;
  salary_tier?: salary_tier;
  monthly_value?: number;
  created_at?: any;
  is_rookie?: boolean;
  discord_id?: string;
  twitter_id?: string;
  alternate_gamertag?: string;
  crew_affiliation?: string;
  crewName?: string;
  currentTeamName?: string;
  twitch?: string;
  discord_id_no?: string;
  city_crews?: city_crews;
  teams?: teams;
  awards_raceCollection?: awards_raceConnection;
  city_crewsCollection?: city_crewsConnection;
  college_studentsCollection?: college_studentsConnection;
  draft_pool?: draft_pool;
  match_mvpCollection?: match_mvpConnection;
  ocr_correctionsCollection?: ocr_correctionsConnection;
  player_awardsCollection?: player_awardsConnection;
  player_countersCollection?: player_countersConnection;
  player_handlesCollection?: player_handlesConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  player_statsCollection?: player_statsConnection;
  team_rostersCollection?: team_rostersConnection;
  match_queue_slotsCollection?: match_queue_slotsConnection;
  team_match_queue_slotsCollection?: team_match_queue_slotsConnection;
  team_match_queue_lineup_playersCollection?: team_match_queue_lineup_playersConnection;
  match_snapshotsCollection?: match_snapshotsConnection;
  match_team_lineup_playersCollection?: match_team_lineup_playersConnection;
}

export interface playersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface playersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface playersEdge {
  cursor: string;
  node: players;
}

export interface playersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface playersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface playlist {
  nodeId: string;
  id: string;
  stream_url?: string;
  game_year?: game_year;
  tournament_id?: string;
  league_id?: string;
  season_id?: string;
  team_a_id?: string;
  team_b_id?: string;
  winner_id?: string;
  game_no?: number;
  created_at: any;
  stage?: stage;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  teams?: teams;
  tournaments?: tournaments;
}

export interface playlistConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface playlistDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface playlistEdge {
  cursor: string;
  node: playlist;
}

export interface playlistInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface playlistUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface profiles {
  nodeId: string;
  id: string;
  email?: string;
  role: string;
  created_at?: any;
  updated_at?: any;
  app_role?: app_role;
  match_contextsCollection?: match_contextsConnection;
}

export interface profilesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface profilesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface profilesEdge {
  cursor: string;
  node: profiles;
}

export interface profilesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface profilesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface r2_lg_folders {
  nodeId: string;
  id: string;
  leagues?: leagues;
  season_id: string;
  folder_path: string;
  r2_url_text: string;
  last_synced?: any;
  is_active?: boolean;
  game_yr: game_year;
  created_at: any;
  league_seasons?: league_seasons;
}

export interface r2_lg_foldersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface r2_lg_foldersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface r2_lg_foldersEdge {
  cursor: string;
  node: r2_lg_folders;
}

export interface r2_lg_foldersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface r2_lg_foldersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface ranking_points {
  nodeId: string;
  id: string;
  team_id?: string;
  source?: string;
  points?: number;
  awarded_at?: Date;
  expires_at?: Date;
  league_id?: string;
  tournament_id?: string;
  leagues_info?: leagues_info;
  teams?: teams;
  tournaments?: tournaments;
}

export interface ranking_pointsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface ranking_pointsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface ranking_pointsEdge {
  cursor: string;
  node: ranking_points;
}

export interface ranking_pointsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface ranking_pointsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface regions {
  nodeId: string;
  id: string;
  name: string;
  city_crewsCollection?: city_crewsConnection;
}

export interface regionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface regionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface regionsEdge {
  cursor: string;
  node: regions;
}

export interface regionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface regionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface role_permissions {
  nodeId: string;
  id: string;
  permission: string;
  role?: app_role;
}

export interface role_permissionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface role_permissionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface role_permissionsEdge {
  cursor: string;
  node: role_permissions;
}

export interface role_permissionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface role_permissionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface rp_transactions {
  nodeId: string;
  id: string;
  team_id?: string;
  amount: number;
  description?: string;
  type: string;
  created_at: any;
  updated_at: any;
  league_id?: string;
  tournament_id?: string;
  rp_decay_start?: number;
  remaining_rp?: number;
  last_decay_date?: Date;
  season_id?: string;
  game_year?: game_year;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  teams?: teams;
  tournaments?: tournaments;
}

export interface rp_transactionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface rp_transactionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface rp_transactionsEdge {
  cursor: string;
  node: rp_transactions;
}

export interface rp_transactionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface rp_transactionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface salary_tiers {
  nodeId: string;
  id: string;
  salary_tier: salary_tier;
  label?: string;
  multiplier: string;
  min_rating?: number;
  max_rating?: number;
  description?: string;
}

export interface salary_tiersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface salary_tiersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface salary_tiersEdge {
  cursor: string;
  node: salary_tiers;
}

export interface salary_tiersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface salary_tiersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface series_formats {
  nodeId: string;
  id: string;
  season_id: string;
  stage: string;
  series_format: string;
  created_at?: any;
  tournament_type?: string;
}

export interface series_formatsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface series_formatsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface series_formatsEdge {
  cursor: string;
  node: series_formats;
}

export interface series_formatsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface series_formatsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface sponsor_info {
  nodeId: string;
  id: string;
  sponsor_logo?: string;
  sponsor_name?: string;
  sponsor_url?: string;
  created_at: any;
  leagues_infoCollection?: leagues_infoConnection;
  tournamentsCollection?: tournamentsConnection;
}

export interface sponsor_infoConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface sponsor_infoDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface sponsor_infoEdge {
  cursor: string;
  node: sponsor_info;
}

export interface sponsor_infoInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface sponsor_infoUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_lineup_players {
  nodeId: string;
  id: string;
  slot_id: string;
  player_id: string;
  position?: string;
  source?: roster_source_type;
  added_by?: string;
  added_at: any;
  team_match_queue_slots?: team_match_queue_slots;
  players?: players;
}

export interface team_match_queue_lineup_playersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface team_match_queue_lineup_playersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_lineup_playersEdge {
  cursor: string;
  node: team_match_queue_lineup_players;
}

export interface team_match_queue_lineup_playersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_lineup_playersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_sessions {
  nodeId: string;
  id: string;
  guild_id: string;
  channel_id: string;
  message_id?: string;
  status: string;
  created_at: any;
  matched_at?: any;
  cancelled_at?: any;
  cancelled_by?: string;
  team_match_queue_slotsCollection?: team_match_queue_slotsConnection;
}

export interface team_match_queue_sessionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface team_match_queue_sessionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_sessionsEdge {
  cursor: string;
  node: team_match_queue_sessions;
}

export interface team_match_queue_sessionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_sessionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_slots {
  nodeId: string;
  id: string;
  session_id: string;
  team_id: string;
  captain_player_id?: string;
  captain_discord_id: string;
  status: team_queue_slot_status;
  selected_league_id?: string;
  selected_season_id?: string;
  elo_snapshot?: string;
  rp_snapshot?: string;
  roster_source?: roster_source_type;
  created_at: any;
  ready_at?: any;
  left_at?: any;
  team_match_queue_sessions?: team_match_queue_sessions;
  teams?: teams;
  players?: players;
  team_match_queue_lineup_playersCollection?: team_match_queue_lineup_playersConnection;
  match_snapshotsCollection?: match_snapshotsConnection;
}

export interface team_match_queue_slotsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface team_match_queue_slotsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_slotsEdge {
  cursor: string;
  node: team_match_queue_slots;
}

export interface team_match_queue_slotsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_queue_slotsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_stats {
  nodeId: string;
  id: string;
  match_id: string;
  team_id: string;
  points?: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  field_goals_made?: number;
  field_goals_attempted?: number;
  three_points_made?: number;
  three_points_attempted?: number;
  free_throws_made?: number;
  free_throws_attempted?: number;
  fouls?: number;
  plus_minus?: number;
  grd?: string;
  verified: boolean;
  matches?: matches;
  teams?: teams;
}

export interface team_match_statsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface team_match_statsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_statsEdge {
  cursor: string;
  node: team_match_stats;
}

export interface team_match_statsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_statsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_stats_submissions {
  nodeId: string;
  id: string;
  match_id: string;
  team_id: string;
  points?: number;
  rebounds?: number;
  assists?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  field_goals_made?: number;
  field_goals_attempted?: number;
  three_points_made?: number;
  three_points_attempted?: number;
  free_throws_made?: number;
  free_throws_attempted?: number;
  fouls?: number;
  plus_minus?: number;
}

export interface team_match_stats_submissionsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface team_match_stats_submissionsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_stats_submissionsEdge {
  cursor: string;
  node: team_match_stats_submissions;
}

export interface team_match_stats_submissionsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface team_match_stats_submissionsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface team_rosters {
  nodeId: string;
  id: string;
  team_id?: string;
  player_id?: string;
  is_captain?: boolean;
  is_player_coach?: boolean;
  joined_at?: any;
  left_at?: any;
  league_id?: string;
  tournament_id?: string;
  game_year?: game_year;
  season_id?: string;
  division_id?: string;
  lg_divisions?: lg_divisions;
  leagues_info?: leagues_info;
  players?: players;
  league_seasons?: league_seasons;
  teams?: teams;
  tournaments?: tournaments;
}

export interface team_rostersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface team_rostersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface team_rostersEdge {
  cursor: string;
  node: team_rosters;
}

export interface team_rostersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface team_rostersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface teams {
  nodeId: string;
  id: string;
  name: string;
  logo_url?: string;
  current_rp?: number;
  elo_rating?: number;
  global_rank?: number;
  leaderboard_tier?: string;
  created_at?: any;
  player_rank_score?: number;
  money_won?: number;
  lg_conf?: string;
  is_active?: boolean;
  team_twitter?: string;
  hybrid_score?: number;
  lg_division?: string;
  lg_divisions?: lg_divisions;
  awards_raceCollection?: awards_raceConnection;
  tournament_group_membersCollection?: tournament_group_membersConnection;
  event_resultsCollection?: event_resultsConnection;
  group_standingsCollection?: group_standingsConnection;
  league_openCollection?: league_openConnection;
  league_playoffCollection?: league_playoffConnection;
  match_pointsCollection?: match_pointsConnection;
  match_submissionsCollection?: match_submissionsConnection;
  matchesCollection?: matchesConnection;
  past_championsCollection?: past_championsConnection;
  player_statsCollection?: player_statsConnection;
  playersCollection?: playersConnection;
  playlistCollection?: playlistConnection;
  ranking_pointsCollection?: ranking_pointsConnection;
  rp_transactionsCollection?: rp_transactionsConnection;
  team_match_statsCollection?: team_match_statsConnection;
  team_rostersCollection?: team_rostersConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  tournamentsCollection?: tournamentsConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
  ocr_accuracy_mismatchesCollection?: ocr_accuracy_mismatchesConnection;
  match_reportsCollection?: match_reportsConnection;
  team_match_queue_slotsCollection?: team_match_queue_slotsConnection;
  match_snapshotsCollection?: match_snapshotsConnection;
  match_team_lineupsCollection?: match_team_lineupsConnection;
}

export interface teamsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface teamsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface teamsEdge {
  cursor: string;
  node: teams;
}

export interface teamsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface teamsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface teams_pot_tracker {
  nodeId: string;
  id: string;
  team_id?: string;
  placement?: number;
  prize_amount?: number;
  created_at: any;
  league_id?: string;
  tournament_id?: string;
  season_id?: string;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  teams?: teams;
  tournaments?: tournaments;
}

export interface teams_pot_trackerConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface teams_pot_trackerDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface teams_pot_trackerEdge {
  cursor: string;
  node: teams_pot_tracker;
}

export interface teams_pot_trackerInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface teams_pot_trackerUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface tournament_group_members {
  nodeId: string;
  id: string;
  group_id: string;
  team_id: string;
  seed?: number;
  created_at?: any;
  tournament_groups?: tournament_groups;
  teams?: teams;
}

export interface tournament_group_membersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface tournament_group_membersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface tournament_group_membersEdge {
  cursor: string;
  node: tournament_group_members;
}

export interface tournament_group_membersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface tournament_group_membersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface tournament_groups {
  nodeId: string;
  id: string;
  name: string;
  description?: string;
  max_teams?: number;
  created_at?: any;
  updated_at?: any;
  status?: string;
  advancement_count?: number;
  sort_order?: number;
  tournament_id?: string;
  league_season_id?: string;
  league_seasons?: league_seasons;
  tournaments?: tournaments;
  tournament_group_membersCollection?: tournament_group_membersConnection;
  group_matchesCollection?: group_matchesConnection;
  group_standingsCollection?: group_standingsConnection;
  match_pointsCollection?: match_pointsConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
}

export interface tournament_groupsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface tournament_groupsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface tournament_groupsEdge {
  cursor: string;
  node: tournament_groups;
}

export interface tournament_groupsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface tournament_groupsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface tournaments {
  nodeId: string;
  id: string;
  name?: string;
  organizer_id?: string;
  sponsor?: string;
  start_date?: Date;
  end_date?: Date;
  prize_pool?: string;
  runner_up?: string;
  place?: string;
  organizer_logo_url?: string;
  game_year?: game_year;
  console?: console;
  created_at: any;
  banner_url?: string;
  rules_url?: string;
  status?: status;
  tier?: event_tier;
  max_rp?: number;
  description?: string;
  decay_days?: number;
  champion?: string;
  sponsor_logo?: string;
  processed_at?: any;
  teams?: teams;
  leagues_info?: leagues_info;
  sponsor_info?: sponsor_info;
  awards_raceCollection?: awards_raceConnection;
  draft_poolCollection?: draft_poolConnection;
  tournament_groupsCollection?: tournament_groupsConnection;
  event_resultsCollection?: event_resultsConnection;
  match_contextsCollection?: match_contextsConnection;
  match_submissionsCollection?: match_submissionsConnection;
  matchesCollection?: matchesConnection;
  past_championsCollection?: past_championsConnection;
  player_badgesCollection?: player_badgesConnection;
  player_handlesCollection?: player_handlesConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  playlistCollection?: playlistConnection;
  ranking_pointsCollection?: ranking_pointsConnection;
  rp_transactionsCollection?: rp_transactionsConnection;
  team_rostersCollection?: team_rostersConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
}

export interface tournamentsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface tournamentsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface tournamentsEdge {
  cursor: string;
  node: tournaments;
}

export interface tournamentsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface tournamentsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface upcoming_matches {
  nodeId: string;
  id: string;
  team_a_id?: string;
  team_b_id?: string;
  scheduled_at: any;
  stream_url?: string;
  notes?: string;
  status?: string;
  created_at?: any;
  updated_at?: any;
  group_id?: string;
  round?: number;
  match_number?: number;
  league_id?: string;
  tournament_id?: string;
  season_id?: string;
  stage?: stage;
  tournament_groups?: tournament_groups;
  leagues_info?: leagues_info;
  league_seasons?: league_seasons;
  teams?: teams;
  tournaments?: tournaments;
}

export interface upcoming_matchesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface upcoming_matchesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface upcoming_matchesEdge {
  cursor: string;
  node: upcoming_matches;
}

export interface upcoming_matchesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface upcoming_matchesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface update_race {
  nodeId: string;
  id: string;
  race_id?: string;
  update_type: string;
  update_details?: any;
  previous_rank?: number;
  new_rank?: number;
  updated_at: any;
  updated_by?: string;
  awards_race?: awards_race;
}

export interface update_raceConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface update_raceDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface update_raceEdge {
  cursor: string;
  node: update_race;
}

export interface update_raceInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface update_raceUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface user_roles {
  nodeId: string;
  id: string;
  user_id: string;
  created_at: any;
  role?: app_role;
  role_name?: string;
}

export interface user_rolesConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface user_rolesDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface user_rolesEdge {
  cursor: string;
  node: user_roles;
}

export interface user_rolesInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface user_rolesUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface webhook_config {
  nodeId: string;
  key: string;
  value: string;
  created_at?: any;
  updated_at?: any;
}

export interface webhook_configConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface webhook_configDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface webhook_configEdge {
  cursor: string;
  node: webhook_config;
}

export interface webhook_configInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface webhook_configUpdateResponse {
  affectedCount: number;
  records: any[];
}

