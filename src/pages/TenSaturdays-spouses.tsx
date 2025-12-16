import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, TrendingUp, CheckCircle, Sparkles, ChevronUp, Users, Calendar, FileText, Coffee, BookOpen, Award, MessageSquare, Clock, Lightbulb, Rocket, Target, Brain, Briefcase, Euro, Network, Trophy, Link, PartyPopper } from "lucide-react";
// import React from "react";
import React, { useState } from "react";

import ProgramNavigation from "@/components/ProgramNavigation";

import Footer from '@/components/Footer';

// If you already have SiteHeader / SiteFooter components in your project,
// you can import and use them instead of the placeholders below.
// import SiteHeader from "@/components/SiteHeader";
// import SiteFooter from "@/components/SiteFooter";

function PlaceholderHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a href="/" className="font-semibold text-xl">Business Nest</a>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="/" className="hover:underline">Home</a>
          <a href="/program" className="hover:underline">10 Saturdays</a>
          <a href="#apply" className="hover:underline">Apply</a>
        </nav>
      </div>
    </header>
  );
}

function PlaceholderFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Business Nest. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="/" className="hover:underline">Home</a>
          <a href="/program" className="hover:underline">10 Saturdays</a>
          <a href="#apply" className="hover:underline">Apply</a>
        </div>
      </div>
    </footer>
  );
}

const sessions = [
  { title: "Problem discovery and  Idea Generation", desc: "Identify concrete, real-world problems worth solving and map possible solutions.", Icon: Lightbulb },
  { title: "Customer Discovery", desc: "Understand customer beyond demographics, craft correspondent offer, and insure market fit.", Icon: Users },
  { title: "Prototyping & MVP, Usability Testing", desc: "Create Prototype or MVP and test it with potencial customers.", Icon: Rocket },
  { title: "Business Model, Legal & businesses environment in NL", desc: "Business model framework and business plan, cultural traits of business environment in NL.", Icon: Target },
  { title: "Business as a lifestyle, Personal business developmen", desc: "Align your strengths and passions with your business idea to build authentic growth.", Icon: BookOpen },
  { title: "Mid-way pitch, Revenue model", desc: "Learn how to structure your business for sustainable income and scalability.", Icon: Brain },
  { title: "Marketing & Branding, Sales, Acquisition Strategies", desc: "Craft a brand identity and strategy that connects with your target audience.", Icon: Briefcase },
  { title: "Financial Planning, Funding Options, Roadmap", desc: "Understand startup finances, explore funding opportunities, and map your business journey.", Icon: Euro },
  { title: "Pitch Deck Development & Storytelling", desc: "Build a compelling pitch deck and learn how to tell your startup story with impact.", Icon: Network },
  { title: "Pitching & Experts feedback", desc: "Present your business to a jury, receive feedback, and sharpen your investor-ready pitch.", Icon: Trophy },
];



