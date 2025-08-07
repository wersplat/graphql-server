// Auto-generated TypeScript types from GraphQL introspection
// Generated on: 2025-08-07T07:29:37.102Z

export enum FilterIs {
  NULL = 'NULL',
  NOT_NULL = 'NOT_NULL',
}

export enum OrderByDirection {
  ASCNULLSFIRST = 'AscNullsFirst',
  ASCNULLSLAST = 'AscNullsLast',
  DESCNULLSFIRST = 'DescNullsFirst',
  DESCNULLSLAST = 'DescNullsLast',
}

export enum app_role {
  ADMIN = 'admin',
  LEAGUE_STAFF = 'league_staff',
  USER = 'user',
  EDITOR = 'editor',
  ANALYST = 'analyst',
  TEAM_STAFF = 'team_staff',
  PLAYER = 'player',
}

export enum award_types {
  OFFENSIVE MVP = 'Offensive MVP',
  DEFENSIVE MVP = 'Defensive MVP',
  ROOKIE OF TOURNAMENT = 'Rookie of Tournament',
}

export enum event_tier {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4',
}

export enum event_type {
  LEAGUE = 'League',
  TOURNAMENT = 'Tournament',
}

export enum leagues {
  UPA = 'UPA',
  UPA COLLEGE = 'UPA College',
  WR = 'WR',
  MPBA = 'MPBA',
  RISING STARS = 'Rising Stars',
  STATEN ISLAND BASKETBALL ASSOCIATION = 'Staten Island Basketball Association',
  HALL OF FAME LEAGUE = 'Hall Of Fame League',
  DUNK LEAGUE = 'Dunk League',
  ROAD TO 25K = 'Road to 25K',
}

export enum player_position {
  POINT GUARD = 'Point Guard',
  SHOOTING GUARD = 'Shooting Guard',
  LOCK = 'Lock',
  POWER FORWARD = 'Power Forward',
  CENTER = 'Center',
}

export enum salary_tier {
  S = 'S',
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
}

