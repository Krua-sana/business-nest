import { useState, useEffect } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to JourneySection
  const scrollToJourney = () => {
    const element = document.getElementById('journey');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      ></div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
            Welcome to
            <span className="block text-orange-400 animate-pulse">
              The Business Nest
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in max-w-2xl mx-auto">
            Where solo entrepreneurs and first-time founders come to hatch their business ideas into thriving ventures
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
              onClick={scrollToJourney}
            >
              Start Your Journey
              <Play className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={scrollToJourney}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-orange-400 hover:text-orange-300 transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
