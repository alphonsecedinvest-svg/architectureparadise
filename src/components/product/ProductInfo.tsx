'use client';

import { useRef } from 'react';
import Badge from '@/components/ui/Badge';
import StarRating from '@/components/ui/StarRating';
import AddToCartButton from '@/components/product/AddToCartButton';
import type { ShopifyProduct } from '@/types';
import { getProductRating, getProductSoftware, getProductBadges } from '@/lib/shopify/mock-data';

interface ProductInfoProps {
  product: ShopifyProduct;
  ctaRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ProductInfo({ product, ctaRef }: ProductInfoProps) {
  const { rating, count } = getProductRating(product);
  const software = getProductSoftware(product);
  const badges = getProductBadges(product);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAt = product.compareAtPriceRange.minVariantPrice.amount !== '0.0'
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;

  return (
    <div className="px-4 py-4 space-y-3">
      {/* Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="software">{software}</Badge>
        {badges.map(b => (
          <Badge
            key={b}
            variant={b === 'BEST SELLER' ? 'bestseller' : b === 'NEW' ? 'new' : 'discount'}
          >
            {b}
          </Badge>
        ))}
      </div>

      {/* Title */}
      <h1 className="text-[1.75rem] font-bold leading-[1.2] text-text-primary">
        {product.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center gap-2">
        <StarRating rating={rating} count={count} size="md" />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-[1.375rem] font-bold text-text-primary">€{price.toFixed(2)}</span>
        {compareAt && compareAt > price && (
          <>
            <span className="text-text-muted line-through">€{compareAt.toFixed(2)}</span>
            <span className="text-error text-sm font-semibold">
              -{Math.round(((compareAt - price) / compareAt) * 100)}%
            </span>
          </>
        )}
      </div>

      {/* Trust micros */}
      <div className="space-y-1.5 text-sm">
        <p className="flex items-center gap-2 text-text-secondary">
          <span>⚡</span> Instant download after purchase
        </p>
        <p className="flex items-center gap-2 text-text-secondary">
          <span>🔄</span> Free lifetime updates
        </p>
        <p className="flex items-center gap-2 text-text-secondary">
          <span>📐</span> {software} compatible
        </p>
      </div>

      {/* CTA */}
      <div ref={ctaRef}>
        <AddToCartButton product={product} />
      </div>

      {/* Trust line */}
      <p className="text-center text-xs text-text-muted">
        🔒 Secure checkout · Money-back guarantee
      </p>
    </div>
  );
}
