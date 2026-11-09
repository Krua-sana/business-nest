// Shared links and contact details. Change a link here and it updates everywhere.
export const LINKS = {
  joinCommunity: "https://eindhoven-entrepreneurs.nl/join-community/",
  programApplication: "https://forms.gle/3wNJf2ChEezUZYnFA",
  programIntakeCall: "https://cal.com/business-nest-n0ftmi/10-saturdays-program-intake",
  becomeExpert: "mailto:team@business-nest.nl?subject=Expert%20Application",
  sharePhotos: "mailto:info@business-nest.nl?subject=Photos%20for%20the%20Business%20Nest%20gallery",
  linkedin: "https://www.linkedin.com/company/the-startup-nest/",
  instagram: "https://www.instagram.com/startup.nest.nl",
  // Formspree endpoint that receives workshop proposals and waiting-list sign-ups.
  formspree: "https://formspree.io/f/xkgqbpaz",
};

export const CONTACT = {
  phone: "+31 6 2791 43 16",
  phoneHref: "tel:+31627914316",
  email: "info@business-nest.nl",
};

export const NAV = [
  { label: "Home", to: "/", key: "home" },
  { label: "10 Saturdays", to: "/program", key: "program" },
  { label: "Workshops", to: "/workshops", key: "workshops" },
  { label: "Experts", to: "/experts", key: "experts" },
  { label: "Gallery", to: "/gallery", key: "gallery" },
  { label: "About", to: "/#about", key: "about" },
] as const;

export type NavKey = "home" | "program" | "workshops" | "experts" | "gallery";

export const LOGO = "/images/business-nest-logo.png";
export const LOGO_WHITE = "/images/business-nest-logo-white.png";
