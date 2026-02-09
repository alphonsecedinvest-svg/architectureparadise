import { defineType, defineField } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Site Title', type: 'string', validation: (Rule) => Rule.required() }),
    defineField({ name: 'description', title: 'Site Description', type: 'text', validation: (Rule) => Rule.max(160) }),
    defineField({ name: 'announcementText', title: 'Announcement Bar Text', type: 'string' }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        defineField({ name: 'instagram', title: 'Instagram', type: 'url' }),
        defineField({ name: 'facebook', title: 'Facebook', type: 'url' }),
        defineField({ name: 'youtube', title: 'YouTube', type: 'url' }),
        defineField({ name: 'twitter', title: 'Twitter / X', type: 'url' }),
      ],
    }),
    defineField({ name: 'ogImage', title: 'Default OG Image', type: 'image' }),
  ],
});
