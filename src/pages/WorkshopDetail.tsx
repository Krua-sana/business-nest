import { Link, Navigate, useParams } from "react-router-dom";
import { Page } from "@/components/Layout";
import { CornerRings, Egg, EggPhoto, EllipseRings, PosterFrame, RingPortrait } from "@/components/Decor";
import { ArrowDown, ArrowRight, Check } from "@/components/Icons";
import { Agenda, Breadcrumb, FaqList, LinkedInLink, SectionHead, StatusBadge, TeamRequestForm, Testimonial, WaitlistForm } from "@/components/ui";
import { getWorkshop, STATUS } from "@/data/workshops";

const STEP_COLORS = [
  { bg: "#F26A1B", ink: "#111827" },
  { bg: "#FFD84D", ink: "#111827" },
  { bg: "#1F44F0", ink: "#FFFFFF" },
  { bg: "#D4F57A", ink: "#111827" },
];
const EGG_COLORS = ["#F26A1B", "#1F44F0", "#FFD84D", "#D4F57A"];
const QUOTE_COLORS = ["#FFD84D", "#D4F57A", "#FDBA74"];

export default function WorkshopDetail() {
  const { slug } = useParams();
  const w = getWorkshop(slug);
  if (!w) return <Navigate to="/workshops" replace />;
  if (w.slug !== slug) return <Navigate to={`/workshops/${w.slug}`} replace />;
  const [a, b, c] = w.titleParts;

  // Alternate white / cream backgrounds for the sections that are present.
  let n = 0;
  const bg = () => (n++ % 2 === 0 ? "bg-white" : "");

  return (
    <Page active="workshops" title={`${w.title} — Business Nest workshop`} description={w.intro}>
      {/* Hero — tinted background sets detail pages apart from the /workshops overview */}
      <div className="bg-hatch">
      <Breadcrumb current={w.title} />
      <section aria-labelledby="w-title" className="wrap-page grid items-center gap-16 pb-[72px] pt-10 lg:grid-cols-2 lg:pb-24">
        <div className="flex flex-col items-start gap-6">
          <div className="flex flex-wrap gap-2">
            <StatusBadge status={w.status} label={w.statusLabel} />
            <span className="badge border border-sand bg-white">{w.format}</span>
          </div>
          <h1 id="w-title" className="h1 lg:!text-[64px] lg:!leading-none">{a}<span className="accent">{b}</span>{c}</h1>
          <p className="m-0 max-w-[540px] text-lg leading-relaxed text-slate">{w.intro}</p>
          <dl className="m-0 grid w-full max-w-[520px] grid-cols-2 gap-x-8 gap-y-4">
            {(w.facts ? w.facts.map((f) => [f.label, f.value]) : [["Date", w.date], ["Time", w.time], ["Location", w.location], [w.fact4.label, w.fact4.value]]).map(([l, v]) => (
              <div key={l} className="flex flex-col">
                <dt className="text-[13px] text-stone">{l}</dt>
                <dd className="m-0 text-[17px] font-bold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap items-center gap-3">
            <a href={w.ctaHref ?? "#seat"} className="btn-primary">{w.cta} <ArrowDown /></a>
            {w.cta2 && <a href={w.cta2.href} className="btn-outline">{w.cta2.label}</a>}
          </div>
        </div>
        {w.hero.kind === "poster" ? (
          <PosterFrame src={w.hero.img} alt={w.hero.alt} video={w.hero.video} />
        ) : (
          <EggPhoto>
            <img src={w.hero.img} alt={w.hero.alt} className="block h-full w-full object-cover" style={{ objectPosition: w.hero.pos }} />
          </EggPhoto>
        )}
      </section>
      </div>

      {/* Two ways to take this workshop */}
      {w.ways && (
        <section aria-labelledby="ways-title" className={`py-[72px] md:py-24 ${bg()}`}>
          <div className="wrap flex flex-col gap-10">
            <SectionHead center small eyebrow="For you or your team" title="Two ways to take this workshop" id="ways-title" />
            <ul className="m-0 grid list-none gap-6 p-0 lg:grid-cols-2">
              {[
                { ...w.ways.individual, href: "#join", dark: false },
                { ...w.ways.company, href: "#book", dark: true },
              ].map((c) => (
                <li key={c.title} className={`flex flex-col gap-5 rounded-[32px] p-7 sm:p-9 ${c.dark ? "bg-sky text-white" : "border border-sand bg-cream"}`}>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-display text-[28px] font-bold leading-[1.1]">{c.title}</h3>
                    <p className={`m-0 text-lg font-semibold ${c.dark ? "text-yolk" : "text-ember"}`}>{c.price}</p>
                  </div>
                  <ul className={`m-0 flex flex-1 list-none flex-col gap-3 p-0 text-base ${c.dark ? "text-sky-tint" : "text-slate"}`}>
                    {c.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3"><Check className={`mt-0.5 shrink-0 ${c.dark ? "text-yolk" : "text-ember"}`} />{pt}</li>
                    ))}
                  </ul>
                  <a href={c.href} className={`${c.dark ? "btn-yolk" : "btn-outline"} self-start`}>{c.cta} <ArrowDown /></a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* About */}
      {w.about && (
        <section aria-labelledby="about-title" className={`py-[72px] md:py-24 ${bg()}`}>
          <div className="wrap grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">{w.about.eyebrow}</p>
              <h2 id="about-title" className="h2-sm">{w.about.title}</h2>
              {w.about.paragraphs.map((p) => <p key={p} className="m-0 text-[17px] leading-[1.7] text-slate">{p}</p>)}
            </div>
            <div className="flex flex-col gap-5 rounded-[32px] bg-cream p-7 sm:p-9">
              <h3 className="font-display text-[26px] font-bold">{w.about.listTitle}</h3>
              <ul className="m-0 flex list-none flex-col gap-3.5 p-0 text-base leading-normal">
                {w.about.list.map((li) => <li key={li} className="flex gap-3"><Check size={22} className="shrink-0 text-ember" />{li}</li>)}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Modules */}
      {w.modules && (
        <section aria-labelledby="mod-title" className={`relative overflow-hidden py-[72px] md:py-24 ${bg()}`}>
          <CornerRings />
          <div className="wrap flex flex-col gap-10">
            <SectionHead center small eyebrow={w.modules.eyebrow} title={w.modules.title} id="mod-title" intro={w.modules.intro} />
            <ol className="m-0 grid list-none gap-5 p-0 md:grid-cols-2">
              {w.modules.items.map((m, i) => (
                <li key={m.title} className="flex flex-col gap-4 rounded-card border border-sand bg-cream p-7 sm:p-8">
                  <div className="flex items-start gap-4">
                    <span aria-hidden="true" className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-base font-extrabold" style={{ background: STEP_COLORS[i % 4].bg, color: STEP_COLORS[i % 4].ink }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex flex-col gap-1">
                      <p className="m-0 text-[13px] font-semibold uppercase tracking-eyebrow text-stone">Module {i + 1}</p>
                      <h3 className="font-display text-[22px] font-bold leading-tight">{m.title}</h3>
                      <p className="m-0 text-[15px] text-stone">{m.text}</p>
                    </div>
                  </div>
                  <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base text-slate">
                    {m.topics.map((t) => <li key={t} className="flex items-start gap-3"><Check className="mt-0.5 shrink-0 text-ember" />{t}</li>)}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Who it's for */}
      {w.whoFor && (
        <section aria-labelledby="who-title" className={`relative overflow-hidden py-[72px] md:py-24 ${bg()}`}>
          <CornerRings />
          <div className="wrap grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">{w.whoFor.eyebrow}</p>
              <h2 id="who-title" className="h2-sm">{w.whoFor.title}</h2>
              {w.whoFor.paragraphs.map((p) => <p key={p} className="m-0 text-[17px] leading-[1.7] text-slate">{p}</p>)}
              <div className="mt-2 flex items-center gap-4 rounded-3xl bg-cream p-6">
                {w.whoFor.speaker.photo ? (
                  <img src={w.whoFor.speaker.photo} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
                ) : (
                  <span aria-hidden="true" className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-sky font-display text-[22px] font-extrabold text-white">{w.whoFor.speaker.initials}</span>
                )}
                <div className="flex flex-col gap-1">
                  <p className="m-0 text-[13px] font-semibold uppercase tracking-eyebrow text-ember">Speaker</p>
                  <h3 className="text-[19px] font-bold">{w.whoFor.speaker.name}</h3>
                  {w.whoFor.speaker.bio && <p className="m-0 text-[15px] text-stone">{w.whoFor.speaker.bio}</p>}
                  {w.whoFor.speaker.linkedin && <LinkedInLink href={w.whoFor.speaker.linkedin} name={w.whoFor.speaker.name} small />}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5 rounded-[32px] bg-cream p-7 sm:p-9">
              <h3 className="font-display text-[26px] font-bold">{w.whoFor.learnTitle}</h3>
              <ol className="m-0 flex list-none flex-col gap-4 p-0">
                {w.whoFor.learn.map((t, i) => (
                  <li key={t} className="flex items-start gap-3.5">
                    <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sand bg-white font-display text-sm font-extrabold text-ember">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pt-1.5 text-base leading-[1.55]">{t}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* Outcomes */}
      {w.outcomes && (
        <section aria-labelledby="out-title" className={`relative overflow-hidden py-[72px] md:py-24 ${bg()}`}>
          <CornerRings />
          <div className="wrap flex flex-col gap-10">
            <h2 id="out-title" className="h2-sm text-center">{w.outcomes.title}</h2>
            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {w.outcomes.items.map((o, i) => (
                <li key={o.title} className="flex flex-col gap-2.5 rounded-card border border-sand bg-white p-7">
                  <Egg color={EGG_COLORS[i % 4]} w={28} h={35} />
                  <h3 className="mt-1.5 text-lg font-bold leading-snug">{o.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.55] text-stone">{o.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Learn steps */}
      {w.steps && (
        <section aria-labelledby="learn-title" className={`relative overflow-hidden py-[72px] md:py-24 ${bg()}`}>
          <CornerRings />
          <div className="wrap flex flex-col gap-10">
            <SectionHead center small eyebrow={w.steps.eyebrow} title={w.steps.title} id="learn-title" />
            <ol className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
              {w.steps.items.map((s, i) => (
                <li key={s.title} className="flex flex-col gap-2.5 rounded-card bg-cream p-7">
                  <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full font-display text-base font-extrabold" style={{ background: STEP_COLORS[i % 4].bg, color: STEP_COLORS[i % 4].ink }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-1.5 text-xl font-bold">{s.title}</h3>
                  <p className="m-0 text-[15px] leading-[1.55] text-stone">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Agenda + expert / moderators */}
      {w.agenda && (
        <section aria-labelledby="ag-title" className={`py-[72px] md:py-24 ${bg()}`}>
          <div className="wrap grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-2">
                <h2 id="ag-title" className="h2-sm">{w.agendaTitle ?? "Agenda"}</h2>
                {w.agendaTitle && <p className="m-0 text-[15px] text-stone">Times are relative to the start of the session.</p>}
              </div>
              <Agenda items={w.agenda} />
            </div>
            {w.expert && (
              <div className="flex flex-col overflow-hidden rounded-[32px] bg-cream">
                <img src={w.expert.photo} alt={`Portrait of ${w.expert.name}`} loading="lazy" className="block aspect-[4/3] w-full object-cover" style={{ objectPosition: w.expert.photoPos ?? "50% 30%" }} />
                <div className="flex flex-col gap-3 p-7 sm:p-8">
                  <p className="m-0 text-[13px] font-semibold uppercase tracking-eyebrow text-ember">{w.expert.eyebrow}</p>
                  <h3 className="font-display text-[28px] font-bold">{w.expert.name}</h3>
                  <p className="m-0 text-[15px] font-semibold text-slate">{w.expert.headline}</p>
                  <p className="m-0 text-base leading-[1.65] text-slate">{w.expert.bio}</p>
                  {w.expert.linkedin && <LinkedInLink href={w.expert.linkedin} name={w.expert.name} />}
                </div>
              </div>
            )}
            {w.moderators && (
              <div className="flex flex-col gap-5">
                <h2 className="h2-sm">Moderators</h2>
                <ul className="m-0 flex list-none flex-col gap-4 p-0">
                  {w.moderators.map((m) => (
                    <li key={m.name} className="flex items-center gap-5 rounded-3xl border border-sand bg-white p-5">
                      <RingPortrait src={m.photo} initials={m.initials ?? ""} size={88} double={false} />
                      <div className="flex min-w-0 flex-col gap-1">
                        <h3 className="text-lg font-bold">{m.name}</h3>
                        <p className="m-0 text-sm leading-normal text-stone">{m.bio}</p>
                        {m.linkedin && <LinkedInLink href={m.linkedin} name={m.name} small />}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Testimonials */}
      {w.testimonials && (
        <section aria-labelledby="t-title" className={`py-[72px] md:py-24 ${bg()}`}>
          <div className="wrap flex flex-col gap-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <h2 id="t-title" className="h2-sm">What participants said</h2>
              {w.pastNote && <p className="m-0 text-[15px] text-stone">{w.pastNote}</p>}
            </div>
            <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
              {w.testimonials.map((q, i) => (
                <Testimonial key={q.name} {...q} color={QUOTE_COLORS[i % 3]} bg="#FFF8EF" bordered={false} big />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Gallery */}
      {w.gallery && (
        <section aria-labelledby="g-title" className="pt-[72px] md:pt-24">
          <div className="wrap flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h2 id="g-title" className="h2-sm">Gallery</h2>
              {w.pastNote && <p className="m-0 text-[15px] text-stone">{w.pastNote}</p>}
            </div>
            <ul className="m-0 grid list-none grid-cols-2 gap-4 p-0 lg:grid-cols-4">
              {w.gallery.map((g) => (
                <li key={g.img}><img src={g.img} alt={g.alt} loading="lazy" className="block aspect-[3/2] w-full rounded-3xl object-cover" /></li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* FAQ */}
      {w.faq && (
        <section aria-labelledby="faq-title" className="py-[72px] md:py-24">
          <div className="mx-auto box-border flex max-w-[960px] flex-col gap-10 px-5 md:px-10">
            <SectionHead center small eyebrow="FAQ" title="Questions about this workshop" id="faq-title" />
            <FaqList idPrefix={`${w.slug}-faq`} items={w.faq.map((f) => ({ q: f.q, a: f.a.map((t) => <p key={t}>{t}</p>) }))} />
          </div>
        </section>
      )}

      {/* Booking: team request + individual sign-up */}
      {w.booking && (
        <section aria-label="Book or join this workshop" className="px-5 py-[72px] md:px-10 md:py-24">
          <div className="mx-auto grid max-w-content items-start gap-6 lg:grid-cols-[3fr_2fr]">
            <div id="book" className="relative flex flex-col gap-6 overflow-hidden rounded-panel bg-ink p-7 text-white sm:p-12">
              <EllipseRings rings={[{ rx: 130, ry: 100, stroke: "#F26A1B", w: 4, rot: -14 }, { rx: 118, ry: 110, stroke: "#F59E0B", w: 2, rot: 22 }]} style={{ right: -90, top: -110, width: 320, height: 320 }} />
              <span className="badge relative bg-orange px-3 py-1.5">For companies · Price on request</span>
              <h2 className="relative font-display text-[32px] font-extrabold leading-[1.05] md:text-[40px]">Book this workshop for your team</h2>
              <p className="relative m-0 max-w-[560px] text-[17px] leading-relaxed text-[#D1D5DB]">{w.booking.teamText ?? "Tell us about your team and goals. We'll get back to you with a proposal and available dates."}</p>
              <TeamRequestForm workshop={w.title} idPrefix={`${w.slug}-team`} maxGroup={w.booking.maxGroup} goalPlaceholder={w.booking.goalPlaceholder} />
            </div>
            <div id="join" className="relative flex flex-col gap-6 overflow-hidden rounded-panel bg-sky p-7 text-white sm:p-10">
              <span className="badge relative bg-yolk px-3 py-1.5">For individuals</span>
              <h2 className="relative font-display text-[28px] font-extrabold leading-[1.05] md:text-[34px]">{w.booking.joinTitle}</h2>
              <p className="relative m-0 text-[17px] leading-relaxed text-sky-tint">{w.booking.joinText}</p>
              <WaitlistForm workshop={`${w.title} (open session)`} idPrefix={`${w.slug}-join`} withName onBlue />
            </div>
          </div>
        </section>
      )}

      {/* Waiting list */}
      {w.seat && (
      <section id="seat" aria-labelledby="seat-title" className="px-5 py-[72px] md:px-10 md:py-24">
        <div className="relative mx-auto box-border flex max-w-[960px] flex-col gap-6 overflow-hidden rounded-panel bg-ink p-7 text-white sm:p-14">
          <EllipseRings rings={[{ rx: 130, ry: 100, stroke: "#F26A1B", w: 4, rot: -14 }, { rx: 118, ry: 110, stroke: "#F59E0B", w: 2, rot: 22 }]} style={{ right: -70, top: -90, width: 340, height: 340 }} />
          <span className="badge relative px-3 py-1.5" style={{ background: STATUS[w.status].bg }}>{w.seat.badge}</span>
          <h2 id="seat-title" className="relative font-display text-[32px] font-extrabold leading-[1.05] md:text-[40px]">{w.seat.title}</h2>
          <p className="relative m-0 max-w-[560px] text-[17px] leading-relaxed text-[#D1D5DB]">{w.seat.text}</p>
          <WaitlistForm workshop={w.title} idPrefix={w.slug} />
        </div>
      </section>
      )}

      {/* Other workshops */}
      <section aria-labelledby="more-title" className="wrap flex flex-col items-center gap-5 pb-[72px] text-center md:pb-24">
        <h2 id="more-title" className="font-display text-[28px] font-bold leading-tight md:text-[32px]">Looking for something else?</h2>
        <p className="m-0 max-w-[520px] text-[17px] leading-relaxed text-slate">See upcoming and past workshops on finance, AI, quality assurance and more.</p>
        <Link to="/workshops" className="btn-dark">Check other workshops <ArrowRight /></Link>
      </section>
    </Page>
  );
}
