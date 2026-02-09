import type { ShopifyProduct, ShopifyCollection, Testimonial, FAQItem } from '@/types';
import { reviewsMap as extReviewsMap, compatibilityMap as extCompatibilityMap, featuresMap as extFeaturesMap } from './mock-data-extended';

const placeholder = (w: number, h: number, label: string) =>
  `https://placehold.co/${w}x${h}/1A1A2E/E8A838?text=${encodeURIComponent(label)}`;

// ── Extended product data ──────────────────────────────────────────────

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
}

export interface ProductCompatibility {
  software: string;
  versions: { version: string; status: 'full' | 'partial' | 'none' }[];
  formats: string[];
}

export interface ProductFeatures {
  whatsIncluded: string[];
  specifications: { label: string; value: string }[];
}

export interface ProductExtended {
  reviews: ProductReview[];
  compatibility: ProductCompatibility;
  features: ProductFeatures;
  faq: FAQItem[];
}

// ── Reviews per product ────────────────────────────────────────────────

const reviewsMap: Record<string, ProductReview[]> = {
  '1': [
    { id: 'r1-1', author: 'Jean P.', rating: 5, title: 'Incredible quality', text: 'This template saved me an entire week. The layers are perfectly organized and the 3D model is production-ready.', date: '2026-01-15', verified: true },
    { id: 'r1-2', author: 'Maria L.', rating: 5, title: 'Best purchase this year', text: 'Exactly what I needed for my residential project. Customizing it was straightforward.', date: '2026-01-10', verified: true },
    { id: 'r1-3', author: 'Thomas K.', rating: 5, title: 'Professional grade', text: 'Proper layers, real annotations, not just a pretty 3D model. Highly recommend.', date: '2025-12-28', verified: true },
    { id: 'r1-4', author: 'Ana S.', rating: 4, title: 'Very good but', text: 'Great template overall. Would love to see more interior detail options included.', date: '2025-12-20', verified: true },
    { id: 'r1-5', author: 'Lucas R.', rating: 5, title: 'Perfect for thesis', text: 'Used this for my final thesis project. Professional quality at an affordable price.', date: '2025-12-15', verified: true },
    { id: 'r1-6', author: 'Sophie B.', rating: 5, title: 'Time saver', text: 'Cut my drafting time in half. The section drawings alone are worth the price.', date: '2025-12-05', verified: true },
    { id: 'r1-7', author: 'Ahmed N.', rating: 5, title: 'Excellent', text: 'Clean, well-structured, ready to use. What more could you ask for?', date: '2025-11-28', verified: true },
  ],
  '2': [
    { id: 'r2-1', author: 'David W.', rating: 5, title: 'Perfect for our firm', text: 'We use this as a starting point for all commercial projects now. Saves us days.', date: '2026-01-20', verified: true },
    { id: 'r2-2', author: 'Elena R.', rating: 5, title: 'Comprehensive', text: 'The MEP coordination is already done. This is not just a shell — it is a complete project.', date: '2026-01-12', verified: true },
    { id: 'r2-3', author: 'Mark J.', rating: 4, title: 'Great value', text: 'Very detailed for the price. Revit families are well-made.', date: '2025-12-30', verified: true },
    { id: 'r2-4', author: 'Yuki T.', rating: 5, title: 'Superb', text: 'The scheduling and tagging is perfect. Immediately production-ready.', date: '2025-12-18', verified: true },
    { id: 'r2-5', author: 'Carlos M.', rating: 5, title: 'Highly professional', text: 'Used it for a real client project. Nobody could tell it started from a template.', date: '2025-12-01', verified: true },
  ],
  '3': [
    { id: 'r3-1', author: 'Sarah M.', rating: 5, title: 'Best bundle ever', text: 'Three templates for the price of two. Every one is high quality.', date: '2026-01-18', verified: true },
    { id: 'r3-2', author: 'Pierre D.', rating: 5, title: 'Firm standard', text: 'We bought this for our entire team. Consistency across projects is amazing now.', date: '2026-01-05', verified: true },
    { id: 'r3-3', author: 'Lisa H.', rating: 5, title: 'Outstanding value', text: 'Each template in the bundle would be worth the full price individually.', date: '2025-12-22', verified: true },
    { id: 'r3-4', author: 'Raj P.', rating: 5, title: 'Complete solution', text: 'From villa to apartment to townhouse — covers all residential types.', date: '2025-12-10', verified: true },
    { id: 'r3-5', author: 'Emma K.', rating: 5, title: 'Amazing quality', text: 'The attention to detail in every template is remarkable.', date: '2025-11-25', verified: true },
    { id: 'r3-6', author: 'Olivier G.', rating: 5, title: 'Must-have', text: 'If you work in residential architecture, just buy this bundle.', date: '2025-11-15', verified: true },
  ],
  '4': [
    { id: 'r4-1', author: 'Nina V.', rating: 5, title: 'Clean and modern', text: 'The minimalist aesthetic is perfect. Clean lines, great proportions.', date: '2026-01-22', verified: true },
    { id: 'r4-2', author: 'Hugo F.', rating: 5, title: 'SketchUp perfection', text: 'Finally a SketchUp template that is properly organized with scenes and layers.', date: '2026-01-08', verified: true },
    { id: 'r4-3', author: 'Mia C.', rating: 4, title: 'Good starting point', text: 'Nice template, needed some tweaking for my specific use case but saved time overall.', date: '2025-12-25', verified: true },
    { id: 'r4-4', author: 'Alex B.', rating: 5, title: 'Great for clients', text: 'The render-ready scenes impressed my clients right away.', date: '2025-12-12', verified: true },
    { id: 'r4-5', author: 'Chloe W.', rating: 5, title: 'Love it', text: 'Simple, elegant, functional. This is what good architecture templates should be.', date: '2025-12-01', verified: true },
  ],
  '5': [
    { id: 'r5-1', author: 'James R.', rating: 5, title: 'Luxury done right', text: 'The level of detail in this penthouse template is staggering. Every fixture is modeled.', date: '2026-01-25', verified: true },
    { id: 'r5-2', author: 'Isabella M.', rating: 5, title: 'Worth every euro', text: 'Presented this to a client and they approved the design concept immediately.', date: '2026-01-14', verified: true },
    { id: 'r5-3', author: 'Stefan L.', rating: 5, title: 'Premium quality', text: 'This is what premium means. Revit families, schedules, everything included.', date: '2025-12-30', verified: true },
    { id: 'r5-4', author: 'Nadia K.', rating: 4, title: 'Almost perfect', text: 'Gorgeous template. Would love to see a version with terrace options.', date: '2025-12-15', verified: true },
    { id: 'r5-5', author: 'Oscar T.', rating: 5, title: 'Stunning', text: 'The penthouse views are already set up for renders. Saved me hours.', date: '2025-12-01', verified: true },
    { id: 'r5-6', author: 'Laura P.', rating: 5, title: 'Client approved', text: 'Used as-is for a pitch. Client loved it. Converting to final plans now.', date: '2025-11-20', verified: true },
  ],
  '6': [
    { id: 'r6-1', author: 'Green Studio', rating: 5, title: 'Comprehensive landscape', text: 'Finally a landscape template that includes proper planting schedules.', date: '2026-01-20', verified: true },
    { id: 'r6-2', author: 'Patrick O.', rating: 4, title: 'Good foundation', text: 'Solid master plan template. Added our own planting palette and it worked great.', date: '2025-12-28', verified: true },
    { id: 'r6-3', author: 'Yoko S.', rating: 5, title: 'Beautiful', text: 'The 3D vegetation models are excellent quality.', date: '2025-12-10', verified: true },
    { id: 'r6-4', author: 'Martin H.', rating: 5, title: 'Time saver', text: 'Landscape plans usually take forever. This cut my time by 60%.', date: '2025-11-25', verified: true },
    { id: 'r6-5', author: 'Zara A.', rating: 4, title: 'Useful', text: 'Good template, would appreciate more hardscape options in future updates.', date: '2025-11-10', verified: true },
  ],
  '7': [
    { id: 'r7-1', author: 'Brooklyn Design', rating: 5, title: 'Industrial perfection', text: 'The exposed structure details are amazing. Saved us weeks of modeling.', date: '2026-01-18', verified: true },
    { id: 'r7-2', author: 'Felix R.', rating: 5, title: 'Trend-ready', text: 'Perfect for the current loft conversion trend. Clients love the industrial aesthetic.', date: '2026-01-05', verified: true },
    { id: 'r7-3', author: 'Diana C.', rating: 4, title: 'Very detailed', text: 'Impressive steel structure modeling. Great reference even if you customize heavily.', date: '2025-12-20', verified: true },
    { id: 'r7-4', author: 'Sam N.', rating: 5, title: 'Best loft template', text: 'Tried three other loft templates before finding this one. This is the one.', date: '2025-12-05', verified: true },
    { id: 'r7-5', author: 'Katja W.', rating: 5, title: 'Client magnet', text: 'Every client wants a loft conversion these days. This template makes it easy.', date: '2025-11-18', verified: true },
  ],
  '8': [
    { id: 'r8-1', author: 'Retail Arch Co.', rating: 5, title: 'Great for retail', text: 'The display fixtures and lighting layout saved us so much time.', date: '2026-01-22', verified: true },
    { id: 'r8-2', author: 'Kevin L.', rating: 4, title: 'Good value', text: 'Affordable entry point for retail design. Clean Revit model.', date: '2026-01-08', verified: true },
    { id: 'r8-3', author: 'Monica A.', rating: 5, title: 'Quick turnaround', text: 'Had to deliver a retail concept in 3 days. This template made it possible.', date: '2025-12-25', verified: true },
    { id: 'r8-4', author: 'Tom B.', rating: 4, title: 'Solid template', text: 'Good base for retail projects. Easy to customize to different store types.', date: '2025-12-10', verified: true },
  ],
};

