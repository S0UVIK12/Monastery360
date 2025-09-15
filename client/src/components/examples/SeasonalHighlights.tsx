import SeasonalHighlights from '../SeasonalHighlights';

export default function SeasonalHighlightsExample() {
  return (
    <SeasonalHighlights
      onExploreAttraction={(season) => console.log('Explore attraction for season:', season)}
    />
  );
}