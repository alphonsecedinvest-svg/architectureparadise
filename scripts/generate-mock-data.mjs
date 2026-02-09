#!/usr/bin/env node
// Generate mock-data-extended.ts with reviews, features, compatibility for all 25 products

const products = [
  { handle: 'all-cad-template-complete-package', title: 'All-in-One Autocad Package', type: 'template', software: 'AutoCAD' },
  { handle: 'hospital-people', title: 'Healthcare people', type: 'blocks', software: 'AutoCAD', category: 'people', program: 'healthcare' },
  { handle: 'residential-people', title: 'Residential people', type: 'blocks', software: 'AutoCAD', category: 'people', program: 'residential' },
  { handle: 'residential-furniture', title: 'Residential furniture', type: 'blocks', software: 'AutoCAD', category: 'furniture', program: 'residential' },
  { handle: 'residential-furniture-2', title: 'Residential Furniture 2', type: 'blocks', software: 'AutoCAD', category: 'furniture', program: 'residential' },
  { handle: 'residential-environement', title: 'Residential environement', type: 'blocks', software: 'AutoCAD', category: 'environment', program: 'residential' },
  { handle: 'complete-residential-bundle', title: 'Complete Residential Bundle', type: 'bundle', software: 'AutoCAD', program: 'residential' },
  { handle: 'complete-healthcare-bundle', title: 'Complete Healthcare Bundle', type: 'bundle', software: 'AutoCAD', program: 'healthcare' },
  { handle: 'healthcare-furniture', title: 'Healthcare furniture and environement', type: 'blocks', software: 'AutoCAD', category: 'furniture', program: 'healthcare' },
  { handle: 'healthcare-waiting-room', title: 'Waiting room', type: 'blocks', software: 'AutoCAD', category: 'furniture', program: 'healthcare' },
  { handle: 'complete-urban-bundle', title: 'Complete Urban Bundle', type: 'bundle', software: 'AutoCAD', program: 'urban' },
  { handle: 'urban-people', title: 'Urban People', type: 'blocks', software: 'AutoCAD', category: 'people', program: 'urban' },
  { handle: 'urban-furniture', title: 'Urban Furniture', type: 'blocks', software: 'AutoCAD', category: 'furniture', program: 'urban' },
  { handle: 'urban-environment', title: 'Urban Environment', type: 'blocks', software: 'AutoCAD', category: 'environment', program: 'urban' },
  { handle: 'restaurant-bar-furniture', title: 'Restaurant & Bar Furniture', type: 'blocks', software: 'AutoCAD', category: 'furniture', program: 'restaurant' },
  { handle: 'full-pack-of-3-collections', title: 'Full Pack of all Block Collections #1', type: 'bundle', software: 'AutoCAD', program: 'all' },
  { handle: 'all-in-one-archicad-template', title: 'All-in-One ArchiCad Template', type: 'template', software: 'ArchiCAD' },
  { handle: 'all-in-one-revit-template', title: 'All-in-One Revit Template', type: 'template', software: 'Revit' },
  { handle: 'trees-and-shrubs-in-plan', title: 'Trees and shrubs in floor plan', type: 'blocks', software: 'AutoCAD', category: 'vegetation', program: 'landscape' },
  { handle: 'minimal-vegetation-in-elevation', title: 'Minimal vegetation in elevation', type: 'blocks', software: 'AutoCAD', category: 'vegetation', program: 'landscape' },
  { handle: 'copy-of-residential-furniture', title: 'Office furniture in elevation and floor plan', type: 'blocks', software: 'AutoCAD', category: 'furniture', program: 'office' },
  { handle: 'complete-bundle-cutout-painting-vegetation', title: 'Complete Bundle Cutout painting vegetation', type: 'bundle', software: 'Photoshop', program: 'vegetation' },
  { handle: 'cad-blocks-pack-of-working-people', title: 'Cad blocks pack of working people', type: 'blocks', software: 'AutoCAD', category: 'people', program: 'office' },
  { handle: 'cad-blocks-pack-of-sporty-people', title: 'Cad blocks pack of sporty people', type: 'blocks', software: 'AutoCAD', category: 'people', program: 'sports' },
  { handle: 'mumbai-studio-vegetation-trees', title: 'Mumbai Studio vegetation trees', type: 'blocks', software: 'AutoCAD', category: 'vegetation', program: 'landscape' },
];

// Names pool
const firstNames = [
  'Emma','Liam','Sofia','Noah','Isabella','Oliver','Mia','Lucas','Charlotte','Ethan',
  'Amelia','Mason','Harper','James','Evelyn','Benjamin','Abigail','Elijah','Emily','Logan',
  'Yuki','Hiroshi','Sakura','Takeshi','Mei','Wei','Li','Chen','Jin','Hana',
  'Maria','Carlos','Ana','Pedro','Lucia','Diego','Elena','Marco','Valentina','Alejandro',
  'Pierre','Marie','Antoine','Camille','Hugo','Léa','Louis','Chloé','Théo','Manon',
  'Thomas','Sarah','Jan','Anna','Felix','Laura','Max','Sophie','Paul','Julia',
  'Raj','Priya','Arjun','Ananya','Vikram','Neha','Sanjay','Aisha','Rohan','Divya',
  'Mohammed','Fatima','Omar','Yasmine','Ali','Noor','Hassan','Layla','Khalid','Rania',
  'Giovanni','Francesca','Alessandro','Giulia','Matteo','Chiara','Luca','Beatrice','Andrea','Elisa',
  'Olga','Dmitri','Natasha','Ivan','Svetlana','Boris','Katya','Andrei','Irina','Pavel',
  'Erik','Astrid','Lars','Freya','Sven','Ingrid','Nils','Sigrid','Gustav','Helena',
  'Patrick','Siobhan','Sean','Aoife','Ciaran','Maeve','Declan','Niamh','Rory','Saoirse',
  'Tariq','Zara','Hamza','Safiya','Youssef','Malika','Karim','Amina','Rachid','Fatou',
  'Kenji','Akiko','Daichi','Emi','Shota','Nanami','Ryota','Ayaka','Haruto','Misaki',
  'David','Rachel','Michael','Rebecca','Daniel','Hannah','Jonathan','Miriam','Nathan','Leah',
  'Kofi','Ama','Kwame','Akua','Yaw','Efua','Kojo','Adjoa','Kwesi','Abena',
  'Mateo','Catalina','Santiago','Valeria','Sebastian','Mariana','Nicolas','Camila','Andres','Isabella',
  'Leo','Clara','Oskar','Lena','Franz','Greta','Moritz','Johanna','Florian','Katharina',
  'Bruno','Isabelle','Rafael','Manuela','Thiago','Juliana','Gustavo','Fernanda','Henrique','Bianca',
  'Finn','Maja','Jasper','Nora','Milo','Ella','Levi','Luna','Tobias','Mila',
];
const lastInitials = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function pickName(seed) {
  const fi = seed % firstNames.length;
  const li = (seed * 7 + 3) % lastInitials.length;
  return `${firstNames[fi]} ${lastInitials[li]}.`;
}