const compatibilityMap: Record<string, ProductCompatibility> = {
  '1': {
    software: 'ArchiCAD',
    versions: [
      { version: 'ArchiCAD 28', status: 'full' },
      { version: 'ArchiCAD 27', status: 'full' },
      { version: 'ArchiCAD 26', status: 'full' },
      { version: 'ArchiCAD 25', status: 'full' },
      { version: 'ArchiCAD 24', status: 'full' },
      { version: 'ArchiCAD 23', status: 'partial' },
    ],
    formats: ['.pln (native ArchiCAD)', '.pdf (plans export)', '.dwg (AutoCAD)', '.3ds (3D export)'],
  },
  '2': {
    software: 'Revit',
    versions: [
      { version: 'Revit 2025', status: 'full' },
      { version: 'Revit 2024', status: 'full' },
      { version: 'Revit 2023', status: 'full' },
      { version: 'Revit 2022', status: 'full' },
      { version: 'Revit 2021', status: 'partial' },
    ],
    formats: ['.rvt (native Revit)', '.pdf (plans export)', '.dwg (AutoCAD)', '.ifc (IFC export)'],
  },
  '3': {
    software: 'ArchiCAD',
    versions: [
      { version: 'ArchiCAD 28', status: 'full' },
      { version: 'ArchiCAD 27', status: 'full' },
      { version: 'ArchiCAD 26', status: 'full' },
      { version: 'ArchiCAD 25', status: 'full' },
    ],
    formats: ['.pln (native ArchiCAD)', '.pdf (plans export)', '.dwg (AutoCAD)'],
  },
  '4': {
    software: 'SketchUp',
    versions: [
      { version: 'SketchUp 2024', status: 'full' },
      { version: 'SketchUp 2023', status: 'full' },
      { version: 'SketchUp 2022', status: 'full' },
      { version: 'SketchUp 2021', status: 'partial' },
    ],
    formats: ['.skp (native SketchUp)', '.pdf (plans export)', '.dwg (AutoCAD)', '.3ds (3D export)'],
  },
  '5': {
    software: 'Revit',
    versions: [
      { version: 'Revit 2025', status: 'full' },
      { version: 'Revit 2024', status: 'full' },
      { version: 'Revit 2023', status: 'full' },
      { version: 'Revit 2022', status: 'full' },
    ],
    formats: ['.rvt (native Revit)', '.pdf (plans export)', '.dwg (AutoCAD)', '.ifc (IFC export)'],
  },
  '6': {
    software: 'SketchUp',
    versions: [
      { version: 'SketchUp 2024', status: 'full' },
      { version: 'SketchUp 2023', status: 'full' },
      { version: 'SketchUp 2022', status: 'full' },
    ],
    formats: ['.skp (native SketchUp)', '.pdf (plans export)', '.dwg (AutoCAD)'],
  },
  '7': {
    software: 'ArchiCAD',
    versions: [
      { version: 'ArchiCAD 28', status: 'full' },
      { version: 'ArchiCAD 27', status: 'full' },
      { version: 'ArchiCAD 26', status: 'full' },
      { version: 'ArchiCAD 25', status: 'full' },
    ],
    formats: ['.pln (native ArchiCAD)', '.pdf (plans export)', '.dwg (AutoCAD)', '.3ds (3D export)'],
  },
  '8': {
    software: 'Revit',
    versions: [
      { version: 'Revit 2025', status: 'full' },
      { version: 'Revit 2024', status: 'full' },
      { version: 'Revit 2023', status: 'full' },
    ],
    formats: ['.rvt (native Revit)', '.pdf (plans export)', '.dwg (AutoCAD)'],
  },
};

