import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  appType: text("app_type").notNull(),
  frontend: text("frontend"),
  styling: text("styling"),
  backend: text("backend"),
  database: text("database"),
  authentication: text("authentication"),
  hosting: text("hosting"),
  createdAt: text("created_at").notNull(),
});

export const techStacks = pgTable("tech_stacks", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // frontend, backend, styling, etc.
  name: text("name").notNull(),
  description: text("description").notNull(),
  details: jsonb("details").notNull(), // advantages, popular libraries, etc.
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
});

export const insertTechStackSchema = createInsertSchema(techStacks).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertTechStack = z.infer<typeof insertTechStackSchema>;
export type TechStack = typeof techStacks.$inferSelect;
