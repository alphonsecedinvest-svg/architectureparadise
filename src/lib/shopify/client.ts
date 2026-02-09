import { mockProducts, mockCollections } from './mock-data';
import type { ShopifyProduct, ShopifyCollection } from '@/types';

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

const USE_MOCK = !SHOPIFY_DOMAIN || !SHOPIFY_TOKEN;

async function shopifyFetch<T>({ query, variables }: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  if (USE_MOCK) {
    throw new Error('Shopify credentials not configured — using mock data');
  }

  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

export async function getProducts(
  first: number = 20,
  sortKey: string = 'BEST_SELLING',
): Promise<ShopifyProduct[]> {
  if (USE_MOCK) {
    return mockProducts.slice(0, first);
  }

  const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
    query: `query($first: Int!, $sortKey: ProductSortKeys) {
      products(first: $first, sortKey: $sortKey) {
        edges { node { id title handle description availableForSale vendor productType tags
          priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
          compareAtPriceRange { minVariantPrice { amount currencyCode } }
          featuredImage { url altText width height }
          images(first: 10) { edges { node { url altText width height } } }
          variants(first: 10) { edges { node { id title availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } selectedOptions { name value } } } }
        } }
      }
    }`,
    variables: { first, sortKey },
  });
  return data.products.edges.map(e => e.node);
}

export async function getCollections(first: number = 10): Promise<ShopifyCollection[]> {
  if (USE_MOCK) {
    return mockCollections.slice(0, first);
  }

  const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>({
    query: `query($first: Int!) {
      collections(first: $first) {
        edges { node { id handle title description
          image { url altText width height }
          products(first: 4, sortKey: BEST_SELLING) {
            edges { node { id title handle availableForSale featuredImage { url altText width height }
              priceRange { minVariantPrice { amount currencyCode } } } }
          }
        } }
      }
    }`,
    variables: { first },
  });
  return data.collections.edges.map(e => e.node);
}
