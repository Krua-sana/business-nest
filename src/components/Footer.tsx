
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🥚</span>
              </div>
              <span className="text-2xl font-bold">Business Nest</span>
            </div>
            <p className="text-gray-400 mb-6">
              Where entrepreneurs come to hatch their business ideas into successful ventures.
            </p>
            <div className="flex space-x-4">
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 hover:bg-orange-500">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 hover:bg-orange-500">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 hover:bg-orange-500">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button size="sm" variant="ghost" className="h-10 w-10 p-0 hover:bg-orange-500">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('program')}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Program
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('experts')}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Experts
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('coworking')}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Co-Working
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  About
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Business Incubation</li>
              <li>Mentorship Program</li>
              <li>Co-Working Space</li>
              <li>Networking Events</li>
              <li>Funding Support</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center text-gray-400">
                <MapPin className="h-5 w-5 mr-3 text-orange-500" />
                <span className="text-sm">123 Innovation Street<br />Tech District, City 12345</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Phone className="h-5 w-5 mr-3 text-orange-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-3 text-orange-500" />
                <span>hello@businessnest.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Get the latest updates on programs, events, and success stories.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
              />
              <Button className="bg-orange-500 hover:bg-orange-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Business Nest. All rights reserved. Made with ❤️ for entrepreneurs.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
