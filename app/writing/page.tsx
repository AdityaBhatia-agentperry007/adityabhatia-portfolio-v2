import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';

export const metadata = {
  title: 'writing',
  description: 'occasional. when something is worth saying at length.',
};

export default function WritingPage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-8 pt-4 select-none">
      <div>
        <h1 className="font-sans font-bold text-3xl tracking-tight text-[var(--text)]">writing</h1>
        <p className="text-sm text-[var(--text-3)] mt-2 font-mono">
          occasional. when something is worth saying at length.
        </p>
      </div>

      <div className="pt-4">
        {posts.length === 0 ? (
          <div className="font-mono text-xs text-[var(--text-3)]">
            nothing yet. soon.
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <div key={post.slug} className="border-b border-[var(--border)]/40 pb-6 last:border-0">
                <div className="flex justify-between items-center font-mono text-[10px] text-[var(--text-3)] mb-2">
                  <span>{post.date}</span>
                  <span>{post.readingTime}</span>
                </div>
                <Link href={`/writing/${post.slug}`} className="group block">
                  <h2 className="font-sans font-semibold text-lg text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-150">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-xs text-[var(--text-2)] mt-2 leading-relaxed font-sans">
                  {post.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