const featuresMap: Record<string, ProductFeatures> = {
  '1': {
    whatsIncluded: ['Complete 3D model', 'Floor plans (3 levels)', 'Section drawings', 'Material schedules', 'Render-ready scenes', 'Customizable layouts', 'Elevation views', 'Site plan'],
    specifications: [
      { label: 'File size', value: '45 MB' },
      { label: 'Layers', value: '24 organized layers' },
      { label: 'Objects', value: '150+ custom objects' },
      { label: 'Render engine', value: 'CineRender ready' },
      { label: 'Scale', value: '1:100 / 1:50 detail' },
    ],
  },
  '2': {
    whatsIncluded: ['Full BIM model', 'Floor plans (8 levels)', 'MEP coordination', 'Structural model', 'Curtain wall details', 'Parking layout', 'Core & shell design', 'Facade details'],
    specifications: [
      { label: 'File size', value: '120 MB' },
      { label: 'Levels', value: '8 modeled floors' },
      { label: 'Families', value: '200+ Revit families' },
      { label: 'Schedules', value: '15 pre-configured' },
      { label: 'LOD', value: 'LOD 300' },
    ],
  },
  '3': {
    whatsIncluded: ['3 complete residential templates', 'Villa + Apartment + Townhouse', 'All floor plans', 'Section drawings', 'Material schedules', 'Render scenes', 'Site plans', 'Detail drawings'],
    specifications: [
      { label: 'File size', value: '95 MB (total)' },
      { label: 'Templates', value: '3 complete projects' },
      { label: 'Layers', value: '60+ organized layers' },
      { label: 'Objects', value: '400+ custom objects' },
      { label: 'Render engine', value: 'CineRender ready' },
    ],
  },
  '4': {
    whatsIncluded: ['Complete 3D model', 'Floor plans (2 levels)', 'Interior scenes', 'Material library', 'Render-ready views', 'Furniture layout'],
    specifications: [
      { label: 'File size', value: '28 MB' },
      { label: 'Scenes', value: '12 preset scenes' },
      { label: 'Components', value: '80+ components' },
      { label: 'Textures', value: 'High-res included' },
      { label: 'Style', value: 'Minimalist modern' },
    ],
  },
  '5': {
    whatsIncluded: ['Luxury penthouse model', 'Floor plans (2 levels)', 'Terrace design', 'Interior detailing', 'Lighting design', 'Custom fixtures', 'Panoramic views setup', 'Material schedules'],
    specifications: [
      { label: 'File size', value: '85 MB' },
      { label: 'Families', value: '180+ Revit families' },
      { label: 'Schedules', value: '12 pre-configured' },
      { label: 'LOD', value: 'LOD 350' },
      { label: 'Area', value: '350m² modeled' },
    ],
  },
  '6': {
    whatsIncluded: ['Master plan layout', 'Planting schedule', 'Hardscape details', 'Irrigation zones', '3D vegetation models', 'Section profiles', 'Material palette'],
    specifications: [
      { label: 'File size', value: '52 MB' },
      { label: 'Plant species', value: '40+ modeled' },
      { label: 'Area coverage', value: '2000m² plan' },
      { label: 'Scenes', value: '8 preset views' },
      { label: 'Seasons', value: 'Summer/Winter views' },
    ],
  },
  '7': {
    whatsIncluded: ['Industrial loft model', 'Exposed structure details', 'Floor plans', 'Steel connection details', 'Interior fit-out', 'MEP routing', 'Render scenes'],
    specifications: [
      { label: 'File size', value: '62 MB' },
      { label: 'Layers', value: '20 organized layers' },
      { label: 'Objects', value: '130+ custom objects' },
      { label: 'Structure', value: 'Steel frame detailed' },
      { label: 'Area', value: '280m² loft space' },
    ],
  },
  '8': {
    whatsIncluded: ['Retail space model', 'Display fixture layouts', 'Lighting plan', 'Customer flow design', 'Signage placement', 'Material finishes'],
    specifications: [
      { label: 'File size', value: '35 MB' },
      { label: 'Families', value: '90+ Revit families' },
      { label: 'Fixtures', value: '25+ display types' },
      { label: 'Area', value: '200m² retail floor' },
      { label: 'Zones', value: '5 retail zones' },
    ],
  },
};

