// Gallery items. `ev` decides the filter chip; `kind: "video"` items need a `video` file URL.
// NOTE: event labels for the older photos are a best guess — please check them.

export type GalleryEvent = "sat" | "ws" | "com";

export const EVENT_TAGS: Record<GalleryEvent, { label: string; bg: string; ink: string }> = {
  sat: { label: "10 Saturdays", bg: "#1F44F0", ink: "#FFFFFF" },
  ws: { label: "Workshop", bg: "#FFD84D", ink: "#111827" },
  com: { label: "Community event", bg: "#D4F57A", ink: "#111827" },
};

export interface GalleryItem {
  ev: GalleryEvent;
  kind: "photo" | "video";
  img: string; // photo, or poster image for a video
  video?: string;
  duration?: string;
  title: string;
  meta: string;
  alt: string;
}

const AI = "AI as a Co-Creator · 13 Dec 2025 · Microlab";

export const GALLERY: GalleryItem[] = [
  { ev: "ws", kind: "photo", img: "/images/hero/hero-3.jpg", title: "Building MVPs with AI", meta: AI, alt: "Founders collaborating on laptops during the AI as a Co-Creator workshop" },
  { ev: "ws", kind: "photo", img: "/images/hero/hero-2.jpg", title: "Prompts and roles, live", meta: AI, alt: "A moderator presenting prompting techniques on screen" },
  { ev: "sat", kind: "photo", img: "/images/web/gallery/g2.jpg", title: "One-on-one with a mentor", meta: "10 Saturdays", alt: "An expert mentoring two founders at a table with a flip chart" },
  { ev: "ws", kind: "photo", img: "/images/web/qa-talk.jpg", title: "Trust in AI products", meta: "QA for AI-Based Apps · 16 Jan 2026 · StrijpCS", alt: "Janine Simons presenting the QA approach for LLM-based apps" },
  { ev: "ws", kind: "photo", img: "/images/hero/hero-4.jpg", title: "From idea to Ideate", meta: AI, alt: "A facilitator walking the group through the Ideate step" },
  { ev: "ws", kind: "photo", img: "/images/web/gallery/g12.jpg", title: "Heads-down build time", meta: AI, alt: "A founder coding a prototype on a laptop" },
  { ev: "ws", kind: "photo", img: "/images/hero/hero-1.jpg", title: "Thank you, everyone!", meta: AI, alt: "Group photo of all workshop participants in front of the screen" },
  { ev: "ws", kind: "photo", img: "/images/hero/hero-5.jpg", title: "Feedback at the table", meta: AI, alt: "A participant giving feedback while others work on laptops" },
  { ev: "ws", kind: "photo", img: "/images/web/gallery/g1.jpg", title: "The power of AI-driven co-creation", meta: AI, alt: "A speaker opening the workshop next to a slide about AI-driven co-creation" },
  { ev: "sat", kind: "photo", img: "/images/web/gallery/g5.jpg", title: "Mapping the business model", meta: "10 Saturdays", alt: "Founders leaning over a table full of sticky notes" },
  { ev: "sat", kind: "photo", img: "/images/web/gallery/g6.jpg", title: "Sticky-note sprint", meta: "10 Saturdays", alt: "Participants adding sticky notes to a whiteboard" },
  { ev: "sat", kind: "photo", img: "/images/web/gallery/g9.jpg", title: "Peer feedback", meta: "10 Saturdays", alt: "A mentor leaning in to help two founders at their table" },
  { ev: "sat", kind: "photo", img: "/images/web/gallery/g13.jpg", title: "Round-table discussion", meta: "10 Saturdays", alt: "Founders sitting together in a circle discussing their ideas" },
  { ev: "com", kind: "photo", img: "/images/web/gallery/g7.jpg", title: "Pitch practice", meta: "Community event", alt: "Two participants rehearsing a pitch with lively gestures" },
  { ev: "com", kind: "photo", img: "/images/web/gallery/g8.jpg", title: "Ditch the nerves", meta: "Community event", alt: "Participants practising public speaking in front of the group" },
  { ev: "sat", kind: "photo", img: "/images/web/gallery/image13.jpg", title: "Team huddle", meta: "10 Saturdays", alt: "A team standing together in front of a whiteboard with sticky notes" },
  { ev: "sat", kind: "photo", img: "/images/web/gallery/image12.jpg", title: "Hands-on exercise", meta: "10 Saturdays", alt: "Participants working around a table during an exercise" },
  { ev: "sat", kind: "photo", img: "/images/web/gallery/g16.jpg", title: "Sharing insights", meta: "10 Saturdays", alt: "Two participants laughing while reading their notes" },
];
