import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Phone } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-white py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Transforming Smiles,
                <span className="text-teal-600"> Enhancing Lives</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                Experience world-class dental care with our expert team. From routine check-ups to advanced cosmetic procedures, 
                we're committed to helping you achieve the healthy, beautiful smile you deserve.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Schedule Your First Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-teal-600 text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-xl text-lg font-semibold"
              >
                <Phone className="mr-2 h-5 w-5" />
                Call Us Now
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">15+</div>
                <div className="text-sm text-slate-600">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">5000+</div>
                <div className="text-sm text-slate-600">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">50+</div>
                <div className="text-sm text-slate-600">Awards</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Visual */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="/src/assets/images/teeth_pic.webp" 
                alt="Professional Dental Care" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-600/20 to-transparent"></div>
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-6 border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Book Online</div>
                  <div className="text-sm text-slate-600">Available 24/7</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
