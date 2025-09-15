import { useState } from 'react';
import FilterBar from '../FilterBar';

export default function FilterBarExample() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSeason, setSelectedSeason] = useState('all');

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

  return (
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
  );
}