// Location pools with weighted distribution
const locationPools = [
  // USA ~30% (30 entries)
  ...Array(5).fill('New York, USA'),
  ...Array(4).fill('Los Angeles, USA'),
  ...Array(4).fill('Chicago, USA'),
  ...Array(3).fill('San Francisco, USA'),
  ...Array(3).fill('Miami, USA'),
  ...Array(3).fill('Austin, USA'),
  ...Array(3).fill('Seattle, USA'),
  ...Array(2).fill('Boston, USA'),
  ...Array(2).fill('Portland, USA'),
  ...Array(1).fill('Denver, USA'),
  // UK ~15% (15 entries)
  ...Array(5).fill('London, UK'),
  ...Array(3).fill('Manchester, UK'),
  ...Array(2).fill('Edinburgh, UK'),
  ...Array(2).fill('Bristol, UK'),
  ...Array(2).fill('Leeds, UK'),
  ...Array(1).fill('Birmingham, UK'),
  // Germany ~12% (12 entries)
  ...Array(3).fill('Berlin, Germany'),
  ...Array(3).fill('Munich, Germany'),
  ...Array(2).fill('Hamburg, Germany'),
  ...Array(2).fill('Frankfurt, Germany'),
  ...Array(1).fill('Stuttgart, Germany'),
  ...Array(1).fill('Cologne, Germany'),
  // Australia ~10% (10 entries)
  ...Array(3).fill('Sydney, Australia'),
  ...Array(3).fill('Melbourne, Australia'),
  ...Array(2).fill('Brisbane, Australia'),
  ...Array(1).fill('Perth, Australia'),
  ...Array(1).fill('Adelaide, Australia'),
  // France ~8% (8 entries)
  ...Array(3).fill('Paris, France'),
  ...Array(2).fill('Lyon, France'),
  ...Array(1).fill('Marseille, France'),
  ...Array(1).fill('Bordeaux, France'),
  ...Array(1).fill('Toulouse, France'),
  // Rest of Europe ~15% (15 entries)
  ...Array(2).fill('Amsterdam, Netherlands'),
  ...Array(2).fill('Barcelona, Spain'),
  ...Array(2).fill('Milan, Italy'),
  ...Array(1).fill('Zurich, Switzerland'),
  ...Array(1).fill('Vienna, Austria'),
  ...Array(1).fill('Copenhagen, Denmark'),
  ...Array(2).fill('Stockholm, Sweden'),
  ...Array(1).fill('Oslo, Norway'),
  ...Array(1).fill('Lisbon, Portugal'),
  ...Array(1).fill('Dublin, Ireland'),
  ...Array(1).fill('Prague, Czech Republic'),
  // Rest of World ~10% (10 entries)
  ...Array(2).fill('Toronto, Canada'),
  ...Array(2).fill('Tokyo, Japan'),
  ...Array(1).fill('Singapore, Singapore'),
  ...Array(1).fill('Dubai, UAE'),
  ...Array(1).fill('São Paulo, Brazil'),
  ...Array(1).fill('Mumbai, India'),
  ...Array(1).fill('Seoul, South Korea'),
  ...Array(1).fill('Cape Town, South Africa'),
];

// Name-to-region mapping for plausible matching
const nameLocationMap = {
  'Yuki': 'Tokyo, Japan', 'Hiroshi': 'Tokyo, Japan', 'Sakura': 'Tokyo, Japan', 'Takeshi': 'Tokyo, Japan',
  'Kenji': 'Tokyo, Japan', 'Akiko': 'Tokyo, Japan', 'Daichi': 'Tokyo, Japan', 'Emi': 'Tokyo, Japan',
  'Shota': 'Tokyo, Japan', 'Nanami': 'Tokyo, Japan', 'Ryota': 'Tokyo, Japan', 'Ayaka': 'Tokyo, Japan',
  'Haruto': 'Tokyo, Japan', 'Misaki': 'Tokyo, Japan',
  'Pierre': 'Paris, France', 'Marie': 'Lyon, France', 'Antoine': 'Paris, France', 'Camille': 'Bordeaux, France',
  'Hugo': 'Paris, France', 'Léa': 'Lyon, France', 'Louis': 'Paris, France', 'Chloé': 'Marseille, France',
  'Théo': 'Toulouse, France', 'Manon': 'Paris, France',
  'Thomas': 'Berlin, Germany', 'Jan': 'Hamburg, Germany', 'Felix': 'Munich, Germany', 'Max': 'Berlin, Germany',
  'Paul': 'Frankfurt, Germany', 'Anna': 'Munich, Germany', 'Sophie': 'Berlin, Germany', 'Laura': 'Stuttgart, Germany',
  'Raj': 'Mumbai, India', 'Priya': 'Mumbai, India', 'Arjun': 'Mumbai, India', 'Ananya': 'Mumbai, India',
  'Vikram': 'Mumbai, India', 'Neha': 'Mumbai, India', 'Sanjay': 'Mumbai, India', 'Rohan': 'Mumbai, India',
  'Giovanni': 'Milan, Italy', 'Francesca': 'Milan, Italy', 'Alessandro': 'Milan, Italy', 'Giulia': 'Milan, Italy',
  'Matteo': 'Milan, Italy', 'Chiara': 'Milan, Italy', 'Luca': 'Milan, Italy', 'Beatrice': 'Milan, Italy',
  'Erik': 'Stockholm, Sweden', 'Astrid': 'Stockholm, Sweden', 'Lars': 'Copenhagen, Denmark', 'Sven': 'Stockholm, Sweden',
  'Nils': 'Oslo, Norway', 'Gustav': 'Stockholm, Sweden',
  'Patrick': 'Dublin, Ireland', 'Siobhan': 'Dublin, Ireland', 'Sean': 'Dublin, Ireland', 'Aoife': 'Dublin, Ireland',
  'Ciaran': 'Dublin, Ireland', 'Maeve': 'Dublin, Ireland', 'Declan': 'Dublin, Ireland', 'Niamh': 'Dublin, Ireland',
  'Mohammed': 'Dubai, UAE', 'Fatima': 'Dubai, UAE', 'Omar': 'Dubai, UAE', 'Ali': 'Dubai, UAE',
  'Hassan': 'Dubai, UAE', 'Khalid': 'Dubai, UAE',
  'Carlos': 'São Paulo, Brazil', 'Pedro': 'São Paulo, Brazil', 'Mateo': 'Barcelona, Spain',
  'Santiago': 'Barcelona, Spain', 'Alejandro': 'Barcelona, Spain',
  'Mei': 'Singapore, Singapore', 'Wei': 'Singapore, Singapore', 'Li': 'Singapore, Singapore',
  'Chen': 'Singapore, Singapore', 'Jin': 'Seoul, South Korea',
  'Kofi': 'Cape Town, South Africa', 'Kwame': 'Cape Town, South Africa',
  'James': 'London, UK', 'Oliver': 'London, UK', 'Charlotte': 'London, UK', 'Benjamin': 'Manchester, UK',
  'Emma': 'New York, USA', 'Liam': 'Chicago, USA', 'Noah': 'Los Angeles, USA', 'Mason': 'San Francisco, USA',
  'Ethan': 'Austin, USA', 'Logan': 'Seattle, USA', 'Elijah': 'Boston, USA',
  'Olga': 'Prague, Czech Republic', 'Dmitri': 'Prague, Czech Republic', 'Natasha': 'Vienna, Austria',
  'Ivan': 'Prague, Czech Republic',
  'David': 'London, UK', 'Michael': 'New York, USA', 'Daniel': 'Sydney, Australia', 'Jonathan': 'Melbourne, Australia',
  'Nathan': 'Toronto, Canada', 'Rachel': 'London, UK', 'Rebecca': 'Sydney, Australia', 'Hannah': 'Melbourne, Australia',
};

