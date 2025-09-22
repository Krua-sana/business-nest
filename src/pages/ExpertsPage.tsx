import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ProgramNavigation from "@/components/ProgramNavigation"; // reuse simple nav
import React from "react";
import Footer from '@/components/Footer';

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
  {
    name: "Ana Zonina",
    field: "Idea validation, product-market fit and business model, Lean Startup, product marketing, business development.",
    photo: "/images/experts/Ana-Zonina.jpg",
    linkedin: "https://www.linkedin.com/in/anastasiazonina/",
  },
  {
    name: "Guido Groeneweg",
    field: "Sr. Enterprise Architect @ NTT DATA | High-Tech & Telecom | Digital Leadership, Innovation, Coaching, Enterprise Architecture, Management.",
    photo: "/images/experts/Guido-Groeneweg.jpg",
    linkedin: "https://www.linkedin.com/in/guidogroeneweg/",
  },
  {
    name: "Yolima Grandas",
    field: "Founder of International Creative Women and Thryves, serial entrepreneur, business developer, and mentor.",
    photo: "/images/experts/Yolima-Grandas.png",
    linkedin: "https://thryves.nl/",
  },
];

export default function ExpertsPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* Top Navigation */}
      <ProgramNavigation />

      {/* Hero Banner */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Meet Our Experts
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Behind every successful business, there are mentors, advisors,
              and experts. At Business Nest, we bring you industry leaders who
              share their experience, knowledge, and networks to help you grow
              your venture faster and stronger.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow">
            <img
              src="/images/experts/hero-expert.jpg"
              alt="Expert speaking to an audience"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Experts Grid */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Our Program Experts
        </h2>
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
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Want to become an expert?
          </h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            We’re always looking for experienced mentors and industry leaders to
            support our community. Join us and help early-stage founders grow.
          </p>
          <div className="mt-6">
            <a href="mailto:team@business-nest.nl?subject=Expert%20Application">
              <Button size="lg">Apply as Expert</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Filter (reuse the one from program page) 
      <section className="mx-auto max-w-6xl px-4 py-16">
        {/* If you already have a Filter component, import and use it here 
        {/* Example placeholder: 
        <div className="rounded-xl border p-6 text-center text-muted-foreground">
          [ Filter component goes here ]
        </div>
      </section>*/}
      {/* Replace with your MAINfooter component if available */}
      <Footer />
    </div>
  );
}
