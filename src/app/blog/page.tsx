import type { Metadata } from 'next';
import Link from 'next/link';
import { mockBlogPosts } from '@/lib/blog/mock-data';
import { BreadcrumbJsonLd } from '@/lib/seo/structured-data';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Architecture tips, software comparisons, tutorials, and industry insights from practicing architects. ArchiCAD, Revit, SketchUp guides and more.',
  openGraph: {
    title: 'Blog — Architecture Paradise',
    description: 'Architecture tips, software comparisons, tutorials, and industry insights.',
  },
};

export default function BlogPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ label: 'Home', href: '/' }, { label: 'Blog' }]} />

      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-text-primary text-center mb-2">Blog</h1>
          <p className="text-text-secondary text-center mb-10">
            Architecture tips, software guides, and industry insights from practicing architects.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockBlogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-card border border-border rounded-[var(--radius-card)] overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-text-muted mb-2">
                    <span>{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <span>·</span>
                    <span>{post.readingTime} min read</span>
                    <span>·</span>
                    <span>{post.categories[0]}</span>
                  </div>
                  <h2 className="text-lg font-bold text-text-primary group-hover:text-accent transition-colors mb-2 line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary text-sm line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.author.image}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <span className="text-xs text-text-muted">{post.author.name}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
