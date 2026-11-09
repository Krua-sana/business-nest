import { useState } from "react";
import { Page } from "@/components/Layout";
import { CornerRings, EggPhoto } from "@/components/Decor";
import { ArrowDown, ArrowRight } from "@/components/Icons";
import { CtaBand, ExpertApplyDialog, ExpertCard, Pill, SectionHead } from "@/components/ui";
import { EXPERTS } from "@/data/experts";

export default function Experts() {
  const [applyOpen, setApplyOpen] = useState(false);
  return (
    <Page active="experts" title="Experts — Business Nest" description="Meet the mentors, advisors and industry experts who help Business Nest founders grow faster and stronger.">
      <section aria-labelledby="x-title" className="wrap-page grid items-center gap-12 pb-[72px] pt-10 md:pt-14 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <div className="flex flex-col items-start gap-6">
          <Pill dot="#D4F57A" outline>Stage 3 · Under the wing</Pill>
          <h1 id="x-title" className="h1">Meet our <span className="accent">experts</span></h1>
          <p className="m-0 max-w-[540px] text-[19px] leading-relaxed text-slate">Behind every successful business there are mentors, advisors and experts. At Business Nest, industry leaders share their experience, knowledge and networks to help your venture grow faster and stronger.</p>
          <div className="flex flex-wrap items-center gap-4">
            <a href="#experts-list" className="btn-primary">Find your expert <ArrowDown /></a>
            <a href="#become-expert" className="btn-text">Become an expert</a>
          </div>
        </div>
        <EggPhoto>
          <img src="/images/web/gallery/g2.jpg" alt="An expert mentoring two founders at a table with a flip chart" className="block h-full w-full object-cover" style={{ objectPosition: "50% 60%" }} />
        </EggPhoto>
      </section>

      <section id="experts-list" aria-labelledby="list-title" className="relative overflow-hidden bg-white py-[72px] md:py-24">
        <CornerRings />
        <div className="wrap flex flex-col gap-10">
          <SectionHead eyebrow={`${EXPERTS.length} experts`} title="Our program experts" id="list-title" />
          <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
            {EXPERTS.map((x) => <ExpertCard key={x.name} x={x} />)}
          </ul>
        </div>
      </section>

      <CtaBand
        variant="blue"
        id="become-expert"
        titleId="be-title"
        title="Want to become an expert?"
        text="We're always looking for experienced mentors and industry leaders to support our community. Join us and help early-stage founders grow."
        action={<button type="button" onClick={() => setApplyOpen(true)} className="btn-yolk cursor-pointer border-0">Apply as an expert <ArrowRight /></button>}
      />
      <ExpertApplyDialog open={applyOpen} onClose={() => setApplyOpen(false)} />
    </Page>
  );
}
