import { useParams, useLocation } from 'wouter';
import { useEffect, useState } from 'react';
import type { Monastery } from '@shared/schema';
import rumtekImage from '@assets/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png';
import heroImage from '@assets/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const mockMonasteries: Monastery[] = [
  {
    id: '1',
    name: 'Rumtek Monastery',
    description: 'The largest monastery in Sikkim and seat of the Karmapa. Features stunning Tibetan architecture and houses precious Buddhist artifacts including golden stupas and ancient manuscripts.',
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
    description: 'A 200-year-old monastery perched on a hilltop with panoramic views of Gangtok and surrounding mountains. Known for its beautiful murals and peaceful atmosphere.',
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
    description: 'One of the oldest and most important monasteries in Sikkim, featuring a seven-tiered wooden sculpture representing the celestial palace of Guru Rinpoche.',
    region: 'West',
    latitude: '27.2060',
    longitude: '88.2470',
    image: heroImage,
    significance: 'Nyingma school headquarters',
    bestTimeToVisit: 'October to May'
  },
  {
    id: '4',
    name: 'Tashiding Monastery',
    description: 'Sacred monastery situated on a heart-shaped hilltop between Rathong and Rangeet rivers. Famous for its sacred Bumchu ceremony and stunning mountain views.',
    region: 'West',
    latitude: '27.3220',
    longitude: '88.2720',
    image: rumtekImage,
    significance: 'Sacred Nyingma site',
    bestTimeToVisit: 'Year round'
  },
  {
    id: '5',
    name: 'Phensang Monastery',
    description: 'A serene monastery in North Sikkim known for its pristine mountain location and traditional Buddhist practices. Offers breathtaking views of snow-capped peaks.',
    region: 'North',
    latitude: '27.7000',
    longitude: '88.5000',
    image: heroImage,
    significance: 'High altitude monastery',
    bestTimeToVisit: 'May to September'
  },
  {
    id: '6',
    name: 'Bon Monastery',
    description: 'Unique monastery following the ancient Bon tradition, offering insights into pre-Buddhist spiritual practices of the Himalayan region.',
    region: 'South',
    latitude: '27.1000',
    longitude: '88.4000',
    image: rumtekImage,
    significance: 'Bon tradition',
    bestTimeToVisit: 'October to April'
  }
];

export default function MonasteryDetail() {
  const params = useParams();
  const [, navigate] = useLocation();
  const [monastery, setMonastery] = useState<Monastery | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  useEffect(() => {
    const found = mockMonasteries.find(m => m.id === params.id);
    setMonastery(found || null);
  }, [params.id]);

  if (!monastery) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Monastery Not Found</h2>
        <Button onClick={() => navigate('/monasteries')}>Back to List</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <Button variant="outline" className="mb-6" onClick={() => navigate('/monasteries')}>
        &larr; Back to Monasteries
      </Button>
      <div className="flex flex-col md:flex-row gap-8">
        <img src={monastery.image} alt={monastery.name} className="w-full md:w-1/2 h-80 object-cover rounded-lg" />
        <div className="flex-1">
          <Badge variant="secondary" className="mb-2">{monastery.region} Sikkim</Badge>
          <h1 className="text-3xl font-bold mb-4">{monastery.name}</h1>
          <p className="mb-4 text-muted-foreground">{monastery.description}</p>
          <div className="mb-2"><strong>Significance:</strong> {monastery.significance}</div>
          <div className="mb-2"><strong>Best Time to Visit:</strong> {monastery.bestTimeToVisit}</div>
          <div className="mb-2"><strong>Location:</strong> {monastery.latitude}, {monastery.longitude}</div>
        </div>
      </div>
      {/* Google Maps 360° View */}
      {monastery.name === 'Rumtek Monastery' && (
        <div className="mt-12 flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1757948939349!6m8!1m7!1sCAoSFkNJSE0wb2dLRUlDQWdJRHNqcnJmWUE.!2m2!1d27.3059104605377!2d88.53628917812625!3f178.54180868097734!4f7.824247700603308!5f0.7820865974627469"
            width="800"
            height="600"
            style={{ border: 0, borderRadius: '12px', maxWidth: '100%' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Rumtek Monastery 360 View"
          ></iframe>
        </div>
      )}
      {monastery.name === 'Enchey Monastery' && (
        <div className="mt-12 flex justify-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!4v1757952078218!6m8!1m7!1sCAoSF0NJSE0wb2dLRUlDQWdJQ0pzTXEzOWdF!2m2!1d27.33593677395685!2d88.61916587167339!3f78.5680847329821!4f-3.821145325958625!5f0.7820865974627469"
            width="800"
            height="600"
            style={{ border: 0, borderRadius: '12px', maxWidth: '100%' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Enchey Monastery 360 View"
          ></iframe>
        </div>
      )}
    </div>
  );
}
