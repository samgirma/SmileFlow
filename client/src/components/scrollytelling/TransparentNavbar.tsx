import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/lib/auth-store';

export function TransparentNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = () => {
    navigate({ to: '/login' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/10 backdrop-blur-md border-b border-white/20'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-teal-600 font-bold text-lg">🦷</span>
              </div>
              <span className="text-xl font-bold text-white">SmileFlow</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {[
                { id: 'hero', label: 'Home' },
                { id: 'preventative', label: 'Preventative' },
                { id: 'cosmetic', label: 'Cosmetic' },
                { id: 'emergency', label: 'Emergency' },
                { id: 'footer', label: 'Contact' }
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-white/80 hover:text-white transition-colors font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-teal-900 rounded-lg"
              >
                <Phone className="h-4 w-4 mr-2" />
                (555) 123-4567
              </Button>
              {user ? (
                <Button 
                  onClick={() => navigate({ to: '/dashboard' })}
                  className="bg-white text-teal-900 hover:bg-teal-50 rounded-lg"
                >
                  Dashboard
                </Button>
              ) : (
                <Button 
                  onClick={handleLogin}
                  className="bg-white text-teal-900 hover:bg-teal-50 rounded-lg"
                >
                  Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm"
                className="border-white text-white"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden border-t border-white/20 bg-white/10 backdrop-blur-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="container mx-auto px-6 py-4 space-y-4">
                {[
                  { id: 'hero', label: 'Home' },
                  { id: 'preventative', label: 'Preventative' },
                  { id: 'cosmetic', label: 'Cosmetic' },
                  { id: 'emergency', label: 'Emergency' },
                  { id: 'footer', label: 'Contact' }
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-white/80 hover:text-white transition-colors font-medium py-2"
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
                
                <div className="pt-4 border-t border-white/20 space-y-3">
                  <Button 
                    variant="outline" 
                    className="w-full border-white text-white hover:bg-white hover:text-teal-900"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    (555) 123-4567
                  </Button>
                  {user ? (
                    <Button 
                      onClick={() => navigate({ to: '/dashboard' })}
                      className="w-full bg-white text-teal-900 hover:bg-teal-50"
                    >
                      Dashboard
                    </Button>
                  ) : (
                    <Button 
                      onClick={handleLogin}
                      className="w-full bg-white text-teal-900 hover:bg-teal-50"
                    >
                      Login
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Reset body opacity when component unmounts */}
      <style jsx>{`
        body {
          transition: opacity 0.5s ease-out;
        }
      `}</style>
    </>
  );
}
