import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Test endpoint
  app.get("/api/test", (req, res) => {
    res.status(200).json({
      status: "ok",
      message: "API is working correctly!",
      timestamp: new Date().toISOString(),
      server: "Full-Stack Vibe Guide Server"
    });
  });
  // Project routes
  app.post("/api/projects", async (req, res) => {
    try {
      const { name, description, appType, frontend, styling, backend, database, authentication, hosting } = req.body;
      
      // Add created timestamp
      const createdAt = new Date().toISOString();
      
      const project = await storage.createProject({
        name,
        description,
        appType,
        frontend,
        styling,
        backend,
        database,
        authentication,
        hosting,
        createdAt,
        userId: null, // No authentication for now
      });
      
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: (error as Error).message });
    }
  });

  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Tech stacks routes
  app.get("/api/tech-stacks", async (req, res) => {
    try {
      const { category } = req.query;
      let techStacks;
      
      if (category) {
        techStacks = await storage.getTechStacksByCategory(category as string);
      } else {
        techStacks = await storage.getAllTechStacks();
      }
      
      res.status(200).json(techStacks);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Command generation route
  app.post("/api/generate-commands", async (req, res) => {
    try {
      const { frontend, backend, database } = req.body;
      
      // This would be more complex in a real implementation
      // Here we're just returning some example commands based on selections
      const commands = [];
      
      if (frontend === "react") {
        commands.push({
          command: "npx create-react-app my-app --template typescript",
          explanation: "Creates a new React application with TypeScript support."
        });
      } else if (frontend === "vue") {
        commands.push({
          command: "npm init vue@latest",
          explanation: "Creates a new Vue 3 application with the latest features."
        });
      }
      
      if (backend === "express") {
        commands.push({
          command: "npm init -y && npm install express",
          explanation: "Initializes a new Node.js project and installs Express.js."
        });
      }
      
      if (database === "mongodb") {
        commands.push({
          command: "npm install mongoose",
          explanation: "Installs Mongoose ODM for MongoDB integration."
        });
      }
      
      res.status(200).json({ commands });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
