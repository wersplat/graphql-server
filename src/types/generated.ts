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

export enum event_tier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4'
}

export enum event_type {
  LEAGUE = 'League',
  TOURNAMENT = 'Tournament'
}

export enum leagues {
  UPA = 'UPA',
  UPA_COLLEGE = 'UPA College',
  WR = 'WR',
  MPBA = 'MPBA',
  RISING_STARS = 'Rising Stars',
  STATEN_ISLAND_BASKETBALL_ASSOCIATION = 'Staten Island Basketball Association',
  HALL_OF_FAME_LEAGUE = 'Hall Of Fame League',
  DUNK_LEAGUE = 'Dunk League',
  ROAD_TO_25K = 'Road to 25K'
}

export enum player_position {
  POINT_GUARD = 'Point Guard',
  SHOOTING_GUARD = 'Shooting Guard',
  LOCK = 'Lock',
  POWER_FORWARD = 'Power Forward',
  CENTER = 'Center'
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
  WF = 'WF'
}

export interface Mutation {
  add_player_to_team_roster?: any;
  adjust_team_rp?: any;
  apply_rp_decay?: any;
  assign_role?: boolean;
  calculate_defensive_mvp_score?: number;
  calculate_hybrid_score?: string;
  calculate_normalized_elo?: string;
  calculate_normalized_rp?: string;
  calculate_offensive_mvp_score?: number;
  calculate_rookie_score?: number;
  calculate_team_total_money_won?: number;
  complete_upcoming_match?: string;
  deleteFromawards_raceCollection: awards_raceDeleteResponse;
  deleteFromdraft_poolCollection: draft_poolDeleteResponse;
  deleteFromevent_group_membersCollection: event_group_membersDeleteResponse;
  deleteFromevent_groupsCollection: event_groupsDeleteResponse;
  deleteFromevent_resultsCollection: event_resultsDeleteResponse;
  deleteFromeventsCollection: eventsDeleteResponse;
  deleteFromgroup_matchesCollection: group_matchesDeleteResponse;
  deleteFromgroup_standingsCollection: group_standingsDeleteResponse;
  deleteFromkv_store_10f5458bCollection: kv_store_10f5458bDeleteResponse;
  deleteFromleague_seasonsCollection: league_seasonsDeleteResponse;
  deleteFrommatch_mvpCollection: match_mvpDeleteResponse;
  deleteFrommatch_pointsCollection: match_pointsDeleteResponse;
  deleteFrommatch_submissionsCollection: match_submissionsDeleteResponse;
  deleteFrommatchesCollection: matchesDeleteResponse;
  deleteFromnotificationsCollection: notificationsDeleteResponse;
  deleteFromplayer_rp_transactionsCollection: player_rp_transactionsDeleteResponse;
  deleteFromplayer_salary_tiersCollection: player_salary_tiersDeleteResponse;
  deleteFromplayer_statsCollection: player_statsDeleteResponse;
  deleteFromplayersCollection: playersDeleteResponse;
  deleteFromprofilesCollection: profilesDeleteResponse;
  deleteFromranking_pointsCollection: ranking_pointsDeleteResponse;
  deleteFromregionsCollection: regionsDeleteResponse;
  deleteFromrole_permissionsCollection: role_permissionsDeleteResponse;
  deleteFromrp_transactionsCollection: rp_transactionsDeleteResponse;
  deleteFromsalary_tiersCollection: salary_tiersDeleteResponse;
  deleteFromteam_match_statsCollection: team_match_statsDeleteResponse;
  deleteFromteam_rostersCollection: team_rostersDeleteResponse;
  deleteFromteamsCollection: teamsDeleteResponse;
  deleteFromteams_pot_trackerCollection: teams_pot_trackerDeleteResponse;
  deleteFromupcoming_matchesCollection: upcoming_matchesDeleteResponse;
  deleteFromupdate_raceCollection: update_raceDeleteResponse;
  deleteFromuser_rolesCollection: user_rolesDeleteResponse;
  generate_bracket_matches?: any;
  generate_group_matches?: any;
  has_permission?: boolean;
  has_role?: boolean;
  initialize_new_season?: any;
  initialize_user_roles?: any;
  insertIntoawards_raceCollection?: awards_raceInsertResponse;
  insertIntodraft_poolCollection?: draft_poolInsertResponse;
  insertIntoevent_group_membersCollection?: event_group_membersInsertResponse;
  insertIntoevent_groupsCollection?: event_groupsInsertResponse;
  insertIntoevent_resultsCollection?: event_resultsInsertResponse;
  insertIntoeventsCollection?: eventsInsertResponse;
  insertIntogroup_matchesCollection?: group_matchesInsertResponse;
  insertIntogroup_standingsCollection?: group_standingsInsertResponse;
  insertIntokv_store_10f5458bCollection?: kv_store_10f5458bInsertResponse;
  insertIntoleague_seasonsCollection?: league_seasonsInsertResponse;
  insertIntomatch_mvpCollection?: match_mvpInsertResponse;
  insertIntomatch_pointsCollection?: match_pointsInsertResponse;
  insertIntomatch_submissionsCollection?: match_submissionsInsertResponse;
  insertIntomatchesCollection?: matchesInsertResponse;
  insertIntonotificationsCollection?: notificationsInsertResponse;
  insertIntoplayer_rp_transactionsCollection?: player_rp_transactionsInsertResponse;
  insertIntoplayer_salary_tiersCollection?: player_salary_tiersInsertResponse;
  insertIntoplayer_statsCollection?: player_statsInsertResponse;
  insertIntoplayersCollection?: playersInsertResponse;
  insertIntoprofilesCollection?: profilesInsertResponse;
  insertIntoranking_pointsCollection?: ranking_pointsInsertResponse;
  insertIntoregionsCollection?: regionsInsertResponse;
  insertIntorole_permissionsCollection?: role_permissionsInsertResponse;
  insertIntorp_transactionsCollection?: rp_transactionsInsertResponse;
  insertIntosalary_tiersCollection?: salary_tiersInsertResponse;
  insertIntoteam_match_statsCollection?: team_match_statsInsertResponse;
  insertIntoteam_rostersCollection?: team_rostersInsertResponse;
  insertIntoteamsCollection?: teamsInsertResponse;
  insertIntoteams_pot_trackerCollection?: teams_pot_trackerInsertResponse;
  insertIntoupcoming_matchesCollection?: upcoming_matchesInsertResponse;
  insertIntoupdate_raceCollection?: update_raceInsertResponse;
  insertIntouser_rolesCollection?: user_rolesInsertResponse;
  is_league_admin?: boolean;
  promote_to_league_admin?: boolean;
  recalculate_all_rankings?: any;
  record_match_forfeit?: any;
  remove_role?: boolean;
  schedule_rp_decay?: any;
  select_award_winner?: any;
  sync_user_roles_for_user?: any;
  update_all_teams_money_won?: any;
  update_awards_race?: any;
  update_elo_after_match?: any;
  update_existing_draft_pool_records?: any;
  update_player_ps?: any;
  update_player_rank_score?: any;
  update_player_rankings?: any;
  update_team_money_won?: any;
  update_team_rankings?: any;
  update_user_claims?: boolean;
  updateawards_raceCollection: awards_raceUpdateResponse;
  updatedraft_poolCollection: draft_poolUpdateResponse;
  updateevent_group_membersCollection: event_group_membersUpdateResponse;
  updateevent_groupsCollection: event_groupsUpdateResponse;
  updateevent_resultsCollection: event_resultsUpdateResponse;
  updateeventsCollection: eventsUpdateResponse;
  updategroup_matchesCollection: group_matchesUpdateResponse;
  updategroup_standingsCollection: group_standingsUpdateResponse;
  updatekv_store_10f5458bCollection: kv_store_10f5458bUpdateResponse;
  updateleague_seasonsCollection: league_seasonsUpdateResponse;
  updatematch_mvpCollection: match_mvpUpdateResponse;
  updatematch_pointsCollection: match_pointsUpdateResponse;
  updatematch_submissionsCollection: match_submissionsUpdateResponse;
  updatematchesCollection: matchesUpdateResponse;
  updatenotificationsCollection: notificationsUpdateResponse;
  updateplayer_rp_transactionsCollection: player_rp_transactionsUpdateResponse;
  updateplayer_salary_tiersCollection: player_salary_tiersUpdateResponse;
  updateplayer_statsCollection: player_statsUpdateResponse;
  updateplayersCollection: playersUpdateResponse;
  updateprofilesCollection: profilesUpdateResponse;
  updateranking_pointsCollection: ranking_pointsUpdateResponse;
  updateregionsCollection: regionsUpdateResponse;
  updaterole_permissionsCollection: role_permissionsUpdateResponse;
  updaterp_transactionsCollection: rp_transactionsUpdateResponse;
  updatesalary_tiersCollection: salary_tiersUpdateResponse;
  updateteam_match_statsCollection: team_match_statsUpdateResponse;
  updateteam_rostersCollection: team_rostersUpdateResponse;
  updateteamsCollection: teamsUpdateResponse;
  updateteams_pot_trackerCollection: teams_pot_trackerUpdateResponse;
  updateupcoming_matchesCollection: upcoming_matchesUpdateResponse;
  updateupdate_raceCollection: update_raceUpdateResponse;
  updateuser_rolesCollection: user_rolesUpdateResponse;
}

export interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
}

export interface Query {
  awards_raceCollection?: awards_raceConnection;
  custom_jwt?: any;
  draft_poolCollection?: draft_poolConnection;
  event_group_membersCollection?: event_group_membersConnection;
  event_groupsCollection?: event_groupsConnection;
  event_resultsCollection?: event_resultsConnection;
  eventsCollection?: eventsConnection;
  group_matchesCollection?: group_matchesConnection;
  group_standingsCollection?: group_standingsConnection;
  kv_store_10f5458bCollection?: kv_store_10f5458bConnection;
  league_seasonsCollection?: league_seasonsConnection;
  match_mvpCollection?: match_mvpConnection;
  match_pointsCollection?: match_pointsConnection;
  match_submissionsCollection?: match_submissionsConnection;
  matchesCollection?: matchesConnection;
  node?: Node;
  notificationsCollection?: notificationsConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  player_salary_tiersCollection?: player_salary_tiersConnection;
  player_statsCollection?: player_statsConnection;
  playersCollection?: playersConnection;
  profilesCollection?: profilesConnection;
  ranking_pointsCollection?: ranking_pointsConnection;
  regionsCollection?: regionsConnection;
  role_permissionsCollection?: role_permissionsConnection;
  rp_transactionsCollection?: rp_transactionsConnection;
  salary_tiersCollection?: salary_tiersConnection;
  team_match_statsCollection?: team_match_statsConnection;
  team_rostersCollection?: team_rostersConnection;
  teamsCollection?: teamsConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
  update_raceCollection?: update_raceConnection;
  user_rolesCollection?: user_rolesConnection;
}

