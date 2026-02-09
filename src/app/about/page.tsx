import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Architecture Paradise is built by architects, for architects. Learn how our team of licensed professionals creates production-ready templates used in 60+ countries.',
  openGraph: {
    title: 'About Architecture Paradise',
    description:
      'Architecture Paradise is built by architects, for architects. Learn how our team creates production-ready templates used in 60+ countries.',
  },
};

const promises = [
  {
    icon: '🎯',
    title: 'Production-Ready Quality',
    description:
      'Every template meets professional documentation standards. No placeholder content, no "lorem ipsum" annotations.',
  },
  {
    icon: '✅',
    title: 'Honest Compatibility',
    description:
      'If we say it works with ArchiCAD 27, it works with ArchiCAD 27. Tested, verified, guaranteed.',
  },
  {
    icon: '💬',
    title: 'Real Support',
    description:
      'Questions answered within 24 hours by people who actually use architecture software. Not chatbots. Not scripts.',
  },
  {
    icon: '🔄',
    title: 'Continuous Updates',
    description:
      'When software versions change, our templates get updated. Your purchase stays current.',
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
            We&apos;re Architects Who Got Tired of Starting From Zero
          </h1>
          <p className="text-white/70 text-lg">
            Built by architects, for architects. Since 2020.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto space-y-6 text-text-secondary leading-relaxed">
          <p>
            Architecture Paradise started in 2020 with a simple frustration: why does every new
            project begin with a blank screen?
          </p>
          <p>
            We&apos;re a team of licensed architects and BIM specialists who spent years building the
            same foundations over and over — residential layouts, commercial shells, detail
            libraries. The same 40 hours of base work before the real design could even begin.
          </p>
          <p>
            So we built what we wished existed: a library of production-ready templates created by
            architects who understand that a template isn&apos;t a shortcut — it&apos;s a smarter
            starting point.
          </p>
          <p>
            Every template in our library has been designed, reviewed, and tested by practicing
            professionals. We don&apos;t use generic 3D modelers or AI generators. We build what
            we&apos;d actually use in our own practice.
          </p>
          <p>
            Today, over 12,000 architects in 60+ countries use Architecture Paradise to reclaim
            their time — and spend it where it matters: on design, on clients, on the work that
            actually requires their expertise.
          </p>
          <p className="text-text-primary font-semibold text-lg pt-4">
            We&apos;re not replacing architects. We&apos;re giving them a head start.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-surface-alt py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Our Mission</h2>
          <p className="text-text-secondary leading-relaxed text-lg">
            To give every architect — from solo practitioners to global firms —
            professional-grade starting points that eliminate repetitive drafting and free up time
            for meaningful design work.
          </p>
        </div>
      </section>

      {/* Promise */}
      <section className="py-16 px-4">
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

      {/* Stats */}
      <section className="bg-primary text-white py-12 px-4">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: '12,000+', label: 'Architects worldwide' },
            { value: '500+', label: 'Templates' },
            { value: '60+', label: 'Countries' },
            { value: '4.8/5', label: 'Average rating' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl md:text-3xl font-bold text-accent">{stat.value}</div>
              <div className="text-white/60 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
