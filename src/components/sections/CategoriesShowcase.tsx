import Image from 'next/image';
import type { ShopifyCollection } from '@/types';

interface CategoriesShowcaseProps {
  collections: ShopifyCollection[];
}

// Group collections into 3 categories for display
const CATEGORY_CONFIG = [
  { label: 'Templates', description: 'All-in-one professional packages', matchTerms: ['template', 'autocad', 'archicad', 'revit'] },
  { label: 'CAD Blocks', description: 'Hand-drawn 2D blocks in .dwg format', matchTerms: ['block', 'furniture', 'people', 'vegetation', 'urban', 'healthcare', 'environment', 'tree', 'residential'] },
  { label: 'Bundles', description: 'Best value — collections at a better price', matchTerms: ['bundle', 'pack', 'complete', 'full'] },
];

export default function CategoriesShowcase({ collections }: CategoriesShowcaseProps) {
  // Find a representative collection for each category
  const categories = CATEGORY_CONFIG.map((cat) => {
    const match = collections.find((col) =>
      cat.matchTerms.some((term) => col.handle.toLowerCase().includes(term))
    );
    return { ...cat, collection: match };
  });

  return (
    <section className="py-12 px-4">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-text-primary text-center mb-8">
          Browse by Category
        </h2>

        <div className="flex flex-col gap-4 tablet:grid tablet:grid-cols-3">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={cat.collection ? `/boutique/${cat.collection.handle}` : '/boutique'}
              className="relative block h-40 tablet:h-48 rounded-card overflow-hidden group"
            >
              {cat.collection?.image ? (
                <Image
                  src={cat.collection.image.url}
                  alt={cat.collection.image.altText || cat.label}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 1023px) 100vw, 33vw"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-bold mb-1">{cat.label}</h3>
                <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                  {cat.description} →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
