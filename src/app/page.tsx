import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import BestSellers from '@/components/sections/BestSellers';
import TrustBar from '@/components/ui/TrustBar';
import SocialProofBanner from '@/components/sections/SocialProofBanner';
import HowItWorks from '@/components/sections/HowItWorks';
import CategoriesShowcase from '@/components/sections/CategoriesShowcase';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';
import FAQ from '@/components/ui/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import { BreadcrumbJsonLd } from '@/lib/seo/structured-data';
import { getProducts, getCollections } from '@/lib/shopify/client';

export const metadata: Metadata = {
  title: 'Architecture Paradise — Professional Templates for Architects',
  description:
    'Professional architecture templates for ArchiCAD, Revit, SketchUp & Rhino. 500+ production-ready designs. Instant download. Trusted by 12,000+ architects worldwide.',
  openGraph: {
    type: 'website',
    title: 'Architecture Paradise — Professional Templates for Architects',
    description:
      'Professional architecture templates for ArchiCAD, Revit, SketchUp & Rhino. 500+ production-ready designs. Instant download.',
  },
};

export default async function HomePage() {
  const [products, collections] = await Promise.all([
    getProducts(25, 'BEST_SELLING'),
    getCollections(20),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Home', href: '/' }]} />
      <Hero />
      <BestSellers products={products} />
      <TrustBar />
      <SocialProofBanner />
      <HowItWorks />
      <CategoriesShowcase collections={collections} />
      <TestimonialCarousel />
      <FAQ />
      <FinalCTA />
    </>
  );
}