const productFaqMap: Record<string, FAQItem[]> = {
  default: [
    { question: "What's included in this template?", answer: 'You get the complete native project file, plus PDF exports of all plans, DWG files for AutoCAD compatibility, and render-ready 3D scenes. Everything you need to start working immediately.' },
    { question: 'Which software versions are supported?', answer: 'Check the Compatibility tab for exact version support. We generally support the latest 4-5 versions and update the template when new versions are released — at no extra cost.' },
    { question: 'Can I modify the template?', answer: 'Absolutely. The template is fully editable in your native software. Change layouts, materials, dimensions — anything you need. It is your starting point, not a locked file.' },
    { question: 'How do I download after purchase?', answer: 'Immediately after payment, you will receive a download link on the confirmation page and via email. Downloads are available forever from your account.' },
    { question: 'Do you offer refunds?', answer: 'Yes, 14-day money-back guarantee if the template does not work as described. We want you to be completely confident in your purchase.' },
  ],
};

// ── Product builder ────────────────────────────────────────────────────

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
  const images = [
    placeholder(800, 600, `${title.split(' ').slice(0, 2).join('+')}+Preview`),
    placeholder(800, 600, `${title.split(' ')[0]}+Floor+Plan`),
    placeholder(800, 600, `${title.split(' ')[0]}+3D+View`),
    placeholder(800, 600, `${title.split(' ')[0]}+Section`),
    placeholder(800, 600, `${title.split(' ')[0]}+Detail`),
    placeholder(800, 600, `${title.split(' ')[0]}+Render`),
  ];

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
    featuredImage: { url: images[0], altText: title, width: 800, height: 600 },
    images: { edges: images.map((url, i) => ({ node: { url, altText: `${title} - Image ${i + 1}`, width: 800, height: 600 } })) },
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

