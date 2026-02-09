import Button from '@/components/ui/Button';

export default function FinalCTA() {
  return (
    <section className="bg-primary py-12 px-5">
      <div className="max-w-[1200px] mx-auto text-center">
        <h2 className="text-2xl tablet:text-3xl font-bold text-white mb-3">
          Your Entire CAD Workflow, One Download Away
        </h2>
        <p className="text-white/70 text-base mb-8">
          All-in-one templates + handcrafted Swiss CAD blocks. Instant download.
        </p>
        <a href="/boutique">
          <Button fullWidth className="tablet:w-auto">
            Browse the Collection
          </Button>
        </a>
      </div>
    </section>
  );
}