function pickLocation(name, seed) {
  const firstName = name.split(' ')[0];
  if (nameLocationMap[firstName]) return nameLocationMap[firstName];
  return locationPools[(seed * 31 + 7) % locationPools.length];
}

// Date generation over 12 months
function makeDate(seed) {
  const base = new Date('2026-02-01');
  const daysBack = (seed * 17 + 3) % 365;
  const d = new Date(base.getTime() - daysBack * 86400000);
  return d.toISOString().split('T')[0];
}

// Rating distribution: ~60% 5★, ~30% 4★, ~10% 3★
function makeRating(seed) {
  const r = seed % 10;
  if (r < 6) return 5;
  if (r < 9) return 4;
  return 3;
}

// Review text pools per type
const templateReviewTexts5 = [
  (t,s) => `This ${s} template saved me at least a week of setup. Layers are perfectly organized and everything is production-ready.`,
  (t,s) => `Best purchase I've made this year. The template structure is incredibly well thought out.`,
  (t,s) => `I used this for a client project and they were impressed by the quality. Highly recommended.`,
  (t,s) => `The dynamic blocks and presets alone are worth the price. Everything just works.`,
  (t,s) => `Finally a ${s} template that's actually professional. Clean layers, proper annotations, real detail.`,
  (t,s) => `Opened it up and was ready to work within minutes. Amazing time saver.`,
  (t,s) => `Our firm standardized on this template. Consistency across projects has improved dramatically.`,
  (t,s) => `Used this for my thesis project and got excellent feedback from my professors.`,
  (t,s) => `The startup guide was incredibly helpful. Had everything set up in under 30 minutes.`,
  (t,s) => `This template has everything I need. Layouts, sections, details — all perfectly organized.`,
  (t,s) => `Perfect for anyone tired of setting up ${s} from scratch every time. Buy it.`,
  (t,s) => `The layer organization in this template is chef's kiss. So logical and clean.`,
  (t,s) => `I've tried other templates before — this one is leagues ahead in quality.`,
  (t,s) => `Great value for money. The amount of content included is impressive.`,
  (t,s) => `This cut my project setup time from 2 days to 2 hours. No exaggeration.`,
  (t,s) => `Downloaded, opened, started working. That's how a template should be.`,
  (t,s) => `The .ctb file and pen settings are a nice touch. Shows attention to detail.`,
  (t,s) => `Recommended this to three colleagues and they all bought it. Speaks for itself.`,
  (t,s) => `Excellent quality. The blocks are well-drawn and the template is logically structured.`,
  (t,s) => `Saved me so much time on a competition deadline. Couldn't have finished without it.`,
  (t,s) => `Professional grade template. Every element is properly scaled and annotated.`,
  (t,s) => `My go-to starting point for every new project now. Worth every cent.`,
  (t,s) => `The detail level is what sets this apart. Not just a shell — it's a complete setup.`,
  (t,s) => `Clean, comprehensive, and well-documented. Exactly what I was looking for.`,
  (t,s) => `Using this template improved our office's drawing consistency significantly.`,
  (t,s) => `Incredibly well-organized. You can tell an architect made this, not just a template factory.`,
  (t,s) => `The pre-configured page layouts and title blocks are a huge time saver.`,
  (t,s) => `Five stars for the quality of the blocks included. Really well drawn.`,
  (t,s) => `This template is perfect for small firms that want big-firm quality output.`,
  (t,s) => `Set it up once, use it forever. The ROI on this purchase is insane.`,
  (t,s) => `The included guide made customization straightforward, even for complex projects.`,
  (t,s) => `Just what I needed for my renovation project. Adapted the template in an afternoon.`,
  (t,s) => `Outstanding resource for architecture students and young professionals.`,
  (t,s) => `Every layer, block, and annotation is exactly where you'd expect it. Brilliant organization.`,
  (t,s) => `This template alone is worth more than my entire ${s} training course.`,
  (t,s) => `Second purchase from Architecture Paradise. Same excellent quality as the first.`,
  (t,s) => `Used it for a real estate development project. Client was very pleased with the output.`,
  (t,s) => `The print-ready setup saved me hours of page layout work. Thank you!`,
  (t,s) => `Perfect template for residential and mixed-use projects. Very versatile.`,
  (t,s) => `Amazing support too — had a question and got a response within hours.`,
  (t,s) => `Hands down the best ${s} template I've ever purchased. Period.`,
  (t,s) => `Worth it just for the ${s} presets and standardized layer structure.`,
  (t,s) => `Our intern set up a full project using this template in one day. Impressive.`,
  (t,s) => `The quality is consistent throughout. No half-done sections or missing details.`,
  (t,s) => `Finally, a template that actually follows professional standards.`,
];
const templateReviewTexts4 = [
  (t,s) => `Very good template overall. Would love to see more detail options in future updates.`,
  (t,s) => `Solid purchase. A few blocks needed minor adjustments for my specific use case.`,
  (t,s) => `Good quality, well organized. Took a bit of time to adapt to my workflow.`,
  (t,s) => `Great starting point. Had to customize some layers but that's expected.`,
  (t,s) => `Nice template, though I wish it included more interior details.`,
  (t,s) => `Good value for the price. Some elements could be more detailed.`,
  (t,s) => `Works well for most projects. The guide could be more comprehensive.`,
  (t,s) => `Solid foundation. Needed some tweaking but saved me time overall.`,
  (t,s) => `Good template, professional quality. Minor compatibility issues with older ${s} versions.`,
  (t,s) => `Very useful. Would be 5 stars with a few more block variations.`,
  (t,s) => `Great structure and organization. Some text styles needed adjustment for my region.`,
  (t,s) => `Nice template. The layer names could follow ISO standards more closely.`,
  (t,s) => `Good purchase overall. Setup took a bit longer than expected.`,
  (t,s) => `Reliable template. Works well, though some blocks feel slightly generic.`,
  (t,s) => `Decent quality for the price. Would appreciate more landscape elements.`,
];
const templateReviewTexts3 = [
  (t,s) => `Okay template. Not bad but I expected more detail at this level.`,
  (t,s) => `Usable but needed significant customization for my project type.`,
  (t,s) => `Average quality. The concept is good but execution could be refined.`,
  (t,s) => `Works as a starting point but feels somewhat generic in places.`,
  (t,s) => `Decent template. Some layer organization choices were questionable.`,
  (t,s) => `It's fine. Got the job done but nothing exceptional.`,
  (t,s) => `Could use more variety in the included blocks.`,
];

