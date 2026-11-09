import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CONTACT, LINKS, LOGO, LOGO_WHITE, NAV, type NavKey } from "@/data/site";
import { CloseIcon, InstagramIcon, LinkedInIcon, MailIcon, MenuIcon, PhoneIcon } from "./Icons";

/* ---------- Header ---------- */
export function Header({ active }: { active: NavKey }) {
  const [open, setOpen] = useState(false);
  const { pathname, hash } = useLocation();
  useEffect(() => setOpen(false), [pathname, hash]);

  const links = NAV.map((item) => {
    const on = item.key === active;
    return (
      <NavLink
        key={item.key}
        to={item.to}
        aria-current={on ? "page" : undefined}
        className={`inline-flex min-h-[44px] items-center px-3 text-[15px] text-ink no-underline ${on ? "font-bold" : "font-medium"}`}
        style={on ? { boxShadow: "inset 0 -3px 0 #F26A1B" } : undefined}
      >
        {item.label}
      </NavLink>
    );
  });

  return (
    <header className="sticky top-0 z-40 border-b border-sand bg-cream/95 backdrop-blur supports-[backdrop-filter]:bg-cream/85">
      <div className="mx-auto box-border flex max-w-page items-center justify-between gap-4 px-5 py-4 md:px-10">
        <Link to="/" aria-label="Business Nest — home" className="flex min-h-[44px] items-center gap-3 text-ink no-underline hover:text-ink">
          <img src={LOGO} alt="" width={48} height={48} className="block h-10 w-10 md:h-12 md:w-12" />
          <span className="font-display text-xl font-extrabold tracking-[-0.01em] md:text-[22px]">Business Nest</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-x-2 lg:flex">{links}</nav>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-sand px-5 pb-5 pt-2 lg:hidden">
          <div className="flex flex-col">{links}</div>
        </nav>
      )}
    </header>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const explore = [
    ["Home", "/"],
    ["10 Saturdays program", "/program"],
    ["Workshops", "/workshops"],
    ["Experts", "/experts"],
    ["Gallery", "/gallery"],
    ["About", "/#about"],
  ];
  const linkCls = "text-[15px] text-[#D1D5DB] no-underline hover:text-white";
  return (
    <footer className="w-full overflow-hidden bg-ink text-[#D1D5DB]" style={{ overflowWrap: "anywhere" }}>
      <div className="mx-auto box-border flex max-w-page flex-col gap-12 px-5 pb-8 pt-[72px] md:px-10">
        <div className="flex min-w-0 flex-wrap justify-between gap-x-16 gap-y-10">
          <div className="flex min-w-0 max-w-[340px] flex-[1_1_240px] flex-col gap-5">
            <Link to="/" aria-label="Business Nest — home" className="flex items-center gap-3 text-white no-underline hover:text-white">
              <img src={LOGO_WHITE} alt="" width={52} height={52} className="block h-[52px] w-[52px]" />
              <span className="font-display text-2xl font-extrabold">Business Nest</span>
            </Link>
            <p className="m-0 text-base leading-relaxed">Where entrepreneurs come to hatch their business ideas into successful ventures.</p>
            <div className="flex gap-2">
              <a href={LINKS.linkedin} aria-label="Business Nest on LinkedIn" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate text-white hover:text-white hover:bg-white/10">
                <LinkedInIcon />
              </a>
              <a href={LINKS.instagram} aria-label="Business Nest on Instagram" className="flex h-11 w-11 items-center justify-center rounded-full border border-slate text-white hover:text-white hover:bg-white/10">
                <InstagramIcon />
              </a>
            </div>
          </div>
          <nav aria-label="Footer" className="flex min-w-[160px] flex-[0_1_180px] flex-col gap-3.5">
            <h2 className="mb-1 font-display text-lg font-bold text-white">Explore</h2>
            {explore.map(([label, to]) => (
              <Link key={to} to={to} className={linkCls}>{label}</Link>
            ))}
          </nav>
          <div className="flex min-w-[160px] flex-[0_1_240px] flex-col gap-3.5">
            <h2 className="mb-1 font-display text-lg font-bold text-white">Contact us</h2>
            <a href={CONTACT.phoneHref} className={`flex min-h-[32px] items-center gap-2.5 ${linkCls}`}>
              <PhoneIcon className="text-orange" /> {CONTACT.phone}
            </a>
            <a href={`mailto:${CONTACT.email}`} className={`flex min-h-[32px] items-center gap-2.5 ${linkCls}`}>
              <MailIcon className="text-orange" /> {CONTACT.email}
            </a>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-slate pt-6 text-sm text-[#9CA3AF]">
          <p className="m-0">© {new Date().getFullYear()} Business Nest. All rights reserved.</p>
          <p className="m-0">Made with care for entrepreneurs in Eindhoven.</p>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Back to top (bird) ---------- */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed bottom-4 right-4 z-50 transition-all duration-300 md:bottom-6 md:right-6"
      style={{ opacity: show ? 1 : 0, visibility: show ? "visible" : "hidden", transform: show ? "none" : "translateY(16px)" }}
    >
      <a
        href="#top"
        onClick={(e) => {
          e.preventDefault();
          const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
          document.getElementById("main")?.focus({ preventScroll: true });
        }}
        className="bn-top relative box-border inline-flex min-h-[56px] items-center gap-3 rounded-full border-[1.5px] border-ink bg-white py-1.5 pl-1.5 pr-[22px] text-[15px] font-semibold text-ink no-underline hover:text-ink"
        style={{ boxShadow: "0 12px 28px -10px rgba(17,24,39,.45)" }}
      >
        <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-lime">
          <svg className="bn-bird" width="34" height="34" viewBox="0 -5 48 48" fill="none" stroke="#111827" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ overflow: "visible" }}>
            <path className="bn-wing bn-wing-far" d="M27 23 C27 16 25 11 21 7" strokeWidth="1.6" opacity="0.55" />
            <path d="M10 27 C14 22 24 20 31 23 C34 21 38 20 41 22 L44 23 L40 25 C38 28 34 29 30 29 C23 31 15 30 10 27 Z" fill="#FFFFFF" />
            <path d="M10 27 L5 24 M10 27 L5 30" />
            <circle cx="37" cy="23.5" r="0.9" fill="#111827" stroke="none" />
            <path className="bn-wing bn-wing-near" d="M25 24 C22 15 16 9 8 8 C12 13 16 19 20 25" fill="#FFFFFF" />
          </svg>
        </span>
        Back to top
      </a>
    </div>
  );
}

/* ---------- Page layout ---------- */
export function Page({ active, title, description, children }: { active: NavKey; title: string; description?: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
    if (description) document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
  return (
    <div id="top" className="overflow-x-clip bg-cream font-sans text-ink">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header active={active} />
      <main id="main" tabIndex={-1} className="outline-none">{children}</main>
      <BackToTop />
      <Footer />
    </div>
  );
}
