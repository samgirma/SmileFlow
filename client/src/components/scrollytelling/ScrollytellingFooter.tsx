import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function ScrollytellingFooter() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div 
      id="footer"
      className="relative w-full h-screen snap-start overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <motion.div 
          className="w-full max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Clinic Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div>
                <motion.h3 
                  className="text-2xl font-bold text-white mb-4 flex items-center gap-3"
                  variants={itemVariants}
                >
                  <div className="h-8 w-8 bg-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">🦷</span>
                  </div>
                  SmileFlow Dental
                </motion.h3>
                <motion.p 
                  className="text-slate-300 leading-relaxed"
                  variants={itemVariants}
                >
                  Your trusted partner for exceptional dental care and beautiful smiles.
                </motion.p>
              </div>
              
              <motion.div variants={itemVariants} className="space-y-4">
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
              </motion.div>
            </motion.div>

            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Contact Us</h4>
              
              <div className="space-y-4">
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-teal-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-slate-400 text-sm">(555) 123-4567</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-teal-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Email</p>
                    <p className="text-slate-400 text-sm">info@smileflow.com</p>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-teal-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white">Hours of Operation</p>
                    <div className="text-slate-400 text-sm space-y-1">
                      <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p>Saturday: 9:00 AM - 5:00 PM</p>
                      <p>Sunday: 10:00 AM - 3:00 PM</p>
                      <p className="text-teal-400 font-medium">Emergency: 24/7 Available</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Quick Links</h4>
              
              <ul className="space-y-3">
                {['Home', 'Our Services', 'Meet Our Team', 'Patient Resources', 'Insurance & Payment', 'Testimonials'].map((link, index) => (
                  <motion.li key={link} variants={itemVariants}>
                    <a 
                      href="#" 
                      className="text-slate-300 hover:text-teal-400 transition-colors text-sm flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Social */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h4 className="text-xl font-semibold text-white">Connect With Us</h4>
              
              <div className="space-y-4">
                <div>
                  <p className="text-white font-medium mb-3">Follow Us</p>
                  <div className="flex gap-3">
                    {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                      <motion.a
                        key={index}
                        href="#"
                        className="h-10 w-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </motion.a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-white font-medium mb-3">Legal</p>
                  <ul className="space-y-2">
                    {['Privacy Policy', 'Terms of Service', 'HIPAA Compliance', 'Accessibility'].map((link, index) => (
                      <motion.li key={link} variants={itemVariants}>
                        <a 
                          href="#" 
                          className="text-slate-300 hover:text-teal-400 transition-colors text-sm"
                        >
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="border-t border-slate-700 mt-16 pt-8"
            variants={itemVariants}
          >
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
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  );
}
