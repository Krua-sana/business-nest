
import { useState } from 'react';
import { Heart, Target, Users, Trophy } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Community First",
      description: "We believe in the power of collaboration and supporting each other's journey to success"
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Goal-Oriented",
      description: "Every program and resource is designed with your business success as the primary objective"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Inclusive Growth",
      description: "We welcome entrepreneurs from all backgrounds and experience levels to learn and grow together"
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Excellence",
      description: "We maintain the highest standards in our programs, mentorship, and community support"
    }
  ];

  const stats = [
    { number: "500+", label: "Entrepreneurs Supported" },
    { number: "150+", label: "Businesses Launched" },
    { number: "95%", label: "Success Rate" },
    { number: "3+", label: "Years of Impact" }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-amber-50 to-orange-100 relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🐦</div>
      <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-float-delayed">🪺</div>
      <div className="absolute top-1/2 left-1/4 text-4xl opacity-10 animate-float">🥚</div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            About <span className="text-orange-600">The Business Nest</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded with a mission to democratize entrepreneurship, we're more than just a program—
            we're a community dedicated to transforming ideas into successful businesses.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                The Business Nest was born from a simple observation: too many great ideas never see the light of day 
                because their creators lack the guidance, resources, and community support needed to bring them to life.
              </p>
              <p>
                Our founders, having experienced the lonely journey of early entrepreneurship, decided to create 
                the support system they wished they'd had. Today, we're proud to be the launching pad for hundreds 
                of successful businesses.
              </p>
              <p>
                We believe that with the right environment, mentorship, and community, anyone can transform 
                their business idea into a thriving venture. That's what we call "nesting your success."
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange-500 text-white p-6 rounded-lg shadow-lg">
              <div className="text-2xl font-bold">Est. 2021</div>
              <div className="text-sm">Building Dreams</div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our <span className="text-orange-600">Core Values</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index}
                className={`text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                  hoveredValue === index ? 'bg-orange-50 border-orange-200' : ''
                }`}
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors ${
                    hoveredValue === index ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {value.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="text-center">
          <h3 className="text-3xl font-bold text-gray-800 mb-12">
            Our <span className="text-orange-600">Impact</span>
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
