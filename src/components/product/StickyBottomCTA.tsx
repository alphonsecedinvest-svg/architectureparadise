'use client';

import { useState, useEffect } from 'react';
import AddToCartButton from './AddToCartButton';
import type { ShopifyProduct } from '@/types';

interface StickyBottomCTAProps {
  product: ShopifyProduct;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export default function StickyBottomCTA({ product, triggerRef }: StickyBottomCTAProps) {
  const [visible, setVisible] = useState(false);
  const price = parseFloat(product.priceRange.minVariantPrice.amount);

  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerRef]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center gap-4 px-4 h-[72px] pb-[env(safe-area-inset-bottom)] max-w-[1200px] mx-auto">
        <span className="text-[1.375rem] font-bold text-text-primary shrink-0">€{price.toFixed(2)}</span>
        <div className="flex-1">
          <AddToCartButton product={product} compact />
        </div>
      </div>
    </div>
  );
}
