import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockProducts, getProductByHandle, getProductExtended, getProductRating, getRelatedProducts } from '@/lib/shopify/mock-data';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductPageClient from '@/components/product/ProductPageClient';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/lib/seo/structured-data';

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

  const price = product.priceRange.minVariantPrice;
  const images = product.images.edges.map(e => ({
    url: e.node.url,
    width: e.node.width,
    height: e.node.height,
    alt: e.node.altText || product.title,
  }));

  return {
    title: product.title,
    description: product.description,
    openGraph: {
      type: 'website',
      title: `${product.title} — Architecture Paradise`,
      description: product.description,
      images,
    },
    other: {
      'product:price:amount': price.amount,
      'product:price:currency': price.currencyCode,
      'product:availability': product.availableForSale ? 'in stock' : 'out of stock',
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = getProductByHandle(handle);
  if (!product) notFound();

  const extended = getProductExtended(product.id);
  const { rating, count } = getProductRating(product);
  const related = getRelatedProducts(product, 4);

  const software = product.tags.find(t => ['ArchiCAD', 'Revit', 'SketchUp'].includes(t));
  const collectionHandle = software?.toLowerCase() || 'archicad';

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `${software} Templates`, href: `/boutique/${collectionHandle}` },
    { label: product.title },
  ];

  return (
    <div className="min-h-screen pb-20">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ProductJsonLd
        name={product.title}
        description={product.description}
        images={product.images.edges.map(e => e.node.url)}
        handle={product.handle}
        price={product.priceRange.minVariantPrice.amount}
        currency={product.priceRange.minVariantPrice.currencyCode}
        available={product.availableForSale}
        rating={rating}
        reviewCount={count}
        brand={product.vendor}
      />
      <Breadcrumbs items={breadcrumbItems} />
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
