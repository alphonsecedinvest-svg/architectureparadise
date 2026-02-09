import Link from 'next/link';
import CartBadge from './CartBadge';
import MobileMenuTrigger from './MobileMenuTrigger';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border h-14 flex items-center px-4">
      <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
        {/* Hamburger */}
        <MobileMenuTrigger />

        {/* Desktop nav (hidden on mobile) */}
        <nav className="hidden tablet:flex items-center gap-6 text-sm font-medium text-text-primary">
          <Link href="/boutique/templates" className="hover:text-accent transition-colors">Templates</Link>
          <Link href="/boutique/all-blocks-products" className="hover:text-accent transition-colors">CAD Blocks</Link>
          <Link href="/boutique/offers" className="hover:text-accent transition-colors">Bundles</Link>
          <Link href="/about" className="hover:text-accent transition-colors">About</Link>
          <Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link>
        </nav>

        {/* Logo */}
        <Link href="/" className="font-bold text-lg text-text-primary tracking-tight absolute left-1/2 -translate-x-1/2 tablet:static tablet:translate-x-0">
          architectureparadise
        </Link>

        {/* Cart */}
        <CartBadge />
      </div>
    </header>
  );
}