// Custom descriptions per product
const productDescriptions: Record<string, { desc: string; html: string }> = {
  '1': {
    desc: 'A complete 3-level modern villa in ArchiCAD with organized layers, section drawings, and render-ready scenes. Skip weeks of setup and start designing immediately.',
    html: '<p>A complete 3-level modern villa in ArchiCAD with organized layers, section drawings, and render-ready scenes. Skip weeks of setup and start designing immediately.</p>',
  },
  '2': {
    desc: 'Full BIM model of an 8-floor commercial office complex in Revit. Includes MEP coordination, curtain wall details, parking layout, and 200+ Revit families.',
    html: '<p>Full BIM model of an 8-floor commercial office complex in Revit. Includes MEP coordination, curtain wall details, parking layout, and 200+ Revit families.</p>',
  },
  '3': {
    desc: 'Three complete residential templates in one bundle — villa, apartment, and townhouse. 400+ custom objects, 60+ layers, all in ArchiCAD. Save $13 vs. buying separately.',
    html: '<p>Three complete residential templates in one bundle — villa, apartment, and townhouse. 400+ custom objects, 60+ layers, all in ArchiCAD. Save $13 vs. buying separately.</p>',
  },
  '4': {
    desc: 'Clean, modern 2-level apartment template for SketchUp. 12 preset render scenes, 80+ components, and a curated material library. Perfect for minimalist residential projects.',
    html: '<p>Clean, modern 2-level apartment template for SketchUp. 12 preset render scenes, 80+ components, and a curated material library. Perfect for minimalist residential projects.</p>',
  },
  '5': {
    desc: 'Luxury 350m² penthouse in Revit at LOD 350. Custom fixtures, panoramic view setups, lighting design, and 180+ Revit families. Present to clients and get instant approval.',
    html: '<p>Luxury 350m² penthouse in Revit at LOD 350. Custom fixtures, panoramic view setups, lighting design, and 180+ Revit families. Present to clients and get instant approval.</p>',
  },
  '6': {
    desc: 'Comprehensive 2000m² landscape master plan for SketchUp. Includes 40+ plant species, planting schedules, irrigation zones, and summer/winter views.',
    html: '<p>Comprehensive 2000m² landscape master plan for SketchUp. Includes 40+ plant species, planting schedules, irrigation zones, and summer/winter views.</p>',
  },
  '7': {
    desc: 'Detailed industrial loft conversion in ArchiCAD with exposed steel structure, 280m² open plan, MEP routing, and 130+ custom objects. Ideal for the loft conversion trend.',
    html: '<p>Detailed industrial loft conversion in ArchiCAD with exposed steel structure, 280m² open plan, MEP routing, and 130+ custom objects. Ideal for the loft conversion trend.</p>',
  },
  '8': {
    desc: 'Ready-to-use 200m² retail space in Revit with display fixtures, lighting plans, customer flow design, and 5 retail zones. Deliver retail concepts in days, not weeks.',
    html: '<p>Ready-to-use 200m² retail space in Revit with display fixtures, lighting plans, customer flow design, and 5 retail zones. Deliver retail concepts in days, not weeks.</p>',
  },
};

