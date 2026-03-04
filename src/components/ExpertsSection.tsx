
import { useState } from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ExpertsSection = () => {
  const [hoveredExpert, setHoveredExpert] = useState<number | null>(null);

  const experts = [
    {
      name: "Kris Smirnova",
      role: "Trend watcher & Business facilitator",
      expertise: "Social science & consumer insights",
      bio: "15+ years helping businesses validate ideas and understand their customers",
      image: "/lovable-uploads/Kris-Smirnova.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/krissmir/",
        email: "euphokris@gmail.com"
      }
    },
    {
      name: "Kateryna Saprunova",
      role: "Community Builder & Experience Designer", 
      expertise: "IT & Service Design",
      bio: "Helping solopreneurs to build their business with design thinking and Lean Startup methodologies",
      image: "/lovable-uploads/Kateryna-Saprunova.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/saprunova-kateryna/",
        twitter: "#", 
        email: "miaryna@gmail.com"
      }
    },
    {
      name: "Dilip Kumar Mulluri",
      role: "IT Mentor and Startup Advisor",
      expertise: "Investment & Funding",
      bio: "Former VC partner with expertise in early-stage funding and financial planning",
      image: "/lovable-uploads/Dilip-Kumar-Mulluri.png",
      social: {
        linkedin: "https://www.linkedin.com/in/dilip-kumar-mulluri-90243b77/",
        twitter: "#",
        email: "dilip.kumar1408@gmail.com"
      }
    },
    {
      name: "Simeon Dimov",
      role: "AI Mentor and Tech Strategist",
      expertise: "AI Product Development",
      bio: "Serial entrepreneur and CTO with 3 successful exits in the tech industry",
      image: "/images/experts/Simeon-Dimov.jpg",
      social: {
        linkedin: "https://www.linkedin.com/in/simeon-dimov-bb429016b/",
        twitter: "#",
        email: "simeondimow@gmail.com"
      }
    }
  ];

  return (
    <section id="experts" className="py-20 bg-gradient-to-b from-orange-50 to-amber-50 relative">

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
            onClick={() => window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLSfFLyaRKHr2guufARjs5ZHQkD7h1D9AOcCAFgsAOagLBNV49A/viewform?usp=header'}
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
          >
            Become our Expert
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertsSection;
