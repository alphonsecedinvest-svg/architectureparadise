'use client';

import { useCartStore } from '@/lib/stores/cart';

export default function CartBadge() {
  const totalQuantity = useCartStore((s) => s.totalQuantity);
  const openCart = useCartStore((s) => s.openCart);

  return (
    <button
      onClick={openCart}
      className="relative p-2 -mr-2"
      aria-label="Open cart"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
      {totalQuantity > 0 && (
        <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
          {totalQuantity}
        </span>
      )}
    </button>
  );
}
