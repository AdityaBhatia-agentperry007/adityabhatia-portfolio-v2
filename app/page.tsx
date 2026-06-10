'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-[75vh] flex flex-col justify-center items-start select-none relative z-10">
      {/* Center Left-Aligned Block */}
      <div className="space-y-1 mt-[-30px]">
        <h1 className="font-sans font-bold text-4xl md:text-5xl tracking-tight text-[var(--text)]">
          Aditya Bhatia
        </h1>
        <p className="text-base md:text-lg text-[var(--text-2)] font-sans">
          researcher · founder · builder
        </p>
        <p className="font-mono text-[10px] text-[var(--text-3)] uppercase tracking-wider mt-1">
          kanpur, india
        </p>
      </div>

      {/* Nav Portals */}
      <div className="mt-12 flex flex-wrap gap-x-3 gap-y-2 font-mono text-xs text-[var(--text-2)]">
        <Link href="/work" className="hover:text-[var(--text)] transition-colors">
          work
        </Link>
        <span className="text-[var(--text-3)]">·</span>
        <Link href="/research" className="hover:text-[var(--text)] transition-colors">
          research
        </Link>
        <span className="text-[var(--text-3)]">·</span>
        <Link href="/writing" className="hover:text-[var(--text)] transition-colors">
          writing
        </Link>
        <span className="text-[var(--text-3)]">·</span>
        <Link href="/about" className="hover:text-[var(--text)] transition-colors">
          about
        </Link>
        <span className="text-[var(--text-3)]">·</span>
        <Link href="/contact" className="hover:text-[var(--text)] transition-colors">
          contact
        </Link>
      </div>

      {/* Infinite Marquee Ticker at the absolute bottom */}
      <div className="absolute bottom-[-16px] left-[-24px] right-[-24px] overflow-hidden border-t border-[var(--border)] py-2.5 bg-[var(--bg)]/90 backdrop-blur-sm z-30 select-none">
        <div className="animate-marquee font-mono text-[9px] uppercase tracking-wider text-[var(--text-3)] whitespace-nowrap">
          {Array(8).fill("ADITYA BHATIA — KANPUR — RESEARCHER — FOUNDER — BUILDER — IITK — PAXUS — BYTEFORGE — DOOM — ").join("")}
        </div>
      </div>
    </div>
  );
}
