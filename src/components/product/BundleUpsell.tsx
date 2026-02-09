'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/stores/cart';
import type { ShopifyProduct } from '@/types';

export default function BundleUpsell() {
  const [bundleProduct, setBundleProduct] = useState<ShopifyProduct | null>(null);
  const addItem = useCartStore(s => s.addItem);

  useEffect(() => {
    // Fetch bundle products from API
    fetch('/api/products?tag=bundle&first=1')
      .then(r => r.ok ? r.json() : [])
      .then((products: ShopifyProduct[]) => {
        if (products.length > 0) setBundleProduct(products[0]);
      })
      .catch(() => {});
  }, []);

  if (!bundleProduct) return null;

  const price = parseFloat(bundleProduct.priceRange.minVariantPrice.amount);
  const compareAt = parseFloat(bundleProduct.compareAtPriceRange?.minVariantPrice?.amount || '0');
  const variant = bundleProduct.variants.edges[0]?.node;
  if (!variant) return null;

  const handleAdd = () => {
    addItem({
      variantId: variant.id,
      productId: bundleProduct.id,
      title: bundleProduct.title,
      price,
      image: bundleProduct.featuredImage?.url || '',
      handle: bundleProduct.handle,
      selectedOptions: variant.selectedOptions,
    });
  };

  return (
    <div className="mx-4 my-6 p-4 bg-surface-alt rounded-card border border-border">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">🎁</span>
        <span className="font-bold text-sm uppercase text-accent">Bundle & Save</span>
      </div>
      <p className="font-semibold text-text-primary mb-1">{bundleProduct.title}</p>
      <div className="flex items-baseline gap-2 mb-3">
        {compareAt > 0 && compareAt > price && (
          <span className="text-text-muted text-sm line-through">€{compareAt.toFixed(2)}</span>
        )}
        <span className="text-lg font-bold text-text-primary">€{price.toFixed(2)}</span>
        {compareAt > 0 && compareAt > price && (
          <span className="text-success text-sm font-semibold">
            Save {Math.round(((compareAt - price) / compareAt) * 100)}%
          </span>
        )}
      </div>
      <Button fullWidth variant="secondary" onClick={handleAdd}>
        Add Bundle to Cart
      </Button>
    </div>
  );
}
