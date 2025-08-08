import type { SupabaseClient } from '@supabase/supabase-js';

export type AuthRole = 'anon' | 'authenticated' | 'admin';

export interface GraphQLContext {
  role: AuthRole;
  token: string | null;
  user: Record<string, any> | null;
  supabase: SupabaseClient;
  pg: (query: string, variables?: Record<string, any>) => Promise<any>;
  dataApi: (path: string, init?: RequestInit) => Promise<Response>;
  adminApi: (path: string, init?: RequestInit) => Promise<Response>;
  headers?: Record<string, any>;
}


