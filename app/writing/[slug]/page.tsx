import { notFound } from 'next/navigation';
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import MarkdownRenderer from '@/components/MarkdownRenderer';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6 pt-4">
      {/* Date and Reading time */}
      <div className="flex items-center space-x-2 font-mono text-[10px] text-[var(--text-3)] uppercase tracking-wider">
        <span>{post.date}</span>
        <span>·</span>
        <span>{post.readingTime}</span>
      </div>

      {/* Title */}
      <h1 className="font-sans font-bold text-4xl tracking-tight text-[var(--text)]">
        {post.title}
      </h1>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 font-mono text-[9px] text-[var(--text-3)] uppercase tracking-wider">
        {post.tags.map((tag) => (
          <span key={tag}>#{tag}</span>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-6" />

      {/* MDX rendering body with spec prose styling */}
      <div className="font-sans text-[15px] leading-relaxed text-[var(--text)] space-y-6 max-w-[620px] select-text mdx-prose">
        <MarkdownRenderer content={post.content} />
      </div>
    </article>
  );
}

