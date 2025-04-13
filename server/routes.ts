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
  
  // Test recommendation engine
  app.get("/api/test-recommendation", async (req, res) => {
    try {
      // Test frontend recommendations
      const frontendRecommendations = await storage.getRecommendedFrontend("web");
      
      // Test backend recommendations with frontend context
      const backendRecommendations = await storage.getRecommendedBackend("fullstack", "react");
      
      // Test database recommendations with backend context
      const databaseRecommendations = await storage.getRecommendedDatabase("web", "nodejs");
      
      // Test context-aware recommendations
      const contextAwareRecommendations = await storage.getTechWithContext("database", {
        appType: "web",
        frontend: "react",
        backend: "nodejs"
      });
      
      // Return all test results
      res.status(200).json({
        status: "ok",
        message: "Recommendation engine test successful",
        timestamp: new Date().toISOString(),
        recommendations: {
          frontend: frontendRecommendations,
          backend: backendRecommendations,
          database: databaseRecommendations,
          contextAware: contextAwareRecommendations
        }
      });
    } catch (error) {
      res.status(500).json({ 
        status: "error",
        message: (error as Error).message,
        timestamp: new Date().toISOString()
      });
    }
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

  // Technologies routes
  app.get("/api/technologies", async (req, res) => {
    try {
      const { category } = req.query;
      let technologies;
      
      if (category) {
        technologies = await storage.getTechnologiesByCategory(category as string);
      } else {
        technologies = await storage.getAllTechnologies();
      }
      
      res.status(200).json(technologies);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  // Contextualized technology recommendations
  app.post("/api/technologies/context", async (req, res) => {
    try {
      const { category, selectedTech } = req.body;
      
      if (!category) {
        return res.status(400).json({ message: "Category is required" });
      }
      
      const technologies = await storage.getTechWithContext(category, selectedTech || {});
      res.status(200).json(technologies);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  // Development tasks routes
  app.post("/api/projects/:projectId/tasks", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const { name, description, stage, order, learningResources, commands, expectedOutput, duration, difficulty, status } = req.body;
      
      // Validate project existence
      const project = await storage.getProject(projectId);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      const task = await storage.createDevelopmentTask({
        name,
        description,
        projectId,
        stage,
        order: order || 0,
        status: status || "pending",
        learningResources: learningResources || null,
        commands: commands || null,
        expectedOutput: expectedOutput || null,
        duration: duration || null,
        difficulty: difficulty || null,
        commitMessage: null
      });
      
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  app.get("/api/projects/:projectId/tasks", async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const tasks = await storage.getTasksForProject(projectId);
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  app.patch("/api/tasks/:taskId/status", async (req, res) => {
    try {
      const taskId = parseInt(req.params.taskId);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const updatedTask = await storage.updateTaskStatus(taskId, status);
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found" });
      }
      
      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  // Action plan generation
  app.post("/api/action-plan", async (req, res) => {
    try {
      const { projectId, appType, frontend, backend, database, authentication } = req.body;
      
      // Generate stages based on the selected technologies
      const stages = [
        { name: "Setup", order: 1 },
        { name: "Frontend Core", order: 2 },
        { name: "Backend API", order: 3 },
        { name: "Database Integration", order: 4 }
      ];
      
      // Add authentication stage if required
      if (authentication) {
        stages.push({ name: "Authentication", order: 5 });
      }
      
      // Final stages
      stages.push({ name: "Testing", order: stages.length + 1 });
      stages.push({ name: "Deployment", order: stages.length + 1 });
      
      // Create tasks for each stage
      const actionPlan = [];
      
      // Setup stage tasks
      const setupTasks = [
        {
          name: "Initialize Project",
          description: "Create the basic project structure and setup version control",
          stage: "Setup",
          order: 1,
          commands: [
            "mkdir my-project",
            "cd my-project",
            "git init",
            "npm init -y"
          ],
          duration: 30,
          difficulty: "Easy"
        }
      ];
      
      // Frontend tasks based on selected framework
      const frontendTasks = [];
      if (frontend === "react") {
        frontendTasks.push(
          {
            name: "Setup React",
            description: "Install and configure React with TypeScript",
            stage: "Frontend Core",
            order: 1,
            commands: ["npx create-react-app client --template typescript"],
            duration: 45,
            difficulty: "Easy"
          },
          {
            name: "Create Component Structure",
            description: "Set up the component hierarchy for the application",
            stage: "Frontend Core",
            order: 2,
            duration: 60,
            difficulty: "Medium"
          }
        );
      } else if (frontend === "vue") {
        frontendTasks.push(
          {
            name: "Setup Vue",
            description: "Install and configure Vue 3 with TypeScript",
            stage: "Frontend Core",
            order: 1,
            commands: ["npm init vue@latest"],
            duration: 45,
            difficulty: "Easy"
          },
          {
            name: "Create Component Structure",
            description: "Set up the component hierarchy using Vue 3 Composition API",
            stage: "Frontend Core",
            order: 2,
            duration: 60,
            difficulty: "Medium"
          }
        );
      }
      
      // Backend tasks based on selected framework
      const backendTasks = [];
      if (backend === "nodejs" || backend === "express") {
        backendTasks.push(
          {
            name: "Setup Express Server",
            description: "Create a basic Express server with middleware configuration",
            stage: "Backend API",
            order: 1,
            commands: [
              "mkdir server",
              "cd server",
              "npm init -y",
              "npm install express cors dotenv"
            ],
            duration: 45,
            difficulty: "Easy"
          },
          {
            name: "Create API Routes",
            description: "Implement RESTful API endpoints for the application",
            stage: "Backend API",
            order: 2,
            duration: 90,
            difficulty: "Medium"
          }
        );
      }
      
      // Database tasks
      const databaseTasks = [];
      if (database === "mongodb") {
        databaseTasks.push(
          {
            name: "Setup MongoDB Connection",
            description: "Configure MongoDB connection with Mongoose",
            stage: "Database Integration",
            order: 1,
            commands: [
              "cd server",
              "npm install mongoose"
            ],
            duration: 45,
            difficulty: "Medium"
          },
          {
            name: "Create Data Models",
            description: "Define Mongoose schemas and models for the application",
            stage: "Database Integration",
            order: 2,
            duration: 60,
            difficulty: "Medium"
          }
        );
      } else if (database === "postgresql") {
        databaseTasks.push(
          {
            name: "Setup PostgreSQL Connection",
            description: "Configure PostgreSQL connection with pg or an ORM",
            stage: "Database Integration",
            order: 1,
            commands: [
              "cd server",
              "npm install pg"
            ],
            duration: 45,
            difficulty: "Medium"
          },
          {
            name: "Create Database Schema",
            description: "Define database schema and migrations",
            stage: "Database Integration",
            order: 2,
            duration: 75,
            difficulty: "Hard"
          }
        );
      }
      
      // Authentication tasks
      const authTasks = [];
      if (authentication === "jwt") {
        authTasks.push(
          {
            name: "Implement JWT Authentication",
            description: "Set up JWT-based authentication with secure token handling",
            stage: "Authentication",
            order: 1,
            commands: [
              "cd server",
              "npm install jsonwebtoken bcrypt"
            ],
            duration: 120,
            difficulty: "Hard"
          },
          {
            name: "Create Auth Middleware",
            description: "Implement middleware to protect routes requiring authentication",
            stage: "Authentication",
            order: 2,
            duration: 60,
            difficulty: "Medium"
          }
        );
      }
      
      // Testing tasks
      const testingTasks = [
        {
          name: "Write Unit Tests",
          description: "Create comprehensive unit tests for components and API endpoints",
          stage: "Testing",
          order: 1,
          duration: 120,
          difficulty: "Medium"
        },
        {
          name: "Implement Integration Tests",
          description: "Test the interaction between different parts of the application",
          stage: "Testing",
          order: 2,
          duration: 150,
          difficulty: "Hard"
        }
      ];
      
      // Deployment tasks
      const deploymentTasks = [
        {
          name: "Setup CI/CD Pipeline",
          description: "Configure continuous integration and deployment",
          stage: "Deployment",
          order: 1,
          duration: 120,
          difficulty: "Hard"
        },
        {
          name: "Deploy Application",
          description: "Deploy the application to production environment",
          stage: "Deployment",
          order: 2,
          duration: 90,
          difficulty: "Medium"
        }
      ];
      
      // Combine all tasks into action plan
      actionPlan.push(...setupTasks, ...frontendTasks, ...backendTasks, ...databaseTasks, ...authTasks, ...testingTasks, ...deploymentTasks);
      
      // If projectId is provided, create the tasks in the database
      if (projectId) {
        const project = await storage.getProject(parseInt(projectId));
        if (!project) {
          return res.status(404).json({ message: "Project not found" });
        }
        
        // Create tasks in the database
        const createdTasks = [];
        for (const task of actionPlan) {
          const createdTask = await storage.createDevelopmentTask({
            ...task,
            projectId: parseInt(projectId),
            status: "pending"
          });
          createdTasks.push(createdTask);
        }
        
        res.status(201).json({
          message: "Action plan created successfully",
          stages,
          tasks: createdTasks
        });
      } else {
        // Just return the plan without creating tasks
        res.status(200).json({
          message: "Action plan generated successfully",
          stages,
          tasks: actionPlan
        });
      }
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  // Tech compatibility routes
  app.get("/api/compatibility/:techId", async (req, res) => {
    try {
      const techId = parseInt(req.params.techId);
      const compatibleTechs = await storage.getCompatibleTechnologies(techId);
      res.status(200).json(compatibleTechs);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  // Recommendations routes
  app.post("/api/recommendations/frontend", async (req, res) => {
    try {
      const { appType } = req.body;
      if (!appType) {
        return res.status(400).json({ message: "Application type is required" });
      }
      
      const recommendations = await storage.getRecommendedFrontend(appType);
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  app.post("/api/recommendations/backend", async (req, res) => {
    try {
      const { appType, frontend } = req.body;
      if (!appType) {
        return res.status(400).json({ message: "Application type is required" });
      }
      
      const recommendations = await storage.getRecommendedBackend(appType, frontend);
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  app.post("/api/recommendations/database", async (req, res) => {
    try {
      const { appType, backend } = req.body;
      if (!appType) {
        return res.status(400).json({ message: "Application type is required" });
      }
      
      const recommendations = await storage.getRecommendedDatabase(appType, backend);
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  app.post("/api/recommendations/auth", async (req, res) => {
    try {
      const { appType, backend } = req.body;
      if (!appType) {
        return res.status(400).json({ message: "Application type is required" });
      }
      
      const recommendations = await storage.getRecommendedAuth(appType, backend);
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  app.post("/api/recommendations/testing", async (req, res) => {
    try {
      const { appType, frontend, backend } = req.body;
      if (!appType) {
        return res.status(400).json({ message: "Application type is required" });
      }
      
      const recommendations = await storage.getRecommendedTesting(appType, frontend, backend);
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  app.post("/api/recommendations/hosting", async (req, res) => {
    try {
      const { appType } = req.body;
      if (!appType) {
        return res.status(400).json({ message: "Application type is required" });
      }
      
      const recommendations = await storage.getRecommendedHosting(appType);
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  app.post("/api/recommendations/payment", async (req, res) => {
    try {
      const { appType, backend } = req.body;
      if (!appType) {
        return res.status(400).json({ message: "Application type is required" });
      }
      
      const recommendations = await storage.getRecommendedPaymentProvider(appType, backend);
      res.status(200).json(recommendations);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });
  
  // Command generation route
  app.post("/api/generate-commands", async (req, res) => {
    try {
      const { frontend, backend, database, appType } = req.body;
      
      // Enhanced command generation based on the app type and selected technologies
      const commands = [];
      const verificationSteps = [];
      
      // Project setup commands
      commands.push({
        command: "mkdir my-fullstack-app && cd my-fullstack-app",
        explanation: "Creates and navigates to the project directory."
      });
      
      // Frontend setup
      if (frontend === "react") {
        commands.push({
          command: "npx create-react-app client --template typescript",
          explanation: "Creates a new React application with TypeScript support."
        });
        verificationSteps.push({
          step: "cd client && npm start",
          expectedOutcome: "React development server starts and shows the default page at http://localhost:3000"
        });
      } else if (frontend === "vue") {
        commands.push({
          command: "npm init vue@latest client",
          explanation: "Creates a new Vue 3 application with the latest features."
        });
        commands.push({
          command: "cd client && npm install",
          explanation: "Installs the Vue.js dependencies."
        });
        verificationSteps.push({
          step: "cd client && npm run dev",
          expectedOutcome: "Vue development server starts and shows the default page"
        });
      } else if (frontend === "angular") {
        commands.push({
          command: "npx -p @angular/cli ng new client",
          explanation: "Creates a new Angular application."
        });
        verificationSteps.push({
          step: "cd client && ng serve",
          expectedOutcome: "Angular development server starts and shows the default page at http://localhost:4200"
        });
      }
      
      // Backend setup
      if (backend === "express" || backend === "nodejs") {
        commands.push({
          command: "mkdir server && cd server && npm init -y",
          explanation: "Creates a server directory and initializes a Node.js project."
        });
        commands.push({
          command: "cd server && npm install express cors dotenv",
          explanation: "Installs Express.js and necessary middleware."
        });
        
        // Basic server file
        commands.push({
          command: `cd server && echo "const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});" > index.js`,
          explanation: "Creates a basic Express server with a test endpoint."
        });
        
        verificationSteps.push({
          step: "cd server && node index.js",
          expectedOutcome: "Server starts and outputs: Server running on port 5000"
        });
      }
      
      // Database setup
      if (database === "mongodb") {
        commands.push({
          command: "cd server && npm install mongoose",
          explanation: "Installs Mongoose ODM for MongoDB integration."
        });
        
        // MongoDB connection setup
        commands.push({
          command: `cd server && echo "
// Add to your server/index.js
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/myapp';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));
" > db.js`,
          explanation: "Creates a MongoDB connection file."
        });
        
        verificationSteps.push({
          step: "Make sure MongoDB is running and create a .env file with your MONGO_URI",
          expectedOutcome: "When you start the server, it should log 'MongoDB connected'"
        });
      } else if (database === "postgresql") {
        commands.push({
          command: "cd server && npm install pg",
          explanation: "Installs the PostgreSQL client for Node.js."
        });
        
        // PostgreSQL connection setup
        commands.push({
          command: `cd server && echo "
// Add to your server/index.js
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('connect', () => {
  console.log('PostgreSQL connected');
});

module.exports = { pool };
" > db.js`,
          explanation: "Creates a PostgreSQL connection file."
        });
        
        verificationSteps.push({
          step: "Make sure PostgreSQL is running and create a .env file with your DATABASE_URL",
          expectedOutcome: "When you start the server, it should log 'PostgreSQL connected'"
        });
      }
      
      // Full-stack specific instructions
      if (appType === "fullstack") {
        commands.push({
          command: `echo "# My Full-Stack App
## Getting Started
1. Set up the backend:
   \`\`\`
   cd server
   npm install
   npm start
   \`\`\`
2. Set up the frontend:
   \`\`\`
   cd client
   npm install
   npm start
   \`\`\`
" > README.md`,
          explanation: "Creates a README with setup instructions."
        });
        
        // Create a package.json for the root directory
        commands.push({
          command: `echo '{
  "name": "my-fullstack-app",
  "version": "1.0.0",
  "description": "A full-stack application",
  "scripts": {
    "start": "concurrently \\"npm run server\\" \\"npm run client\\"",
    "server": "cd server && npm start",
    "client": "cd client && npm start",
    "install-all": "npm install && cd server && npm install && cd ../client && npm install",
    "build": "cd client && npm run build"
  },
  "dependencies": {
    "concurrently": "^7.0.0"
  }
}' > package.json`,
          explanation: "Creates a root package.json with scripts to run both frontend and backend."
        });
        
        commands.push({
          command: "npm install",
          explanation: "Installs the concurrently package for running frontend and backend simultaneously."
        });
      }
      
      // Return the commands and verification steps
      res.status(200).json({ 
        commands,
        verificationSteps,
        commitRecommendation: "Make sure to commit your code after each major implementation step. For example, commit after setting up the project structure, after implementing user authentication, etc."
      });
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
