import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'content/writing');

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  readingTime: string;
  draft: boolean;
  content: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);

  const posts = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(BLOG_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.mdx$/, '');

      return {
        slug,
        title: data.title || 'Untitled',
        date: data.date || '',
        description: data.description || '',
        tags: data.tags || [],
        readingTime: readingTime(content).text,
        draft: !!data.draft,
        content,
      };
    })
    .filter((post) => !post.draft || process.env.NODE_ENV === 'development')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || '',
    description: data.description || '',
    tags: data.tags || [],
    readingTime: readingTime(content).text,
    draft: !!data.draft,
    content,
  };
}
