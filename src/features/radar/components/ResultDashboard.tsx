import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, Compass, CheckCircle, Rocket, Radar } from "lucide-react";
import confetti from "canvas-confetti";
import { useEffect } from "react";

interface ResultDashboardProps {
  score: number;
  outcome: string;
  onRestart: () => void;
}

export function ResultDashboard({ score, outcome, onRestart }: ResultDashboardProps) {
  useEffect(() => {
  if (outcome === "BUILD" || outcome === "VALIDATE") {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      confetti({
        particleCount: 80,
        spread: 160,
        origin: { y: 0.6 },
        zIndex: 9999  // 🔥 important
      });

    }, 250);

    return () => clearInterval(interval);
  }
}, [outcome]);

  interface OutcomeDetails {
  icon: JSX.Element;
  color: string;
  bg: string;
  subtitle: string;
  description: string;
  actions: string[];
  cta?: {
    text: string;
    button: string;
    url: string;
  };
}

  const getOutcomeDetails = () => {
    switch (outcome) {
      case "PAUSE & STABILISE":
        return {
          icon: <AlertTriangle className="w-12 h-12 text-destructive" />,
          color: "text-destructive",
          bg: "bg-destructive/10 border-destructive/20",
          subtitle: "Too many risks stacked right now.",
          description: "High stress leads to poor decisions. Building a business requires a stable foundation.",
          actions: [
            "Stabilise your primary source of income immediately.",
            "Reduce personal obligations where possible.",
            "Clarify your core motivation for wanting to build.",
            "Do NOT start building or spending money yet."
          ],
          cta: {
          title: "Assessment Complete. ",
          text1: "Stabilise your financial foundation before making your next move.",
          text2: "Join our financial resilience workshops.",
          button: "View 10 Saturdays Program",
          url: "https://business-nest.nl/events"
    }
        };
      case "EXPLORE":
        return {
          icon: <Compass className="w-12 h-12 text-[hsl(var(--brand-sand))]" />,
          color: "text-[hsl(var(--brand-sand))]",
          bg: "bg-[hsl(var(--brand-sand))]/10 border-[hsl(var(--brand-sand))]/20",
          subtitle: "You are in the idea curiosity phase.",
          description: "This is a low-risk learning zone. Focus on understanding the market before committing resources.",
          actions: [
            "Conduct at least 10 user interviews this week.",
            "Deepen your market and competitor research.",
            "Focus entirely on problem validation.",
            "Hold off on major spending or legal setup."
          ],
          cta: {
          title: "Congratulations! ",
          text1: "You are ready to explore your business idea.",
          text2: "Get support from the business experts during the 10 Saturdays Program.",
          button: "View 10 Saturdays Program",
          url: "https://business-nest.nl/program"
    }
        };
      case "VALIDATE":
        return {
          icon: <CheckCircle className="w-12 h-12 text-[hsl(var(--brand-orange))]" />,
          color: "text-[hsl(var(--brand-orange))]",
          bg: "bg-[hsl(var(--brand-orange))]/10 border-[hsl(var(--brand-orange))]/20",
          subtitle: "Serious potential detected.",
          description: "It's time to test reality. Move from thinking about the problem to testing if people will pay for a solution.",
          actions: [
            "Build an MVP (Minimum Viable Product) or pilot program.",
            "Launch pre-sales or build a targeted waitlist.",
            "Run pricing experiments to gauge willingness to pay.",
            "Keep your current income stream stable if needed."
          ],
          cta: {
          title: "Congratulations! ",
          text1: "You are currently in execution focused.",
          text2: "Build your MVP, pricing and sales strategye with experts during the 10 Saturdays Program.",
          button: "View 10 Saturdays Program",
          url: "https://business-nest.nl/program"
    }
        };
      case "BUILD":
        return {
          icon: <Rocket className="w-12 h-12 text-primary" />,
          color: "text-primary",
          bg: "bg-primary/10 border-primary/20",
          subtitle: "Conditions support execution.",
          description: "You have the runway, readiness, and validation to go all-in. Time to scale your learning into execution.",
          actions: [
            "Create a structured 90-day execution roadmap.",
            "Focus heavily on customer acquisition channels.",
            "Handle formal legal & financial setup.",
            "Consider hiring or finding complementary co-founders."
          ],
          cta: {
          title: "Congratulations! ",
          text1: "You are currently in acceleration focused.",
          text2: "Create your roadmap, learn about legal and financial aspects with experts during the 10 Saturdays Program.",
          button: "View 10 Saturdays Program",
          url: "https://business-nest.nl/program"
    }
        };
      default:
        return {
          icon: <Radar className="w-12 h-12 text-foreground" />,
          color: "text-foreground",
          bg: "bg-white/10 border-white/20",
          subtitle: "Analysis complete.",
          description: "Review your specific breakdown.",
          actions: []
        };
    }
  };

  const details = getOutcomeDetails();

  return (
    <>
    
    
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Success Banner */}
     {/* <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-xl text-center mb-8 flex items-center justify-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">A detailed copy of your results has been sent to your email.</span>
      </motion.div>*/}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Score Card */}
        <div className="md:col-span-1 glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <div className="w-24 h-24 rounded-full readiness-score border border-white/10 flex items-center justify-center mb-6 shadow-inner relative z-10">
            <span className="text-4xl font-display font-bold text-white/100">{score}</span>
            <span className="text-sm text-white/60 absolute bottom-3">/35</span>
          </div>
          
          <h3 className="text-lg font-medium text-foreground/80 mb-1 relative z-10">Readiness Score</h3>
          <p className="text-sm text-muted-foreground relative z-10">Calculated from 7 key vectors</p>
        </div>

        {/* Outcome Card */}
        <div className={`md:col-span-2 ${details.bg} border p-8 rounded-3xl relative overflow-hidden`}>
          <div className="flex items-start gap-6 relative z-10">
            <div className="p-4 result-validate rounded-2xl backdrop-blur-sm">
              {details.icon}
            </div>
            <div>
              <div className="inline-block px-3 py-1 result-validate backdrop-blur-sm rounded-full text-xs font-bold tracking-widest uppercase mb-3 text-foreground/80">
                Recommended Mode
              </div>
              <h2 className={`text-4xl md:text-5xl font-display font-bold mb-2 ${details.color}`}>
                {outcome}
              </h2>
              <p className="text-xl text-foreground font-medium mb-2">{details.subtitle}</p>
              <p className="text-foreground/70 leading-relaxed">{details.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Plan */}
      <div className="mt-8 glass-card p-8 md:p-10 rounded-3xl">
        <h3 className="text-2xl font-display font-bold text-foreground mb-6">Your Action Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {details.actions.map((action, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (idx * 0.1) }}
              className="flex items-start gap-4 p-2 rounded-2xl border border-white/5"
            >
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-sm shrink-0">
                {idx + 1}
              </div>
              <p className="text-foreground/90 leading-relaxed">{action}</p>
            </motion.div>
          ))}
        </div>

        {details.cta && (
          <div className="mt-10 pt-8 border-t border-white/10 text-center bg-[hsl(var(--brand-sand))]/10 border-[hsl(var(--brand-sand))]/20 border p-8 rounded-3xl">
            {/*<div class="md:col-span-2 bg-[hsl(var(--brand-sand))]/10 border-[hsl(var(--brand-sand))]/20 border p-8 rounded-3xl relative overflow-hidden">*/}
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">{details.cta.title}</h3>
            <p className="text-foreground/80 mb-4 font-medium">
              {details.cta.text1} <br /> {details.cta.text2}
            </p>
            <a
              href={details.cta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-primary hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(47,47,234,0.3)]"
            >
              {details.cta.button}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
    )}

        <div className="mt-2 pt-8 border-t border-white/10 flex justify-center">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border font-bold text-white/100 bg-accent hover:bg-accent/90 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(216,138,61,0.3)] active:scale-[0.98]"
          >
            Retake Assessment
          </button>
        </div>
      </div>
    </motion.div>
     </>
  );
}
