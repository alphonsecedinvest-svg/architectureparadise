import { mockCollections } from '@/lib/shopify/mock-data';

export default function CategoriesShowcase() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
          Browse by Software
        </h2>

        <div className="flex flex-col gap-4 tablet:grid tablet:grid-cols-3">
          {mockCollections.map((col) => (
            <a
              key={col.id}
              href={`/collections/${col.handle}`}
              className="relative block h-40 tablet:h-48 rounded-card overflow-hidden group"
            >
              {/* Background gradient (placeholder since we use placehold.co) */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light" />
              {/* Dark overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {/* Text */}
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">{col.title}</h3>
                <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                  {col.description.split(' ')[0]} templates →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
