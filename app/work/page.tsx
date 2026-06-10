import { PROJECTS } from '@/lib/projects';
import ProjectCard from '@/components/ProjectCard';

export const metadata = {
  title: 'work',
  description: "things i've built, in the order i'm most interested in talking about them.",
};

export default function WorkPage() {
  return (
    <div className="space-y-8 pt-4">
      <div>
        <h1 className="font-sans font-bold text-3xl tracking-tight text-[var(--text)]">work</h1>
        <p className="text-sm text-[var(--text-3)] mt-2 font-mono">
          things i've built, in the order i'm most interested in talking about them.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {PROJECTS.map((project) => (
          <div key={project.slug}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
