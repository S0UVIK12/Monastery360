import { useState } from 'react';
import { useLocation } from 'wouter';
import FilterBar from '@/components/FilterBar';
import MonasteryCard from '@/components/MonasteryCard';
import InteractiveMap from '@/components/InteractiveMap';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Grid, Map, List } from 'lucide-react';
import rumtekImage from '@assets/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png';
import heroImage from '@assets/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png';
import type { Monastery } from '@shared/schema';

export default function Monasteries() {
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'list'>('grid');
  const [selectedMonastery, setSelectedMonastery] = useState<Monastery | null>(null);
  const [, navigate] = useLocation();

  // Mock data - TODO: replace with real data
  const allMonasteries: Monastery[] = [
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

  // Filter monasteries based on selected criteria
  const filteredMonasteries = allMonasteries.filter((monastery) => {
    const matchesSearch = searchTerm === '' || 
      monastery.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monastery.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      monastery.significance.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRegion = selectedRegion === 'all' || monastery.region === selectedRegion;
    const matchesCategory = selectedCategory === 'all'; // TODO: implement category filtering
    const matchesSeason = selectedSeason === 'all'; // TODO: implement season filtering
    
    return matchesSearch && matchesRegion && matchesCategory && matchesSeason;
  });

  const hasActiveFilters = 
    searchTerm !== '' || 
    selectedRegion !== 'all' || 
    selectedCategory !== 'all' || 
    selectedSeason !== 'all';

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion('all');
    setSelectedCategory('all');
    setSelectedSeason('all');
  };

  const handleLearnMore = (monastery: Monastery) => {
    navigate(`/monasteries/${monastery.id}`);
  };

  const handleAddToTrip = (monastery: Monastery) => {
    console.log('Add to trip:', monastery.name);
    // TODO: implement trip planning functionality
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <Badge variant="secondary" className="mb-4">
            Sacred Heritage
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Monasteries of Sikkim
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Discover ancient Buddhist monasteries nestled in the Himalayas. Each monastery 
            tells a unique story of spiritual tradition, architectural beauty, and cultural heritage.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSeason={selectedSeason}
            onSeasonChange={setSelectedSeason}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* View Controls and Results Count */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {filteredMonasteries.length} of {allMonasteries.length} monasteries
            </span>
            {hasActiveFilters && (
              <Badge variant="outline">
                Filtered results
              </Badge>
            )}
          </div>

          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as typeof viewMode)}>
            <TabsList>
              <TabsTrigger value="grid" data-testid="view-grid">
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </TabsTrigger>
              <TabsTrigger value="map" data-testid="view-map">
                <Map className="w-4 h-4 mr-2" />
                Map
              </TabsTrigger>
              <TabsTrigger value="list" data-testid="view-list">
                <List className="w-4 h-4 mr-2" />
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content based on view mode */}
        <Tabs value={viewMode}>
          {/* Grid View */}
          <TabsContent value="grid">
            {filteredMonasteries.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredMonasteries.map((monastery) => (
                  <MonasteryCard
                    key={monastery.id}
                    monastery={monastery}
                    onLearnMore={handleLearnMore}
                    onAddToTrip={handleAddToTrip}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No monasteries found matching your criteria
                </div>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </TabsContent>

          {/* Map View */}
          <TabsContent value="map">
            <InteractiveMap
              monasteries={filteredMonasteries}
              onMonasterySelect={setSelectedMonastery}
              selectedMonastery={selectedMonastery}
            />
          </TabsContent>

          {/* List View */}
          <TabsContent value="list">
            {filteredMonasteries.length > 0 ? (
              <div className="space-y-6">
                {filteredMonasteries.map((monastery) => (
                  <div
                    key={monastery.id}
                    className="flex flex-col md:flex-row gap-6 p-6 border rounded-lg hover-elevate"
                  >
                    <img
                      src={monastery.image}
                      alt={monastery.name}
                      className="w-full md:w-48 h-32 object-cover rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-bold">{monastery.name}</h3>
                        <Badge variant="secondary">{monastery.region} Sikkim</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {monastery.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Best time:</span> {monastery.bestTimeToVisit}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleLearnMore(monastery)}
                          >
                            Learn More
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAddToTrip(monastery)}
                          >
                            Add to Trip
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">
                  No monasteries found matching your criteria
                </div>
                {hasActiveFilters && (
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Load More Button (for pagination if needed) */}
        {filteredMonasteries.length >= 6 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Monasteries
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}