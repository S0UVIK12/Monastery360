import MonasteryCard from '../MonasteryCard';
import rumtekImage from '@assets/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png';

export default function MonasteryCardExample() {
  const mockMonastery = {
    id: '1',
    name: 'Rumtek Monastery',
    description: 'One of the largest and most significant monasteries in Sikkim, serving as the seat of the Karmapa. Features stunning architecture and houses precious Buddhist artifacts.',
    region: 'East',
    latitude: '27.3350',
    longitude: '88.5593',
    image: rumtekImage,
    significance: 'Seat of the 16th Karmapa',
    bestTimeToVisit: 'October to May'
  };

  return (
    <div className="max-w-sm">
      <MonasteryCard
        monastery={mockMonastery}
        onLearnMore={(monastery) => console.log('Learn more about', monastery.name)}
        onAddToTrip={(monastery) => console.log('Add to trip:', monastery.name)}
      />
    </div>
  );
}