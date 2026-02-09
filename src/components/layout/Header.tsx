'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/stores/cart';
import MobileMenu from './MobileMenu';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalQuantity = useCartStore((s) => s.totalQuantity);
  const openCart = useCartStore((s) => s.openCart);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-border h-14 flex items-center px-4">
        <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 -ml-2 tablet:hidden"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>

          {/* Desktop nav (hidden on mobile) */}
          <nav className="hidden tablet:flex items-center gap-6 text-sm font-medium text-text-primary">
            <a href="/collections" className="hover:text-accent transition-colors">Templates</a>
            <a href="/about" className="hover:text-accent transition-colors">About</a>
            <a href="/faq" className="hover:text-accent transition-colors">FAQ</a>
          </nav>

          {/* Logo */}
          <a href="/" className="font-bold text-lg text-text-primary tracking-tight absolute left-1/2 -translate-x-1/2 tablet:static tablet:translate-x-0">
            architectureparadise
          </a>

          {/* Cart */}
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
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
