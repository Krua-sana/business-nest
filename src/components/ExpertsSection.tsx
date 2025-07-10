
import { useState } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExpertsSection = () => {
  const [hoveredExpert, setHoveredExpert] = useState<number | null>(null);

  const experts = [
    {
      name: "Sarah Johnson",
      role: "Startup Strategist",
      expertise: "Business Development",
      bio: "15+ years helping entrepreneurs transform ideas into profitable businesses",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b213?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "sarah@businessnest.com"
      }
    },
    {
      name: "Michael Chen",
      role: "Marketing Expert", 
      expertise: "Digital Growth",
      bio: "Helped 200+ startups achieve sustainable growth through innovative marketing",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#", 
        email: "michael@businessnest.com"
      }
    },
    {
      name: "Emily Rodriguez",
      role: "Financial Advisor",
      expertise: "Investment & Funding",
      bio: "Former VC partner with expertise in early-stage funding and financial planning",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "emily@businessnest.com"
      }
    },
    {
      name: "David Kim",
      role: "Tech Mentor",
      expertise: "Product Development",
      bio: "Serial entrepreneur and CTO with 3 successful exits in the tech industry",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      social: {
        linkedin: "#",
        twitter: "#",
        email: "david@businessnest.com"
      }
    }
  ];

  return (
    <section id="experts" className="py-20 bg-gradient-to-b from-orange-50 to-amber-50 relative">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 text-5xl opacity-20 animate-float">🪺</div>
      <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-float-delayed">🐦</div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Meet Our <span className="text-orange-600">Expert Mentors</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from seasoned entrepreneurs and industry experts who have been where you are 
            and successfully built thriving businesses from the ground up.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {experts.map((expert, index) => (
            <Card 
              key={index}
              className="relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-4 cursor-pointer group"
              onMouseEnter={() => setHoveredExpert(index)}
              onMouseLeave={() => setHoveredExpert(null)}
            >
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={expert.image}
                    alt={expert.name}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                    hoveredExpert === index ? 'opacity-100' : 'opacity-0'
                  }`} />
                  
                  {/* Social Links */}
                  <div className={`absolute bottom-4 left-4 right-4 flex justify-center space-x-3 transition-all duration-300 ${
                    hoveredExpert === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                      <Linkedin className="h-4 w-4 text-white" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                      <Twitter className="h-4 w-4 text-white" />
                    </Button>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/20 backdrop-blur-sm hover:bg-white/30">
                      <Mail className="h-4 w-4 text-white" />
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{expert.name}</h3>
                  <p className="text-orange-600 font-semibold mb-2">{expert.role}</p>
                  <p className="text-sm text-gray-500 mb-3">{expert.expertise}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{expert.bio}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
          >
            Schedule a Mentorship Session
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
