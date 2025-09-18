var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// server/index.ts
import dotenv2 from "dotenv";
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  accommodations: () => accommodations,
  blogs: () => blogs,
  festivals: () => festivals,
  insertAccommodationSchema: () => insertAccommodationSchema,
  insertBlogSchema: () => insertBlogSchema,
  insertFestivalSchema: () => insertFestivalSchema,
  insertMonasterySchema: () => insertMonasterySchema,
  insertUserSchema: () => insertUserSchema,
  monasteries: () => monasteries,
  users: () => users
});
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var monasteries = pgTable("monasteries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  region: text("region").notNull(),
  // North, South, East, West
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  image: text("image").notNull(),
  significance: text("significance").notNull(),
  bestTimeToVisit: text("best_time_to_visit").notNull()
});
var festivals = pgTable("festivals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  monastery: text("monastery"),
  significance: text("significance").notNull()
});
var accommodations = pgTable("accommodations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(),
  // hotel, homestay, eco-lodge
  location: text("location").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating").notNull(),
  amenities: text("amenities").array().notNull(),
  image: text("image").notNull()
});
var blogs = pgTable("blogs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  category: text("category").notNull(),
  image: text("image").notNull()
});
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var insertMonasterySchema = createInsertSchema(monasteries);
var insertFestivalSchema = createInsertSchema(festivals);
var insertAccommodationSchema = createInsertSchema(accommodations);
var insertBlogSchema = createInsertSchema(blogs);
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});

// server/db.ts
import dotenv from "dotenv";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
dotenv.config();
neonConfig.webSocketConstructor = ws;
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle({ client: pool, schema: schema_exports });

