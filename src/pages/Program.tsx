import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Page } from "@/components/Layout";
import { CornerRings, EggPhoto, EllipseRings } from "@/components/Decor";
import { ArrowRight, Check, Chevron } from "@/components/Icons";
import { CtaBand, ExpertCard, FaqList, Pill, SectionHead, Testimonial } from "@/components/ui";
import { EXPERTS } from "@/data/experts";
import { LINKS } from "@/data/site";

/** Set a date (e.g. "15 January 2027") to show it in the hero and on the price card. */
const APPLICATIONS_CLOSE: string | null = null;
/** Prices (excl. VAT). Set EARLY_BIRD_UNTIL (e.g. "1 December 2026") to show the deadline. */
const PRICE = "€2,500";
const EARLY_BIRD_PRICE = "€1,275";
const EARLY_BIRD_UNTIL: string | null = null;
/** Optional session dates, in order. Leave empty to show "Saturday 1", "Saturday 2"… */
const SESSION_DATES: string[] = [
  "6 March 2027", "13 March 2027", "20 March 2027", "3 April 2027", "10 April 2027",
  "17 April 2027", "24 April 2027", "1 May 2027", "8 May 2027", "15 May 2027 · Final pitch",
];
const START_DATE = "6 March 2027";
/** Each part is 5 Saturdays at half the full-programme price. */
const PART_PRICE = "€1,250";
const PART_EARLY_BIRD_PRICE = "€637.50";
const PARTS = [
  {
    n: "Part 1",
    title: "Build from scratch",
    when: "Saturdays 1–5 · 6 March – 10 April 2027",
    text: "For you if you want to develop your product or service from scratch: problem discovery, customer discovery, prototyping, your business model and Dutch business basics.",
    first: 0,
  },
  {
    n: "Part 2",
    title: "Grow and pitch",
    when: "Saturdays 6–10 · 17 April – 15 May 2027",
    text: "Better if you already have a product: revenue model, marketing and sales, financial planning and funding, your pitch deck — ending with the final pitch to the jury.",
    first: 5,
  },
];

const SESSIONS: [string, string][] = [
  ["Problem discovery and idea generation", "Identify concrete, real-world problems worth solving and map possible solutions."],
  ["Customer discovery", "Understand your customer beyond demographics, craft a matching offer and ensure market fit."],
  ["Prototyping, MVP and usability testing", "Create a prototype or MVP and test it with potential customers."],
  ["Business model, legal and business environment in NL", "The business model framework, plus the business and cultural traits of the Dutch business environment."],
  ["Business as a lifestyle, personal business development", "Align your strengths and passions with your business idea to build authentic growth."],
  ["Mid-way pitch, revenue model", "Learn how to structure your business for sustainable income and scalability."],
  ["Marketing and branding, sales, acquisition strategies", "Craft a brand identity and strategy that connects with your target audience."],
  ["Financial planning, funding options, roadmap", "Understand startup finances, explore funding opportunities and map your business journey."],
  ["Pitch deck development and storytelling", "Build a compelling pitch deck and learn to tell your startup story with impact."],
  ["Pitching and expert feedback", "Present your business to a jury, receive feedback and sharpen your investor-ready pitch."],
];

const PILLARS = [
  { n: "01", color: "#F26A1B", ink: "#111827", title: "Idea validation", text: "Turn new ideas into viable concepts with a proven validation framework." },
  { n: "02", color: "#1F44F0", ink: "#FFFFFF", title: "Business strategy", text: "Business model canvas, financial planning and go-to-market strategy." },
  { n: "03", color: "#FFD84D", ink: "#111827", title: "AI as a co-creator", text: "Speed up your design process with AI-powered tools and techniques." },
  { n: "04", color: "#D4F57A", ink: "#111827", title: "Community support", text: "Peer networking, expert mentorship and accountability partners." },
  { n: "05", color: "#111827", ink: "#FFFFFF", title: "Growth acceleration", text: "Marketing automation, sales optimisation and scaling strategies." },
];

const INCLUDED = [
  "Starts 6 March 2027 · final pitch 15 May 2027",
  "Program in English",
  "10 Saturdays · 10–15 participants",
  "Expert consultancy on Saturdays and during open hours",
  "Digital and printed materials",
  "Private community group",
  "Lunch, drinks and snacks during 9 session days",
  "Drinks on pitch day",
];

