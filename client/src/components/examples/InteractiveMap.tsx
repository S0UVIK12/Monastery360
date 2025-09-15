import { useState } from 'react';
import InteractiveMap from '../InteractiveMap';
import { Monastery } from '@shared/schema';
import rumtekImage from '@assets/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png';
import heroImage from '@assets/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png';

export default function InteractiveMapExample() {
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);

  const mockMonasteries = [
    {
      id: '1',
      name: 'Rumtek Monastery',
      description: 'The largest monastery in Sikkim and seat of the Karmapa',
      region: 'East',
      latitude: '27.3350',
      longitude: '88.5593',
      image: rumtekImage,
      significance: 'Seat of the 16th Karmapa',
      bestTimeToVisit: 'October to May'
    },
    {
      id: '2',
      name: 'Enchey Monastery',
      description: 'A 200-year-old monastery with beautiful mountain views',
      region: 'East',
      latitude: '27.3330',
      longitude: '88.6140',
      image: heroImage,
      significance: 'Nyingma tradition',
      bestTimeToVisit: 'March to June'
    },
    {
      id: '3',
      name: 'Pemayangtse Monastery',
      description: 'One of the oldest monasteries in Sikkim',
      region: 'West',
      latitude: '27.2060',
      longitude: '88.2470',
      image: heroImage,
      significance: 'Nyingma school',
      bestTimeToVisit: 'October to May'
    },
    {
      id: '4',
      name: 'Tashiding Monastery',
      description: 'Sacred monastery on a hilltop',
      region: 'West',
      latitude: '27.3220',
      longitude: '88.2720',
      image: rumtekImage,
      significance: 'Nyingma tradition',
      bestTimeToVisit: 'Year round'
    }
  ];

  return (
    <InteractiveMap
      monasteries={mockMonasteries}
      onMonasterySelect={setSelectedMonastery}
      selectedMonastery={selectedMonastery}
    />
  );
}