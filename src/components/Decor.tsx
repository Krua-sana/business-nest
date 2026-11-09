import { useEffect, useId, useRef, type CSSProperties, type ReactNode } from "react";
import { BLOB_CLIP, BLOB_RINGS, CORNER_RINGS } from "./shapes";

/** Small decorative egg shape. Always aria-hidden. */
export const Egg = ({ color, w, h, style, className = "" }: { color: string; w: number; h: number; style?: CSSProperties; className?: string }) => (
  <span aria-hidden="true" className={`egg block ${className}`} style={{ width: w, height: h, background: color, ...style }} />
);

/** The three floating eggs around hero images. */
export const HeroEggs = ({ blue = true }: { blue?: boolean }) => (
  <>
    <Egg color="#FFD84D" w={34} h={42} style={{ position: "absolute", left: "-2%", top: "8%", transform: "rotate(40deg)", zIndex: 2 }} />
    {blue && <Egg color="#1F44F0" w={14} h={18} style={{ position: "absolute", left: "6%", top: "22%", transform: "rotate(40deg)", zIndex: 2 }} />}
    <Egg color="#D4F57A" w={22} h={28} style={{ position: "absolute", right: "2%", bottom: "4%", transform: "rotate(40deg)", zIndex: 2 }} />
  </>
);

/** Photo cropped into the organic egg blob, with hand-drawn orbit rings. */
export function EggPhoto({ children, className = "", eggs = true, badge }: { children: ReactNode; className?: string; eggs?: boolean; badge?: ReactNode }) {
  const id = "blob-" + useId().replace(/:/g, "");
  return (
    <div className={`relative mx-auto aspect-[1/0.9] w-full max-w-[660px] ${className}`}>
      {eggs && <HeroEggs />}
      <div className="absolute inset-[4%] overflow-hidden bg-sand-photo" style={{ clipPath: `url(#${id})` }}>
        {children}
      </div>
      <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" fill="none" strokeLinecap="round">
        <defs>
          <clipPath id={id} clipPathUnits="objectBoundingBox">
            <path d={BLOB_CLIP} />
          </clipPath>
        </defs>
        {BLOB_RINGS.map((r) => (
          <path key={r.stroke} d={r.d} stroke={r.stroke} strokeWidth={r.width} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {badge}
    </div>
  );
}

/** Small cluster of rings tucked into a section corner. */
export const CornerRings = ({ position = "top-right" }: { position?: "top-right" | "bottom-left" }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 100 100"
    fill="none"
    className="pointer-events-none absolute hidden overflow-visible sm:block"
    style={position === "top-right" ? { right: -56, top: -40, width: 190, height: 170 } : { left: -64, bottom: -48, width: 190, height: 170 }}
  >
    {CORNER_RINGS.map((r) => (
      <path key={r.stroke} d={r.d} stroke={r.stroke} strokeWidth={r.width} vectorEffect="non-scaling-stroke" />
    ))}
  </svg>
);

/** Ellipse rings used on CTA bands and blue sections. */
export const EllipseRings = ({ rings, style }: { rings: { rx: number; ry: number; stroke: string; w: number; rot: number; op?: number }[]; style: CSSProperties }) => (
  <svg aria-hidden="true" viewBox="0 0 300 300" fill="none" className="pointer-events-none absolute" style={style}>
    {rings.map((r, i) => (
      <ellipse key={i} cx="150" cy="150" rx={r.rx} ry={r.ry} stroke={r.stroke} strokeWidth={r.w} opacity={r.op} transform={`rotate(${r.rot} 150 150)`} />
    ))}
  </svg>
);

/** Poster/photo in a rounded frame with two orbit rings around it. */
export const PosterFrame = ({ src, alt, video, aspect = "16 / 9", pos, badge, className = "" }: { src: string; alt: string; video?: string; aspect?: string; pos?: string; badge?: ReactNode; className?: string }) => (
  <div className={`relative mx-auto w-full max-w-[600px] ${className}`}>
    <HeroEggs />
    {video ? (
      <LoopVideo src={video} poster={src} label={alt} style={{ aspectRatio: aspect, boxShadow: "0 30px 60px -30px rgba(17,24,39,.5)" }} />
    ) : (
      <img
        src={src}
        alt={alt}
        className="relative z-[1] block w-full rounded-card object-cover"
        style={{ aspectRatio: aspect, objectPosition: pos, boxShadow: "0 30px 60px -30px rgba(17,24,39,.5)" }}
      />
    )}
    <svg aria-hidden="true" viewBox="0 0 300 300" preserveAspectRatio="none" fill="none" className="pointer-events-none absolute" style={{ left: "-10%", top: "-26%", width: "120%", height: "152%" }}>
      <ellipse cx="150" cy="150" rx="144" ry="120" stroke="#F26A1B" strokeWidth="3" vectorEffect="non-scaling-stroke" transform="rotate(-8 150 150)" />
      <ellipse cx="150" cy="150" rx="138" ry="132" stroke="#111827" strokeWidth="1.5" vectorEffect="non-scaling-stroke" transform="rotate(10 150 150)" />
    </svg>
    {badge}
  </div>
);

/** Round portrait with an orange orbit ring (mentor and moderator cards). */
export const RingPortrait = ({ src, initials, size = 120, double = true }: { src?: string; initials: string; size?: number; double?: boolean }) => {
  const pad = Math.round(size / 12);
  const box = size + pad * 2;
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt="" loading="lazy" className="block rounded-full object-cover" style={{ width: size, height: size, transform: "scale(1.1)" }} />
      ) : (
        <span aria-hidden="true" className="flex items-center justify-center rounded-full bg-sky font-display font-extrabold text-white" style={{ width: size, height: size, fontSize: size * 0.3 }}>
          {initials}
        </span>
      )}
      <svg aria-hidden="true" viewBox={`0 0 ${box} ${box}`} fill="none" className="pointer-events-none absolute" style={{ left: -pad, top: -pad, width: box, height: box }}>
        <ellipse cx={box / 2} cy={box / 2} rx={box / 2 - 2} ry={box / 2 - pad + 2} stroke="#F26A1B" strokeWidth="2" transform={`rotate(-18 ${box / 2} ${box / 2})`} />
        {double && <ellipse cx={box / 2} cy={box / 2} rx={box / 2 - pad + 2} ry={box / 2 - 2} stroke="#111827" strokeWidth="1" transform={`rotate(12 ${box / 2} ${box / 2})`} />}
      </svg>
    </div>
  );
};

/** Muted, looping animation (replaces heavy GIFs). Shows only the poster when the visitor prefers reduced motion. */
export function LoopVideo({ src, poster, label, style }: { src: string; poster: string; label: string; style?: CSSProperties }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) v.pause();
    else v.play().catch(() => {});
  }, []);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      role="img"
      aria-label={label}
      className="relative z-[1] block w-full rounded-card bg-yolk object-cover"
      style={style}
    />
  );
}