export interface awards_race {
  nodeId: string;
  id: string;
  event_id?: string;
  team_id: string;
  player_id?: string;
  award_type?: award_types;
  rank?: number;
  rp_bonus?: string;
  award_winner?: boolean;
  created_at: any;
  players?: players;
  teams?: teams;
  events?: events;
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

export interface draft_pool {
  nodeId: string;
  player_id: string;
  declared_at?: any;
  status?: string;
  season?: string;
  draft_rating?: number;
  draft_notes?: string;
  event_id?: string;
  created_at?: any;
  updated_at?: any;
  events?: events;
  players?: players;
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

export interface event_group_members {
  nodeId: string;
  id: string;
  group_id: string;
  team_id: string;
  seed?: number;
  created_at?: any;
  event_groups?: event_groups;
  teams?: teams;
}

export interface event_group_membersConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface event_group_membersDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface event_group_membersEdge {
  cursor: string;
  node: event_group_members;
}

export interface event_group_membersInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface event_group_membersUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface event_groups {
  nodeId: string;
  id: string;
  event_id: string;
  name: string;
  description?: string;
  max_teams?: number;
  created_at?: any;
  updated_at?: any;
  status?: string;
  advancement_count?: number;
  sort_order?: number;
  events?: events;
  event_group_membersCollection?: event_group_membersConnection;
  group_matchesCollection?: group_matchesConnection;
  group_standingsCollection?: group_standingsConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
  match_pointsCollection?: match_pointsConnection;
}

export interface event_groupsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface event_groupsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface event_groupsEdge {
  cursor: string;
  node: event_groups;
}

export interface event_groupsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface event_groupsUpdateResponse {
  affectedCount: number;
  records: any[];
}

export interface event_results {
  nodeId: string;
  id: string;
  event_id: string;
  team_id: string;
  placement?: number;
  rp_awarded?: number;
  bonus_rp?: number;
  total_rp?: number;
  awarded_at?: Date;
  prize_amount?: number;
  winner_banner_url?: string;
  events?: events;
  teams?: teams;
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

export interface events {
  nodeId: string;
  id: string;
  name: string;
  type?: string;
  is_global?: boolean;
  region_id?: string;
  start_date?: Date;
  end_date?: Date;
  max_rp?: number;
  decay_days?: number;
  processed?: boolean;
  description?: string;
  banner_url?: string;
  rules_url?: string;
  processed_at?: any;
  status?: string;
  tier?: event_tier;
  season_number?: number;
  prize_pool?: number;
  regions?: regions;
  draft_poolCollection?: draft_poolConnection;
  event_resultsCollection?: event_resultsConnection;
  matchesCollection?: matchesConnection;
  ranking_pointsCollection?: ranking_pointsConnection;
  rp_transactionsCollection?: rp_transactionsConnection;
  team_rostersCollection?: team_rostersConnection;
  event_groupsCollection?: event_groupsConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  awards_raceCollection?: awards_raceConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  league_seasonsCollection?: league_seasonsConnection;
  match_submissionsCollection?: match_submissionsConnection;
}

export interface eventsConnection {
  edges: any[];
  pageInfo: PageInfo;
}

export interface eventsDeleteResponse {
  affectedCount: number;
  records: any[];
}

export interface eventsEdge {
  cursor: string;
  node: events;
}

export interface eventsInsertResponse {
  affectedCount: number;
  records: any[];
}

export interface eventsUpdateResponse {
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
  event_groups?: event_groups;
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
  event_groups?: event_groups;
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

export interface league_seasons {
  nodeId: string;
  id: string;
  league_name: leagues;
  season_number: number;
  start_date: any;
  end_date: any;
  is_active?: boolean;
  created_at: any;
  updated_at: any;
  event?: string;
  events?: events;
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
  matches?: matches;
  teams?: teams;
  event_groups?: event_groups;
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

export interface match_submissions {
  nodeId: string;
  id: string;
  event_id?: string;
  match_id?: string;
  team_a_id?: string;
  team_a_name?: string;
  team_b_id?: string;
  team_b_name?: string;
  review_status?: string;
  reviewed_by?: string;
  reviewed_at?: any;
  created_at: any;
  events?: events;
  matches?: matches;
  teams?: teams;
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

export interface matches {
  nodeId: string;
  id: string;
  event_id: string;
  team_a_id?: string;
  team_b_id?: string;
  winner_id?: string;
  score_a?: number;
  score_b?: number;
  played_at?: any;
  boxscore_url?: string;
  team_a_name?: string;
  stage?: stage;
  game_number?: number;
  team_b_name?: string;
  winner_name?: string;
  events?: events;
  teams?: teams;
  player_statsCollection?: player_statsConnection;
  team_match_statsCollection?: team_match_statsConnection;
  match_mvp?: match_mvp;
  group_matchesCollection?: group_matchesConnection;
  match_pointsCollection?: match_pointsConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  match_submissionsCollection?: match_submissionsConnection;
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
  message: string;
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

export interface player_rp_transactions {
  nodeId: string;
  id: string;
  player_id?: string;
  event_id?: string;
  match_id?: string;
  amount: number;
  description: string;
  type: string;
  created_at: any;
  updated_at: any;
  players?: players;
  events?: events;
  matches?: matches;
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
  player_id: string;
  match_id: string;
  team_id: string;
  points?: number;
  assists?: number;
  rebounds?: number;
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
  matches?: matches;
  players?: players;
  teams?: teams;
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

export interface players {
  nodeId: string;
  id: string;
  gamertag: string;
  position?: player_position;
  region_id?: string;
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
  teams?: teams;
  regions?: regions;
  draft_pool?: draft_pool;
  player_statsCollection?: player_statsConnection;
  team_rostersCollection?: team_rostersConnection;
  match_mvpCollection?: match_mvpConnection;
  player_rp_transactionsCollection?: player_rp_transactionsConnection;
  awards_raceCollection?: awards_raceConnection;
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

export interface profiles {
  nodeId: string;
  id: string;
  email?: string;
  role: string;
  created_at?: any;
  updated_at?: any;
  app_role?: app_role;
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

export interface ranking_points {
  nodeId: string;
  id: string;
  team_id?: string;
  source?: string;
  event_id?: string;
  points?: number;
  awarded_at?: Date;
  expires_at?: Date;
  events?: events;
  teams?: teams;
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
  eventsCollection?: eventsConnection;
  playersCollection?: playersConnection;
  teamsCollection?: teamsConnection;
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
  event_id?: string;
  amount: number;
  description: string;
  type: string;
  created_at: any;
  updated_at: any;
  events?: events;
  teams?: teams;
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

export interface team_match_stats {
  nodeId: string;
  id: string;
  match_id: string;
  team_id: string;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  field_goals_made: number;
  field_goals_attempted: number;
  three_points_made: number;
  three_points_attempted: number;
  free_throws_made: number;
  free_throws_attempted: number;
  fouls?: number;
  plus_minus?: number;
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

export interface team_rosters {
  nodeId: string;
  id: string;
  team_id?: string;
  player_id?: string;
  is_captain?: boolean;
  is_player_coach?: boolean;
  joined_at?: any;
  left_at?: any;
  event_id?: string;
  events?: events;
  players?: players;
  teams?: teams;
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
  region_id?: string;
  current_rp?: number;
  elo_rating?: number;
  global_rank?: number;
  leaderboard_tier?: string;
  created_at?: any;
  player_rank_score?: number;
  money_won?: number;
  regions?: regions;
  event_resultsCollection?: event_resultsConnection;
  matchesCollection?: matchesConnection;
  player_statsCollection?: player_statsConnection;
  playersCollection?: playersConnection;
  ranking_pointsCollection?: ranking_pointsConnection;
  rp_transactionsCollection?: rp_transactionsConnection;
  team_rostersCollection?: team_rostersConnection;
  team_match_statsCollection?: team_match_statsConnection;
  event_group_membersCollection?: event_group_membersConnection;
  group_standingsCollection?: group_standingsConnection;
  upcoming_matchesCollection?: upcoming_matchesConnection;
  match_pointsCollection?: match_pointsConnection;
  awards_raceCollection?: awards_raceConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  match_submissionsCollection?: match_submissionsConnection;
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
  event_id?: string;
  team_id?: string;
  placement?: number;
  prize_amount?: number;
  created_at: any;
  events?: events;
  teams?: teams;
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

export interface upcoming_matches {
  nodeId: string;
  id: string;
  event_id: string;
  team_a_id?: string;
  team_b_id?: string;
  scheduled_at: any;
  venue?: string;
  stream_url?: string;
  notes?: string;
  status?: string;
  created_at?: any;
  updated_at?: any;
  group_id?: string;
  round?: number;
  match_number?: number;
  team_a_logo?: string;
  team_b_logo?: string;
  events?: events;
  teams?: teams;
  event_groups?: event_groups;
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

