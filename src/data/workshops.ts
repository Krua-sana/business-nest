// All workshops. Each entry powers its card on /workshops and Home, and its own
// detail page at /workshops/<slug>. Sections are optional: leave a field out and
// that section is not shown. To add a workshop, copy an entry and edit it
// (see .claude/skills/add-event-page/SKILL.md).

export type WorkshopStatus = "open" | "bookable" | "waitlist" | "past";

export const STATUS: Record<WorkshopStatus, { label: string; bg: string }> = {
  open: { label: "Open", bg: "#D4F57A" },
  bookable: { label: "Book anytime", bg: "#D4F57A" },
  waitlist: { label: "Waiting list", bg: "#FFD84D" },
  past: { label: "Past edition", bg: "#E5E7EB" },
};

export interface AgendaItem { time: string; item: string; isBreak?: boolean }
export interface Person { name: string; bio: string; photo?: string; /** CSS object-position for the photo, e.g. "50% 30%" */ photoPos?: string; initials?: string; linkedin?: string; title?: string }

export interface Workshop {
  slug: string;
  /** Leave out of the list on /workshops (the page itself stays online) */
  hidden?: boolean;
  /** Old URLs that should redirect to this page, e.g. ["sales-training-1"] */
  aliases?: string[];
  title: string;
  /** Title with one highlighted word, e.g. ["The Financial ", "Transition", " Lab"] */
  titleParts: [string, string, string];
  status: WorkshopStatus;
  /** Extra hero label, e.g. "Registration closed · Waiting list" */
  statusLabel?: string;
  format: string; // "In person · 4 hours"
  summary: string; // one-liner for cards
  /** Longer line used when this workshop is highlighted at the top of /workshops */
  highlight?: string;
  intro: string; // hero paragraph
  date: string;
  time: string;
  location: string;
  /** Hero fact #4, e.g. { label: "Expert", value: "Dr. Anna Ezerskiy MBA" } */
  fact4: { label: string; value: string };
  /** Replaces the date/time/location/fact4 facts in the hero (used by bookable workshops) */
  facts?: { label: string; value: string }[];
  /** Replaces the "date · location · duration" line on cards */
  cardMeta?: string;
  /** Second hero button, e.g. { label: "Join an open session", href: "#join" } */
  cta2?: { label: string; href: string };
  /** Where the primary hero button jumps to (default "#seat") */
  ctaHref?: string;
  /** "Two ways to take this workshop": individual open sessions + team bookings */
  ways?: {
    individual: { title: string; price: string; points: string[]; cta: string };
    company: { title: string; price: string; points: string[]; cta: string };
  };
  /** Numbered modules with topic lists (multi-module programmes) */
  modules?: { eyebrow: string; title: string; intro?: string; items: { title: string; text: string; topics: string[] }[] };
  agendaTitle?: string;
  /** Small note under testimonials / gallery, e.g. "From a previous session (Microlab, December 2025)" */
  pastNote?: string;
  faq?: { q: string; a: string[] }[];
  /** Team booking form + individual sign-up instead of the waiting-list box */
  booking?: { maxGroup?: string; teamText?: string; goalPlaceholder?: string; joinTitle: string; joinText: string };
  duration: string; // for card meta
  card: { img: string; alt: string };
  /** "poster" shows the image in a rounded frame with rings; "egg" crops a photo into the egg shape */
  hero: { kind: "poster" | "egg"; img: string; alt: string; pos?: string; /** Optional looping video (mp4); img is used as its poster */ video?: string };
  /** Primary CTA in the hero */
  cta: string;
  /** Learn steps: 4 numbered cards ("What you will learn") */
  steps?: { eyebrow: string; title: string; items: { title: string; text: string }[] };
  /** Two-column "About this workshop" with checklist */
  about?: { eyebrow: string; title: string; paragraphs: string[]; listTitle: string; list: string[] };
  /** Egg-marker outcome cards */
  outcomes?: { title: string; items: { title: string; text: string }[] };
  /** "Who it's for" block with speaker and numbered list */
  whoFor?: { eyebrow: string; title: string; paragraphs: string[]; speaker: Person; learnTitle: string; learn: string[] };
  agenda?: AgendaItem[];
  /** Big expert card next to the agenda */
  expert?: Person & { eyebrow: string; headline: string };
  /** Moderator list next to the agenda */
  moderators?: Person[];
  testimonials?: { name: string; text: string; initials: string }[];
  gallery?: { img: string; alt: string }[];
  seat?: { badge: string; title: string; text: string };
}

