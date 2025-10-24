import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Rocket,
  Lightbulb,
  Users,
  Target,
  BookOpen,
  Brain,
  Briefcase,
  Network,
  Trophy,
  Euro,
} from "lucide-react";
import React from "react";
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

export default function TenSaturdaysPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Replace with your MAIN header component if available */}
      <ProgramNavigation />

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">10  <span className="text-orange-600">Saturdays </span> Program</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              A focused incubation journey for early-stage founders. Meet peers, learn from experts,
              and build momentum across ten themed Saturdays.
            </p>
            <p className="mt-2 text-muted-foreground">
              You’ll leave with clarity, a practical roadmap, and a stronger community around your idea.
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
            {/* Place your image into /public/images/hero.jpg or update the src below */}
            <img
              src="/lovable-uploads/co-create_with_experts.png"
              alt="Business Nest 10 Saturdays program"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
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

      {/* Pricing */}
      <section id="apply" className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Find the Right Program <span className="text-orange-600"> for You</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Free access to community. Privat group with the materials. Ten themed Saturdays. Hands-on exercises, expert open Q&A hours, and peer reviews in each session.
          </p>
        </div>
        
        <div className="mt-8 grid md:grid-cols-1 gap-6">
          {/*<Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-2xl">Hatch Edition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold">€500</div>
              <div className="text-xl text-gray-600 text-muted-foreground">Our pilot program, for pioneers testing the format</div>
              <ul className="mt-4 mb-4 space-y-2 text-sm">
                <li>• 10 Saturdays</li>
                <li>• 10-15 participants</li>
                <li>• Experts consultancy on Saturdays</li>
                <li>• Experts consultancy during open hours</li>
                <li>• All materials in digital and printed</li>
                <li>• Private group within community</li>
                <li>• Catering during Saturdays</li>
              </ul>
              <a href="#apply"><Button className="mt-4 w-full">Apply for Pilot</Button></a>
            </CardContent>
          </Card>*/}
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="text-4xl font-bold">Flight Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {/*<div className="text-2xl">Start at 25 October 2025</div>*/}
              <div className="text-xl text-gray-600 text-muted-foreground">Tailored for unemployed partners of immigrants, building new opportunities in a supportive community.</div>
              <ul className="mt-4 mb-4 space-y-2 text-sm">
                <li>• The price €1000 </li>
                <li>• Duration is 10 Saturdays</li>
                <li>• 10-15 participants</li>
                <li>• Experts consultancy on Saturdays</li>
                <li>• Experts consultancy during open hours</li>
                <li>• All materials in digital and printed</li>
                <li>• Private group within community</li>
                <li>• 2 promotions during/after the program</li>
                <li>• Catering during Saturdays</li>
              </ul>
              <a href="#apply"><Button 
              onClick={() => window.location.href = 'https://forms.gle/3wNJf2ChEezUZYnFA'}
              className="mt-4 w-full">Apply for Program</Button></a>
            </CardContent>
          </Card>
          {/*<Card>
            <CardHeader>
              <CardTitle className="text-2xl">Flight Path</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-4xl font-bold">€1000</div>
              <div className="text-xl text-gray-600 text-muted-foreground">Our core 10 Saturdays journey, guiding you from idea to final pitch.</div>
              <ul className="mt-4 space-y-2 text-sm">
                <li>• 10 Saturdays</li>
                <li>• 10-15 participants</li>
                <li>• Experts consultancy on Saturdays</li>
                <li>• Experts consultancy during open hours</li>
                <li>• All materials in digital and printed</li>
                <li>• Private group within community</li>
                <li>• Catering during Saturdays</li>
                <li>• 2 promotions during/after the program</li>
              </ul>
              <Button className="mt-4 w-full" variant="secondary">Coming soon</Button>
            </CardContent>
          </Card>*/}
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
                onClick={() => window.location.href = 'https://chat.whatsapp.com/JhUPSrzHIk92iCm4kzdsRL'}
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
