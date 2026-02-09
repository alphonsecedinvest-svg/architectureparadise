import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import ProductPageClient from '@/components/product/ProductPageClient';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { getProducts, getProductByHandle, getRelatedProducts, getProductExtended, getProductRating } from '@/lib/shopify/client';

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts(50);
  return products.map(p => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
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
      type: 'article',
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
  const product = await getProductByHandle(handle);
  if (!product) notFound();

  const extended = getProductExtended(product.handle);
  const { rating, count } = getProductRating(product);
  const related = await getRelatedProducts(product, 4);

  // Find software from tags
  const softwareTag = product.tags.find(t => t.startsWith('Software_'));
  const software = softwareTag?.replace('Software_', '') || 'AutoCAD';

  // Find matching collection handle
  const collectionMap: Record<string, string> = {
    'AutoCAD': 'all-blocks-products',
    'Archicad': 'all-blocks-products',
    'Revit': 'all-blocks-products',
    'illustrator': 'all-blocks-products',
    'Photoshop': 'all-blocks-products',
  };
  const collectionHandle = collectionMap[software] || 'all-blocks-products';

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `${software} Products`, href: `/boutique/${collectionHandle}` },
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
