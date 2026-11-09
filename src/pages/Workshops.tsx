import { useState } from "react";
import { Link } from "react-router-dom";
import { Page } from "@/components/Layout";
import { CornerRings, PosterFrame } from "@/components/Decor";
import { ArrowRight, CalendarIcon, ClockIcon, PinIcon, PresentationIcon, UsersIcon } from "@/components/Icons";
import { CtaBand, HostWorkshopDialog, Pill, SectionHead, WorkshopCard } from "@/components/ui";
import { getWorkshop, HIGHLIGHTED_SLUG, WORKSHOPS } from "@/data/workshops";

const FILTERS = [
  ["all", "All"],
  ["upcoming", "Available"],
  ["past", "Past editions"],
] as const;

export default function Workshops() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number][0]>("all");
  const [hostOpen, setHostOpen] = useState(false);
  const hl = getWorkshop(HIGHLIGHTED_SLUG) ?? WORKSHOPS[0];
  const visible = WORKSHOPS.filter((w) => !w.hidden);
  // Filters only make sense when there are both available and past workshops to show.
  const showFilters = visible.some((w) => w.status === "past") && visible.some((w) => w.status !== "past");
  const list = visible.filter((w) => filter === "all" || (filter === "past" ? w.status === "past" : w.status !== "past"));
  const [a, b, c] = hl.titleParts;

  return (
    <Page active="workshops" title="Workshops — Business Nest" description="Hands-on workshops for entrepreneurs in Eindhoven: finance, AI, quality assurance and more.">
      {/* Highlighted workshop */}
      <section aria-labelledby="hl-title" className="wrap-page grid items-center gap-16 pb-[72px] pt-10 md:pt-14 lg:grid-cols-2 lg:pb-24">
        <div className="flex flex-col items-start gap-6">
          <Pill dot="#1F44F0">Highlighted workshop</Pill>
          <h1 id="hl-title" className="h1 lg:!text-[68px]">{a}<span className="accent">{b}</span>{c}</h1>
          <p className="m-0 max-w-[520px] text-[19px] leading-relaxed text-slate">{hl.highlight ?? hl.summary}</p>
          <ul className="m-0 flex list-none flex-wrap gap-2.5 p-0">
            {(hl.facts
              ? hl.facts.map((f) => [f.label === "Where" ? PinIcon : f.label.startsWith("Next") ? CalendarIcon : /group|for/i.test(f.label) ? UsersIcon : ClockIcon, f.label.startsWith("Next") ? `${f.label}: ${f.value}` : f.value])
              : [[CalendarIcon, hl.date], [ClockIcon, hl.time], [PinIcon, hl.location]]
            ).map(([Icon, text]) => {
              const I = Icon as typeof CalendarIcon;
              return (
                <li key={text as string} className="inline-flex items-center gap-2 rounded-full border border-sand bg-white px-3.5 py-2 text-sm font-medium">
                  <I className="text-ember" />{text as string}
                </li>
              );
            })}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <Link to={`/workshops/${hl.slug}`} className="btn-primary">Visit page <ArrowRight /></Link>
            {hl.status !== "past" && <Link to={`/workshops/${hl.slug}${hl.ctaHref ?? "#seat"}`} className="btn-text">{hl.cta}</Link>}
          </div>
        </div>
        <PosterFrame src={hl.hero.img} alt={hl.hero.alt} video={hl.hero.video} />
      </section>

      {/* All workshops */}
      <section aria-labelledby="all-title" className="relative overflow-hidden bg-white py-[72px] md:py-24">
        <CornerRings />
        <div className="wrap flex flex-col gap-8">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionHead eyebrow="Learn by doing" title="All workshops" id="all-title" />
            {showFilters && (
            <div role="group" aria-label="Filter workshops" className="flex flex-wrap gap-2">
              {FILTERS.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={filter === id}
                  onClick={() => setFilter(id)}
                  className={`chip ${filter === id ? "bg-ink text-white" : "bg-transparent text-ink hover:bg-ink/5"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            )}
          </div>
          <p className="m-0 text-[15px] text-stone" aria-live="polite">Showing {list.length} {list.length === 1 ? "workshop" : "workshops"}</p>
          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {list.map((w) => <WorkshopCard key={w.slug} w={w} withSummary />)}
          </ul>
          {list.length === 0 && <p className="m-0 text-base text-slate">No workshops available right now — check back soon or join the waiting list of a past edition.</p>}
        </div>
      </section>

      <CtaBand
        variant="orange"
        titleId="org-title"
        title="Want to organise a workshop at Business Nest?"
        text="Tell us about your idea and we'll get in touch to plan it together."
        icon={<span aria-hidden="true" className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ink text-white sm:flex"><PresentationIcon /></span>}
        action={<button type="button" onClick={() => setHostOpen(true)} className="btn-dark cursor-pointer border-0">Fill in the form <ArrowRight /></button>}
      />
      <HostWorkshopDialog open={hostOpen} onClose={() => setHostOpen(false)} />
    </Page>
  );
}
