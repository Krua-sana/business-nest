import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { sendForm, formValues } from "@/lib/sendForm";
import { TAG_STYLES, type Expert } from "@/data/experts";
import { STATUS, workshopMeta, type AgendaItem, type Workshop } from "@/data/workshops";
import { EllipseRings } from "./Decor";
import { ArrowRight, Chevron, CloseIcon, ExternalArrow, QuoteMark } from "./Icons";

/* Smart link: internal routes use the router, everything else is a plain anchor. */
export function SmartLink({ to, className, children, ...rest }: { to: string; className?: string; children: ReactNode; "aria-label"?: string }) {
  if (to.startsWith("/") && !to.startsWith("//")) return <Link to={to} className={className} {...rest}>{children}</Link>;
  return <a href={to} className={className} {...rest}>{children}</a>;
}

export const Pill = ({ dot, children, outline }: { dot: string; children: ReactNode; outline?: boolean }) => (
  <p className="pill m-0">
    <span aria-hidden="true" className="block h-2 w-2 rounded-full" style={{ background: dot, outline: outline ? "1px solid #111827" : undefined }} />
    {children}
  </p>
);

export const SectionHead = ({ eyebrow, title, id, intro, center, small, light }: { eyebrow?: string; title: ReactNode; id: string; intro?: ReactNode; center?: boolean; small?: boolean; light?: boolean }) => (
  <div className={`flex flex-col gap-3 ${center ? "items-center text-center" : ""}`}>
    {eyebrow && <p className="eyebrow" style={light ? { color: "#FFD84D" } : undefined}>{eyebrow}</p>}
    <h2 id={id} className={small ? "h2-sm" : "h2"}>{title}</h2>
    {intro && <p className="m-0 max-w-[620px] text-lg leading-relaxed text-slate">{intro}</p>}
  </div>
);

export const StatusBadge = ({ status, label }: { status: Workshop["status"]; label?: string }) => (
  <span className="badge" style={{ background: STATUS[status].bg }}>{label ?? STATUS[status].label}</span>
);

export function WorkshopCard({ w, withSummary }: { w: Workshop; withSummary?: boolean }) {
  return (
    <li className="card flex flex-col">
      <img src={w.card.img} alt={w.card.alt} loading="lazy" className="block aspect-[2/1] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <StatusBadge status={w.status} />
        <h3 className="h3">{w.title}</h3>
        {withSummary && <p className="m-0 text-[15px] leading-normal text-slate">{w.summary}</p>}
        <p className={`m-0 ${withSummary ? "text-sm" : "text-[15px]"} text-stone`}>{workshopMeta(w)}</p>
        <Link to={`/workshops/${w.slug}`} aria-label={`View details: ${w.title}`} className="link-arrow mt-auto text-ember">
          View details <ArrowRight size={16} />
        </Link>
      </div>
    </li>
  );
}

export function ExpertCard({ x, bg = "#FFF8EF" }: { x: Expert; bg?: string }) {
  const t = TAG_STYLES[x.tagKey];
  return (
    <li className="flex flex-col overflow-hidden rounded-card" style={{ background: bg }}>
      <img src={x.photo} alt="" loading="lazy" className="block aspect-[4/3] w-full object-cover object-top" />
      <div className="flex flex-1 flex-col gap-2.5 p-6">
        <span className="badge" style={{ background: t.bg, color: t.ink }}>{x.tag}</span>
        <h3 className="text-[21px] font-bold">{x.name}</h3>
        <p className="m-0 flex-1 text-[15px] leading-[1.55] text-stone">{x.bio}</p>
        <LinkedInLink href={x.linkedin} name={x.name} />
      </div>
    </li>
  );
}

