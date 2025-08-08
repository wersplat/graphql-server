type JWTPayload = Record<string, any>;

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

export async function parseAuth(authorizationHeader?: string): Promise<AuthContext> {
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return { role: 'anon', token: null, user: null };
  }
  const token = authorizationHeader.slice(7);
  const payload = (decodeJwt(token) as any) || null;
  if (!payload) {
    return { role: 'anon', token: null, user: null };
  }

  const baseRole: AuthRole = (payload.role as string) === 'authenticated' ? 'authenticated' : 'authenticated';
  const appMeta = (payload['app_metadata'] as any) || {};
  const userMeta = (payload['user_metadata'] as any) || {};
  const hasura = (payload['https://hasura.io/jwt/claims'] as any) || {};
  const adminHint = appMeta.role || userMeta.role || hasura['x-hasura-default-role'];
  const role: AuthRole = adminHint === 'admin' ? 'admin' : baseRole;

  return { role, token, user: payload as JWTPayload };
}


