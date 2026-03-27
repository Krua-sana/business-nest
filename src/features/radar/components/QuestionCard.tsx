import { motion } from "framer-motion";
import { CheckCircle2, Radar } from "lucide-react";

interface Option {
  value: number;
  text: string;
}

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  title: string;
  options: Option[];
  selectedValue: number | null;
  onSelect: (value: number) => void;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  title,
  options,
  selectedValue,
  onSelect,
}: QuestionCardProps) {
  return (
    <motion.div
      key={questionNumber}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="mb-8">
        <div className="text-center mb-10">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30"
        >
          <Radar className="w-8 h-8 text-primary" />
        </motion.div>
         <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 text-gradient">
          Business Readiness Radar
        </h1>
        </div>
        <div className="flex items-center justify-between mb-4">
          
          <span className="text-sm font-medium text-primary uppercase tracking-wider">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round((questionNumber / totalQuestions) * 100)}% Complete
          </span>
        </div>
        
        {/* Sleek Progress Bar */}
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary to-accent"
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <h2 className="text-3xl md:text-4xl font-display font-semibold mb-8 leading-tight">
        {title} 
      </h2>

       <div className="mt-8 glass-card p-8 md:p-10 rounded-3xl">
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          
          return (
            <motion.button
              key={option.value}
              onClick={() => onSelect(option.value)}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`
                w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group
                ${isSelected 
                  ? 'bg-primary/10 border-primary shadow-[0_0_30px_rgba(47,47,234,0.15)]' 
                  : 'bg-card border-white/5 hover:border-white/20 hover:bg-white/[0.02]'}
              `}
            >
              {/* Highlight background that slides in on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isSelected ? 'hidden' : 'block'}`} />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className={`
                  flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors duration-300
                  ${isSelected ? 'border-primary bg-primary' : 'border-foreground/20 group-hover:border-foreground/40'}
                `}>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </motion.div>
                  )}
                </div>
                <div className="flex-1">
                  <span className={`text-lg transition-colors duration-300 ${isSelected ? 'font-medium' : 'text-foreground/80 group-hover:text-foreground'}`}>
                    {option.text}
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
