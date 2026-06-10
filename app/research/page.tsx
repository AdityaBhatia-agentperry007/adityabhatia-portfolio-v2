import Link from 'next/link';

export const metadata = {
  title: 'research',
  description: 'current: IIT kanpur · cryptography, MPC, discrete diffusion',
};

export default function ResearchPage() {
  return (
    <div className="space-y-12 pt-4 select-none">
      {/* Header */}
      <div>
        <h1 className="font-sans font-bold text-3xl tracking-tight text-[var(--text)]">research</h1>
        <p className="text-sm text-[var(--text-3)] mt-2 font-mono">
          current: IIT kanpur · cryptography, MPC, discrete diffusion
        </p>
      </div>

      {/* SECTION 1 — MPC / garbled circuits */}
      <section className="space-y-4 pt-6 border-t border-[var(--border)]/40">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)]">// multi-party computation</h2>
        
        <div className="font-sans text-[15px] leading-relaxed text-[var(--text)] space-y-6">
          <p>
            research under <a href="https://scholar.google.com/citations?user=jeOME6wAAAAJ" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] underline decoration-[var(--border)] transition-colors">prof. adithya vadapalli</a> at IIT kanpur, working through the MPC stack — garbled circuits, oblivious transfer, and the protocols that make private computation actually work in practice rather than just in theory.
          </p>
          <p>
            the core question we're working on is about efficiency: standard garbled circuit constructions are correct but the constant factors are large enough that real deployments are limited to fairly simple functions. there's a lot of recent work on reducing the overhead through better gate representation and optimized OT protocols.
          </p>
          <p>
            the web app linked below (CryptoVault-MPC) is the live implementation of Yao's protocol and a few variants — you can run the millionaire's problem and other boolean circuits in the browser and see the garbled evaluation executing.
          </p>
          <p>
            if you're doing research in this area and want to talk, reach out.
          </p>
        </div>

        <div className="flex space-x-4 font-mono text-[11px] pt-2">
          <a
            href="https://web-app-garbled-circuits-zrds.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:opacity-85 transition-opacity"
          >
            live demo
          </a>
          <span className="text-[var(--border-2)]">|</span>
          <a
            href="https://github.com/AdityaBhatia-agentperry007/CryptoVault-MPC"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
          >
            github
          </a>
        </div>
      </section>

      {/* SECTION 2 — discrete diffusion / NLP */}
      <section className="space-y-4 pt-6 border-t border-[var(--border)]/40">
        <h2 className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-3)]">// hindi NLP — D2AR</h2>

        <div className="font-sans text-[15px] leading-relaxed text-[var(--text)] space-y-6">
          <p>
            co-authored with <a href="https://www.linkedin.com/in/pavitra-kushwaha/" target="_blank" rel="noopener noreferrer" className="text-[var(--text)] hover:text-[var(--accent)] underline decoration-[var(--border)] transition-colors">pavitra kushwaha</a>, running on IIT kanpur's HPC cluster. the project is a systematic benchmark comparing discrete diffusion language models against autoregressive baselines for hindi NLP — four tasks, eight models, five-step evaluation pipeline.
          </p>
          <p>
            the models: SEDD, LLaDA, MDLM, D3PM (diffusion side) vs. four autoregressive baselines. tasks: text classification, NER, question answering, generation. the benchmark is being designed to control for tokenization and data formatting differences that make a lot of existing cross-architecture comparisons hard to interpret.
          </p>
          <p>
            hindi is an interesting test case for this because the architectural tradeoffs that show up in diffusion vs. AR comparisons for english don't necessarily generalize — the morphology is richer, the word order is freer, and the tokenization decisions interact with the model architecture in ways that matter.
          </p>
          <p>
            not published yet. faculty recommendation letters are the validation path for now.
          </p>
        </div>

        <div className="flex space-x-4 font-mono text-[11px] pt-2">
          <a
            href="https://github.com/AdityaBhatia-agentperry007/D2AR-diffusion-vs-ar-hindi-nlp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--text-2)] hover:text-[var(--text)] transition-colors"
          >
            github
          </a>
        </div>
      </section>
    </div>
  );
}
