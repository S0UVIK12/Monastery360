import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, MapPin, Calendar, Mountain } from 'lucide-react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedRegion: string;
  onRegionChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedSeason: string;
  onSeasonChange: (value: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const regions = [
  { value: 'all', label: 'All Regions', icon: MapPin },
  { value: 'North', label: 'North Sikkim', icon: Mountain },
  { value: 'South', label: 'South Sikkim', icon: Mountain },
  { value: 'East', label: 'East Sikkim', icon: Mountain },
  { value: 'West', label: 'West Sikkim', icon: Mountain },
];

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'monastery', label: 'Monasteries' },
  { value: 'heritage', label: 'Heritage Sites' },
  { value: 'seasonal', label: 'Seasonal Attractions' },
];

const seasons = [
  { value: 'all', label: 'All Seasons' },
  { value: 'spring', label: 'Spring (Mar-May)' },
  { value: 'summer', label: 'Summer (Jun-Aug)' },
  { value: 'autumn', label: 'Autumn (Sep-Nov)' },
  { value: 'winter', label: 'Winter (Dec-Feb)' },
];

export default function FilterBar({
  searchTerm,
  onSearchChange,
  selectedRegion,
  onRegionChange,
  selectedCategory,
  onCategoryChange,
  selectedSeason,
  onSeasonChange,
  onClearFilters,
  hasActiveFilters
}: FilterBarProps) {
  return (
    <div className="bg-card border rounded-lg p-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search monasteries, festivals, places..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
          data-testid="input-search"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select value={selectedRegion} onValueChange={onRegionChange}>
            <SelectTrigger data-testid="select-region">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  <div className="flex items-center">
                    <region.icon className="w-4 h-4 mr-2" />
                    {region.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger data-testid="select-category">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedSeason} onValueChange={onSeasonChange}>
            <SelectTrigger data-testid="select-season">
              <SelectValue placeholder="Best Season" />
            </SelectTrigger>
            <SelectContent>
              {seasons.map((season) => (
                <SelectItem key={season.value} value={season.value}>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    {season.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="lg:w-auto"
            data-testid="button-clear-filters"
          >
            <X className="w-4 h-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground">Active filters:</span>
          {searchTerm && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Search: "{searchTerm}"
              <button onClick={() => onSearchChange('')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedRegion !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Region: {regions.find(r => r.value === selectedRegion)?.label}
              <button onClick={() => onRegionChange('all')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Category: {categories.find(c => c.value === selectedCategory)?.label}
              <button onClick={() => onCategoryChange('all')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
          {selectedSeason !== 'all' && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Season: {seasons.find(s => s.value === selectedSeason)?.label}
              <button onClick={() => onSeasonChange('all')}>
                <X className="w-3 h-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}