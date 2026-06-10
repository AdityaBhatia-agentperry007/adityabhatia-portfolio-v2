# ADITYA BHATIA — adityabhatia.dev
## Google Antigravity Build Specification v2 — Full Rebuild

---

## PART A — WHAT IS GOOGLE ANTIGRAVITY

Google Antigravity is Google's agentic AI coding environment — powered by Gemini 3 Pro,
available free at `antigravity.google/download` for Mac, Windows, Linux.

The key difference from Cursor: the **Manager Surface** flips who's in control.
The agent is the primary actor. Your editor is just one of its surfaces.

**How it works:**
- **Planning Mode** — agent generates a full `tasks.md` before touching any file.
  You review, annotate, approve. Nothing is built until you say so.
- **GitHub MCP** — built-in. Pushes directly to your repo, Vercel auto-deploys.
- **Parallel agents** — spawn multiple working on different tasks at once.
- **Artifacts** — implementation plans and browser recordings you annotate like a doc.

**Workflow for this project:**
```
1. Open Antigravity → New Project
2. Enter Planning Mode → paste everything under PART C
3. Review tasks.md → annotate anything wrong
4. Approve → agents build page by page
5. GitHub MCP → push to AdityaBhatia-agentperry007/personal-website
6. Vercel auto-deploys on push
```

---

## PART B — PRE-FLIGHT (4 steps before running)

**1.** Download: `antigravity.google/download`

**2.** Connect GitHub MCP
Settings → MCP Servers → Connect GitHub → authorize `AdityaBhatia-agentperry007`
Target repo: create new repo `personal-website`

**3.** Set up Resend (contact form email, free)
`resend.com` → create account → API Keys → save as `RESEND_API_KEY=re_xxxx`

**4.** Set up Vercel
`vercel.com` → New Project → import `personal-website` → add env vars → deploy
Domain: add `adityabhatia.dev` → DNS records:
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```

---

## PART C — THE FULL ANTIGRAVITY PROMPT
### ▼ PASTE EVERYTHING BELOW THIS LINE INTO ANTIGRAVITY ▼

---

**PROJECT:** Personal portfolio — adityabhatia.dev — for Aditya Bhatia, 17, from Kanpur.
Multi-page website. Not a single scroll page. Every section is its own URL.
Minimal, dark, handcrafted feel. Influenced by thijs.gg, Palantir Gotham (subtle),
and the garbled circuits app at web-app-garbled-circuits-zrds.vercel.app.
Particle dot grid lives behind everything as a fixed background layer.

---

### TECH STACK

```
Framework:     Next.js 15 (App Router, TypeScript strict)
Styling:       Tailwind CSS v4
Animations:    Framer Motion 11
Fonts:         next/font → Geist + Geist Mono
Email:         Resend SDK
Analytics:     @vercel/analytics
OG images:     @vercel/og
Blog:          next-mdx-remote + gray-matter + reading-time
Particle bg:   HTML5 Canvas (custom component, see ParticleGrid spec)
```

---

### DESIGN SYSTEM

**Color tokens — define in globals.css:**
```css
:root {
  --bg:           #080808;
  --surface:      #0f0f0f;
  --surface-2:    #161616;
  --border:       #1e1e1e;
  --border-2:     #2a2a2a;
  --text:         #ececec;
  --text-2:       #888888;
  --text-3:       #444444;
  --accent:       #e63946;
  --accent-dim:   rgba(230, 57, 70, 0.08);
  --code-bg:      #0c0c0c;
  --grid-dot:     rgba(255, 255, 255, 0.09);
}
```

**Typography:**
```
Display (name, h1):    Geist, 700, clamp(2.2rem, 5vw, 3.2rem)
Section heading (h2):  Geist, 600, 1.4rem
Body:                  Geist, 400, 1rem, line-height 1.8
Body small:            Geist, 400, 0.875rem, line-height 1.7
Label/meta:            Geist Mono, 400, 0.72rem, uppercase, letter-spacing 0.1em, --text-3
Code inline:           Geist Mono, 400, 0.85em
Prose (blog):          Geist, 400, 1.05rem, line-height 1.9, max-width 620px
```

**Layout:**
```
Page container:   max-width 680px, margin auto, padding 0 24px
Nav height:       56px
Section gap:      80px vertical
Border radius:    0 everywhere — no rounded corners, no pills
Box shadows:      none
```

**Gotham influence (subtle only):**
```
- The particle dot grid behind every page (feels like a data/ops grid)
- Monospace labels on all metadata (dates, tags, categories)
- Receipts table rendered like an intel brief
- /argus page has a "restricted access" feel
- Breadcrumb nav on inner pages: "aditya / work / orca-ai" — Geist Mono, small
- Hover states: border-color steps from --border to --border-2 (never fills bg)
```

**Interaction rules:**
```
Links:          no underline by default, opacity 0.55 on hover, transition 180ms ease
Hover on cards: border-color shifts one step brighter (--border → --border-2)
Active pages:   nav link renders at full opacity with tiny left border-accent marker
Scroll:         Framer Motion fadeInUp on each section (y:16 opacity:0 → y:0 opacity:1,
                duration 0.38s, once: true, viewport margin -60px)
