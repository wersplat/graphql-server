import DataLoader from 'dataloader';
import type { AuthContext } from './auth';

// Simple per-request DataLoaders using pg_graphql to batch by ids

export function createLoaders(ctx: AuthContext) {
  const playerById = new DataLoader<string, any | null>(async (ids) => {
    const uniqueIds = Array.from(new Set(ids));
    const q = `
      query ($ids: [UUID!]) {
        playersCollection(filter: { id: { in: $ids } }) {
          edges { node { id gamertag region_id player_rp salary_tier position created_at } }
        }
      }
    `;
    // Use per-request pg fetch bound to ctx
    const { pgGraphQLFetch } = await import('./gateways');
    const pg = pgGraphQLFetch(ctx);
    const data = await pg(q, { ids: uniqueIds });
    const map = new Map<string, any>();
    for (const e of data?.playersCollection?.edges || []) {
      map.set(e.node.id, e.node);
    }
    return ids.map((id) => map.get(id) ?? null);
  }, { cache: true });

  const teamById = new DataLoader<string, any | null>(async (ids) => {
    const uniqueIds = Array.from(new Set(ids));
    const q = `
      query ($ids: [UUID!]) {
        teamsCollection(filter: { id: { in: $ids } }) {
          edges { node { id name logo_url region_id created_at } }
        }
      }
    `;
    const { pgGraphQLFetch } = await import('./gateways');
    const pg = pgGraphQLFetch(ctx);
    const data = await pg(q, { ids: uniqueIds });
    const map = new Map<string, any>();
    for (const e of data?.teamsCollection?.edges || []) {
      map.set(e.node.id, e.node);
    }
    return ids.map((id) => map.get(id) ?? null);
  }, { cache: true });

  return { playerById, teamById };
}


