'use client';

import { useState } from 'react';

// ── Template handles ───────────────────────────────────────────────────
const TEMPLATE_HANDLES = [
  'all-cad-template-complete-package',
  'all-in-one-archicad-template',
  'all-in-one-revit-template',
] as const;

type TemplateHandle = (typeof TEMPLATE_HANDLES)[number];

export function isTemplateHandle(handle: string): handle is TemplateHandle {
  return (TEMPLATE_HANDLES as readonly string[]).includes(handle);
}

// ── Data per template ──────────────────────────────────────────────────

interface TemplateData {
  whyCards: { icon: string; title: string; description: string }[];
  whatsInside: string[];
  beforeAfter: { without: string; with: string }[];
}

const templateData: Record<TemplateHandle, TemplateData> = {
  'all-cad-template-complete-package': {
    whyCards: [
      {
        icon: '⏱️',
        title: 'Save 40+ Hours of Setup',
        description:
          'Skip creating layers, styles, titleblocks and pen settings from scratch. Open the .DWT and start drawing immediately.',
      },
      {
        icon: '📐',
        title: 'BS/ISO Layer Standards',
        description:
          'Pre-organized layers by discipline — A- for Architectural, S- for Structural, M- for MEP. Ready for professional projects.',
      },
      {
        icon: '🔄',
        title: 'Print-Perfect Every Time',
        description:
          'Calibrated .CTB pen settings ensure your line weights are consistent across every drawing you produce.',
      },
    ],
    whatsInside: [
      'Professional titleblock with dynamic fields (project name, date, scale, revision)',
      '50+ organized layers following BS/ISO industry standards',
      'Dynamic blocks: doors (15 types), windows (12 types), annotations',
      '.CTB pen settings — calibrated line weights for print',
      '.DWT drawing template — every new file starts right',
      'Starter guide PDF — get productive in 10 minutes',
      'Multiple scale viewports pre-configured (1:50, 1:100, 1:200)',
      'Dimension styles, text styles, multileader styles',
    ],
    beforeAfter: [
      { without: '2-3 days configuring layers & styles', with: 'Start drawing in 10 minutes' },
      { without: 'Random layer names nobody understands', with: 'BS/ISO organized layer system' },
      { without: 'Default AutoCAD titleblock', with: 'Professional titleblock with dynamic fields' },
      { without: 'Wrong line weights on every print', with: 'Calibrated .CTB pen settings' },
      { without: 'Every project looks different', with: 'Consistent quality across all drawings' },
    ],
  },
  'all-in-one-archicad-template': {
    whyCards: [
      {
        icon: '⏱️',
        title: 'Skip Weeks of BIM Setup',
        description:
          'Layers, pen sets, favorites, view maps — all pre-configured. Open the .TPL and start modeling your project.',
      },
      {
        icon: '📐',
        title: 'Complete BIM Workflow',
        description:
          'From 3D model to printed drawings: views, layouts, and publisher sets are ready. IFC export configured for OpenBIM.',
      },
      {
        icon: '🔄',
        title: 'Office-Grade Standards',
        description:
          'Every project starts with the same layer combinations, pen sets, and favorites. Your portfolio stays consistent.',
      },
    ],
    whatsInside: [
      'Complete layer system with layer combinations',
      'Pre-configured pen sets and surfaces',
      'Tool favorites (walls, slabs, roofs, columns)',
      'View Maps with standard floor plans, sections, elevations',
      'Publisher sets for automated PDF export',
      'Titleblock with dynamic project fields',
      'BIM-ready: IFC export configured',
      'Starter guide PDF',
    ],
    beforeAfter: [
      { without: 'Weeks setting up your BIM template', with: 'Start modeling in 10 minutes' },
      { without: 'Messy layers with no combinations', with: 'Organized layers + combinations' },
      { without: 'Generic pen sets and surfaces', with: 'Professional pen sets & materials' },
      { without: 'Manual PDF export every time', with: 'One-click Publisher set export' },
      { without: 'Inconsistent project deliverables', with: 'Office-standard quality on every project' },
    ],
  },
  'all-in-one-revit-template': {
    whyCards: [
      {
        icon: '⏱️',
        title: 'Save 40+ Hours Per Project',
        description:
          'Project Browser organized, view templates set, families loaded. Open the .RTE and jump straight into design.',
      },
      {
        icon: '📐',
        title: '100+ Verified Families',
        description:
          'Pre-loaded families with proper naming conventions. No broken imports, no mystery categories in your model.',
      },
      {
        icon: '🔄',
        title: 'Built-in Quality Control',
        description:
          'Naming conventions and view templates ensure consistency. Spot foreign elements instantly.',
      },
    ],
    whatsInside: [
      'Organized Project Browser (views, sheets, schedules, legends)',
      'View Templates for plans, sections, elevations, 3D',
      '100+ pre-loaded and verified Revit families',
      'Pre-configured schedules (doors, windows, rooms, materials)',
      'Standardized line weights, text styles, dimension styles',
      'Fill patterns and detail components',
      'Professional titleblock with shared parameters',
      'Naming convention system for quality control',
    ],
    beforeAfter: [
      { without: 'Hours organizing the Project Browser', with: 'Clean structure from the start' },
      { without: 'Downloading random families online', with: '100+ verified families pre-loaded' },
      { without: 'Inconsistent line weights & text', with: 'Standardized graphic styles' },
      { without: 'Creating schedules from scratch', with: 'Pre-built schedules ready to use' },
      { without: 'No naming convention = chaos', with: 'Built-in naming system for QC' },
    ],
  },
};

