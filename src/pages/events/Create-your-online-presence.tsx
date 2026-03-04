import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ChevronDown, TrendingUp, CheckCircle, Sparkles, ChevronUp, Users, Calendar, FileText, Coffee, BookOpen, Award, MessageSquare, Clock, Lightbulb, Rocket, Target, Brain, Briefcase, Euro, Network, Trophy, Link, PartyPopper } from "lucide-react";
import ProgramNavigation from "@/components/ProgramNavigation";
import { useEffect, useState } from "react";

const CreateYourOnlinePresence = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const features = [
    
    {
      icon: <Target className="h-8 w-8" />,
      title: "A tested value proposition",
      description: "Test your value proposition before investing time and money.",
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "A realistic next-step roadmap",
      description: "Design a clear, actionable roadmap for your transition journey.",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Renewed confidence grounded in evidence",
      description: "Make informed decisions with a clear understanding of your financial reality.",
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "A sustainable direction aligned with Dutch reality",
      description: "Navigate your transition with a strategy that fits the Dutch market and regulations.",
    }
  ];

  return (
    <div className="bg-white text-gray-800">
      {/* Navigation */}
      <ProgramNavigation />

      {/* HERO */}
      <section className="pt-32 pb-20 bg-gray-50 text-black">
        <div className="container mx-auto px-6 lg:px-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Create <span className="text-orange-400">Your Presence</span> Online
            </h1>

            <p className="mt-6 text-lg text-black">
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
                <span>Date: 13 December 2025</span>
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
              src="/images/March workshop Your presence online.png"
              alt="Creator Your presence online"
              className="rounded-xl shadow-xl w-full"
            />
          </div>
        </div>
      </section>

      {/* ABOUT WORKSHOP */}
      <section className="py-20 bg-white-100">
        <div className="container mx-auto px-6 lg:px-20">

          <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About this <span className="text-electra-blue">Workshop</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            This is not a motivational event.
 It is a structured working session for professionals who want evidence before risk. 
          </p>
        </div>
        <div className="grid md:grid-cols-1 gap-10">
            <p className="text-xl text-gray-700">After job loss or failed business attempts, urgency can lead to rushed decisions.
<b> The Financial Transition Lab</b> lab is designed to replace chaos with structure.
</p>
            <p className="text-xl text-gray-700">
              
              It is a hands-on workshop designed for professionals navigating career transitions. 
              <br/>Whether you're considering entrepreneurship, freelancing, or a new industry, this lab provides the tools and insights to create a sustainable income strategy. Through interactive exercises, you'll calculate your break-even point, validate demand early, and design a realistic roadmap grounded in Dutch regulations. Join us to turn uncertainty into opportunity and build a financially secure future.
            </p>
           <p className="text-xl text-gray-700">Over four hours, you will:
            <ul className="list-disc pl-6">
              <li>Build your personal break-even model</li>
              <li>Map a realistic income-replacement timeline</li>
              <li>Validate your value proposition before investing</li>
              <li>Understand Dutch VAT, pricing, and compliance basics</li>
              <li>Design a responsible Go / Pivot / Stop decision</li>
            </ul>
</p>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-gray-50 px-20 py-20 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            What you’ll get out of this program
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From idea to launch, we provide everything you need to build a successful business. 
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer ${
                  hoveredCard === index ? 'bg-orange-50 border-orange-200' : ''
                }`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardHeader className="text-center">
                  <div className="text-center">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors ${
                    hoveredCard === index ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {feature.icon}
                  </div></div>
                  <CardTitle className="text-xl font-bold text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
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
                img: "/images/testimonial1.jpeg",
              },
              {
                name: "Serhat Altin",
                text: "Great energy, fast learning, and very practical!",
                img: "/images/testimonial2.jpeg",
              },
              {
                name: "Simeon Dimov",
                text: "We ended with a fully functional prototype — impressive.",
                img: "/images/testimonial3.jpeg",
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
            ].map((item) => (
              <li className="flex items-start gap-3">
                
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

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Kateryna Saprunova",
                img: "/images/moderator-kateryna.jpg",
                text: "Sr. UX/UI Designer & Front-end Developer with extensive workshop facilitation experience.",
                linkedin: "https://www.linkedin.com/in/saprunova-kateryna/",
              },
              {
                name: "Kris Smirnova",
                img: "/images/moderator-kris.jpeg",
                text: "UX/CX Researcher and AI facilitator bringing data-driven insights to innovation.",
                linkedin: "https://www.linkedin.com/in/krissmir/",
              },
              {
                name: "Simeon Dimov",
                img: "/images/experts/Simeon-Dimov.jpg",
                text: "Co-Founder of Synthgen, synthetic AI data. Full-stack developer and AI mentor.",
                linkedin: "https://www.linkedin.com/in/simeon-dimov-bb429016b/",
              }
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
              "g9.jpeg",
              "g10.jpeg",
              "g11.jpeg",
              "g12.jpeg",
              "g13.jpeg",
              "g14.jpeg",
              "g15.jpeg",
              "g16.jpeg",
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
                src={`/images/${img}`}
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

export default CreateYourOnlinePresence;
