import { motion } from "framer-motion";
import { Radar } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh]"
    >
      <div className="relative w-32 h-32 mb-8">
        {/* Pulsing rings */}
        <motion.div
          animate={{ 
            scale: [1, 2, 2.5],
            opacity: [0.5, 0.2, 0] 
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 bg-primary rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.8, 2.2],
            opacity: [0.5, 0.2, 0] 
          }}
          transition={{ 
            duration: 2,
            delay: 0.6,
            repeat: Infinity,
            ease: "easeOut"
          }}
          className="absolute inset-0 bg-accent rounded-full"
        />
        
        {/* Center icon */}
        <div className="absolute inset-0 bg-card border-2 border-primary/30 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(47,47,234,0.3)]">
          <Radar className="w-12 h-12 text-primary animate-pulse" />
        </div>
      </div>
      
      <h2 className="text-2xl font-display font-semibold text-foreground mb-2">
        Analyzing your readiness
      </h2>
      <p className="text-muted-foreground font-mono">
        Processing signals{dots}
      </p>
    </motion.div>
  );
}
