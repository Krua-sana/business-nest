import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Radar } from "lucide-react";

export type LeadData = {
  firstName: string;
  surname: string;
  email: string;
  educationLevel: string;
  jobStatus: string;
  age: number | "";
  country: string;
};

interface LeadCaptureProps {
  onSubmit: (data: LeadData) => void;
}

export function LeadCapture({ onSubmit }: LeadCaptureProps) {
  const [data, setData] = useState<LeadData>({
    firstName: "",
    surname: "",
    email: "",
    educationLevel: "",
    jobStatus: "",
    age: "",
    country: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LeadData, string>>>({});

  const validate = () => {
    const newErrors: Partial<Record<keyof LeadData, string>> = {};
    if (!data.firstName.trim()) newErrors.firstName = "Required";
    if (!data.surname.trim()) newErrors.surname = "Required";
    if (!data.email.includes("@")) newErrors.email = "Valid email required";
    if (!data.educationLevel) newErrors.educationLevel = "Required";
    if (!data.jobStatus) newErrors.jobStatus = "Required";
    if (!data.age || data.age < 16 || data.age > 120) newErrors.age = "Valid age required";
    if (!data.country.trim()) newErrors.country = "Required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(data);
      const SHEET_URL = "https://script.google.com/macros/s/AKfycbz9n7DFegrOhIyQGjnFtoV2brxYS3L8T6LmRCLbM84ddALRs4G1NV3VcnVjW8DBJGKDxA/exec";
      
      fetch(SHEET_URL, {
      method: "POST",
      body: JSON.stringify({
        firstName: data.firstName,
        surname: data.surname,
        email: data.email,
       // educationLevel: data.educationLevel,
       // jobStatus: data.jobStatus,
       // age: data.age,
      // country: data.country,
      }),
    });

    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full max-w-2xl mx-auto"
    >
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
        <p className="text-lg text-foreground/80 max-w-xl mx-auto">
          Discover exactly where you stand on your entrepreneurial journey. 
          Get a personalized roadmap in under 3 minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="glass-card p-6 md:p-10 rounded-3xl space-y-6 relative overflow-hidden">
        {/* Subtle glow inside the card */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">First Name</label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
              className={`glass-input border-foreground/20 focus:border-primary ${errors.firstName ? 'border-destructive ring-destructive/20' : ''}`}
              placeholder="Jane"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Surname</label>
            <input
              type="text"
              value={data.surname}
              onChange={(e) => setData({ ...data, surname: e.target.value })}
              className={`glass-input border-foreground/20 focus:border-primary ${errors.surname ? 'border-destructive ring-destructive/20' : ''}`}
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="space-y-2 relative z-10">
          <label className="text-sm font-semibold text-foreground ml-1">Email Address</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className={`glass-input border-foreground/20 focus:border-primary ${errors.email ? 'border-destructive ring-destructive/20' : ''}`}
            placeholder="jane@example.com"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Education Level</label>
            <select
              value={data.educationLevel}
              onChange={(e) => setData({ ...data, educationLevel: e.target.value })}
              className={`glass-input appearance-none border-foreground/20 focus:border-primary ${errors.educationLevel ? 'border-destructive ring-destructive/20' : ''} ${!data.educationLevel && 'text-foreground/40'}`}
            >
              <option value="" disabled>Select level</option>
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's Degree</option>
              <option value="Master's">Master's Degree</option>
              <option value="PhD">PhD</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Current Job Status</label>
            <select
              value={data.jobStatus}
              onChange={(e) => setData({ ...data, jobStatus: e.target.value })}
              className={`glass-input appearance-none border-foreground/20 focus:border-primary ${errors.jobStatus ? 'border-destructive ring-destructive/20' : ''} ${!data.jobStatus && 'text-foreground/40'}`}
            >
              <option value="" disabled>Select status</option>
              <option value="Employed Full-Time">Employed Full-Time</option>
              <option value="Employed Part-Time">Employed Part-Time</option>
              <option value="Self-Employed">Freelancer / Self-Employed</option>
              <option value="Student">Student</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Age</label>
            <input
              type="number"
              value={data.age}
              onChange={(e) => setData({ ...data, age: parseInt(e.target.value) || "" })}
              className={`glass-input border-foreground/20 focus:border-primary ${errors.age ? 'border-destructive ring-destructive/20' : ''}`}
              placeholder="e.g. 28"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground ml-1">Country</label>
            <input
              type="text"
              value={data.country}
              onChange={(e) => setData({ ...data, country: e.target.value })}
              className={`glass-input border-foreground/20 focus:border-primary ${errors.country ? 'border-destructive ring-destructive/20' : ''}`}
              placeholder="e.g. United States"
            />
          </div>
        </div>

        <div className="pt-4 relative z-10">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white/100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(216,138,61,0.3)] active:scale-[0.98]"
          >
            Start Assessment <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </motion.div>
  );
}
