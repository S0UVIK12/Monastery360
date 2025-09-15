import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star } from 'lucide-react';
import type { Monastery } from '@shared/schema';

interface MonasteryCardProps {
  monastery: Monastery;
  onLearnMore: (monastery: Monastery) => void;
  onAddToTrip?: (monastery: Monastery) => void;
}

export default function MonasteryCard({ monastery, onLearnMore, onAddToTrip }: MonasteryCardProps) {
  const regionColors = {
    North: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
    South: 'bg-green-500/10 text-green-700 dark:text-green-300',
    East: 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
    West: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
  };

  return (
    <Card className="group hover-elevate overflow-hidden h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={monastery.image}
          alt={monastery.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <Badge 
            variant="secondary" 
            className={`${regionColors[monastery.region as keyof typeof regionColors]} backdrop-blur-sm`}
          >
            <MapPin className="w-3 h-3 mr-1" />
            {monastery.region} Sikkim
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 flex-1">
        <h3 className="text-xl font-bold mb-2 line-clamp-2" data-testid={`monastery-name-${monastery.id}`}>
          {monastery.name}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {monastery.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            <span>Best time: {monastery.bestTimeToVisit}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <Star className="w-4 h-4 mr-2 text-chart-3" />
            <span className="font-medium">{monastery.significance}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => onLearnMore(monastery)}
          data-testid={`button-learn-more-${monastery.id}`}
        >
          Learn More
        </Button>
        {onAddToTrip && (
          <Button 
            className="flex-1"
            onClick={() => onAddToTrip(monastery)}
            data-testid={`button-add-to-trip-${monastery.id}`}
          >
            Add to Trip
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}