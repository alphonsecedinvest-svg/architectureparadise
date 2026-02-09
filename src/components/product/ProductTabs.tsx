'use client';

import { useState, useRef, useEffect } from 'react';
import StarRating from '@/components/ui/StarRating';
import type { ProductExtended } from '@/lib/shopify/client';

type Tab = 'features' | 'compatibility' | 'reviews';

interface ProductTabsProps {
  extended: ProductExtended;
  rating: number;
  reviewCount: number;
}

export default function ProductTabs({ extended, rating, reviewCount }: ProductTabsProps) {
  const [active, setActive] = useState<Tab>('features');
  const tabBarRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const el = tabBarRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky(!entry.isIntersecting),
      { threshold: 1, rootMargin: '-57px 0px 0px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      {/* Tab bar */}
      <div ref={tabBarRef} />
      <div className={`sticky top-14 z-20 bg-white border-b border-border ${isSticky ? 'shadow-sm' : ''}`}>
        <div className="flex">
          {(['features', 'compatibility', 'reviews'] as Tab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={`flex-1 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
                active === tab
                  ? 'border-accent text-accent'
                  : 'border-transparent text-text-muted hover:text-text-primary'
              }`}
            >
              {tab === 'features' ? 'Features' : tab === 'compatibility' ? 'Compatibility' : `Reviews (${reviewCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 py-6">
        {active === 'features' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-base mb-3">What&apos;s Included</h3>
              <ul className="space-y-2">
                {extended.features.whatsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                    <span className="text-success mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-3">Specifications</h3>
              <dl className="space-y-2">
                {extended.features.specifications.map((spec, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <dt className="text-text-muted">{spec.label}</dt>
                    <dd className="text-text-primary font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )}

        {active === 'compatibility' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-base mb-3">Software Versions</h3>
              <ul className="space-y-2">
                {extended.compatibility.versions.map((v, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <span>{v.status === 'full' ? '✅' : v.status === 'partial' ? '⚠️' : '❌'}</span>
                    <span className={v.status === 'full' ? 'text-text-primary' : 'text-text-muted'}>
                      {v.version}
                    </span>
                    {v.status === 'partial' && <span className="text-xs text-text-muted">(partial support)</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-base mb-3">File Formats Included</h3>
              <ul className="space-y-2">
                {extended.compatibility.formats.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                    <span>📄</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {active === 'reviews' && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold">{rating}</p>
                <StarRating rating={rating} size="md" />
                <p className="text-xs text-text-muted mt-1">{reviewCount} reviews</p>
              </div>
              <div className="flex-1 space-y-1">
                {[5, 4, 3, 2, 1].map(star => {
                  const count = extended.reviews.filter(r => r.rating === star).length;
                  const pct = extended.reviews.length > 0 ? (count / extended.reviews.length) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-xs">
                      <span className="w-3">{star}★</span>
                      <div className="flex-1 h-2 bg-surface-alt rounded-full overflow-hidden">
                        <div className="h-full bg-star rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="w-5 text-right text-text-muted">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Review cards */}
            <div className="space-y-4">
              {extended.reviews.map(review => (
                <div key={review.id} className="border-b border-border pb-4 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <StarRating rating={review.rating} />
                    {review.verified && (
                      <span className="text-[10px] text-success font-medium">✓ Verified</span>
                    )}
                  </div>
                  <p className="font-medium text-sm mb-1">{review.title}</p>
                  <p className="text-sm text-text-secondary mb-2">{review.text}</p>
                  <p className="text-xs text-text-muted">
                    {review.author} · {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
