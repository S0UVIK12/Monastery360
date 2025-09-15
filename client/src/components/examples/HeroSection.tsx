import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection
      onPlanTrip={() => console.log('Plan trip clicked')}
      onExploreMonasteries={() => console.log('Explore monasteries clicked')}
    />
  );
}