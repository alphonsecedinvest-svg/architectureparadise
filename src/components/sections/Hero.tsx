import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-surface to-surface-alt px-5 pt-16 pb-12 tablet:pt-20 tablet:pb-16 desktop:pt-24">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Trust badge */}
        <p className="text-text-secondary text-xs font-medium uppercase tracking-[0.15em] mb-4">
          Trusted by 12,000+ architects worldwide
        </p>

        {/* Headline */}
        <h1 className="text-[1.75rem] tablet:text-4xl desktop:text-5xl font-bold leading-[1.2] text-text-primary mb-4 max-w-2xl mx-auto">
          Start Drawing. Not Setting Up.
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-lg mx-auto">
          Professional CAD templates &amp; hand-drawn blocks for AutoCAD, ArchiCAD &amp; Revit. Save 40+ hours on every project.
        </p>

        {/* CTA */}
        <div className="mb-4">
          <Link href="/boutique">
            <Button fullWidth className="tablet:w-auto">
              Get Your Template — From $29
            </Button>
          </Link>
        </div>

        {/* Social proof */}
        <p className="text-text-muted text-xs mb-8">
          ★★★★★ 4.8/5 average rating · Instant download · Money-back guarantee
        </p>

        {/* Trust micro-icons */}
        <div className="flex flex-wrap justify-center gap-4 text-text-secondary text-sm">
          <span className="flex items-center gap-1">🇨🇭 Swiss Made</span>
          <span className="flex items-center gap-1">⚡ Instant Download</span>
          <span className="flex items-center gap-1">📐 Professional Use</span>
          <span className="flex items-center gap-1">💬 24h Support</span>
        </div>
      </div>
    </section>
  );
}
