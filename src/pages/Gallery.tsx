import { useEffect, useRef, useState } from "react";
import { Page } from "@/components/Layout";
import { CornerRings, EggPhoto } from "@/components/Decor";
import { ArrowDown, ArrowLeft, ArrowRight, CloseIcon, VideoIcon } from "@/components/Icons";
import { CtaBand, Pill, SectionHead } from "@/components/ui";
import { EVENT_TAGS, GALLERY, type GalleryEvent } from "@/data/gallery";
import { LINKS } from "@/data/site";

const PAGE = 9;
type Ev = "all" | GalleryEvent;
type Kind = "all" | "photo" | "video";

function Lightbox({ items, index, onClose, onMove }: { items: typeof GALLERY; index: number; onClose: () => void; onMove: (d: number) => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const m = items[index];
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);
  const tag = EVENT_TAGS[m.ev];
  return (
    <dialog
      ref={ref}
      aria-labelledby="lb-title"
      onClose={onClose}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") onMove(-1);
        if (e.key === "ArrowRight") onMove(1);
      }}
      className="m-0 h-full max-h-none w-full max-w-none border-0 bg-ink/[.92] p-4 text-white backdrop:bg-transparent sm:p-6"
    >
      <div className="mx-auto flex h-full w-full max-w-[1040px] flex-col justify-center gap-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 id="lb-title" className="font-display text-2xl font-bold">{m.title}</h2>
            <p className="m-0 text-sm text-[#D1D5DB]">{tag.label} · {m.meta} · {index + 1} of {items.length}</p>
          </div>
          <button type="button" autoFocus onClick={onClose} aria-label="Close gallery viewer" className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-white bg-transparent p-0 text-white">
            <CloseIcon />
          </button>
        </div>
        <div className="relative aspect-[16/10] max-h-[72vh] w-full overflow-hidden rounded-card bg-[#1F2937]">
          {m.kind === "video" && m.video ? (
            <video controls preload="none" poster={m.img} aria-label={m.alt} src={m.video} className="block h-full w-full bg-ink object-contain" />
          ) : (
            <img src={m.img} alt={m.alt} className="block h-full w-full object-contain" />
          )}
        </div>
        <div className="flex items-center justify-between gap-4">
          <button type="button" onClick={() => onMove(-1)} aria-label="Previous item" className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-white bg-transparent p-0 text-white"><ArrowLeft size={20} /></button>
          <p className="m-0 hidden text-center text-sm text-[#D1D5DB] sm:block">Use the arrow keys to browse, Esc to close</p>
          <button type="button" onClick={() => onMove(1)} aria-label="Next item" className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-0 bg-white p-0 text-ink"><ArrowRight size={20} /></button>
        </div>
      </div>
    </dialog>
  );
}