export const mockProducts: ShopifyProduct[] = [
  makeProduct('1', 'Modern Villa Template', 'modern-villa-template', '49.00', '69.00', 'ArchiCAD', 'Residential', ['best-seller'], 4.9, 47),
  makeProduct('2', 'Commercial Office Complex', 'commercial-office-complex', '89.00', null, 'Revit', 'Commercial', ['best-seller'], 4.8, 32),
  makeProduct('3', 'Residential Pack Bundle', 'residential-pack-bundle', '129.00', '149.00', 'ArchiCAD', 'Residential', ['bundle'], 5.0, 28),
  makeProduct('4', 'Minimalist Apartment', 'minimalist-apartment', '39.00', null, 'SketchUp', 'Residential', ['new'], 4.7, 19),
  makeProduct('5', 'Luxury Penthouse Suite', 'luxury-penthouse-suite', '79.00', null, 'Revit', 'Residential', [], 4.9, 41),
  makeProduct('6', 'Landscape Master Plan', 'landscape-master-plan', '59.00', null, 'SketchUp', 'Landscape', [], 4.6, 15),
  makeProduct('7', 'Industrial Loft Conversion', 'industrial-loft-conversion', '69.00', null, 'ArchiCAD', 'Commercial', ['new'], 4.8, 22),
  makeProduct('8', 'Retail Space Design', 'retail-space-design', '29.00', null, 'Revit', 'Commercial', [], 4.5, 11),
].map(p => {
  const custom = productDescriptions[p.id];
  if (custom) {
    return { ...p, description: custom.desc, descriptionHtml: custom.html };
  }
  return p;
});

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

// ── Accessors ──────────────────────────────────────────────────────────

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

export function getProductByHandle(handle: string): ShopifyProduct | undefined {
  return mockProducts.find(p => p.handle === handle);
}

