// Web Vitals reporting — sends to GA4 as custom events

interface Metric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  id: string;
}

function sendToGA4(metric: Metric) {
  const gtag = (window as unknown as Record<string, unknown>).gtag as ((...args: unknown[]) => void) | undefined;
  if (gtag) {
    gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.rating,
      non_interaction: true,
    });
  }
}

export function reportWebVitals(metric: Metric): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})`);
  }

  const consent = typeof window !== 'undefined' && localStorage.getItem('ap-cookie-consent') === 'accepted';
  if (consent) {
    sendToGA4(metric);
  }
}

export async function initWebVitals(): Promise<void> {
  try {
    const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');
    onCLS(reportWebVitals);
    onINP(reportWebVitals);
    onLCP(reportWebVitals);
    onFCP(reportWebVitals);
    onTTFB(reportWebVitals);
  } catch {
    // web-vitals not available
    if (process.env.NODE_ENV === 'development') {
      console.warn('[Web Vitals] web-vitals library not available');
    }
  }
}