// server/storage.ts
import { eq, like, and, or, desc } from "drizzle-orm";
var DatabaseStorage = class {
  // User methods
  async getUser(id) {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || void 0;
  }
  async getUserByUsername(username) {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || void 0;
  }
  async createUser(insertUser) {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  // Monastery methods
  async getMonasteries(filters = {}) {
    const { region, search, limit = 50, offset = 0 } = filters;
    const conditions = [];
    if (region && region !== "all") {
      conditions.push(eq(monasteries.region, region));
    }
    if (search) {
      conditions.push(
        or(
          like(monasteries.name, `%${search}%`),
          like(monasteries.description, `%${search}%`),
          like(monasteries.significance, `%${search}%`)
        )
      );
    }
    if (conditions.length > 0) {
      return await db.select().from(monasteries).where(and(...conditions)).limit(limit).offset(offset);
    }
    return await db.select().from(monasteries).limit(limit).offset(offset);
  }
  async getMonastery(id) {
    const [monastery] = await db.select().from(monasteries).where(eq(monasteries.id, id));
    return monastery || void 0;
  }
  async createMonastery(monastery) {
    const [created] = await db.insert(monasteries).values(monastery).returning();
    return created;
  }
  // Festival methods
  async getFestivals(filters = {}) {
    const { month, monastery, limit = 20 } = filters;
    const conditions = [];
    if (month) {
      conditions.push(like(festivals.date, `%${month}%`));
    }
    if (monastery) {
      conditions.push(eq(festivals.monastery, monastery));
    }
    if (conditions.length > 0) {
      return await db.select().from(festivals).where(and(...conditions)).limit(limit);
    }
    return await db.select().from(festivals).limit(limit);
  }
  async getFestival(id) {
    const [festival] = await db.select().from(festivals).where(eq(festivals.id, id));
    return festival || void 0;
  }
  async createFestival(festival) {
    const [created] = await db.insert(festivals).values(festival).returning();
    return created;
  }
  // Accommodation methods
  async getAccommodations(filters = {}) {
    const { type, location, priceRange, limit = 30 } = filters;
    const conditions = [];
    if (type) {
      conditions.push(eq(accommodations.type, type));
    }
    if (location) {
      conditions.push(like(accommodations.location, `%${location}%`));
    }
    if (priceRange) {
    }
    if (conditions.length > 0) {
      return await db.select().from(accommodations).where(and(...conditions)).limit(limit);
    }
    return await db.select().from(accommodations).limit(limit);
  }
  async getAccommodation(id) {
    const [accommodation] = await db.select().from(accommodations).where(eq(accommodations.id, id));
    return accommodation || void 0;
  }
  async createAccommodation(accommodation) {
    const [created] = await db.insert(accommodations).values(accommodation).returning();
    return created;
  }
  // Blog methods
  async getBlogs(filters = {}) {
    const { category, author, limit = 10 } = filters;
    const conditions = [];
    if (category) {
      conditions.push(eq(blogs.category, category));
    }
    if (author) {
      conditions.push(eq(blogs.author, author));
    }
    if (conditions.length > 0) {
      return await db.select().from(blogs).where(and(...conditions)).orderBy(desc(blogs.publishedAt)).limit(limit);
    }
    return await db.select().from(blogs).orderBy(desc(blogs.publishedAt)).limit(limit);
  }
  async getBlog(id) {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog || void 0;
  }
  async createBlog(blog) {
    const [created] = await db.insert(blogs).values(blog).returning();
    return created;
  }
};
var storage = new DatabaseStorage();

// server/seed.ts
var monasteryData = [
  {
    name: "Rumtek Monastery",
    description: "The largest monastery in Sikkim and seat of the Karmapa. This magnificent structure was built in the 1960s to house the relocated Karmapa from Tibet. Features stunning Tibetan architecture with golden roofs, intricate murals, and houses precious Buddhist artifacts including golden stupas, ancient manuscripts, and religious relics.",
    region: "East",
    latitude: "27.3350",
    longitude: "88.5593",
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png",
    significance: "Seat of the 16th Karmapa - Kagyu School",
    bestTimeToVisit: "October to May"
  },
  {
    name: "Enchey Monastery",
    description: "A 200-year-old monastery perched on a hilltop with panoramic views of Gangtok and surrounding mountains. Built in 1909, it belongs to the Nyingma order and is known for its beautiful murals depicting Buddhist teachings and peaceful atmosphere perfect for meditation.",
    region: "East",
    latitude: "27.3330",
    longitude: "88.6140",
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png",
    significance: "Nyingma tradition - Guru Padmasambhava lineage",
    bestTimeToVisit: "March to June"
  },
  {
    name: "Pemayangtse Monastery",
    description: "One of the oldest and most important monasteries in Sikkim, founded in 1705. Features a unique seven-tiered wooden sculpture representing the celestial palace of Guru Rinpoche. The monastery offers stunning views of Kanchenjunga and houses ancient murals and manuscripts.",
    region: "West",
    latitude: "27.2060",
    longitude: "88.2470",
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png",
    significance: "Premier Nyingma monastery of Sikkim",
    bestTimeToVisit: "October to May"
  },
  {
    name: "Tashiding Monastery",
    description: "Sacred monastery situated on a heart-shaped hilltop between Rathong and Rangeet rivers. Founded in 1717, it is famous for its sacred Bumchu ceremony and offers breathtaking panoramic views of snow-capped mountains and valleys.",
    region: "West",
    latitude: "27.3220",
    longitude: "88.2720",
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png",
    significance: "Most sacred Nyingma pilgrimage site",
    bestTimeToVisit: "Year round"
  },
  {
    name: "Phensang Monastery",
    description: "A serene monastery in North Sikkim known for its pristine mountain location and traditional Buddhist practices. Located at high altitude, it offers breathtaking views of snow-capped peaks and is perfect for those seeking spiritual solitude.",
    region: "North",
    latitude: "27.7000",
    longitude: "88.5000",
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png",
    significance: "High altitude meditation center",
    bestTimeToVisit: "May to September"
  },
  {
    name: "Bon Monastery",
    description: "Unique monastery following the ancient Bon tradition, offering insights into pre-Buddhist spiritual practices of the Himalayan region. This rare monastery preserves ancient rituals and practices that predate Buddhism in Tibet.",
    region: "South",
    latitude: "27.1000",
    longitude: "88.4000",
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png",
    significance: "Ancient Bon tradition preservation",
    bestTimeToVisit: "October to April"
  },
  {
    name: "Dubdi Monastery",
    description: "The oldest monastery in Sikkim, established in 1701 by Lhatsun Chempo. Located on a hilltop above Yuksom, it is considered the cradle of Buddhism in Sikkim and offers peaceful meditation spots with historical significance.",
    region: "West",
    latitude: "27.3667",
    longitude: "88.2167",
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png",
    significance: "First monastery in Sikkim - Nyingma",
    bestTimeToVisit: "March to November"
  },
  {
    name: "Ranka Monastery",
    description: "Also known as Lingdum Monastery, this modern monastery was built in 1998 and features contemporary Buddhist architecture. It houses a beautiful collection of Buddhist art and offers meditation programs for visitors.",
    region: "East",
    latitude: "27.2833",
    longitude: "88.5667",
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png",
    significance: "Modern Kagyu monastery",
    bestTimeToVisit: "Year round"
  }
];
var festivalData = [
  {
    name: "Losar",
    date: "February 2024",
    description: "Tibetan New Year celebrated with traditional masked dances, prayers, colorful decorations, and community feasts across all monasteries. This 15-day celebration marks the most important festival in the Buddhist calendar.",
    monastery: "All Monasteries",
    significance: "Tibetan New Year - Most Important Buddhist Festival"
  },
  {
    name: "Saga Dawa",
    date: "May 2024",
    description: "Sacred month commemorating Buddha's birth, enlightenment, and nirvana with special prayers, rituals, and merit-making activities. Devotees engage in circumambulation and offer prayers for world peace.",
    monastery: "Pemayangtse Monastery",
    significance: "Triple Blessed Day of Buddha"
  },
  {
    name: "Pang Lhabsol",
    date: "August 2024",
    description: "Unique festival celebrating Mount Khangchendzonga as the guardian deity of Sikkim, featuring spectacular warrior dances and traditional ceremonies that showcase the cultural heritage of the region.",
    monastery: "Enchey Monastery",
    significance: "Mountain Guardian Festival"
  },
  {
    name: "Drupka Teshi",
    date: "July 2024",
    description: "Celebrates Buddha's first sermon with special prayers, traditional performances, and teachings. Monks and devotees gather to listen to dharma teachings and participate in religious ceremonies.",
    monastery: "Tashiding Monastery",
    significance: "First Sermon Day"
  },
  {
    name: "Bumchu",
    date: "January 2024",
    description: "Sacred water ceremony at Tashiding Monastery where the water level in a sacred pot predicts the coming year's fortune. This unique festival draws thousands of pilgrims.",
    monastery: "Tashiding Monastery",
    significance: "Sacred Water Prophecy"
  },
  {
    name: "Dushera",
    date: "October 2024",
    description: "Hindu festival celebrating the victory of good over evil, widely celebrated across Sikkim with cultural performances, traditional dances, and community gatherings.",
    monastery: "Local Communities",
    significance: "Victory of Good over Evil"
  }
];
var accommodationData = [
  {
    name: "Mayfair Spa Resort & Casino",
    type: "hotel",
    location: "Gangtok",
    price: 8e3,
    rating: 5,
    amenities: ["Spa", "Casino", "Mountain View", "Restaurant", "WiFi", "Pool"],
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png"
  },
  {
    name: "WelcomHotel Denzong",
    type: "hotel",
    location: "Gangtok",
    price: 6e3,
    rating: 4,
    amenities: ["Restaurant", "Business Center", "WiFi", "Room Service", "Parking"],
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png"
  },
  {
    name: "Traditional Lepcha Homestay",
    type: "homestay",
    location: "Dzongu",
    price: 1500,
    rating: 4,
    amenities: ["Traditional Meals", "Cultural Experience", "Mountain View", "Organic Garden"],
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png"
  },
  {
    name: "Monastery Guesthouse",
    type: "homestay",
    location: "Rumtek",
    price: 800,
    rating: 3,
    amenities: ["Meditation Hall", "Vegetarian Meals", "Peaceful Environment", "Library"],
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png"
  },
  {
    name: "Bamboo Grove Eco Lodge",
    type: "eco-lodge",
    location: "Pelling",
    price: 3500,
    rating: 4,
    amenities: ["Eco-friendly", "Nature Trails", "Organic Food", "Solar Power", "Bird Watching"],
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png"
  },
  {
    name: "Mountain Retreat Eco Resort",
    type: "eco-lodge",
    location: "Lachung",
    price: 4e3,
    rating: 4,
    amenities: ["Mountain View", "Yoga", "Organic Meals", "Nature Walks", "Clean Energy"],
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png"
  }
];
var blogData = [
  {
    title: "A Spiritual Journey Through Rumtek Monastery",
    content: "Discover the profound spiritual experience of visiting one of Sikkim's most significant monasteries. From the early morning prayers echoing through the halls to the intricate Buddhist art adorning every surface, Rumtek offers a window into centuries-old traditions that continue to thrive in the modern world. The monastery complex houses over 300 monks and serves as a center for Buddhist learning and meditation practices. Visitors can witness daily prayer ceremonies, explore the main prayer hall with its stunning golden Buddha statue, and learn about Tibetan Buddhist philosophy from resident monks.",
    author: "Priya Sharma",
    publishedAt: /* @__PURE__ */ new Date("2024-01-15"),
    category: "experiences",
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png"
  },
  {
    title: "Essential Tips for First-Time Visitors to Sikkim Monasteries",
    content: "Planning your first monastery visit in Sikkim? This comprehensive guide covers everything from dress codes and photography etiquette to the best times for visits and how to participate respectfully in prayer ceremonies. Learn about the cultural significance of different rituals, understand the meaning behind colorful prayer flags, and discover practical considerations for a meaningful spiritual experience. Important tips include wearing modest clothing, removing shoes before entering prayer halls, and maintaining silence during ceremonies.",
    author: "David Chen",
    publishedAt: /* @__PURE__ */ new Date("2024-01-20"),
    category: "travel-tips",
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png"
  },
  {
    title: "Understanding Buddhist Festivals in Sikkim",
    content: "Explore the rich tapestry of Buddhist festivals celebrated throughout Sikkim. From the colorful masked dances of Losar to the sacred significance of Saga Dawa, each festival offers unique insights into Tibetan Buddhist culture and provides visitors with unforgettable experiences. Learn about the spiritual meaning behind different ceremonies, the role of music and dance in Buddhist traditions, and how to respectfully participate in these sacred celebrations.",
    author: "Lama Tenzin Norbu",
    publishedAt: /* @__PURE__ */ new Date("2024-01-25"),
    category: "culture",
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png"
  },
  {
    title: "Photography Guide: Capturing the Beauty of Himalayan Monasteries",
    content: "Learn the art of monastery photography while respecting sacred spaces. This guide covers camera settings for low-light interiors, composition techniques for architectural details, and the ethics of photographing religious ceremonies and practitioners. Discover how to capture the essence of spiritual life without disturbing the peaceful atmosphere, and understand when photography is appropriate and when it should be avoided.",
    author: "Sarah Miller",
    publishedAt: /* @__PURE__ */ new Date("2024-02-01"),
    category: "guides",
    image: "/generated_images/Himalayan_monastery_landscape_hero_32d4dac4.png"
  },
  {
    title: "The Ancient Art of Thangka Painting in Sikkim Monasteries",
    content: "Delve into the sacred art of Thangka painting, a traditional Tibetan Buddhist art form preserved in Sikkim's monasteries. Learn about the spiritual significance of these intricate paintings, the materials and techniques used, and meet the master artists who continue this ancient tradition. Discover how these sacred artworks serve as both teaching tools and objects of meditation.",
    author: "Master Karma Tashi",
    publishedAt: /* @__PURE__ */ new Date("2024-02-05"),
    category: "culture",
    image: "/generated_images/Rumtek_monastery_architecture_detail_513ef8a9.png"
  }
];
async function seedDatabase() {
  try {
    console.log("\u{1F331} Starting database seeding...");
    await db.delete(blogs);
    await db.delete(accommodations);
    await db.delete(festivals);
    await db.delete(monasteries);
    console.log("\u{1F4FF} Seeding monasteries...");
    await db.insert(monasteries).values(monasteryData);
    console.log("\u{1F389} Seeding festivals...");
    await db.insert(festivals).values(festivalData);
    console.log("\u{1F3E8} Seeding accommodations...");
    await db.insert(accommodations).values(accommodationData);
    console.log("\u{1F4DD} Seeding blogs...");
    await db.insert(blogs).values(blogData);
    console.log("\u2705 Database seeded successfully!");
    console.log(`- ${monasteryData.length} monasteries`);
    console.log(`- ${festivalData.length} festivals`);
    console.log(`- ${accommodationData.length} accommodations`);
    console.log(`- ${blogData.length} blog posts`);
  } catch (error) {
    console.error("\u274C Error seeding database:", error);
    throw error;
  }
}
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}

