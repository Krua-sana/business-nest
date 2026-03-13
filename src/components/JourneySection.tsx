import { useState, useEffect } from 'react';
import { Wifi, Coffee, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Plan = {
  name: string;
  features: string[];
  popular?: boolean;
  // One of these will define the destination
  to?: string;           // internal route (React Router)
  href?: string;         // external link
  target?: '_blank' | '_self' | '_parent' | '_top';
  cta?: string;          // optional override button label
};

const JourneySection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const amenities = [
    { icon: <Wifi className="h-6 w-6" />, title: "High-Speed WiFi", description: "Reliable internet for seamless productivity" },
    { icon: <Coffee className="h-6 w-6" />, title: "Free Beverages", description: "Unlimited coffee, tea, and refreshments" },
    { icon: <Users className="h-6 w-6" />, title: "Networking Events", description: "Regular meetups and community gatherings" },
    { icon: <Clock className="h-6 w-6" />, title: "24/7 Access", description: "Work on your schedule, any time of day" }
  ];

  const plans: Plan[] = [
    {
      name: "Join the Community",
      features: ["Eindhoven Entrepreneurs", "Support of like-minded people", "Events calendar", "Free workshops", "Regular networking"],
      href: "https://forms.gle/UFxsHrAeHNRuXAN17",                 // internal route example
      cta: "Join Community"
    },
    {
      name: "10 Saturdays program",
      features: ["Nest your idea into a business", "Support of experts", "Pitch for funding", "and more"],
      popular: true,
      to: "/program",       // internal route example
      cta: "Explore Program"
    },
    {
      name: "Under the wing of expert",
      features: ["Personal mentorship", "Non-judgemental feedback", "Mental support", "Individual evaluation"],
      href: "https://business-nest.nl/experts", // external link example
      target: "_blank",
      cta: "Meet Experts"
    },
    /*{
      name: "Get your own nest",
      features: ["Desk at co-working space", "Coffee & Tea", "Business mailbox", "24/7 access"],
      href: "https://www.strijpcs.nl/en/free-trial/", // external (replace later)
      target: "_blank",
      cta: "Join a Free Day"
    }*/
  ];

  return (
    <section id="journey" className="py-20 bg-white relative overflow-hidden">
      {/* Optional parallax background kept commented */}
      {/* <div
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute top-10 left-1/4 text-8xl">🪺</div>
        <div className="absolute top-1/2 right-1/4 text-6xl">🐣</div>
        <div className="absolute bottom-10 left-1/3 text-7xl">🥚</div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Choose <span className="text-orange-600">Your Journey</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Either you are just starting out or looking to scale your business, we have a plan for you.
            Explore our offerings and find the perfect fit for your entrepreneurial journey.
          </p>
        </div>

        {/* Plans */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => {
              const destination = plan.to || plan.href || '';
              const btnClasses = `w-full mt-6 ${
                plan.popular
                  ? 'bg-orange-500 hover:bg-orange-600 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`;

              return (
                <Card
                  key={index}
                  className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 ${
                    plan.popular ? 'border-orange-500 shadow-lg scale-105' : ''
                  }`}
                  // ✅ New attribute as requested:
                  data-destination={destination}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  <CardHeader className={`text-center ${plan.popular ? 'pt-12' : ''}`}>
                    <CardTitle className="text-2xl font-bold text-gray-800">{plan.name}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-600">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Button → Link or <a> depending on plan.to/plan.href */}
                    {plan.to ? (
                      <Link to={plan.to} className="block">
                        <Button className={btnClasses}>
                          {plan.cta || 'Get Started'}
                        </Button>
                      </Link>
                    ) : plan.href ? (
                      <a href={plan.href} target={plan.target || '_self'} rel="noopener noreferrer" className="block">
                        <Button className={btnClasses}>
                          {plan.cta || 'Get Started'}
                        </Button>
                      </a>
                    ) : (
                      <Button className={btnClasses} disabled>
                        {plan.cta || 'Get Started'}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