export enum stage {
  REGULAR SEASON = 'Regular Season',
  GROUP PLAY = 'Group Play',
  ROUND 1 = 'Round 1',
  ROUND 2 = 'Round 2',
  ROUND 3 = 'Round 3',
  ROUND 4 = 'Round 4',
  SEMI FINALS = 'Semi Finals',
  FINALS = 'Finals',
  GRAND FINALS = 'Grand Finals',
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
  teams?: teams;
  teams?: teams;
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
  teams?: teams;
  teams?: teams;
  teams?: teams;
  teams?: teams;
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
  players?: players;
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
  player_statsCollection?: player_statsConnection;
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
  matchesCollection?: matchesConnection;
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
  upcoming_matchesCollection?: upcoming_matchesConnection;
  match_pointsCollection?: match_pointsConnection;
  matchesCollection?: matchesConnection;
  matchesCollection?: matchesConnection;
  matchesCollection?: matchesConnection;
  awards_raceCollection?: awards_raceConnection;
  teams_pot_trackerCollection?: teams_pot_trackerConnection;
  match_submissionsCollection?: match_submissionsConnection;
  match_submissionsCollection?: match_submissionsConnection;
  match_submissionsCollection?: match_submissionsConnection;
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


export interface BigFloatFilterInput {
  eq?: string;
  gt?: string;
  gte?: string;
  in?: any[];
  is?: FilterIs;
  lt?: string;
  lte?: string;
  neq?: string;
}

export interface BigFloatListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface BigIntFilterInput {
  eq?: string;
  gt?: string;
  gte?: string;
  in?: any[];
  is?: FilterIs;
  lt?: string;
  lte?: string;
  neq?: string;
}

export interface BigIntListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface BooleanFilterInput {
  eq?: boolean;
  is?: FilterIs;
}

export interface BooleanListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface DateFilterInput {
  eq?: Date;
  gt?: Date;
  gte?: Date;
  in?: any[];
  is?: FilterIs;
  lt?: Date;
  lte?: Date;
  neq?: Date;
}

export interface DateListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface DatetimeFilterInput {
  eq?: any;
  gt?: any;
  gte?: any;
  in?: any[];
  is?: FilterIs;
  lt?: any;
  lte?: any;
  neq?: any;
}

export interface DatetimeListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface FloatFilterInput {
  eq?: number;
  gt?: number;
  gte?: number;
  in?: any[];
  is?: FilterIs;
  lt?: number;
  lte?: number;
  neq?: number;
}

export interface FloatListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface IDFilterInput {
  eq?: string;
}

export interface IntFilterInput {
  eq?: number;
  gt?: number;
  gte?: number;
  in?: any[];
  is?: FilterIs;
  lt?: number;
  lte?: number;
  neq?: number;
}

export interface IntListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface OpaqueFilterInput {
  eq?: any;
  is?: FilterIs;
}

export interface StringFilterInput {
  eq?: string;
  gt?: string;
  gte?: string;
  ilike?: string;
  in?: any[];
  iregex?: string;
  is?: FilterIs;
  like?: string;
  lt?: string;
  lte?: string;
  neq?: string;
  regex?: string;
  startsWith?: string;
}

export interface StringListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface TimeFilterInput {
  eq?: string;
  gt?: string;
  gte?: string;
  in?: any[];
  is?: FilterIs;
  lt?: string;
  lte?: string;
  neq?: string;
}

export interface TimeListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface UUIDFilterInput {
  eq?: string;
  in?: any[];
  is?: FilterIs;
  neq?: string;
}

export interface UUIDListFilterInput {
  containedBy?: any[];
  contains?: any[];
  eq?: any[];
  is?: FilterIs;
  overlaps?: any[];
}

export interface app_roleFilterInput {
  eq?: app_role;
  in?: any[];
  is?: FilterIs;
  neq?: app_role;
}

export interface award_typesFilterInput {
  eq?: award_types;
  in?: any[];
  is?: FilterIs;
  neq?: award_types;
}

export interface awards_raceFilterInput {
  id?: UUIDFilter;
  event_id?: UUIDFilter;
  team_id?: UUIDFilter;
  player_id?: UUIDFilter;
  award_type?: award_typesFilter;
  rank?: IntFilter;
  rp_bonus?: BigIntFilter;
  award_winner?: BooleanFilter;
  created_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: awards_raceFilter;
}

export interface awards_raceInsertInputInput {
  id?: string;
  event_id?: string;
  team_id?: string;
  player_id?: string;
  award_type?: award_types;
  rank?: number;
  rp_bonus?: string;
  award_winner?: boolean;
  created_at?: any;
}

export interface awards_raceOrderByInput {
  id?: OrderByDirection;
  event_id?: OrderByDirection;
  team_id?: OrderByDirection;
  player_id?: OrderByDirection;
  award_type?: OrderByDirection;
  rank?: OrderByDirection;
  rp_bonus?: OrderByDirection;
  award_winner?: OrderByDirection;
  created_at?: OrderByDirection;
}

export interface awards_raceUpdateInputInput {
  id?: string;
  event_id?: string;
  team_id?: string;
  player_id?: string;
  award_type?: award_types;
  rank?: number;
  rp_bonus?: string;
  award_winner?: boolean;
  created_at?: any;
}

export interface draft_poolFilterInput {
  player_id?: UUIDFilter;
  declared_at?: DatetimeFilter;
  status?: StringFilter;
  season?: StringFilter;
  draft_rating?: IntFilter;
  draft_notes?: StringFilter;
  event_id?: UUIDFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: draft_poolFilter;
}

export interface draft_poolInsertInputInput {
  player_id?: string;
  declared_at?: any;
  status?: string;
  season?: string;
  draft_rating?: number;
  draft_notes?: string;
  event_id?: string;
  created_at?: any;
  updated_at?: any;
}

export interface draft_poolOrderByInput {
  player_id?: OrderByDirection;
  declared_at?: OrderByDirection;
  status?: OrderByDirection;
  season?: OrderByDirection;
  draft_rating?: OrderByDirection;
  draft_notes?: OrderByDirection;
  event_id?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
}

export interface draft_poolUpdateInputInput {
  player_id?: string;
  declared_at?: any;
  status?: string;
  season?: string;
  draft_rating?: number;
  draft_notes?: string;
  event_id?: string;
  created_at?: any;
  updated_at?: any;
}

export interface event_group_membersFilterInput {
  id?: UUIDFilter;
  group_id?: UUIDFilter;
  team_id?: UUIDFilter;
  seed?: IntFilter;
  created_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: event_group_membersFilter;
}

export interface event_group_membersInsertInputInput {
  id?: string;
  group_id?: string;
  team_id?: string;
  seed?: number;
  created_at?: any;
}

export interface event_group_membersOrderByInput {
  id?: OrderByDirection;
  group_id?: OrderByDirection;
  team_id?: OrderByDirection;
  seed?: OrderByDirection;
  created_at?: OrderByDirection;
}

export interface event_group_membersUpdateInputInput {
  id?: string;
  group_id?: string;
  team_id?: string;
  seed?: number;
  created_at?: any;
}

export interface event_groupsFilterInput {
  id?: UUIDFilter;
  event_id?: UUIDFilter;
  name?: StringFilter;
  description?: StringFilter;
  max_teams?: IntFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  status?: StringFilter;
  advancement_count?: IntFilter;
  sort_order?: IntFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: event_groupsFilter;
}

export interface event_groupsInsertInputInput {
  id?: string;
  event_id?: string;
  name?: string;
  description?: string;
  max_teams?: number;
  created_at?: any;
  updated_at?: any;
  status?: string;
  advancement_count?: number;
  sort_order?: number;
}

export interface event_groupsOrderByInput {
  id?: OrderByDirection;
  event_id?: OrderByDirection;
  name?: OrderByDirection;
  description?: OrderByDirection;
  max_teams?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
  status?: OrderByDirection;
  advancement_count?: OrderByDirection;
  sort_order?: OrderByDirection;
}

export interface event_groupsUpdateInputInput {
  id?: string;
  event_id?: string;
  name?: string;
  description?: string;
  max_teams?: number;
  created_at?: any;
  updated_at?: any;
  status?: string;
  advancement_count?: number;
  sort_order?: number;
}

export interface event_resultsFilterInput {
  id?: UUIDFilter;
  event_id?: UUIDFilter;
  team_id?: UUIDFilter;
  placement?: IntFilter;
  rp_awarded?: IntFilter;
  bonus_rp?: IntFilter;
  total_rp?: IntFilter;
  awarded_at?: DateFilter;
  prize_amount?: IntFilter;
  winner_banner_url?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: event_resultsFilter;
}

export interface event_resultsInsertInputInput {
  id?: string;
  event_id?: string;
  team_id?: string;
  placement?: number;
  rp_awarded?: number;
  bonus_rp?: number;
  awarded_at?: Date;
  prize_amount?: number;
  winner_banner_url?: string;
}

export interface event_resultsOrderByInput {
  id?: OrderByDirection;
  event_id?: OrderByDirection;
  team_id?: OrderByDirection;
  placement?: OrderByDirection;
  rp_awarded?: OrderByDirection;
  bonus_rp?: OrderByDirection;
  total_rp?: OrderByDirection;
  awarded_at?: OrderByDirection;
  prize_amount?: OrderByDirection;
  winner_banner_url?: OrderByDirection;
}

export interface event_resultsUpdateInputInput {
  id?: string;
  event_id?: string;
  team_id?: string;
  placement?: number;
  rp_awarded?: number;
  bonus_rp?: number;
  awarded_at?: Date;
  prize_amount?: number;
  winner_banner_url?: string;
}

export interface event_tierFilterInput {
  eq?: event_tier;
  in?: any[];
  is?: FilterIs;
  neq?: event_tier;
}

export interface event_typeFilterInput {
  eq?: event_type;
  in?: any[];
  is?: FilterIs;
  neq?: event_type;
}

export interface eventsFilterInput {
  id?: UUIDFilter;
  name?: StringFilter;
  type?: StringFilter;
  is_global?: BooleanFilter;
  region_id?: UUIDFilter;
  start_date?: DateFilter;
  end_date?: DateFilter;
  max_rp?: IntFilter;
  decay_days?: IntFilter;
  processed?: BooleanFilter;
  description?: StringFilter;
  banner_url?: StringFilter;
  rules_url?: StringFilter;
  processed_at?: DatetimeFilter;
  status?: StringFilter;
  tier?: event_tierFilter;
  season_number?: IntFilter;
  prize_pool?: IntFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: eventsFilter;
}

export interface eventsInsertInputInput {
  id?: string;
  name?: string;
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
}

export interface eventsOrderByInput {
  id?: OrderByDirection;
  name?: OrderByDirection;
  type?: OrderByDirection;
  is_global?: OrderByDirection;
  region_id?: OrderByDirection;
  start_date?: OrderByDirection;
  end_date?: OrderByDirection;
  max_rp?: OrderByDirection;
  decay_days?: OrderByDirection;
  processed?: OrderByDirection;
  description?: OrderByDirection;
  banner_url?: OrderByDirection;
  rules_url?: OrderByDirection;
  processed_at?: OrderByDirection;
  status?: OrderByDirection;
  tier?: OrderByDirection;
  season_number?: OrderByDirection;
  prize_pool?: OrderByDirection;
}

export interface eventsUpdateInputInput {
  id?: string;
  name?: string;
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
}

export interface group_matchesFilterInput {
  id?: UUIDFilter;
  group_id?: UUIDFilter;
  match_id?: UUIDFilter;
  round?: IntFilter;
  match_number?: IntFilter;
  created_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: group_matchesFilter;
}

export interface group_matchesInsertInputInput {
  id?: string;
  group_id?: string;
  match_id?: string;
  round?: number;
  match_number?: number;
  created_at?: any;
}

export interface group_matchesOrderByInput {
  id?: OrderByDirection;
  group_id?: OrderByDirection;
  match_id?: OrderByDirection;
  round?: OrderByDirection;
  match_number?: OrderByDirection;
  created_at?: OrderByDirection;
}

export interface group_matchesUpdateInputInput {
  id?: string;
  group_id?: string;
  match_id?: string;
  round?: number;
  match_number?: number;
  created_at?: any;
}

export interface group_standingsFilterInput {
  id?: UUIDFilter;
  group_id?: UUIDFilter;
  team_id?: UUIDFilter;
  matches_played?: IntFilter;
  wins?: IntFilter;
  losses?: IntFilter;
  points_for?: IntFilter;
  points_against?: IntFilter;
  point_differential?: IntFilter;
  position?: IntFilter;
  updated_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: group_standingsFilter;
}

export interface group_standingsInsertInputInput {
  id?: string;
  group_id?: string;
  team_id?: string;
  matches_played?: number;
  wins?: number;
  losses?: number;
  points_for?: number;
  points_against?: number;
  position?: number;
  updated_at?: any;
}

export interface group_standingsOrderByInput {
  id?: OrderByDirection;
  group_id?: OrderByDirection;
  team_id?: OrderByDirection;
  matches_played?: OrderByDirection;
  wins?: OrderByDirection;
  losses?: OrderByDirection;
  points_for?: OrderByDirection;
  points_against?: OrderByDirection;
  point_differential?: OrderByDirection;
  position?: OrderByDirection;
  updated_at?: OrderByDirection;
}

export interface group_standingsUpdateInputInput {
  id?: string;
  group_id?: string;
  team_id?: string;
  matches_played?: number;
  wins?: number;
  losses?: number;
  points_for?: number;
  points_against?: number;
  position?: number;
  updated_at?: any;
}

export interface kv_store_10f5458bFilterInput {
  key?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: kv_store_10f5458bFilter;
}

export interface kv_store_10f5458bInsertInputInput {
  key?: string;
  value?: any;
}

export interface kv_store_10f5458bOrderByInput {
  key?: OrderByDirection;
}

export interface kv_store_10f5458bUpdateInputInput {
  key?: string;
  value?: any;
}

export interface league_seasonsFilterInput {
  id?: BigIntFilter;
  league_name?: leaguesFilter;
  season_number?: IntFilter;
  start_date?: DatetimeFilter;
  end_date?: DatetimeFilter;
  is_active?: BooleanFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  event?: UUIDFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: league_seasonsFilter;
}

export interface league_seasonsInsertInputInput {
  league_name?: leagues;
  season_number?: number;
  start_date?: any;
  end_date?: any;
  is_active?: boolean;
  created_at?: any;
  updated_at?: any;
  event?: string;
}

export interface league_seasonsOrderByInput {
  id?: OrderByDirection;
  league_name?: OrderByDirection;
  season_number?: OrderByDirection;
  start_date?: OrderByDirection;
  end_date?: OrderByDirection;
  is_active?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
  event?: OrderByDirection;
}

export interface league_seasonsUpdateInputInput {
  league_name?: leagues;
  season_number?: number;
  start_date?: any;
  end_date?: any;
  is_active?: boolean;
  created_at?: any;
  updated_at?: any;
  event?: string;
}

export interface leaguesFilterInput {
  eq?: leagues;
  in?: any[];
  is?: FilterIs;
  neq?: leagues;
}

export interface match_mvpFilterInput {
  match_id?: UUIDFilter;
  player_id?: UUIDFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: match_mvpFilter;
}

export interface match_mvpInsertInputInput {
  match_id?: string;
  player_id?: string;
}

export interface match_mvpOrderByInput {
  match_id?: OrderByDirection;
  player_id?: OrderByDirection;
}

export interface match_mvpUpdateInputInput {
  match_id?: string;
  player_id?: string;
}

export interface match_pointsFilterInput {
  id?: UUIDFilter;
  match_id?: UUIDFilter;
  team_id?: UUIDFilter;
  group_id?: UUIDFilter;
  points_earned?: IntFilter;
  point_type?: StringFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: match_pointsFilter;
}

export interface match_pointsInsertInputInput {
  id?: string;
  match_id?: string;
  team_id?: string;
  group_id?: string;
  points_earned?: number;
  point_type?: string;
  created_at?: any;
  updated_at?: any;
}

export interface match_pointsOrderByInput {
  id?: OrderByDirection;
  match_id?: OrderByDirection;
  team_id?: OrderByDirection;
  group_id?: OrderByDirection;
  points_earned?: OrderByDirection;
  point_type?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
}

export interface match_pointsUpdateInputInput {
  id?: string;
  match_id?: string;
  team_id?: string;
  group_id?: string;
  points_earned?: number;
  point_type?: string;
  created_at?: any;
  updated_at?: any;
}

export interface match_submissionsFilterInput {
  id?: UUIDFilter;
  event_id?: UUIDFilter;
  match_id?: UUIDFilter;
  team_a_id?: UUIDFilter;
  team_a_name?: StringFilter;
  team_b_id?: UUIDFilter;
  team_b_name?: StringFilter;
  review_status?: StringFilter;
  reviewed_by?: StringFilter;
  reviewed_at?: DatetimeFilter;
  created_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: match_submissionsFilter;
}

export interface match_submissionsInsertInputInput {
  id?: string;
  event_id?: string;
  match_id?: string;
  team_a_id?: string;
  team_a_name?: string;
  team_b_id?: string;
  team_b_name?: string;
  review_status?: string;
  reviewed_by?: string;
  reviewed_at?: any;
  created_at?: any;
}

export interface match_submissionsOrderByInput {
  id?: OrderByDirection;
  event_id?: OrderByDirection;
  match_id?: OrderByDirection;
  team_a_id?: OrderByDirection;
  team_a_name?: OrderByDirection;
  team_b_id?: OrderByDirection;
  team_b_name?: OrderByDirection;
  review_status?: OrderByDirection;
  reviewed_by?: OrderByDirection;
  reviewed_at?: OrderByDirection;
  created_at?: OrderByDirection;
}

export interface match_submissionsUpdateInputInput {
  id?: string;
  event_id?: string;
  match_id?: string;
  team_a_id?: string;
  team_a_name?: string;
  team_b_id?: string;
  team_b_name?: string;
  review_status?: string;
  reviewed_by?: string;
  reviewed_at?: any;
  created_at?: any;
}

export interface matchesFilterInput {
  id?: UUIDFilter;
  event_id?: UUIDFilter;
  team_a_id?: UUIDFilter;
  team_b_id?: UUIDFilter;
  winner_id?: UUIDFilter;
  score_a?: IntFilter;
  score_b?: IntFilter;
  played_at?: DatetimeFilter;
  boxscore_url?: StringFilter;
  team_a_name?: StringFilter;
  stage?: stageFilter;
  game_number?: IntFilter;
  team_b_name?: StringFilter;
  winner_name?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: matchesFilter;
}

export interface matchesInsertInputInput {
  id?: string;
  event_id?: string;
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
}

export interface matchesOrderByInput {
  id?: OrderByDirection;
  event_id?: OrderByDirection;
  team_a_id?: OrderByDirection;
  team_b_id?: OrderByDirection;
  winner_id?: OrderByDirection;
  score_a?: OrderByDirection;
  score_b?: OrderByDirection;
  played_at?: OrderByDirection;
  boxscore_url?: OrderByDirection;
  team_a_name?: OrderByDirection;
  stage?: OrderByDirection;
  game_number?: OrderByDirection;
  team_b_name?: OrderByDirection;
  winner_name?: OrderByDirection;
}

export interface matchesUpdateInputInput {
  id?: string;
  event_id?: string;
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
}

export interface notificationsFilterInput {
  id?: UUIDFilter;
  user_id?: UUIDFilter;
  title?: StringFilter;
  message?: StringFilter;
  type?: StringFilter;
  read?: BooleanFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: notificationsFilter;
}

export interface notificationsInsertInputInput {
  id?: string;
  user_id?: string;
  title?: string;
  message?: string;
  type?: string;
  read?: boolean;
  created_at?: any;
  updated_at?: any;
}

export interface notificationsOrderByInput {
  id?: OrderByDirection;
  user_id?: OrderByDirection;
  title?: OrderByDirection;
  message?: OrderByDirection;
  type?: OrderByDirection;
  read?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
}

export interface notificationsUpdateInputInput {
  id?: string;
  user_id?: string;
  title?: string;
  message?: string;
  type?: string;
  read?: boolean;
  created_at?: any;
  updated_at?: any;
}

export interface player_positionFilterInput {
  eq?: player_position;
  in?: any[];
  is?: FilterIs;
  neq?: player_position;
}

export interface player_rp_transactionsFilterInput {
  id?: UUIDFilter;
  player_id?: UUIDFilter;
  event_id?: UUIDFilter;
  match_id?: UUIDFilter;
  amount?: IntFilter;
  description?: StringFilter;
  type?: StringFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: player_rp_transactionsFilter;
}

export interface player_rp_transactionsInsertInputInput {
  id?: string;
  player_id?: string;
  event_id?: string;
  match_id?: string;
  amount?: number;
  description?: string;
  type?: string;
  created_at?: any;
  updated_at?: any;
}

export interface player_rp_transactionsOrderByInput {
  id?: OrderByDirection;
  player_id?: OrderByDirection;
  event_id?: OrderByDirection;
  match_id?: OrderByDirection;
  amount?: OrderByDirection;
  description?: OrderByDirection;
  type?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
}

export interface player_rp_transactionsUpdateInputInput {
  id?: string;
  player_id?: string;
  event_id?: string;
  match_id?: string;
  amount?: number;
  description?: string;
  type?: string;
  created_at?: any;
  updated_at?: any;
}

export interface player_salary_tiersFilterInput {
  id?: IntFilter;
  tier_name?: StringFilter;
  min_value?: BigFloatFilter;
  max_value?: BigFloatFilter;
  multiplier?: BigFloatFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: player_salary_tiersFilter;
}

export interface player_salary_tiersInsertInputInput {
  tier_name?: string;
  min_value?: string;
  max_value?: string;
  multiplier?: string;
}

export interface player_salary_tiersOrderByInput {
  id?: OrderByDirection;
  tier_name?: OrderByDirection;
  min_value?: OrderByDirection;
  max_value?: OrderByDirection;
  multiplier?: OrderByDirection;
}

export interface player_salary_tiersUpdateInputInput {
  tier_name?: string;
  min_value?: string;
  max_value?: string;
  multiplier?: string;
}

export interface player_statsFilterInput {
  id?: UUIDFilter;
  player_id?: UUIDFilter;
  match_id?: UUIDFilter;
  team_id?: UUIDFilter;
  points?: IntFilter;
  assists?: IntFilter;
  rebounds?: IntFilter;
  steals?: IntFilter;
  blocks?: IntFilter;
  turnovers?: IntFilter;
  fouls?: IntFilter;
  ps?: FloatFilter;
  created_at?: DatetimeFilter;
  fgm?: IntFilter;
  fga?: IntFilter;
  three_points_made?: IntFilter;
  three_points_attempted?: IntFilter;
  ftm?: IntFilter;
  fta?: IntFilter;
  plus_minus?: IntFilter;
  player_name?: StringFilter;
  updated_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: player_statsFilter;
}

export interface player_statsInsertInputInput {
  id?: string;
  player_id?: string;
  match_id?: string;
  team_id?: string;
  points?: number;
  assists?: number;
  rebounds?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
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
}

export interface player_statsOrderByInput {
  id?: OrderByDirection;
  player_id?: OrderByDirection;
  match_id?: OrderByDirection;
  team_id?: OrderByDirection;
  points?: OrderByDirection;
  assists?: OrderByDirection;
  rebounds?: OrderByDirection;
  steals?: OrderByDirection;
  blocks?: OrderByDirection;
  turnovers?: OrderByDirection;
  fouls?: OrderByDirection;
  ps?: OrderByDirection;
  created_at?: OrderByDirection;
  fgm?: OrderByDirection;
  fga?: OrderByDirection;
  three_points_made?: OrderByDirection;
  three_points_attempted?: OrderByDirection;
  ftm?: OrderByDirection;
  fta?: OrderByDirection;
  plus_minus?: OrderByDirection;
  player_name?: OrderByDirection;
  updated_at?: OrderByDirection;
}

export interface player_statsUpdateInputInput {
  id?: string;
  player_id?: string;
  match_id?: string;
  team_id?: string;
  points?: number;
  assists?: number;
  rebounds?: number;
  steals?: number;
  blocks?: number;
  turnovers?: number;
  fouls?: number;
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
}

export interface playersFilterInput {
  id?: UUIDFilter;
  gamertag?: StringFilter;
  position?: player_positionFilter;
  region_id?: UUIDFilter;
  current_team_id?: UUIDFilter;
  performance_score?: FloatFilter;
  player_rp?: IntFilter;
  player_rank_score?: FloatFilter;
  salary_tier?: salary_tierFilter;
  monthly_value?: IntFilter;
  created_at?: DatetimeFilter;
  is_rookie?: BooleanFilter;
  discord_id?: StringFilter;
  twitter_id?: StringFilter;
  alternate_gamertag?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: playersFilter;
}

export interface playersInsertInputInput {
  id?: string;
  gamertag?: string;
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
}

export interface playersOrderByInput {
  id?: OrderByDirection;
  gamertag?: OrderByDirection;
  position?: OrderByDirection;
  region_id?: OrderByDirection;
  current_team_id?: OrderByDirection;
  performance_score?: OrderByDirection;
  player_rp?: OrderByDirection;
  player_rank_score?: OrderByDirection;
  salary_tier?: OrderByDirection;
  monthly_value?: OrderByDirection;
  created_at?: OrderByDirection;
  is_rookie?: OrderByDirection;
  discord_id?: OrderByDirection;
  twitter_id?: OrderByDirection;
  alternate_gamertag?: OrderByDirection;
}

export interface playersUpdateInputInput {
  id?: string;
  gamertag?: string;
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
}

export interface profilesFilterInput {
  id?: UUIDFilter;
  email?: StringFilter;
  role?: StringFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  app_role?: app_roleFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: profilesFilter;
}

export interface profilesInsertInputInput {
  id?: string;
  email?: string;
  role?: string;
  created_at?: any;
  updated_at?: any;
  app_role?: app_role;
}

export interface profilesOrderByInput {
  id?: OrderByDirection;
  email?: OrderByDirection;
  role?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
  app_role?: OrderByDirection;
}

export interface profilesUpdateInputInput {
  id?: string;
  email?: string;
  role?: string;
  created_at?: any;
  updated_at?: any;
  app_role?: app_role;
}

export interface ranking_pointsFilterInput {
  id?: UUIDFilter;
  team_id?: UUIDFilter;
  source?: StringFilter;
  event_id?: UUIDFilter;
  points?: IntFilter;
  awarded_at?: DateFilter;
  expires_at?: DateFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: ranking_pointsFilter;
}

export interface ranking_pointsInsertInputInput {
  id?: string;
  team_id?: string;
  source?: string;
  event_id?: string;
  points?: number;
  awarded_at?: Date;
  expires_at?: Date;
}

export interface ranking_pointsOrderByInput {
  id?: OrderByDirection;
  team_id?: OrderByDirection;
  source?: OrderByDirection;
  event_id?: OrderByDirection;
  points?: OrderByDirection;
  awarded_at?: OrderByDirection;
  expires_at?: OrderByDirection;
}

export interface ranking_pointsUpdateInputInput {
  id?: string;
  team_id?: string;
  source?: string;
  event_id?: string;
  points?: number;
  awarded_at?: Date;
  expires_at?: Date;
}

export interface regionsFilterInput {
  id?: UUIDFilter;
  name?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: regionsFilter;
}

export interface regionsInsertInputInput {
  id?: string;
  name?: string;
}

export interface regionsOrderByInput {
  id?: OrderByDirection;
  name?: OrderByDirection;
}

export interface regionsUpdateInputInput {
  id?: string;
  name?: string;
}

export interface role_permissionsFilterInput {
  id?: BigIntFilter;
  permission?: StringFilter;
  role?: app_roleFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: role_permissionsFilter;
}

export interface role_permissionsInsertInputInput {
  permission?: string;
  role?: app_role;
}

export interface role_permissionsOrderByInput {
  id?: OrderByDirection;
  permission?: OrderByDirection;
  role?: OrderByDirection;
}

export interface role_permissionsUpdateInputInput {
  permission?: string;
  role?: app_role;
}

export interface rp_transactionsFilterInput {
  id?: UUIDFilter;
  team_id?: UUIDFilter;
  event_id?: UUIDFilter;
  amount?: IntFilter;
  description?: StringFilter;
  type?: StringFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: rp_transactionsFilter;
}

export interface rp_transactionsInsertInputInput {
  id?: string;
  team_id?: string;
  event_id?: string;
  amount?: number;
  description?: string;
  type?: string;
  created_at?: any;
  updated_at?: any;
}

export interface rp_transactionsOrderByInput {
  id?: OrderByDirection;
  team_id?: OrderByDirection;
  event_id?: OrderByDirection;
  amount?: OrderByDirection;
  description?: OrderByDirection;
  type?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
}

export interface rp_transactionsUpdateInputInput {
  id?: string;
  team_id?: string;
  event_id?: string;
  amount?: number;
  description?: string;
  type?: string;
  created_at?: any;
  updated_at?: any;
}

export interface salary_tierFilterInput {
  eq?: salary_tier;
  in?: any[];
  is?: FilterIs;
  neq?: salary_tier;
}

export interface salary_tiersFilterInput {
  id?: BigIntFilter;
  salary_tier?: salary_tierFilter;
  label?: StringFilter;
  multiplier?: BigFloatFilter;
  min_rating?: IntFilter;
  max_rating?: IntFilter;
  description?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: salary_tiersFilter;
}

export interface salary_tiersInsertInputInput {
  salary_tier?: salary_tier;
  label?: string;
  multiplier?: string;
  min_rating?: number;
  max_rating?: number;
  description?: string;
}

export interface salary_tiersOrderByInput {
  id?: OrderByDirection;
  salary_tier?: OrderByDirection;
  label?: OrderByDirection;
  multiplier?: OrderByDirection;
  min_rating?: OrderByDirection;
  max_rating?: OrderByDirection;
  description?: OrderByDirection;
}

export interface salary_tiersUpdateInputInput {
  salary_tier?: salary_tier;
  label?: string;
  multiplier?: string;
  min_rating?: number;
  max_rating?: number;
  description?: string;
}

export interface stageFilterInput {
  eq?: stage;
  in?: any[];
  is?: FilterIs;
  neq?: stage;
}

export interface team_match_statsFilterInput {
  id?: UUIDFilter;
  match_id?: UUIDFilter;
  team_id?: UUIDFilter;
  points?: IntFilter;
  rebounds?: IntFilter;
  assists?: IntFilter;
  steals?: IntFilter;
  blocks?: IntFilter;
  turnovers?: IntFilter;
  field_goals_made?: IntFilter;
  field_goals_attempted?: IntFilter;
  three_points_made?: IntFilter;
  three_points_attempted?: IntFilter;
  free_throws_made?: IntFilter;
  free_throws_attempted?: IntFilter;
  fouls?: IntFilter;
  plus_minus?: IntFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: team_match_statsFilter;
}

export interface team_match_statsInsertInputInput {
  id?: string;
  match_id?: string;
  team_id?: string;
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

export interface team_match_statsOrderByInput {
  id?: OrderByDirection;
  match_id?: OrderByDirection;
  team_id?: OrderByDirection;
  points?: OrderByDirection;
  rebounds?: OrderByDirection;
  assists?: OrderByDirection;
  steals?: OrderByDirection;
  blocks?: OrderByDirection;
  turnovers?: OrderByDirection;
  field_goals_made?: OrderByDirection;
  field_goals_attempted?: OrderByDirection;
  three_points_made?: OrderByDirection;
  three_points_attempted?: OrderByDirection;
  free_throws_made?: OrderByDirection;
  free_throws_attempted?: OrderByDirection;
  fouls?: OrderByDirection;
  plus_minus?: OrderByDirection;
}

export interface team_match_statsUpdateInputInput {
  id?: string;
  match_id?: string;
  team_id?: string;
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

export interface team_rostersFilterInput {
  id?: UUIDFilter;
  team_id?: UUIDFilter;
  player_id?: UUIDFilter;
  is_captain?: BooleanFilter;
  is_player_coach?: BooleanFilter;
  joined_at?: DatetimeFilter;
  left_at?: DatetimeFilter;
  event_id?: UUIDFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: team_rostersFilter;
}

export interface team_rostersInsertInputInput {
  id?: string;
  team_id?: string;
  player_id?: string;
  is_captain?: boolean;
  is_player_coach?: boolean;
  joined_at?: any;
  left_at?: any;
  event_id?: string;
}

export interface team_rostersOrderByInput {
  id?: OrderByDirection;
  team_id?: OrderByDirection;
  player_id?: OrderByDirection;
  is_captain?: OrderByDirection;
  is_player_coach?: OrderByDirection;
  joined_at?: OrderByDirection;
  left_at?: OrderByDirection;
  event_id?: OrderByDirection;
}

export interface team_rostersUpdateInputInput {
  id?: string;
  team_id?: string;
  player_id?: string;
  is_captain?: boolean;
  is_player_coach?: boolean;
  joined_at?: any;
  left_at?: any;
  event_id?: string;
}

export interface teamsFilterInput {
  id?: UUIDFilter;
  name?: StringFilter;
  logo_url?: StringFilter;
  region_id?: UUIDFilter;
  current_rp?: IntFilter;
  elo_rating?: FloatFilter;
  global_rank?: IntFilter;
  leaderboard_tier?: StringFilter;
  created_at?: DatetimeFilter;
  player_rank_score?: FloatFilter;
  money_won?: IntFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: teamsFilter;
}

export interface teamsInsertInputInput {
  id?: string;
  name?: string;
  logo_url?: string;
  region_id?: string;
  current_rp?: number;
  elo_rating?: number;
  global_rank?: number;
  leaderboard_tier?: string;
  created_at?: any;
  player_rank_score?: number;
  money_won?: number;
}

export interface teamsOrderByInput {
  id?: OrderByDirection;
  name?: OrderByDirection;
  logo_url?: OrderByDirection;
  region_id?: OrderByDirection;
  current_rp?: OrderByDirection;
  elo_rating?: OrderByDirection;
  global_rank?: OrderByDirection;
  leaderboard_tier?: OrderByDirection;
  created_at?: OrderByDirection;
  player_rank_score?: OrderByDirection;
  money_won?: OrderByDirection;
}

export interface teamsUpdateInputInput {
  id?: string;
  name?: string;
  logo_url?: string;
  region_id?: string;
  current_rp?: number;
  elo_rating?: number;
  global_rank?: number;
  leaderboard_tier?: string;
  created_at?: any;
  player_rank_score?: number;
  money_won?: number;
}

export interface teams_pot_trackerFilterInput {
  id?: UUIDFilter;
  event_id?: UUIDFilter;
  team_id?: UUIDFilter;
  placement?: IntFilter;
  prize_amount?: IntFilter;
  created_at?: DatetimeFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: teams_pot_trackerFilter;
}

export interface teams_pot_trackerInsertInputInput {
  id?: string;
  event_id?: string;
  team_id?: string;
  placement?: number;
  prize_amount?: number;
  created_at?: any;
}

export interface teams_pot_trackerOrderByInput {
  id?: OrderByDirection;
  event_id?: OrderByDirection;
  team_id?: OrderByDirection;
  placement?: OrderByDirection;
  prize_amount?: OrderByDirection;
  created_at?: OrderByDirection;
}

export interface teams_pot_trackerUpdateInputInput {
  id?: string;
  event_id?: string;
  team_id?: string;
  placement?: number;
  prize_amount?: number;
  created_at?: any;
}

export interface upcoming_matchesFilterInput {
  id?: UUIDFilter;
  event_id?: UUIDFilter;
  team_a_id?: UUIDFilter;
  team_b_id?: UUIDFilter;
  scheduled_at?: DatetimeFilter;
  venue?: StringFilter;
  stream_url?: StringFilter;
  notes?: StringFilter;
  status?: StringFilter;
  created_at?: DatetimeFilter;
  updated_at?: DatetimeFilter;
  group_id?: UUIDFilter;
  round?: IntFilter;
  match_number?: IntFilter;
  team_a_logo?: StringFilter;
  team_b_logo?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: upcoming_matchesFilter;
}

export interface upcoming_matchesInsertInputInput {
  id?: string;
  event_id?: string;
  team_a_id?: string;
  team_b_id?: string;
  scheduled_at?: any;
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
}

export interface upcoming_matchesOrderByInput {
  id?: OrderByDirection;
  event_id?: OrderByDirection;
  team_a_id?: OrderByDirection;
  team_b_id?: OrderByDirection;
  scheduled_at?: OrderByDirection;
  venue?: OrderByDirection;
  stream_url?: OrderByDirection;
  notes?: OrderByDirection;
  status?: OrderByDirection;
  created_at?: OrderByDirection;
  updated_at?: OrderByDirection;
  group_id?: OrderByDirection;
  round?: OrderByDirection;
  match_number?: OrderByDirection;
  team_a_logo?: OrderByDirection;
  team_b_logo?: OrderByDirection;
}

export interface upcoming_matchesUpdateInputInput {
  id?: string;
  event_id?: string;
  team_a_id?: string;
  team_b_id?: string;
  scheduled_at?: any;
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
}

export interface update_raceFilterInput {
  id?: BigIntFilter;
  race_id?: UUIDFilter;
  update_type?: StringFilter;
  previous_rank?: IntFilter;
  new_rank?: IntFilter;
  updated_at?: DatetimeFilter;
  updated_by?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: update_raceFilter;
}

export interface update_raceInsertInputInput {
  race_id?: string;
  update_type?: string;
  update_details?: any;
  previous_rank?: number;
  new_rank?: number;
  updated_at?: any;
  updated_by?: string;
}

export interface update_raceOrderByInput {
  id?: OrderByDirection;
  race_id?: OrderByDirection;
  update_type?: OrderByDirection;
  previous_rank?: OrderByDirection;
  new_rank?: OrderByDirection;
  updated_at?: OrderByDirection;
  updated_by?: OrderByDirection;
}

export interface update_raceUpdateInputInput {
  race_id?: string;
  update_type?: string;
  update_details?: any;
  previous_rank?: number;
  new_rank?: number;
  updated_at?: any;
  updated_by?: string;
}

export interface user_rolesFilterInput {
  id?: BigIntFilter;
  user_id?: UUIDFilter;
  created_at?: DatetimeFilter;
  role?: app_roleFilter;
  role_name?: StringFilter;
  nodeId?: IDFilter;
  and?: any[];
  or?: any[];
  not?: user_rolesFilter;
}

export interface user_rolesInsertInputInput {
  user_id?: string;
  created_at?: any;
  role?: app_role;
  role_name?: string;
}

export interface user_rolesOrderByInput {
  id?: OrderByDirection;
  user_id?: OrderByDirection;
  created_at?: OrderByDirection;
  role?: OrderByDirection;
  role_name?: OrderByDirection;
}

export interface user_rolesUpdateInputInput {
  user_id?: string;
  created_at?: any;
  role?: app_role;
  role_name?: string;
}


