// Program experts (Experts page + 10 Saturdays page) and community mentors (Home page).

export type TagKey = "biz" | "mkt" | "fin" | "legal" | "tech";

export const TAG_STYLES: Record<TagKey, { bg: string; ink: string }> = {
  biz: { bg: "#FFD84D", ink: "#111827" },
  mkt: { bg: "#FDBA74", ink: "#111827" },
  fin: { bg: "#D4F57A", ink: "#111827" },
  legal: { bg: "#111827", ink: "#FFFFFF" },
  tech: { bg: "#1F44F0", ink: "#FFFFFF" },
};

export interface Expert {
  name: string;
  tag: string;
  tagKey: TagKey;
  photo: string;
  bio: string;
  linkedin: string;
  /** Show on the 10 Saturdays page ("Learn from people who've done it") */
  onProgram?: boolean;
}

export const EXPERTS: Expert[] = [
  {
    name: "Joris Moons",
    tag: "Sales",
    tagKey: "biz",
    photo: "/images/experts/Joris-Moons.jpg",
    bio: "Business development in all its aspects: product–market fit, go-to-market and strategy definition.",
    linkedin: "https://www.linkedin.com/in/jorismoons/",
    onProgram: true,
  },
  {
    name: "Suzanne Donker",
    tag: "Marketing",
    tagKey: "mkt",
    photo: "/images/experts/Suzanne-Donker.jpg",
    bio: "Catalyst in marketing communication. Expertise: positioning, branding and reaching the right target groups.",
    linkedin: "https://www.linkedin.com/in/suzannedonker/",
    onProgram: true,
  },
  {
    name: "Dr. Anna Ezerskiy MBA",
    tag: "Finance",
    tagKey: "fin",
    photo: "/images/experts/Anna-Ezerskiy.jpg",
    bio: "Helps founders turn breakthrough ideas into viable businesses by bridging technology with strategy, funding and go-to-market execution.",
    linkedin: "https://www.linkedin.com/in/anna-ezerskiy/",
    onProgram: true,
  },
  {
    name: "Magdaleen Jooste",
    tag: "Legal & IP",
    tagKey: "legal",
    photo: "/images/experts/Magdaleen.jpg",
    bio: "Patent attorney and lawyer helping innovators protect and leverage their ideas effectively.",
    linkedin: "https://www.linkedin.com/in/magdaleen-jooste/",
  },
  {
    name: "Guido Groeneweg",
    tag: "Technology",
    tagKey: "tech",
    photo: "/images/experts/Guido-Groeneweg.jpg",
    bio: "Senior enterprise architect at NTT DATA. High-tech and telecom, digital leadership, innovation and coaching.",
    linkedin: "https://www.linkedin.com/in/guidogroeneweg/",
  },
  {
    name: "Giovanni Beccu",
    tag: "Brand design",
    tagKey: "mkt",
    photo: "/images/experts/Giovanni.jpg",
    bio: "Brand designer helping express a distinct point of view that sets your business apart.",
    linkedin: "https://www.linkedin.com/in/giovanni-beccu/",
  },
];

export interface Mentor {
  name: string;
  role: string;
  bio: string;
  photo?: string;
  initials: string;
  linkedin?: string;
}

export const MENTORS: Mentor[] = [
  {
    name: "Kris Smirnova",
    role: "Trend watcher & business facilitator",
    bio: "15+ years helping businesses validate ideas and understand their customers.",
    photo: "/lovable-uploads/Kris-Smirnova.jpg",
    initials: "KS",
    linkedin: "https://www.linkedin.com/in/krissmir/",
  },
  {
    name: "Kateryna Saprunova",
    role: "Community builder & experience designer",
    bio: "Helping solopreneurs build their business with design thinking and Lean Startup.",
    photo: "/images/web/Kateryna-Saprunova.jpg",
    initials: "KS",
    linkedin: "https://www.linkedin.com/in/saprunova-kateryna/",
  },
  {
    name: "Dilip Kumar Mulluri",
    role: "IT mentor and startup advisor",
    bio: "Former VC partner with expertise in early-stage funding and financial planning.",
    photo: "/images/web/Dilip-Kumar-Mulluri.jpg",
    initials: "DM",
    linkedin: "https://www.linkedin.com/in/dilip-kumar-mulluri-90243b77/",
  },
  {
    name: "Simeon Dimov",
    role: "AI mentor and tech strategist",
    bio: "Serial entrepreneur and CEO with 3 successful exits in the tech industry.",
    photo: "/images/experts/Simeon-Dimov.jpg",
    initials: "SD",
    linkedin: "https://www.linkedin.com/in/simeon-dimov-bb429016b/",
  },
];
