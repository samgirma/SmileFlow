import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Clinic Information */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">SmileFlow Dental</h3>
              <p className="text-slate-400 leading-relaxed">
                Your trusted partner for exceptional dental care and beautiful smiles.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-teal-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Clinic Location</p>
                  <p className="text-slate-400 text-sm">
                    123 Medical Center Drive<br />
                    Suite 100, Healthcare Plaza<br />
                    New York, NY 10001
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Phone</p>
                  <p className="text-slate-400 text-sm">(555) 123-4567</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Email</p>
                  <p className="text-slate-400 text-sm">info@smileflow.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-teal-400 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white">Hours of Operation</p>
                  <div className="text-slate-400 text-sm space-y-1">
                    <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                    <p>Saturday: 9:00 AM - 5:00 PM</p>
                    <p>Sunday: 10:00 AM - 3:00 PM</p>
                    <p className="text-teal-400 font-medium">Emergency: 24/7 Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Meet Our Team
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Patient Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Insurance & Payment
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  HIPAA Compliance
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                  Accessibility
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Follow Us</h4>
              <div className="flex gap-3">
                <a 
                  href="#" 
                  className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <Facebook className="h-5 w-5 text-white" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <Twitter className="h-5 w-5 text-white" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <Instagram className="h-5 w-5 text-white" />
                </a>
                <a 
                  href="#" 
                  className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2026 SmileFlow Dental. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-slate-400 text-sm">
              <span>License: #DENT-12345</span>
              <span>•</span>
              <span>ADA Member</span>
              <span>•</span>
              <span>BBB Accredited</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