export default function TenSaturdaysSpouses() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const modules = [
    { 
      title: "Saturday 1: Problem discovery and Idea Generation", 
      subtitle: "Identify real-world problems worth solving", 
      topics: ["How to look up for problems and ideas", "How to check if there is a market for your idea", "Business Model Canvas to structure your process", "AI as a co-creator, practical prompting"], 
      month: "OCT", day: "25"
    },
    { title: "Saturday 2: Customer Discovery", subtitle: "Know your customer", 
      topics: ["How to choose and build a customer profile", "Jobs to be Done framework", "How to test the concept with a relevant audience", "Interview exercises"], 
      month: "NOV", day: "01"
    },
    { title: "Saturday 3: Prototyping & MVP, Usability Testing", subtitle: "Create a tangible product to test", 
      topics: ["How to build your product sample: digital or physical", "MVP or Prototype?", "How to create prototypes with AI tools", "How to publish your digital product online", "Usability testing basics"], 
      month: "NOV", day: "08"
    },
    { title: "Saturday 4: Business Model, Legal & businesses environment in NL", subtitle: "Secure your idea", 
      topics: ["Legal & Bureaucratic “Must-Knows", "VAT & taxation basics", "Permits & sector-specific licenses (food, health, fintech, etc.)", "NL Business and cultural landscape"], 
      month: "NOV", day: "15"
    },
    { title: "Saturday 5: Business as a lifestyle", subtitle: "Align your strengths and passions with your business idea", 
      topics: ["Business and exit strategies", "Decision making framework", "Stress management"], 
      month: "NOV", day: "22"
    },
    { title: "Saturday 6: Mid-way pitch, Revenue model", subtitle: "Learn how to structure your business for sustainable income and scalability", 
      topics: ["Who pays you?", "For what exactly customers pays you?", "How do they pay (once, recurring, indirect)?", "How much should be charged and why?"], 
      month: "JAN", day: "17"
    },
    { title: "Saturday 7: Marketing & Branding, Sales, Acquisition Strategies", subtitle: "Craft a brand identity and strategy that connects with your target audience", 
      topics: ["Basics of brand building & communication", "Sales: mindset and basics"], 
      month: "JAN", day: "24"
    },
    { title: "Saturday 8: Financial Planning, Funding Options, Roadmap", subtitle: "Understand startup finances, explore funding opportunities, and map your business journey", 
      topics: ["How to calculate costs to start the business", "Where to look for investments", "Roadmap planning (short / long-term)"], 
      month: "JAN", day: "31"
    },
    { title: "Saturday 9: Pitch Deck Development & Storytelling", subtitle: "Build a compelling pitch deck and learn how to tell your startup story", 
      topics: ["Storytelling", "How to find your voice and deliver the message", "Preparation of the pitch deck or presentation", "Tips about different types of investors and what they pay attention to", "How to present yourself and act in the process"],
      month: "FEB", day: "07"
    },
    { title: "Saturday 10: Pitching day!", subtitle: "Present your progress", topics: ["Final presentations", "Receive the feedback and recommendations", "Next steps & alumni benefits", "Celebrate with us!"], 
      month: "FEB", day: "14"
    },
  ];
  
  const toggleModule = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  const visibleModules = showAll ? modules : modules.slice(0, 2);

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const features = [
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Idea Validation",
      description: "Transform your raw ideas into viable business concepts through our proven validation framework",
      benefits: ["Market research guidance", "Customer interviews", "MVP development"]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Business Strategy",
      description: "Build a solid foundation with comprehensive business planning and strategic guidance",
      benefits: ["Business model canvas", "Financial planning", "Go-to-market strategy"]
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI as a Co-creator",
      description: "Speed up your business design process with AI-powered tools and techniques",
      benefits: ["Learn prompting on a go", "Minimize costs", "Get working prototypes faster"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Support",
      description: "Connect with like-minded entrepreneurs and access ongoing mentorship",
      benefits: ["Peer networking", "Expert mentorship", "Accountability partners"]
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Growth Acceleration",
      description: "Scale your business with advanced strategies and industry insights",
      benefits: ["Marketing automation", "Sales optimization", "Scaling strategies"]
    }
  ];

  // Example data — replace with your real experts
