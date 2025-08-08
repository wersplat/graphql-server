import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { AuthContext } from './auth';

const SUPABASE_URL = process.env.SUPABASE_URL as string;
const ANON_KEY = process.env.SUPABASE_ANON_KEY as string;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY as string;

const DATA_BASE = process.env.DATA_BASE_URL || 'https://data.bodegacatsgc.gg';
const ADMIN_BASE = process.env.ADMIN_BASE_URL || 'https://api.bodegacatsgc.gg';
const ADMIN_API_TOKEN = process.env.ADMIN_API_TOKEN || '';

export function supabaseForRequest(ctx: AuthContext): SupabaseClient {
  if (!SUPABASE_URL || !ANON_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  }
  const client = createClient(SUPABASE_URL, ANON_KEY, {
    auth: { autoRefreshToken: false, persistSession: false },
    global: ctx.token ? { headers: { Authorization: `Bearer ${ctx.token}` } } : undefined,
  });
  return client;
}

export function pgGraphQLFetch(ctx: AuthContext) {
  if (!SUPABASE_URL || !ANON_KEY) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY');
  }
  const endpoint = `${SUPABASE_URL}/graphql/v1`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    apikey: ANON_KEY,
    Authorization: `Bearer ${ctx.token ?? ANON_KEY}`,
  };
  return async (query: string, variables?: any) => {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables: variables || {} }),
    });
    if (!res.ok) throw new Error(`pg_graphql ${res.status}`);
    const json = (await res.json()) as any;
    if (json.errors?.length) throw new Error(json.errors[0].message);
    return json.data;
  };
}

export function dataBackend(_ctx: AuthContext) {
  return async (path: string, init?: RequestInit) => {
    return fetch(`${DATA_BASE}${path}`, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        'Content-Type': 'application/json',
      },
    });
  };
}

export function adminBackend(ctx: AuthContext) {
  // Prefer a dedicated admin API token for the admin backend (new-bodega-backend)
  // because it validates tokens with its own SECRET_KEY, not Supabase JWTs.
  const authHeader = ADMIN_API_TOKEN ? `Bearer ${ADMIN_API_TOKEN}` : `Bearer ${SERVICE_KEY}`;
  return async (path: string, init?: RequestInit) => {
    return fetch(`${ADMIN_BASE}${path}`, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        'Content-Type': 'application/json',
        Authorization: authHeader,
        // Forward caller context for auditing/optional RBAC inside admin service
        ...(ctx.token ? { 'X-Supabase-Token': ctx.token } : {}),
        'X-Request-Role': ctx.role,
      },
    });
  };
}


