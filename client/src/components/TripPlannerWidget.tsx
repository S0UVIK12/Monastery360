import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Clock, Users, ArrowRight, Check } from 'lucide-react';
import type { TripItinerary } from '@shared/schema';

interface TripPlannerWidgetProps {
  onGenerateItinerary: (type: string) => void;
  generatedItinerary?: TripItinerary | null;
}

const tripTypes = [
  {
    value: '3-day',
    label: '3-Day Quick Tour',
    description: 'Perfect for weekend getaways',
    duration: '3 days',
    highlights: ['Major monasteries', 'Gangtok highlights', 'Local culture']
  },
  {
    value: '7-day',
    label: '7-Day Complete Experience',
    description: 'Comprehensive Sikkim exploration',
    duration: '7 days',
    highlights: ['All regions', 'Multiple monasteries', 'Adventure activities', 'Local festivals']
  },
  {
    value: 'adventure',
    label: 'Adventure & Trekking',
    description: 'For thrill seekers',
    duration: '5-10 days',
    highlights: ['Trekking routes', 'Mountain monasteries', 'Wildlife', 'Photography']
  },
  {
    value: 'cultural',
    label: 'Cultural Immersion',
    description: 'Deep cultural experiences',
    duration: '4-6 days',
    highlights: ['Festivals', 'Monastery stays', 'Local traditions', 'Handicrafts']
  }
];

export default function TripPlannerWidget({ onGenerateItinerary, generatedItinerary }: TripPlannerWidgetProps) {
  const [selectedTripType, setSelectedTripType] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');

  const handleGenerate = () => {
    if (selectedTripType) {
      onGenerateItinerary(selectedTripType);
      console.log('Generating itinerary for:', selectedTripType);
    }
  };

  const selectedTrip = tripTypes.find(t => t.value === selectedTripType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            Plan Your Perfect Journey
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Trip Type Selection */}
          <div className="space-y-4">
            <label className="text-sm font-medium">Choose Your Adventure</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripTypes.map((trip) => (
                <button
                  key={trip.value}
                  onClick={() => setSelectedTripType(trip.value)}
                  className={`p-4 border rounded-lg text-left transition-all hover-elevate ${
                    selectedTripType === trip.value
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                  data-testid={`trip-type-${trip.value}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{trip.label}</h3>
                    <Badge variant="outline" className="text-xs">
                      {trip.duration}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {trip.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {trip.highlights.map((highlight, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          {selectedTripType && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration Preference</label>
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger data-testid="select-duration">
                    <SelectValue placeholder="Flexible" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexible">Flexible</SelectItem>
                    <SelectItem value="strict">Exact duration</SelectItem>
                    <SelectItem value="extended">Can extend</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Group Size</label>
                <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                  <SelectTrigger data-testid="select-group">
                    <SelectValue placeholder="Solo traveler" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">Solo traveler</SelectItem>
                    <SelectItem value="couple">Couple</SelectItem>
                    <SelectItem value="family">Family (3-5)</SelectItem>
                    <SelectItem value="group">Group (6+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Generate Button */}
          {selectedTripType && (
            <Button 
              onClick={handleGenerate} 
              className="w-full"
              data-testid="button-generate-itinerary"
            >
              Generate My Itinerary
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Generated Itinerary Preview */}
      {generatedItinerary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Your Personalized Itinerary</span>
              <Badge variant="secondary">{generatedItinerary.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="font-semibold mb-2" data-testid="itinerary-title">
              {generatedItinerary.title}
            </h3>
            <p className="text-muted-foreground mb-4">
              {generatedItinerary.description}
            </p>
            
            <div className="space-y-3">
              {generatedItinerary.days.slice(0, 3).map((day) => (
                <div key={day.day} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <Badge variant="outline" className="mt-1">
                    Day {day.day}
                  </Badge>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{day.title}</h4>
                    <div className="text-sm text-muted-foreground">
                      {day.activities.slice(0, 2).map((activity, index) => (
                        <div key={index} className="flex items-center">
                          <Check className="w-3 h-3 mr-1 text-green-600" />
                          {activity}
                        </div>
                      ))}
                      {day.activities.length > 2 && (
                        <span className="text-xs">+{day.activities.length - 2} more activities</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {generatedItinerary.days.length > 3 && (
                <div className="text-center py-2">
                  <Button variant="outline" size="sm">
                    View Complete Itinerary
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}