const blocksReviewTexts5 = [
  (t,s) => `Beautiful hand-drawn quality. These blocks add so much character to my presentations.`,
  (t,s) => `The drawing style is amazing — looks like real architectural illustration.`,
  (t,s) => `Dropped these into my project and the drawings came alive. Incredible quality.`,
  (t,s) => `These blocks saved me hours of drawing. The quality is outstanding.`,
  (t,s) => `Love the artistic style. My clients always comment on how beautiful the drawings look.`,
  (t,s) => `Universal .dwg format means I can use these in any software. Perfect.`,
  (t,s) => `The variety of poses and styles is excellent. Very realistic.`,
  (t,s) => `Best CAD blocks I've ever purchased. The level of detail is incredible.`,
  (t,s) => `These blocks transformed my competition presentation. Got shortlisted!`,
  (t,s) => `Clean linework, proper scale, great variety. Everything you need.`,
  (t,s) => `Immediately usable in AutoCAD and ArchiCAD. No conversion issues at all.`,
  (t,s) => `The blocks are perfectly scaled and proportioned. Professional quality.`,
  (t,s) => `Used these for a client presentation and received compliments on the drawing style.`,
  (t,s) => `Finally found blocks that look hand-drawn, not computer-generated.`,
  (t,s) => `Great collection. The variety of styles and poses is impressive.`,
  (t,s) => `These blocks make my architectural drawings look so much more professional.`,
  (t,s) => `Excellent quality for the price. Will definitely buy more from this studio.`,
  (t,s) => `The attention to detail in each block is remarkable. True craftsmanship.`,
  (t,s) => `Works perfectly in Revit too. Imported without any issues.`,
  (t,s) => `My favorite CAD block collection. Use them in every project now.`,
  (t,s) => `The artistic quality sets these apart from any free blocks online.`,
  (t,s) => `Beautifully drawn. These blocks add a human touch to technical drawings.`,
  (t,s) => `So much variety — I never have to reuse the same block twice.`,
  (t,s) => `Imported into Illustrator for a presentation and they looked stunning.`,
  (t,s) => `The blocks are well-organized and easy to find. Great naming convention.`,
  (t,s) => `Every block is drawn with care and precision. Worth every euro.`,
  (t,s) => `Used for my diploma project. The blocks elevated the entire presentation.`,
  (t,s) => `Clean geometry, no duplicate lines. Ready to use right out of the box.`,
  (t,s) => `Recommended by a colleague and I can see why. Top-notch quality.`,
  (t,s) => `These blocks bring life to otherwise flat floor plans. Love them.`,
  (t,s) => `Compatible with everything I've tried — AutoCAD, ArchiCAD, BricsCAD.`,
  (t,s) => `The hand-drawn aesthetic is exactly what I was looking for.`,
  (t,s) => `Used these to populate a hospital project. Realistic and well-proportioned.`,
  (t,s) => `Consistent style across all blocks. Makes the drawings look cohesive.`,
  (t,s) => `Quick download, instant use. No fiddling with layers or scales needed.`,
  (t,s) => `My go-to source for architectural people blocks. Nothing else compares.`,
  (t,s) => `The blocks look great both in plan and elevation. Versatile collection.`,
  (t,s) => `Swiss quality indeed. Clean, precise, and beautifully detailed.`,
  (t,s) => `Saved hours of drawing time. The ROI was immediate on this purchase.`,
  (t,s) => `Brilliant blocks. Every new project I start, these are the first thing I add.`,
  (t,s) => `Used for a renovation presentation — added warmth and scale perfectly.`,
  (t,s) => `Downloaded and started using within 5 minutes. That's how it should be.`,
  (t,s) => `These blocks make my floor plans tell a story. Clients love it.`,
  (t,s) => `Perfectly scaled for 1:100 and 1:50 drawings.`,
  (t,s) => `The collection covers every scenario I need. Very comprehensive.`,
];
const blocksReviewTexts4 = [
  (t,s) => `Good quality blocks. Would love to see even more variety in future packs.`,
  (t,s) => `Nice drawing style. A few blocks needed minor scale adjustments.`,
  (t,s) => `Great collection overall. Some blocks are more detailed than others.`,
  (t,s) => `Solid purchase. Works well in AutoCAD, minor issues in older ArchiCAD versions.`,
  (t,s) => `Good blocks, well drawn. Could use more diversity in the collection.`,
  (t,s) => `Very usable collection. The linework is clean and professional.`,
  (t,s) => `Nice variety. A few more poses would make this perfect.`,
  (t,s) => `Good quality for the price. Imported smoothly into my software.`,
  (t,s) => `Decent selection. The blocks are well-drawn and properly scaled.`,
  (t,s) => `Works well for most projects. Some blocks feel slightly stylized.`,
  (t,s) => `Reliable quality. Would appreciate more seasonal or contextual variations.`,
  (t,s) => `Good collection. A more comprehensive labeling system would help.`,
  (t,s) => `Nice blocks. The style is consistent which is important for coherent drawings.`,
  (t,s) => `Useful pack. Saved time on my current project.`,
  (t,s) => `Good quality overall. The elevation blocks are particularly nice.`,
];
const blocksReviewTexts3 = [
  (t,s) => `Decent blocks. The variety could be better for the price.`,
  (t,s) => `Okay quality. Some blocks look better than others in the collection.`,
  (t,s) => `Usable but I expected a bit more detail at this price point.`,
  (t,s) => `Fine for quick projects. Not the most detailed blocks I've seen.`,
  (t,s) => `Gets the job done. The style is nice but the quantity is a bit low.`,
  (t,s) => `Average collection. Some blocks are great, others feel rushed.`,
  (t,s) => `Works okay. Had to adjust a few blocks for proper scaling.`,
];

