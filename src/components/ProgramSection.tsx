import { useState } from 'react';
import { Lightbulb, Target, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import JoinNestForm from './JoinNestForm';

const ProgramSection = () => {
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

  return (
    <>
      <section id="program" className="py-20 bg-white relative">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 text-4xl opacity-20 animate-float">🥚</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-float-delayed">🐣</div>

        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              10 <span className="text-orange-600">Saturdays</span>Program
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From idea to launch, we provide everything you need to build a successful business. 
              Our comprehensive program is designed specifically for solo entrepreneurs and first-time founders.
            </p>
          </div>

          {/* Program Showcase Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="space-y-6">
              <img 
                src="/lovable-uploads/df807106-0ae8-4f7d-9b7b-cdfccc994251.png"
                alt="Workshop presentation"
                className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <img 
                src="/lovable-uploads/345d1852-a0eb-4e0e-a530-0e3a4a1e7c27.png"
                alt="Team collaboration"
                className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
            <div className="space-y-6">
              <img 
                src="/lovable-uploads/15e2ce9c-df71-4852-b67c-51ad6a43b557.png"
                alt="Program participants"
                className="w-full h-48 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
              <img 
                src="/lovable-uploads/b1b5869c-0fa2-4bea-81ee-a0707ac5e33b.png"
                alt="Networking session"
                className="w-full h-64 object-cover rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              />
            </div>
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
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-colors ${
                    hoveredCard === index ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {feature.icon}
                  </div>
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

          <div className="text-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
              onClick={() => setIsFormOpen(true)}
            >
              Read about the Program
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      <JoinNestForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </>
  );
};

export default ProgramSection;
