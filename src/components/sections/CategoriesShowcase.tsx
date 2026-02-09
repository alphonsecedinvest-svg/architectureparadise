import Image from 'next/image';
import type { ShopifyCollection } from '@/types';

interface CategoriesShowcaseProps {
  collections: ShopifyCollection[];
}

export default function CategoriesShowcase({ collections }: CategoriesShowcaseProps) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
          Browse by Category
        </h2>

        <div className="flex flex-col gap-4 tablet:grid tablet:grid-cols-3">
          {collections.map((col) => (
            <a
              key={col.id}
              href={`/boutique/${col.handle}`}
              className="relative block h-40 tablet:h-48 rounded-card overflow-hidden group"
            >
              {col.image ? (
                <Image
                  src={col.image.url}
                  alt={col.image.altText || col.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1023px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">{col.title}</h3>
                <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                  Browse templates →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
