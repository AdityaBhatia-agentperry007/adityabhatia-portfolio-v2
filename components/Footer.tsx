'use client';
import Link from 'next/link';
import { useApp } from './AppContext';

export default function Footer() {
  const { triggerDoom } = useApp();

  return (
    <footer className="border-t border-[var(--border)] mt-24 py-8 relative z-10 select-none">
      <div className="max-w-[680px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-[var(--text-2)]">
        <div>
          <span>built from kanpur. no shortcuts. no excuses.</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/argus" className="hover:text-[var(--text)] transition-colors">
            /argus
          </Link>
          <span>·</span>
          <button
            onClick={triggerDoom}
            className="text-[var(--accent)] hover:opacity-85 transition-opacity cursor-pointer uppercase tracking-wider font-bold"
          >
            doom
          </button>
          <span>·</span>
          <span>© 2026 aditya bhatia</span>
        </div>
      </div>
    </footer>
  );
}