export const WORKSHOPS: Workshop[] = [
  {
    slug: "financial-transition-lab",
    title: "The Financial Transition Lab",
    titleParts: ["The Financial ", "Transition", " Lab"],
    status: "bookable",
    statusLabel: "Book for your team · Open sessions",
    format: "In person · 4 hours",
    summary: "Calculate your break-even point and design a realistic income roadmap.",
    highlight: "Calculate your break-even point and design a realistic, responsible income roadmap — in one 4-hour hands-on session.",
    intro:
      "A 4-hour working lab that helps professionals in career transition turn uncertainty into a structured income strategy: calculate your break-even point, validate demand early and design a realistic roadmap grounded in Dutch regulations. Book it for your team or organisation, or join an open session.",
    date: "21 March 2026",
    time: "12:30–17:00",
    location: "Strijp-CS, Eindhoven",
    fact4: { label: "Expert", value: "Dr. Anna Ezerskiy MBA" },
    // TODO: add group size and the next open date when known.
    facts: [
      { label: "Duration", value: "4 hours, in person" },
      { label: "Expert", value: "Dr. Anna Ezerskiy MBA" },
      { label: "Where", value: "Business Nest or your office" },
      { label: "Next open session", value: "To be announced" },
    ],
    cardMeta: "4 hours · Book for your team or join an open session",
    duration: "4 hours",
    card: {
      img: "/images/web/financial-lab-poster.jpg",
      alt: "Poster: Layoff to Income Strategy — The Financial Transition Lab",
    },
    hero: {
      kind: "poster",
      img: "/images/web/financial-lab-poster.jpg",
      alt: "Poster: Layoff to Income Strategy — The Financial Transition Lab, Strijp-CS Eindhoven, 21 March, 12:30–17:00, organised by Business Nest, hosted by StrijpCS",
    },
    cta: "Book for your team",
    ctaHref: "#book",
    cta2: { label: "Join an open session", href: "#join" },
    ways: {
      individual: {
        title: "Join an open session",
        price: "Price to be announced",
        points: [
          "Work on your own numbers, offer and roadmap",
          "Learn alongside other professionals in transition",
          "Next open session: to be announced",
        ],
        cta: "Get notified about the next date",
      },
      company: {
        title: "Book it for your team",
        price: "Price on request",
        points: [
          "For organisations supporting people in career transition",
          "At Business Nest in Eindhoven or at your office",
          "Tailored to your group's situation and goals",
        ],
        cta: "Request a team session",
      },
    },
    about: {
      eyebrow: "About this workshop",
      title: "Not a motivational event — a structured working session for people who want evidence before risk.",
      paragraphs: [
        "After job loss or failed business attempts, urgency can lead to rushed decisions. The Financial Transition Lab replaces chaos with structure.",
        "Whether you're considering entrepreneurship, freelancing or a new industry, you'll leave with the tools to build a sustainable income strategy and turn uncertainty into a financially secure next step.",
      ],
      listTitle: "Over four hours, you will",
      list: [
        "Build your personal break-even model",
        "Map a realistic income-replacement timeline",
        "Validate your value proposition before investing",
        "Understand Dutch VAT, pricing and compliance basics",
        "Design a responsible Go / Pivot / Stop decision",
      ],
    },
    outcomes: {
      title: "What you'll walk away with",
      items: [
        { title: "A tested value proposition", text: "Test your value proposition before investing time and money." },
        { title: "A realistic next-step roadmap", text: "Design a clear, actionable roadmap for your transition journey." },
        { title: "Confidence grounded in evidence", text: "Make informed decisions with a clear understanding of your financial reality." },
        { title: "A direction aligned with Dutch reality", text: "Navigate your transition with a strategy that fits the Dutch market and regulations." },
      ],
    },
    agendaTitle: "Sample agenda",
    agenda: [
      { time: "0:00", item: "Arrival and welcome" },
      { time: "0:30", item: "Break-even point development" },
      { time: "1:30", item: "Coffee break", isBreak: true },
      { time: "1:40", item: "Mapping an income-replacement roadmap" },
      { time: "2:45", item: "Coffee break", isBreak: true },
      { time: "3:00", item: "Defining your value proposition and validating it early" },
      { time: "3:30", item: "Dutch VAT, pricing and compliance basics" },
      { time: "4:15", item: "Conclusion and next steps" },
    ],
    expert: {
      eyebrow: "Your finance expert",
      name: "Dr. Anna Ezerskiy MBA",
      headline: "Physicist, Executive MBA and founder of Apex Foundry in the Netherlands",
      bio: "Anna has led multi-million-euro innovation programs at Philips, ASML and other high-tech companies. In her workshops she translates that experience into practical financial clarity: remove emotional fog, quantify reality and leave with a clear, defensible roadmap.",
      photo: "/images/experts/Anna-Ezerskiy.jpg",
      photoPos: "50% 35%",
      linkedin: "https://www.linkedin.com/in/anna-ezerskiy/",
    },
    faq: [
      {
        q: "Is this workshop for me?",
        a: ["It's for professionals in career transition — after a layoff, a failed business attempt, or while considering entrepreneurship, freelancing or a new industry — who want evidence before taking a financial risk."],
      },
      {
        q: "Do I need a finished business idea?",
        a: ["No. You work with your own situation and numbers. If you already have an idea, you'll test its value proposition; if not, you'll leave with a clear picture of what your next step needs to earn."],
      },
      {
        q: "Can it be tailored for our organisation?",
        a: ["Yes. For team bookings we adapt the session to your group's situation and goals, at Business Nest in Eindhoven or at your office."],
      },
      {
        q: "What does it cost?",
        a: ["For organisations booking a session, the price is on request — send us a booking request and we'll get back to you with a proposal. The price for open sessions will be announced together with the next date."],
      },
    ],
    booking: {
      teamText: "Tell us about your group and what you'd like them to achieve. We'll get back to you with a proposal and available dates.",
      goalPlaceholder: "E.g. a group of employees in career transition who want a realistic income plan",
      joinTitle: "Join the next open session",
      joinText: "Leave your name and email and we'll let you know as soon as the next open session is scheduled.",
    },
  },
  {
    slug: "ai-co-creator",
    title: "AI as a Co-Creator",
    titleParts: ["AI as a ", "Co-Creator", ""],
    status: "bookable",
    statusLabel: "Book for your team · Open sessions",
    format: "In person · 4 hours",
    summary: "Turn an idea into a working MVP with AI and design thinking.",
    highlight: "Turn an idea into a working MVP with AI and design thinking — in one 4-hour hands-on session. Book it for your team, or join the open session in January.",
    intro:
      "A fast-paced, hands-on workshop that helps you turn an idea into a working MVP — with the power of AI and design thinking. Run it for your team with your own product or service as the case, or join an open session with other founders.",
    date: "January 2027",
    time: "13:00–17:00",
    location: "Business Nest or your office",
    fact4: { label: "Group size", value: "15–20 people max" },
    facts: [
      { label: "Duration", value: "4 hours, in person" },
      { label: "Group size", value: "15–20 people max" },
      { label: "Where", value: "Business Nest or your office" },
      { label: "Next open session", value: "January 2027" },
    ],
    cardMeta: "4 hours · Book for your team or join in January",
    duration: "4 hours",
    card: { img: "/images/web/ai-co-creator-cover.jpg", alt: "Poster: AI as a Co-Creator, from idea to MVP, in-person workshop" },
    hero: {
      kind: "poster",
      img: "/images/web/ai-co-creator-cover.jpg",
      video: "/images/web/ai-co-creator-cover.mp4",
      alt: "Poster: AI as a Co-Creator, from idea to MVP — in-person workshop organised by Business Nest and Eindhoven Entrepreneurs",
    },
    cta: "Book for your team",
    ctaHref: "#book",
    cta2: { label: "Join an open session", href: "#join" },
    ways: {
      individual: {
        title: "Join an open session",
        price: "€47 + VAT per person",
        points: [
          "Work alongside other founders and professionals",
          "Bring your own idea — or find one during the session",
          "Next open session: January 2027",
        ],
        cta: "Get notified about the January date",
      },
      company: {
        title: "Book it for your team",
        price: "Price on request",
        points: [
          "Tailored to your product or service — or to finding a new business idea",
          "At Business Nest in Eindhoven or at your office",
          "Up to 15–20 participants, in English or Dutch",
          "Book 2–3 weeks in advance",
        ],
        cta: "Request a team session",
      },
    },
    steps: {
      eyebrow: "From idea to MVP in one afternoon",
      title: "What you will learn",
      items: [
        { title: "Discover", text: "Identify a business idea that fits your strengths and goals." },
        { title: "Define", text: "Shape your MVP using structured, AI-assisted thinking." },
        { title: "Build", text: "Create your first prototype in under 60 minutes using AI." },
        { title: "Pitch", text: "Present your concept confidently to a supportive group." },
      ],
    },
    agendaTitle: "Sample 4-hour agenda",
    agenda: [
      { time: "0:00", item: "Arrival and welcome" },
      { time: "0:15", item: "Creative connection" },
      { time: "0:30", item: "Brainstorming your idea" },
      { time: "1:00", item: "Break", isBreak: true },
      { time: "1:15", item: "Crafting effective AI prompts" },
      { time: "1:45", item: "Prototyping session" },
      { time: "2:15", item: "Break", isBreak: true },
      { time: "2:30", item: "Pitch preparation" },
      { time: "3:00", item: "Pitch and feedback" },
      { time: "3:45", item: "Networking" },
    ],
    moderators: [
      {
        name: "Kateryna Saprunova",
        bio: "Senior UX/UI designer and front-end developer with extensive workshop facilitation experience.",
        photo: "/images/web/Kateryna-Saprunova.jpg",
        linkedin: "https://www.linkedin.com/in/saprunova-kateryna/",
      },
      {
        name: "Kris Smirnova",
        bio: "UX/CX researcher and AI facilitator bringing data-driven insights to innovation.",
        photo: "/lovable-uploads/Kris-Smirnova.jpg",
        linkedin: "https://www.linkedin.com/in/krissmir/",
      },
      {
        name: "Simeon Dimov",
        bio: "Co-founder of Synthgen (synthetic AI data). Full-stack developer and AI mentor.",
        photo: "/images/experts/Simeon-Dimov.jpg",
        linkedin: "https://www.linkedin.com/in/simeon-dimov-bb429016b/",
      },
    ],
    testimonials: [
      { initials: "LK", name: "Lara Kasapoglu", text: "In just 10 minutes, AI helped us design a full concept for a food delivery app!" },
      { initials: "SA", name: "Serhat Altin", text: "Great energy, fast learning and very practical!" },
      { initials: "SD", name: "Simeon Dimov", text: "We ended with a fully functional prototype — impressive." },
    ],
    pastNote: "From a previous session (Microlab, Eindhoven, December 2025)",
    gallery: [
      { img: "/images/hero/hero-3.jpg", alt: "Participants collaborating on laptops at the workshop" },
      { img: "/images/hero/hero-2.jpg", alt: "A moderator presenting prompting techniques on a screen" },
      { img: "/images/hero/hero-4.jpg", alt: "A facilitator presenting the Ideate step on screen" },
      { img: "/images/web/gallery/g12.jpg", alt: "A participant building a prototype in a code editor" },
    ],
    faq: [
      {
        q: "Do participants need experience with AI?",
        a: ["No. The workshop starts with how to write effective prompts and builds from there, so beginners and experienced users both get a working prototype by the end."],
      },
      {
        q: "What should participants bring?",
        a: ["A charged laptop. We'll let you know before the session if anything needs to be set up in advance."],
      },
      {
        q: "Can it run in Dutch, or online?",
        a: ["It can run in Dutch or English. It's an offline, in-person workshop — the hands-on teamwork and live pitching are a big part of how it works, so we don't run it online."],
      },
      {
        q: "How many people can take part?",
        a: ["Up to 15–20 people per session. That keeps it small enough for everyone to build and pitch, and to get feedback from the moderators."],
      },
      {
        q: "How far in advance should a company book?",
        a: ["Please book 2–3 weeks in advance, so we have time to prepare the session around your goals."],
      },
      {
        q: "Can it be tailored to our product or service?",
        a: [
          "Yes. We can build the session around your own product or service, so your team prototypes ideas that matter to your business.",
          "No idea yet? That's fine too — we can run the workshop to help your team find a new business idea from scratch.",
        ],
      },
      {
        q: "What does it cost?",
        a: ["Open sessions cost €47 + VAT per person. For companies booking a session for their team, the price is on request — send us a booking request and we'll get back to you with a proposal."],
      },
    ],
    booking: {
      maxGroup: "15–20 people",
      goalPlaceholder: "E.g. prototype ideas for our product or service, or find a new business idea from scratch",
      teamText: "Tell us about your team and goals. We'll get back to you with a proposal and available dates. Please book 2–3 weeks in advance.",
      joinTitle: "Join the open session in January",
      joinText: "€47 + VAT per person. Leave your name and email and we'll send you the date and registration link as soon as it's set.",
    },
  },
  {
    slug: "sales-training",
    aliases: ["sales-training-1", "sales-training-2"],
    title: "Sales Training Program",
    titleParts: ["", "Sales", " Training Program"],
    status: "bookable",
    statusLabel: "Book for your team · Open sessions",
    format: "In person · 4 modules",
    summary: "Four modules to sharpen your sales skills — from your first pitch to complex deals.",
    intro:
      "A comprehensive four-module program designed to transform your sales skills, unlock your potential and master the art of closing deals. Book it for your team, or join an open session with other entrepreneurs and sales professionals.",
    // TODO: add the real duration, group size and next open date when known.
    date: "To be announced",
    time: "",
    location: "Business Nest or your office",
    fact4: { label: "Format", value: "4 modules" },
    facts: [
      { label: "Format", value: "4 modules, in person" },
      { label: "For", value: "Individuals and teams" },
      { label: "Where", value: "Business Nest or your office" },
      { label: "Next open session", value: "To be announced" },
    ],
    cardMeta: "4 modules · Book for your team or join an open session",
    duration: "4 modules",
    card: { img: "/images/web/gallery/g7.jpg", alt: "Two participants practising a sales conversation" },
    hero: { kind: "egg", img: "/images/web/gallery/g7.jpg", alt: "Two participants practising a sales conversation at Business Nest", pos: "50% 35%" },
    cta: "Book for your team",
    ctaHref: "#book",
    cta2: { label: "Join an open session", href: "#join" },
    ways: {
      individual: {
        title: "Join an open session",
        price: "Price to be announced",
        points: [
          "Train alongside entrepreneurs and sales professionals",
          "Work on your own offer, customers and sales story",
          "Next open session: to be announced",
        ],
        cta: "Get notified about the next date",
      },
      company: {
        title: "Book it for your team",
        price: "Price on request",
        points: [
          "Tailored to your product, customers and sales cycle",
          "At Business Nest in Eindhoven or at your office",
          "Choose all four modules or focus where your team needs it most",
        ],
        cta: "Request a team session",
      },
    },
    about: {
      eyebrow: "About the program",
      title: "From finding the right customer to closing complex deals",
      paragraphs: [
        "Our Sales Training Program is a structured journey through four modules that cover everything from identifying ideal customers to mastering complex multi-stakeholder deals.",
        "Each module builds on the previous one, equipping you with practical frameworks, mental resilience and modern sales techniques — including how to use AI wisely in your sales process.",
      ],
      listTitle: "Who should attend",
      list: [
        "Sales professionals looking to sharpen their skills",
        "Entrepreneurs developing their sales strategy",
        "Team leaders wanting to coach others",
        "Anyone transitioning into sales",
        "Business owners scaling their operations",
      ],
    },
    modules: {
      eyebrow: "The four modules",
      title: "What we'll cover",
      items: [
        {
          title: "Sales 101 — Unlock your sales potential",
          text: "The foundation of effective selling.",
          topics: ["Pinpoint your ideal customers", "Understand customer mindset and psychology", "Refine your compelling sales story", "Master negotiation tactics", "Close deals with confidence"],
        },
        {
          title: "Survival of the fittest sales",
          text: "Build mental and tactical resilience.",
          topics: ["Develop personal mental fitness", "Time management with the PE² framework", "Structured flexibility in your approach", "Build your second brain for sales data", "Use AI wisely in your sales process"],
        },
        {
          title: "Become a sales hero",
          text: "Elevate your sales execution.",
          topics: ["Refresh your sales cycle understanding", "Avoid common negotiation pitfalls", "Apply the PE² framework strategically", "Leverage LinkedIn for sales success", "Stand out as a sales professional"],
        },
        {
          title: "The sales compass",
          text: "Navigate complex deals with confidence.",
          topics: ["Master multi-stakeholder sales dynamics", "Understand the 8 dimensions of complex sales", "Implement the compass framework", "Integrate it with your CRM system", "Win complex deals consistently"],
        },
      ],
    },
    outcomes: {
      title: "Key frameworks you'll use",
      items: [
        { title: "PE² framework", text: "A method for time management and structured flexibility: balance preparation with adaptability in every sales conversation." },
        { title: "Sales compass", text: "The 8 dimensions of complex sales, to identify key players in multi-stakeholder deals, influence outcomes and connect it all to your CRM." },
        { title: "The sales story", text: "Craft and refine your personal sales narrative, so you communicate your value proposition clearly and create memorable customer interactions." },
        { title: "Second brain system", text: "A personal knowledge system to track customer insights, pipeline data and sales intelligence." },
      ],
    },
    steps: {
      eyebrow: "What you get",
      title: "You'll walk away with",
      items: [
        { title: "Proven methods", text: "Sales methodologies and frameworks you can apply immediately." },
        { title: "Confidence", text: "Practical techniques for complex negotiations and closing." },
        { title: "AI toolkit", text: "AI-enabled strategies to work smarter across your sales process." },
        { title: "Connections", text: "A network of fellow entrepreneurs and sales professionals." },
      ],
    },
    faq: [
      {
        q: "Do I need sales experience?",
        a: ["No. The program starts with the fundamentals in Sales 101 and builds up to complex deals, so it works for people moving into sales as well as experienced sellers who want to sharpen their skills."],
      },
      {
        q: "Can it be tailored to our team?",
        a: ["Yes. For company bookings we build the sessions around your product, your customers and your sales cycle, and you can focus on the modules your team needs most."],
      },
      {
        q: "Where does it take place?",
        a: ["At Business Nest in Eindhoven, or at your office for team bookings. It's an in-person training."],
      },
      {
        q: "What does it cost?",
        a: ["For companies booking the program for their team, the price is on request — send us a booking request and we'll get back to you with a proposal. The price for open sessions will be announced together with the next date."],
      },
    ],
    booking: {
      goalPlaceholder: "E.g. our sales challenges, which modules interest us, team experience level",
      teamText: "Tell us about your team, your sales challenges and which modules interest you. We'll get back to you with a proposal and available dates.",
      joinTitle: "Join the next open session",
      joinText: "Leave your name and email and we'll let you know as soon as the next open session is scheduled.",
    },
  },
  {
    slug: "quality-assurance-ai",
    hidden: true,
    title: "QA Approach for AI-Based Apps",
    titleParts: ["", "QA", " approach for AI-based apps"],
    status: "past",
    format: "Evening talk · 2 hours",
    summary: "Build trust and reliability into your AI applications.",
    intro:
      "Building trust and reliability in your AI applications — essential QA for everyone building or managing AI-driven products.",
    date: "16 January 2026",
    time: "19:00–21:00",
    location: "StrijpCS, Eindhoven",
    fact4: { label: "Speaker", value: "Janine Simons" },
    duration: "2 hours",
    card: { img: "/images/web/qa-talk.jpg", alt: "Janine Simons presenting the QA approach for AI-based apps" },
    hero: {
      kind: "egg",
      img: "/images/web/qa-talk.jpg",
      alt: "Janine Simons presenting the Quality Assurance approach for LLM-based apps at StrijpCS",
      pos: "55% 40%",
    },
    cta: "Get notified about the next edition",
    whoFor: {
      eyebrow: "Who it's for",
      title: "Unlock the secrets to reliable AI",
      paragraphs: [
        "Designed for startup founders, their team members and anyone involved in developing or deploying AI-based applications.",
        "If you are responsible for the quality, reliability or trustworthiness of an AI product — or simply want to understand how to build robust AI solutions — this session is for you.",
      ],
      speaker: { name: "Janine Simons", initials: "JS", bio: "" }, // TODO: add a short bio and LinkedIn link
      learnTitle: "What you will learn",
      learn: [
        "Discover the unique quality assurance challenges posed by AI technologies.",
        "Understand why traditional software testing alone is insufficient for AI applications.",
        "Learn practical QA approaches tailored specifically for AI-based apps.",
        "Gain the skills to create a basic QA process suitable for your startup or organisation.",
        "Know when to seek professional help and how to build a clear action plan for trust and reliability in your AI product.",
      ],
    },
    seat: {
      badge: "This edition has ended",
      title: "Be first to know about the next edition",
      text: "Leave your email and we'll let you know as soon as a new date is set.",
    },
  },
];

/** The workshop featured at the top of /workshops */
export const HIGHLIGHTED_SLUG = "ai-co-creator";

export const getWorkshop = (slug?: string) => WORKSHOPS.find((w) => w.slug === slug || w.aliases?.includes(slug ?? ""));
export const workshopMeta = (w: Workshop) => w.cardMeta ?? `${w.date} · ${w.location} · ${w.duration}`;
