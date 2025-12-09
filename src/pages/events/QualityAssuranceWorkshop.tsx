import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Calendar,
  MapPin,
  User,
  Check,
  ShieldCheck,
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";

export default function QualityAssuranceWorkshop() {
  return (
    <>
      <Navigation />
      

      {/* HERO SECTION */}
      <section className="pt-32 pb-20 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-20 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight"><span className="text-orange-400">QA</span> Approach <br/>for <span className="text-orange-400">AI-Based</span> Apps</h1>
            <p className="mt-6 text-lg text-gray-300">
              Building Trust and Reliability in Your AI Applications.
            </p>

            <ul className="mt-8 space-y-4 text-lg text-gray-300">
              <li className="flex items-center gap-3">
                <ShieldCheck className="text-orange-400 w-6 h-6" />
                Discover the unique quality assurance challenges posed by AI technologies.
              </li>
              <li className="flex items-center gap-3">
                <BrainCircuit className="text-orange-400 w-6 h-6" />
                Understand why traditional software testing alone is insufficient for AI applications.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-orange-400 w-6 h-6" />
                Learn practical QA approaches tailored specifically for AI-based apps.
              </li>
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full h-80 md:h-full bg-gray-700 rounded-xl shadow-lg overflow-hidden">
            <img
              src="/images/QA_160126.png" // add your image in /images
              alt="AI Quality Assurance Workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* WORKSHOP DETAILS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Workshop Details</h2>

          <ul className="space-y-4 text-gray-700 text-lg">
            <li className="flex items-center gap-3">
              <User className="text-orange-500 w-6 h-6" />
              Speaker: <span className="font-semibold">Simons Janine</span>
            </li>
            <li className="flex items-center gap-3">
              <Calendar className="text-orange-500 w-6 h-6" />
              Date: <span className="font-semibold">16 January 2026</span> — 19:00 to 21:00
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="text-orange-500 w-6 h-6" />
              Location: StrijpCS, Eindhoven
            </li>
          </ul>
          <p className="mt-8 text-gray-600">Unlock the secrets to reliable AI – essential QA for everyone building or managing AI-driven products!</p>

          <p className="mt-8 text-gray-600">
            This workshop is designed for startup founders and their team members and anyone involved in developing or deploying AI-based applications. If you are responsible for the quality, reliability, or trustworthiness of an AI product, or simply want to understand how to build robust AI solutions, this session is for you.
          </p>
          <h2 className="text-xl font-bold text-gray-800 mt-8 mb-4">What will you learn</h2>
          <ul className="list-disc space-y-2 text-gray-700 text-base">
            <li className="flex items-center gap-1">
              <Check className="text-orange-500 w-6 h-6" />
              Discover the unique quality assurance challenges posed by AI technologies.
            </li>
            <li className="flex items-center gap-1">
              <Check className="text-orange-500 w-6 h-6" />
              Understand why traditional software testing alone is insufficient for AI applications.
            </li>
            <li className="flex items-center gap-1">
              <Check className="text-orange-500 w-6 h-6" />
               Learn practical QA approaches tailored specifically for AI-based apps.
            </li>
            <li className="flex items-center gap-1">
              <Check className="text-orange-500 w-6 h-6" />
               Understand the skills to create a basic QA process suitable for your startup or organisation.
            </li>
            <li className="flex items-top gap-1">
              <Check className="text-orange-500 w-6 h-6" />
               Know when to seek professional help and how to develop a clear action plan for building trust and reliability in your AI product.
            </li>
          </ul>
        </div>
      </section>

      <Footer />
    </>
  );
}
