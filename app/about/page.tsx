import Link from 'next/link';

export const metadata = {
  title: 'about',
  description: '17, from kanpur, still in class 12. cryptography researcher at IIT Kanpur.',
};

export default function AboutPage() {
  return (
    <div className="space-y-12 pt-4 select-none">
      {/* SECTION 1 — intro */}
      <section className="font-sans text-[15px] leading-relaxed text-[var(--text)] space-y-6">
        <p>
          17, from kanpur, still in class 12.
        </p>
        <p>
          co-founded <a href="https://paxus.in" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] underline decoration-[var(--border)] transition-colors">paxus</a> at 16 and we've been building since — raised from emergent labs and hashed emergent. found real security holes in openai and anthropic over two separate months and both of them acknowledged it. placed in the top 1% globally at imc prosperity 4 out of 22,000+ teams from jane street, goldman, top university quant programs. doing MPC and cryptography research at IIT kanpur under <a href="https://scholar.google.com/citations?user=jeOME6wAAAAJ" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] underline decoration-[var(--border)] transition-colors">prof. adithya vadapalli</a>. co-founded <a href="https://byteforge.space" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] underline decoration-[var(--border)] transition-colors">byteforge</a> with pavitra — 4,500 builders across north india now. also CTO at a stealth AI hardware startup incubated at IITK, funded at ₹1.5cr.
        </p>
        <p>
          honestly a lot of it happened because i just kept showing up and asking.
        </p>
      </section>

      {/* SECTION 2 — now */}
      <section className="space-y-4 pt-6 border-t border-[var(--border)]/40 font-mono text-xs">
        <div>
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-3">// now</h2>
          <ul className="space-y-2 text-[var(--text-2)]">
            <li className="flex items-start">
              <span className="text-[var(--accent)] mr-2">→</span>
              <span>building orca AI — task automation on Android, no extra app needed</span>
            </li>
            <li className="flex items-start">
              <span className="text-[var(--accent)] mr-2">→</span>
              <span>MPC and garbled circuit research @ IIT kanpur, under prof. adithya vadapalli</span>
            </li>
            <li className="flex items-start">
              <span className="text-[var(--accent)] mr-2">→</span>
              <span>CTO at a stealth AI hardware startup, incubated IITK, funded ₹1.5cr</span>
            </li>
          </ul>
        </div>
        <div className="pt-2">
          <h2 className="text-[10px] uppercase tracking-widest text-[var(--text-3)] mb-2">// previously</h2>
          <p className="text-[var(--text-2)] pl-4">
            paxus · byteforge · lumenseed · quantumedge · D2AR / neuralbhasha
          </p>
        </div>
      </section>

      {/* SECTION 3 — for context */}
      <section className="space-y-4 pt-6 border-t border-[var(--border)]/40">
        <div>
          <h2 className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)]">// for context</h2>
          <p className="text-xs text-[var(--text-3)] mt-1 font-mono">
            things that have happened, roughly in order of when they became real.
          </p>
        </div>

        <div className="border border-[var(--border)] bg-[var(--code-bg)] overflow-x-auto select-text">
          <table className="w-full text-left border-collapse font-mono text-[11px] min-w-[500px]">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-3)] uppercase text-[9px]">
                <th className="p-3 font-normal">what</th>
                <th className="p-3 font-normal">context</th>
                <th className="p-3 font-normal">detail</th>
              </tr>
            </thead>
            <tbody className="text-[var(--text-2)]">
              {[
                { what: 'polaris uniform2unicorn', ctx: "india's top young founder '26", det: '#1 across 3,500+ applicants, ₹1,00,000' },
                { what: 'paxus', ctx: 'co-founded at 16, venture-backed', det: 'raised from emergent labs + hashed emergent' },
                { what: 'orca AI', ctx: 'task automation, zero interface', det: 'running on Android via WhatsApp / Telegram' },
                { what: 'argus', ctx: 'personal intelligence system', det: 'live multi-feed, runs on my own hardware' },
                { what: 'IIT kanpur — cryptography', ctx: 'MPC, garbled circuits, OT', det: 'under prof. adithya vadapalli' },
                { what: 'openai — security research', ctx: 'found a vulnerability, responsible disclosure', det: 'acknowledged and rewarded' },
                { what: 'anthropic — security research', ctx: 'found another one, separate month', det: 'acknowledged and rewarded' },
                { what: 'IMC prosperity 4', ctx: "world's largest quant competition", det: 'top 1% globally, 22,000+ teams' },
                { what: 'byteforge', ctx: "north india's largest student tech community", det: '4,500 members, hack club partner' },
                { what: 'lumenseed AI', ctx: 'AI medical report interpreter', det: '1st place, techfest IIT bombay medibot' },
                { what: 'neuralbhasha / D2AR', ctx: 'hindi NLP benchmark, 8 models, 4 tasks', det: 'most thorough one that exists' },
                { what: 'shark tank india', ctx: 'got an invite', det: 'upcoming' },
                { what: '50+ competition wins', ctx: 'school → national → international', det: 'robotics, maths, code, design, science' },
                { what: 'RMO', ctx: 'regional maths olympiad', det: 'qualified for the national round' },
                { what: 'Y combinator startup school', ctx: 'selected and completed', det: '—' },
                { what: 'techfest IIT bombay', ctx: 'invited to present', det: 'twice — grade 9 and grade 11' },
                { what: 'CTO — IITK AI hardware startup', ctx: 'stealth, incubated at IIT kanpur', det: 'funded at ₹1.5cr' },
                { what: 'CBSE class 10', ctx: 'board exams', det: '96%' },
                { what: 'NASO', ctx: 'national astronomy science olympiad', det: 'national bronze' }
              ].map((row, idx) => (
                <tr key={idx} className="border-b border-[var(--border)]/60 hover:bg-[var(--surface)] transition-colors">
                  <td className="p-3 text-[var(--text)] whitespace-nowrap">{row.what}</td>
                  <td className="p-3 whitespace-nowrap">{row.ctx}</td>
                  <td className="p-3">{row.det}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 4 — the kanpur thing */}
      <section className="space-y-4 pt-6 border-t border-[var(--border)]/40">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)]">// the kanpur thing</h2>
        <div className="font-sans text-[15px] leading-relaxed text-[var(--text)] space-y-6">
          <p>
            there isn't really a startup ecosystem here. no VCs doing office hours, no coworking spaces with other people building things, no obvious path from idea to real thing. most of the city is manufacturing and trading, which is a different kind of industry entirely and doesn't overlap much with software.
          </p>
          <p>
            i think for a while i thought that was the problem — that if i were somewhere else, things would move faster. and that's partly true. access matters. connections matter. but the more i've actually done, the less i believe that location is the variable that determines whether something happens.
          </p>
          <p>
            byteforge exists because the community wasn't here so pavitra and i built it. the IIT kanpur research exists because i emailed the lab and asked. paxus exists because we started it.
          </p>
          <p>
            that's kind of it. the things that happened, happened because we started them, not because kanpur provided them. i don't think that's a special insight — it's probably obvious to most people — but it took a while to actually internalize it rather than just repeat it.
          </p>
        </div>
      </section>
    </div>
  );
}
