import { useEffect } from "react";
import { BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import { Page } from "@/components/Layout";
import Home from "@/pages/Home";
import Program from "@/pages/Program";
import Workshops from "@/pages/Workshops";
import WorkshopDetail from "@/pages/WorkshopDetail";
import Experts from "@/pages/Experts";
import Gallery from "@/pages/Gallery";
import { getWorkshop } from "@/data/workshops";

/** Scroll to the #hash target after navigation, or to the top for a new page. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 0);
      return () => clearTimeout(t);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

/** Old /events/<slug> links (QR codes, shared posts) and retired workshop pages. */
function LegacyWorkshop() {
  const { slug } = useParams();
  return <Navigate to={getWorkshop(slug) ? `/workshops/${slug}` : "/workshops"} replace />;
}

function NotFound() {
  return (
    <Page active="home" title="Page not found — Business Nest">
      <section className="wrap-page flex flex-col items-start gap-6 py-24">
        <p className="eyebrow">404</p>
        <h1 className="h1">This egg hasn't <span className="accent">hatched</span> yet.</h1>
        <p className="m-0 max-w-[540px] text-lg text-slate">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary">Back to the nest</Link>
      </section>
    </Page>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshops/:slug" element={<WorkshopDetail />} />
        <Route path="/experts" element={<Experts />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* Redirects from URLs of the previous site */}
        <Route path="/events" element={<Navigate to="/workshops" replace />} />
        <Route path="/events/:slug" element={<LegacyWorkshop />} />
        <Route path="/program-spouses" element={<Navigate to="/program" replace />} />
        <Route path="/apply" element={<Navigate to="/program#apply" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
