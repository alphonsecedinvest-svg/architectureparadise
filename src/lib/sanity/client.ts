/**
 * Sanity CMS client — works with or without Sanity configured.
 * When NEXT_PUBLIC_SANITY_PROJECT_ID is not set, all queries return null.
 */

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = '2024-01-01';

export const isSanityConfigured = Boolean(projectId);

interface SanityFetchOptions {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) return null;

  const url = new URL(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  );
  url.searchParams.set('query', query);

  for (const [key, value] of Object.entries(params)) {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  }

  const res = await fetch(url.toString(), {
    next: { revalidate: 1800, tags },
  });

  if (!res.ok) {
    console.error('Sanity fetch error:', res.statusText);
    return null;
  }

  const json = await res.json();
  return json.result as T;
}
