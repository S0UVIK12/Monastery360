import { 
  users, monasteries, festivals, accommodations, blogs,
  type User, type InsertUser, type Monastery, type Festival, 
  type Accommodation, type Blog 
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, or, desc } from "drizzle-orm";

// Updated storage interface for tourism platform
export interface IStorage {
  // User management
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Monastery management
  getMonasteries(filters?: {
    region?: string;
    search?: string;
    limit?: number;
    offset?: number;
  }): Promise<Monastery[]>;
  getMonastery(id: string): Promise<Monastery | undefined>;
  createMonastery(monastery: any): Promise<Monastery>;
  
  // Festival management
  getFestivals(filters?: {
    month?: string;
    monastery?: string;
    limit?: number;
  }): Promise<Festival[]>;
  getFestival(id: string): Promise<Festival | undefined>;
  createFestival(festival: any): Promise<Festival>;
  
  // Accommodation management
  getAccommodations(filters?: {
    type?: string;
    location?: string;
    priceRange?: [number, number];
    limit?: number;
  }): Promise<Accommodation[]>;
  getAccommodation(id: string): Promise<Accommodation | undefined>;
  createAccommodation(accommodation: any): Promise<Accommodation>;
  
  // Blog management
  getBlogs(filters?: {
    category?: string;
    author?: string;
    limit?: number;
  }): Promise<Blog[]>;
  getBlog(id: string): Promise<Blog | undefined>;
  createBlog(blog: any): Promise<Blog>;
}

export class DatabaseStorage implements IStorage {
  // User methods
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  // Monastery methods
  async getMonasteries(filters: {
    region?: string;
    search?: string;
    limit?: number;
    offset?: number;
  } = {}): Promise<Monastery[]> {
    const { region, search, limit = 50, offset = 0 } = filters;
    
    const conditions = [];
    if (region && region !== 'all') {
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

  async getMonastery(id: string): Promise<Monastery | undefined> {
    const [monastery] = await db.select().from(monasteries).where(eq(monasteries.id, id));
    return monastery || undefined;
  }

  async createMonastery(monastery: any): Promise<Monastery> {
    const [created] = await db.insert(monasteries).values(monastery).returning();
    return created;
  }

  // Festival methods
  async getFestivals(filters: {
    month?: string;
    monastery?: string;
    limit?: number;
  } = {}): Promise<Festival[]> {
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

  async getFestival(id: string): Promise<Festival | undefined> {
    const [festival] = await db.select().from(festivals).where(eq(festivals.id, id));
    return festival || undefined;
  }

  async createFestival(festival: any): Promise<Festival> {
    const [created] = await db.insert(festivals).values(festival).returning();
    return created;
  }

  // Accommodation methods
  async getAccommodations(filters: {
    type?: string;
    location?: string;
    priceRange?: [number, number];
    limit?: number;
  } = {}): Promise<Accommodation[]> {
    const { type, location, priceRange, limit = 30 } = filters;
    
    const conditions = [];
    if (type) {
      conditions.push(eq(accommodations.type, type));
    }
    if (location) {
      conditions.push(like(accommodations.location, `%${location}%`));
    }
    if (priceRange) {
      // TODO: Add price range filtering
    }
    
    if (conditions.length > 0) {
      return await db.select().from(accommodations).where(and(...conditions)).limit(limit);
    }
    
    return await db.select().from(accommodations).limit(limit);
  }

  async getAccommodation(id: string): Promise<Accommodation | undefined> {
    const [accommodation] = await db.select().from(accommodations).where(eq(accommodations.id, id));
    return accommodation || undefined;
  }

  async createAccommodation(accommodation: any): Promise<Accommodation> {
    const [created] = await db.insert(accommodations).values(accommodation).returning();
    return created;
  }

  // Blog methods
  async getBlogs(filters: {
    category?: string;
    author?: string;
    limit?: number;
  } = {}): Promise<Blog[]> {
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

  async getBlog(id: string): Promise<Blog | undefined> {
    const [blog] = await db.select().from(blogs).where(eq(blogs.id, id));
    return blog || undefined;
  }

  async createBlog(blog: any): Promise<Blog> {
    const [created] = await db.insert(blogs).values(blog).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
