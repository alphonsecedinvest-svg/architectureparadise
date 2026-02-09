import Link from 'next/link';

const popularCategories = [
  { name: 'Residential', href: '/boutique?category=residential' },
  { name: 'Commercial', href: '/boutique?category=commercial' },
  { name: 'Interior', href: '/boutique?category=interior' },
  { name: 'Landscape', href: '/boutique?category=landscape' },
];

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-6xl mb-4">🏗️</p>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Page Not Found</h1>
      <p className="text-text-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved. 
        Let&apos;s get you back on track.
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-accent hover:bg-accent-hover text-white font-bold rounded-button transition-colors mb-10"
      >
        Back to Home
      </Link>

      <div>
        <p className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-3">Popular Templates</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularCategories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="px-4 py-2 bg-surface border border-border rounded-full text-sm text-text-primary hover:border-accent transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
