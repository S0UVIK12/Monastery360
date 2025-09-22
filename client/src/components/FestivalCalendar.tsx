import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Clock, Users, Star } from 'lucide-react';
import type { Festival } from '@shared/schema';

interface FestivalCalendarProps {
  festivals: Festival[];
  onFestivalSelect: (festival: Festival) => void;
  selectedMonth?: string;
}

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const festivalTypes = {
  religious: { color: 'bg-primary/10 text-primary', label: 'Religious' },
  cultural: { color: 'bg-chart-2/10 text-chart-2', label: 'Cultural' },
  seasonal: { color: 'bg-chart-3/10 text-chart-3', label: 'Seasonal' },
  traditional: { color: 'bg-purple-500/10 text-purple-600', label: 'Traditional' }
};

export default function FestivalCalendar({ festivals, onFestivalSelect, selectedMonth }: FestivalCalendarProps) {
  const [currentView] = useState<'grid' | 'timeline'>('timeline');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Group festivals by month
  const festivalsByMonth = months.reduce((acc, month) => {
    acc[month] = festivals.filter(festival => 
      festival.date.toLowerCase().includes(month.toLowerCase())
    );
    return acc;
  }, {} as Record<string, Festival[]>);

  const upcomingFestivals = festivals.slice(0, 3); // Mock upcoming festivals

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Calendar className="w-6 h-6 mr-2" />
            Festival Calendar
          </h2>
          <p className="text-muted-foreground">
            Discover Sikkim's vibrant festivals and cultural celebrations
          </p>
        </div> 
        <div className="flex gap-2">
          <Button
            variant="default"
            size="sm"
            disabled
            data-testid="view-timeline"
          >
            Timeline
          </Button>
        </div>
      </div>

      {/* Quick Upcoming Festivals */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Festivals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingFestivals.map((festival) => (
              <div
                key={festival.id}
                onClick={() => onFestivalSelect(festival)}
                className="p-4 border rounded-lg hover-elevate cursor-pointer"
                data-testid={`upcoming-festival-${festival.id}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium line-clamp-1">{festival.name}</h4>
                  <Badge variant="outline" className="text-xs">
                    {festival.date}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {festival.description}
                </p>
                {festival.monastery && (
                  <div className="flex items-center text-xs text-muted-foreground">
                    <MapPin className="w-3 h-3 mr-1" />
                    {festival.monastery}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Timeline View */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            {festivals.slice(0, 8).map((festival, index) => (
              <div key={festival.id} className="flex items-start space-x-4 p-4 rounded-xl border border-border bg-background mb-4 group hover:cursor-pointer">
                {/* Timeline dot */}
                <div className="flex flex-col items-center pt-2">
                  <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0"></div>
                  {index < festivals.length - 1 && (
                    <div className="w-0.5 h-12 bg-border mt-2"></div>
                  )}
                </div>
                {/* Festival content */}
                <div
                  onClick={() => onFestivalSelect(festival)}
                  className="flex-1 group"
                  data-testid={`timeline-festival-${festival.id}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium group-hover:text-primary transition-colors">
                        {festival.name}
                      </h4>
                      <div className="flex items-center text-sm text-muted-foreground mt-1 gap-4 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {festival.date}
                        </span>
                        {festival.monastery && (
                          <span className="flex items-center gap-1">
                            <span className="mx-2">•</span>
                            <MapPin className="w-3 h-3 mr-1" />
                            {festival.monastery}
                          </span>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs ml-2 whitespace-nowrap">
                      {festival.significance}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                    {festival.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Legend */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="text-sm font-medium">Festival Types:</span>
              {Object.entries(festivalTypes).map(([type, config]) => (
                <div key={type} className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${config.color.split(' ')[0]}`}></div>
                  <span className="text-xs whitespace-nowrap">{config.label}</span>
                </div>
              ))}
            </div>
            <Badge variant="outline" className="text-xs">
              {festivals.length} Total Festivals
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}