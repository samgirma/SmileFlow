import { Hero } from './Hero';
import { ServicesGrid } from './ServicesGrid';
import { AIAssistant } from './AIAssistant';
import { Footer } from './Footer';
import { Navigation } from './Navigation';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <ServicesGrid />
      <AIAssistant />
      <Footer />
    </div>
  );
}
