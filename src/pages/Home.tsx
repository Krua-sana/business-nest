import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "@/components/Layout";
import { CornerRings, Egg, EggPhoto, PosterFrame, RingPortrait } from "@/components/Decor";
import { ArrowRight, EggIcon, NestIcon, WingIcon } from "@/components/Icons";
import { SectionHead, Pill, WorkshopCard } from "@/components/ui";
import { MENTORS } from "@/data/experts";
import { LINKS } from "@/data/site";
import { WORKSHOPS } from "@/data/workshops";

const SLIDES = [
  { img: "/images/hero/hero-3.jpg", alt: "Founders working together on laptops during a Business Nest workshop", pos: "50% 40%" },
  { img: "/images/web/gallery/g2.jpg", alt: "Three founders discussing an idea at a table with a flip chart", pos: "50% 60%" },
  { img: "/images/hero/hero-4.jpg", alt: "A facilitator presenting the Ideate step to the group", pos: "40% 50%" },
  { img: "/images/hero/hero-1.jpg", alt: "Group photo of the Business Nest community after a workshop", pos: "50% 50%" },
  { img: "/images/web/qa-talk.jpg", alt: "Speaker presenting the Quality Assurance for AI workshop at Business Nest", pos: "55% 40%" },
];

const PILLARS = [
  { n: "01", title: "Idea validation", text: "Turn new ideas into viable concepts through a proven validation framework." },
  { n: "02", title: "Business strategy", text: "Business model canvas, financial planning and go-to-market strategy." },
  { n: "03", title: "AI as a co-creator", text: "Prompt like a pro, minimise costs and get working prototypes faster." },
  { n: "04", title: "Community support", text: "Peer networking, expert mentorship and accountability partners." },
  { n: "05", title: "Growth acceleration", text: "Marketing automation, sales optimisation and scaling strategies." },
];

const VALUES = [
  { color: "#F26A1B", title: "Community first", text: "We believe in the power of collaboration and supporting each other’s journey to success." },
  { color: "#1F44F0", title: "Goal-oriented", text: "Every program and resource is designed with your business success as the primary objective." },
  { color: "#FFD84D", title: "Inclusive growth", text: "We welcome entrepreneurs from all backgrounds and experience levels to learn and grow together." },
  { color: "#D4F57A", title: "Excellence", text: "We maintain the highest standards in our programs, mentorship and community support." },
];

