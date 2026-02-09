/**
 * Sanity Studio configuration.
 * This file is used by the embedded Sanity Studio at /studio route.
 * It will only work when NEXT_PUBLIC_SANITY_PROJECT_ID is configured.
 */
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { homepage, blogPost, author, category, siteSettings } from './schemas';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export default defineConfig({
  name: 'architecture-paradise',
  title: 'Architecture Paradise CMS',
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: [homepage, blogPost, author, category, siteSettings],
  },
});
