import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import StarRating from './StarRating';
import type { ShopifyProduct } from '@/types';
import { getProductRating, getProductSoftware, getProductBadges } from '@/lib/shopify/client';

interface ProductCardProps {
  product: ShopifyProduct;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { rating, count } = getProductRating(product);
  const software = getProductSoftware(product);
  const badges = getProductBadges(product);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const compareAt = product.compareAtPriceRange.minVariantPrice.amount !== '0.0'
    ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
    : null;

  return (
    <Link
      href={`/produits/${product.handle}`}
      className="block bg-card rounded-card shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
    >
      {/* Image */}
      <div className="relative aspect-[3/2] bg-surface-alt">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText || product.title}
          fill
          className="object-cover"
          sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
          priority={priority}
        />
        {/* Badges */}
        {badges.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {badges.map((b) => (
              <Badge
                key={b}
                variant={
                  b === 'BEST SELLER' ? 'bestseller' : b === 'NEW' ? 'new' : 'discount'
                }
              >
                {b}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-text-muted text-xs mb-1">
          {software} · {product.productType}
        </p>
        <h3 className="text-text-primary font-semibold text-[1.125rem] leading-[1.3] line-clamp-2 mb-1">
          {product.title}
        </h3>
        <div className="mb-1">
          <StarRating rating={rating} count={count} />
        </div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-text-primary font-bold text-[1.375rem] leading-[1.2]">
            €{price.toFixed(2)}
          </span>
          {compareAt && compareAt > price && (
            <span className="text-text-muted text-sm line-through">
              €{compareAt.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-success text-xs font-medium flex items-center gap-1">
          <span>⚡</span> Instant Download
        </p>
      </div>
    </Link>
  );
}
