import { 
  users, type User, type InsertUser, 
  projects, type Project, type InsertProject,
  techStacks, type TechStack, type InsertTechStack
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Project operations
  createProject(project: Omit<InsertProject, "userId"> & { createdAt: string, userId: number | null }): Promise<Project>;
  getProject(id: number): Promise<Project | undefined>;
  getProjects(): Promise<Project[]>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Tech stack operations
  createTechStack(techStack: InsertTechStack): Promise<TechStack>;
  getTechStacksByCategory(category: string): Promise<TechStack[]>;
  getAllTechStacks(): Promise<TechStack[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private techStacks: Map<number, TechStack>;
  
  private userId: number;
  private projectId: number;
  private techStackId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.techStacks = new Map();
    
    this.userId = 1;
    this.projectId = 1;
    this.techStackId = 1;
    
    // Initialize with some tech stack data
    this.seedTechStacks();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project operations
  async createProject(projectData: Omit<InsertProject, "userId"> & { createdAt: string, userId: number | null }): Promise<Project> {
    const id = this.projectId++;
    const project: Project = { 
      ...projectData, 
      id, 
      userId: projectData.userId 
    };
    this.projects.set(id, project);
    return project;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async updateProject(id: number, projectData: Partial<InsertProject>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) {
      return undefined;
    }
    
    const updatedProject = { ...project, ...projectData };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projects.delete(id);
  }

  // Tech stack operations
  async createTechStack(techStackData: InsertTechStack): Promise<TechStack> {
    const id = this.techStackId++;
    const techStack: TechStack = { ...techStackData, id };
    this.techStacks.set(id, techStack);
    return techStack;
  }

  async getTechStacksByCategory(category: string): Promise<TechStack[]> {
    return Array.from(this.techStacks.values()).filter(
      (techStack) => techStack.category === category
    );
  }

  async getAllTechStacks(): Promise<TechStack[]> {
    return Array.from(this.techStacks.values());
  }

  // Seed initial tech stack data
  private seedTechStacks(): void {
    // Frontend frameworks
    this.createTechStack({
      category: "frontend",
      name: "React",
      description: "A JavaScript library for building user interfaces, focusing on component-based architecture.",
      details: {
        advantages: [
          "Component-based architecture",
          "Virtual DOM for performance",
          "Large ecosystem and community",
          "Maintained by Meta (Facebook)"
        ],
        useCases: [
          "Single Page Applications (SPAs)",
          "Complex dashboards",
          "Reusable UI components",
          "Progressive Web Apps (PWAs)"
        ],
        learningResources: [
          {
            name: "Official Documentation",
            url: "https://reactjs.org/"
          },
          {
            name: "React Tutorial",
            url: "https://reactjs.org/tutorial/tutorial.html"
          }
        ]
      }
    });

    this.createTechStack({
      category: "frontend",
      name: "Vue.js",
      description: "Progressive JavaScript framework for building user interfaces with an incremental adoption path.",
      details: {
        advantages: [
          "Easy learning curve",
          "Flexible integration options",
          "Detailed documentation",
          "Single-file components"
        ],
        useCases: [
          "Progressive enhancement of existing pages",
          "SPAs with lightweight requirements",
          "Enterprise applications",
          "Prototypes and MVPs"
        ],
        learningResources: [
          {
            name: "Official Documentation",
            url: "https://vuejs.org/"
          },
          {
            name: "Vue Mastery",
            url: "https://www.vuemastery.com/"
          }
        ]
      }
    });

    // Styling solutions
    this.createTechStack({
      category: "styling",
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for rapidly building custom user interfaces.",
      details: {
        advantages: [
          "Utility-first approach",
          "Highly customizable",
          "No naming conventions to worry about",
          "Optimized for production with PurgeCSS"
        ],
        useCases: [
          "Modern web applications",
          "Responsive designs",
          "Complex UI with consistent styling",
          "Projects requiring design system integration"
        ],
        learningResources: [
          {
            name: "Official Documentation",
            url: "https://tailwindcss.com/docs"
          },
          {
            name: "Tailwind UI Components",
            url: "https://tailwindui.com/"
          }
        ]
      }
    });

    // Backend frameworks
    this.createTechStack({
      category: "backend",
      name: "Node.js / Express",
      description: "A minimal and flexible Node.js web application framework for building APIs and web applications.",
      details: {
        advantages: [
          "JavaScript across the stack",
          "Large ecosystem of middleware",
          "Non-blocking I/O for high performance",
          "Active community and extensive packages"
        ],
        useCases: [
          "RESTful APIs",
          "Real-time applications with WebSockets",
          "Microservices architecture",
          "Server-side rendering for JavaScript frameworks"
        ],
        learningResources: [
          {
            name: "Express.js Documentation",
            url: "https://expressjs.com/"
          },
          {
            name: "Node.js Documentation",
            url: "https://nodejs.org/en/docs/"
          }
        ]
      }
    });

    // Databases
    this.createTechStack({
      category: "database",
      name: "MongoDB",
      description: "A document-based NoSQL database designed for scalability and developer productivity.",
      details: {
        advantages: [
          "Schema-less document structure",
          "Horizontal scaling capabilities",
          "JSON-like document model",
          "Great for rapid development and prototyping"
        ],
        useCases: [
          "Content management systems",
          "Real-time analytics",
          "Mobile applications",
          "Applications with evolving data requirements"
        ],
        learningResources: [
          {
            name: "MongoDB Documentation",
            url: "https://docs.mongodb.com/"
          },
          {
            name: "MongoDB University",
            url: "https://university.mongodb.com/"
          }
        ]
      }
    });
  }
}

export const storage = new MemStorage();