const bundleReviewTexts5 = [
  (t,s) => `Incredible value! Getting all these collections together saved me a lot compared to buying individually.`,
  (t,s) => `This bundle is the best investment for our office. Consistent quality across all packs.`,
  (t,s) => `Everything you need in one purchase. The blocks work beautifully together.`,
  (t,s) => `The bundle discount makes this a no-brainer. Each pack is excellent quality.`,
  (t,s) => `Bought this for our whole team. The consistency between packs is impressive.`,
  (t,s) => `Great value bundle. Every collection is high quality and works well together.`,
  (t,s) => `The combined savings make this the smart choice. All blocks maintain the same style.`,
  (t,s) => `One purchase and I had everything I needed. Blocks, furniture, people — all covered.`,
  (t,s) => `This bundle covered all our project needs. The cohesive style is a huge plus.`,
  (t,s) => `Perfect for firms that need a complete library. Consistent quality throughout.`,
  (t,s) => `The savings compared to individual purchases are significant. Smart buy.`,
  (t,s) => `Every pack in this bundle is excellent. No filler content at all.`,
  (t,s) => `Bought this for a large residential project and it had everything I needed.`,
  (t,s) => `The variety within this bundle is outstanding. Covers every design scenario.`,
  (t,s) => `Best bundle deal I've found for architectural blocks. Highly recommend.`,
  (t,s) => `Comprehensive collection at a great price. Each pack complements the others perfectly.`,
  (t,s) => `This bundle transformed our drawing library. Consistent style across all projects now.`,
  (t,s) => `Excellent value. The blocks, furniture, and people all match in style.`,
  (t,s) => `Worth every cent. The combined quality and savings make this a must-have.`,
  (t,s) => `Complete solution for any architecture office. Nothing else needed.`,
  (t,s) => `The bundle price is unbeatable. Individual packs alone would cost much more.`,
  (t,s) => `Bought this for my studio. Everyone uses these blocks now. Great consistency.`,
  (t,s) => `All the packs work together seamlessly. The cohesive style is what sold me.`,
  (t,s) => `Smart purchase. Covers residential, urban, and everything in between.`,
  (t,s) => `Firm-wide standard now. The bundle has everything we need in one package.`,
  (t,s) => `Great deal. Saved at least 30% compared to buying each collection separately.`,
  (t,s) => `The quality is consistent across all included packs. Very professional.`,
  (t,s) => `This bundle is a complete drawing library in one download. Impressive.`,
  (t,s) => `Bought it during a sale and it was an absolute steal. Premium quality.`,
  (t,s) => `Everything works together perfectly. The unified style makes drawings look polished.`,
  (t,s) => `One of the best professional investments I've made. Complete and comprehensive.`,
  (t,s) => `The variety and value in this bundle are unmatched. Highly recommended.`,
  (t,s) => `Saved us money and time. Having a consistent block library is invaluable.`,
  (t,s) => `Great for starting a new practice. Everything you need in one purchase.`,
  (t,s) => `This bundle covered a 50-unit residential project entirely. Amazing.`,
  (t,s) => `The savings alone justify the purchase. Quality is top-notch across all packs.`,
  (t,s) => `Perfect for studios that value visual consistency in their drawings.`,
  (t,s) => `Comprehensive and well-organized. Every pack in the bundle is excellent.`,
  (t,s) => `The bundle approach makes so much sense. All blocks share the same design language.`,
  (t,s) => `Great for competition submissions — the consistent style really elevates the presentation.`,
  (t,s) => `Outstanding value. Each individual collection would be worth buying on its own.`,
  (t,s) => `Bought for a healthcare project and the specialized blocks were perfect.`,
  (t,s) => `Best money I've spent on CAD resources this year. The bundle has it all.`,
  (t,s) => `The cohesive aesthetic across all packs makes drawings look incredibly professional.`,
  (t,s) => `Recommended this to every architect I know. The value is exceptional.`,
];
const bundleReviewTexts4 = [
  (t,s) => `Great value overall. A few packs are stronger than others but still worth it.`,
  (t,s) => `Good bundle deal. Most packs are excellent, some could use more variety.`,
  (t,s) => `Nice collection. The savings are real and the quality is good across the board.`,
  (t,s) => `Solid purchase. Would have liked a few more blocks in some of the collections.`,
  (t,s) => `Good value bundle. The style consistency is nice, though some blocks feel similar.`,
  (t,s) => `Worth the price. A couple of packs could be more comprehensive.`,
  (t,s) => `Great deal. Most content is excellent, a few blocks could use more detail.`,
  (t,s) => `Good investment. The variety covers most project types I work on.`,
  (t,s) => `Nice bundle. Some packs are standouts, others are more basic.`,
  (t,s) => `Solid value for money. Minor quality variations between packs.`,
  (t,s) => `Good purchase. Covers most needs, though specialized projects might need more.`,
  (t,s) => `Decent bundle. The furniture packs are stronger than the people packs.`,
  (t,s) => `Worth buying for the savings alone. Quality is good throughout.`,
  (t,s) => `Good collection. Would love to see more environment blocks in future updates.`,
  (t,s) => `Nice deal. The consistent style is a plus, variety could be slightly better.`,
];
const bundleReviewTexts3 = [
  (t,s) => `Okay bundle. Some packs are great, others feel like filler.`,
  (t,s) => `Decent value. Not all collections are equally useful for my work.`,
  (t,s) => `It's fine. The savings are real but some packs are better than others.`,
  (t,s) => `Average overall. A few standout packs, rest are mediocre.`,
  (t,s) => `Gets the job done. Would have preferred to cherry-pick individual packs.`,
  (t,s) => `Mixed quality. The core packs are good but some extras feel basic.`,
  (t,s) => `Usable but not all packs are at the same quality level.`,
];

