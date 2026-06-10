'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppContext';
import { Sun, Moon, ShieldAlert } from 'lucide-react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme, triggerDoom } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[680px] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="font-sans font-bold text-lg text-[var(--text)] hover:opacity-85 transition-opacity">
          aditya<span className="text-[var(--text-3)]">.</span>
        </Link>
        
        <div className="flex items-center space-x-5 font-mono text-xs text-[var(--text-2)]">
          <Link
            href="/about"
            className={`hover:text-[var(--text)] transition-colors ${
              pathname === '/about' ? 'text-[var(--text)]' : ''
            }`}
          >
            about
          </Link>
          <Link
            href="/work"
            className={`hover:text-[var(--text)] transition-colors ${
              pathname.startsWith('/work') ? 'text-[var(--text)]' : ''
            }`}
          >
            work
          </Link>
          <Link
            href="/research"
            className={`hover:text-[var(--text)] transition-colors ${
              pathname === '/research' ? 'text-[var(--text)]' : ''
            }`}
          >
            research
          </Link>
          <Link
            href="/writing"
            className={`hover:text-[var(--text)] transition-colors ${
              pathname.startsWith('/writing') ? 'text-[var(--text)]' : ''
            }`}
          >
            writing
          </Link>
          <Link
            href="/contact"
            className={`hover:text-[var(--text)] transition-colors ${
              pathname === '/contact' ? 'text-[var(--text)]' : ''
            }`}
          >
            contact
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1 hover:text-[var(--text)] transition-colors cursor-pointer"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          {/* Doom Trigger */}
          <button
            onClick={triggerDoom}
            className="p-1 text-[var(--accent)] hover:opacity-80 transition-opacity cursor-pointer flex items-center space-x-1"
            title="Dr. Doom Protocol"
          >
            <ShieldAlert size={14} />
          </button>
        </div>
      </div>
    </nav>
  );
}
