export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  content: string;
  author: {
    name: string;
    bio: string;
    image: string;
  };
  publishedAt: string;
  categories: string[];
  tags: string[];
  readingTime: number;
}

const placeholder = (w: number, h: number, label: string) =>
  `https://placehold.co/${w}x${h}/1A1A2E/E8A838?text=${encodeURIComponent(label)}`;

export const mockBlogPosts: BlogPost[] = [
  {
    slug: 'archicad-vs-revit-vs-sketchup',
    title: 'ArchiCAD vs Revit vs SketchUp: Which Is Best for Your Practice in 2026?',
    excerpt: 'An honest, side-by-side comparison of the three most popular architecture software platforms — pricing, workflows, learning curve, and which one fits your firm size.',
    featuredImage: placeholder(1200, 630, 'ArchiCAD+vs+Revit+vs+SketchUp'),
    author: {
      name: 'Marco Pellegrini',
      bio: 'Licensed architect and BIM specialist with 12 years of experience across ArchiCAD, Revit, and SketchUp.',
      image: placeholder(100, 100, 'MP'),
    },
    publishedAt: '2026-01-28',
    categories: ['Software Guides'],
    tags: ['archicad', 'revit', 'sketchup', 'comparison', 'BIM'],
    readingTime: 12,
    content: `## The Big Question Every Architect Asks

Choosing architecture software isn't just a technical decision — it's a business one. The platform you pick shapes your workflow, your hiring pool, your collaboration options, and ultimately how fast you can deliver projects.

In 2026, three platforms dominate the market: **ArchiCAD**, **Revit**, and **SketchUp**. Each has evolved significantly, and the "best" choice depends entirely on your practice size, project types, and team structure.

Let's break it down honestly.

## Quick Comparison Table

| Feature | ArchiCAD 28 | Revit 2025 | SketchUp 2024 |
|---|---|---|---|
| **Price (annual)** | ~$4,500 | ~$3,885 | $349-$749 |
| **Learning curve** | Moderate | Steep | Easy |
| **Best for** | Small-mid firms | Mid-large firms | Concept design |
| **BIM capability** | Full BIM | Full BIM | Limited |
| **Platform** | Mac + Windows | Windows only | Mac + Windows + Web |
| **Collaboration** | BIMcloud | BIM 360 | Trimble Connect |
| **Rendering** | Built-in + plugins | Built-in + plugins | V-Ray, Enscape |

## ArchiCAD: The Architect's Choice

ArchiCAD has always been designed by architects, for architects. Version 28 brings significant improvements to algorithmic design and real-time collaboration.

### Strengths
- **Intuitive interface** — feels like drawing, not programming
- **Mac native** — the only major BIM platform that runs natively on macOS
- **BIMcloud** — excellent real-time collaboration without file conflicts
- **Speed** — handles large models efficiently on standard hardware
- **Open BIM** — strong IFC support for multi-platform workflows

### Weaknesses
- **Smaller market share** — fewer firms use it, which can limit collaboration
- **Plugin ecosystem** — smaller than Revit's
- **Structural engineering** — less robust than Revit for complex structures
- **Regional dominance** — more popular in Europe and Asia than North America

### Best For
- Solo practitioners and small firms (2-15 people)
- Firms that use macOS
- Design-focused practices that value workflow speed
- European and Asian markets

## Revit: The Industry Standard

Revit dominates the BIM market, especially in North America and for large-scale projects. It's the platform most firms default to, and for good reason.

### Strengths
- **Industry standard** — required by most large firms and government projects
- **Ecosystem** — thousands of families, plugins, and add-ons available
- **Multi-discipline** — architecture, structure, and MEP in one platform
- **Dynamo** — powerful computational design tool built in
- **Documentation** — arguably the best construction documentation workflow

### Weaknesses
- **Windows only** — no native macOS support
- **Performance** — heavy on hardware, especially with large models
- **Learning curve** — steeper initial learning period
- **Cost** — subscription model can be expensive for small firms
- **Rigidity** — the "Revit way" can feel constraining for design exploration

### Best For
- Mid to large firms (15+ people)
- Firms working on institutional, healthcare, or government projects
- Multi-discipline coordination (architecture + structure + MEP)
- North American market

## SketchUp: The Design Explorer

SketchUp occupies a unique position — it's not a full BIM platform, but it's unmatched for early-stage design exploration and client presentations.

### Strengths
- **Easiest to learn** — productive within days, not weeks
- **Speed of iteration** — fastest from concept to 3D model
- **Client communication** — intuitive enough for clients to understand
- **Web version** — accessible anywhere, any device
- **Price** — significantly cheaper than ArchiCAD or Revit
- **3D Warehouse** — massive library of free models

### Weaknesses
- **Not full BIM** — limited documentation capability
- **Scaling issues** — struggles with very large, complex models
- **Professional perception** — sometimes seen as "not serious enough"
- **Limited parametric design** — no built-in computational tools
- **Export quality** — DWG exports need cleanup for production use

### Best For
- Concept and schematic design phases
- Client presentations and design reviews
- Small residential practices
- Architecture students
- Firms that pair it with a BIM tool for documentation

## The Hybrid Approach: What Top Firms Actually Do

Here's what most successful firms don't tell you: they use multiple tools.

A common workflow in 2026:
1. **SketchUp** for concept design and client presentations
2. **ArchiCAD or Revit** for design development and construction documentation
3. **Rhino/Grasshopper** for complex geometry and parametric design

The key is matching the tool to the phase, not forcing one tool to do everything.

## Our Recommendation by Firm Size

### Solo / 1-3 People
**ArchiCAD** or **SketchUp Pro** — depending on whether you need full BIM documentation or focus on design.

### Small Firm / 4-15 People
**ArchiCAD** — best balance of power, speed, and collaboration for this size. Consider Revit if your market demands it.

### Mid Firm / 15-50 People
**Revit** — the collaboration and multi-discipline tools justify the learning curve and cost at this scale.

### Large Firm / 50+ People
**Revit** — industry standard, largest talent pool, best enterprise collaboration.

## The Template Advantage

Whichever platform you choose, starting with professional templates can save you 40+ hours per project. At Architecture Paradise, we offer production-ready templates for all three platforms:

- [ArchiCAD Templates](/boutique/archicad) — 45+ professional templates
- [Revit Templates](/boutique/revit) — 32+ professional templates  
- [SketchUp Templates](/boutique/sketchup) — 28+ professional templates

Every template is designed by practicing architects who use these platforms daily.

## Conclusion

There's no universally "best" software — only the best fit for your specific situation. Consider your firm size, project types, team skills, and market before deciding. And remember: the tool is just a tool. Great architecture comes from great architects, regardless of the software.

---

*Have questions about choosing the right platform? Email us at contact@architectureparadise.com — our team uses all three daily and can give you honest advice.*`,
  },
  {
    slug: 'how-to-create-residential-floor-plan-archicad',
    title: 'How to Create a Residential Floor Plan in ArchiCAD: Step-by-Step Guide',
    excerpt: 'A practical, step-by-step tutorial for creating professional residential floor plans in ArchiCAD — from project setup to final documentation.',
    featuredImage: placeholder(1200, 630, 'ArchiCAD+Floor+Plan+Tutorial'),
    author: {
      name: 'Marco Pellegrini',
      bio: 'Licensed architect and BIM specialist with 12 years of experience across ArchiCAD, Revit, and SketchUp.',
      image: placeholder(100, 100, 'MP'),
    },
    publishedAt: '2026-02-05',
    categories: ['Tutorials'],
    tags: ['archicad', 'floor plan', 'tutorial', 'residential'],
    readingTime: 15,
    content: `## Why Start With a Good Floor Plan?

The floor plan is the backbone of every residential project. It communicates spatial relationships, circulation, room sizes, and building logic — all in a single drawing. Getting it right from the start saves countless hours of revisions later.

In this guide, we'll walk through creating a professional residential floor plan in ArchiCAD, step by step.

## Prerequisites

- ArchiCAD 25 or newer installed
- Basic familiarity with the ArchiCAD interface
- A rough sketch or program of your residential project

## Step 1: Project Setup

### Template Selection
Start with a proper template — not a blank file. A good template includes:
- Pre-configured layers and layer combinations
- Standard pen sets for your region
- Dimension and label defaults
- Title block and layout setup

> **Pro tip:** Our [Modern Villa Template](/produits/modern-villa-template) includes all of this pre-configured, saving you the first 2-3 hours of setup.

### Grid and Story Setup
1. Open **Design > Story Settings**
2. Set your ground floor at 0.00m
3. Add stories as needed (typical residential: Basement -3.00m, Ground 0.00m, First 3.00m, Roof 6.00m)
4. Configure story-level visibility for each layer combination

### Unit Settings
Navigate to **Options > Project Preferences > Working Units**
- Set to millimeters or meters depending on your preference
- Dimension accuracy: 1mm for plans, 0.1mm for details

## Step 2: Drawing the Walls

### Exterior Walls
1. Select the **Wall Tool** (W shortcut)
2. Set wall type: exterior load-bearing (typically 300-400mm)
3. Choose your construction method: single-click for straight walls, or use the rectangle method for rooms
4. Draw the building perimeter following your sketch

**Key settings:**
- Reference line: Center or Outside face (be consistent)
- Wall height: Link to story above
- Material: Set your exterior finish material

### Interior Walls
1. Change wall type to interior partition (typically 100-150mm)
2. Draw room dividers
3. Use **T-connections** and **L-connections** for proper wall joins

### Wall Cleanup Tips
- Use **Design > Connect > Trim Elements** to fix wall intersections
- Check wall layers in section to ensure proper construction logic
- Use composite walls for walls with multiple layers (insulation, finishes, etc.)

## Step 3: Placing Doors and Windows

### Doors
1. Select the **Door Tool** (D shortcut)
2. Place doors in walls — ArchiCAD automatically creates the opening
3. Standard door sizes:
   - Interior: 800-900mm wide × 2100mm high
   - Entrance: 900-1000mm wide × 2100mm high
   - Bathroom: 700-800mm wide × 2100mm high

### Windows
1. Select the **Window Tool**
2. Standard sill heights:
   - Living areas: 900mm
   - Bedrooms: 900mm
   - Bathrooms: 1400mm (privacy)
   - Kitchen: 900-1000mm (above counter)
3. Size windows proportionally to room size — generally 15-20% of floor area for adequate natural light

## Step 4: Room Layout Best Practices

### Circulation
- Main circulation paths: minimum 1200mm wide
- Corridors: 1000-1200mm minimum
- Avoid dead-end corridors longer than 7.5m

### Room Sizes (Minimum Recommended)
| Room | Minimum Size |
|---|---|
| Master bedroom | 14 m² |
| Secondary bedroom | 10 m² |
| Living room | 20 m² |
| Kitchen | 10 m² |
| Bathroom | 5 m² |
| WC | 1.5 m² |
| Entrance/Hall | 4 m² |

### Zoning
Organize rooms by zone:
- **Day zone:** Living, dining, kitchen — connected, open flow
- **Night zone:** Bedrooms, bathrooms — private, separated from day zone
- **Service zone:** Laundry, storage, mechanical — away from living areas

## Step 5: Adding Furniture and Fixtures

### Using ArchiCAD's Built-in Library
1. Open the **Object Tool** (shortcut: O)
2. Browse the residential library for standard furniture
3. Place furniture to verify room sizes work in practice

### Kitchen Layout
Follow the work triangle principle:
- Refrigerator → Sink → Stove should form a triangle
- Each leg: 1.2m - 2.7m
- Total triangle perimeter: 4m - 8m

### Bathroom Layout
- Minimum clearances around fixtures
- Shower: 900×900mm minimum
- Bathtub: verify door swing doesn't conflict

## Step 6: Dimensions and Annotations

### Adding Dimensions
1. Select the **Dimension Tool**
2. Click on wall faces to create dimension chains
3. Standard practice: dimension to wall face, not centerline
4. Include:
   - Overall building dimensions
   - Room dimensions (internal)
   - Door/window positions
   - Setbacks from property boundaries

### Room Labels
1. Use the **Zone Tool** to define rooms
2. Zones automatically calculate and display:
   - Room name
   - Floor area
   - Zone number/code
3. Create a zone schedule for area summaries

### Level Annotations
- Mark finished floor levels (±0.00)
- Show step-ups/step-downs
- Reference external ground level

## Step 7: Layer Organization

### Recommended Layer Structure
- **A-WALL-EXT** — Exterior walls
- **A-WALL-INT** — Interior walls  
- **A-DOOR** — Doors
- **A-WIND** — Windows
- **A-FURN** — Furniture
- **A-ANNO** — Annotations and dimensions
- **A-ZONE** — Room zones
- **A-GRID** — Structural grid
- **A-SITE** — Site elements

### Layer Combinations
Set up combinations for different output:
- **Floor Plan** — all layers visible
- **Structural** — walls, grid, structure only
- **Presentation** — furniture, zones, finishes visible
- **Construction** — dimensions, annotations, no furniture

## Step 8: Export and Documentation

### PDF Export
1. Go to **File > Publish**
2. Select PDF format
3. Settings: Vector PDF, 300 DPI for images
4. Include: title block, scale bar, north arrow

### DWG Export
1. **File > Save As > DWG**
2. Use translator: "ArchiCAD to AutoCAD" default
3. Verify layer mapping in the translator settings

## Save Time: Start With a Template

Creating all of this from scratch takes 20-40 hours depending on complexity. Our residential templates include everything mentioned in this guide, pre-configured and ready to customize:

- [Modern Villa Template](/produits/modern-villa-template) — €49
- [Residential Pack Bundle](/produits/residential-pack-bundle) — €129 (3 templates)
- [Minimalist Apartment](/produits/minimalist-apartment) — €39

Each template includes floor plans, sections, elevations, 3D model, and documentation — ready to adapt to your specific project.

---

*Questions about ArchiCAD workflows? Reach out at contact@architectureparadise.com — our team includes ArchiCAD-certified professionals who can help.*`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return mockBlogPosts.find((p) => p.slug === slug);
}