function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
  }, []);
  useEffect(() => {
    if (paused || hover) return;
    const t = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [paused, hover]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Life inside the nest"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative w-full lg:-mr-6"
    >
      <EggPhoto className="max-w-[720px]">
        {SLIDES.map((s, n) => (
          <img
            key={s.img}
            src={s.img}
            alt={n === i ? s.alt : ""}
            aria-hidden={n === i ? undefined : true}
            loading={n === 0 ? "eager" : "lazy"}
            className="slide absolute inset-0 block h-full w-full object-cover"
            style={{ objectPosition: s.pos, opacity: n === i ? 1 : 0 }}
          />
        ))}
      </EggPhoto>
      <button
        type="button"
        className="vh-focus absolute bottom-[2%] left-1/2 z-[3] min-h-[44px] -translate-x-1/2 cursor-pointer rounded-full border-0 bg-ink px-5 text-[15px] font-semibold text-white"
        onClick={() => setPaused((p) => !p)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
      >
        {paused ? "Play slideshow" : "Pause slideshow"}
      </button>
      <p className="sr-only" aria-live={paused ? "polite" : "off"}>Slide {i + 1} of {SLIDES.length}</p>
    </div>
  );
}

export default function Home() {
  return (
    <Page active="home" title="Business Nest — A safe nest to hatch your business idea">
      {/* Hero */}
      <section aria-labelledby="hero-title" className="wrap-page grid items-center gap-12 pb-[72px] pt-10 md:pt-14 lg:grid-cols-2 lg:gap-14 lg:pb-[104px]">
        <div className="flex flex-col items-start gap-7">
          <Pill dot="#1F44F0">Eindhoven incubator for first-time founders</Pill>
          <h1 id="hero-title" className="h1 lg:!text-[76px]">
            A safe nest to <span className="accent">hatch</span> your business idea.
          </h1>
          <p className="m-0 max-w-[520px] text-xl leading-[1.55] text-slate">
            Where solo entrepreneurs and first-time founders come to hatch their business ideas into thriving ventures.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#journey" className="btn-primary">Start your journey <ArrowRight /></a>
            <Link to="/program" className="btn-text">Explore 10 Saturdays</Link>
          </div>
          <dl className="m-0 grid w-full max-w-[560px] grid-cols-2 gap-x-6 gap-y-5 border-t border-sand-dark pt-5 sm:grid-cols-3">
            {[["500+", "entrepreneurs in the community"], ["4", "businesses launched"], ["2024", "nesting in Eindhoven since"]].map(([v, l]) => (
              <div key={l} className="flex flex-col-reverse gap-0.5">
                <dt className="text-sm text-stone">{l}</dt>
                <dd className="m-0 font-display text-[30px] font-extrabold">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <HeroCarousel />
      </section>

      {/* Journey */}
      <section id="journey" aria-labelledby="journey-title" className="relative overflow-hidden bg-white py-[72px] lg:py-[104px]">
        <CornerRings />
        <div className="wrap flex flex-col gap-14">
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="eyebrow">Choose your journey</p>
            <h2 id="journey-title" className="h2 lg:!text-[60px] lg:!leading-none">Gather. Hatch. <span className="text-sky">Fly.</span></h2>
            <p className="m-0 max-w-[600px] text-lg leading-[1.55] text-slate">Whether you are just starting out or ready to scale, there is a place for you in the nest.</p>
          </div>
          <ol className="m-0 grid list-none items-stretch gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            <li className="flex flex-col gap-5 rounded-[32px] border border-sand bg-cream p-8">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-yolk"><NestIcon /></div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold uppercase tracking-eyebrow text-stone">Stage 1 · Gather</span>
                <h3 className="font-display text-[28px] font-bold leading-[1.1]">Join the community</h3>
              </div>
              <ul className="m-0 flex flex-1 flex-col gap-2.5 pl-5 text-base text-slate">
                <li>Eindhoven Entrepreneurs network</li>
                <li>Support of like-minded people</li>
                <li>Events calendar and free workshops</li>
                <li>Regular networking</li>
              </ul>
              <a href={LINKS.joinCommunity} className="btn-outline min-h-[48px] text-[15px]">Join for free</a>
            </li>
            <li className="relative flex flex-col gap-5 rounded-[32px] bg-sky p-8 text-white">
              <span className="badge absolute right-6 top-6 bg-lime px-3 py-1.5">Flagship</span>
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-orange"><EggIcon /></div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold uppercase tracking-eyebrow text-yolk">Stage 2 · Hatch</span>
                <h3 className="font-display text-[28px] font-bold leading-[1.1]">10 Saturdays program</h3>
              </div>
              <ul className="m-0 flex flex-1 flex-col gap-2.5 pl-5 text-base text-sky-tint">
                <li>Nest your idea into a business</li>
                <li>Support of experts every Saturday</li>
                <li>Pitch for funding on demo day</li>
                <li>10–15 founders per cohort</li>
              </ul>
              <Link to="/program" className="btn-primary min-h-[48px] text-[15px]">Explore the program</Link>
            </li>
            <li className="flex flex-col gap-5 rounded-[32px] border border-sand bg-cream p-8">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-lime"><WingIcon /></div>
              <div className="flex flex-col gap-1.5">
                <span className="text-[13px] font-semibold uppercase tracking-eyebrow text-stone">Stage 3 · Fly</span>
                <h3 className="font-display text-[28px] font-bold leading-[1.1]">Under the wing of an expert</h3>
              </div>
              <ul className="m-0 flex flex-1 flex-col gap-2.5 pl-5 text-base text-slate">
                <li>Personal mentorship</li>
                <li>Non-judgemental feedback</li>
                <li>Mental support</li>
                <li>Individual evaluation</li>
              </ul>
              <Link to="/experts" className="btn-outline min-h-[48px] text-[15px]">Meet the experts</Link>
            </li>
          </ol>
        </div>
      </section>

      {/* Program teaser */}
      <section aria-labelledby="program-title" className="py-[72px] lg:py-[104px]">
        <div className="wrap grid items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/hero/hero-3.jpg" alt="Founders working together on laptops during a session" loading="lazy" className="col-span-2 block aspect-video w-full rounded-[32px] object-cover" />
            <img src="/images/hero/hero-2.jpg" alt="A facilitator presenting to the cohort" loading="lazy" className="block aspect-square w-full rounded-[32px] object-cover" />
            <img src="/images/hero/hero-4.jpg" alt="Participants presenting on screen" loading="lazy" className="block aspect-square w-full rounded-[32px] object-cover" />
          </div>
          <div className="flex flex-col items-start gap-6">
            <p className="eyebrow">Flagship program</p>
            <h2 id="program-title" className="h2">10 Saturdays from idea to pitch</h2>
            <p className="m-0 text-lg leading-relaxed text-slate">Everything you need to build a business, designed for solo entrepreneurs and first-time founders.</p>
            <ul className="m-0 flex w-full list-none flex-col gap-4 p-0">
              {PILLARS.map((p) => (
                <li key={p.n} className="flex items-start gap-4">
                  <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sand bg-white font-display text-[15px] font-extrabold text-ember">{p.n}</span>
                  <span className="flex flex-col gap-0.5">
                    <strong className="text-[17px]">{p.title}</strong>
                    <span className="text-[15px] leading-normal text-stone">{p.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <Link to="/program" className="btn-dark">Read about the program <ArrowRight /></Link>
          </div>
        </div>
      </section>

      {/* Workshops */}
      <section aria-labelledby="ws-title" className="bg-white py-[72px] lg:py-[104px]">
        <div className="wrap flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Hands-on workshops" title="Learn by doing" id="ws-title" />
            <Link to="/workshops" className="link-arrow text-base">See all workshops <ArrowRight /></Link>
          </div>
          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {WORKSHOPS.slice(0, 3).map((w) => <WorkshopCard key={w.slug} w={w} />)}
          </ul>
        </div>
      </section>

      {/* Mentors */}
      <section aria-labelledby="mentors-title" className="relative overflow-hidden py-[72px] lg:py-[104px]">
        <CornerRings position="bottom-left" />
        <div className="wrap flex flex-col gap-12">
          <SectionHead
            center
            eyebrow="Under the wing"
            title="Meet our expert mentors"
            id="mentors-title"
            intro="Learn from seasoned entrepreneurs and industry experts who have built thriving businesses from the ground up."
          />
          <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {MENTORS.map((m) => (
              <li key={m.name} className="flex flex-col items-center gap-3 rounded-card border border-sand bg-white p-7 text-center">
                <RingPortrait src={m.photo} initials={m.initials} />
                <h3 className="mt-2 text-lg font-bold">{m.name}</h3>
                <p className="m-0 text-sm font-semibold text-ember">{m.role}</p>
                <p className="m-0 text-sm leading-normal text-stone">{m.bio}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/experts" className="btn-dark">Meet all experts</Link>
            <Link to="/experts#become-expert" className="btn-outline">Become an expert</Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" aria-labelledby="about-title" className="bg-white pt-[72px] lg:pt-[104px]">
        <div className="wrap flex flex-col gap-[72px]">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-[72px]">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">About Business Nest</p>
              <h2 id="about-title" className="h2">More than a program — a community that nests ideas</h2>
              <p className="m-0 text-[17px] leading-[1.7] text-slate">Business Nest was born from a simple observation: too many great ideas never see the light of day because their creators lack the guidance, resources and community support needed to bring them to life.</p>
              <p className="m-0 text-[17px] leading-[1.7] text-slate">Our founders, having experienced the lonely journey of early entrepreneurship, created the support system they wished they'd had. We believe that with the right environment, mentorship and community, anyone can transform their business idea into a thriving venture. That's what we call "nesting your success".</p>
            </div>
            <PosterFrame
              className="max-w-[640px]"
              src="/lovable-uploads/Nest_team-1.JPG"
              alt="The Business Nest team: four founders smiling in front of a hand-drawn mural"
              aspect="20 / 9"
              badge={
                <span className="absolute -bottom-6 right-4 z-[3] flex flex-col rounded-[20px] bg-orange px-[18px] py-3 font-display text-xl font-bold text-ink">
                  Est. 2024
                  <span className="font-sans text-[13px] font-medium">Building dreams</span>
                </span>
              }
            />
          </div>
          <div className="flex flex-col gap-8">
            <h3 className="text-center font-display text-[32px] font-bold">Our core values</h3>
            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {VALUES.map((v) => (
                <li key={v.title} className="flex flex-col gap-2.5 rounded-card bg-cream p-7">
                  <Egg color={v.color} w={28} h={35} />
                  <h4 className="mt-1.5 text-lg font-bold">{v.title}</h4>
                  <p className="m-0 text-[15px] leading-[1.55] text-stone">{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-[72px] bg-sky text-white lg:mt-24">
          <div className="wrap flex flex-col gap-8 py-16">
            <h3 className="font-display text-[28px] font-bold">Our impact so far</h3>
            <dl className="m-0 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {[["2", "years of impact"], ["500+", "entrepreneurs in the community"], ["4", "businesses launched"], ["95%", "success rate"]].map(([v, l]) => (
                <div key={l} className="flex flex-col-reverse gap-1">
                  <dt className="text-base text-sky-tint">{l}</dt>
                  <dd className="m-0 font-display text-[44px] font-extrabold text-yolk md:text-[56px]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </Page>
  );
}
