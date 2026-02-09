import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';
import GAProvider from '@/components/tracking/GAProvider';
import MetaPixel from '@/components/tracking/MetaPixel';
import CookieConsent from '@/components/tracking/CookieConsent';
import WebVitalsReporter from '@/components/tracking/WebVitalsReporter';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/lib/seo/structured-data';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://architectureparadise.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: '%s | Architecture Paradise',
    default: 'Architecture Paradise — Professional Templates for Architects',
  },
  description:
    'Professional architecture templates for ArchiCAD, Revit, SketchUp & Rhino. 500+ production-ready designs. Instant download. Trusted by 12,000+ architects worldwide.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Architecture Paradise',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Architecture Paradise' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@archparadise',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: { canonical: SITE_URL },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <GAProvider />
        <MetaPixel />
        <WebVitalsReporter />
        <AnnouncementBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <CartDrawer />
        <ScrollToTop />
        <CookieConsent />
      </body>
    </html>
  );
}