const experts = [
  {
    name: "Joris Moons",
    field: "Business Development in all of its aspects, Product-market fit & Go-to-market, Strategy definition.",
    photo: "/images/experts/Joris-Moons.jpg",
    linkedin: "https://www.linkedin.com/in/jorismoons/",
  },
  {
    name: "Suzanne Donker",
    field: "Catalyst in Marketing Communication. Expertise: positioning, branding, reach the correct target groups.",
    photo: "/images/experts/Suzanne-Donker.jpg",
    linkedin: "https://www.linkedin.com/in/suzannedonker/",
  },
  {
    name: "Dr. Anna Ezerskiy MBA",
    field: "I help founders turn breakthrough ideas into viable businesses by bridging technology with strategy, funding, and go-to-market execution.",
    photo: "/images/experts/Anna-Ezerskiy.jpg",
    linkedin: "https://www.linkedin.com/in/anna-ezerskiy/",
  },
];

  return (
    <div className="min-h-dvh flex flex-col">
      {/* Replace with your MAIN header component if available */}
      <ProgramNavigation />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">10 <span className="text-orange-600">Saturdays </span> Spouses</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Migrant Spouses 10 Saturdays program is a practical incubator program for aspiring founders, makers, and creatives who want to turn their ideas into businesses while building a new life in the Netherlands.
            </p>
            <p className="mt-2 text-muted-foreground">
              It was designed specifically to support spouses and partners of highly skilled migrants in launching successful businesses in the Netherlands.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#apply">
                <Button size="lg">Apply for the Program</Button>
              </a>
              <a href="#program-outline">
                <Button variant="outline" size="lg">See the Schedule</Button>
              </a>
            </div>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow">
            {/* Place your image into /images/hero.jpg or update the src below */}
            <img
              src="/lovable-uploads/program-spouses.jpeg"
              alt="Business Nest 10 Saturdays program"
              className="h-full w-full object-cover"
              loading="eager"
            />
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
            Our comprehensive program is designed specifically for migrants spouses first-time founders.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
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
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        
      </section>


      {/* Program Outline */}
      <section id="program-outline" className="py-20 bg-gradient-to-b from-orange-50 to-amber-50 relative">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                What we’ll <span className="text-orange-600">cover</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ten themed Saturdays. Hands-on exercises, expert Q&A, and peer reviews in each session.
          </p>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto px-4">
          {sessions.map(({ title, desc, Icon }, idx) => (
            <Card key={idx} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border">
                  <Icon className="h-5 w-5" />
                </span>
                <CardTitle className="text-lg">{String(idx + 1).padStart(2, "0")} — {title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Course Syllabus */}
      <section className="bg-gray-50 py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Program syllabus
          </h2>
          <p className="text-gray-600">
          10 live offline Saturday sessions • 9 lessons • 8 hours each
        </p>
        </div>
    <div className="flex justify-between items-center mb-8">
      
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        {showAll ? "Collapse all modules" : "Expand all modules"}
      </button>
    </div>

    <div className="space-y-4">
      {visibleModules.map((mod, i) => (
        <div
          key={i}
          className="border rounded-lg overflow-hidden shadow-sm bg-white"
        >
          {/* Accordion Header */}
          <button
            className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold hover:bg-gray-100"
            onClick={() => toggleModule(i)}
          >
            <div className="flex items-center gap-4">
              {/* 📅 Date Badge */}
              <div className="w-14 h-14 rounded-lg border bg-white flex flex-col items-center justify-center shadow-sm">
                <span className="text-xs uppercase text-gray-500 font-medium leading-none">
                  {mod.month}
                </span>
                <span className="text-xl font-bold text-gray-800 leading-none">
                  {mod.day}
                </span>
              </div>

              {/* Title + Subtitle */}
              <div>
                <div className="text-lg font-semibold">{mod.title}</div>
                <div className="text-sm text-gray-500">{mod.subtitle}</div>
              </div>
            </div>

            {expanded === i ? (
              <ChevronUp className="text-gray-400" />
            ) : (
              <ChevronDown className="text-gray-400" />
            )}
          </button>

          {/* Accordion Body */}
          {expanded === i && (
            <div className="px-8 pb-4 text-gray-700">
              <ul className="list-disc pl-6 space-y-1">
                {mod.topics.map((topic, j) => (
                  <li key={j}>{topic}</li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-gray-500">Lunch included 🍽️</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Experts Grid */}
            <section className="mx-auto max-w-6xl px-4 py-16">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                    Meet our<span className="text-orange-600"> Experts</span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Learn from seasoned entrepreneurs and industry experts who have been where you are and successfully built thriving businesses from the ground up.
              </p>
             </div>
             
              <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {experts.map((exp, idx) => (
                  <Card
                    key={idx}
                    className="group overflow-hidden border hover:shadow-lg transition-shadow"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={exp.photo}
                        alt={exp.name}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{exp.name}</CardTitle>
                      <p className="text-muted-foreground">{exp.field}</p>
                    </CardHeader>
                    <CardContent>
                      <a
                        href={exp.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline"
                      >
                        LinkedIn Profile
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center py-10">
                <Button 
                  onClick={() => window.location.href = '/experts'}
                  size="lg" 
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
                >
                  Meet all our Expert
                </Button>
              </div>
            </section>


      {/* Pricing */}
      <section id="apply" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                It is the Program <span className="text-orange-600"> for You</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Free access to community. Privat group with the materials. Ten themed Saturdays. Hands-on exercises, expert open Q&A hours, and peer reviews in each session.
          </p>
        </div>
        
        <div className="mt-8 grid md:grid-cols-1 gap-6">
      
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">Spouses Wings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-2xl">Start at 25 October 2025</div>
              <div className="text-xl text-gray-600 text-muted-foreground">Tailored for unemployed partners of immigrants, building new opportunities in a supportive community.</div>
              <ul className="mt-4 mb-4 space-y-2 text-sm">
                <li className="flex items-center gap-3"><Users /> Program for immigrant spouses</li>
                <li className="flex items-center gap-3"><Award /> Special price €500 (excl.VAT)</li>
                <li className="flex items-center gap-3"><Calendar /> 10 Saturdays • 10–15 participants</li>
                <li className="flex items-center gap-3"><MessageSquare /> Experts consultancy (Saturdays & open hours)</li>
                <li className="flex items-center gap-3"><FileText /> Digital & printed materials</li>
                <li className="flex items-center gap-3"><BookOpen /> Private community group</li>
                <li className="flex items-center gap-3"><Coffee /> Drinks and lunch during 9 sessions day</li>
                <li className="flex items-center gap-3"><PartyPopper /> Drinks on the Pitch day</li>
              </ul>
              <a href="#apply"><Button 
              onClick={() => window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLScHiDPsANGTkDhJR1mh9RAtNsjUeg7eWctAvfi8pXaKpkRYBw/viewform'}
              className="mt-4 w-full">Apply for Program</Button></a>
            </CardContent>
          </Card>
      
        </div>
      </section>

      {/* Testimonials 
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">What founders say</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {[
            {
              quote:
                "The Saturdays gave me momentum. I launched my MVP in week 6 and closed my first paying customer by week 9.",
              name: "Anita, EdTech founder",
            },
            {
              quote:
                "Practical, friendly, and focused. The mentors were hands-on and the cohort support was invaluable.",
              name: "Mark, Food startup",
            },
            {
              quote:
                "Clarity, structure, and community—exactly what I needed to move from idea to action.",
              name: "Sara, Wellness app",
            },
          ].map((t, i) => (
            <Card key={i} className="h-full">
              <CardContent className="pt-6">
                <p className="italic">“{t.quote}”</p>
                <div className="mt-4 text-sm font-medium">{t.name}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
*/}
      {/* CTA */}
      <section className="py-20 bg-gradient-to-b from-orange-50 to-amber-50 relative ">
              <div className="bg-card rounded-2xl border p-8 md:p-12 text-center mx-auto max-w-6xl px-4 py-16 ">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Not ready?</h2>
                <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
                  Join our Eindhoven Entrepreneurs community — explore, connect, and get inspired!
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  {/* Replace the href with your MAINapplication link (form or mailto) */}
                  {/*<a href="mailto:team@business-nest.nl?subject=10%20Saturdays%20Application">*/}
                    <Button size="lg"
                      onClick={() => window.location.href = 'https://forms.gle/UFxsHrAeHNRuXAN17'}
                    >
                      Join the Community
                      </Button>
                  {/*</a>*/}
                 
                </div>
              </div>
            </section>

      {/* Replace with your MAINfooter component if available */}
      <Footer />
    </div>
  );
}
