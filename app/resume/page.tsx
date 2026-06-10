'use client';
import Link from 'next/link';
import { ArrowLeft, Mail, MapPin, Briefcase, GraduationCap, Code } from 'lucide-react';

export default function ResumePage() {
  return (
    <div className="space-y-8 pt-4 select-text">
      {/* Header Back Button */}
      <Link 
        href="/" 
        className="inline-flex items-center space-x-2 font-mono text-[11px] text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
      >
        <ArrowLeft size={12} />
        <span>back to home</span>
      </Link>

      {/* Main Info */}
      <div className="space-y-2">
        <h1 className="font-sans font-bold text-4xl tracking-tight text-[var(--text)]">
          Aditya Bhatia
        </h1>
        <p className="text-base text-[var(--text-2)] font-sans">
          researcher · founder · builder
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-[var(--text-3)] uppercase tracking-wider pt-1">
          <div className="flex items-center space-x-1.5">
            <MapPin size={10} />
            <span>Kanpur, India</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Mail size={10} />
            <span>adi@paxus.in</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Mail size={10} />
            <span>adityabhatia1505@gmail.com</span>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] my-6" />

      {/* Experience Section */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2 text-[var(--text)] font-semibold font-sans">
          <Briefcase size={16} className="text-red-500" />
          <h2 className="text-lg">Experience</h2>
        </div>

        <div className="space-y-6 pl-6 border-l border-[var(--border)]">
          {/* PaXus */}
          <div className="space-y-1 relative">
            <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[var(--bg)]" />
            <div className="flex justify-between items-start flex-wrap gap-2">
              <h3 className="font-semibold text-sm text-[var(--text)]">Co-Founder</h3>
              <span className="font-mono text-[10px] text-[var(--text-3)]">2024 — PRESENT</span>
            </div>
            <p className="font-mono text-[11px] text-[var(--text-2)] uppercase">PaXus</p>
            <p className="text-xs text-[var(--text-2)] leading-relaxed pt-1">
              Designing and implementing high-speed cryptographic libraries, secure multi-party computation (MPC) frameworks, and decentralized telemetry nodes.
            </p>
          </div>

          {/* ByteForge */}
          <div className="space-y-1 relative">
            <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--border-2)] border-2 border-[var(--bg)]" />
            <div className="flex justify-between items-start flex-wrap gap-2">
              <h3 className="font-semibold text-sm text-[var(--text)]">Co-Founder</h3>
              <span className="font-mono text-[10px] text-[var(--text-3)]">2023 — PRESENT</span>
            </div>
            <p className="font-mono text-[11px] text-[var(--text-2)] uppercase">ByteForge</p>
            <p className="text-xs text-[var(--text-2)] leading-relaxed pt-1">
              Building optimized systems utilities, developer command-line tools, and custom performance middleware.
            </p>
          </div>

          {/* IIT Kanpur */}
          <div className="space-y-1 relative">
            <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--border-2)] border-2 border-[var(--bg)]" />
            <div className="flex justify-between items-start flex-wrap gap-2">
              <h3 className="font-semibold text-sm text-[var(--text)]">Cryptography Researcher</h3>
              <span className="font-mono text-[10px] text-[var(--text-3)]">2023 — PRESENT</span>
            </div>
            <p className="font-mono text-[11px] text-[var(--text-2)] uppercase">IIT Kanpur</p>
            <p className="text-xs text-[var(--text-2)] leading-relaxed pt-1">
              Investigating state-of-the-art zero-knowledge proof primitives and secure protocols. Contributing to localized language translation benchmarking models.
            </p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2 text-[var(--text)] font-semibold font-sans">
          <GraduationCap size={16} className="text-red-500" />
          <h2 className="text-lg">Education</h2>
        </div>

        <div className="space-y-4 pl-6 border-l border-[var(--border)]">
          <div className="space-y-1 relative">
            <div className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-red-500 border-2 border-[var(--bg)]" />
            <div className="flex justify-between items-start flex-wrap gap-2">
              <h3 className="font-semibold text-sm text-[var(--text)]">Indian Institute of Technology, Kanpur</h3>
              <span className="font-mono text-[10px] text-[var(--text-3)]">KANPUR, INDIA</span>
            </div>
            <p className="text-xs text-[var(--text-2)]">Focus in Cryptography, Secure Computation, and Advanced Systems Architecture.</p>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center space-x-2 text-[var(--text)] font-semibold font-sans">
          <Code size={16} className="text-red-500" />
          <h2 className="text-lg">Skills</h2>
        </div>

        <div className="flex flex-wrap gap-2 pl-6">
          {['Cryptography', 'Zero-Knowledge Proofs', 'MPC', 'Rust', 'Go', 'Next.js', 'React', 'TypeScript', 'Node.js', 'System Architecture'].map((skill) => (
            <span 
              key={skill}
              className="px-2.5 py-1 bg-[var(--surface)] border border-[var(--border)] rounded font-mono text-[10px] text-[var(--text-2)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
