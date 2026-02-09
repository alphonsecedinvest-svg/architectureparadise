import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section className="bg-primary py-12 px-5">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-2xl tablet:text-3xl font-bold text-white mb-3">
          Stop Setting Up. Start Drawing.
        </h2>
        <p className="text-white/70 text-base mb-2">
          Join 12,000+ architects who saved 40+ hours per project.
        </p>
        <p className="text-white/50 text-sm mb-8">
          From $29 · Instant download · 14-day money-back guarantee
        </p>
        <Link href="/boutique">
          <Button fullWidth className="tablet:w-auto">
            Get Your Template Now
          </Button>
        </Link>
      </div>
    </section>
  );
}
