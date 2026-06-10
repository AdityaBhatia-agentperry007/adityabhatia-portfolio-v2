export interface Project {
  slug: string;
  year: string;
  title: string;
  description: string;
  tags: string[];
  demo?: string;
  github?: string;
  longContent: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'orca-ai',
    year: '2025',
    title: 'Orca AI',
    description: 'zero-step agentic task automation on android where you just text what you need on whatsapp or telegram and we run scripts to make it happen.',
    tags: ['TypeScript', 'Node.js', 'Android ADB', 'LLM Agents'],
    longContent: `
    so basically the problem with apps is that there are way too many of them and every single one is just another chore between wanting something done and actually having it happen. you have to unlock your phone, search for the app, wait for it to load, parse whatever interface they designed this week, click five buttons, and close it. it's incredibly stupid when you think about it.
    
    orca is our attempt at a zero-step interface. you don't download an app. you don't learn a UI. you just send a normal text on whatsapp or telegram, like "order a veg burger from the place down the street and book a cab to the office," and it just happens in the background.
    
    we set this up using a server-side runner that hooks into android devices using ADB (android debug bridge) and custom accessibility service scripts. when you send a message, we parse the intent using an LLM, translate it into a sequence of low-level UI gestures (taps, scrolls, text inputs), run them on a headless device cluster, and stream the confirmation back to you. 
    
    in india, there are like 500 million people on mobile who are genuinely not going to download one more app for one specific task. they already know how to use whatsapp. orca meets them exactly where they are.
    `,
  },
  {
    slug: 'argus',
    year: '2025',
    title: 'Argus',
    description: 'local, private intelligence system that correlates multiple camera feeds in real time using edge GPUs and SORT tracking.',
    tags: ['Python', 'OpenCV', 'FFmpeg', 'YOLOv8', 'SQLite'],
    longContent: `
    i've always been super fascinated by surveillance systems and tactical command centers—not in a creepy way, but just how complex data gets correlated in real-time. argus is my personal, miniature version of palantir gotham that runs completely on my own local hardware.
    
    normally, security cameras just dump raw, compressed mp4 streams onto a hard drive. nobody actively watches them until something goes wrong, and even then, you have to scroll through hours of footage manually. argus actively watches and thinks about the video feed.
    
    it uses a multi-threaded python pipeline that ingests RTSP streams from local cameras using FFmpeg. we feed these streams into local, optimized YOLO models for object detection and run simple tracking algorithms (like SORT) to follow entities across frames. the magic happens in the correlation engine: if camera A detects a person walking east, and camera B detects the same visual signature ten seconds later moving towards the main door, argus links those logs as a single event.
    
    it stores everything in a local database and renders it onto a dark, tactical dashboard. the best part is that it is 100% local. no cloud APIs, no subscriptions, and zero data leaving my room. palantir built theirs with hundreds of engineers and government funding; i built this because i wanted to see if i could do it alone.
    `,
  },
  {
    slug: 'quantum-edge',
    year: '2024',
    title: 'QuantumEdge',
    description: 'built options pricing and ETF arbitrage models to place in the top 1% globally in the IMC Prosperity challenge out of 22,000+ teams.',
    tags: ['Python', 'Rust', 'GARCH', 'Black-Scholes', 'Hyperopt'],
    longContent: `
    imc prosperity is this massive global quant trading competition. there were 22,000 teams competing, mostly cs graduates, math PhDs, and actual traders from top-tier universities. my friends tanish, pavitra, and i decided to enter because we liked math and wanted to see if we could build a trading engine that wouldn't immediately crash under simulated market conditions.
    
    we had absolutely zero prior quant experience when we started. we basically spent the first week doing nothing but reading papers on market microstructure, cointegration, and option Greeks.
    
    we ended up designing three separate trading tracks. first was an ETF cross-product arbitrage model that used GARCH volatility models and Johansen cointegration tests to spot tiny price discrepancies across correlated assets. second was a complete options valuation engine written in Python (about 3,000 lines) that inverted Black-Scholes to calculate implied volatility and managed risk by balancing delta and gamma exposures in real-time. finally, we built a market-making bot that placed bid/ask orders based on order book depth-vanishing signals, optimizing parameters using Hyperopt TPE.
    
    we were coding between school classes and staying up until 4 AM trying to fix latency issues. ending up in the top 1% globally was crazy, but the coolest part was realizing that quantitative finance isn't some mystical secret—it is just math, clean data pipelines, and a lot of testing.
    `,
  },
  {
    slug: 'cryptovault-mpc',
    year: '2024',
    title: 'CryptoVault-MPC',
    description: 'interactive Yao\'s Millionaire Problem and secure multi-party computation simulator built during research under Prof. Vadapalli.',
    tags: ['TypeScript', 'Next.js', 'Cryptography', 'Secure MPC'],
    demo: 'https://web-app-garbled-circuits-zrds.vercel.app/',
    github: 'https://github.com/AdityaBhatia-agentperry007/CryptoVault-MPC',
    longContent: `
    most people who build software on top of cryptography just import a standard library, hash a password, and call it a day. they don't really know what's happening under the hood. i wanted to understand the actual math behind privacy-preserving computation, which led me to walk into prof. adithya vadapalli's cryptography lab at IIT Kanpur to ask for research work.
    
    secure multi-party computation (MPC) is this incredibly cool concept: how do two parties compute a function over their private inputs without ever showing those inputs to each other? the standard example is Yao's Millionaire Problem—two wealthy people want to know who is richer, but neither wants to disclose their net worth.
    
    we solve this using garbled circuits and oblivious transfer. a garbled circuit is essentially an encrypted truth table. the generator encrypts the gate outputs and sends them to the evaluator, who evaluates the circuit gate-by-gate. since the evaluator doesn't know the encryption keys for the inputs they didn't choose, and the generator doesn't know which keys the evaluator selected, the computation finishes without leaking any inputs.
    
    i built an interactive web simulator (linked below) that parses and evaluates MPC circuits directly in the browser. dealing with binary operations and gate evaluations in vanilla javascript was incredibly tedious, but seeing a circuit successfully compute without leaking private values made it all worth it.
    `,
  },
  {
    slug: 'neuralbhasha',
    year: '2024',
    title: 'NeuralBhasha / D2AR',
    description: 'co-authored a research benchmark comparing discrete diffusion and autoregressive language models for Hindi NLP at IIT Kanpur.',
    tags: ['Python', 'PyTorch', 'HuggingFace', 'Hindi NLP'],
    github: 'https://github.com/AdityaBhatia-agentperry007/D2AR-diffusion-vs-ar-hindi-nlp',
    longContent: `
    most major NLP benchmarks and open-source datasets are built entirely around english. if you want to evaluate how well a model handles hindi, the resources are extremely sparse and often just poorly machine-translated versions of english benchmarks, which completely ruins the grammar and nuances.
    
    pavitra and i co-authored D2AR (diffusion vs. autoregressive) at IIT Kanpur to change this. we built a rigorous benchmark specifically designed to test hindi NLP across 8 state-of-the-art models.
    
    our benchmark evaluates models across 4 core linguistic tasks: text classification, named entity recognition (NER), question answering, and text generation. we set up a 5-step pipeline that scores the models not just on basic accuracy, but also on syntactic coherence and semantic preservation in hindi. the research specifically focuses on comparing discrete diffusion language models (which generate tokens in parallel by denoising) against traditional autoregressive models (which generate tokens sequentially).
    
    building the tokenizers and clean training datasets for hindi was a massive challenge because devanagari script handles compound characters and ligatures in a way that standard tokenizers completely break. our paper outlines how these architectures perform when forced to compute hindi's morphosyllabic structure.
    `,
  },
  {
    slug: 'lumenseed',
    year: '2024',
    title: 'LumenSeed AI',
    description: 'won 1st prize at Techfest IIT Bombay Medibot challenge for a vector-retrieval RAG translator explaining medical reports.',
    tags: ['TypeScript', 'Next.js', 'LangChain', 'Gemini API'],
    github: 'https://github.com/AdityaBhatia-agentperry007/LumenSeed-AI',
    longContent: `
    whenever you get a medical report back from a lab, it is written entirely in dense jargon meant for doctors. if you try to search for the terms online, you usually end up reading extreme diagnosis threads and panicking. most patients have no idea what their own health data means, which is a massive communication gap.
    
    we built lumenseed to translate medical reports into clear, friendly language that anyone can read. it doesn't give medical advice—it just explains what the terms mean, what the normal ranges are, and what questions you should actually ask your doctor during your next visit.
    
    we built the prototype for the Techfest IIT Bombay Medibot challenge and won first place. we used LangChain to set up a retrieval-augmented generation (RAG) pipeline. when a patient uploads a PDF report, we extract the text, chunk it, and pull reference definitions from verified medical dictionaries stored in a vector database. then, we use a fine-tuned LLM to write the summary, enforcing a strict tone check so it sounds human and calming, not robotic or alarmist.
    
    medical data is incredibly sensitive, so we designed the system to run on local-first principles wherever possible, stripping out personally identifiable information (PII) before any text gets processed by the inference layer.
    `,
  },
  {
    slug: 'byteforge',
    year: '2023',
    title: 'ByteForge',
    description: 'co-founded North India\'s largest student tech community, growing it to 4,500+ builders and hosting Execron 1.0 hackathon.',
    tags: ['Community', 'Events', 'Developer Relations'],
    demo: 'https://byteforge.space',
    github: 'https://github.com/AdityaBhatia-agentperry007/ByteForge',
    longContent: `
    kanpur is a huge industrial city, but when it comes to tech and building software, it felt like a complete desert. if you're a kid here who wants to code projects or build startups, there was no community. everyone is focused on studying for entrance exams or getting traditional credentials, which is fine, but it gets lonely when you just want to stay up all night building random tools.
    
    pavitra and i got tired of waiting for some school or college to build a coding scene, so we decided to build it ourselves. we started byteforge as a small discord server for student builders.
    
    it grew incredibly fast. we are now north india's largest independent student tech community with over 4,500 members. we are an official Hack Club partner, we coordinate events across high schools, and we host major hackathons, like our Execron 1.0 BuildFest at IIT Kanpur which brought in 290+ developers.
    
    we didn't have any budget, sponsors, or experience when we started. we just had a shared discord server and a bunch of kids who wanted to build cool things. byteforge proved to me that you don't need to live in silicon valley or bangalore to have a vibrant dev culture; you just need a place where builders feel welcome to share their creations.
    `,
  },
  {
    slug: 'b2bharat',
    year: '2024',
    title: 'B2Bharat',
    description: 'supply-chain B2B marketplace application linking regional manufacturers to retail shopkeepers, cutting middlemen cuts.',
    tags: ['JavaScript', 'Node.js', 'MongoDB', 'React Native'],
    github: 'https://github.com/AdityaBhatia-agentperry007/B2Bharat',
    longContent: `
    in india, the supply chain between a small manufacturer in a tier-2 city and a local retail shop owner is incredibly fragmented. there are usually three or four middlemen (distributors, agents, wholesalers) between the factory floor and the store shelf. each middleman takes a cut, which drives up prices for consumers and squeezes the manufacturer's margins.
    
    b2bharat is a full-stack platform built to let manufacturers list their products and sell directly to retail stores, cutting out the intermediate layers.
    
    i built the backend using Node.js and MongoDB, handling product inventory, bulk pricing tiers, and order tracking. we built a mobile app for store owners so they can scan products, place orders, and coordinate regional shipping logistics. one of the hardest parts was handling the tax calculations (GST) and bulk invoice generation dynamically, as well as optimizing database queries so the app runs smoothly on low-end android devices with patchy internet connections.
    
    deploying this and seeing actual transactions go through between local suppliers and shopkeepers was a huge learning experience. it taught me how software can solve very real, physical logistics problems.
    `,
  },
];
