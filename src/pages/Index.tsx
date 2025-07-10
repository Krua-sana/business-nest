
import { useState, useEffect } from 'react';
import { ChevronDown, Users, Lightbulb, Coffee, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import ProgramSection from '@/components/ProgramSection';
import ExpertsSection from '@/components/ExpertsSection';
import CoWorkingSection from '@/components/CoWorkingSection';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-amber-50">
      <Navigation />
      <Hero />
      <ProgramSection />
      <ExpertsSection />
      <CoWorkingSection />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Index;
