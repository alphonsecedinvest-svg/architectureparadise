import { defineType, defineField } from 'sanity';

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(60) }),
        defineField({ name: 'subtitle', title: 'Subtitle', type: 'text', validation: (Rule) => Rule.max(160) }),
        defineField({ name: 'ctaText', title: 'CTA Button Text', type: 'string', initialValue: 'Browse Templates' }),
        defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
        defineField({ name: 'backgroundImage', title: 'Background Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
        defineField({ name: 'mobileImage', title: 'Mobile Image (optional)', type: 'image', options: { hotspot: true } }),
      ],
    }),
    defineField({
      name: 'featuredCollections',
      title: 'Featured Collections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'shopifyHandle', title: 'Shopify Handle', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'customTitle', title: 'Custom Title', type: 'string' }),
          defineField({ name: 'customDescription', title: 'Custom Description', type: 'text' }),
          defineField({ name: 'customImage', title: 'Custom Image', type: 'image', options: { hotspot: true } }),
        ],
      }],
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'text', title: 'Text', type: 'text', validation: (Rule) => Rule.required().max(200) }),
          defineField({ name: 'author', title: 'Author', type: 'string', validation: (Rule) => Rule.required() }),
          defineField({ name: 'rating', title: 'Rating (1-5)', type: 'number', validation: (Rule) => Rule.min(1).max(5) }),
          defineField({ name: 'verified', title: 'Verified Purchase', type: 'boolean', initialValue: false }),
        ],
      }],
      validation: (Rule) => Rule.max(12),
    }),
    defineField({
      name: 'aboutSection',
      title: 'About Section',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Title', type: 'string' }),
        defineField({ name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] }),
        defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'ctaText', title: 'CTA Text', type: 'string' }),
        defineField({ name: 'ctaLink', title: 'CTA Link', type: 'string' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'SEO Title', type: 'string', validation: (Rule) => Rule.max(60) }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', validation: (Rule) => Rule.max(160) }),
        defineField({ name: 'keywords', title: 'Keywords', type: 'array', of: [{ type: 'string' }] }),
        defineField({ name: 'ogImage', title: 'Open Graph Image', type: 'image' }),
      ],
    }),
  ],
});
