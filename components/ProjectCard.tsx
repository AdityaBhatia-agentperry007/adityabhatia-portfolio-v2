import Link from 'next/link';
import { Project } from '@/lib/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border border-[var(--border)] p-6 bg-transparent hover:border-[var(--border-2)] transition-colors duration-200 flex flex-col justify-between h-full select-none">
      <div>
        <div className="flex justify-between items-start mb-4">
          <span className="font-mono text-[10px] text-[var(--text-3)]">{project.year}</span>
          <div className="flex space-x-3 font-mono text-[10px]">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent)] hover:underline"
              >
                live demo
              </a>
            )}
            <Link href={`/work/${project.slug}`} className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors">
              writeup →
            </Link>
          </div>
        </div>

        <Link href={`/work/${project.slug}`} className="group block">
          <h3 className="font-sans font-bold text-[17px] text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
            {project.title}
          </h3>
        </Link>

        <p className="text-xs text-[var(--text-2)] mt-2 leading-relaxed font-sans">
          {project.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-[var(--border)]/40 flex flex-wrap gap-x-2 gap-y-1 font-mono text-[9px] text-[var(--text-3)]">
        {project.tags.map((tag, idx) => (
          <span key={idx}>
            {tag}
            {idx < project.tags.length - 1 && <span className="ml-2">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
