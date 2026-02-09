import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockCollections, getCollectionByHandle } from '@/lib/shopify/mock-data';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import CollectionGrid from '@/components/collection/CollectionGrid';

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return mockCollections.map(c => ({ handle: c.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);
  if (!collection) return { title: 'Collection Not Found' };
  return {
    title: `${collection.title} — Architecture Paradise`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);
  if (!collection) notFound();

  const products = collection.products.edges.map(e => e.node);

  return (
    <div className="min-h-screen">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Boutique', href: '/boutique' },
          { label: collection.title },
        ]}
      />

      {/* Collection header */}
      <div className="px-4 pb-3">
        <h1 className="text-2xl font-bold text-text-primary">{collection.title}</h1>
        <p className="text-sm text-text-secondary mt-1">{collection.description}</p>
      </div>

      <CollectionGrid products={products} />
    </div>
  );
}
