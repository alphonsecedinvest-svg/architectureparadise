import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { mockBlogPosts, getBlogPostBySlug } from '@/lib/blog/mock-data';
import { BreadcrumbJsonLd, ArticleJsonLd } from '@/lib/seo/structured-data';
import BlogContent from './BlogContent';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return mockBlogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: 'Article Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [{ url: post.featuredImage, width: 1200, height: 630, alt: post.title }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        image={post.featuredImage}
        authorName={post.author.name}
        publishedAt={post.publishedAt}
      />

      <article className="py-8 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Back link */}
          <Link href="/blog" className="text-accent text-sm hover:underline mb-6 inline-block">
            ← Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 text-sm text-text-muted mb-3">
              {post.categories.map((cat) => (
                <span key={cat} className="bg-accent/10 text-accent px-2 py-0.5 rounded text-xs font-medium">
                  {cat}
                </span>
              ))}
              <span>{post.readingTime} min read</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-text-secondary text-lg mb-6">{post.excerpt}</p>

            {/* Author + Date */}
            <div className="flex items-center gap-3 pb-6 border-b border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.author.image} alt={post.author.name} className="w-10 h-10 rounded-full" />
              <div>
                <div className="text-sm font-medium text-text-primary">{post.author.name}</div>
                <div className="text-xs text-text-muted">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full rounded-[var(--radius-card)] mb-8"
          />

          {/* Content */}
          <BlogContent content={post.content} />

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-surface-alt text-text-muted text-xs px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Author bio */}
          <div className="mt-8 bg-card border border-border rounded-[var(--radius-card)] p-6 flex gap-4 items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.author.image} alt={post.author.name} className="w-14 h-14 rounded-full flex-shrink-0" />
            <div>
              <div className="font-semibold text-text-primary">{post.author.name}</div>
              <p className="text-text-secondary text-sm mt-1">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
