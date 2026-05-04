import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/lib/auth-store';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleLogin = () => {
    navigate({ to: '/login' });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-30">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🦷</span>
            </div>
            <span className="text-xl font-bold text-slate-900">SmileFlow</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <a href="#services" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Services
            </a>
            <a href="#about" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              About Us
            </a>
            <a href="#team" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Our Team
            </a>
            <a href="#testimonials" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Testimonials
            </a>
            <a href="#contact" className="text-slate-600 hover:text-teal-600 transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Button 
              variant="outline" 
              className="border-teal-600 text-teal-600 hover:bg-teal-50 rounded-lg"
            >
              <Phone className="h-4 w-4 mr-2" />
              (555) 123-4567
            </Button>
            {user ? (
              <Button 
                onClick={() => navigate({ to: '/dashboard' })}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
              >
                Dashboard
              </Button>
            ) : (
              <Button 
                onClick={handleLogin}
                className="bg-teal-600 hover:bg-teal-700 text-white rounded-lg"
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
              className="border-teal-600 text-teal-600"
            >
              <Phone className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-slate-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-4">
            <div className="space-y-4">
              <a 
                href="#services" 
                className="block text-slate-600 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a 
                href="#about" 
                className="block text-slate-600 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a 
                href="#team" 
                className="block text-slate-600 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Team
              </a>
              <a 
                href="#testimonials" 
                className="block text-slate-600 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </a>
              <a 
                href="#contact" 
                className="block text-slate-600 hover:text-teal-600 transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  (555) 123-4567
                </Button>
                {user ? (
                  <Button 
                    onClick={() => navigate({ to: '/dashboard' })}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button 
                    onClick={handleLogin}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
