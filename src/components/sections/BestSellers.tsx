import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import Button from '@/components/ui/Button';
import type { ShopifyProduct } from '@/types';

interface CatalogueSectionsProps {
  products: ShopifyProduct[];
}

function isTemplate(p: ShopifyProduct): boolean {
  const t = p.title.toLowerCase();
  return t.includes('all-in-one') || t.includes('template') || t.includes('package');
}

function isBundle(p: ShopifyProduct): boolean {
  const t = p.title.toLowerCase();
  return t.includes('bundle') || t.includes('full pack') || t.includes('complete');
}

function isBlock(p: ShopifyProduct): boolean {
  return !isTemplate(p) && !isBundle(p);
}

export default function BestSellers({ products }: CatalogueSectionsProps) {
  const templates = products.filter(isTemplate);
  const blocks = products.filter(isBlock).slice(0, 8);
  const bundles = products.filter(isBundle);

  return (
    <>
      {/* Templates Section */}
      <section className="py-12 px-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              One Package. Everything You Need.
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Choose your software. Get a complete professional setup — template, dynamic blocks, startup guide, and presets — in one download.
            </p>
          </div>

          <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4 mb-8">
            {templates.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 3} />
            ))}
          </div>
        </div>
      </section>

      {/* CAD Blocks Section */}
      <section className="py-12 px-4 bg-surface-alt">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-text-primary mb-2">
              Hand-Drawn CAD Blocks
            </h2>
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              Unique 2D blocks in universal .dwg format. Designed by hand in our Swiss studio. Compatible with any CAD software.
            </p>
          </div>

          <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 gap-3 mb-8">
            {blocks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/boutique"><Button variant="ghost">Browse All Blocks →</Button></Link>
          </div>
        </div>
      </section>

      {/* Bundles Section */}
      {bundles.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-text-primary mb-2">
                Best Value: Get the Bundle
              </h2>
              <p className="text-text-secondary text-sm max-w-lg mx-auto">
                Save when you buy collections together. Our bundles combine multiple block packs at a better price.
              </p>
            </div>

            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 mb-8">
              {bundles.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
