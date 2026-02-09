import NewsletterForm from './NewsletterForm';

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-10 px-4 print:hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* Logo */}
        <p className="font-bold text-lg mb-6 text-center tablet:text-left">
          architectureparadise
        </p>

        {/* Newsletter */}
        <div className="mb-8 max-w-md mx-auto tablet:mx-0">
          <p className="text-sm text-white/70 mb-2">Get updates on new templates & exclusive deals</p>
          <NewsletterForm />
        </div>

        {/* Links */}
        <nav className="flex flex-wrap justify-center tablet:justify-start gap-x-6 gap-y-2 text-sm text-white/70 mb-8">
          <a href="/collections" className="hover:text-white transition-colors">Templates</a>
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <a href="/faq" className="hover:text-white transition-colors">FAQ</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          <a href="/terms" className="hover:text-white transition-colors">Terms</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy</a>
        </nav>

        {/* Payment icons */}
        <div className="flex justify-center tablet:justify-start gap-3 text-white/50 text-sm mb-6">
          <span className="border border-white/20 rounded px-2 py-1">Visa</span>
          <span className="border border-white/20 rounded px-2 py-1">MC</span>
          <span className="border border-white/20 rounded px-2 py-1">Amex</span>
          <span className="border border-white/20 rounded px-2 py-1">PayPal</span>
          <span className="border border-white/20 rounded px-2 py-1">Apple Pay</span>
        </div>

        {/* Bottom */}
        <div className="text-center tablet:text-left text-xs text-white/40 space-y-1">
          <p>© 2026 Architecture Paradise</p>
          <p>🔒 Secure checkout · SSL encrypted</p>
        </div>
      </div>
    </footer>
  );
}
