// GROQ queries — ready for when Sanity is connected

export const homepageQuery = `
  *[_type == "homepage"][0] {
    hero {
      title,
      subtitle,
      ctaText,
      ctaLink,
      backgroundImage { asset-> { _id, url, metadata { dimensions { width, height } } }, hotspot, crop },
      mobileImage { asset-> { _id, url }, hotspot, crop }
    },
    featuredCollections[] {
      shopifyHandle, customTitle, customDescription,
      customImage { asset-> { _id, url }, hotspot, crop }
    },
    testimonials[] { text, author, rating, verified },
    aboutSection {
      title, content,
      image { asset-> { _id, url }, hotspot, crop },
      ctaText, ctaLink
    },
    seo { title, description, keywords, ogImage { asset-> { url } } }
  }
`;

export const blogPostsQuery = `
  *[_type == "blogPost" && publishedAt <= now()] | order(publishedAt desc) [0...$limit] {
    _id, title, slug, excerpt,
    featuredImage { asset-> { _id, url, metadata { dimensions { width, height } } }, hotspot, crop, alt },
    author-> { name, slug, image { asset-> { _id, url } } },
    publishedAt,
    categories[]-> { title, slug },
    tags, readingTime
  }
`;

export const blogPostBySlugQuery = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id, title, slug, excerpt,
    featuredImage { asset-> { _id, url, metadata { dimensions { width, height } } }, hotspot, crop, alt },
    content[] {
      ...,
      _type == "image" => { asset-> { _id, url, metadata { dimensions { width, height } } }, hotspot, crop, alt, caption },
      _type == "productEmbed" => { shopifyHandle }
    },
    author-> { name, slug, bio, image { asset-> { _id, url } } },
    publishedAt,
    categories[]-> { title, slug },
    tags, readingTime,
    seo { title, description, focusKeyword }
  }
`;

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    title, description,
    announcementText,
    socialLinks { instagram, facebook, youtube, twitter },
    ogImage { asset-> { url } }
  }
`;
