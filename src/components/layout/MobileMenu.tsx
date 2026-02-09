'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Templates', href: '/boutique/templates' },
  { label: 'CAD Blocks', href: '/boutique/all-blocks-products' },
  { label: 'Bundles', href: '/boutique/offers' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <span className="font-bold text-lg text-text-primary">Menu</span>
          <button onClick={onClose} className="p-2 -mr-2" aria-label="Close menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="py-4">
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="block px-6 py-3 text-text-primary font-medium hover:bg-surface-alt transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
