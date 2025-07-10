import { useState, useEffect } from 'react';
import { ChevronDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JoinNestForm from './JoinNestForm';

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProgram = () => {
    const element = document.getElementById('program');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleStartJourney = () => {
    setIsFormOpen(true);
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* Animated Background Elements */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          <div className="absolute top-20 left-10 text-8xl animate-float text-white">🐣</div>
          <div className="absolute top-40 right-20 text-6xl animate-float-delayed text-white">🥚</div>
          <div className="absolute bottom-40 left-20 text-7xl animate-float text-white">🪺</div>
          <div className="absolute bottom-20 right-10 text-5xl animate-float-delayed text-white">🐦</div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Animated Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-64 h-64">
                {/* Animated circular lines */}
                <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
                  <circle
                    cx="128"
                    cy="128"
                    r="120"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                    opacity="0.6"
                  />
                </svg>
                <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                  <circle
                    cx="128"
                    cy="128"
                    r="100"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeDasharray="8,4"
                    opacity="0.4"
                  />
                </svg>
                <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '25s' }}>
                  <circle
                    cx="128"
                    cy="128"
                    r="80"
                    fill="none"
                    stroke="white"
                    strokeWidth="1"
                    strokeDasharray="6,3"
                    opacity="0.3"
                  />
                </svg>
                
                {/* NEST text in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold tracking-wider animate-pulse-soft">NEST</span>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Welcome to
              <span className="block text-orange-400 animate-pulse">The Business Nest</span>
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
                onClick={handleStartJourney}
              >
                Start Your Journey
                <Play className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white px-8 py-4 text-lg hover:scale-105 transition-transform"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mb-16">
              <div className="text-center animate-fade-in">
                <div className="text-3xl font-bold text-orange-400">100+</div>
                <div className="text-sm text-gray-400">Entrepreneurs</div>
              </div>
              <div className="text-center animate-fade-in">
                <div className="text-3xl font-bold text-orange-400">50+</div>
                <div className="text-sm text-gray-400">Success Stories</div>
              </div>
              <div className="text-center animate-fade-in">
                <div className="text-3xl font-bold text-orange-400">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <button 
            onClick={scrollToProgram}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-orange-400 hover:text-orange-300 transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      <JoinNestForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </>
  );
};

export default Hero;
