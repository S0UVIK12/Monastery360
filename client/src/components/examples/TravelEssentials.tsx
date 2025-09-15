import TravelEssentials from '../TravelEssentials';

export default function TravelEssentialsExample() {
  return (
    <TravelEssentials
      onBookAccommodation={(type) => console.log('Book accommodation:', type)}
      onApplyPermit={(permitType) => console.log('Apply for permit:', permitType)}
    />
  );
}