export function getCollectionByHandle(handle: string): ShopifyCollection | undefined {
  return mockCollections.find(c => c.handle === handle);
}

export function getProductExtended(handleOrId: string): ProductExtended {
  // Try handle-based lookup first (extended data), then fall back to legacy ID-based
  const reviews = extReviewsMap[handleOrId] || reviewsMap[handleOrId] || [];
  const compatibility = extCompatibilityMap[handleOrId] || compatibilityMap[handleOrId] || {
    software: 'Universal CAD',
    versions: [
      { version: 'AutoCAD 2020–2025', status: 'full' as const },
      { version: 'ArchiCAD 24–28', status: 'full' as const },
      { version: 'Revit 2022–2025', status: 'full' as const },
      { version: 'Any .dwg-compatible software', status: 'full' as const },
    ],
    formats: ['.dwg (universal CAD format)'],
  };
  const features = extFeaturesMap[handleOrId] || featuresMap[handleOrId] || {
    whatsIncluded: ['High-quality CAD blocks', 'Universal .dwg format', 'Plan and elevation views', 'Hand-drawn style'],
    specifications: [
      { label: 'Format', value: '.dwg (universal)' },
      { label: 'Style', value: 'Hand-drawn architectural' },
    ],
  };
  return {
    reviews,
    compatibility,
    features,
    faq: productFaqMap[handleOrId] || productFaqMap['default']!,
  };
}

export function getRelatedProducts(product: ShopifyProduct, limit: number = 4): ShopifyProduct[] {
  return mockProducts
    .filter(p => p.id !== product.id)
    .sort((a, b) => {
      const aMatch = a.tags.some(t => product.tags.includes(t)) ? 1 : 0;
      const bMatch = b.tags.some(t => product.tags.includes(t)) ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, limit);
}

export const mockTestimonials: Testimonial[] = [
  { id: '1', text: 'The All-in-One AutoCAD Package saved me days of setup. Template, blocks, presets — everything was ready. I just opened it and started drawing.', author: 'Maria L.', role: 'Architect, Barcelona', rating: 5 },
  { id: '2', text: 'The hand-drawn CAD blocks are beautiful — you can tell they were made by real designers, not auto-generated. They add so much character to my drawings.', author: 'Thomas K.', role: 'Senior Architect, Berlin', rating: 5 },
  { id: '3', text: 'We bought the Complete Residential Bundle for our firm. The quality and consistency across all the block packs is impressive. Great value.', author: 'Sarah M.', role: 'Principal, London', rating: 5 },
  { id: '4', text: 'The ArchiCAD template is exactly what I needed for my thesis project. Professional quality, instant download, and the startup guide was super helpful.', author: 'Lucas R.', role: 'Architecture Student, Paris', rating: 5 },
  { id: '5', text: 'Best investment I made this year. The vegetation blocks and people blocks bring my drawings to life. Swiss quality really shows.', author: 'Ana P.', role: 'Freelance Architect, Lisbon', rating: 5 },
];

export const mockFAQ: FAQItem[] = [
  { question: 'What file formats are included?', answer: 'Templates include native files for the respective software (AutoCAD, ArchiCAD, or Revit). All CAD blocks are in universal .dwg format, compatible with any CAD software.' },
  { question: 'How do I receive my purchase?', answer: 'Instantly! A download link is sent to your email the moment your payment is confirmed. No waiting, no approval process.' },
  { question: 'Can I use this for commercial projects?', answer: 'Yes. The license covers professional use for your own projects. Redistribution or resale of the files is not permitted.' },
  { question: 'Can I use the blocks in other software?', answer: 'Yes. The CAD blocks are in universal .dwg format, compatible with AutoCAD, ArchiCAD, Revit, SketchUp, and most other CAD programs.' },
  { question: 'Do you offer refunds?', answer: 'Yes, we offer a 14-day money-back guarantee if the product doesn\'t work as described. Contact us at contact@architectureparadise.com and we\'ll make it right.' },
  { question: 'How do I get support?', answer: 'Email us at contact@architectureparadise.com. We respond within 24 hours — and our support team actually uses architecture software, so we understand your questions.' },
];
