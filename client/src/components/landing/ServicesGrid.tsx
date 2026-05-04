import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Sparkles, Activity, UserCheck, Heart, Shield, Clock, Star } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { useAuthStore } from '@/lib/auth-store';

const services = [
  {
    id: 'cosmetic',
    icon: Sparkles,
    title: 'Cosmetic Dentistry',
    description: 'Transform your smile with teeth whitening, veneers, and smile makeovers using the latest aesthetic techniques.',
    features: ['Teeth Whitening', 'Porcelain Veneers', 'Smile Makeovers']
  },
  {
    id: 'preventative',
    icon: Shield,
    title: 'Preventative Care',
    description: 'Maintain optimal oral health with regular check-ups, cleanings, and early detection of dental issues.',
    features: ['Regular Check-ups', 'Professional Cleaning', 'Oral Cancer Screening']
  },
  {
    id: 'restorative',
    icon: Heart,
    title: 'Restorative Dentistry',
    description: 'Repair damaged teeth and restore function with crowns, bridges, implants, and other restorative procedures.',
    features: ['Dental Implants', 'Crowns & Bridges', 'Root Canal Therapy']
  },
  {
    id: 'orthodontic',
    icon: Activity,
    title: 'Orthodontic Treatment',
    description: 'Straighten teeth and correct bite issues with traditional braces or clear aligner therapy.',
    features: ['Traditional Braces', 'Clear Aligners', 'Retainers']
  },
  {
    id: 'emergency',
    icon: Clock,
    title: 'Emergency Care',
    description: 'Get immediate attention for dental emergencies with our same-day appointment availability.',
    features: ['Same-Day Appointments', 'Pain Management', 'Trauma Care']
  },
  {
    id: 'pediatric',
    icon: UserCheck,
    title: 'Pediatric Dentistry',
    description: 'Specialized dental care for children in a friendly, comfortable environment designed for young patients.',
    features: ['Child-Friendly Environment', 'Preventive Care', 'Early Orthodontics']
  }
];

interface ServiceCardProps {
  service: typeof services[0];
}

function ServiceCard({ service }: ServiceCardProps) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const Icon = service.icon;

  const handleGetStarted = () => {
    if (!user) {
      navigate({ to: '/login' });
    } else {
      // TODO: Navigate to service booking page
      console.log('Navigate to service booking for:', service.id);
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-teal-200 bg-white">
      <CardHeader className="pb-4">
        <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
          <Icon className="h-6 w-6 text-teal-600" />
        </div>
        <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">
          {service.title}
        </CardTitle>
        <CardDescription className="text-slate-600 leading-relaxed">
          {service.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {service.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-slate-600">
              <Star className="h-4 w-4 text-teal-500 fill-current" />
              {feature}
            </li>
          ))}
        </ul>
        
        <Button 
          onClick={handleGetStarted}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium group-hover:bg-teal-700 transition-colors"
        >
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

export function ServicesGrid() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Our Comprehensive Services
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From routine preventive care to advanced cosmetic procedures, we offer a full range of dental services 
            to meet all your oral health needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
