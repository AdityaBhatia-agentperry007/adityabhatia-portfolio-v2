import { notFound } from 'next/navigation';
import { PROJECTS } from '@/lib/projects';

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6 pt-4">
      {/* Year + tags row */}
      <div className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-wider">
        {project.year} &nbsp;·&nbsp; {project.tags.join(' · ')}
      </div>

      {/* Title */}
      <h1 className="font-sans font-bold text-4xl tracking-tight text-[var(--text)]">
        {project.title}
      </h1>

      {/* One-line desc */}
      <p className="text-[var(--text-2)] text-[15px] font-sans leading-relaxed">
        {project.description}
      </p>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-6" />

      {/* Prose content */}
      <div className="font-sans text-[15px] leading-relaxed text-[var(--text)] space-y-6 max-w-[620px] select-text">
        {project.longContent.trim().split('\n\n').map((para, i) => (
          <p key={i}>{para.trim()}</p>
        ))}
      </div>

      {/* Links section */}
      {(project.github || project.demo) && (
        <div className="border-t border-[var(--border)] pt-6 mt-12 select-none">
          <h3 className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-wider mb-3">// links</h3>
          <div className="flex space-x-4 font-mono text-[11px]">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
              >
                github
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:opacity-85 transition-opacity"
              >
                live demo
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
