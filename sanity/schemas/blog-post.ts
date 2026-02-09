import { defineType, defineField } from 'sanity';

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required().max(100) }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: 'excerpt', title: 'Excerpt', type: 'text', validation: (Rule) => Rule.required().max(200) }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt Text', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
          ],
        },
        {
          type: 'object',
          name: 'productEmbed',
          title: 'Product Embed',
          fields: [
            defineField({ name: 'shopifyHandle', title: 'Shopify Handle', type: 'string', validation: (Rule) => Rule.required() }),
          ],
        },
      ],
    }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime', validation: (Rule) => Rule.required() }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: [{ type: 'category' }] }] }),
    defineField({ name: 'tags', title: 'Tags', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'SEO Title', type: 'string', validation: (Rule) => Rule.max(60) }),
        defineField({ name: 'description', title: 'Meta Description', type: 'text', validation: (Rule) => Rule.max(160) }),
        defineField({ name: 'focusKeyword', title: 'Focus Keyword', type: 'string' }),
      ],
    }),
    defineField({ name: 'readingTime', title: 'Reading Time (min)', type: 'number', readOnly: true }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'featuredImage' },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : '', media };
    },
  },
});
