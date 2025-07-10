
import { useState, useEffect } from 'react';
import { Wifi, Coffee, Users, Clock, MapPin, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CoWorkingSection = () => {
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

  const plans = [
    {
      name: "Day Pass",
      price: "$25",
      period: "per day",
      features: ["Desk access", "WiFi & beverages", "Community access", "Basic printing"]
    },
    {
      name: "Monthly",
      price: "$199",
      period: "per month",
      features: ["Dedicated desk", "24/7 access", "Meeting room credits", "Priority support"],
      popular: true
    },
    {
      name: "Private Office", 
      price: "$399",
      period: "per month",
      features: ["Private space", "Phone booth access", "Storage locker", "Team collaboration tools"]
    }
  ];

  return (
    <section id="coworking" className="py-20 bg-white relative overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{ transform: `translateY(${scrollY * 0.2}px)` }}
      >
        <div className="absolute top-10 left-1/4 text-8xl">🪺</div>
        <div className="absolute top-1/2 right-1/4 text-6xl">🐣</div>
        <div className="absolute bottom-10 left-1/3 text-7xl">🥚</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Your <span className="text-orange-600">Creative Workspace</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join our vibrant co-working community where entrepreneurs collaborate, innovate, 
            and grow their businesses in a supportive environment designed for success.
          </p>
        </div>

        {/* Workspace Images */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="md:col-span-2">
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop"
              alt="Co-working space"
              className="w-full h-80 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
          <div className="space-y-6">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=180&fit=crop"
              alt="Meeting room"
              className="w-full h-36 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
            <img 
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=180&fit=crop"
              alt="Collaboration area"
              className="w-full h-36 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {amenities.map((amenity, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow hover:-translate-y-1 duration-300">
              <CardContent className="p-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 text-orange-600 rounded-full mb-4">
                  {amenity.icon}
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{amenity.title}</h3>
                <p className="text-sm text-gray-600">{amenity.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Choose Your <span className="text-orange-600">Membership</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 ${
                  plan.popular ? 'border-orange-500 shadow-lg scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-orange-500 text-white text-center py-2 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : ''}`}>
                  <CardTitle className="text-2xl font-bold text-gray-800">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-orange-600">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
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
                  <Button 
                    className={`w-full mt-6 ${
                      plan.popular 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Visit Our Space</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-orange-600 mr-3" />
                    <span className="text-gray-600">123 Innovation Street, Tech District, City 12345</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-orange-600 mr-3" />
                    <span className="text-gray-600">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-600 mr-3" />
                    <span className="text-gray-600">Open 24/7 for members</span>
                  </div>
                </div>
              </div>
              <div>
                <Button 
                  size="lg" 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white mb-4"
                >
                  Schedule a Tour
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full border-orange-500 text-orange-600 hover:bg-orange-50"
                >
                  Book a Day Pass
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default CoWorkingSection;
