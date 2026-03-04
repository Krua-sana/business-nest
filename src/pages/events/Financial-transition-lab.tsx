import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, ChevronDown, TrendingUp, CheckCircle, Sparkles, ChevronUp, Users, Calendar, FileText, Coffee, BookOpen, Award, MessageSquare, Clock, Lightbulb, Rocket, Target, Brain, Briefcase, Euro, Network, Trophy, Link, PartyPopper } from "lucide-react";
import ProgramNavigation from "@/components/ProgramNavigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";


const FinancialTransitionLab = () => {
  const [hoveredExpert, setHoveredExpert] = useState<number | null>(null);
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
      <section className="pt-32 pb-20 bg-blue text-white">
        <div className="container mx-auto px-6 lg:px-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              The Financial <span className="text-yellow-400">Transition Lab</span> 
            </h1>

            <p className="mt-6 text-lg text-white-900">
             This 4-hour working lab helps professionals in career transition turn uncertainty into a structured income strategy. You will calculate your break-even point, validate demand early, and design a realistic roadmap grounded in Dutch regulations.
            </p>

            {/* Details */}
            <div className="mt-8 space-y-6">
              <div className="text-xl flex items-center gap-3">
                <Clock className="text-yellow-400" />
                <span>4-hour intensive workshop</span>
              </div>

              <div className="text-xl flex items-center gap-3">
                <Calendar className="text-yellow-400" />
                <span>Date: 21 March 2026</span>
              </div>

              <div className="text-xl flex items-center gap-3">
                <MapPin className="text-yellow-400" />
                <span>Strijp-CS, Eindhoven</span>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#secure" 
                className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition text-center"
            >
              Secure your seat
            </a>
                  </div>
            </div>
          </div>

          <div>
            <img
              src="/images/March workshop Layoff to Income Strategy.png" // Update with your image path
              alt="AI Co-Creator Workshop Cover"
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
     
      {/* MODERATORS */}
      <section className="py-20 bg-white-100">
        <div className="container mx-auto px-6 lg:px-20">

          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Meet our <span className="text-electra-blue">Finance Expert</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dr. Anna Ezerskiy is a Physicist, Executive MBA, and Founder of Apex Foundry in the Netherlands.
            </p>
          </div>

          <div className="container mx-auto px-6 lg:px-20 grid md:grid-cols-2 gap-10 items-center">
          <div className="grid md:grid-cols-1 gap-10">
            {[
              {
                name: "Dr. Anna Ezerskiy MBA",
                img: "/images/experts/Anna Ezerskiy.png",
                expertise: "I help founders turn breakthrough ideas into viable businesses by bridging technology with strategy, funding, and go-to-market execution.",
                bio: "",
                linkedin: "https://www.linkedin.com/in/anna-ezerskiy/",
              },
            ].map((m, i) => (
              <Card
                    key={i}
                    className="group overflow-hidden border hover:shadow-lg transition-shadow"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={m.img}
                        alt={m.name}
                        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{m.name}</CardTitle>
                      <p className="text-muted-foreground">{m.expertise}</p>
                    </CardHeader>
                    <CardContent>
                      <a
                        href={m.linkedin}
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
          <div>
            <p className="mt-6 text-lg text-white-900">
             She has led multi-million-euro innovation programs at Philips, ASML, and other high-tech companies, bringing complex technologies from early research to market under real financial pressure.
            </p>
           <p className="mt-6 text-lg text-white-900"> In her workshops, Anna translates that experience into practical financial clarity for professionals facing career disruption. She specializes in break-even analysis, risk assessment, and income strategy design helping participants make financially sound decisions about employment, entrepreneurship, or transition. Her focus is simple: remove emotional fog, quantify reality, and equip you with a clear, defensible financial roadmap.
            </p>
          </div>
        </div>

        </div>
      </section>

      {/* AGENDA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-4xl font-bold mb-10">Agenda</h2>

          <ul className="space-y-4 text-xl">
            {[
              "12:30 – Arrival & welcome",
              "13:00 – Break-even point development",
              "14:00 – Coffee Break ☕",
              "14:10 – Mapping an income-replacement roadmap",
              "15:15 – Coffee Break ☕",
              "15:30 – Defining your value proposition and validating it early",
              "16:00 – Dutch VAT, pricing, and compliance basics",
              "16:45 – Conclusion and next steps",
            ].map((item) => (
              <li className="flex items-start gap-3">
                
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
      
      {/* SMART PRICING CTA */}
      <section id="secure" className="py-20 bg-white relative">
        <div className="container mx-auto px-6 lg:px-20">

          <SmartPricing />

        </div>
      </section>


      {/* TESTIMONIALS 
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-5xl font-bold text-center mb-14">Testimonials</h2>

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
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-1 border-white shadow-md object-cover"
                />
                <h3 className="text-lg font-semibold text-center">{t.name}</h3>
                <p className="mt-3 text-center text-gray-700">{t.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>*/}


      {/* GALLERY 
      <section className="py-20 bg-white">
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
      </section>*/}

      <Footer />
    </div>
  );
};

const SmartPricing = () => {
  const [now, setNow] = useState(new Date());
  const seatsLeft = 12;

  // Update these to match your real pricing schedule
  const earlyEnd = new Date("2026-03-15T23:59:59");
  const regularEnd = new Date("2026-03-18T23:59:59");
  const lateEnd = new Date("2026-03-20T23:59:59");

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  let currentPrice = 249;
  let phase = "Late";
  let deadline = lateEnd;
  let registrationClosed = false;

  if (now <= earlyEnd) {
    currentPrice = 149;
    phase = "Early Bird";
    deadline = earlyEnd;
  } else if (now <= regularEnd) {
    currentPrice = 199;
    phase = "Regular";
    deadline = regularEnd;
  } else if (now <= lateEnd) {
    currentPrice = 249;
    phase = "Late";
    deadline = lateEnd;
  } else {
    registrationClosed = true;
  }

  const timeRemaining = deadline.getTime() - now.getTime();

  const days = Math.max(0, Math.floor(timeRemaining / (1000 * 60 * 60 * 24)));
  const hours = Math.max(0, Math.floor((timeRemaining / (1000 * 60 * 60)) % 24));
  const minutes = Math.max(0, Math.floor((timeRemaining / (1000 * 60)) % 60));
  const seconds = Math.max(0, Math.floor((timeRemaining / 1000) % 60));

  return (
    <>
      <h2 className="text-5xl font-bold text-center mb-6">
        Secure Your <span className="text-electra-blue">Seat</span>
      </h2>

      {registrationClosed ? (
        <div className="text-center space-y-6">
          <p className="text-xl font-semibold text-red-500">
            Registration Closed
          </p>
          <p className="text-gray-600">
            Join the waiting list to be notified about the next edition.
          </p>

          {/* Waiting List Button Only */}
          <div className="flex justify-center">
            <a
              href="/waiting-list"  // replace with your actual link
              className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition"
            >
              Join the Waiting List
            </a>
          </div>
        </div>
      ) : (
        <>
        <div className="text-center mb-10">
        <ul>
          <li className="text-xl font-semibold text-electra-blue">Early Bird Ticket – €149</li>
          <li className="text-xl text-gray-600 ">Regular Ticket – €199</li>
          <li className="text-xl text-gray-600 ">Late Ticket – €248</li>
        </ul>
        </div>

          {/* Countdown */}
          <div className="text-center mb-10">
            <p className="text-gray-500 mb-3 text-xl">
              Price increases in:
            </p>
            <div className="flex justify-center gap-6 text-2xl font-bold">
              <div>{days}d</div>
              <div>{hours}h</div>
              <div>{minutes}m</div>
              <div>{seconds}s</div>
            </div>
          </div>

          {/* Seats */}
          <div className="text-center mb-10">
            <p className="text-xl text-gray-500">
              Only{" "}
              <span className="font-semibold text-red-500">
                {seatsLeft}
              </span>{" "}
              seats remaining
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">

            {/* Primary - Buy Seat */}
            <a
              href="https://buy.stripe.com/bJe00k5YM6hQ9Pt3sI9EI01"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue text-white px-10 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition text-center"
            >
              Buy Your Seat for €{currentPrice}
            </a>

            {/* Secondary - Waiting List 
            <a
              href="/waiting-list" // replace with actual link
              className="bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition text-center"
            >
              Join the Waiting List
            </a>*/}

          </div>
        </>
      )}
    </>
  );
};


export default FinancialTransitionLab;
