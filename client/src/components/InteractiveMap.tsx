import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Navigation, Mountain, Star, ExternalLink } from 'lucide-react';
import type { Monastery } from '@shared/schema';

interface InteractiveMapProps {
  monasteries: Monastery[];
  onMonasterySelect: (monastery: Monastery) => void;
  selectedMonastery?: Monastery | null;
}

// Mock map component since we can't use actual maps in this demo
export default function InteractiveMap({ monasteries, onMonasterySelect, selectedMonastery }: InteractiveMapProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 27.5, lng: 88.5 });
  
  const regions = {
    North: { color: 'bg-blue-500', position: { top: '20%', left: '45%' } },
    South: { color: 'bg-green-500', position: { top: '70%', left: '50%' } },
    East: { color: 'bg-orange-500', position: { top: '45%', left: '70%' } },
    West: { color: 'bg-purple-500', position: { top: '45%', left: '25%' } },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Map Area */}
      <div className="lg:col-span-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              Monastery Locations in Sikkim
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* Mock Map Interface */}
            <div className="relative bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg h-96 overflow-hidden border-2 border-dashed border-border">
              {/* Background Mountains */}
              <div className="absolute inset-0 bg-gradient-to-t from-green-200/50 to-blue-300/30 dark:from-green-800/30 dark:to-blue-900/20">
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
                  <Mountain className="w-12 h-12 mx-auto text-primary mb-2" />
                  <Badge variant="secondary">Interactive Map</Badge>
                </div>
              </div>

              {/* Region Markers */}
              {Object.entries(regions).map(([region, config]) => (
                <div
                  key={region}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={config.position}
                >
                  <button
                    onClick={() => console.log(`Zoom to ${region} region`)}
                    className={`w-8 h-8 rounded-full ${config.color} hover:scale-110 transition-transform shadow-lg border-2 border-white flex items-center justify-center group`}
                    data-testid={`map-region-${region.toLowerCase()}`}
                  >
                    <span className="text-white font-bold text-xs">{region[0]}</span>
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {region} Sikkim
                    </div>
                  </button>
                </div>
              ))}

              {/* Monastery Pins */}
              {monasteries.slice(0, 6).map((monastery, index) => (
                <div
                  key={monastery.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    top: `${30 + (index % 3) * 20}%`,
                    left: `${25 + (index % 4) * 15}%`
                  }}
                  onClick={() => onMonasterySelect(monastery)}
                >
                  <div className={`relative group ${selectedMonastery?.id === monastery.id ? 'scale-125' : ''}`}>
                    <div className={`w-6 h-6 rounded-full ${selectedMonastery?.id === monastery.id ? 'bg-chart-2' : 'bg-primary'} border-2 border-white shadow-lg hover:scale-110 transition-all flex items-center justify-center`}>
                      <Mountain className="w-3 h-3 text-white" />
                    </div>
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {monastery.name}
                    </div>
                  </div>
                </div>
              ))}

              {/* Controls */}
              <div className="absolute bottom-4 right-4 space-y-2">
                <Button size="icon" variant="secondary" className="bg-white/90">
                  <Navigation className="w-4 h-4" />
                </Button>
                <div className="text-xs bg-white/90 rounded px-2 py-1">
                  Zoom: 1:50000
                </div>
              </div>
            </div>

            {/* Map Legend */}
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              {Object.entries(regions).map(([region, config]) => (
                <div key={region} className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${config.color} mr-2`}></div>
                  <span>{region} Sikkim</span>
                </div>
              ))}
              <div className="flex items-center">
                <Mountain className="w-3 h-3 text-primary mr-2" />
                <span>Monasteries</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar Info */}
      <div className="space-y-4">
        {selectedMonastery ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-lg">
                <span className="truncate">{selectedMonastery.name}</span>
                <Badge variant="secondary">
                  {selectedMonastery.region}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <img
                src={selectedMonastery.image}
                alt={selectedMonastery.name}
                className="w-full h-32 object-cover rounded"
              />
              
              <p className="text-sm text-muted-foreground">
                {selectedMonastery.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 mr-2 text-chart-3" />
                  <span className="font-medium">{selectedMonastery.significance}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <MapPin className="w-4 h-4 mr-2 text-muted-foreground" />
                  <span>{selectedMonastery.latitude}, {selectedMonastery.longitude}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Get Directions
                </Button>
                <Button size="sm" variant="outline">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <p className="text-sm">
                Click on any monastery marker to view details and get directions
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Map Statistics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Total Monasteries</span>
              <Badge variant="outline">{monasteries.length}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Regions Covered</span>
              <Badge variant="outline">4</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Heritage Sites</span>
              <Badge variant="outline">15+</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}