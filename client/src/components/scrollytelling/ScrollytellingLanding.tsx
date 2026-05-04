import { useState, useEffect, useRef } from 'react';
import { ScrollSection } from './ScrollSection';
import { ScrollProgress } from './ScrollProgress';
import { TransparentNavbar } from './TransparentNavbar';
import { GlassAIAssistant } from './GlassAIAssistant';
import { ScrollytellingFooter } from './ScrollytellingFooter';

const sections = [
  {
    id: 'hero',
    title: 'SmileFlow: The Future of Dental Care',
    subtitle: 'Welcome to Excellence',
    description: 'Experience revolutionary dental care where cutting-edge technology meets compassionate service. Transform your smile with our advanced treatments and personalized approach.',
    backgroundImage: 'https://images.unsplash.com/photo-1600988372567-cf7ca626ee2c?w=1920&h=1080&fit=crop&crop=center',
    buttonText: 'Begin Your Journey'
  },
  {
    id: 'preventative',
    title: 'Smart Preventative Care',
    subtitle: 'Protect Your Smile',
    description: 'Proactive dental health management using AI-powered diagnostics and personalized prevention plans. Catch issues before they start with our comprehensive preventative care program.',
    backgroundImage: 'https://images.unsplash.com/photo-1600988372567-cf7ca626ee2c?w=1920&h=1080&fit=crop&crop=center',
    buttonText: 'Explore Prevention'
  },
  {
    id: 'cosmetic',
    title: 'Aesthetic Excellence',
    subtitle: 'Perfect Your Smile',
    description: 'Unlock your confidence with our world-class cosmetic dentistry. From subtle enhancements to complete smile makeovers, our artists craft perfection with every procedure.',
    backgroundImage: 'https://images.unsplash.com/photo-1600988372567-cf7ca626ee2c?w=1920&h=1080&fit=crop&crop=center',
    buttonText: 'Discover Aesthetics'
  },
  {
    id: 'emergency',
    title: '24/7 Clinical Support',
    subtitle: 'Always Here For You',
    description: 'Dental emergencies don\'t wait, and neither do we. Our round-the-clock emergency care team is ready to provide immediate relief and expert treatment when you need us most.',
    backgroundImage: 'https://images.unsplash.com/photo-1600988372567-cf7ca626ee2c?w=1920&h=1080&fit=crop&crop=center',
    buttonText: 'Get Emergency Care'
  }
];

export function ScrollytellingLanding() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollPosition = containerRef.current.scrollTop;
      const sectionHeight = window.innerHeight;
      const currentSection = Math.round(scrollPosition / sectionHeight);
      
      setActiveSection(Math.min(currentSection, sections.length - 1));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (index: number) => {
    if (containerRef.current) {
      const sectionHeight = window.innerHeight;
      containerRef.current.scrollTo({
        top: index * sectionHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Transparent Navigation */}
      <TransparentNavbar />

      {/* Scroll Progress Indicator */}
      <ScrollProgress
        sections={sections.map(s => ({ id: s.id, title: s.subtitle }))}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Scroll Container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto scroll-smooth"
        style={{
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth'
        }}
      >
        {/* Hero Section */}
        <ScrollSection
          id={sections[0].id}
          title={sections[0].title}
          subtitle={sections[0].subtitle}
          description={sections[0].description}
          backgroundImage={sections[0].backgroundImage}
          buttonText={sections[0].buttonText}
          isActive={activeSection === 0}
        />

        {/* Preventative Care Section */}
        <ScrollSection
          id={sections[1].id}
          title={sections[1].title}
          subtitle={sections[1].subtitle}
          description={sections[1].description}
          backgroundImage={sections[1].backgroundImage}
          buttonText={sections[1].buttonText}
          isActive={activeSection === 1}
        />

        {/* Cosmetic Dentistry Section */}
        <ScrollSection
          id={sections[2].id}
          title={sections[2].title}
          subtitle={sections[2].subtitle}
          description={sections[2].description}
          backgroundImage={sections[2].backgroundImage}
          buttonText={sections[2].buttonText}
          isActive={activeSection === 2}
        />

        {/* Emergency Care Section */}
        <ScrollSection
          id={sections[3].id}
          title={sections[3].title}
          subtitle={sections[3].subtitle}
          description={sections[3].description}
          backgroundImage={sections[3].backgroundImage}
          buttonText={sections[3].buttonText}
          isActive={activeSection === 3}
        />

        {/* Footer Section */}
        <ScrollytellingFooter />
      </div>

      {/* Glass AI Assistant */}
      <GlassAIAssistant />

      {/* Global Styles */}
      <style jsx>{`
        html {
          scroll-behavior: smooth;
        }
        
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
        }
        
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </div>
  );
}
