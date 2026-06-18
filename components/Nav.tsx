'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from './AppContext';
import { Sun, Moon, ShieldAlert, Menu, X } from 'lucide-react';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        scrolled || mobileMenuOpen
          ? 'bg-[var(--bg)]/85 backdrop-blur-md border-b border-[var(--border)] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[760px] lg:max-w-[860px] mx-auto px-6 flex items-center justify-between relative">
        <Link href="/" onClick={() => setMobileMenuOpen(false)} className="font-sans font-bold text-lg text-[var(--text)] hover:opacity-85 transition-opacity z-50">
          aditya<span className="text-[var(--text-3)]">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-5 font-mono text-xs text-[var(--text-2)]">
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

        {/* Mobile Nav Toggle */}
        <div className="flex sm:hidden items-center space-x-4 z-50">
          <button
            onClick={toggleTheme}
            className="p-1 hover:text-[var(--text)] transition-colors cursor-pointer text-[var(--text-2)]"
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={triggerDoom}
            className="p-1 text-[var(--accent)] hover:opacity-80 transition-opacity cursor-pointer flex items-center"
            title="Dr. Doom Protocol"
          >
            <ShieldAlert size={16} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-[var(--text)] hover:opacity-80 transition-opacity"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-[100%] left-0 w-full bg-[var(--bg)]/95 backdrop-blur-xl border-b border-[var(--border)] px-6 py-6 shadow-xl flex flex-col space-y-5 font-mono text-sm text-[var(--text-2)] max-h-[85vh] overflow-y-auto">
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className={`hover:text-[var(--text)] transition-colors ${pathname === '/about' ? 'text-[var(--accent)]' : ''}`}>
            /about
          </Link>
          <Link href="/work" onClick={() => setMobileMenuOpen(false)} className={`hover:text-[var(--text)] transition-colors ${pathname.startsWith('/work') ? 'text-[var(--accent)]' : ''}`}>
            /work
          </Link>
          <Link href="/research" onClick={() => setMobileMenuOpen(false)} className={`hover:text-[var(--text)] transition-colors ${pathname === '/research' ? 'text-[var(--accent)]' : ''}`}>
            /research
          </Link>
          <Link href="/writing" onClick={() => setMobileMenuOpen(false)} className={`hover:text-[var(--text)] transition-colors ${pathname.startsWith('/writing') ? 'text-[var(--accent)]' : ''}`}>
            /writing
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className={`hover:text-[var(--text)] transition-colors ${pathname === '/contact' ? 'text-[var(--accent)]' : ''}`}>
            /contact
          </Link>
        </div>
      )}
    </nav>
  );
}
