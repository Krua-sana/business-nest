// ============================================================
//  WORKSHOP CONFIG — edit this file to customise the game
// ============================================================

// 1) Paste your Firebase web config here (see README, step 2).
//    While databaseURL is empty, the game runs in DEMO MODE
//    (works only in one browser, for previewing — not for the workshop).
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCweWn6k_cAFvBplEoIKws5JRLXYTY_LQk",
  authDomain: "ai-co-creator-game.firebaseapp.com",
  databaseURL: "https://ai-co-creator-game-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ai-co-creator-game",
  storageBucket: "ai-co-creator-game.firebasestorage.app",
  messagingSenderId: "401559620365",
  appId: "1:401559620365:web:f9b9dfe4ac05ed199e7e44",
  measurementId: "G-FS7H3VDCXM"
};

// PIN for the host screen in DEMO MODE only.
// In live mode the PIN is the one you write into the Firebase rules (README, step 3).
const DEMO_PIN = "1234";

// Workshop code participants need to join, in DEMO MODE only.
// In live mode the code is the one you write into the Firebase rules (CHANGE_ME_CODE).
const DEMO_CODE = "NEST";

// true = teammates can join a team from their own phone
const TEAM_JOINING = true;

// Feedback round at the end (after the winner is revealed)
const FEEDBACK = {
  question: "How did you experience today's workshop?",
  commentLabel: "What did you like, and what could be better? (optional)"
};

const WORKSHOP = {
  title: "AI as Co-Creator",
  subtitle: "From Idea to Prototype",
  tagline: "Before your coffee gets cold"
};

const DOMAINS = [
  { id: "health",        emoji: "🩺", label: "Health & Wellbeing" },
  { id: "work",          emoji: "💼", label: "Work & Productivity" },
  { id: "sustainability",emoji: "🌱", label: "Sustainability & Environment" },
  { id: "education",     emoji: "🎓", label: "Education & Learning" },
  { id: "everyday",      emoji: "🏠", label: "Everyday Life & Convenience" },
  { id: "business",      emoji: "🚀", label: "Business & Entrepreneurship" }
];

const LLM_TOOLS = [
  { name: "ChatGPT",    url: "https://chatgpt.com" },
  { name: "Claude",     url: "https://claude.ai" },
  { name: "Gemini",     url: "https://gemini.google.com" },
  { name: "Perplexity", url: "https://www.perplexity.ai" }
];

const PROTO_TOOLS = [
  { name: "Claude",           url: "https://claude.ai" },
  { name: "Lovable",          url: "https://lovable.dev" },
  { name: "Bolt",             url: "https://bolt.new" },
  { name: "Replit",           url: "https://replit.com" },
  { name: "Google AI Studio", url: "https://aistudio.google.com" }
];

const dom = t => t.domain || "[your problem area]";
const chal = t => t.challenge || "[your challenge]";
const sol = t => t.solution || "[your solution]";

// The design-thinking pipeline. `minutes` = default timer for each step
// (you can also add/remove minutes live from the host screen).
const STEPS = [
  {
    id: "discover", title: "Discover", who: "In teams", minutes: 3,
    field: "domain", kind: "choice", label: "Problem area",
    task: "Choose ONE problem area your team wants to explore during the workshop."
  },
  {
    id: "define", title: "Empathize & Define", who: "In teams", minutes: 10,
    field: "challenge", kind: "text", max: 220, label: "Challenge",
    task: "Use an AI tool to brainstorm common challenges in your problem area. Discuss in your team and write down ONE challenge you will solve.",
    placeholder: "e.g. Freelancers lose track of unpaid invoices and waste hours chasing clients",
    tools: LLM_TOOLS,
    prompts: t => [
      `You are an expert in ${dom(t)}. What are the 10 most common challenges people face in this field? For each, give a short description, who is affected most, and a link to a source.`,
      `Which 3 of these challenges are most worth solving for a small startup, and why? Give one argument against each.`
    ]
  },
  {
    id: "ideate", title: "Ideate", who: "In teams", minutes: 10,
    field: "solution", kind: "longtext", max: 500, label: "Solution",
    task: "Brainstorm solutions with AI. Describe the one you will prototype: what it is, who it is for, and 2–3 key features.",
    placeholder: "e.g. A mobile app that scans invoices, reminds clients automatically and shows who still owes you money…",
    tools: LLM_TOOLS,
    prompts: t => [
      `I want to solve this challenge: "${chal(t)}". Suggest 5 different digital solutions that could be prototyped with AI tools in 20 minutes. For each: a name, the target user and 3 key features.`,
      `Give me 3 arguments against my favourite idea and how I could fix each one.`
    ]
  },
  {
    id: "prototype", title: "Prototype", who: "In teams", minutes: 20,
    field: "link", kind: "url", label: "Prototype link",
    task: "Copy the prompt below into a prototyping tool, let AI build it, then publish/share it and paste the link into the game.",
    placeholder: "https://…",
    tools: PROTO_TOOLS,
    prompts: t => [
`Build a clickable MVP prototype of a mobile-friendly web app.

Problem area: ${dom(t)}
Challenge we solve: ${chal(t)}
Our solution: ${sol(t)}

Requirements:
- 2–4 screens covering the core user flow, with working navigation
- Realistic sample content (no lorem ipsum)
- Clean, modern and accessible design
- No login or backend needed: mock the data
Give the app a short, catchy name.`
    ]
  },
  {
    id: "vote", title: "Vote", who: "Everyone", minutes: 3,
    kind: "vote",
    task: "Look at the other teams' ideas and vote for your favourite. You can't vote for your own team."
  }
];
