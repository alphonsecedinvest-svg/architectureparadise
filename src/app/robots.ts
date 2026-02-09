import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_URL || 'https://architectureparadise.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/studio/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
