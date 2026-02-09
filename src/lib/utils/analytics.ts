// Universal analytics utility — sends events to GA4 and Meta Pixel

type EcommerceItem = {
  item_id: string;
  item_name: string;
  price?: number;
  quantity?: number;
  item_category?: string;
};

type EventMap = {
  view_item: { currency?: string; value?: number; items: EcommerceItem[] };
  view_item_list: { item_list_name?: string; items: EcommerceItem[] };
  add_to_cart: { currency?: string; value?: number; items: EcommerceItem[] };
  remove_from_cart: { currency?: string; value?: number; items: EcommerceItem[] };
  begin_checkout: { currency?: string; value?: number; items: EcommerceItem[] };
  purchase: { transaction_id: string; currency?: string; value?: number; items: EcommerceItem[] };
  search: { search_term: string };
  newsletter_signup: { method?: string };
  page_view: { page_path?: string; page_title?: string };
};

type EventName = keyof EventMap;

// GA4 → Meta Pixel event name mapping
const metaEventMap: Partial<Record<EventName, string>> = {
  view_item: 'ViewContent',
  view_item_list: 'ViewContent',
  add_to_cart: 'AddToCart',
  begin_checkout: 'InitiateCheckout',
  purchase: 'Purchase',
  search: 'Search',
  newsletter_signup: 'Lead',
};

function hasConsent(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('ap-cookie-consent') === 'accepted';
}

function sendToGA4<T extends EventName>(event: T, params: EventMap[T]) {
  if (typeof window === 'undefined' || !hasConsent()) return;
  const gtag = (window as unknown as Record<string, unknown>).gtag as ((...args: unknown[]) => void) | undefined;
  if (gtag) {
    gtag('event', event, params);
  }
}

function sendToMeta<T extends EventName>(event: T, params: EventMap[T]) {
  if (typeof window === 'undefined' || !hasConsent()) return;
  const fbq = (window as unknown as Record<string, unknown>).fbq as ((...args: unknown[]) => void) | undefined;
  const metaEvent = metaEventMap[event];
  if (fbq && metaEvent) {
    // Map params to Meta format
    const metaParams: Record<string, unknown> = {};
    const p = params as Record<string, unknown>;
    if (p.value) metaParams.value = p.value;
    if (p.currency) metaParams.currency = p.currency;
    if ('items' in p && Array.isArray(p.items) && p.items.length > 0) {
      metaParams.content_ids = (p.items as EcommerceItem[]).map(i => i.item_id);
      metaParams.content_type = 'product';
    }
    if ('search_term' in p) metaParams.search_string = p.search_term;
    fbq('track', metaEvent, metaParams);
  }
}

export function track<T extends EventName>(event: T, params: EventMap[T]): void {
  sendToGA4(event, params);
  sendToMeta(event, params);

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, params);
  }
}

export function trackPageView(path: string): void {
  track('page_view', { page_path: path });
}

export type { EcommerceItem, EventName, EventMap };
