import { pgTable, text, serial, integer, boolean, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping this from the original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Food schema
export const foods = pgTable("foods", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  imageUrl: text("image_url").notNull(),
  caloriesBefore: real("calories_before").notNull(), // calories per 100g before processing
  caloriesAfter: real("calories_after").notNull(), // calories per 100g after processing
});

export const insertFoodSchema = createInsertSchema(foods).pick({
  name: true,
  imageUrl: true,
  caloriesBefore: true,
  caloriesAfter: true,
});

// Analysis result schema for image analysis
export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  foodId: integer("food_id").references(() => foods.id),
  imageUrl: text("image_url").notNull(),
  estimatedWeight: real("estimated_weight").notNull(), // estimated weight in grams
  caloriesBefore: real("calories_before").notNull(), // total calories before
  caloriesAfter: real("calories_after").notNull(), // total calories after
  createdAt: text("created_at").notNull(), // timestamp
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults).pick({
  foodId: true,
  imageUrl: true,
  estimatedWeight: true,
  caloriesBefore: true,
  caloriesAfter: true,
  createdAt: true,
});

// Export types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertFood = z.infer<typeof insertFoodSchema>;
export type Food = typeof foods.$inferSelect;

export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type AnalysisResult = typeof analysisResults.$inferSelect;
