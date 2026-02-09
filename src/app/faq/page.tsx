import type { Metadata } from 'next';
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/lib/seo/structured-data';
import FAQPageClient from './FAQPageClient';

const faqSections = [
  {
    title: 'General',
    items: [
      { question: 'What is Architecture Paradise?', answer: 'Architecture Paradise is a small team of Swiss designers creating professional CAD templates and hand-drawn block libraries for architects, students, and design professionals worldwide.' },
      { question: 'What do you sell?', answer: 'We offer three all-in-one professional templates (for AutoCAD, ArchiCAD, and Revit) and a curated library of handcrafted 2D CAD blocks in universal .dwg format. Everything is a digital download, delivered instantly.' },
      { question: 'What makes your blocks different?', answer: 'Every block in our library is drawn by hand by our Swiss design team — not auto-generated, not traced from stock images. Each line is placed with intention. You can see the difference in the quality and character of the drawings.' },
    ],
  },
  {
    title: 'Products',
    items: [
      { question: 'What file formats are included?', answer: 'Templates include native files for the respective software. All CAD blocks are in universal .dwg format, compatible with AutoCAD, ArchiCAD, Revit, SketchUp, and most other CAD programs.' },
      { question: 'What\'s included in the All-in-One Templates?', answer: 'Each template package includes a professional drawing template, dynamic blocks, startup guide (PDF), and software-specific presets. For AutoCAD, you also get a .ctb plot style preset and .dwt template file.' },
      { question: 'Can I use the blocks in any CAD software?', answer: 'Yes. All CAD blocks are in universal .dwg format, which is compatible with virtually any CAD software — AutoCAD, ArchiCAD, Revit, SketchUp, and more.' },
      { question: 'Can I use these for commercial projects?', answer: 'Yes. The license covers professional use for your own projects. Redistribution or resale of the files is not permitted.' },
    ],
  },
  {
    title: 'Payments & Downloads',
    items: [
      { question: 'How do I receive my purchase?', answer: 'Instantly! A download link is sent to your email the moment your payment is confirmed. No waiting, no approval process.' },
      { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay through our secure Shopify checkout.' },
      { question: 'Do you offer refunds?', answer: 'As these are digital products delivered instantly, we cannot offer refunds. If you have any issues with your files, our support team is available at contact@architectureparadise.com.' },
    ],
  },
  {
    title: 'Support',
    items: [
      { question: 'How do I get support?', answer: 'Email us at contact@architectureparadise.com. We respond within 24 hours — and our support team actually uses CAD software, so we understand your questions.' },
      { question: 'What if I have trouble with a file?', answer: 'Contact our support team and we\'ll help troubleshoot. We\'re here to make sure you can use your purchase successfully.' },
    ],
  },
];

const allFaqItems = faqSections.flatMap((s) => s.items);

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Architecture Paradise — file formats, compatibility, downloads, refunds, and support for our CAD templates and blocks.',
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
            Everything you need to know about our templates and CAD blocks.
          </p>

          <FAQPageClient sections={faqSections} />
        </div>
      </section>
    </>
  );
}
