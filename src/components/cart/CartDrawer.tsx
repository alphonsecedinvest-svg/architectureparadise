'use client';

import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { useCartStore } from '@/lib/stores/cart';
import Button from '@/components/ui/Button';
import { track } from '@/lib/utils/analytics';

export default function CartDrawer() {
  const { isOpen, closeCart, items, totalAmount, totalQuantity, removeItem, updateItem } = useCartStore();
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleCheckout = async () => {
    setCheckingOut(true);
    setCheckoutError(null);
    track('begin_checkout', {
      currency: 'EUR',
      value: totalAmount,
      items: items.map(i => ({ item_id: i.variantId, item_name: i.title, price: i.price, quantity: i.quantity })),
    });

    try {
      // Create a Shopify cart and redirect to checkout
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lines: items.map(i => ({ merchandiseId: i.variantId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }

    setCheckingOut(false);
    setCheckoutError('Checkout temporarily unavailable. Please try again.');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <span className="font-bold text-lg">Cart ({totalQuantity})</span>
          <button onClick={closeCart} className="p-2 -mr-2" aria-label="Close cart">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <p className="text-text-muted text-center py-10">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.variantId} className="flex gap-3">
                <div className="w-16 h-16 rounded-lg bg-surface-alt flex-shrink-0 overflow-hidden relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">{item.title}</p>
                  <p className="text-sm text-text-secondary">€{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => updateItem(item.variantId, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg border border-border text-xs flex items-center justify-center hover:bg-surface"
                    >
                      −
                    </button>
                    <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateItem(item.variantId, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg border border-border text-xs flex items-center justify-center hover:bg-surface"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.variantId)}
                      className="text-text-muted text-xs ml-auto hover:text-error"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border p-4 space-y-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <div className="flex justify-between text-base font-bold">
              <span>Subtotal</span>
              <span>€{totalAmount.toFixed(2)}</span>
            </div>
            {checkoutError && (
              <p className="text-error text-sm text-center bg-error/10 rounded-lg py-2 px-3">
                {checkoutError}
              </p>
            )}
            <Button fullWidth onClick={handleCheckout} disabled={checkingOut}>
              {checkingOut ? 'Redirecting...' : `Checkout — €${totalAmount.toFixed(2)}`}
            </Button>
            <div className="text-center space-y-1">
              <p className="text-xs text-text-muted">
                🔒 Secure checkout via Shopify
              </p>
              <div className="flex justify-center gap-2 text-xs text-text-muted">
                <span>Apple Pay</span>
                <span>·</span>
                <span>Google Pay</span>
                <span>·</span>
                <span>PayPal</span>
                <span>·</span>
                <span>Card</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
