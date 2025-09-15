import { useState } from 'react';
import TripPlannerWidget from '../TripPlannerWidget';
import type { TripItinerary } from '@shared/schema';

export default function TripPlannerWidgetExample() {
  const [generatedItinerary, setGeneratedItinerary] = useState<TripItinerary | null>(null);

  const handleGenerateItinerary = (type: string) => {
    // Mock itinerary generation
    const mockItinerary: TripItinerary = {
      id: '1',
      type: type as any,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Sikkim Adventure`,
      description: 'A carefully crafted journey through the spiritual heart of the Himalayas',
      days: [
        {
          day: 1,
          title: 'Arrival in Gangtok',
          activities: ['Check into hotel', 'Visit MG Marg', 'Evening at Enchey Monastery'],
          monasteries: ['Enchey Monastery']
        },
        {
          day: 2,
          title: 'East Sikkim Exploration',
          activities: ['Rumtek Monastery visit', 'Traditional lunch', 'Local handicraft shopping', 'Cultural performance'],
          monasteries: ['Rumtek Monastery']
        },
        {
          day: 3,
          title: 'Scenic Mountain Views',
          activities: ['Early morning drive to Tsomgo Lake', 'Visit Baba Mandir', 'Photography session'],
          monasteries: ['Baba Mandir']
        }
      ]
    };

    setGeneratedItinerary(mockItinerary);
  };

  return (
    <TripPlannerWidget
      onGenerateItinerary={handleGenerateItinerary}
      generatedItinerary={generatedItinerary}
    />
  );
}