import type { ShopifyProduct, ShopifyCollection, Testimonial, FAQItem } from '@/types';

const placeholder = (w: number, h: number, label: string) =>
  `https://placehold.co/${w}x${h}/1A1A2E/E8A838?text=${encodeURIComponent(label)}`;

function makeProduct(
  id: string,
  title: string,
  handle: string,
  price: string,
  compareAt: string | null,
  software: string,
  category: string,
  tags: string[],
  rating: number,
  reviewCount: number,
): ShopifyProduct {
  const img = placeholder(800, 600, title.split(' ').slice(0, 2).join('+'));
  return {
    id,
    title,
    handle,
    description: `Professional ${title} — save 40+ hours of drafting. Fully customizable, production-ready.`,
    descriptionHtml: `<p>Professional ${title} — save 40+ hours of drafting.</p>`,
    availableForSale: true,
    vendor: 'Architecture Paradise',
    productType: category,
    tags: [...tags, software, `rating:${rating}`, `reviews:${reviewCount}`],
    priceRange: {
      minVariantPrice: { amount: price, currencyCode: 'EUR' },
      maxVariantPrice: { amount: price, currencyCode: 'EUR' },
    },
    compareAtPriceRange: {
      minVariantPrice: compareAt
        ? { amount: compareAt, currencyCode: 'EUR' }
        : { amount: '0.0', currencyCode: 'EUR' },
    },
    featuredImage: { url: img, altText: title, width: 800, height: 600 },
    images: { edges: [{ node: { url: img, altText: title, width: 800, height: 600 } }] },
    variants: {
      edges: [
        {
          node: {
            id: `variant-${id}`,
            title: 'Default',
            availableForSale: true,
            price: { amount: price, currencyCode: 'EUR' },
            compareAtPrice: compareAt ? { amount: compareAt, currencyCode: 'EUR' } : null,
            selectedOptions: [{ name: 'Software', value: software }],
            image: null,
          },
        },
      ],
    },
    options: [{ id: `opt-${id}`, name: 'Software', values: [software] }],
    seo: { title: null, description: null },
  };
}

export const mockProducts: ShopifyProduct[] = [
  makeProduct('1', 'Modern Villa Template', 'modern-villa', '49.00', '69.00', 'ArchiCAD', 'Residential', ['best-seller'], 4.9, 47),
  makeProduct('2', 'Commercial Office Complex', 'commercial-office', '89.00', null, 'Revit', 'Commercial', ['best-seller'], 4.8, 32),
  makeProduct('3', 'Residential Pack Bundle', 'residential-pack', '129.00', '149.00', 'ArchiCAD', 'Residential', ['bundle'], 5.0, 28),
  makeProduct('4', 'Minimalist Apartment', 'minimalist-apartment', '39.00', null, 'SketchUp', 'Residential', ['new'], 4.7, 19),
  makeProduct('5', 'Luxury Penthouse Suite', 'luxury-penthouse', '79.00', null, 'Revit', 'Residential', [], 4.9, 41),
  makeProduct('6', 'Landscape Master Plan', 'landscape-master', '59.00', null, 'SketchUp', 'Landscape', [], 4.6, 15),
  makeProduct('7', 'Industrial Loft Conversion', 'industrial-loft', '69.00', null, 'ArchiCAD', 'Commercial', ['new'], 4.8, 22),
  makeProduct('8', 'Retail Space Design', 'retail-space', '29.00', null, 'Revit', 'Commercial', [], 4.5, 11),
];

export const mockCollections: ShopifyCollection[] = [
  {
    id: 'col-1',
    handle: 'archicad',
    title: 'ArchiCAD Templates',
    description: '45+ professional templates for ArchiCAD 24-28',
    image: { url: placeholder(800, 400, 'ArchiCAD'), altText: 'ArchiCAD Templates', width: 800, height: 400 },
    products: { edges: mockProducts.filter(p => p.tags.includes('ArchiCAD')).map(node => ({ node })) },
  },
  {
    id: 'col-2',
    handle: 'revit',
    title: 'Revit Templates',
    description: '32+ professional templates for Revit 2022-2025',
    image: { url: placeholder(800, 400, 'Revit'), altText: 'Revit Templates', width: 800, height: 400 },
    products: { edges: mockProducts.filter(p => p.tags.includes('Revit')).map(node => ({ node })) },
  },
  {
    id: 'col-3',
    handle: 'sketchup',
    title: 'SketchUp Templates',
    description: '28+ professional templates for SketchUp 2022+',
    image: { url: placeholder(800, 400, 'SketchUp'), altText: 'SketchUp Templates', width: 800, height: 400 },
    products: { edges: mockProducts.filter(p => p.tags.includes('SketchUp')).map(node => ({ node })) },
  },
];