const personas = [
  {
    icon: '👩‍🎓',
    title: 'Architecture Students',
    description: 'Focus on design, not setup. Ace your projects with professional-grade deliverables.',
  },
  {
    icon: '🏢',
    title: 'Small Firms',
    description: 'Instant office standards without months of template development.',
  },
  {
    icon: '💼',
    title: 'Freelancers',
    description: 'Look professional from day one with every client.',
  },
  {
    icon: '🏗️',
    title: 'Project Managers',
    description: "Ensure consistency across your team's output.",
  },
];

// ── Component ──────────────────────────────────────────────────────────

export default function ProductShowcase({ handle }: { handle: string }) {
  const [insideExpanded, setInsideExpanded] = useState(false);

  if (!isTemplateHandle(handle)) return null;

  const data = templateData[handle];

  return (
    <section className="border-t border-border">
      {/* ── Why You Need This Template ── */}
      <div className="px-4 py-12 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Why You Need This Template
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.whyCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-border bg-surface p-6 text-center transition-shadow hover:shadow-lg"
            >
              <span className="text-4xl block mb-4">{card.icon}</span>
              <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── What's Inside ── */}
      <div className="px-4 py-12 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          What&apos;s Inside
        </h2>
        <div className="max-w-2xl mx-auto space-y-3">
          {data.whatsInside.slice(0, insideExpanded ? undefined : 5).map((item) => (
            <div key={item} className="flex items-start gap-3">
              <span className="text-green-500 mt-0.5 shrink-0">✅</span>
              <span className="text-sm md:text-base">{item}</span>
            </div>
          ))}
          {data.whatsInside.length > 5 && !insideExpanded && (
            <button
              onClick={() => setInsideExpanded(true)}
              className="text-[var(--color-accent)] hover:underline text-sm font-medium mt-2"
            >
              + {data.whatsInside.length - 5} more items
            </button>
          )}
        </div>
      </div>

      {/* ── Perfect For ── */}
      <div className="px-4 py-12 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Perfect For
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {personas.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-surface p-5 text-center"
            >
              <span className="text-3xl block mb-3">{p.icon}</span>
              <h3 className="font-semibold mb-1">{p.title}</h3>
              <p className="text-muted text-sm">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Before vs After ── */}
      <div className="px-4 py-12 md:px-8 lg:px-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
          Before vs After
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {/* Without */}
          <div className="rounded-2xl bg-surface-alt border border-border p-6">
            <h3 className="font-semibold text-text-primary mb-4 text-center text-base">
              Without a template
            </h3>
            <ul className="space-y-3">
              {data.beforeAfter.map((row) => (
                <li key={row.without} className="flex items-start gap-3 text-sm text-text-secondary">
                  <span className="shrink-0 mt-0.5 text-error text-base">✕</span>
                  {row.without}
                </li>
              ))}
            </ul>
          </div>
          {/* With */}
          <div className="rounded-2xl bg-primary p-6">
            <h3 className="font-semibold text-white mb-4 text-center text-base">
              With our template
            </h3>
            <ul className="space-y-3">
              {data.beforeAfter.map((row) => (
                <li key={row.with} className="flex items-start gap-3 text-sm text-white/85">
                  <span className="shrink-0 mt-0.5 text-accent text-base">✓</span>
                  {row.with}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
