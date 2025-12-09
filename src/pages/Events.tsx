import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Calendar, MapPin, User, Sparkles, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function Events() {
  return (
    <>
      <Navigation />

      {/* HERO SECTION */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT – WORKSHOP DETAILS */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Upcoming Events: <span className="text-orange-600">AI as a Co-Creator</span>
            </h1>

            <ul className="space-y-4 text-gray-700 text-lg">
              <li className="flex items-center gap-3">
                <Sparkles className="text-orange-500 w-6 h-6" />
                Topic: AI as your creative and strategic partner
              </li>
              {/*<li className="flex items-center gap-3">
                <User className="text-orange-500 w-6 h-6" />
                Speaker: Anna Mironova, UX & AI Specialist
              </li>*/}
              <li className="flex items-center gap-3">
                <Calendar className="text-orange-500 w-6 h-6" />
                Date & Time: 13 December, Saturday, 13:00–17:00
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-orange-500 w-6 h-6" />
                Location: Microlab, Eindhoven
              </li>
              <li className="flex items-center gap-3">
                <DollarSign className="text-orange-500 w-6 h-6" />
                Price: €27,50 (drinks & snacks included)
              </li>
            </ul>
          </div>

          {/* RIGHT – IMAGE */}
          <div className="w-full h-80 md:h-full bg-gray-300 rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/ai-workshop-cover.gif" // Update with your image path
              alt="AI Workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* WORKSHOP GRID */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-3xl font-bold text-gray-800">Upcoming Events</h2>
          <p className="text-gray-600 mt-2">Explore our expert-led sessions</p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {/* Tile 1 */}
          <Link to="/events/ai-co-creator">
            <div className="bg-gray-50 border rounded-xl p-6 hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer">
              <img
                src="/images/ai-workshop-cover.gif"
                className="rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">AI as a Co-Creator</h3>
              <p className="text-gray-600 text-sm mt-2">Full-day creativity + AI practice</p>
            </div>
          </Link>
          <Link to="/events/quality-assurance-ai">
            <div className="bg-gray-50 border rounded-xl p-6 hover:-translate-y-2 hover:shadow-lg transition-all cursor-pointer">
              <img
                src="/images/QA_160126.png"
                className="rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800">QA for the AI dev products</h3>
              <p className="text-gray-600 text-sm mt-2">StrijCS 16 January 2026 | 19:00-21:00</p>
            </div>
          </Link>

          {/* Placeholder tiles for future workshops 
          {[1,2,3,4,5].map((i) => (
            <div
              key={i}
              className="bg-gray-50 border rounded-xl p-6 opacity-60 cursor-not-allowed"
            >
              <div className="w-full h-40 bg-gray-200 rounded-md mb-4"></div>
              <h3 className="text-xl font-bold text-gray-800">Coming Soon</h3>
              <p className="text-gray-600 text-sm mt-2">New workshops are in preparation</p>
            </div>
          ))}*/}
        </div>
      </section>

      {/* SUBMIT WORKSHOP CTA 
      <section className="py-20 px-6 bg-orange-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Want to Host Your Workshop?
          </h2>
          <p className="text-gray-700 mb-8">
            Do you have an idea or expertise that can help our community?
          </p>

          <a
            href="https://forms.gle/your-google-form"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
          >
            Submit Your Workshop Idea
          </a>
        </div>
      </section>*/}

      {/* CORE VALUES (STATISTICS) */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10 text-center">
          
          <div>
            <div className="text-4xl font-bold">7</div>
            <div className="text-gray-300 mt-2">Events Hosted</div>
          </div>

          <div>
            <div className="text-4xl font-bold">230</div>
            <div className="text-gray-300 mt-2">Participants</div>
          </div>

          <div>
            <div className="text-4xl font-bold">450+</div>
            <div className="text-gray-300 mt-2">Community Members</div>
          </div>

          <div>
            <div className="text-4xl font-bold">4.7 ★</div>
            <div className="text-gray-300 mt-2">Meetup Rating</div>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