export const mockTestimonials: Testimonial[] = [
  { id: '1', text: 'This template saved me an entire week on my residential project. The detail level is incredible — it felt like a colleague had already started the project for me.', author: 'Maria L.', role: 'Architect, Barcelona', rating: 5 },
  { id: '2', text: 'I was skeptical about buying templates online, but the quality blew me away. Proper layers, real annotations, not just a pretty 3D model.', author: 'Thomas K.', role: 'Senior Architect, Berlin', rating: 5 },
  { id: '3', text: 'We bought the residential bundle for our firm. Every junior architect now starts with these templates. Consistency went up, revision cycles went down.', author: 'Sarah M.', role: 'Principal, London', rating: 5 },
  { id: '4', text: 'The ArchiCAD templates are exactly what I needed for my thesis project. Professional quality at a student-friendly price.', author: 'Lucas R.', role: 'Architecture Student, Paris', rating: 4 },
  { id: '5', text: 'Best investment I made this year. The commercial office template paid for itself on my very first project with it.', author: 'Ana P.', role: 'Freelance Architect, Lisbon', rating: 5 },
];

export const mockFAQ: FAQItem[] = [
  {
    question: 'What file formats are included?',
    answer: 'All templates include native project files (.pln, .rvt, .skp) plus DWG and PDF exports. You get everything you need to start working immediately.',
  },
  {
    question: 'Are updates really free?',
    answer: 'Yes. When we update a template for new software versions or improvements, you get the update at no additional cost. Forever.',
  },
  {
    question: 'Can I use templates for commercial projects?',
    answer: 'Absolutely. Our standard license covers commercial use for your own client projects. The only restriction is redistribution of the template files themselves.',
  },
  {
    question: 'What software versions are supported?',
    answer: 'We support the latest 4-5 versions of each software. Check the compatibility table on each product page for specific version details.',
  },
  {
    question: 'How do I get support?',
    answer: 'Email us at support@architectureparadise.com. We respond within 24 hours — and our support team actually uses architecture software, so we understand your questions.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, 14-day money-back guarantee if the template doesn\'t work as described. We want you to be completely confident in your purchase.',
  },
];

export function getProductRating(product: ShopifyProduct): { rating: number; count: number } {
  const ratingTag = product.tags.find(t => t.startsWith('rating:'));
  const countTag = product.tags.find(t => t.startsWith('reviews:'));
  return {
    rating: ratingTag ? parseFloat(ratingTag.split(':')[1]) : 4.5,
    count: countTag ? parseInt(countTag.split(':')[1]) : 0,
  };
}

export function getProductSoftware(product: ShopifyProduct): string {
  const softwares = ['ArchiCAD', 'Revit', 'SketchUp', 'Rhino', 'Vectorworks'];
  return product.tags.find(t => softwares.includes(t)) || 'ArchiCAD';
}

export function getProductBadges(product: ShopifyProduct): string[] {
  const badges: string[] = [];
  if (product.tags.includes('best-seller')) badges.push('BEST SELLER');
  if (product.tags.includes('new')) badges.push('NEW');
  if (product.compareAtPriceRange.minVariantPrice.amount !== '0.0') {
    const orig = parseFloat(product.compareAtPriceRange.minVariantPrice.amount);
    const curr = parseFloat(product.priceRange.minVariantPrice.amount);
    if (orig > curr) {
      const pct = Math.round(((orig - curr) / orig) * 100);
      badges.push(`-${pct}%`);
    }
  }
  return badges;
}
