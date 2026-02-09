import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-surface to-surface-alt px-5 pt-16 pb-12 tablet:pt-20 tablet:pb-16 desktop:pt-24">
      <div className="max-w-[1200px] mx-auto text-center">
        {/* Trust badge */}
        <p className="text-text-secondary text-xs font-medium uppercase tracking-[0.1em] mb-4">
          Trusted by 4,200+ architects worldwide
        </p>

        {/* Headline */}
        <h1 className="text-[1.75rem] tablet:text-4xl desktop:text-5xl font-bold leading-[1.2] text-text-primary mb-4 max-w-2xl mx-auto">
          Professional Templates That Save You 40+ Hours Per Project
        </h1>

        {/* Subtitle */}
        <p className="text-text-secondary text-base leading-relaxed mb-8 max-w-lg mx-auto">
          Premium ArchiCAD, Revit &amp; SketchUp templates. Download instantly.
          Start designing today.
        </p>

        {/* CTA */}
        <div className="mb-8">
          <Button fullWidth className="tablet:w-auto">
            Browse All Templates
          </Button>
        </div>

        {/* Trust micro-icons */}
        <div className="flex flex-wrap justify-center gap-4 text-text-secondary text-sm">
          <span className="flex items-center gap-1">⚡ Instant Download</span>
          <span className="flex items-center gap-1">🔄 Free Updates</span>
          <span className="flex items-center gap-1">💬 24h Support</span>
        </div>
      </div>
    </section>
  );
}
