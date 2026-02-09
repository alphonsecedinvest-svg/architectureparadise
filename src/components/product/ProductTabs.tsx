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

function formatRelativeDate(dateStr: string): string {
  const now = Date.now();
  const date = new Date(dateStr).getTime();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'today';
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  }
  return 'over a year ago';
}

export default function ProductTabs({ extended, rating, reviewCount }: ProductTabsProps) {
  const [active, setActive] = useState<Tab>('features');
  const [visibleReviews, setVisibleReviews] = useState(10);
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
            {/* Global Score */}
            <div className="text-center py-4">
              <StarRating rating={rating} size="lg" variant="trustpilot" />
              <p className="text-2xl font-bold mt-2">{rating} out of 5</p>
              <p className="text-sm text-text-muted mt-1">Based on {reviewCount} reviews</p>
            </div>

            {/* Distribution bars */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(star => {
                const count = extended.reviews.filter(r => r.rating === star).length;
                const pct = extended.reviews.length > 0 ? (count / extended.reviews.length) * 100 : 0;
                return (
                  <div key={star} className="flex items-center gap-3 text-sm">
                    <span className="w-8 text-right font-medium">{star} ★</span>
                    <div className="flex-1 h-3 bg-[#E8E8E8] rounded-sm overflow-hidden">
                      <div className="h-full bg-trustpilot rounded-sm" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="w-8 text-right text-text-muted">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Review cards */}
            <div className="space-y-4 pt-2">
              {extended.reviews.slice(0, visibleReviews).map(review => (
                <div key={review.id} className="border border-border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={review.rating} variant="trustpilot" />
                    {review.verified && (
                      <span className="text-[11px] text-trustpilot font-medium">✓ Verified Purchase</span>
                    )}
                  </div>
                  <p className="font-semibold text-sm mb-1">&ldquo;{review.title}&rdquo;</p>
                  <p className="text-sm text-text-secondary mb-3">{review.text}</p>
                  <p className="text-xs text-text-muted">
                    {review.author}{review.location ? ` · ${review.location}` : ''} · {formatRelativeDate(review.date)}
                  </p>
                </div>
              ))}
            </div>

            {/* Show more */}
            {visibleReviews < extended.reviews.length && (
              <div className="text-center pt-2">
                <button
                  onClick={() => setVisibleReviews(prev => prev + 10)}
                  className="px-6 py-2.5 bg-trustpilot hover:bg-trustpilot-dark text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Show more reviews
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