const QUOTES = [
  { name: "Upiek Riptoningrum", role: "Founder of UXORES", photo: "/images/web/Upiek-Riptoningrum.jpg", initials: "UR", color: "#FFD84D", text: "It is a well thought-out program with a practical approach for aspiring entrepreneurs using AI as an assistant or sparring partner. The experts share their valuable expertise and experience." },
  { name: "Iryna Digtiarova", role: "Public speaking coach", photo: "/images/web/Iryna-Digtiarova.jpg", initials: "ID", color: "#D4F57A", text: "Thanks to the 10 Saturdays program, I gained much more structure and clarity in developing my business idea. The practical tools and models helped me understand how to move forward step by step." },
  { name: "Zoe Prifti", role: "Founder of Mermaid sustainable fashion", photo: "/images/web/Zoe-Prifti.jpg", initials: "ZP", color: "#FDBA74", text: "Business Nest is a gateway into a community of like-minded newbies and very experienced and generous experts. Some contacts are for life and others provide valuable snippets of knowledge that will stay with me for life." },
];

type FaqItem = { q: string; a: ReactNode };
const FAQ: FaqItem[] = [
  {
    q: "Why should I take this programme?",
    a: (
      <>
        <p>Because it takes you from an idea to a validated business in ten structured Saturdays — with experts in the room every session and a small cohort of 10–15 founders working alongside you.</p>
        <p>You don't just learn frameworks; you apply them to your own idea each week: problem discovery, customer discovery, a prototype or MVP, a business model, a financial plan and a pitch deck. On pitch day you present to a jury and get expert feedback.</p>
        <p>You leave with evidence: either a business that's ready for its next step, or a clear, well-founded reason to pivot — before you've risked your savings on it.</p>
      </>
    ),
  },
  {
    q: "Why is it so expensive?",
    a: (
      <>
        <p>We understand {PRICE} (or {EARLY_BIRD_PRICE} with the early-bird price) is a real investment, so it helps to compare it with the alternatives.</p>
        <p>An MBA or executive business programme typically costs tens of thousands of euros and takes one to two years, with much of the time spent on theory and case studies about other companies. Here, every hour goes into your own business — and you get:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li><strong className="text-ink">Focused work with peer feedback on the same day:</strong> you build in the morning and get reactions from your cohort and the experts before you go home, not weeks later.</li>
          <li><strong className="text-ink">A flexible schedule for people with a day job:</strong> sessions run on Saturdays, so you can keep your income while you build.</li>
          <li><strong className="text-ink">The chance to test and validate your idea before investing more:</strong> you talk to real customers and test a prototype first, so you only put serious money and time into an idea that has proven demand.</li>
        </ul>
        <p>On top of that: 15 experts, expert consultancy on Saturdays and during open hours, digital and printed materials, a private community group, and lunch, drinks and snacks during the session days.</p>
      </>
    ),
  },
  {
    q: "How does this compare to an MBA?",
    a: (
      <>
        <p>An MBA is broad: it prepares you for management roles across many kinds of organisations. The 10 Saturdays program is narrow on purpose: it's built for one goal — turning your expertise into your own validated business.</p>
        <p>Instead of studying other companies' cases for one to two years, you spend ten Saturdays working on your own idea, with expert and peer feedback every session, at a fraction of the cost and without stepping away from your job.</p>
      </>
    ),
  },
  {
    q: "Can I combine it with a full-time job?",
    a: <p>Yes — that's who it's designed for. All sessions take place on Saturdays, expert consultancy is also available during open hours, and the private community group keeps materials and discussions accessible during the week.</p>,
  },
  {
    q: "Do I need a finished business idea to apply?",
    a: <p>No. Saturday 1 is about problem discovery and idea generation, so you can start with a rough idea or just a field you know well. If you already have an idea, the first sessions help you test whether it solves a real problem.</p>,
  },
  {
    q: "Can I join only part of the program?",
    a: (
      <>
        <p>Yes. You can join the first part (Saturdays 1–5, 6 March – 10 April 2027) or the second part (Saturdays 6–10, 17 April – 15 May 2027, including the final pitch). Each part costs half the full-program price: {PART_EARLY_BIRD_PRICE} with the early-bird price, or {PART_PRICE} regular, excl. VAT.</p>
        <p>If you want to develop your product or service from scratch, the first part is the most relevant. If you already have a product, the second part is the better fit.</p>
      </>
    ),
  },
  {
    q: "How does the early-bird price work?",
    a: <p>Apply before the early-bird deadline{EARLY_BIRD_UNTIL ? ` (${EARLY_BIRD_UNTIL})` : ""} to join for {EARLY_BIRD_PRICE} excl. VAT instead of the regular {PRICE} excl. VAT. Everything that's included stays the same.</p>,
  },
  {
    q: "What if I'm not sure it's the right moment?",
    a: (
      <p>
        <a href={LINKS.programIntakeCall} className="font-semibold text-ember underline underline-offset-2">Book a call</a> and we'll help you decide. You can also join our{" "}
        <a href={LINKS.joinCommunity} className="font-semibold text-ember underline underline-offset-2">Eindhoven Entrepreneurs community</a> first — explore, connect and get inspired before you commit.
      </p>
    ),
  },
];

