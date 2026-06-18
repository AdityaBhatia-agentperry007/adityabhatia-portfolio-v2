'use client';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const AsciiDonut = dynamic(() => import('@/components/AsciiSphere'), { ssr: false });

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

      {/* Graphic Boxes Row */}
      <div className="mt-14 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-4">
        {/* Donut Animation Box */}
        <AsciiDonut />

        {/* Status / Info Graphic Box */}
        <div className="terminal-box">
          <div className="terminal-header border-b border-[var(--border)]">
            <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-wider">
              status.log
            </span>
          </div>
          <div className="p-4 font-mono text-[10px] text-[var(--text-2)] space-y-2.5" style={{ background: 'var(--code-bg)' }}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              <span className="text-[var(--text-3)]">RES</span>
              <span>cryptography research @ IIT kanpur</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              <span className="text-[var(--text-3)]">QNT</span>
              <span>top 1% globally @ IMC prosperity 4</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
              <span className="text-[var(--text-3)]">SYS</span>
              <span>ghostwriting for nvidia research</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] inline-block" />
              <span className="text-[var(--text-3)]">FND</span>
              <span>YC startup school · #1/3500+ @ polaris U2U</span>
            </div>
            <div className="border-t border-[var(--border)] pt-2 mt-2 text-[var(--text-3)]">
              <span className="text-[8px] uppercase tracking-widest">$ uptime: 17 yrs · location: kanpur · top 1% IMC</span>
            </div>
          </div>
        </div>
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
