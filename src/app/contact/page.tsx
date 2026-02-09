import type { Metadata } from 'next';
import { BreadcrumbJsonLd } from '@/lib/seo/structured-data';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Architecture Paradise. Questions about templates, licensing, or custom requests — our team responds within 24 hours.',
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary text-center mb-2">
            Contact Us
          </h1>
          <p className="text-text-secondary text-center mb-10">
            Have a question? We respond within 24 hours — by real humans who use architecture
            software daily.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '✉️', title: 'Email', value: 'support@architectureparadise.com', href: 'mailto:support@architectureparadise.com' },
              { icon: '⏱', title: 'Response Time', value: 'Within 24 hours', href: null },
              { icon: '🌍', title: 'Availability', value: 'Mon–Fri, 9am–6pm CET', href: null },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-[var(--radius-card)] border border-border p-5 text-center">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-sm text-text-muted mb-1">{item.title}</div>
                {item.href ? (
                  <a href={item.href} className="text-accent hover:underline text-sm font-medium">
                    {item.value}
                  </a>
                ) : (
                  <div className="text-text-primary text-sm font-medium">{item.value}</div>
                )}
              </div>
            ))}
          </div>

          <ContactForm />

          {/* Trust */}
          <div className="mt-12 text-center text-sm text-text-muted space-y-2">
            <p>🔒 Your information is secure and will never be shared with third parties.</p>
            <p>⭐ Trusted by 12,000+ architects in 60+ countries.</p>
          </div>
        </div>
      </section>
    </>
  );
}
