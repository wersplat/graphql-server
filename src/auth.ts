import { createRemoteJWKSet, jwtVerify, type JWTPayload } from 'jose';
import dotenv from 'dotenv';

dotenv.config();

export type AuthRole = 'anon' | 'authenticated' | 'admin';

export type AuthContext = {
  role: AuthRole;
  token: string | null;
  user: JWTPayload | null;
};

function decodeJwt(token: string): any | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2 || !parts[1]) return null;
    const payload = parts[1] as string;
  const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
  const padded = b64 + '='.repeat((4 - (b64.length % 4)) % 4);
  const json = Buffer.from(padded, 'base64').toString('utf8');
    return JSON.parse(json);
  } catch {
    return null;
  }
}

let jwks: ReturnType<typeof createRemoteJWKSet> | null = null;

async function verifyJwtViaJwks(token: string): Promise<JWTPayload | null> {
  try {
    if (!process.env.SUPABASE_URL) return null;
    if (!jwks) {
      const jwksUrl = new URL('/auth/v1/keys', process.env.SUPABASE_URL);
      jwks = createRemoteJWKSet(jwksUrl, { cacheMaxAge: 60_000 });
    }
    const { payload } = await jwtVerify(token, jwks, {
      // Algorithms are provided by Supabase JWKS; don't hardcode to keep compatibility
      issuer: undefined,
      audience: undefined,
    });
    return payload as JWTPayload;
  } catch {
    return null;
  }
}

export async function parseAuth(authorizationHeader?: string): Promise<AuthContext> {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return { role: 'anon', token: null, user: null };
  }
  const token = authorizationHeader.slice(7);
  // Prefer verified payload via JWKS; fall back to unsafe decode if needed
  const payload = (await verifyJwtViaJwks(token)) || (decodeJwt(token) as any) || null;
  if (!payload) {
    return { role: 'anon', token: null, user: null };
  }

  const claimedRole = (payload.role as string) || 'anon';
  const baseRole: AuthRole = claimedRole === 'authenticated' ? 'authenticated' : 'anon';
  const appMeta = (payload['app_metadata'] as any) || {};
  const userMeta = (payload['user_metadata'] as any) || {};
  const hasura = (payload['https://hasura.io/jwt/claims'] as any) || {};

  // Support both singular role and array roles on app/user metadata and Hasura allowed roles
  const singularRole = appMeta.role || userMeta.role || hasura['x-hasura-default-role'];
  const appRoles: string[] = Array.isArray(appMeta.roles) ? appMeta.roles : [];
  const userRoles: string[] = Array.isArray(userMeta.roles) ? userMeta.roles : [];
  const hasuraRoles: string[] = Array.isArray(hasura['x-hasura-allowed-roles']) ? hasura['x-hasura-allowed-roles'] : [];
  const allRoles = [singularRole, ...appRoles, ...userRoles, ...hasuraRoles].filter(Boolean);
  const isAdmin = allRoles.includes('admin');
  const role: AuthRole = isAdmin ? 'admin' : baseRole;

  return { role, token, user: payload as JWTPayload };
}