Cursor:         default. no custom cursor.
```

---

### PARTICLE GRID — ParticleGrid.tsx (client component)

Create `/components/ParticleGrid.tsx`:

```tsx
'use client';
import { useEffect, useRef } from 'react';

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID = 42;       // px between dots
    const DOT_R = 1.1;     // dot radius
    const BASE_A = 0.09;   // base opacity
    const MOUSE_R = 100;   // mouse influence radius

    let W = window.innerWidth;
    let H = document.documentElement.scrollHeight;
    let raf: number;
    let mouse = { x: -999, y: -999 };
    let scrollY = 0;

    canvas.width = W;
    canvas.height = H;

    type Dot = { x: number; y: number; phase: number; speed: number };
    const dots: Dot[] = [];

    const buildDots = () => {
      dots.length = 0;
      for (let x = GRID / 2; x < W; x += GRID) {
        for (let y = GRID / 2; y < H; y += GRID) {
          dots.push({ x, y, phase: Math.random() * Math.PI * 2, speed: 0.25 + Math.random() * 0.35 });
        }
      }
    };
    buildDots();

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const my = mouse.y + scrollY;

      for (const d of dots) {
        const dy = d.y + Math.sin(t * d.speed + d.phase) * 1.4;
        const dx2 = d.x - mouse.x;
        const dy2 = dy - my;
        const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const boost = dist < MOUSE_R ? (1 - dist / MOUSE_R) * 0.22 : 0;
        ctx.beginPath();
        ctx.arc(d.x, dy, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236,236,236,${BASE_A + boost})`;
        ctx.fill();
      }

      t += 0.007;
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = document.documentElement.scrollHeight;
      canvas.width = W;
      canvas.height = H;
      buildDots();
    };
    const onMouse = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    const onScroll = () => { scrollY = window.scrollY; };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('scroll', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        pointerEvents: 'none', zIndex: 0,
        opacity: 1,
      }}
    />
  );
}
```

Mount `<ParticleGrid />` in `layout.tsx` as first child of `<body>`, before everything else.
All page content sits above it via `position: relative; z-index: 1`.

---

### MULTI-PAGE ARCHITECTURE — FULL SITEMAP

```
/                         Home — name, tagline, nav portals
/about                    Bio + now/previously + "for context" table + kanpur piece
/work                     Project grid (all 8)
/work/orca-ai             Project writeup
/work/argus               Project writeup
/work/quantum-edge        Project writeup
/work/cryptovault-mpc     Project writeup
/work/neuralbhasha        Project writeup
/work/lumenseed           Project writeup
/work/byteforge           Project writeup
/work/b2bharat            Project writeup
/research                 IIT Kanpur research page
/writing                  Blog post list
/writing/[slug]           Individual blog post (MDX)
/argus/auth               Password gate
/argus                    Protected project page
/contact                  Contact
/resume                   Redirect → /resume.pdf
/api/contact              POST → Resend
/api/og                   OG image generation
/api/argus-auth           POST → set session cookie
```

---

### FILE STRUCTURE

```
/app
  layout.tsx
  page.tsx                       ← home
  /about/page.tsx
  /work/page.tsx
  /work/[slug]/page.tsx
  /research/page.tsx
  /writing/page.tsx
  /writing/[slug]/page.tsx
  /argus/page.tsx
  /argus/auth/page.tsx
  /contact/page.tsx
  /resume/page.tsx               ← redirect
  /api/contact/route.ts
  /api/og/route.tsx
  /api/argus-auth/route.ts

/components
  ParticleGrid.tsx
  Nav.tsx
  Breadcrumb.tsx
  Footer.tsx
  ProjectCard.tsx
  DoomEasterEgg.tsx

/content
  /work
    orca-ai.mdx
    argus.mdx
    quantum-edge.mdx
    cryptovault-mpc.mdx
    neuralbhasha.mdx
    lumenseed.mdx
    byteforge.mdx
    b2bharat.mdx
  /writing
    _template.mdx

/lib
  projects.ts
  blog.ts
  metadata.ts

/public
  favicon.svg
  resume.pdf                     ← placeholder, replace when ready
```

---

### NAV — Nav.tsx

```
Position: fixed top, full-width, z-50, height 56px
Background: transparent initially
On scroll > 40px: background var(--bg) with 1px border-bottom var(--border)
Transition: 200ms ease

Content (container width, flex, space-between):
  Left:  "aditya." — Geist 700, --text, links to /
  Right: links in Geist Mono 0.75rem, --text-3, horizontal gap 24px:
         "work"  "research"  "writing"  "contact"

Active page: that link renders --text color (full opacity)
Mobile (<640px): right side collapses to a minimal hamburger or just "menu" text
```

---

### BREADCRUMB — Breadcrumb.tsx

```
Show on all inner pages (/work/*, /writing/*, /about, /research, /contact)
Position: below nav, top of page content

Renders: "aditya / [section] / [page if applicable]"
Font: Geist Mono, 0.72rem, --text-3, letter-spacing 0.06em
Links: each segment links to its route
No decorative icons — just plain text with " / " separator
```

---

### HOME PAGE — /

```
Full viewport height, ParticleGrid behind everything.
Center content vertically and horizontally (flex column, justify center).
Left-aligned text inside container.

Line 1: "Aditya Bhatia" — display size, Geist 700, --text
Line 2: "researcher · founder · builder" — 1rem, --text-2
Line 3: "kanpur, india" — 0.875rem, Geist Mono, --text-3, margin-top 4px

Gap: 48px

Nav portals — 5 inline links, Geist Mono, 0.8rem, --text-2, spaced " · ":
  "work" → /work
  "research" → /research
  "writing" → /writing
  "about" → /about
  "contact" → /contact

At the very bottom of the viewport (absolute bottom 0, full width):
Marquee ticker: infinite leftward, 32s speed
Text (repeating): "ADITYA BHATIA — KANPUR — RESEARCHER — FOUNDER — BUILDER — IITK — PAXUS — BYTEFORGE — DOOM — "
Font: Geist Mono, 0.68rem, --text-3, uppercase, letter-spacing 0.1em
Border-top: 1px solid var(--border)
Padding: 9px 0
```

---

### ABOUT PAGE — /about

Breadcrumb: "aditya / about"

#### SECTION 1 — intro

No label. Just text. Starts right below breadcrumb + 40px gap.

Copy (render exactly, all lowercase, preserve line breaks between paragraphs):
```
17, from kanpur, still in class 12.

co-founded paxus at 16 and we've been building since — raised from emergent labs
and hashed emergent. found real security holes in openai and anthropic over two
separate months and both of them acknowledged it. placed in the top 1% globally
at imc prosperity 4 out of 22,000+ teams from jane street, goldman, top university
quant programs. doing MPC and cryptography research at IIT kanpur under
prof. adithya vadapalli. co-founded byteforge with pavitra — 4,500 builders
across north india now. also CTO at a stealth AI hardware startup incubated
at IITK, funded at ₹1.5cr.

honestly a lot of it happened because i just kept showing up and asking.
```

Link "prof. adithya vadapalli" → https://scholar.google.com/citations?user=jeOME6wAAAAJ
Link "byteforge" → https://byteforge.space
Link "paxus" → https://paxus.in

#### SECTION 2 — now

Label: "now"

Content (render as plain lines, → prefix, body-small):
```
→ building orca AI — task automation on Android, no extra app needed
→ MPC and garbled circuit research @ IIT kanpur, under prof. adithya vadapalli
→ CTO at a stealth AI hardware startup, incubated IITK, funded ₹1.5cr
```

Sub-label: "previously"
```
→ paxus · byteforge · lumenseed · quantumedge · D2AR / neuralbhasha
```

#### SECTION 3 — for context

Label: "for context"
Sub-line (--text-3, body-small, margin-bottom 24px): "things that have happened, roughly in order of when they became real."

Render as a styled table. Same monospace code-block feel:
Background var(--code-bg), border 1px var(--border), padding 0, full container width.
Font: Geist Mono, 0.78rem.
Header: --text-3, uppercase. Rows: --text-2, border-bottom 1px var(--border).
Row hover: background var(--surface).
Mobile: overflow-x auto.

Three columns: "what" | "context" | "detail"

Rows (render ALL):
| what | context | detail |
|---|---|---|
| polaris uniform2unicorn | india's top young founder '26 | #1 across 3,500+ applicants, ₹1,00,000 |
| paxus | co-founded at 16, venture-backed | raised from emergent labs + hashed emergent |
| orca AI | task automation, zero interface | running on Android via WhatsApp / Telegram |
| argus | personal intelligence system | live multi-feed, runs on my own hardware |
| IIT kanpur — cryptography | MPC, garbled circuits, OT | under prof. adithya vadapalli |
| openai — security research | found a vulnerability, responsible disclosure | acknowledged and rewarded |
| anthropic — security research | found another one, separate month | same outcome |
| IMC prosperity 4 | world's largest quant competition | top 1% globally, 22,000+ teams |
| byteforge | north india's largest student tech community | 4,500 members, hack club partner |
| lumenseed AI | AI medical report interpreter | 1st place, techfest IIT bombay medibot |
| neuralbhasha / D2AR | hindi NLP benchmark, 8 models, 4 tasks | most thorough one that exists |
| shark tank india | got an invite | upcoming |
| 50+ competition wins | school → national → international | robotics, maths, code, design, science |
| RMO | regional maths olympiad | qualified for the national round |
| Y combinator startup school | selected and completed | — |
| techfest IIT bombay | invited to present | twice — grade 9 and grade 11 |
| CTO — IITK AI hardware startup | stealth, incubated at IIT kanpur | funded at ₹1.5cr |
| CBSE class 10 | board exams | 96% |
| NASO | national astronomy science olympiad | national bronze |

#### SECTION 4 — the kanpur thing

Label: "the kanpur thing"

Copy (render exactly, all lowercase):
```
there isn't really a startup ecosystem here. no VCs doing office hours, no coworking
spaces with other people building things, no obvious path from idea to real thing.
most of the city is manufacturing and trading, which is a different kind of industry
entirely and doesn't overlap much with software.

i think for a while i thought that was the problem — that if i were somewhere else,
things would move faster. and that's partly true. access matters. connections matter.
but the more i've actually done, the less i believe that location is the variable
that determines whether something happens.

byteforge exists because the community wasn't here so pavitra and i built it.
the IIT kanpur research exists because i emailed the lab and asked.
paxus exists because we started it.

that's kind of it. the things that happened, happened because we started them,
not because kanpur provided them. i don't think that's a special insight —
it's probably obvious to most people — but it took a while to actually internalize it
rather than just repeat it.
```

---

### WORK PAGE — /work

Breadcrumb: "aditya / work"

Label: "work"
Sub-line (--text-3, body-small): "things i've built, in the order i'm most interested in talking about them."

Grid: 2 columns desktop, 1 column mobile, gap 14px.

Each card (ProjectCard.tsx):
```
Border: 1px solid var(--border)
Padding: 22px
Background: transparent
Hover: border-color var(--border-2), transition 160ms
No border-radius

Anatomy (top to bottom):
  [Year] — Geist Mono, 0.7rem, --text-3
  [Title] — 1rem, Geist 600, --text, links to /work/[slug]
  [One-line desc] — 0.875rem, --text-2, margin-top 6px, line-height 1.6
  [Tags] — Geist Mono, 0.7rem, --text-3, margin-top 14px, space-separated " · "
  [Demo link if exists] — Geist Mono, 0.7rem, --accent, margin-top 8px, "↗ live demo"
```

Cards data:
```
slug: orca-ai | year: 2025 | title: Orca AI
desc: task automation on android — no new app, no interface to learn, just what you need done
tags: TypeScript · Node.js · LLMs · Android · accessibility API

slug: argus | year: 2025 | title: Argus
desc: personal intelligence system — multiple feeds, real-time understanding, runs on my hardware
tags: Python · OpenCV · FFmpeg · YOLO · multi-feed tracking

slug: quantum-edge | year: 2024 | title: QuantumEdge
desc: top 1% globally at IMC prosperity 4 — ETF signals, options analytics, market making
tags: Python · Rust · GARCH · Black-Scholes · Hyperopt TPE

slug: cryptovault-mpc | year: 2024 | title: CryptoVault-MPC
desc: garbled circuits and oblivious transfer, implemented and running — research at IIT kanpur
tags: Python · JavaScript · MPC · garbled circuits · oblivious transfer
demo: https://web-app-garbled-circuits-zrds.vercel.app/

slug: neuralbhasha | year: 2024 | title: NeuralBhasha / D2AR
desc: hindi NLP benchmark — 8 models, 4 tasks, the most thorough one that exists
tags: Python · PyTorch · HuggingFace · discrete diffusion · NLP

slug: lumenseed | year: 2024 | title: LumenSeed AI
desc: medical report interpreter in plain language — 1st place, techfest IIT bombay medibot
tags: TypeScript · Next.js · LangChain · Gemini

slug: byteforge | year: 2023 | title: ByteForge
desc: north india's largest independent student tech community — 4,500 members
tags: community · events · hack club partner · IIT partnerships
demo: https://byteforge.space

slug: b2bharat | year: 2024 | title: B2Bharat
desc: B2B marketplace for indian manufacturers and retailers — live, deployed
tags: JavaScript · full-stack · MongoDB
```

---

### PROJECT WRITEUPS — /work/[slug]

Each project page uses the same layout:

```
Breadcrumb: "aditya / work / [slug]"
Year + tags row: Geist Mono, 0.72rem, --text-3
Title: h1, display
One-line desc: --text-2, 1rem, margin-bottom 32px
Divider: 1px var(--border)
Prose content: (see per-project content below)
  Font: Geist, 1.05rem, line-height 1.9, max-width 620px, --text
Links section (if exists):
  Label: "links" (Geist Mono, small)
  Items: github / demo / research as inline text links
Footer (same as all pages)
```

Prose styles for project writeups:
```
p: margin-bottom 1.5em
h3: Geist 600, 1.15rem, --text, margin-top 2.5em, margin-bottom 0.6em
a: color --text-2, no underline, hover --text, transition 150ms
code: background var(--code-bg), Geist Mono, 0.85em, border 1px var(--border), px-1.5 py-0.5
blockquote: border-left 2px solid var(--accent), pl-4, --text-2, font-style normal
strong: Geist 600, --text
```

---

### PROJECT BLOG CONTENT (write exactly as specified, do not change wording)

---

#### ORCA AI — /work/orca-ai

Tags: TypeScript · Node.js · LLMs · Android
Status: near complete · private

---

the thought that started orca was pretty simple — the number of steps between wanting
something done and it actually happening is almost always too many and people have just
accepted that as normal

like if you want to set a reminder you open your phone, find the right app among the
200 things on your home screen, navigate whatever interface they built, type or speak the
thing, confirm it, close the app — and that's one of the easier cases. scheduling something,
booking something, sending money to someone — each of those has its own app with its own
interface with its own learning curve, and the apps keep multiplying

india specifically has around 500 million people on mobile who are genuinely not
downloading one more app for one more specific thing. not because they can't, but because
the cumulative overhead of it is just too high. my mom is perfectly capable of doing
anything she needs to do. she manages a household and negotiates prices and keeps track
of 20 different things at once. but she'll ask me to help with something on her phone
because the interface is hostile in ways that have nothing to do with whether she
understands what she wants

so orca is the version where none of that friction exists. you say what you need in
whatever language you're comfortable in, through whatever app you're already using
(WhatsApp or Telegram since those are already on the phones), and something handles
the execution without you having to locate an app or learn how it works

the technical layer underneath is Android's accessibility API — it's the same layer
that screen readers use, which gives you programmatic control of the UI of any installed
app. the LLM sits on top of that and handles intent parsing: figuring out what you
actually want from natural language, deciding which capability handles it, and generating
the sequence of actions to execute it

the hard part isn't the core mechanism — that part works. it's making it robust enough
that the 15% of edge cases don't completely break the experience. ambiguous instructions,
apps that update their UI, actions that partially complete and need recovery. those are
genuinely unsolved right now and i don't think there's a clean answer yet

what i keep thinking about is the population this actually helps. not the people who
already navigate smartphones fluently — they have faster options. it's the ones for whom
every new app is another thing to learn from scratch, and who shouldn't have to

---

Links:
- github: private
- status: active build

---

#### ARGUS — /work/argus

Tags: Python · OpenCV · FFmpeg · YOLO · multi-feed tracking
Status: active build · private

---

i got genuinely interested in palantir's gotham system at some point — not the politics
around it, that's a whole separate conversation — but the actual technical idea underneath it.

most surveillance setups are just expensive recording systems. they capture everything,
store it, and you search through it after something has already happened. what gotham does,
or is supposed to do, is closer to actual intelligence work — correlating information
across multiple sources in real time, surfacing connections and anomalies without you
having to manually look for them. it's the difference between having footage and having
a system that actually watches

i wanted to build my own version of that

the base is OSIRIS, an open source intelligence platform under MIT license, and what
i've been building on top of it is the intelligence layer — the part that actually
interprets what the cameras see rather than just streaming the footage

multi-feed tracking is the first hard problem: keeping track of objects and people
across multiple camera views simultaneously, maintaining identity even when they move
off one feed and onto another. object detection with YOLO gives you "what is this thing"
in real time. the correlation layer is what takes events happening in separate feeds
and asks whether they're connected — something appearing in camera A and then camera B
40 seconds later, for example, gets surfaced as a related event rather than two
unrelated detections

everything runs on my own hardware. that was a deliberate decision early on. no cloud
service, no third party anywhere in the pipeline. the data stays local and that's the
point

what's been surprising is how much of what palantir sells is genuinely just smart
engineering decisions about data flow and latency rather than some proprietary breakthrough.
the core computer vision components are all open source and well-developed. what they built
is the system design around them — how you make multiple streams process efficiently,
how you present the correlations to an analyst, how you handle the volume of events
without overwhelming whoever's watching

i'm still building this. it's not polished and there are things that break. but the
core loop — watch, understand, correlate, surface — actually functions, which is more
than i expected when i started

---

Links:
- github: private
- base: OSIRIS (MIT license)

---

#### QUANTUMEDGE — /work/quantum-edge

Tags: Python · Rust · GARCH · Black-Scholes · Hyperopt TPE · Johansen cointegration
Status: complete · competition

---

someone sent me the imc prosperity 4 announcement in a group chat and i'd had approximately
zero experience with actual financial markets at the time. i knew the concepts at a surface
level — markets, prices, the general idea of trading — but the actual mechanics of how
order books work, what market makers do, how options are priced, what volatility really
means as a mathematical quantity — i had to learn all of that from scratch while the
competition was already running

22,000+ teams from places like Jane Street and Goldman and university quant programs.
i entered because it seemed hard

the first week was mostly reading. bergomi's book on volatility, hull on options,
a few academic papers on market microstructure that were dense enough that i had to
read some sections three or four times before they made sense. things that people study
for four years in a quant finance program, i was trying to absorb in a few days while
also building

there were three separate research tracks i ended up building

the first was ETF cointegration analysis. the competition had products whose prices
were mathematically linked to each other, and you could exploit the moments when
they diverged from that relationship. the johansen cointegration test identifies pairs
of assets whose prices track each other over time even when they temporarily diverge.
i ran this across 1.5 million rows of historical market data, identifying pairs and
building positions that bet on convergence. the tricky part is always distinguishing
genuine statistical structure from noise that happens to look like structure in the
historical data — you can always find patterns in the past that don't persist

the second was options. options pricing is interesting because the price of an option
today depends on how uncertain the future will be — specifically on the volatility
the market is collectively pricing in. black-scholes gives you the mathematical
relationship. i built out the full greeks — delta, gamma, theta, vega — which are
the sensitivities of the option's price to different inputs, and built ten strategy
variants using them. the risk management side of this was genuinely complex because
options positions can blow up quickly if the volatility moves against you

the third was market making. market makers sit on both sides of every trade,
always willing to buy and always willing to sell, and collect the spread between
the two prices as their revenue. the challenge is that if you set your spread too wide
you don't get any trades, and if you set it too narrow you're exposed to informed
traders who know something you don't. i built 200 strategy variants and optimized
them using hyperopt TPE — a bayesian optimization method that's better at finding
good parameters than random search — looking for configurations that worked
consistently across all six competition days rather than just fitting to one period

top 1% globally

the thing i keep thinking about when i look back at it is how much i genuinely
didn't know at the start. there's something useful about entering a field that way —
you have no habits to unlearn and no assumptions baked in, so you read everything
and question everything and occasionally stumble into something that works

---

Links:
- github: https://github.com/AdityaBhatia-agentperry007

---

#### CRYPTOVAULT-MPC — /work/cryptovault-mpc

Tags: Python · JavaScript · MPC · garbled circuits · oblivious transfer
Status: research ongoing · public demo

---

most people who build things on top of cryptography don't understand what's actually
under the abstractions they're using. they import a library, call the functions,
trust that the math is correct, and stop there. that's usually fine — you don't need
to understand elliptic curve arithmetic to build a secure login system — but i kept
wanting to understand what was actually there

garbled circuits are one of those things that seem very hard to explain until you
have the right frame for them. the basic problem: two people want to compute something
together — say, figure out whose salary is higher — without either of them revealing
their actual number to the other. that sounds impossible. how do you compute a function
on two inputs without seeing the inputs?

what andrew yao worked out in the 1980s is that you can represent any computation as
a circuit of logic gates (AND, OR, NOT), and then "garble" that circuit — encode it
in a way that lets one party evaluate it on encrypted inputs without being able to
tell what the inputs were. oblivious transfer is the piece that lets you securely
hand the input encodings to the other party without learning what they chose. put the
two together and you have a complete private computation protocol

the research is under prof. adithya vadapalli at IIT kanpur. the garbled circuits web
app linked below is the live implementation — you can run the millionaire's problem
and a few other circuits directly in the browser and see the protocol executing

what i find genuinely interesting about this area is that it's fundamental in a way
that a lot of applied ML work isn't. MPC is what privacy actually looks like past
the marketing layer — computation where the data is never exposed, not just encrypted
in transit. the fact that it's hard and barely anyone actually touches the implementation
level is kind of why i'm doing it

---

Links:
- demo: https://web-app-garbled-circuits-zrds.vercel.app/
- github: https://github.com/AdityaBhatia-agentperry007/CryptoVault-MPC

---

#### NEURALBHASHA / D2AR — /work/neuralbhasha

Tags: Python · PyTorch · HuggingFace · discrete diffusion · SEDD · LLaDA · MDLM · D3PM
Status: research ongoing · IIT kanpur · co-authored with pavitra kushwaha

---

the standard narrative about large language models is that they're autoregressive —
they generate text one token at a time, each step conditioning on everything before it.
that works remarkably well. it's also not the only way to do it

discrete diffusion models for text work differently. the rough idea is that you start
with a corrupted or masked version of your target output and iteratively refine it,
learning to denoise rather than learning to predict the next token. it's the same
intuition as image diffusion (DALL-E, Stable Diffusion) but applied to sequences of
discrete tokens rather than continuous pixel values

whether this is actually better than autoregressive models for text is an open question,
and the existing benchmarks don't answer it cleanly — partly because most NLP benchmarks
are designed around english and the architecture tradeoffs look different in other
language families

hindi specifically is interesting because it has rich morphology, relatively free word
order, and a writing system that requires more complex tokenization decisions than
most latin-script languages. most of the major NLP benchmarks don't have hindi
evaluation at all, or have it as a small component of a multilingual benchmark where
the performance numbers get averaged into a single score

D2AR (diffusion vs. autoregressive for hindi) is the attempt to actually answer
the question for hindi specifically. eight SOTA models — SEDD, LLaDA, MDLM, D3PM
on the diffusion side, and four autoregressive baselines — evaluated on four tasks
(classification, NER, question answering, generation) with a five-step pipeline
that controls for tokenization and data formatting differences so the comparison
is actually clean

co-authored with pavitra kushwaha, running on IIT kanpur's HPC cluster.
the results are not public yet

---

Links:
- github: https://github.com/AdityaBhatia-agentperry007/D2AR-diffusion-vs-ar-hindi-nlp

---

#### LUMENSEED AI — /work/lumenseed

Tags: TypeScript · Next.js · LangChain · Gemini · RAG
Status: complete · deployed

---

IIT bombay's techfest medibot challenge was an invite to build an AI system
for healthcare and present it. i'd been thinking about medical reports for a while
before that — specifically about who they're written for

medical reports are written by doctors for doctors. the language is clinical,
the reference ranges are given without context, the implications of the numbers
are left unstated because a trained clinician is supposed to read them and know.
patients receive these reports, can't really interpret them, and end up either
not understanding their own health data or googling individual values and arriving
at the most alarming possible interpretation

LumenSeed reads your report — you upload the PDF or image — and explains it
in plain language. not a simplified version that leaves things out, but an
actual explanation: what this value means, what the normal range is and where
yours falls, what conditions might cause this result if it's abnormal, what
to ask your doctor at the follow-up

the RAG pipeline underneath it is built on LangChain with Gemini doing the
reasoning. the medical knowledge base is structured around clinical interpretation
guidelines so the explanations are grounded in how clinicians actually read the numbers
rather than just dictionary definitions

you can also ask follow-up questions. "what does it mean that my eGFR went down
from last year's report" — it can handle that kind of contextual comparison

first place, techfest IIT bombay medibot challenge

what i keep thinking about with lumenseed is that this is one of those problems
where the gap between what's technically possible and what actually exists for
people is enormous. the technology to do this has been available for a while.
the thing that didn't exist was someone building it as something you'd actually use

---

Links:
- github: https://github.com/AdityaBhatia-agentperry007/LumenSeed-AI

---

#### BYTEFORGE — /work/byteforge

Tags: community · events · hack club · IIT partnerships · north india
Status: active · 4,500+ members

---

when pavitra and i started byteforge there was no builder community in kanpur —
no events, no coworking spaces, no place where people building things in the
city could find each other. the obvious options were to either wait for one to exist
or to build it. we built it

the first few events were small. like, 20 people in a room small. we didn't have
money, we didn't have a venue sponsor, we didn't have any established reputation
in the city. what we had was that we kept doing it, kept improving the format,
kept showing up

hack club became a partner at some point — they're an international nonprofit
that runs technical clubs for students and they have a network of affiliated clubs
that share resources and organize together. getting the official partnership opened
up some infrastructure we didn't have before

now it's 4,500+ members across north india, with events at IITs and regular
programming across multiple cities. the community is genuinely the thing i'm most
uncertain about how to replicate — it took a long time and the growth happened
in ways i can't fully explain even in retrospect. some events caught and some
didn't, some partnerships worked and some didn't, and the ones that worked weren't
always the ones i expected to

the part i find interesting about running a community, as distinct from building
a product, is that you can't really force it. you can create the conditions and
show up consistently and be genuinely useful to the people in it, but the actual
community part — people finding each other valuable, forming actual connections —
that happens or it doesn't based on things that are hard to engineer

so far, it has

---

Links:
- website: https://byteforge.space
- github: https://github.com/AdityaBhatia-agentperry007/ByteForge

---

#### B2BHARAT — /work/b2bharat

Tags: JavaScript · full-stack · MongoDB · Express · React
Status: deployed · live

---

kanpur is one of india's bigger manufacturing hubs — leather goods, textiles, chemicals —
and the supply chain for a lot of small and mid-size manufacturers still runs almost
entirely on personal relationships and phone calls. you sell to whoever you know,
at whatever price you negotiate informally, and finding new buyers or suppliers means
asking around in a network that's already slow to change

B2Bharat is a marketplace for exactly that — connecting manufacturers with retailers
and buyers directly, without the intermediary markup that comes from distributors who
don't add that much value in a world where you can verify supplier quality through
reviews and reach the buyer directly

full stack: React frontend, Express + Node.js backend, MongoDB. deployed, live,
functioning. it's not my most technically complex project but it's the one where
i learned the most about what "deployed" actually means — keeping something running,
handling edge cases in real usage, the difference between something that works in
testing and something that works when actual people are using it

i built this mostly to learn what building and shipping a real product feels like
end to end. i think i succeeded at that more than the product itself has succeeded
in market, which is an honest way to describe where it is

---

Links:
- github: https://github.com/AdityaBhatia-agentperry007/B2Bharat

---

### RESEARCH PAGE — /research

Breadcrumb: "aditya / research"

Label: "research"
Sub-line (--text-3, body-small): "current: IIT kanpur · cryptography, MPC, discrete diffusion"

#### SECTION 1 — MPC / garbled circuits

Label: "multi-party computation"
Links: prof. adithya vadapalli → https://scholar.google.com/citations?user=jeOME6wAAAAJ

Copy:
```
research under prof. adithya vadapalli at IIT kanpur, working through the MPC stack —
garbled circuits, oblivious transfer, and the protocols that make private computation
actually work in practice rather than just in theory

the core question we're working on is about efficiency: standard garbled circuit
constructions are correct but the constant factors are large enough that real
deployments are limited to fairly simple functions. there's a lot of recent work
on reducing the overhead through better gate representation and optimized OT protocols

the web app linked below (CryptoVault-MPC) is the live implementation of Yao's
protocol and a few variants — you can run the millionaire's problem and other
boolean circuits in the browser and see the garbled evaluation executing

if you're doing research in this area and want to talk, reach out.
```

CryptoVault-MPC demo link → https://web-app-garbled-circuits-zrds.vercel.app/
GitHub link → https://github.com/AdityaBhatia-agentperry007/CryptoVault-MPC

#### SECTION 2 — discrete diffusion / NLP

Label: "hindi NLP — D2AR"
Co-author link: "pavitra kushwaha" → https://www.linkedin.com/in/pavitra-kushwaha/

Copy:
```
co-authored with pavitra kushwaha, running on IIT kanpur's HPC cluster.
the project is a systematic benchmark comparing discrete diffusion language
models against autoregressive baselines for hindi NLP — four tasks, eight models,
five-step evaluation pipeline

the models: SEDD, LLaDA, MDLM, D3PM (diffusion side) vs. four autoregressive
baselines. tasks: text classification, NER, question answering, generation.
the benchmark is being designed to control for tokenization and data formatting
differences that make a lot of existing cross-architecture comparisons hard to interpret

hindi is an interesting test case for this because the architectural tradeoffs that
show up in diffusion vs. AR comparisons for english don't necessarily generalize —
the morphology is richer, the word order is freer, and the tokenization decisions
interact with the model architecture in ways that matter

not published yet. faculty recommendation letters are the validation path for now.
```

GitHub link → https://github.com/AdityaBhatia-agentperry007/D2AR-diffusion-vs-ar-hindi-nlp

---

### WRITING PAGE — /writing

Breadcrumb: "aditya / writing"

Label: "writing"
Sub-line (--text-3, body-small): "occasional. when something is worth saying at length."

Posts list (renders from MDX frontmatter):
```
Each post row:
  Date: Geist Mono, 0.72rem, --text-3
  Title: 1rem, Geist 600, --text, links to /writing/[slug]
  Description: 0.875rem, --text-2, margin-top 4px
  Reading time: Geist Mono, 0.7rem, --text-3

Empty state (0 published posts):
  Text: "nothing yet. soon."
  Style: Geist Mono, 0.8rem, --text-3
```

Pre-write one standalone blog post at `/content/writing/on-learning-quant.mdx`:

```mdx
---
title: "on learning something completely new while doing it"
date: "2026-04-12"
description: "what happened when i entered imc prosperity 4 with no quant background and had to learn market microstructure mid-competition"
tags: ["learning", "quant", "imc"]
draft: false
---

the thing about entering a field you know nothing about is that you have no idea
which parts are hard until you hit them

when someone sent me the imc prosperity 4 link i knew vaguely what algorithmic
trading was. prices, models, signals — i had the vocabulary at a surface level.
what i didn't have was any understanding of how order books actually work, why
market makers exist and what the economics of their position is, how options
pricing is derived from first principles, or what volatility actually means
as a mathematical object rather than just "uncertainty"

so the first few days were a lot of reading. bergomi's book on volatility has this
quality where each chapter assumes you've really understood the previous one and
if you haven't you'll get through the chapter fine and then realize at the end
that you missed something. hull on options is clearer but also longer. i read
them in parallel which isn't how you're supposed to read technical books but time
was a constraint

what i found is that the concepts are interconnected in ways that aren't obvious
from outside. understanding why implied volatility is not the same as realized
volatility requires understanding what an option actually is, which requires
understanding why the payoff structure creates a specific kind of risk exposure,
which requires understanding how traders hedge that exposure, which changes how
you think about what implied volatility is measuring in the first place. you
can't really learn any of these things in isolation

the competition structure forced a deadline on the learning that was useful in
a way i didn't expect. you couldn't wait until you fully understood something
before testing it — you'd run out of competition days. so you'd have a partial
understanding of how GARCH volatility forecasting works, use it to build something,
watch the results, and update your understanding based on what actually happened.
that feedback loop, compressed into days rather than a semester, taught me a lot
more than reading the whole textbook would have

the part i'm still thinking about: we came in the top 1% globally. 22,000 teams,
most of them with real experience in this domain. i don't think that's because
i'm particularly talented at finance — i'm not, relative to people who've spent
years in it. i think it's because entering with no background meant i had no
habits to unlearn and no "obviously you do it this way" assumptions baked in,
so i read everything as new information rather than filtering it through what
i already thought i knew

that probably has a use beyond this specific context

the corollary is that doing this is uncomfortable in a way that's hard to sit with.
not knowing things, especially in a competitive context where other people do know
them, is unpleasant. there's a pull toward the areas where you're already competent
because competence feels better than confusion. i think knowing that pull is there
and doing the hard thing anyway is more learnable than people think it is
```

---

### CONTACT PAGE — /contact

Breadcrumb: "aditya / contact"

Label: "contact"
Sub-line (--text-2, body, margin-bottom 32px):
```
"building something real, doing research, or just want to talk — reach out.
 i'm usually faster over email."
```

Links (Geist Mono, 0.8rem, --text-2, vertical list, gap 10px):
```
email        adi@paxus.in
linkedin     linkedin.com/in/aditya-bhatia-a88529399
github       github.com/AdityaBhatia-agentperry007
instagram    instagram.com/adiyabhatia
paxus        paxus.in
byteforge    byteforge.space
```

Each link: opens in new tab. Monospace label left, URL right, tabular layout.

Divider: 1px var(--border), margin 32px 0.

Contact form:
```
Fields: name (text), email (email), message (textarea, 5 rows)
All inputs: background var(--surface), border 1px var(--border), color --text,
            Geist 0.875rem, padding 10px 12px, width 100%, no border-radius
Focus: border-color var(--border-2), outline none
Label: Geist Mono, 0.72rem, --text-3, uppercase, display block, mb-2

Submit button:
  Text: "send →"
  Style: background var(--text), color var(--bg), Geist Mono 0.78rem,
         uppercase, letter-spacing 0.08em, padding 10px 22px, no border-radius,
         cursor pointer, hover opacity 0.85

POST target: /api/contact
Success: replace form with "sent. i'll get back to you." (Geist Mono, --text-2)
Error: show "something broke — try adi@paxus.in directly" below button
```

---

### ARGUS AUTH + PAGE — already fully specced in additions section below
### (keep spec from F3 exactly as written — no changes needed here)

---

### BACKEND INTEGRATIONS

#### /api/contact/route.ts
```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message } = await req.json();
  if (!name || !email || !message) {
    return Response.json({ error: 'missing fields' }, { status: 400 });
  }
  const { error } = await resend.emails.send({
    from: 'website@adityabhatia.dev',
    to: 'adi@paxus.in',
    replyTo: email,
    subject: `website: ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });
  if (error) return Response.json({ error }, { status: 500 });
  return Response.json({ success: true });
}
```

#### /api/og/route.tsx
```typescript
import { ImageResponse } from '@vercel/og';
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Aditya Bhatia';
  const sub = searchParams.get('sub') || 'researcher · founder · builder · kanpur';
  return new ImageResponse(
    <div style={{ background: '#080808', width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column', padding: '80px', fontFamily: 'monospace' }}>
      <p style={{ color: '#444', fontSize: 16, margin: '0 0 24px' }}>adityabhatia.dev</p>
      <h1 style={{ color: '#ececec', fontSize: 58, margin: '0 0 16px', lineHeight: 1.1 }}>{title}</h1>
      <p style={{ color: '#666', fontSize: 22 }}>{sub}</p>
    </div>,
    { width: 1200, height: 630 }
  );
}
```

#### /lib/projects.ts
Define array of all 8 project objects matching the slug and content above.
Each object: `{ slug, title, year, desc, tags, github, demo, status }`.
Use `generateStaticParams` in `/work/[slug]/page.tsx` to statically generate all routes.

#### /lib/blog.ts
Parse `/content/writing/*.mdx` using gray-matter.
Filter `draft: true` in production.
Sort by date descending.
Return typed `BlogPost[]` array.

---

### DOOM EASTER EGG SPEC (same as before)

1. HTML comment in `<html>` tag: `<!-- doom. -->`
2. `console.log` ASCII art of "BHATIA" on page load (from GitHub README ASCII)
3. "DOOM" appears once in the home page marquee ticker
4. Konami code (↑↑↓↓←→←→BA) → full-screen red flash + "DR. DOOM WAS HERE" for 2.5s
   Implemented in `DoomEasterEgg.tsx`, mounted in layout.tsx

---

### ENVIRONMENT VARIABLES

`.env.local`:
```
RESEND_API_KEY=re_xxxx
NEXT_PUBLIC_SITE_URL=https://adityabhatia.dev
ARGUS_PASSWORD=doom
```

`.env.example` (commit this):
```
RESEND_API_KEY=
NEXT_PUBLIC_SITE_URL=
ARGUS_PASSWORD=
```

---

### CUSTOM FAVICON — /public/favicon.svg

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#080808"/>
  <text x="16" y="22" text-anchor="middle" font-family="monospace"
        font-size="20" font-weight="700" fill="#e63946">A</text>
</svg>
```

---

### TASKS.MD — PLANNING MODE CHECKLIST

```
SETUP
- [ ] Init Next.js 15, TypeScript strict, Tailwind CSS v4
- [ ] Install: framer-motion next-mdx-remote gray-matter reading-time resend @vercel/analytics @vercel/og
- [ ] Set up Geist + Geist Mono via next/font
- [ ] Define all CSS custom properties in globals.css
- [ ] Create .env.local and .env.example

CORE COMPONENTS
- [ ] ParticleGrid.tsx (Canvas dot grid, mouse interaction, gentle oscillation)
- [ ] Nav.tsx (transparent → solid on scroll, active page highlight)
- [ ] Breadcrumb.tsx (Geist Mono, all inner pages)
- [ ] Footer.tsx (shared)
- [ ] ProjectCard.tsx (border-only, hover step)
- [ ] DoomEasterEgg.tsx (konami code, console ASCII)

PAGES
- [ ] / (home — name, tagline, 5 nav portals, marquee)
- [ ] /about (intro, now, for-context table, kanpur piece)
- [ ] /work (project grid, all 8 cards)
- [ ] /work/[slug] (MDX prose layout, static params from lib/projects.ts)
- [ ] /research (MPC section, D2AR section)
- [ ] /writing (post list, empty state)
- [ ] /writing/[slug] (MDX prose layout, from lib/blog.ts)
- [ ] /contact (links table, contact form)
- [ ] /argus/auth (password gate)
- [ ] /argus (protected project page — middleware cookie check)
- [ ] /resume/page.tsx (redirect to /resume.pdf)

CONTENT
- [ ] /content/work/ — 8 MDX files (orca-ai, argus, quantum-edge, cryptovault-mpc,
       neuralbhasha, lumenseed, byteforge, b2bharat) with exact content from spec
- [ ] /content/writing/on-learning-quant.mdx — standalone blog post
- [ ] /content/writing/_template.mdx — blank template

BACKEND
- [ ] /api/contact/route.ts (Resend)
- [ ] /api/og/route.tsx (@vercel/og, supports ?title= and ?sub= params)
- [ ] /api/argus-auth/route.ts (POST → set httpOnly cookie)
- [ ] /middleware.ts (protect /argus/* route by cookie)

LIBRARY
- [ ] /lib/projects.ts (project data array, generateStaticParams)
- [ ] /lib/blog.ts (MDX parser, draft filter, date sort)
- [ ] /lib/metadata.ts (shared OG defaults)

ASSETS
- [ ] /public/favicon.svg
- [ ] /public/resume.pdf (placeholder — replace when ready)

LAYOUT
- [ ] layout.tsx: Geist fonts, Analytics, ParticleGrid, DoomEasterEgg,
                  metadata with OG defaults, console.log easter egg

POLISH
- [ ] Framer Motion fadeInUp on all sections (y:16 opacity:0 → y:0 opacity:1, once, staggered)
- [ ] Mobile responsive audit: 375px, 768px, 1280px
- [ ] Horizontal scroll on "for context" table on mobile
- [ ] next.config.ts: image remotePatterns for github-readme-stats CDN
- [ ] GitHub MCP: push to AdityaBhatia-agentperry007/personal-website
```

### ▲ END OF ANTIGRAVITY PROMPT ▲

---

## PART D — INFRASTRUCTURE

```
BROWSER
  │
  ▼
adityabhatia.dev ←── Vercel Edge (CDN, auto SSL, preview deploys)
  │
  ├─ Static pages (/, /about, /work, /work/*, /research, /writing, /writing/*, /contact)
  │   └─ Generated at build time (next build), served from CDN
  │
  ├─ Dynamic API routes
  │   ├─ /api/contact ──────────────────► Resend API → adi@paxus.in
  │   ├─ /api/og ──────────────────────► Vercel Edge Function (image gen)
  │   └─ /api/argus-auth ─────────────► Sets httpOnly cookie
  │
  ├─ Middleware
  │   └─ /argus/* ──────────── cookie check → redirect to /argus/auth if missing
  │
  └─ Analytics: @vercel/analytics (zero config, Vercel dashboard)

DEPLOYMENT PIPELINE:
Antigravity ──[GitHub MCP]──► github.com/AdityaBhatia-agentperry007/personal-website
                                    │
                                    ▼ (webhook, instant)
                             Vercel Build → next build
                                    │
                                    ▼
                       Production: adityabhatia.dev
                       Preview:    *.vercel.app (per branch/PR)
```

**Services and cost:**
| Service | Purpose | Cost |
|---|---|---|
| Vercel Hobby | Hosting, CDN, SSL, previews | Free |
| Resend Free | Contact form email | Free (3k/mo) |
| @vercel/analytics | Pageview analytics | Free on Hobby |
| github-readme-stats CDN | GitHub widgets on /about | Free |
| Next.js + all deps | Framework + tooling | Free, open source |

**Total: $0/month**

---

## PART E — DEPLOYMENT WORKFLOW

**Step 1 — Antigravity finishes building**
Run `npm run dev` in Antigravity browser surface. Check every route manually.

**Step 2 — GitHub push via MCP**
Manager Surface → GitHub MCP → Push to `personal-website`
Commit message: `init: adityabhatia.dev`

**Step 3 — Vercel import**
vercel.com → New Project → Import `personal-website`
Env vars: RESEND_API_KEY, NEXT_PUBLIC_SITE_URL, ARGUS_PASSWORD
Framework: Next.js (auto-detected) → Deploy

**Step 4 — Domain DNS**
Vercel → Project Settings → Domains → Add `adityabhatia.dev`
At your registrar:
```
A     @     76.76.21.21
CNAME www   cname.vercel-dns.com
```
SSL auto-provisions in ~2 minutes.

**Step 5 — Resend domain**
resend.com → Domains → Add adityabhatia.dev → Add SPF + DKIM records at registrar
Enables sending from website@adityabhatia.dev

**Step 6 — Post-deploy checklist**
```
□ adityabhatia.dev loads
□ Particle grid animates and responds to mouse
□ Nav scroll behaviour works (transparent → solid)
□ All /work/* routes load with correct content
□ /research loads with both sections
□ /writing shows "nothing yet. soon." empty state
□ /writing/on-learning-quant renders correctly
□ /contact form sends to adi@paxus.in
□ /argus redirects to /argus/auth without cookie
□ /argus/auth wrong password flashes red
□ /argus/auth correct password lands on /argus
□ OG image renders at /api/og
□ Custom favicon shows in tab (red A)
□ Konami code triggers DOOM easter egg
□ Console shows ASCII art on load
□ Vercel Analytics shows first pageview
□ Mobile layout correct on real phone
□ /resume redirects to PDF placeholder
```

---

*built from kanpur. no shortcuts. no excuses.*
