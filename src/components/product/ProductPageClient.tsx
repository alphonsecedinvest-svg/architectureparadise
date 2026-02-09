'use client';

import { useRef, useEffect } from 'react';
import type { ShopifyProduct } from '@/types';
import type { ProductExtended } from '@/lib/shopify/client';
import { track } from '@/lib/utils/analytics';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductTabs from './ProductTabs';
import ProductFAQ from './ProductFAQ';
import BundleUpsell from './BundleUpsell';
import StickyBottomCTA from './StickyBottomCTA';
import RelatedProducts from './RelatedProducts';
import ShareButton from './ShareButton';

interface ProductPageClientProps {
  product: ShopifyProduct;
  extended: ProductExtended;
  related: ShopifyProduct[];
  rating: number;
  reviewCount: number;
}

export default function ProductPageClient({ product, extended, related, rating, reviewCount }: ProductPageClientProps) {
  const ctaRef = useRef<HTMLDivElement>(null);
  const images = product.images.edges.map(e => e.node);

  useEffect(() => {
    track('view_item', {
      currency: 'EUR',
      value: parseFloat(product.priceRange.minVariantPrice.amount),
      items: [{
        item_id: product.id,
        item_name: product.title,
        price: parseFloat(product.priceRange.minVariantPrice.amount),
        item_category: product.productType,
      }],
    });
  }, [product.id, product.title, product.priceRange.minVariantPrice.amount, product.productType]);

  return (
    <>
      {/* Product header with share */}
      <div className="flex items-center justify-end px-2 py-1">
        <ShareButton title={product.title} />
      </div>

      <ProductGallery images={images} />
      <ProductInfo product={product} ctaRef={ctaRef} />

      <div className="border-t border-border">
        <ProductTabs extended={extended} rating={rating} reviewCount={reviewCount} />
      </div>

      <div className="border-t border-border">
        <RelatedProducts products={related} />
      </div>

      <div className="border-t border-border">
        <BundleUpsell />
      </div>

      <div className="border-t border-border">
        <ProductFAQ items={extended.faq} />
      </div>

      <StickyBottomCTA product={product} triggerRef={ctaRef} />
    </>
  );
}
