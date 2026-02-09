import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockProducts, getProductByHandle, getProductExtended, getProductRating, getRelatedProducts } from '@/lib/shopify/mock-data';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductPageClient from '@/components/product/ProductPageClient';

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  return mockProducts.map(p => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} — Architecture Paradise`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const extended = getProductExtended(product.id);
  const { rating, count } = getProductRating(product);
  const related = getRelatedProducts(product, 4);

  // Find collection for breadcrumb
  const software = product.tags.find(t => ['ArchiCAD', 'Revit', 'SketchUp'].includes(t));
  const collectionHandle = software?.toLowerCase() || 'archicad';

  return (
    <div className="min-h-screen pb-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: `${software} Templates`, href: `/boutique/${collectionHandle}` },
          { label: product.title },
        ]}
      />

      <ProductPageClient
        product={product}
        extended={extended}
        related={related}
        rating={rating}
        reviewCount={count}
      />
    </div>
  );
}