function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section">
      <div className="mx-auto box-border flex max-w-[960px] flex-col gap-10 px-5 md:px-10">
        <SectionHead
          center
          eyebrow="FAQ"
          title="Questions about the 10 Saturdays program"
          id="faq-title"
          intro={<>Still deciding? Here are the answers to what people ask us most. Can't find yours? <a href={LINKS.programIntakeCall} className="font-semibold text-ink underline underline-offset-4">Book a call</a>.</>}
        />
        <FaqList items={FAQ} idPrefix="faq" defaultOpen={[0, 1]} />
      </div>
    </section>
  );
}

function Curriculum() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  const allOpen = SESSIONS.every((_, i) => open[i]);
  return (
    <section id="curriculum" aria-labelledby="cur-title" className="section">
      <div className="mx-auto box-border flex max-w-[960px] flex-col gap-8 px-5 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <p className="eyebrow">Curriculum</p>
            <h2 id="cur-title" className="h2">What we'll cover</h2>
            <p className="m-0 text-[17px] text-slate">10 offline Saturday sessions · 4 hours each · starting {START_DATE}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(allOpen ? {} : Object.fromEntries(SESSIONS.map((_, i) => [i, true])))}
            className="chip bg-transparent text-ink hover:bg-ink hover:text-white"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
        <ol className="m-0 flex list-none flex-col gap-3 p-0">
          {SESSIONS.map(([title, text], i) => {
            const isOpen = !!open[i];
            const part = PARTS.find((pt) => pt.first === i);
            const last = i === SESSIONS.length - 1;
            const panelId = `session-${i + 1}`;
            return (
              <li key={title} className="flex flex-col gap-3">
                {part && (
                  <p className={`m-0 flex flex-wrap items-baseline gap-x-3 ${i ? "mt-5" : ""}`}>
                    <span className="font-display text-xl font-bold">{part.n} · {part.title}</span>
                    <span className="text-sm text-stone">{part.when}</span>
                  </p>
                )}
                <div className="overflow-hidden rounded-3xl border border-sand bg-white">
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen({ ...open, [i]: !isOpen })}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex min-h-[72px] w-full cursor-pointer items-center gap-5 border-0 bg-transparent px-4 py-4 text-left text-ink sm:px-6"
                  >
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-extrabold"
                      style={{ background: last ? "#F26A1B" : isOpen ? "#1F44F0" : "#FFF8EF", color: !last && isOpen ? "#FFFFFF" : "#111827" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-1 flex-col gap-0.5">
                      <span className="text-[13px] font-semibold text-stone">Saturday {i + 1}{SESSION_DATES[i] ? ` · ${SESSION_DATES[i]}` : ""}</span>
                      <span className="text-lg font-bold">{title}</span>
                    </span>
                    <Chevron className="shrink-0 transition-transform" style={{ transform: isOpen ? "rotate(180deg)" : "none" }} />
                  </button>
                </h3>
                <div id={panelId} hidden={!isOpen} className="px-6 pb-6 text-base leading-relaxed text-slate sm:pl-[88px]">{text}</div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export default function Program() {
  const programExperts = EXPERTS.filter((x) => x.onProgram);
  return (
    <Page active="program" title="10 Saturdays program — Business Nest" description="A practical 10-Saturday program for tech professionals and specialists in transition: turn your expertise into a validated business with mentorship and community.">
      {/* Hero */}
      <section aria-labelledby="p-title" className="wrap-page grid items-center gap-12 pb-[72px] pt-10 md:pt-14 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <div className="flex flex-col items-start gap-6">
          <Pill dot="#F26A1B">Flagship program · Stage 2: Hatch</Pill>
          <h1 id="p-title" className="h1">10 <span className="accent">Saturdays</span> program</h1>
          <p className="m-0 font-display text-[22px] font-bold leading-tight md:text-[26px]">Turn your expertise into your next career move.</p>
          <p className="m-0 max-w-[540px] text-lg leading-relaxed text-slate">A practical program for tech professionals and specialists in transition — whether after a layoff or alongside your current job. Transform your domain knowledge into a validated business, with structure, mentorship and a community behind you.</p>
          <dl className="m-0 grid w-full max-w-[500px] grid-cols-2 gap-x-8 gap-y-3">
            {[[START_DATE, "next programme starts"], ["10 Saturdays", "until the final pitch on 15 May"], ["10–15 founders", "small cohort"], APPLICATIONS_CLOSE ? [APPLICATIONS_CLOSE, "applications close"] : [EARLY_BIRD_PRICE, "early bird price, excl. VAT"]].map(([v, l]) => (
              <div key={l} className="flex flex-col-reverse">
                <dt className="text-sm text-stone">{l}</dt>
                <dd className="m-0 text-lg font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#apply" className="btn-primary">Apply for the program <ArrowRight /></a>
            <a href="#curriculum" className="btn-text">See the 10 sessions</a>
          </div>
        </div>
        <EggPhoto>
          <img src="/lovable-uploads/co-create_with_experts.png" alt="An expert working with founders at a 10 Saturdays session" className="block h-full w-full object-cover" style={{ objectPosition: "40% 50%" }} />
        </EggPhoto>
      </section>

      {/* Outcomes */}
      <section aria-labelledby="get-title" className="relative overflow-hidden bg-white py-[72px] md:py-24">
        <CornerRings />
        <div className="wrap flex flex-col gap-12">
          <SectionHead center eyebrow="Outcomes" title="What you'll get out of it" id="get-title" />
          <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {PILLARS.map((p) => (
              <li key={p.n} className="flex flex-col gap-3 rounded-card bg-cream px-6 py-7">
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full font-display text-[15px] font-extrabold" style={{ background: p.color, color: p.ink }}>{p.n}</span>
                <h3 className="mt-1 text-lg font-bold">{p.title}</h3>
                <p className="m-0 text-[15px] leading-[1.55] text-stone">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Curriculum />

      {/* Full programme or one part */}
      <section aria-labelledby="parts-title" className="bg-white py-[72px] md:py-24">
        <div className="wrap flex flex-col gap-10">
          <SectionHead
            center
            eyebrow="Your choice"
            title="Join the full program — or one part"
            id="parts-title"
            intro={<>You can join all ten Saturdays, or just the first or second half. Each part is five Saturdays for half the price: <strong className="text-ink">{PART_EARLY_BIRD_PRICE}</strong> with the early-bird price ({PART_PRICE} regular), excl. VAT.</>}
          />
          <ul className="m-0 grid list-none gap-5 p-0 lg:grid-cols-3">
            <li className="flex flex-col gap-4 rounded-[32px] bg-sky p-7 text-white sm:p-8">
              <span className="badge bg-lime">Full program</span>
              <h3 className="font-display text-[26px] font-bold leading-tight">All 10 Saturdays</h3>
              <p className="m-0 text-sm font-semibold text-yolk">6 March – 15 May 2027</p>
              <p className="m-0 flex-1 text-base leading-relaxed text-sky-tint">The complete journey from idea to investor-ready pitch, with the same cohort and experts all the way.</p>
              <p className="m-0 font-display text-2xl font-extrabold">{EARLY_BIRD_PRICE} <span className="font-sans text-sm font-medium text-sky-tint">early bird · {PRICE} regular, excl. VAT</span></p>
            </li>
            {PARTS.map((pt) => (
              <li key={pt.n} className="flex flex-col gap-4 rounded-[32px] border border-sand bg-cream p-7 sm:p-8">
                <span className="badge bg-yolk">{pt.n}</span>
                <h3 className="font-display text-[26px] font-bold leading-tight">{pt.title}</h3>
                <p className="m-0 text-sm font-semibold text-ember">{pt.when}</p>
                <p className="m-0 flex-1 text-base leading-relaxed text-slate">{pt.text}</p>
                <p className="m-0 font-display text-2xl font-extrabold">{PART_EARLY_BIRD_PRICE} <span className="font-sans text-sm font-medium text-stone">early bird · {PART_PRICE} regular, excl. VAT</span></p>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <a href="#apply" className="btn-primary">Apply for the program <ArrowRight /></a>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section aria-labelledby="kpi-title" className="relative overflow-hidden bg-sky py-[72px] text-white md:py-[88px]">
        <EllipseRings
          rings={[{ rx: 130, ry: 100, stroke: "#FFD84D", w: 3, rot: -40 }, { rx: 118, ry: 108, stroke: "#FFFFFF", w: 1.5, rot: -25, op: 0.6 }]}
          style={{ right: -70, top: -80, width: 300, height: 300 }}
        />
        <div className="wrap relative flex flex-col gap-10">
          <SectionHead light eyebrow="The program in numbers" title="One cohort, ten Saturdays" id="kpi-title" />
          <dl className="m-0 grid gap-5 md:grid-cols-3">
            {[["15", "experts sharing their knowledge", "#F26A1B"], ["58", "hours of hands-on work", "#D4F57A"], ["119", "cups of coffee", "#FFFFFF"]].map(([v, l, egg]) => (
              <div key={l} className="flex flex-col-reverse gap-2 rounded-card border border-white/25 bg-white/[.08] p-7">
                <dt className="text-[17px] leading-snug text-sky-tint">{l}</dt>
                <dd className="m-0 flex items-center gap-3.5 font-display text-[60px] font-extrabold leading-none tracking-tightest text-yolk md:text-[72px]">
                  {v}
                  <span aria-hidden="true" className="egg block h-7 w-[22px]" style={{ background: egg, transform: "rotate(40deg)" }} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Apply */}
      <section id="apply" aria-labelledby="apply-title" className="bg-white py-[72px] md:py-24">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <p className="eyebrow">Is it for you?</p>
            <h2 id="apply-title" className="h2">Built for professionals ready to take flight</h2>
            <p className="m-0 text-[17px] leading-[1.7] text-slate">Tailored for tech professionals and specialists in transition. You get free access to the community, a private group with all materials, ten themed Saturdays with hands-on exercises, expert Q&amp;A hours and peer reviews in each session.</p>
            <p className="m-0 text-[17px] leading-[1.7] text-slate">Not sure yet? Book a call and we'll help you decide whether this is the right moment.</p>
          </div>
          <div className="relative flex flex-col gap-6 rounded-[36px] border-2 border-ink bg-cream p-7 sm:p-10">
            <span className="absolute -top-4 left-7 rounded-full bg-orange px-3.5 py-[7px] text-[13px] font-bold uppercase tracking-badge text-ink sm:left-10">Flight Path</span>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[15px] text-stone">Early bird price</span>
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <s className="font-display text-[26px] font-extrabold text-stone" aria-label={`Regular price ${PRICE}`}>{PRICE}</s>
                  <span className="font-display text-[44px] font-extrabold leading-none sm:text-[52px]">{EARLY_BIRD_PRICE}</span>
                  <span className="text-sm font-medium text-stone">excl. VAT</span>
                </span>
              </div>
            </div>
            {EARLY_BIRD_UNTIL && <span className="badge -mt-3 bg-yolk px-3 py-1.5">Early bird until {EARLY_BIRD_UNTIL}</span>}
            <ul className="m-0 flex list-none flex-col gap-3 p-0 text-base">
              {INCLUDED.map((inc) => (
                <li key={inc} className="flex items-start gap-3"><Check className="mt-0.5 shrink-0 text-ember" />{inc}</li>
              ))}
            </ul>
            <p className="m-0 rounded-2xl bg-white px-4 py-3 text-[15px] leading-snug text-slate">
              Prefer to join one part? Five Saturdays for <strong className="text-ink">{PART_EARLY_BIRD_PRICE}</strong> early bird ({PART_PRICE} regular). <a href="#parts-title" className="font-semibold text-ember underline underline-offset-2">Compare the options</a>
            </p>
            <div className="flex flex-col gap-2.5">
              <a href={LINKS.programApplication} className="btn-primary">Open the application form</a>
              <a href={LINKS.programIntakeCall} className="btn-outline">Book a call to know more</a>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section aria-labelledby="t-title" className="relative overflow-hidden py-[72px] md:py-24">
        <CornerRings position="bottom-left" />
        <div className="wrap flex flex-col gap-12">
          <SectionHead center eyebrow="Testimonials" title="What participants say" id="t-title" />
          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {QUOTES.map((q) => <Testimonial key={q.name} {...q} />)}
          </ul>
        </div>
      </section>

      {/* Experts */}
      <section aria-labelledby="e-title" className="bg-white py-[72px] md:py-24">
        <div className="wrap flex flex-col gap-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Your experts" title="Meet the experts who teach each session" id="e-title" />
            <Link to="/experts" className="link-arrow text-base">Meet all our experts <ArrowRight /></Link>
          </div>
          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {programExperts.map((x) => <ExpertCard key={x.name} x={x} />)}
          </ul>
        </div>
      </section>

      <Faq />

      <CtaBand
        variant="ink"
        titleId="think-title"
        title="Need time to think?"
        text="Join our Eindhoven Entrepreneurs community — explore, connect and get inspired before you commit."
        action={<a href={LINKS.joinCommunity} className="btn-primary">Join the community</a>}
      />
    </Page>
  );
}
