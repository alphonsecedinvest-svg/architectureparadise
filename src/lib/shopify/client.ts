import { mockProducts, mockCollections, getProductByHandle as mockGetProductByHandle, getCollectionByHandle as mockGetCollectionByHandle, getProductExtended as mockGetProductExtended, getProductRating as mockGetProductRating, getRelatedProducts as mockGetRelatedProducts } from './mock-data';
import type { ShopifyProduct, ShopifyCollection } from '@/types';

// Strip "www." — Shopify Storefront API doesn't accept it
const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^www\./, '');
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

  if (!res.ok) {
    throw new Error(`Shopify API returned ${res.status}`);
  }

  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}

// ── Product fragments ──────────────────────────────────────────────────

const PRODUCT_FRAGMENT = `
  id title handle description descriptionHtml availableForSale vendor productType tags options { id name values }
  seo { title description }
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  featuredImage { url altText width height }
  images(first: 10) { edges { node { url altText width height } } }
  variants(first: 30) { edges { node { id title availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } selectedOptions { name value } image { url altText width height } } } }
`;

const PRODUCT_CARD_FRAGMENT = `
  id title handle description availableForSale vendor productType tags
  priceRange { minVariantPrice { amount currencyCode } maxVariantPrice { amount currencyCode } }
  compareAtPriceRange { minVariantPrice { amount currencyCode } }
  featuredImage { url altText width height }
  images(first: 5) { edges { node { url altText width height } } }
  variants(first: 10) { edges { node { id title availableForSale price { amount currencyCode } compareAtPrice { amount currencyCode } selectedOptions { name value } } } }
`;

// ── Queries ────────────────────────────────────────────────────────────

export async function getProducts(
  first: number = 20,
  sortKey: string = 'BEST_SELLING',
): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
      query: `query($first: Int!, $sortKey: ProductSortKeys) {
        products(first: $first, sortKey: $sortKey) {
          edges { node { ${PRODUCT_CARD_FRAGMENT} } }
        }
      }`,
      variables: { first, sortKey },
    });
    return data.products.edges.map(e => e.node);
  } catch (err) {
    console.error('[Shopify] getProducts failed, using mock:', err);
    return mockProducts.slice(0, first);
  }
}

export async function getProductsByTag(
  tag: string,
  first: number = 20,
): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
      query: `query($first: Int!, $query: String!) {
        products(first: $first, query: $query, sortKey: BEST_SELLING) {
          edges { node { ${PRODUCT_CARD_FRAGMENT} } }
        }
      }`,
      variables: { first, query: `tag:${tag}` },
    });
    return data.products.edges.map(e => e.node);
  } catch (err) {
    console.error('[Shopify] getProductsByTag failed, using mock:', err);
    return mockProducts.filter(p => p.tags.includes(tag)).slice(0, first);
  }
}

export async function getCollections(first: number = 20): Promise<ShopifyCollection[]> {
  try {
    const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>({
      query: `query($first: Int!) {
        collections(first: $first) {
          edges { node { id handle title description
            image { url altText width height }
            products(first: 4, sortKey: BEST_SELLING) {
              edges { node { ${PRODUCT_CARD_FRAGMENT} } }
            }
          } }
        }
      }`,
      variables: { first },
    });
    return data.collections.edges.map(e => e.node);
  } catch (err) {
    console.error('[Shopify] getCollections failed, using mock:', err);
    return mockCollections.slice(0, first);
  }
}

export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  try {
    const data = await shopifyFetch<{ collection: ShopifyCollection | null }>({
      query: `query($handle: String!) {
        collection(handle: $handle) {
          id handle title description
          image { url altText width height }
          products(first: 50, sortKey: BEST_SELLING) {
            edges { node { ${PRODUCT_CARD_FRAGMENT} } }
          }
        }
      }`,
      variables: { handle },
    });
    return data.collection;
  } catch (err) {
    console.error('[Shopify] getCollectionByHandle failed, using mock:', err);
    return mockGetCollectionByHandle(handle) || null;
  }
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  try {
    const data = await shopifyFetch<{ product: ShopifyProduct | null }>({
      query: `query($handle: String!) {
        product(handle: $handle) { ${PRODUCT_FRAGMENT} }
      }`,
      variables: { handle },
    });
    return data.product;
  } catch (err) {
    console.error('[Shopify] getProductByHandle failed, using mock:', err);
    return mockGetProductByHandle(handle) || null;
  }
}

export async function getRelatedProducts(product: ShopifyProduct, limit: number = 4): Promise<ShopifyProduct[]> {
  try {
    // Use product recommendations API via Storefront API
    const data = await shopifyFetch<{ productRecommendations: ShopifyProduct[] }>({
      query: `query($productId: ID!) {
        productRecommendations(productId: $productId) { ${PRODUCT_CARD_FRAGMENT} }
      }`,
      variables: { productId: product.id },
    });
    return (data.productRecommendations || []).slice(0, limit);
  } catch (err) {
    console.error('[Shopify] getRelatedProducts failed, using mock:', err);
    return mockGetRelatedProducts(product, limit);
  }
}

// Re-export mock-only helpers (reviews, ratings, extended data — hardcoded)
export { getProductRating, getProductSoftware, getProductBadges, getProductExtended } from './mock-data';
export type { ProductExtended } from './mock-data';

// ── Cart API ───────────────────────────────────────────────────────────

export interface ShopifyCart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: { amount: string; currencyCode: string };
    subtotalAmount: { amount: string; currencyCode: string };
  };
  lines: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise: {
          id: string;
          title: string;
          product: { id: string; title: string; handle: string; featuredImage: { url: string } };
          price: { amount: string; currencyCode: string };
          selectedOptions: { name: string; value: string }[];
        };
      };
    }[];
  };
}

const CART_FRAGMENT = `
  id checkoutUrl totalQuantity
  cost { totalAmount { amount currencyCode } subtotalAmount { amount currencyCode } }
  lines(first: 50) { edges { node {
    id quantity
    merchandise { ... on ProductVariant {
      id title
      product { id title handle featuredImage { url } }
      price { amount currencyCode }
      selectedOptions { name value }
    } }
  } } }
`;

export async function createCart(): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartCreate: { cart: ShopifyCart } }>({
    query: `mutation { cartCreate { cart { ${CART_FRAGMENT} } } }`,
  });
  return data.cartCreate.cart;
}

export async function addToCart(cartId: string, lines: { merchandiseId: string; quantity: number }[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesAdd: { cart: ShopifyCart } }>({
    query: `mutation($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
    }`,
    variables: { cartId, lines },
  });
  return data.cartLinesAdd.cart;
}

export async function updateCartLines(cartId: string, lines: { id: string; quantity: number }[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesUpdate: { cart: ShopifyCart } }>({
    query: `mutation($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FRAGMENT} } }
    }`,
    variables: { cartId, lines },
  });
  return data.cartLinesUpdate.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ShopifyCart> {
  const data = await shopifyFetch<{ cartLinesRemove: { cart: ShopifyCart } }>({
    query: `mutation($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FRAGMENT} } }
    }`,
    variables: { cartId, lineIds },
  });
  return data.cartLinesRemove.cart;
}

export async function getCart(cartId: string): Promise<ShopifyCart | null> {
  try {
    const data = await shopifyFetch<{ cart: ShopifyCart | null }>({
      query: `query($cartId: ID!) { cart(id: $cartId) { ${CART_FRAGMENT} } }`,
      variables: { cartId },
    });
    return data.cart;
  } catch {
    return null;
  }
}
