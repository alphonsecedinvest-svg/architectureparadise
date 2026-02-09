'use client';

import { useState, useCallback } from 'react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/lib/stores/cart';
import type { ShopifyProduct } from '@/types';

interface AddToCartButtonProps {
  product: ShopifyProduct;
  compact?: boolean;
}

export default function AddToCartButton({ product, compact = false }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);
  const addItem = useCartStore(s => s.addItem);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);
  const variant = product.variants.edges[0].node;

  const handleAdd = useCallback(() => {
    addItem({
      variantId: variant.id,
      productId: product.id,
      title: product.title,
      price,
      image: product.featuredImage.url,
      handle: product.handle,
      selectedOptions: variant.selectedOptions,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [addItem, variant, product, price]);

  return (
    <Button
      fullWidth
      onClick={handleAdd}
      className={`transition-colors duration-300 ${added ? '!bg-success' : ''} ${compact ? '!min-h-[44px] !py-2 !text-sm' : ''}`}
    >
      {added ? '✓ Added!' : `Add to Cart — €${price.toFixed(2)}`}
    </Button>
  );
}