const reviewTitles5 = [
  'Incredible quality', 'Best purchase this year', 'Absolutely love it', 'Game changer',
  'Exceeded expectations', 'Worth every penny', 'Outstanding', 'Highly recommended',
  'Perfect for my projects', 'Professional grade', 'Impressive quality', 'Must-have',
  'Saved me so much time', 'Brilliant work', 'Exactly what I needed', 'Top notch',
  'Five stars all the way', 'Amazing resource', 'Best investment', 'Superb quality',
  'Couldn\'t be happier', 'Excellent purchase', 'A+++ quality', 'Fantastic',
  'Love the quality', 'Perfect', 'Great find', 'So happy with this',
  'Absolute gem', 'Best on the market', 'Remarkable quality', 'Just wow',
  'Pure excellence', 'Premium quality', 'Stellar work', 'Blown away',
  'Essential resource', 'Total game changer', 'Phenomenal', 'First class',
  'My new favorite', 'Couldn\'t ask for more', 'Beyond impressed', 'Chef\'s kiss',
  'World class quality', 'Best I\'ve found', 'Simply the best', 'Instant classic',
  'So professional', 'Unbeatable quality',
];
const reviewTitles4 = [
  'Very good quality', 'Good value', 'Solid purchase', 'Well made',
  'Nice work', 'Pretty good', 'Good investment', 'Happy with it',
  'Meets expectations', 'Good quality overall', 'Reliable product', 'Decent purchase',
  'Above average', 'Good stuff', 'Pleasantly surprised', 'Nice quality',
  'Worth the price', 'Recommended', 'Satisfying purchase', 'Quite good',
];
const reviewTitles3 = [
  'Decent quality', 'Average product', 'It\'s okay', 'Room for improvement',
  'Mixed feelings', 'Not bad', 'Could be better', 'Acceptable',
  'Fair quality', 'Gets the job done',
];

function generateReviews(product, count = 75) {
  const reviews = [];
  const usedTitles = new Set();
  const usedNames = new Set();

  for (let i = 0; i < count; i++) {
    const seed = hashCode(product.handle + i);
    const absSeed = Math.abs(seed);
    const rating = makeRating(i);
    
    let titlePool, textPool;
    if (rating === 5) {
      titlePool = reviewTitles5;
      if (product.type === 'template') textPool = templateReviewTexts5;
      else if (product.type === 'bundle') textPool = bundleReviewTexts5;
      else textPool = blocksReviewTexts5;
    } else if (rating === 4) {
      titlePool = reviewTitles4;
      if (product.type === 'template') textPool = templateReviewTexts4;
      else if (product.type === 'bundle') textPool = bundleReviewTexts4;
      else textPool = blocksReviewTexts4;
    } else {
      titlePool = reviewTitles3;
      if (product.type === 'template') textPool = templateReviewTexts3;
      else if (product.type === 'bundle') textPool = bundleReviewTexts3;
      else textPool = blocksReviewTexts3;
    }

    let title = titlePool[absSeed % titlePool.length];
    // Ensure unique titles
    let titleIdx = 0;
    while (usedTitles.has(title) && titleIdx < titlePool.length) {
      title = titlePool[(absSeed + titleIdx) % titlePool.length];
      titleIdx++;
    }
    if (usedTitles.has(title)) title = `${title} (${i})`;
    usedTitles.add(title);

    let name = pickName(absSeed + i * 13);
    let nameIdx = 0;
    while (usedNames.has(name) && nameIdx < 50) {
      name = pickName(absSeed + i * 13 + nameIdx + 1);
      nameIdx++;
    }
    usedNames.add(name);

    const textFn = textPool[(absSeed + i * 3) % textPool.length];
    const text = textFn(product.title, product.software);

    reviews.push({
      id: `r-${product.handle}-${i}`,
      author: name,
      rating,
      title,
      text,
      date: makeDate(absSeed + i),
      verified: (absSeed + i) % 5 !== 0, // ~80% verified
      location: pickLocation(name, absSeed + i),
    });
  }
  return reviews;
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return hash;
}

