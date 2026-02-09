'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface CartState {
  cartId: string | null;
  items: CartItem[];
  totalQuantity: number;
  totalAmount: number;
  isOpen: boolean;

  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  updateItem: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
}

function recalc(items: CartItem[]) {
  return {
    totalQuantity: items.reduce((sum, i) => sum + i.quantity, 0),
    totalAmount: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  };
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartId: null,
      items: [],
      totalQuantity: 0,
      totalAmount: 0,
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (item) => {
        const { items } = get();
        const existing = items.find(i => i.variantId === item.variantId);
        let newItems: CartItem[];

        if (existing) {
          newItems = items.map(i =>
            i.variantId === item.variantId
              ? { ...i, quantity: i.quantity + (item.quantity || 1) }
              : i
          );
        } else {
          newItems = [...items, { ...item, quantity: item.quantity || 1 }];
        }

        set({ items: newItems, ...recalc(newItems), isOpen: true });
      },

      updateItem: (variantId, quantity) => {
        const { items } = get();
        const newItems = quantity <= 0
          ? items.filter(i => i.variantId !== variantId)
          : items.map(i => (i.variantId === variantId ? { ...i, quantity } : i));
        set({ items: newItems, ...recalc(newItems) });
      },

      removeItem: (variantId) => {
        const newItems = get().items.filter(i => i.variantId !== variantId);
        set({ items: newItems, ...recalc(newItems) });
      },

      clearCart: () => set({ items: [], totalQuantity: 0, totalAmount: 0 }),
    }),
    {
      name: 'ap-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cartId: state.cartId,
        items: state.items,
        totalQuantity: state.totalQuantity,
        totalAmount: state.totalAmount,
      }),
    }
  )
);
