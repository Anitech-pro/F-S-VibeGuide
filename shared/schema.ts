import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Core entities
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Project configuration
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  appType: text("app_type").notNull(), // web, mobile, backend, fullstack
  colorTheme: jsonb("color_theme"), 
  useReusableComponents: boolean("use_reusable_components").default(true),
  
  // Selected technologies
  frontend: text("frontend"), // e.g., react, vue, angular
  styling: text("styling"), // e.g., tailwind, scss, styled-components
  backend: text("backend"), // e.g., nodejs, python, java
  database: text("database"), // e.g., postgresql, mongodb, mysql  
  authentication: text("authentication"), // e.g., jwt, oauth, firebase
  hosting: text("hosting"), // e.g., vercel, netlify, aws
  testing: text("testing"), // e.g., jest, cypress, mocha
  payment: text("payment"), // e.g., stripe, paypal, square
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  
  // Project status
  currentStage: text("current_stage").default("setup"), // setup, frontend, backend, testing, deployment
});

// Technology data with detailed information
export const technologies = pgTable("technologies", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // frontend, backend, styling, database, auth, testing, etc.
  name: text("name").notNull(),
  description: text("description").notNull(),
  iconUrl: text("icon_url"),
  
  // Technical details
  setupCommands: jsonb("setup_commands"), // array of bash commands to install/setup
  verificationCommands: jsonb("verification_commands"), // commands to verify installation
  
  // Evaluation criteria
  advantages: jsonb("advantages"), // array of advantages
  limitations: jsonb("limitations"), // array of limitations
  useCases: jsonb("use_cases"), // array of use cases
  
  // Educational resources
  learningResources: jsonb("learning_resources"), // array of tutorials, docs, etc
  promptSuggestions: jsonb("prompt_suggestions"), // AI prompt examples
  
  // Technology attributes (1-10 scores)
  popularity: integer("popularity"), // how popular/widely used
  learningCurve: integer("learning_curve"), // how difficult to learn (lower is easier)
  maturity: integer("maturity"), // how mature/stable
  southAfricanAdoption: integer("south_african_adoption"), // adoption in South Africa
  offlineCapability: integer("offline_capability"), // works well offline
  communitySupport: integer("community_support"), // strength of community
});

// Technology compatibility relationships
export const techCompatibility = pgTable("tech_compatibility", {
  id: serial("id").primaryKey(),
  primaryTechId: integer("primary_tech_id").notNull().references(() => technologies.id),
  compatibleTechId: integer("compatible_tech_id").notNull().references(() => technologies.id),
  compatibilityScore: integer("compatibility_score").notNull(), // 1-10 score
  notes: text("notes"),
});

// Development tasks for guided process
export const developmentTasks = pgTable("development_tasks", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  name: text("name").notNull(),
  description: text("description"),
  stage: text("stage").notNull(), // setup, frontend, backend, testing, deployment
  status: text("status").default("pending").notNull(), // pending, in-progress, completed
  commands: jsonb("commands"), // array of bash commands
  expectedOutput: text("expected_output"), // what to expect when commands run correctly
  
  // Task organization
  order: integer("order").notNull(), 
  dependsOn: jsonb("depends_on"), // array of task IDs this depends on
  recommendedTimeMinutes: integer("recommended_time_minutes"),
  
  // Resources
  learningResources: jsonb("learning_resources"),
  commitMessage: text("commit_message"), // suggested git commit message
  
  // Tracking
  createdAt: timestamp("created_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
});

// Create insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  currentStage: true,
});

export const insertTechnologySchema = createInsertSchema(technologies).omit({
  id: true,
});

export const insertDevelopmentTaskSchema = createInsertSchema(developmentTasks).omit({
  id: true,
  createdAt: true,
  completedAt: true,
});

// Define types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertTechnology = z.infer<typeof insertTechnologySchema>;
export type Technology = typeof technologies.$inferSelect;

export type InsertDevelopmentTask = z.infer<typeof insertDevelopmentTaskSchema>;
export type DevelopmentTask = typeof developmentTasks.$inferSelect;

// App type options
export type AppType = "web" | "mobile" | "backend" | "fullstack";
export type FrontendFramework = "react" | "vue" | "angular" | "svelte" | null;
export type StylingOption = "tailwind" | "css" | "scss" | "styled-components" | null;
export type BackendFramework = "nodejs" | "python" | "java" | "php" | "ruby" | null;
export type Database = "postgresql" | "mongodb" | "mysql" | "firebase" | null;
export type Authentication = "jwt" | "oauth" | "firebase" | "auth0" | null;
export type Hosting = "vercel" | "netlify" | "aws" | "digitalocean" | "heroku" | null;
export type TestingFramework = "jest" | "cypress" | "mocha" | "react-testing-library" | null;
export type PaymentProvider = "stripe" | "paypal" | "square" | null;

// Wizard steps for the setup process
export type WizardStep = "project-type" | "frontend" | "backend" | "infrastructure" | "summary";