// Features per product
function getFeatures(p) {
  if (p.type === 'template') {
    if (p.software === 'AutoCAD') {
      return {
        whatsIncluded: [
          'Complete AutoCAD template (.dwt)',
          'Custom dynamic blocks library (200+ blocks)',
          'Pre-configured layer system',
          'Startup guide (PDF)',
          'Plot style table (.ctb)',
          'Page layout presets (A1, A2, A3)',
          'Title block with auto-fields',
          'Dimension and text style presets',
          'Annotation scales pre-configured',
          'Sample project file (.dwg)',
        ],
        specifications: [
          { label: 'File size', value: '85 MB' },
          { label: 'Layers', value: '45+ organized layers' },
          { label: 'Dynamic blocks', value: '200+ blocks' },
          { label: 'Page layouts', value: '6 pre-configured' },
          { label: 'Scale presets', value: '1:1 to 1:500' },
          { label: 'Format', value: '.dwt, .dwg, .ctb, .pdf' },
        ],
      };
    } else if (p.software === 'ArchiCAD') {
      return {
        whatsIncluded: [
          'Complete ArchiCAD template (.tpl)',
          'Custom library objects (150+ objects)',
          'Organized layer combinations',
          'Startup guide (PDF)',
          'Pen set configurations',
          'Master layout book with views',
          'Publisher sets for PDF export',
          'Favorite presets for all tools',
          'Interactive schedule templates',
          'Sample project file (.pln)',
        ],
        specifications: [
          { label: 'File size', value: '120 MB' },
          { label: 'Layers', value: '50+ organized layers' },
          { label: 'Library objects', value: '150+ custom objects' },
          { label: 'View combinations', value: '12 pre-configured' },
          { label: 'Scale presets', value: '1:1 to 1:500' },
          { label: 'Format', value: '.tpl, .pln, .lcf, .pdf' },
        ],
      };
    } else if (p.software === 'Revit') {
      return {
        whatsIncluded: [
          'Complete Revit template (.rte)',
          'Custom Revit families (180+ families)',
          'Pre-configured view templates',
          'Startup guide (PDF)',
          'Sheet templates with title blocks',
          'Schedule templates',
          'Filter configurations',
          'Material library',
          'Annotation families',
          'Sample project file (.rvt)',
        ],
        specifications: [
          { label: 'File size', value: '95 MB' },
          { label: 'View templates', value: '20+ pre-configured' },
          { label: 'Revit families', value: '180+ families' },
          { label: 'Schedules', value: '15 templates' },
          { label: 'LOD', value: 'LOD 200-400' },
          { label: 'Format', value: '.rte, .rvt, .rfa, .pdf' },
        ],
      };
    }
  }
  
  if (p.type === 'bundle') {
    const bundleFeatures = {
      'complete-residential-bundle': {
        whatsIncluded: [
          'Residential People blocks pack',
          'Residential Furniture pack',
          'Residential Furniture 2 pack',
          'Residential Environment pack',
          'All blocks in .dwg format',
          '500+ total CAD blocks',
          'Floor plan and elevation views',
          'Consistent hand-drawn style',
        ],
        specifications: [
          { label: 'Total blocks', value: '500+' },
          { label: 'Collections', value: '4 complete packs' },
          { label: 'File size', value: '65 MB (total)' },
          { label: 'Format', value: '.dwg (universal)' },
          { label: 'Scale', value: '1:100 / 1:50' },
          { label: 'Savings', value: '~25% vs. individual' },
        ],
      },
      'complete-healthcare-bundle': {
        whatsIncluded: [
          'Healthcare People blocks pack',
          'Healthcare Furniture & Environment pack',
          'Waiting Room blocks pack',
          'All blocks in .dwg format',
          '350+ total CAD blocks',
          'Floor plan and elevation views',
          'Consistent hand-drawn style',
          'Hospital-specific elements',
        ],
        specifications: [
          { label: 'Total blocks', value: '350+' },
          { label: 'Collections', value: '3 complete packs' },
          { label: 'File size', value: '48 MB (total)' },
          { label: 'Format', value: '.dwg (universal)' },
          { label: 'Scale', value: '1:100 / 1:50' },
          { label: 'Savings', value: '~25% vs. individual' },
        ],
      },
      'complete-urban-bundle': {
        whatsIncluded: [
          'Urban People blocks pack',
          'Urban Furniture blocks pack',
          'Urban Environment blocks pack',
          'All blocks in .dwg format',
          '400+ total CAD blocks',
          'Floor plan and elevation views',
          'Consistent hand-drawn style',
          'Urban planning elements',
        ],
        specifications: [
          { label: 'Total blocks', value: '400+' },
          { label: 'Collections', value: '3 complete packs' },
          { label: 'File size', value: '55 MB (total)' },
          { label: 'Format', value: '.dwg (universal)' },
          { label: 'Scale', value: '1:100 / 1:50' },
          { label: 'Savings', value: '~25% vs. individual' },
        ],
      },
      'full-pack-of-3-collections': {
        whatsIncluded: [
          'Complete Residential Bundle',
          'Complete Healthcare Bundle',
          'Complete Urban Bundle',
          'All blocks in .dwg format',
          '1200+ total CAD blocks',
          'All people, furniture & environment blocks',
          'Consistent hand-drawn style across all collections',
          'One download — complete library',
        ],
        specifications: [
          { label: 'Total blocks', value: '1200+' },
          { label: 'Collections', value: '10 complete packs' },
          { label: 'File size', value: '160 MB (total)' },
          { label: 'Format', value: '.dwg (universal)' },
          { label: 'Scale', value: '1:100 / 1:50' },
          { label: 'Savings', value: '~35% vs. individual' },
        ],
      },
      'complete-bundle-cutout-painting-vegetation': {
        whatsIncluded: [
          'Cutout painting vegetation collection',
          'High-resolution PNG files',
          'Transparent backgrounds',
          'Trees, shrubs, and ground cover',
          'Multiple seasons and styles',
          'Ready for Photoshop compositing',
          'Architectural visualization ready',
          'Watercolor and oil painting styles',
        ],
        specifications: [
          { label: 'Total images', value: '200+' },
          { label: 'Resolution', value: '3000-5000px' },
          { label: 'File size', value: '2.5 GB (total)' },
          { label: 'Format', value: '.png (transparent)' },
          { label: 'Styles', value: 'Watercolor, oil, mixed' },
          { label: 'Savings', value: '~30% vs. individual' },
        ],
      },
    };
    return bundleFeatures[p.handle] || {
      whatsIncluded: ['Multiple block collections', 'All blocks in .dwg format', 'Consistent style throughout', 'Bundle savings included'],
      specifications: [
        { label: 'Format', value: '.dwg (universal)' },
        { label: 'Savings', value: '~25% vs. individual' },
      ],
    };
  }

  // Blocks type
  const blockCounts = {
    'hospital-people': '120+',
    'residential-people': '150+',
    'residential-furniture': '180+',
    'residential-furniture-2': '160+',
    'residential-environement': '100+',
    'healthcare-furniture': '140+',
    'healthcare-waiting-room': '80+',
    'urban-people': '130+',
    'urban-furniture': '120+',
    'urban-environment': '90+',
    'restaurant-bar-furniture': '110+',
    'trees-and-shrubs-in-plan': '100+',
    'minimal-vegetation-in-elevation': '80+',
    'copy-of-residential-furniture': '140+',
    'cad-blocks-pack-of-working-people': '120+',
    'cad-blocks-pack-of-sporty-people': '100+',
    'mumbai-studio-vegetation-trees': '60+',
  };

  const categoryDesc = {
    'people': 'people in various poses and activities',
    'furniture': 'furniture items in plan and elevation',
    'environment': 'environmental elements and landscaping',
    'vegetation': 'trees, plants, and vegetation elements',
  };

  const count = blockCounts[p.handle] || '100+';
  const catDesc = categoryDesc[p.category] || 'architectural elements';

  return {
    whatsIncluded: [
      `${count} hand-drawn CAD blocks`,
      `${p.category === 'vegetation' ? 'Trees, shrubs, and plants' : `High-quality ${catDesc}`}`,
      'Floor plan views',
      'Elevation views',
      'Universal .dwg format',
      'Organized file structure',
      'Consistent hand-drawn style',
      'Print-ready quality',
    ],
    specifications: [
      { label: 'Number of blocks', value: count },
      { label: 'File size', value: `${Math.floor(Math.abs(hashCode(p.handle)) % 30 + 15)} MB` },
      { label: 'Format', value: '.dwg (universal)' },
      { label: 'Scale', value: '1:100 / 1:50' },
      { label: 'Style', value: 'Hand-drawn architectural' },
      { label: 'Views', value: 'Plan + Elevation' },
    ],
  };
}

