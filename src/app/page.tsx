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
  title: 'Architecture Paradise — Professional CAD Templates & Hand-Drawn Blocks',
  description:
    'All-in-one professional templates for AutoCAD, ArchiCAD & Revit, plus handcrafted CAD blocks in universal .dwg format. Made by Swiss designers. Instant download.',
  openGraph: {
    type: 'website',
    title: 'Architecture Paradise — Start Drawing. Not Setting Up.',
    description:
      'All-in-one CAD templates + hand-drawn blocks by Swiss designers. AutoCAD, ArchiCAD, Revit. Instant download.',
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
      <TestimonialCarousel />
      <HowItWorks />
      <CategoriesShowcase collections={collections} />
      <FAQ />
      <FinalCTA />
    </>
  );
}
