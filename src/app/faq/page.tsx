import type { Metadata } from 'next';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/lib/seo/structured-data';
import FAQPageClient from './FAQPageClient';

const faqSections = [
  {
    title: 'General',
    items: [
      { question: 'What is Architecture Paradise?', answer: 'Architecture Paradise is a library of professional, production-ready architecture templates for ArchiCAD, Revit, SketchUp, Rhino, and more. Every template is designed by licensed architects and BIM specialists.' },
      { question: 'Who creates the templates?', answer: 'All templates are created by our team of licensed architects and BIM specialists. We don\'t use generic 3D modelers or AI generators — we build what we\'d actually use in our own practice.' },
      { question: 'How many templates do you offer?', answer: 'We currently offer 500+ templates across residential, commercial, landscape, and detail library categories — and we add new templates every month.' },
      { question: 'Are updates really free?', answer: 'Yes. When we update a template for new software versions or improvements, you get the update at no additional cost. Forever.' },
    ],
  },
  {
    title: 'Products',
    items: [
      { question: 'What file formats are included?', answer: 'All templates include native project files (.pln, .rvt, .skp) plus DWG and PDF exports. You get everything you need to start working immediately.' },
      { question: 'What software versions are supported?', answer: 'We support the latest 4-5 versions of each software. Check the compatibility table on each product page for specific version details.' },
      { question: 'Can I customize everything in the template?', answer: 'Absolutely. All layers, objects, annotations, and materials are fully editable. Nothing is locked or flattened. Treat it like your own project — because it is.' },
      { question: 'Can I use templates for commercial projects?', answer: 'Yes. Our standard license covers commercial use for your own client projects. You cannot resell or redistribute the template itself. See our License Agreement for full details.' },
      { question: 'What\'s included in a typical template?', answer: 'A typical template includes the complete native project file, floor plans, sections, elevations, a 3D model, material schedules, DWG exports, PDF presentation sheets, and a quick-start customization guide.' },
    ],
  },
  {
    title: 'Payments & Downloads',
    items: [
      { question: 'How do I download after purchase?', answer: 'Instantly. You\'ll receive a download link via email within 60 seconds, plus permanent access through your account dashboard. No waiting, no approval process.' },
      { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay through our secure Shopify checkout.' },
      { question: 'What\'s your refund policy?', answer: 'We offer a 14-day refund if the template doesn\'t work as described. Since these are digital downloads, we can\'t offer refunds for "changed my mind" — but our support team will help resolve any technical issues.' },
      { question: 'Do you offer bulk/team discounts?', answer: 'Yes — firms purchasing 5+ templates or needing team licenses can contact us at support@architectureparadise.com for custom pricing.' },
      { question: 'Do you offer student discounts?', answer: 'Yes! Students with a valid .edu email address get 15% off any purchase. Use code STUDENT15 at checkout.' },
    ],
  },
  {
    title: 'Technical Support',
    items: [
      { question: 'How do I get support?', answer: 'Email us at support@architectureparadise.com. We respond within 24 hours — and our support team actually uses architecture software, so we understand your questions.' },
      { question: 'What if the template doesn\'t work with my software version?', answer: 'Contact our support team and we\'ll help troubleshoot. If the template genuinely isn\'t compatible with your version as listed, we\'ll provide a full refund.' },
      { question: 'What if I need a modification you don\'t offer?', answer: 'We accept custom template requests for teams and firms. Email us your brief and we\'ll send a quote within 48 hours.' },
      { question: 'Can I request a template for specific software?', answer: 'Absolutely. We love hearing what our customers need. Email us your request and if there\'s enough demand, we\'ll prioritize it in our production queue.' },
    ],
  },
];

const allFaqItems = faqSections.flatMap((s) => s.items);

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Architecture Paradise templates — file formats, compatibility, refunds, support, and more.',
};

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]} />
      <FAQPageJsonLd items={allFaqItems} />

      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary text-center mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-text-secondary text-center mb-10">
            Everything you need to know about our templates and services.
          </p>

          <FAQPageClient sections={faqSections} />
        </div>
      </section>
    </>
  );
}
