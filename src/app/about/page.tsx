import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Architecture Paradise is a small team of Swiss designers creating professional CAD templates and hand-drawn block libraries for architects and design professionals.',
  openGraph: {
    title: 'About Architecture Paradise',
    description:
      'Handcrafted CAD assets by Swiss designers. Professional templates and hand-drawn blocks for architects worldwide.',
  },
};

const promises = [
  {
    icon: '✏️',
    title: 'Handcrafted Quality',
    description:
      'Every block is drawn by hand — not auto-generated, not traced. The same care you\'d put into your own projects.',
  },
  {
    icon: '📐',
    title: 'Professional Use',
    description:
      'All products are licensed for professional use. Templates and blocks designed for real architectural projects.',
  },
  {
    icon: '💬',
    title: 'Real Support',
    description:
      'Questions answered within 24 hours by people who actually use CAD software. Not chatbots. Not scripts.',
  },
  {
    icon: '⚡',
    title: 'Instant Delivery',
    description:
      'Download links sent to your email immediately after purchase. Start working in minutes, not days.',
  },
];

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

      {/* Hero */}
      <section className="bg-primary text-white py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Handcrafted CAD Assets by Swiss Designers
          </h1>
          <p className="text-white/70 text-lg">
            Professional templates and hand-drawn blocks for architects worldwide.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-text-secondary leading-relaxed">
          <h2 className="text-2xl font-bold text-text-primary">Who We Are</h2>
          <p>
            Architecture Paradise is a small, focused team of designers based in Switzerland.
            We create professional CAD templates and hand-drawn block libraries for architects,
            students, and design professionals worldwide.
          </p>

          <h2 className="text-2xl font-bold text-text-primary pt-4">What We Believe</h2>
          <p>
            Every line in an architectural drawing matters. That&apos;s why we don&apos;t auto-generate
            our blocks or trace stock images. Every block in our library is drawn by hand — with the
            same care you&apos;d put into your own projects.
          </p>

          <h2 className="text-2xl font-bold text-text-primary pt-4">What We Make</h2>
          <p>
            <strong>Three all-in-one templates</strong> — complete professional setups for AutoCAD,
            ArchiCAD, and Revit. Each includes the template, blocks, guides, and presets. Download, open, draw.
          </p>
          <p>
            <strong>A curated library of CAD blocks</strong> — residential, urban, healthcare,
            vegetation, and people. All in universal .dwg format. All hand-drawn in our Swiss studio.
          </p>

          <h2 className="text-2xl font-bold text-text-primary pt-4">Why Swiss?</h2>
          <p>
            Switzerland has one of the world&apos;s highest concentrations of architects per capita.
            We grew up surrounded by precision, craft, and good design. It shows in our work.
          </p>

          <h2 className="text-2xl font-bold text-text-primary pt-4">Contact</h2>
          <p>
            Questions? Feedback? We&apos;re here.<br />
            <a href="mailto:contact@architectureparadise.com" className="text-accent hover:underline">
              contact@architectureparadise.com
            </a><br />
            Support available 24/7.
          </p>
        </div>
      </section>

      {/* Promise */}
      <section className="bg-surface-alt py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-text-primary text-center mb-10">
            Our Promise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {promises.map((item) => (
              <div key={item.title} className="bg-card rounded-[var(--radius-card)] p-6 border border-border">
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
