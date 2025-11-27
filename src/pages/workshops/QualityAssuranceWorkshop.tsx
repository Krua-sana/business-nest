import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Calendar,
  MapPin,
  User,
  ShieldCheck,
  CheckCircle2,
  BrainCircuit,
} from "lucide-react";

export default function QualityAssuranceWorkshop() {
  return (
    <>
      <Navigation />

      {/* HERO SECTION */}
      <section className="bg-gray-900 text-white py-28 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-5xl font-bold mb-4">Quality Assurance for AI Development</h1>
            <p className="text-xl text-gray-300 mb-8">
              A deep-dive workshop into reliability, evaluation, ethics, and validation in modern AI systems.
            </p>

            <ul className="space-y-4 text-lg text-gray-300">
              <li className="flex items-center gap-3">
                <ShieldCheck className="text-orange-400 w-6 h-6" />
                Ensure reliability and robustness in AI systems
              </li>
              <li className="flex items-center gap-3">
                <BrainCircuit className="text-orange-400 w-6 h-6" />
                Understand biases, accuracy, evaluation techniques
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-orange-400 w-6 h-6" />
                Learn testing strategies for generative and predictive models
              </li>
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="w-full h-80 md:h-full bg-gray-700 rounded-xl shadow-lg overflow-hidden">
            <img
              src="/images/ai-quality-assurance.jpg" // add your image in /public/images
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
              Date: <span className="font-semibold">16 January 2026</span> — 10:00 to 17:00
            </li>
            <li className="flex items-center gap-3">
              <MapPin className="text-orange-500 w-6 h-6" />
              Location: Tbd, Eindhoven
            </li>
          </ul>

          <p className="mt-8 text-gray-600">
            This workshop is designed for developers, designers, and business leaders
            responsible for deploying or evaluating AI tools. You will learn how to test,
            validate, audit, and document AI systems for reliability and ethics.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}
