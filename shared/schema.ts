import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Core tourism data models
export const monasteries = pgTable("monasteries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  region: text("region").notNull(), // North, South, East, West
  latitude: text("latitude").notNull(),
  longitude: text("longitude").notNull(),
  image: text("image").notNull(),
  significance: text("significance").notNull(),
  bestTimeToVisit: text("best_time_to_visit").notNull(),
});

export const festivals = pgTable("festivals", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  date: text("date").notNull(),
  description: text("description").notNull(),
  monastery: text("monastery"),
  significance: text("significance").notNull(),
});

export const accommodations = pgTable("accommodations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  type: text("type").notNull(), // hotel, homestay, eco-lodge
  location: text("location").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating").notNull(),
  amenities: text("amenities").array().notNull(),
  image: text("image").notNull(),
});

export const blogs = pgTable("blogs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow(),
  category: text("category").notNull(),
  image: text("image").notNull(),
});

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Schema exports
export const insertMonasterySchema = createInsertSchema(monasteries);
export const insertFestivalSchema = createInsertSchema(festivals);
export const insertAccommodationSchema = createInsertSchema(accommodations);
export const insertBlogSchema = createInsertSchema(blogs);
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Type exports
export type Monastery = typeof monasteries.$inferSelect;
export type Festival = typeof festivals.$inferSelect;
export type Accommodation = typeof accommodations.$inferSelect;
export type Blog = typeof blogs.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Language types
export type Language = 'en' | 'hi' | 'ne' | 'bn' | 'bo';

// Trip planner types
export interface TripItinerary {
  id: string;
  type: '3-day' | '7-day' | 'adventure' | 'cultural';
  title: string;
  description: string;
  days: TripDay[];
}

export interface TripDay {
  day: number;
  title: string;
  activities: string[];
  monasteries: string[];
  accommodation?: string;
}