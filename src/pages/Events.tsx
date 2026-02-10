import ProgramNavigation from "@/components/ProgramNavigation"; // reuse simple nav
import Footer from "@/components/Footer";
import { Card, CardContent} from "@/components/ui/card";
import { Calendar, Users, MapPin, Sparkles, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const Events = () => {
  const events = [
    {
      title: "AI as a Co-Creator",
      date: "13 December 2025",
      location: "Microlab, Eindhoven",
      link: "/events/ai-co-creator",
      img: "/images/ai-workshop-cover.gif",
    },
    {
      title: "Quality Assurance for AI",
      date: "16 January 2026",
      location: "Business Nest",
      link: "/events/quality-assurance-ai",
      img: "/images/QA_160126.png",
    },
    // Add more events here
  ];

  return (
    <div className="bg-white text-gray-800">
      <ProgramNavigation />

       {/* HERO SECTION */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT – WORKSHOP DETAILS */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Upcoming Events: <span className="text-orange-600">Ditch the Nerves</span>
            </h1>

            <ul className="space-y-4 text-gray-700 text-lg">
              <li className="flex items-center gap-3">
                <Sparkles className="text-orange-500 w-6 h-6" />
                Topic: Confident Presentation Skills For Entrepreneurs.
              </li>
              {/*<li className="flex items-center gap-3">
                <User className="text-orange-500 w-6 h-6" />
                Speaker: Anna Mironova, UX & AI Specialist
              </li>*/}
              <li className="flex items-center gap-3">
                <Calendar className="text-orange-500 w-6 h-6" />
                Date & Time: 7 March 2026, 14:00–17:00
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="text-orange-500 w-6 h-6" />
                Location: CKE, Eindhoven
              </li>
              <li className="flex items-center gap-3">
                <DollarSign className="text-orange-500 w-6 h-6" />
                Price: €49 (drinks & snacks included)
              </li>
            </ul>
          </div>

          {/* RIGHT – IMAGE */}
          <div className="w-full h-80 md:h-full bg-gray-300 rounded-xl overflow-hidden shadow-lg">
            <img
              src="/images/Ditch the Nerves.png" // Update with your image path
              alt="Power of Public Speaking Workshop"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* MAIN CONTENT WITH SIDEBAR */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-20 grid md:grid-cols-3 gap-10">

          {/* LEFT COLUMN — EVENT CARDS */}
          <div className="md:col-span-2 space-y-10">
            <h2 className="text-3xl font-bold mb-10">Past Events</h2>
            <div className="grid sm:grid-cols-2 gap-10">
              {events.map((event, index) => (
                <Link to={event.link} key={index}>
                  <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                    <CardContent className="p-0">
                      <img
                        src={event.img}
                        alt={event.title}
                        className="rounded-t-lg w-full h-48 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>

                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                          <Calendar size={18} className="text-orange-500" />
                          <span>{event.date}</span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <MapPin size={18} className="text-orange-500" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — GOOGLE CALENDAR */}
          <aside className="md:col-span-1">
            <div className="sticky top-32">
              <h3 className="text-xl font-bold mb-4">Event Calendar</h3>

              <iframe
                src="https://calendar.google.com/calendar/embed?src=c35502fa34cdda9f4096fe13564179c4d98196c5f2d751a66995280476e537b9%40group.calendar.google.com&ctz=UTC"
                style={{ border: 0 }}
                className="w-full h-[600px] rounded-lg shadow-md"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
          </aside>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Events;
