
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import JoinNestForm from './JoinNestForm';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const handleJoinClick = () => {
    setIsFormOpen(true);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <img src="/lovable-uploads/nest_logo.svg" alt="The Business Nest logo"></img>
                <span className="text-white font-bold text-lg">🥚</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">Business Nest</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('program')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Program
              </button>
              <button 
                onClick={() => scrollToSection('experts')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Experts
              </button>
              <button 
                onClick={() => scrollToSection('coworking')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                Co-Working
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-orange-600 transition-colors font-medium"
              >
                About
              </button>
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={handleJoinClick}
              >
                Join The Nest
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
              <div className="flex flex-col space-y-4 px-4">
                <button 
                  onClick={() => scrollToSection('program')}
                  className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  Program
                </button>
                <button 
                  onClick={() => scrollToSection('experts')}
                  className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  Experts
                </button>
                <button 
                  onClick={() => scrollToSection('coworking')}
                  className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  Co-Working
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-left text-gray-700 hover:text-orange-600 transition-colors font-medium"
                >
                  About
                </button>
                <Button 
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleJoinClick}
                >
                  Join The Nest
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <JoinNestForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </>
  );
};

export default Navigation;
