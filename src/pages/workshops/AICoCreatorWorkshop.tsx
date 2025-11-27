import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const AICoCreatorWorkshop = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Navigation */}
      <Navigation />

      {/* HERO */}
      <section className="pt-32 pb-20 bg-black text-white">
        <div className="container mx-auto px-6 lg:px-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              AI as a <span className="text-orange-400">Co-Creator</span> Workshop
            </h1>

            <p className="mt-6 text-lg text-gray-300">
              A fast-paced hands-on workshop that helps you turn an idea into a working MVP —
              with the power of AI and Design Thinking.
            </p>

            {/* Details */}
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <Clock className="text-orange-400" />
                <span>4-hour intensive workshop</span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-orange-400" />
                <span>Date: 13 December 2026</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-orange-400" />
                <span>Microlab, Eindhoven</span>
              </div>

              {/*<div className="flex items-center gap-3">
                <Users className="text-orange-400" />
                <span>Small group — 20 participants</span>
              </div>*/}
            </div>
          </div>

          <div>
            <img
              src="/images/ai-workshop-cover.gif"
              alt="AI Co-Creator Workshop Cover"
              className="rounded-xl shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL LEARN */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-14">
            What You Will <span className="text-orange-500">Learn</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-10">
            {[
              {
                title: "Discover",
                text: "Identify a business idea that fits your strengths and goals.",
                img: "/public/images/Discover.png",
              },
              {
                title: "Define",
                text: "Shape your MVP using structured AI-assisted thinking.",
                img: "/public/images/Define.png",
              },
              {
                title: "Build",
                text: "Create your first prototype in under 60 minutes using AI.",
                img: "/public/images/Build.png",
              },
              {
                title: "Pitch",
                text: "Present your concept confidently to a supportive group.",
                img: "/public/images/Pitch.png",
              },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-none bg-transparent text-center">
                <CardContent>
                  <img src={item.img} className="mx-auto w-24 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-yellow-100">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-14">Testimonials</h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Lara Kasapoglu",
                text: "In just 10 minutes, AI helped us design a full concept for a food delivery app!",
                img: "/public/images/testimonial1.jpeg",
              },
              {
                name: "Serhat Altin",
                text: "Great energy, fast learning, and very practical!",
                img: "/public/images/testimonial2.jpeg",
              },
              {
                name: "Simeon Dimov",
                text: "We ended with a fully functional prototype — impressive.",
                img: "/public/images/testimonial3.jpeg",
              },
            ].map((t, i) => (
              <Card key={i} className="p-6">
                <img
                  src={t.img}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white shadow-md object-cover"
                />
                <h3 className="text-lg font-semibold text-center">{t.name}</h3>
                <p className="mt-3 text-center text-gray-700">{t.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AGENDA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold mb-10">Agenda</h2>

          <ul className="space-y-4 text-lg">
            {[
              "13:00 – Arrival & welcome",
              "13:15 – Creative connection",
              "13:30 – Brainstorming your idea",
              "14:00 – Break",
              "14:15 – Crafting effective AI prompts",
              "14:45 – Prototyping session",
              "15:15 – Break",
              "15:30 – Pitch preparation",
              "16:00 – Pitch & feedback",
              "16:45 – Networking",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-orange-500 font-bold">{i + 1}.</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MODERATORS */}
      <section className="py-20 bg-yellow-100">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-12">Moderators</h2>

          <div className="grid md:grid-cols-2 gap-10">
            {[
              {
                name: "Kateryna Saprunova",
                img: "/public/images/moderator-kateryna.jpg",
                text: "Sr. UX/UI Designer & Front-end Developer with extensive workshop facilitation experience.",
                linkedin: "https://www.linkedin.com/in/saprunova-kateryna/",
              },
              {
                name: "Kris Smirnova",
                img: "/public/images/moderator-kris.JPEG",
                text: "UX/CX Researcher and AI facilitator bringing data-driven insights to innovation.",
                linkedin: "https://www.linkedin.com/in/krissmir/",
              },
            ].map((m, i) => (
              <Card key={i} className="p-6 text-center">
                <img
                  src={m.img}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                />
                <h3 className="text-xl font-bold">{m.name}</h3>
                <p className="mt-3 text-gray-700">{m.text}</p>
                <a
                  href={m.linkedin}
                  target="_blank"
                  className="text-orange-500 font-medium mt-4 inline-block"
                >
                  LinkedIn →
                </a>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold text-center mb-14">Gallery</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "g1.jpeg",
              "g2.jpeg",
              "g3.jpeg",
              "g4.jpeg",
              "g5.jpeg",
              "g6.jpeg",
              "g7.jpeg",
              "g8.jpeg",
            ].map((img, i) => (
              <img
                key={i}
                src={`/public/images/${img}`}
                className="rounded-lg shadow-md object-cover w-full h-48"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AICoCreatorWorkshop;
