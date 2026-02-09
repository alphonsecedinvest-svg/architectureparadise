import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { getCollections } from '@/lib/shopify/client';

export const metadata: Metadata = {
  title: 'All Collections — Architecture Paradise',
  description: 'Browse our collection of professional architecture templates for ArchiCAD, Revit, and SketchUp.',
};

export default async function BoutiquePage() {
  const collections = await getCollections(20);

  return (
    <div className="min-h-screen">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Boutique' }]} />

      <div className="px-4 pb-4">
        <h1 className="text-2xl font-bold text-text-primary mb-1">All Collections</h1>
        <p className="text-sm text-text-secondary mb-6">
          Browse our professional architecture resources
        </p>

        <div className="space-y-4">
          {collections.map(collection => (
            <Link
              key={collection.id}
              href={`/boutique/${collection.handle}`}
              className="block relative rounded-card overflow-hidden group"
            >
              <div className="relative aspect-[2/1]">
                {collection.image ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 1023px) 100vw, 50vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-light" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h2 className="font-bold text-xl mb-1">{collection.title}</h2>
                  <p className="text-sm text-white/80">{collection.description}</p>
                  <p className="text-sm font-medium mt-2 flex items-center gap-1">
                    Browse templates
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
