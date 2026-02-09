import Hero from '@/components/sections/Hero';
import BestSellers from '@/components/sections/BestSellers';
import TrustBar from '@/components/ui/TrustBar';
import SocialProofBanner from '@/components/sections/SocialProofBanner';
import HowItWorks from '@/components/sections/HowItWorks';
import CategoriesShowcase from '@/components/sections/CategoriesShowcase';
import TestimonialCarousel from '@/components/ui/TestimonialCarousel';
import FAQ from '@/components/ui/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';

export default function HomePage() {
  return (
    <>
      <Hero />
      <BestSellers />
      <TrustBar />
      <SocialProofBanner />
      <HowItWorks />
      <CategoriesShowcase />
      <TestimonialCarousel />
      <FAQ />
      <FinalCTA />
    </>
  );
}
