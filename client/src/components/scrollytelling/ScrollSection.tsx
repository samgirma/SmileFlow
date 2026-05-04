import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/lib/auth-store';

interface ScrollSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  backgroundImage: string;
  buttonText: string;
  isActive?: boolean;
  onSectionChange?: (sectionId: string) => void;
}

export function ScrollSection({
  id,
  title,
  subtitle,
  description,
  backgroundImage,
  buttonText,
  isActive = false,
  onSectionChange
}: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleExploreService = () => {
    if (!user) {
      // Smooth fade-out transition before redirect
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 0.5s ease-out';
      
      setTimeout(() => {
        navigate({ to: '/login' });
      }, 500);
    } else {
      // TODO: Navigate to service booking page
      console.log('Navigate to service:', id);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      ref={ref}
      className="relative w-full h-screen snap-start overflow-hidden"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-teal-900/80 via-teal-800/60 to-teal-900/90"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center text-white"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Subtitle */}
          <motion.div 
            className="mb-4"
            variants={itemVariants}
          >
            <span className="text-lg font-light tracking-wider uppercase text-teal-200">
              {subtitle}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <span className="block">{title.split(':')[0]}</span>
            {title.includes(':') && (
              <span className="block text-teal-300">{title.split(':')[1]}</span>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p 
            className="text-xl md:text-2xl font-light mb-12 max-w-3xl mx-auto leading-relaxed text-white/90"
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* CTA Button */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button
              onClick={handleExploreService}
              size="lg"
              className="bg-white text-teal-900 hover:bg-teal-50 px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {buttonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-teal-900 px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300"
            >
              Learn More
            </Button>
          </motion.div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-32 h-32 bg-teal-400/20 rounded-full blur-2xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      {isActive && (
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-sm font-medium">Scroll</span>
            <motion.div
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="w-1 h-3 bg-white rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