// Compatibility per product
function getCompatibility(p) {
  if (p.type === 'template') {
    if (p.software === 'AutoCAD') {
      return {
        software: 'AutoCAD',
        versions: [
          { version: 'AutoCAD 2025', status: 'full' },
          { version: 'AutoCAD 2024', status: 'full' },
          { version: 'AutoCAD 2023', status: 'full' },
          { version: 'AutoCAD 2022', status: 'full' },
          { version: 'AutoCAD 2021', status: 'full' },
          { version: 'AutoCAD 2020', status: 'full' },
          { version: 'AutoCAD LT 2023+', status: 'partial' },
        ],
        formats: ['.dwg (native AutoCAD)', '.dwt (template)', '.ctb (plot style)', '.pdf (export)'],
      };
    } else if (p.software === 'ArchiCAD') {
      return {
        software: 'ArchiCAD',
        versions: [
          { version: 'ArchiCAD 28', status: 'full' },
          { version: 'ArchiCAD 27', status: 'full' },
          { version: 'ArchiCAD 26', status: 'full' },
          { version: 'ArchiCAD 25', status: 'full' },
          { version: 'ArchiCAD 24', status: 'full' },
          { version: 'ArchiCAD 23', status: 'partial' },
        ],
        formats: ['.tpl (ArchiCAD template)', '.pln (project)', '.lcf (library)', '.pdf (export)'],
      };
    } else if (p.software === 'Revit') {
      return {
        software: 'Revit',
        versions: [
          { version: 'Revit 2025', status: 'full' },
          { version: 'Revit 2024', status: 'full' },
          { version: 'Revit 2023', status: 'full' },
          { version: 'Revit 2022', status: 'full' },
          { version: 'Revit 2021', status: 'partial' },
        ],
        formats: ['.rte (Revit template)', '.rvt (project)', '.rfa (family)', '.pdf (export)'],
      };
    }
  }

  if (p.software === 'Photoshop') {
    return {
      software: 'Photoshop',
      versions: [
        { version: 'Photoshop 2025', status: 'full' },
        { version: 'Photoshop 2024', status: 'full' },
        { version: 'Photoshop 2023', status: 'full' },
        { version: 'Photoshop CC', status: 'full' },
        { version: 'Any image editor', status: 'full' },
      ],
      formats: ['.png (transparent background)', 'Compatible with any image editor'],
    };
  }

  // Blocks - universal .dwg
  return {
    software: 'Universal CAD',
    versions: [
      { version: 'AutoCAD 2020–2025', status: 'full' },
      { version: 'ArchiCAD 24–28', status: 'full' },
      { version: 'Revit 2022–2025', status: 'full' },
      { version: 'BricsCAD', status: 'full' },
      { version: 'SketchUp (via import)', status: 'full' },
      { version: 'Any .dwg-compatible software', status: 'full' },
    ],
    formats: ['.dwg (universal CAD format)', 'Compatible with all major CAD software'],
  };
}

// Generate output
let output = `// AUTO-GENERATED — Do not edit manually
// Generated by scripts/generate-mock-data.mjs

import type { ProductReview, ProductCompatibility, ProductFeatures } from './mock-data';

`;

// Reviews map
output += `export const reviewsMap: Record<string, ProductReview[]> = {\n`;
for (const p of products) {
  const reviews = generateReviews(p);
  output += `  '${p.handle}': [\n`;
  for (const r of reviews) {
    output += `    { id: '${r.id}', author: ${JSON.stringify(r.author)}, rating: ${r.rating}, title: ${JSON.stringify(r.title)}, text: ${JSON.stringify(r.text)}, date: '${r.date}', verified: ${r.verified}, location: ${JSON.stringify(r.location)} },\n`;
  }
  output += `  ],\n`;
}
output += `};\n\n`;

// Compatibility map
output += `export const compatibilityMap: Record<string, ProductCompatibility> = {\n`;
for (const p of products) {
  const c = getCompatibility(p);
  output += `  '${p.handle}': {\n`;
  output += `    software: '${c.software}',\n`;
  output += `    versions: [\n`;
  for (const v of c.versions) {
    output += `      { version: '${v.version}', status: '${v.status}' },\n`;
  }
  output += `    ],\n`;
  output += `    formats: ${JSON.stringify(c.formats)},\n`;
  output += `  },\n`;
}
output += `};\n\n`;

// Features map
output += `export const featuresMap: Record<string, ProductFeatures> = {\n`;
for (const p of products) {
  const f = getFeatures(p);
  output += `  '${p.handle}': {\n`;
  output += `    whatsIncluded: ${JSON.stringify(f.whatsIncluded)},\n`;
  output += `    specifications: [\n`;
  for (const s of f.specifications) {
    output += `      { label: '${s.label}', value: '${s.value}' },\n`;
  }
  output += `    ],\n`;
  output += `  },\n`;
}
output += `};\n`;

import { writeFileSync } from 'fs';
writeFileSync('src/lib/shopify/mock-data-extended.ts', output);
console.log('Generated mock-data-extended.ts');
console.log(`Total products: ${products.length}`);
console.log(`Total reviews: ${products.length * 75}`);
