import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedDatabase } from "./seed";
import { insertMonasterySchema, insertFestivalSchema, insertAccommodationSchema, insertBlogSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Monastery routes
  app.get("/api/monasteries", async (req, res) => {
    try {
      const { region, search, limit, offset } = req.query;
      const monasteries = await storage.getMonasteries({
        region: region as string,
        search: search as string,
        limit: limit ? parseInt(limit as string) : undefined,
        offset: offset ? parseInt(offset as string) : undefined,
      });
      res.json(monasteries);
    } catch (error) {
      console.error('Error fetching monasteries:', error);
      res.status(500).json({ error: 'Failed to fetch monasteries' });
    }
  });

  app.get("/api/monasteries/:id", async (req, res) => {
    try {
      const monastery = await storage.getMonastery(req.params.id);
      if (!monastery) {
        return res.status(404).json({ error: 'Monastery not found' });
      }
      res.json(monastery);
    } catch (error) {
      console.error('Error fetching monastery:', error);
      res.status(500).json({ error: 'Failed to fetch monastery' });
    }
  });

  app.post("/api/monasteries", async (req, res) => {
    try {
      const validatedData = insertMonasterySchema.parse(req.body);
      const monastery = await storage.createMonastery(validatedData);
      res.status(201).json(monastery);
    } catch (error) {
      console.error('Error creating monastery:', error);
      res.status(400).json({ error: 'Invalid monastery data' });
    }
  });

  // Festival routes
  app.get("/api/festivals", async (req, res) => {
    try {
      const { month, monastery, limit } = req.query;
      const festivals = await storage.getFestivals({
        month: month as string,
        monastery: monastery as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(festivals);
    } catch (error) {
      console.error('Error fetching festivals:', error);
      res.status(500).json({ error: 'Failed to fetch festivals' });
    }
  });

  app.get("/api/festivals/:id", async (req, res) => {
    try {
      const festival = await storage.getFestival(req.params.id);
      if (!festival) {
        return res.status(404).json({ error: 'Festival not found' });
      }
      res.json(festival);
    } catch (error) {
      console.error('Error fetching festival:', error);
      res.status(500).json({ error: 'Failed to fetch festival' });
    }
  });

  // Accommodation routes
  app.get("/api/accommodations", async (req, res) => {
    try {
      const { type, location, limit } = req.query;
      const accommodations = await storage.getAccommodations({
        type: type as string,
        location: location as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(accommodations);
    } catch (error) {
      console.error('Error fetching accommodations:', error);
      res.status(500).json({ error: 'Failed to fetch accommodations' });
    }
  });

  app.get("/api/accommodations/:id", async (req, res) => {
    try {
      const accommodation = await storage.getAccommodation(req.params.id);
      if (!accommodation) {
        return res.status(404).json({ error: 'Accommodation not found' });
      }
      res.json(accommodation);
    } catch (error) {
      console.error('Error fetching accommodation:', error);
      res.status(500).json({ error: 'Failed to fetch accommodation' });
    }
  });

  // Blog routes
  app.get("/api/blogs", async (req, res) => {
    try {
      const { category, author, limit } = req.query;
      const blogs = await storage.getBlogs({
        category: category as string,
        author: author as string,
        limit: limit ? parseInt(limit as string) : undefined,
      });
      res.json(blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      res.status(500).json({ error: 'Failed to fetch blogs' });
    }
  });

  app.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlog(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
      res.json(blog);
    } catch (error) {
      console.error('Error fetching blog:', error);
      res.status(500).json({ error: 'Failed to fetch blog' });
    }
  });

  // Trip planner route
  app.post("/api/trip-planner", async (req, res) => {
    try {
      const { type, duration, groupSize, interests } = req.body;
      
      // Get relevant monasteries based on trip type
      const monasteries = await storage.getMonasteries({ limit: 10 });
      const festivals = await storage.getFestivals({ limit: 5 });
      
      // Generate itinerary based on type
      let itinerary;
      switch (type) {
        case '3-day':
          itinerary = {
            id: `trip-${Date.now()}`,
            type,
            title: '3-Day Spiritual Discovery',
            description: 'A perfect introduction to Sikkim\'s monastery heritage',
            days: [
              {
                day: 1,
                title: 'Gangtok Monasteries',
                activities: ['Arrival and check-in', 'Enchey Monastery visit', 'Traditional dinner'],
                monasteries: ['Enchey Monastery'],
                accommodation: 'Gangtok Hotel'
              },
              {
                day: 2,
                title: 'Rumtek Monastery Experience',
                activities: ['Early morning prayers', 'Monastery tour', 'Meditation session'],
                monasteries: ['Rumtek Monastery'],
                accommodation: 'Monastery Guesthouse'
              },
              {
                day: 3,
                title: 'Cultural Immersion',
                activities: ['Local market visit', 'Traditional crafts workshop', 'Departure'],
                monasteries: [],
                accommodation: undefined
              }
            ]
          };
          break;
        case '7-day':
          itinerary = {
            id: `trip-${Date.now()}`,
            type,
            title: '7-Day Complete Sikkim Experience',
            description: 'Comprehensive journey through all regions of Sikkim',
            days: [
              {
                day: 1,
                title: 'Arrival in Gangtok',
                activities: ['Airport pickup', 'Hotel check-in', 'Enchey Monastery', 'Welcome dinner'],
                monasteries: ['Enchey Monastery']
              },
              {
                day: 2,
                title: 'East Sikkim Exploration',
                activities: ['Rumtek Monastery', 'Traditional lunch', 'Local village visit'],
                monasteries: ['Rumtek Monastery']
              },
              {
                day: 3,
                title: 'Journey to West Sikkim',
                activities: ['Drive to Pelling', 'Pemayangtse Monastery', 'Sunset views'],
                monasteries: ['Pemayangtse Monastery']
              },
              {
                day: 4,
                title: 'Sacred Tashiding',
                activities: ['Tashiding Monastery pilgrimage', 'River valley trek', 'Local homestay'],
                monasteries: ['Tashiding Monastery']
              },
              {
                day: 5,
                title: 'North Sikkim Adventure',
                activities: ['High altitude monasteries', 'Mountain photography', 'Cultural exchange'],
                monasteries: ['Phensang Monastery']
              },
              {
                day: 6,
                title: 'Festival and Culture',
                activities: ['Traditional festival (if available)', 'Handicraft workshops', 'Farewell dinner'],
                monasteries: []
              },
              {
                day: 7,
                title: 'Departure',
                activities: ['Final monastery visit', 'Shopping', 'Airport transfer'],
                monasteries: []
              }
            ]
          };
          break;
        case 'adventure':
          itinerary = {
            id: `trip-${Date.now()}`,
            type,
            title: 'Adventure & Monastery Trek',
            description: 'Combine spiritual discovery with mountain adventures',
            days: [
              {
                day: 1,
                title: 'Base Camp Setup',
                activities: ['Trekking gear preparation', 'Monastery blessing ceremony', 'Acclimatization'],
                monasteries: ['Rumtek Monastery']
              },
              {
                day: 2,
                title: 'High Altitude Monasteries',
                activities: ['Mountain monastery trek', 'Photography session', 'Meditation retreat'],
                monasteries: ['Phensang Monastery']
              },
              {
                day: 3,
                title: 'Adventure Activities',
                activities: ['River rafting', 'Mountain biking', 'Rock climbing', 'Monastery visit'],
                monasteries: ['Tashiding Monastery']
              }
            ]
          };
          break;
        case 'cultural':
          itinerary = {
            id: `trip-${Date.now()}`,
            type,
            title: 'Cultural Immersion Journey',
            description: 'Deep dive into Buddhist culture and traditions',
            days: [
              {
                day: 1,
                title: 'Cultural Orientation',
                activities: ['Cultural center visit', 'Traditional welcome ceremony', 'Monastery introduction'],
                monasteries: ['Enchey Monastery']
              },
              {
                day: 2,
                title: 'Living with Monks',
                activities: ['Monastery stay', 'Prayer ceremonies', 'Buddhist philosophy learning'],
                monasteries: ['Rumtek Monastery']
              },
              {
                day: 3,
                title: 'Traditional Arts',
                activities: ['Thangka painting workshop', 'Traditional music', 'Crafts learning'],
                monasteries: ['Pemayangtse Monastery']
              },
              {
                day: 4,
                title: 'Festival Participation',
                activities: ['Festival preparation', 'Traditional dance', 'Community feast'],
                monasteries: ['Tashiding Monastery']
              }
            ]
          };
          break;
        default:
          return res.status(400).json({ error: 'Invalid trip type' });
      }
      
      res.json(itinerary);
    } catch (error) {
      console.error('Error generating trip:', error);
      res.status(500).json({ error: 'Failed to generate trip itinerary' });
    }
  });

  // Database seeding route (for development)
  app.post("/api/seed", async (req, res) => {
    try {
      await seedDatabase();
      res.json({ message: 'Database seeded successfully' });
    } catch (error) {
      console.error('Error seeding database:', error);
      res.status(500).json({ error: 'Failed to seed database' });
    }
  });

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
