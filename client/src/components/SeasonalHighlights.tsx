import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Snowflake, Flower, Sun, Leaf, ArrowRight } from 'lucide-react';
import springImage from '@assets/generated_images/Spring_rhododendron_blooms_Sikkim_236b802a.png';
import winterImage from '@assets/generated_images/Winter_monastery_snow_scene_1c5679e5.png';

interface SeasonalHighlight {
  season: string;
  title: string;
  description: string;
  image: string;
  icon: any;
  color: string;
  bestMonths: string;
  attractions: string[];
}

interface SeasonalHighlightsProps {
  onExploreAttraction: (season: string) => void;
}

const seasonalData: SeasonalHighlight[] = [
  {
    season: 'spring',
    title: 'Rhododendron Blooms',
    description: 'Witness the spectacular display of colorful rhododendrons painting the mountainsides in vibrant hues across Sikkim\'s valleys and monastery gardens.',
    image: springImage,
    icon: Flower,
    color: 'text-pink-600',
    bestMonths: 'March - May',
    attractions: ['Rhododendron Sanctuary', 'Valley of Flowers', 'Monastery Gardens', 'Nature Trails']
  },
  {
    season: 'winter',
    title: 'Snow-Covered Monasteries',
    description: 'Experience the serene beauty of ancient monasteries adorned with fresh snow, creating a mystical atmosphere perfect for meditation and photography.',
    image: winterImage,
    icon: Snowflake,
    color: 'text-blue-600',
    bestMonths: 'December - February',
    attractions: ['Snow Monasteries', 'Winter Festivals', 'Ice Formations', 'Mountain Views']
  }
];

export default function SeasonalHighlights({ onExploreAttraction }: SeasonalHighlightsProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Seasonal Wonders
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience Sikkim Through the Seasons
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Each season brings its own magical charm to Sikkim's monasteries and landscapes. 
            Discover the perfect time for your spiritual journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {seasonalData.map((season) => (
            <Card key={season.season} className="group hover-elevate overflow-hidden">
              <div className="relative">
                <img
                  src={season.image}
                  alt={season.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 text-black">
                    <season.icon className={`w-4 h-4 mr-1 ${season.color}`} />
                    {season.bestMonths}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <season.icon className={`w-6 h-6 mr-2 ${season.color}`} />
                  <h3 className="text-xl font-bold">{season.title}</h3>
                </div>
                
                <p className="text-muted-foreground mb-4">
                  {season.description}
                </p>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Key Attractions:</h4>
                  <div className="flex flex-wrap gap-2">
                    {season.attractions.map((attraction, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {attraction}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Button
                  onClick={() => onExploreAttraction(season.season)}
                  className="w-full"
                  data-testid={`button-explore-${season.season}`}
                >
                  Explore {season.title}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Seasons Preview */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { season: 'Summer', icon: Sun, months: 'Jun-Aug', highlight: 'Clear Skies' },
            { season: 'Autumn', icon: Leaf, months: 'Sep-Nov', highlight: 'Festivals' }
          ].map((item, index) => (
            <Card key={index} className="p-4 text-center hover-elevate cursor-pointer">
              <item.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h4 className="font-medium">{item.season}</h4>
              <p className="text-sm text-muted-foreground">{item.months}</p>
              <Badge variant="outline" className="mt-2 text-xs">
                {item.highlight}
              </Badge>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}