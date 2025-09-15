import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, MapPin, Calendar, Mountain } from 'lucide-react';
import heroImage from '@assets/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png';

interface HeroSectionProps {
  onPlanTrip: () => void;
  onExploreMonasteries: () => void;
}

export default function HeroSection({ onPlanTrip, onExploreMonasteries }: HeroSectionProps) {
  const stats = [
    { label: 'Sacred Monasteries', value: '200+', icon: Mountain },
    { label: 'Cultural Festivals', value: '25+', icon: Calendar },
    { label: 'Heritage Sites', value: '50+', icon: MapPin },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${heroImage})` 
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
          Discover Sacred Heritage
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Monasteries of{' '}
          <span className="text-chart-3">Sikkim</span>
        </h1>
        
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-gray-200">
          Journey through ancient Buddhist monasteries nestled in the Himalayas. 
          Experience spiritual traditions, breathtaking landscapes, and cultural heritage 
          spanning centuries.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            onClick={onPlanTrip}
            className="bg-primary/90 hover:bg-primary text-white backdrop-blur-sm"
            data-testid="button-plan-trip"
          >
            Plan Your Journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={onExploreMonasteries}
            className="border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
            data-testid="button-explore-monasteries"
          >
            Explore Monasteries
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="h-8 w-8 mx-auto mb-2 text-chart-3" />
              <div className="text-2xl md:text-3xl font-bold mb-1" data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}