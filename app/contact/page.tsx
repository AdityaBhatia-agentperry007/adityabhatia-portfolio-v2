'use client';
import { useState } from 'react';

const MESSAGE_TEMPLATES = [
  {
    label: 'MPC Collab',
    text: "hey aditya, saw your Yao's millionaire protocol simulation. let's talk secure computation research.",
  },
  {
    label: 'SWE / Intern',
    text: "hey, we're building some high-throughput pipelines and saw your work. let's connect.",
  },
  {
    label: 'General Say Hello',
    text: "hey aditya, loved the portfolio design (especially the doom easter egg). let's chat.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const applyTemplate = (text: string) => {
    setFormData((prev) => ({ ...prev, message: text }));
  };

  return (
    <div className="space-y-8 pt-4 select-none">
      {/* Title & Subline */}
      <div>
        <h1 className="font-sans font-bold text-3xl tracking-tight text-[var(--text)]">contact</h1>
        <p className="text-[var(--text-2)] text-[15px] mt-2 font-sans leading-relaxed">
          building something real, doing research, or just want to talk — reach out. i'm usually faster over email.
        </p>
      </div>

      {/* Tabular Links */}
      <div className="space-y-2.5 font-mono text-xs text-[var(--text-2)]">
        {/* Name */}
        <div className="grid grid-cols-[100px_1fr]">
          <span className="text-[var(--text-3)]">name</span>
          <span className="text-[var(--text)] select-text font-bold">Aditya Bhatia</span>
        </div>

        {/* Primary Email */}
        <div className="grid grid-cols-[100px_1fr]">
          <span className="text-[var(--text-3)]">email (personal)</span>
          <a
            href="mailto:adityabhatia1505@gmail.com"
            className="hover:text-[var(--text)] transition-colors select-text inline-block w-fit text-[var(--text)] underline decoration-[var(--border)]"
          >
            adityabhatia1505@gmail.com
          </a>
        </div>

        {/* Work Email */}
        <div className="grid grid-cols-[100px_1fr]">
          <span className="text-[var(--text-3)]">email (work)</span>
          <a
            href="mailto:adi@paxus.in"
            className="hover:text-[var(--text)] transition-colors select-text inline-block w-fit text-[var(--text)] underline decoration-[var(--border)]"
          >
            adi@paxus.in
          </a>
        </div>

        {/* Other Social Links */}
        {[
          { label: 'linkedin', val: 'linkedin.com/in/aditya-bhatia-a88529399', href: 'https://linkedin.com/in/aditya-bhatia-a88529399' },
          { label: 'github', val: 'github.com/AdityaBhatia-agentperry007', href: 'https://github.com/AdityaBhatia-agentperry007' },
          { label: 'instagram', val: 'instagram.com/adiyabhatia', href: 'https://instagram.com/adiyabhatia' },
          { label: 'paxus', val: 'paxus.in', href: 'https://paxus.in' },
          { label: 'byteforge', val: 'byteforge.space', href: 'https://byteforge.space' },
        ].map((link) => (
          <div key={link.label} className="grid grid-cols-[100px_1fr]">
            <span className="text-[var(--text-3)]">{link.label}</span>
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--text)] transition-colors select-text inline-block w-fit"
            >
              {link.val}
            </a>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-[var(--border)] my-8" />

      {/* Contact Form */}
      <div>
        {status === 'success' ? (
          <p className="font-mono text-xs text-[var(--text-2)]">
            sent. i'll get back to you.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-[500px]">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-3)]">
                name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-sans text-sm p-2.5 focus:border-[var(--border-2)] focus:outline-none transition-colors select-text"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-3)]">
                email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-sans text-sm p-2.5 focus:border-[var(--border-2)] focus:outline-none transition-colors select-text"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="message" className="block font-mono text-[10px] uppercase tracking-wider text-[var(--text-3)]">
                  message
                </label>
                
                {/* Message drafts selector */}
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[9px] text-[var(--text-3)] uppercase">autofill:</span>
                  {MESSAGE_TEMPLATES.map((tmpl) => (
                    <button
                      key={tmpl.label}
                      type="button"
                      onClick={() => applyTemplate(tmpl.text)}
                      className="font-mono text-[9px] text-[var(--text-2)] hover:text-[var(--text)] hover:underline cursor-pointer border border-[var(--border)] px-1.5 py-0.5 bg-[var(--surface)]"
                    >
                      {tmpl.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] font-sans text-sm p-2.5 focus:border-[var(--border-2)] focus:outline-none transition-colors resize-none select-text"
              />
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-[var(--text)] text-[var(--bg)] font-mono text-[11px] uppercase tracking-widest px-6 py-2.5 hover:opacity-85 disabled:opacity-50 transition-opacity cursor-pointer font-bold"
              >
                {status === 'submitting' ? 'sending...' : 'send →'}
              </button>

              {status === 'error' && (
                <p className="font-mono text-xs text-[var(--accent)] animate-shake">
                  something broke — try adi@paxus.in directly
                </p>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