export const LinkedInLink = ({ href, name, small }: { href: string; name: string; small?: boolean }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${name} on LinkedIn (opens in a new tab)`} className={`link-arrow ${small ? "text-sm" : ""} self-start text-sky hover:text-ink`}>
    LinkedIn profile <ExternalArrow size={small ? 13 : 14} />
  </a>
);

export function Testimonial({ text, name, role, initials, photo, color, bg = "#FFFFFF", bordered = true, big }: { text: string; name: string; role?: string; initials: string; photo?: string; color: string; bg?: string; bordered?: boolean; big?: boolean }) {
  return (
    <li className={`flex flex-col gap-5 rounded-card p-8 ${bordered ? "border border-sand" : ""}`} style={{ background: bg }}>
      <QuoteMark />
      <blockquote className={`m-0 flex-1 leading-relaxed ${big ? "text-lg" : "text-[17px]"}`}>{text}</blockquote>
      <div className="flex items-center gap-3">
        {photo ? (
          <img src={photo} alt="" loading="lazy" className="h-11 w-11 shrink-0 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold" style={{ background: color }}>{initials}</span>
        )}
        <span className="flex flex-col">
          <strong className="text-[15px]">{name}</strong>
          {role && <span className="text-sm text-stone">{role}</span>}
        </span>
      </div>
    </li>
  );
}

export const Agenda = ({ items }: { items: AgendaItem[] }) => (
  <ol className="m-0 flex list-none flex-col p-0">
    {items.map((a) => (
      <li key={a.time + a.item} className="grid items-start gap-3 py-2.5" style={{ gridTemplateColumns: "64px 24px minmax(0,1fr)" }}>
        <span className="text-base font-bold tabular-nums">{a.time}</span>
        <span aria-hidden="true" className="mt-1 box-border block h-3.5 w-3.5 rounded-full border-[3px] bg-white" style={{ borderColor: a.isBreak ? "#9CA3AF" : "#F26A1B" }} />
        <span className="text-base leading-[1.45]" style={{ color: a.isBreak ? "#4B5563" : "#111827" }}>{a.item}</span>
      </li>
    ))}
  </ol>
);

export const Breadcrumb = ({ current }: { current: string }) => (
  <nav aria-label="Breadcrumb" className="wrap-page pt-5">
    <ol className="m-0 flex list-none flex-wrap gap-2 p-0 text-sm text-stone">
      <li><Link to="/" className="text-slate">Home</Link></li>
      <li aria-hidden="true">/</li>
      <li><Link to="/workshops" className="text-slate">Workshops</Link></li>
      <li aria-hidden="true">/</li>
      <li aria-current="page" className="font-semibold text-ink">{current}</li>
    </ol>
  </nav>
);

/* CTA band: ink | orange | blue */
const BAND = {
  ink: { bg: "#111827", fg: "#FFFFFF", sub: "#D1D5DB", rings: [{ rx: 130, ry: 100, stroke: "#F26A1B", w: 4, rot: -14 }, { rx: 118, ry: 110, stroke: "#F59E0B", w: 2, rot: 22 }, { rx: 140, ry: 88, stroke: "#FFFFFF", w: 1, rot: 6, op: 0.5 }], pos: { right: -60, top: -80, width: 360, height: 360 } },
  orange: { bg: "#F26A1B", fg: "#111827", sub: "#111827", rings: [{ rx: 130, ry: 100, stroke: "#111827", w: 2, rot: -14 }, { rx: 118, ry: 110, stroke: "#FFF8EF", w: 3, rot: 22 }], pos: { right: -40, bottom: -120, width: 340, height: 340 } },
  blue: { bg: "#1F44F0", fg: "#FFFFFF", sub: "#E8ECFF", rings: [{ rx: 130, ry: 100, stroke: "#FFD84D", w: 4, rot: -14 }, { rx: 118, ry: 110, stroke: "#FFFFFF", w: 2, rot: 22, op: 0.6 }], pos: { right: -60, top: -90, width: 360, height: 360 } },
};

export function CtaBand({ variant, id, titleId, title, text, icon, action }: { variant: keyof typeof BAND; id?: string; titleId: string; title: string; text: string; icon?: ReactNode; action: ReactNode }) {
  const b = BAND[variant];
  return (
    <section id={id} aria-labelledby={titleId} className="px-5 py-[72px] md:px-10 md:py-24">
      <div className="relative mx-auto box-border flex max-w-band flex-wrap items-center justify-between gap-8 overflow-hidden rounded-panel p-8 sm:p-12 lg:p-16" style={{ background: b.bg, color: b.fg }}>
        <EllipseRings rings={b.rings} style={b.pos} />
        <div className="relative flex max-w-[720px] items-start gap-6">
          {icon}
          <div className="flex flex-col gap-3">
            <h2 id={titleId} className="font-display text-[32px] font-extrabold leading-[1.05] md:text-[44px]">{title}</h2>
            <p className="m-0 text-lg leading-relaxed" style={{ color: b.sub }}>{text}</p>
          </div>
        </div>
        <div className="relative">{action}</div>
      </div>
    </section>
  );
}

/* Name + email sign-up for an open session / next edition of a workshop. */
/** Set withName to also ask for the participant's name (open-session sign-up). */
export function WaitlistForm({ workshop, idPrefix, withName, onBlue }: { workshop: string; idPrefix: string; withName?: boolean; onBlue?: boolean }) {
  const errColor = onBlue ? "#FFD84D" : "#FCA5A5"; // keeps error text readable on blue
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const inputId = `${idPrefix}-email`;
  const nameId = `${idPrefix}-name`;
  const errId = `${idPrefix}-err`;
  const nameErrId = `${idPrefix}-name-err`;
  const [nameError, setNameError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const name = withName ? (form.elements.namedItem("name") as HTMLInputElement).value.trim() : "";
    const badName = withName && name.length < 2;
    const badEmail = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
    setNameError(badName ? "Error: enter your full name" : "");
    setError(badEmail ? "Error: enter a full email, e.g. name@domain.nl" : "");
    if (badName || badEmail) return;
    setState("sending");
    try {
      await sendForm("signup", { workshop, name, email }, `Waiting list: ${workshop}`);
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return <p role="status" className="relative m-0 rounded-2xl bg-lime px-5 py-4 text-base font-semibold text-ink">Thank you! We'll email you as soon as the next date is set.</p>;
  }
  return (
    <form noValidate onSubmit={submit} className="relative flex flex-wrap items-end gap-3">
      {withName && (
        <div className="flex w-full flex-col gap-2">
          <label htmlFor={nameId} className="text-[15px] font-semibold">Full name</label>
          <input
            id={nameId}
            name="name"
            autoComplete="name"
            aria-invalid={nameError ? true : undefined}
            aria-describedby={nameError ? nameErrId : undefined}
            className="box-border min-h-[52px] rounded-2xl border-2 bg-white px-4 text-base text-ink"
            style={{ borderColor: nameError ? errColor : "#9CA3AF" }}
          />
          {nameError && <p id={nameErrId} className="m-0 text-sm font-semibold" style={{ color: errColor }}>{nameError}</p>}
        </div>
      )}
      <div className="flex flex-[1_1_280px] flex-col gap-2">
        <label htmlFor={inputId} className="text-[15px] font-semibold">Email address</label>
        <input
          id={inputId}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errId : undefined}
          className="box-border min-h-[52px] rounded-2xl border-2 bg-white px-4 text-base text-ink"
          style={{ borderColor: error ? errColor : "#9CA3AF" }}
        />
      </div>
      <button type="submit" disabled={state === "sending"} className="btn-primary cursor-pointer border-0 disabled:opacity-70">
        {state === "sending" ? "Sending…" : "Notify me"}
      </button>
      {error && <p id={errId} className="m-0 w-full text-sm font-semibold" style={{ color: errColor }}>{error}</p>}
      {state === "error" && <p role="alert" className="m-0 w-full text-sm font-semibold" style={{ color: errColor }}>Something went wrong. Please try again, or email us at info@business-nest.nl.</p>}
    </form>
  );
}

/* Modal form: organise a workshop at Business Nest. */
export function HostWorkshopDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setState("idle"); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      await sendForm("proposal", formValues(form), "Workshop proposal via business-nest.nl");
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  };

  const field = "box-border min-h-[52px] w-full rounded-2xl border-2 border-[#9CA3AF] bg-white px-4 text-base text-ink";
  const label = "text-[15px] font-semibold";
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      aria-labelledby="hw-title"
      className="m-auto w-[min(640px,calc(100%-32px))] max-h-[90vh] overflow-y-auto rounded-[32px] border-0 bg-cream p-0 text-ink backdrop:bg-ink/70"
    >
      <div className="flex flex-col gap-5 p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 id="hw-title" className="font-display text-[28px] font-extrabold leading-[1.1]">Organise a workshop at Business Nest</h2>
            <p className="m-0 text-base text-slate">Tell us about your idea and we'll get in touch to plan it together.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close form" className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-ink bg-transparent p-0"><CloseIcon /></button>
        </div>
        {state === "done" ? (
          <div role="status" className="flex flex-col gap-4">
            <p className="m-0 rounded-2xl bg-lime px-5 py-4 text-base font-semibold">Thank you! We've received your workshop idea and will get back to you soon.</p>
            <button type="button" onClick={onClose} className="btn-dark cursor-pointer self-start border-0">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2"><label htmlFor="hw-name" className={label}>Full name *</label><input id="hw-name" name="name" required autoComplete="name" className={field} /></div>
            <div className="flex flex-col gap-2"><label htmlFor="hw-email" className={label}>Email *</label><input id="hw-email" name="email" type="email" required autoComplete="email" className={field} /></div>
            <div className="flex flex-col gap-2"><label htmlFor="hw-phone" className={label}>Phone</label><input id="hw-phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
            <div className="flex flex-col gap-2"><label htmlFor="hw-org" className={label}>Company / organisation</label><input id="hw-org" name="organisation" autoComplete="organization" className={field} /></div>
            <div className="flex flex-col gap-2 sm:col-span-2"><label htmlFor="hw-topic" className={label}>Workshop topic *</label><input id="hw-topic" name="workshop_topic" required className={field} /></div>
            <div className="flex flex-col gap-2 sm:col-span-2"><label htmlFor="hw-desc" className={label}>Short description *</label><textarea id="hw-desc" name="description" required rows={4} placeholder="What will participants learn or do? Who is it for?" className={`${field} py-3`} /></div>
            <div className="flex flex-col gap-2"><label htmlFor="hw-size" className={label}>Expected group size</label><input id="hw-size" name="group_size" placeholder="e.g. 10–20 people" className={field} /></div>
            <div className="flex flex-col gap-2"><label htmlFor="hw-when" className={label}>Preferred period</label><input id="hw-when" name="preferred_period" placeholder="e.g. March 2027, weekends" className={field} /></div>
            {state === "error" && <p role="alert" className="m-0 font-semibold text-[#B91C1C] sm:col-span-2">Something went wrong. Please try again, or email us at info@business-nest.nl.</p>}
            <div className="sm:col-span-2">
              <button type="submit" disabled={state === "sending"} className="btn-primary cursor-pointer border-0 disabled:opacity-70">
                {state === "sending" ? "Sending…" : "Send your idea"} <ArrowRight />
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}

/* FAQ accordion (10 Saturdays page and bookable workshops). */
export function FaqList({ items, idPrefix, defaultOpen = [0] }: { items: { q: string; a: ReactNode }[]; idPrefix: string; defaultOpen?: number[] }) {
  const [open, setOpen] = useState<Record<number, boolean>>(Object.fromEntries(defaultOpen.map((i) => [i, true])));
  return (
    <ul className="m-0 mx-auto flex w-full max-w-[880px] list-none flex-col gap-3 p-0">
      {items.map((f, i) => {
        const isOpen = !!open[i];
        const id = `${idPrefix}-${i}`;
        return (
          <li key={f.q} className="overflow-hidden rounded-3xl border border-sand bg-white">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={id}
                onClick={() => setOpen({ ...open, [i]: !isOpen })}
                className="flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-6 py-4 text-left text-lg font-bold text-ink"
              >
                {f.q}
                <Chevron className="shrink-0 transition-transform" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
              </button>
            </h3>
            <div id={id} hidden={!isOpen} className={`${isOpen ? "flex" : "hidden"} flex-col gap-3 px-6 pb-6 text-base leading-[1.65] text-slate [&_p]:m-0`}>
              {f.a}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* Request form for companies booking a workshop for their team. */
export function TeamRequestForm({ workshop, idPrefix, maxGroup, goalPlaceholder }: { workshop: string; idPrefix: string; maxGroup?: string; goalPlaceholder?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      await sendForm("team", { ...formValues(form), workshop }, `Team booking request: ${workshop}`);
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  };
  if (state === "done") {
    return <p role="status" className="relative m-0 rounded-2xl bg-lime px-5 py-4 text-base font-semibold text-ink">Thank you! We've received your request and will get back to you within two working days.</p>;
  }
  const field = "box-border min-h-[52px] w-full rounded-2xl border-2 border-[#9CA3AF] bg-white px-4 text-base text-ink";
  const label = "text-[15px] font-semibold";
  const id = (s: string) => `${idPrefix}-${s}`;
  return (
    <form onSubmit={submit} className="relative grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-2"><label htmlFor={id("name")} className={label}>Your name *</label><input id={id("name")} name="name" required autoComplete="name" className={field} /></div>
      <div className="flex flex-col gap-2"><label htmlFor={id("email")} className={label}>Work email *</label><input id={id("email")} name="email" type="email" required autoComplete="email" className={field} /></div>
      <div className="flex flex-col gap-2"><label htmlFor={id("company")} className={label}>Company *</label><input id={id("company")} name="company" required autoComplete="organization" className={field} /></div>
      <div className="flex flex-col gap-2">
        <label htmlFor={id("size")} className={label}>Number of participants</label>
        <input id={id("size")} name="team_size" inputMode="numeric" aria-describedby={maxGroup ? id("size-hint") : undefined} className={field} />
        {maxGroup && <span id={id("size-hint")} className="text-[13px] text-[#D1D5DB]">Up to {maxGroup} per session</span>}
      </div>
      <div className="flex flex-col gap-2"><label htmlFor={id("dates")} className={label}>Preferred dates</label><input id={id("dates")} name="preferred_dates" placeholder="e.g. March 2027, weekdays" className={field} /></div>
      <div className="flex flex-col gap-2">
        <label htmlFor={id("where")} className={label}>Location</label>
        <select id={id("where")} name="location" className={field} defaultValue="Business Nest, Eindhoven">
          <option>Business Nest, Eindhoven</option>
          <option>At our office</option>
          <option>Not sure yet</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor={id("lang")} className={label}>Language</label>
        <select id={id("lang")} name="language" className={field} defaultValue="English">
          <option>English</option>
          <option>Dutch</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 sm:col-span-2">
        <label htmlFor={id("goal")} className={label}>What would you like to achieve?</label>
        <textarea id={id("goal")} name="goals" rows={4} placeholder={goalPlaceholder ?? "E.g. who will take part and what they should leave with"} className={`${field} py-3`} />
      </div>
      {state === "error" && <p role="alert" className="m-0 font-semibold text-[#FCA5A5] sm:col-span-2">Something went wrong. Please try again, or email us at info@business-nest.nl.</p>}
      <div className="sm:col-span-2">
        <button type="submit" disabled={state === "sending"} className="btn-primary cursor-pointer border-0 disabled:opacity-70">
          {state === "sending" ? "Sending…" : "Send booking request"} <ArrowRight />
        </button>
      </div>
    </form>
  );
}

/* Modal form: apply to become a Business Nest expert. */
export function ExpertApplyDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) { setState("idle"); d.showModal(); }
    if (!open && d.open) d.close();
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setState("sending");
    try {
      await sendForm("expert", formValues(form), "Expert application via business-nest.nl");
      setState("done");
      form.reset();
    } catch {
      setState("error");
    }
  };

  const field = "box-border min-h-[52px] w-full rounded-2xl border-2 border-[#9CA3AF] bg-white px-4 text-base text-ink";
  const label = "text-[15px] font-semibold";
  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
      aria-labelledby="ex-title"
      className="m-auto w-[min(640px,calc(100%-32px))] max-h-[90vh] overflow-y-auto rounded-[32px] border-0 bg-cream p-0 text-ink backdrop:bg-ink/70"
    >
      <div className="flex flex-col gap-5 p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 id="ex-title" className="font-display text-[28px] font-extrabold leading-[1.1]">Apply as an expert</h2>
            <p className="m-0 text-base text-slate">Tell us about your expertise and how you'd like to support early-stage founders. We'll get back to you soon.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close form" className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-ink bg-transparent p-0"><CloseIcon /></button>
        </div>
        {state === "done" ? (
          <div role="status" className="flex flex-col gap-4">
            <p className="m-0 rounded-2xl bg-lime px-5 py-4 text-base font-semibold">Thank you! We've received your application and will get back to you soon.</p>
            <button type="button" onClick={onClose} className="btn-dark cursor-pointer self-start border-0">Close</button>
          </div>
        ) : (
          <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2"><label htmlFor="ex-name" className={label}>Full name *</label><input id="ex-name" name="name" required autoComplete="name" className={field} /></div>
            <div className="flex flex-col gap-2"><label htmlFor="ex-email" className={label}>Email *</label><input id="ex-email" name="email" type="email" required autoComplete="email" className={field} /></div>
            <div className="flex flex-col gap-2"><label htmlFor="ex-phone" className={label}>Phone</label><input id="ex-phone" name="phone" type="tel" autoComplete="tel" className={field} /></div>
            <div className="flex flex-col gap-2"><label htmlFor="ex-li" className={label}>LinkedIn profile</label><input id="ex-li" name="linkedin" type="url" placeholder="https://www.linkedin.com/in/…" className={field} /></div>
            <div className="flex flex-col gap-2 sm:col-span-2"><label htmlFor="ex-area" className={label}>Area of expertise *</label><input id="ex-area" name="expertise" required placeholder="e.g. finance, marketing, legal, sales, technology" className={field} /></div>
            <div className="flex flex-col gap-2 sm:col-span-2"><label htmlFor="ex-why" className={label}>How would you like to support founders?</label><textarea id="ex-why" name="motivation" rows={4} placeholder="e.g. a session in the 10 Saturdays program, a workshop, one-to-one mentoring" className={`${field} py-3`} /></div>
            {state === "error" && <p role="alert" className="m-0 font-semibold text-[#B91C1C] sm:col-span-2">Something went wrong. Please try again, or email us at info@business-nest.nl.</p>}
            <div className="sm:col-span-2">
              <button type="submit" disabled={state === "sending"} className="btn-primary cursor-pointer border-0 disabled:opacity-70">
                {state === "sending" ? "Sending…" : "Send application"} <ArrowRight />
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
}