export default function Gallery() {
  const [ev, setEv] = useState<Ev>("all");
  const [kind, setKind] = useState<Kind>("all");
  const [shown, setShown] = useState(PAGE);
  const [lb, setLb] = useState(-1);
  const hasVideos = GALLERY.some((m) => m.kind === "video");

  const list = GALLERY.filter((m) => (ev === "all" || m.ev === ev) && (kind === "all" || m.kind === kind));
  const visible = list.slice(0, shown);
  const photos = list.filter((m) => m.kind === "photo").length;
  const videos = list.length - photos;
  const count = `Showing ${photos} ${photos === 1 ? "photo" : "photos"}${hasVideos ? ` and ${videos} ${videos === 1 ? "video" : "videos"}` : ""}`;

  const chip = (on: boolean) => `chip ${on ? "bg-ink text-white" : "bg-transparent text-ink hover:bg-ink/5"}`;
  const events: [Ev, string][] = [["all", "All events"], ["sat", "10 Saturdays"], ["ws", "Workshops"], ["com", "Community events"]];

  return (
    <Page active="gallery" title="Gallery — Business Nest" description="Photos from Business Nest events, workshops and 10 Saturdays programme days in Eindhoven.">
      <section aria-labelledby="g-hero" className="wrap-page grid items-center gap-12 pb-[72px] pt-10 md:pt-14 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <div className="flex flex-col items-start gap-6">
          <Pill dot="#D4F57A" outline>Moments from the nest</Pill>
          <h1 id="g-hero" className="h1">Life in the <span className="accent">nest</span></h1>
          <p className="m-0 max-w-[540px] text-[19px] leading-relaxed text-slate">Photos and videos from our offline events, workshops and 10 Saturdays programme days. Spot yourself, relive the energy, or see what a Saturday in the nest really looks like.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#gallery-grid" className="btn-primary">Browse the gallery <ArrowDown /></a>
            <a href="#share" className="btn-text">Share your photos</a>
          </div>
        </div>
        <EggPhoto>
          <img src="/images/hero/hero-3.jpg" alt="Founders building their MVPs together at a Business Nest workshop" className="block h-full w-full object-cover" style={{ objectPosition: "50% 60%" }} />
        </EggPhoto>
      </section>

      <section id="gallery-grid" aria-labelledby="g-title" className="relative overflow-hidden bg-white py-[72px] md:py-24">
        <CornerRings />
        <div className="wrap flex flex-col gap-8">
          <SectionHead eyebrow="Photos & videos" title="Gallery" id="g-title" />
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <div role="group" aria-label="Filter by event" className="flex flex-wrap gap-2">
              {events.map(([id, label]) => (
                <button key={id} type="button" aria-pressed={ev === id} onClick={() => { setEv(id); setShown(PAGE); }} className={chip(ev === id)}>{label}</button>
              ))}
            </div>
            {hasVideos && (
              <div role="group" aria-label="Filter by media type" className="flex gap-1 rounded-full border border-sand bg-cream p-1">
                {([["all", "All"], ["photo", "Photos"], ["video", "Videos"]] as [Kind, string][]).map(([id, label]) => (
                  <button key={id} type="button" aria-pressed={kind === id} onClick={() => { setKind(id); setShown(PAGE); }} className={`min-h-[40px] cursor-pointer rounded-full border-0 px-4 text-sm font-semibold ${kind === id ? "bg-ink text-white" : "bg-transparent text-ink"}`}>{label}</button>
                ))}
              </div>
            )}
          </div>
          <p className="m-0 text-[15px] text-stone" aria-live="polite">{count}</p>
          <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((m, i) => {
              const tag = EVENT_TAGS[m.ev];
              return (
                <li key={m.img + m.title} className="card flex flex-col">
                  <button
                    type="button"
                    onClick={() => setLb(i)}
                    aria-label={`${m.kind === "video" ? "Play video" : "Open photo"}: ${m.title}`}
                    className="media-zoom relative block aspect-[4/3] w-full cursor-pointer overflow-hidden border-0 bg-sand-photo p-0"
                  >
                    <img src={m.img} alt="" loading="lazy" className="block h-full w-full object-cover" />
                    {m.kind === "video" && (
                      <>
                        <span aria-hidden="true" className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange"><svg width="24" height="24" viewBox="0 0 24 24" fill="#111827"><path d="M8 5l12 7-12 7z" /></svg></span>
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-[5px] text-xs font-semibold text-white"><VideoIcon />Video{m.duration ? ` · ${m.duration}` : ""}</span>
                      </>
                    )}
                  </button>
                  <div className="flex flex-1 flex-col gap-2.5 px-6 pb-6 pt-5">
                    <span className="badge" style={{ background: tag.bg, color: tag.ink }}>{tag.label}</span>
                    <h3 className="font-display text-[22px] font-bold leading-tight">{m.title}</h3>
                    <p className="m-0 text-sm text-stone">{m.meta}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          {shown < list.length && (
            <div className="flex justify-center">
              <button type="button" onClick={() => setShown((s) => s + PAGE)} className="btn-outline cursor-pointer bg-transparent">Load more moments</button>
            </div>
          )}
        </div>
      </section>

      <CtaBand
        variant="blue"
        id="share"
        titleId="share-title"
        title="Were you there? Share your moments"
        text="Send us your photos or short videos from a Business Nest event and we'll add the best ones to the gallery, with credit."
        action={<a href={LINKS.sharePhotos} className="btn-yolk">Send your photos <ArrowRight /></a>}
      />

      {lb >= 0 && lb < visible.length && (
        <Lightbox items={visible} index={lb} onClose={() => setLb(-1)} onMove={(d) => setLb((n) => (n + d + visible.length) % visible.length)} />
      )}
    </Page>
  );
}