// server/routes.ts
async function registerRoutes(app2) {
  app2.get("/api/monasteries", async (req, res) => {
    try {
      const { region, search, limit, offset } = req.query;
      const monasteries2 = await storage.getMonasteries({
        region,
        search,
        limit: limit ? parseInt(limit) : void 0,
        offset: offset ? parseInt(offset) : void 0
      });
      res.json(monasteries2);
    } catch (error) {
      console.error("Error fetching monasteries:", error);
      res.status(500).json({ error: "Failed to fetch monasteries" });
    }
  });
  app2.get("/api/monasteries/:id", async (req, res) => {
    try {
      const monastery = await storage.getMonastery(req.params.id);
      if (!monastery) {
        return res.status(404).json({ error: "Monastery not found" });
      }
      res.json(monastery);
    } catch (error) {
      console.error("Error fetching monastery:", error);
      res.status(500).json({ error: "Failed to fetch monastery" });
    }
  });
  app2.post("/api/monasteries", async (req, res) => {
    try {
      const validatedData = insertMonasterySchema.parse(req.body);
      const monastery = await storage.createMonastery(validatedData);
      res.status(201).json(monastery);
    } catch (error) {
      console.error("Error creating monastery:", error);
      res.status(400).json({ error: "Invalid monastery data" });
    }
  });
  app2.get("/api/festivals", async (req, res) => {
    try {
      const { month, monastery, limit } = req.query;
      const festivals2 = await storage.getFestivals({
        month,
        monastery,
        limit: limit ? parseInt(limit) : void 0
      });
      res.json(festivals2);
    } catch (error) {
      console.error("Error fetching festivals:", error);
      res.status(500).json({ error: "Failed to fetch festivals" });
    }
  });
  app2.get("/api/festivals/:id", async (req, res) => {
    try {
      const festival = await storage.getFestival(req.params.id);
      if (!festival) {
        return res.status(404).json({ error: "Festival not found" });
      }
      res.json(festival);
    } catch (error) {
      console.error("Error fetching festival:", error);
      res.status(500).json({ error: "Failed to fetch festival" });
    }
  });
  app2.get("/api/accommodations", async (req, res) => {
    try {
      const { type, location, limit } = req.query;
      const accommodations2 = await storage.getAccommodations({
        type,
        location,
        limit: limit ? parseInt(limit) : void 0
      });
      res.json(accommodations2);
    } catch (error) {
      console.error("Error fetching accommodations:", error);
      res.status(500).json({ error: "Failed to fetch accommodations" });
    }
  });
  app2.get("/api/accommodations/:id", async (req, res) => {
    try {
      const accommodation = await storage.getAccommodation(req.params.id);
      if (!accommodation) {
        return res.status(404).json({ error: "Accommodation not found" });
      }
      res.json(accommodation);
    } catch (error) {
      console.error("Error fetching accommodation:", error);
      res.status(500).json({ error: "Failed to fetch accommodation" });
    }
  });
  app2.get("/api/blogs", async (req, res) => {
    try {
      const { category, author, limit } = req.query;
      const blogs2 = await storage.getBlogs({
        category,
        author,
        limit: limit ? parseInt(limit) : void 0
      });
      res.json(blogs2);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ error: "Failed to fetch blogs" });
    }
  });
  app2.get("/api/blogs/:id", async (req, res) => {
    try {
      const blog = await storage.getBlog(req.params.id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ error: "Failed to fetch blog" });
    }
  });
  app2.post("/api/trip-planner", async (req, res) => {
    try {
      const { type, duration, groupSize, interests } = req.body;
      const monasteries2 = await storage.getMonasteries({ limit: 10 });
      const festivals2 = await storage.getFestivals({ limit: 5 });
      let itinerary;
      switch (type) {
        case "3-day":
          itinerary = {
            id: `trip-${Date.now()}`,
            type,
            title: "3-Day Spiritual Discovery",
            description: "A perfect introduction to Sikkim's monastery heritage",
            days: [
              {
                day: 1,
                title: "Gangtok Monasteries",
                activities: ["Arrival and check-in", "Enchey Monastery visit", "Traditional dinner"],
                monasteries: ["Enchey Monastery"],
                accommodation: "Gangtok Hotel"
              },
              {
                day: 2,
                title: "Rumtek Monastery Experience",
                activities: ["Early morning prayers", "Monastery tour", "Meditation session"],
                monasteries: ["Rumtek Monastery"],
                accommodation: "Monastery Guesthouse"
              },
              {
                day: 3,
                title: "Cultural Immersion",
                activities: ["Local market visit", "Traditional crafts workshop", "Departure"],
                monasteries: [],
                accommodation: void 0
              }
            ]
          };
          break;
        case "7-day":
          itinerary = {
            id: `trip-${Date.now()}`,
            type,
            title: "7-Day Complete Sikkim Experience",
            description: "Comprehensive journey through all regions of Sikkim",
            days: [
              {
                day: 1,
                title: "Arrival in Gangtok",
                activities: ["Airport pickup", "Hotel check-in", "Enchey Monastery", "Welcome dinner"],
                monasteries: ["Enchey Monastery"]
              },
              {
                day: 2,
                title: "East Sikkim Exploration",
                activities: ["Rumtek Monastery", "Traditional lunch", "Local village visit"],
                monasteries: ["Rumtek Monastery"]
              },
              {
                day: 3,
                title: "Journey to West Sikkim",
                activities: ["Drive to Pelling", "Pemayangtse Monastery", "Sunset views"],
                monasteries: ["Pemayangtse Monastery"]
              },
              {
                day: 4,
                title: "Sacred Tashiding",
                activities: ["Tashiding Monastery pilgrimage", "River valley trek", "Local homestay"],
                monasteries: ["Tashiding Monastery"]
              },
              {
                day: 5,
                title: "North Sikkim Adventure",
                activities: ["High altitude monasteries", "Mountain photography", "Cultural exchange"],
                monasteries: ["Phensang Monastery"]
              },
              {
                day: 6,
                title: "Festival and Culture",
                activities: ["Traditional festival (if available)", "Handicraft workshops", "Farewell dinner"],
                monasteries: []
              },
              {
                day: 7,
                title: "Departure",
                activities: ["Final monastery visit", "Shopping", "Airport transfer"],
                monasteries: []
              }
            ]
          };
          break;
        case "adventure":
          itinerary = {
            id: `trip-${Date.now()}`,
            type,
            title: "Adventure & Monastery Trek",
            description: "Combine spiritual discovery with mountain adventures",
            days: [
              {
                day: 1,
                title: "Base Camp Setup",
                activities: ["Trekking gear preparation", "Monastery blessing ceremony", "Acclimatization"],
                monasteries: ["Rumtek Monastery"]
              },
              {
                day: 2,
                title: "High Altitude Monasteries",
                activities: ["Mountain monastery trek", "Photography session", "Meditation retreat"],
                monasteries: ["Phensang Monastery"]
              },
              {
                day: 3,
                title: "Adventure Activities",
                activities: ["River rafting", "Mountain biking", "Rock climbing", "Monastery visit"],
                monasteries: ["Tashiding Monastery"]
              }
            ]
          };
          break;
        case "cultural":
          itinerary = {
            id: `trip-${Date.now()}`,
            type,
            title: "Cultural Immersion Journey",
            description: "Deep dive into Buddhist culture and traditions",
            days: [
              {
                day: 1,
                title: "Cultural Orientation",
                activities: ["Cultural center visit", "Traditional welcome ceremony", "Monastery introduction"],
                monasteries: ["Enchey Monastery"]
              },
              {
                day: 2,
                title: "Living with Monks",
                activities: ["Monastery stay", "Prayer ceremonies", "Buddhist philosophy learning"],
                monasteries: ["Rumtek Monastery"]
              },
              {
                day: 3,
                title: "Traditional Arts",
                activities: ["Thangka painting workshop", "Traditional music", "Crafts learning"],
                monasteries: ["Pemayangtse Monastery"]
              },
              {
                day: 4,
                title: "Festival Participation",
                activities: ["Festival preparation", "Traditional dance", "Community feast"],
                monasteries: ["Tashiding Monastery"]
              }
            ]
          };
          break;
        default:
          return res.status(400).json({ error: "Invalid trip type" });
      }
      res.json(itinerary);
    } catch (error) {
      console.error("Error generating trip:", error);
      res.status(500).json({ error: "Failed to generate trip itinerary" });
    }
  });
  app2.post("/api/seed", async (req, res) => {
    try {
      await seedDatabase();
      res.json({ message: "Database seeded successfully" });
    } catch (error) {
      console.error("Error seeding database:", error);
      res.status(500).json({ error: "Failed to seed database" });
    }
  });
  app2.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = path2.dirname(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
dotenv2.config();
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
