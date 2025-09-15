import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { postTripPlanner } from '@/lib/api';
import HeroSection from '@/components/HeroSection';
import SeasonalHighlights from '@/components/SeasonalHighlights';
import MonasteryCard from '@/components/MonasteryCard';
import TripPlannerWidget from '@/components/TripPlannerWidget';
import FestivalCalendar from '@/components/FestivalCalendar';
import BlogSection from '@/components/BlogSection';
import { Button } from '@/components/ui/button';
// ...existing code...
import { useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Star, Users, Globe, Mountain } from 'lucide-react';
import rumtekImage from '@assets/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png';
import heroImage from '@assets/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png';
import type { TripItinerary } from '@shared/schema';

export default function Home() {
  // Scroll to trip planner if hash is present
  useEffect(() => {
    if (window.location.hash === '#trip-planner') {
      setTimeout(() => {
        document.getElementById('trip-planner')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, []);
  const [generatedItinerary, setGeneratedItinerary] = useState<TripItinerary | null>(null);
  const [planning, setPlanning] = useState(false);
  const [planError, setPlanError] = useState<string | null>(null);
  const [, navigate] = useLocation();

  // Mock data - TODO: remove when connecting to backend
  const featuredMonasteries = [
    {
      id: '1',
      name: 'Rumtek Monastery',
      description: 'The largest monastery in Sikkim and seat of the Karmapa. Features stunning architecture and houses precious Buddhist artifacts.',
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
      description: 'A 200-year-old monastery with beautiful mountain views and rich spiritual traditions.',
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
      description: 'One of the oldest and most important monasteries in Sikkim with extraordinary architectural beauty.',
      region: 'West',
      latitude: '27.2060',
      longitude: '88.2470',
      image: heroImage,
      significance: 'Nyingma school',
      bestTimeToVisit: 'October to May'
    }
  ];

  const upcomingFestivals = [
    {
      id: '1',
      name: 'Losar',
      date: 'February 2024',
      description: 'Tibetan New Year celebrated with traditional dances, prayers, and colorful decorations.',
      monastery: 'All Monasteries',
      significance: 'New Year Celebration'
    },
    {
      id: '2',
      name: 'Saga Dawa',
      date: 'May 2024',
      description: 'Sacred month commemorating Buddha\'s birth, enlightenment, and nirvana.',
      monastery: 'Pemayangtse Monastery',
      significance: 'Buddha Day'
    }
  ];

  const blogPosts = [
    {
      id: '1',
      title: 'A Spiritual Journey Through Rumtek Monastery',
      content: 'Discover the profound spiritual experience of visiting one of Sikkim\'s most significant monasteries. From the early morning prayers echoing through the halls to the intricate Buddhist art adorning every surface, Rumtek offers a window into centuries-old traditions.',
      author: 'Priya Sharma',
      publishedAt: new Date('2024-01-15T00:00:00Z'),
      category: 'experiences',
      image: rumtekImage
    },
    {
      id: '2',
      title: 'Essential Tips for First-Time Visitors to Sikkim Monasteries',
      content: 'Planning your first monastery visit in Sikkim? This comprehensive guide covers everything from dress codes and photography etiquette to the best times for visits and cultural considerations.',
      author: 'David Chen',
      publishedAt: new Date('2024-01-20T00:00:00Z'),
      category: 'travel-tips',
      image: heroImage
    }
  ];

  const handlePlanTrip = () => {
    // Scroll to trip planner section
    document.getElementById('trip-planner')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreMonasteries = () => {
    navigate('/monasteries');
  };

  const handleGenerateItinerary = async (type: string) => {
    try {
      setPlanning(true);
      setPlanError(null);
      const itinerary = await postTripPlanner({ type: type as any });
      setGeneratedItinerary(itinerary);
    } catch (err: any) {
      setPlanError(err.message || 'Failed to generate itinerary');
    } finally {
      setPlanning(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        onPlanTrip={handlePlanTrip}
        onExploreMonasteries={handleExploreMonasteries}
      />

      {/* Manuscripts Section */}
      <section id="manuscripts" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Ancient Manuscripts
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Buddhist Manuscripts
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover rare and sacred manuscripts preserved in Sikkim's monasteries.
            </p>
          </div>
          <div className="max-w-2xl mx-auto flex flex-col gap-6">
            {/* Show at least two manuscripts */}
            <button
              className="bg-background rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-accent/30 transition cursor-pointer w-full text-left"
              onClick={() => navigate('/manuscripts/1')}
              aria-label="View Palm-leaf Buddhist Manuscript"
            >
              <img src="/generated_images/1.jpeg" alt="Palm-leaf Buddhist Manuscript" className="w-40 h-28 object-cover rounded" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Palm-leaf Buddhist Manuscript</h3>
                <p className="text-muted-foreground mb-2 text-sm">
                  An 11th-century palm-leaf manuscript in Sanskrit, preserved in a Himalayan monastery. Such manuscripts contain sacred Buddhist texts, prayers, and teachings.
                </p>
                <Badge variant="outline">Sanskrit • 11th Century</Badge>
              </div>
            </button>
            <button
              className="bg-background rounded-lg shadow p-6 flex flex-col md:flex-row gap-6 items-center hover:bg-accent/30 transition cursor-pointer w-full text-left"
              onClick={() => navigate('/manuscripts/2')}
              aria-label="View Tibetan Illuminated Manuscript"
            >
              <img src="/generated_images/2.jpeg" alt="Tibetan Illuminated Manuscript" className="w-40 h-28 object-cover rounded" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Tibetan Illuminated Manuscript</h3>
                <p className="text-muted-foreground mb-2 text-sm">
                  A beautifully illustrated Tibetan manuscript featuring Buddhist iconography and teachings, dating to the 14th century.
                </p>
                <Badge variant="outline">Tibetan • 14th Century</Badge>
              </div>
            </button>
            {/* Button to view more manuscripts */}
            <div className="flex justify-center mt-4">
              <Button variant="outline" size="lg" onClick={() => navigate('/manuscripts')}>
                View More Manuscripts
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* Features Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Discover Sikkim
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your Gateway to Sacred Heritage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Mountain,
                title: 'Sacred Monasteries',
                description: 'Explore 200+ ancient monasteries with rich Buddhist heritage',
                color: 'text-primary'
              },
              {
                icon: Globe,
                title: 'Interactive Maps',
                description: 'Navigate with detailed maps and location-based information',
                color: 'text-chart-2'
              },
              {
                icon: Users,
                title: 'Cultural Experiences',
                description: 'Immerse in local festivals, traditions, and authentic experiences',
                color: 'text-chart-3'
              },
              {
                icon: Star,
                title: 'Expert Guidance',
                description: 'Curated trip plans and insider tips from local experts',
                color: 'text-purple-600'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover-elevate">
                <CardContent className="p-6">
                  <feature.icon className={`w-12 h-12 mx-auto mb-4 ${feature.color}`} />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Monasteries */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="secondary" className="mb-4">
                Featured Destinations
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Must-Visit Monasteries
              </h2>
              <p className="text-muted-foreground">
                Start your spiritual journey with these iconic monasteries
              </p>
            </div>
            <Button variant="outline" onClick={handleExploreMonasteries}>
              View All Monasteries
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMonasteries.map((monastery) => (
              <MonasteryCard
                key={monastery.id}
                monastery={monastery}
                onLearnMore={(m) => navigate(`/monasteries/${m.id}`)}
                onAddToTrip={(m) => console.log('Add to trip:', m.name)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Highlights */}
      <SeasonalHighlights
        onExploreAttraction={(season) => console.log('Explore season:', season)}
      />

      {/* Trip Planner */}
      <section id="trip-planner" className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Plan Your Journey
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Personalized Trip Planning
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Let us create the perfect itinerary based on your interests, duration, and travel style
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TripPlannerWidget
              onGenerateItinerary={handleGenerateItinerary}
              generatedItinerary={generatedItinerary}
            />
            {planning && (
              <p className="text-center text-sm text-muted-foreground mt-2">Generating your itinerary…</p>
            )}
            {planError && (
              <p className="text-center text-sm text-red-600 mt-2" role="alert">{planError}</p>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Festivals */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Cultural Calendar
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Festivals
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <FestivalCalendar
              festivals={upcomingFestivals}
              onFestivalSelect={(festival) => console.log('Selected festival:', festival.name)}
            />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <BlogSection
        blogs={blogPosts}
        onReadMore={(blog) => navigate(`/blog/${blog.id}`)}
        featuredBlog={blogPosts[0]}
      />
    </div>
  );
}