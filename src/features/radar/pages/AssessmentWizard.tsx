import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { LeadCapture } from "../components/LeadCapture";
import { QuestionCard } from "../components/QuestionCard";
import { LoadingScreen } from "../components/LoadingScreen";
import { ResultDashboard } from "../components/ResultDashboard";
import { useCreateAssessment } from "../hooks/use-assessments";
import type { LeadData } from "../types";
import ProgramNavigation from "@/components/ProgramNavigation";
import Footer from '@/components/Footer';

// --- Data Definitions ---
const QUESTIONS = [
  {
    title: "How clear is the problem you want to solve and the value you provide?",
    options: [
      { value: 1, text: "Vague idea, mostly assumptions." },
      { value: 2, text: "I have a hypothesis, but little validation." },
      { value: 3, text: "Clear problem, had some conversations." },
      { value: 4, text: "Repeated confirmation from target users." },
      { value: 5, text: "Problem is validated + people actively ask for solutions." },
    ]
  },
  {
    title: "What is your current financial runway?",
    options: [
      { value: 1, text: "< 3 months runway, high financial stress." },
      { value: 2, text: "3–6 months, no backup plan." },
      { value: 3, text: "6–9 months or stable side income." },
      { value: 4, text: "9–12 months runway." },
      { value: 5, text: "12+ months or solid external support." },
    ]
  },
  {
    title: "How heavy are your current life and money obligations?",
    options: [
      { value: 1, text: "Heavy obligations, zero flexibility." },
      { value: 2, text: "Multiple fixed responsibilities." },
      { value: 3, text: "Some obligations, but manageable." },
      { value: 4, text: "Few constraints." },
      { value: 5, text: "High flexibility, very low personal risk." },
    ]
  },
  {
    title: "How much focused time can you realistically dedicate weekly?",
    options: [
      { value: 1, text: "< 5 hrs/week, highly inconsistent." },
      { value: 2, text: "5–8 hrs/week." },
      { value: 3, text: "8–15 hrs/week." },
      { value: 4, text: "15–30 hrs/week." },
      { value: 5, text: "40+ hrs/week." },
    ]
  },
  {
    title: "Describe your current energy levels and focus.",
    options: [
      { value: 1, text: "Burnt out or severely overloaded." },
      { value: 2, text: "Often tired, inconsistent focus." },
      { value: 3, text: "OK energy, but needs structure." },
      { value: 4, text: "High motivation, deeply focused." },
      { value: 5, text: "Strong stamina + intense excitement." },
    ]
  },
  {
    title: "Do you have the necessary skills or support network?",
    options: [
      { value: 1, text: "Missing key skills, completely solo." },
      { value: 2, text: "Some skills, mostly figuring it out alone." },
      { value: 3, text: "Core skills + strong learning mindset." },
      { value: 4, text: "Good skill mix or ready access to help." },
      { value: 5, text: "Strong skills + excellent mentors/network." },
    ]
  },
  {
    title: "What is your psychological readiness for risk and failure?",
    options: [
      { value: 1, text: "Strong fear of failure." },
      { value: 2, text: "Seeks certainty, actively avoids risk." },
      { value: 3, text: "Accepts uncertainty with support." },
      { value: 4, text: "Comfortable experimenting." },
      { value: 5, text: "Actively embraces ambiguity." },
    ]
  }
];

export default function AssessmentWizard() {
  const [step, setStep] = useState(0); // 0: Lead, 1-7: Questions, 8: Loading, 9: Result
  const [lead, setLead] = useState<LeadData | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  
  // State to hold final computed results for UI rendering
  const [finalScore, setFinalScore] = useState(0);
  const [finalOutcome, setFinalOutcome] = useState("");

  const { mutateAsync: createAssessment } = useCreateAssessment();

  const handleLeadSubmit = (data: LeadData) => {
    setLead(data);
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuestionAnswer = async (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (newAnswers.length < QUESTIONS.length) {
      // Go to next question after short delay for UX
      setTimeout(() => {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 400);
    } else {
      // Finished answering
      setStep(8); // Go to loading screen immediately
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Compute results
      const score = newAnswers.reduce((a, b) => a + b, 0);
      const q2 = newAnswers[1]; // Index 1 is Q2
      const q3 = newAnswers[2]; // Index 2 is Q3
      const hasRedFlag = q2 <= 2 || q3 <= 2;

      let outcome = "";
      if (score <= 14) outcome = "PAUSE & STABILISE";
      else if (score <= 21) outcome = "EXPLORE";
      else if (score <= 27) outcome = "VALIDATE";
      else {
        // Score 28-35
        if (hasRedFlag) {
          outcome = "VALIDATE"; // Cap at VALIDATE if red flag exists
        } else {
          outcome = "BUILD";
        }
      }

      setFinalScore(score);
      setFinalOutcome(outcome);

      // Fire mutation in background
      if (lead) {
        try {
          await createAssessment({
            firstName: lead.firstName,
            surname: lead.surname,
            email: lead.email,
            educationLevel: lead.educationLevel,
            jobStatus: lead.jobStatus,
            age: Number(lead.age),
            country: lead.country,
            answers: newAnswers,
            totalScore: score,
            outcome: outcome
          });
        } catch (error) {
          console.error("Failed to save assessment:", error);
          // We still proceed to results even if DB fails, to not ruin user experience
        }
      }

      // Minimum 2.5s loading screen for perceived value
      setTimeout(() => {
        setStep(9);
      }, 2500);
    }
  };

  const restart = () => {
    setStep(1);
    setLead(null);
    setAnswers([]);
    setFinalScore(0);
    setFinalOutcome("");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    <ProgramNavigation />
    <div className="min-h-screen relative py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      {/* Global subtle top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50" />
      
      <AnimatePresence mode="wait">
        {step === 0 && (
          <LeadCapture key="lead" onSubmit={handleLeadSubmit} />
        )}

        {step > 0 && step <= QUESTIONS.length && (
          <QuestionCard
            key={`q-${step}`}
            questionNumber={step}
            totalQuestions={QUESTIONS.length}
            title={QUESTIONS[step - 1].title}
            options={QUESTIONS[step - 1].options}
            selectedValue={null} // Reset for each new question
            onSelect={handleQuestionAnswer}
          />
        )}

        {step === 8 && (
          <LoadingScreen key="loading" />
        )}

        {step === 9 && (
          <ResultDashboard 
            key="result" 
            score={finalScore} 
            outcome={finalOutcome} 
            onRestart={restart} 
          />
        )}
      </AnimatePresence>
      
    </div>
    <Footer />
    </>
  );
} 
