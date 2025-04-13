import { 
  users, type User, type InsertUser, 
  projects, type Project, type InsertProject,
  technologies, type Technology, type InsertTechnology,
  techCompatibility, developmentTasks, type DevelopmentTask, type InsertDevelopmentTask,
  type AppType, type FrontendFramework, type BackendFramework, type Database, 
  type Authentication, type Hosting, type TestingFramework, type PaymentProvider
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Project operations
  createProject(project: Omit<InsertProject, "userId"> & { userId: number | null }): Promise<Project>;
  getProject(id: number): Promise<Project | undefined>;
  getProjects(): Promise<Project[]>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;

  // Technology operations
  createTechnology(technology: InsertTechnology): Promise<Technology>;
  getTechnology(id: number): Promise<Technology | undefined>;
  getTechnologiesByCategory(category: string): Promise<Technology[]>;
  getAllTechnologies(): Promise<Technology[]>;
  
  // Tech compatibility operations
  createTechCompatibility(primaryTechId: number, compatibleTechId: number, score: number, notes?: string): Promise<void>;
  getCompatibleTechnologies(techId: number): Promise<{technology: Technology, compatibilityScore: number}[]>;
  
  // Development task operations
  createDevelopmentTask(task: InsertDevelopmentTask): Promise<DevelopmentTask>;
  getTasksForProject(projectId: number): Promise<DevelopmentTask[]>;
  updateTaskStatus(taskId: number, status: string): Promise<DevelopmentTask | undefined>;
  
  // Recommendation engine operations
  getRecommendedFrontend(appType: AppType): Promise<Technology[]>;
  getRecommendedBackend(appType: AppType, frontend?: FrontendFramework): Promise<Technology[]>;
  getRecommendedDatabase(appType: AppType, backend?: BackendFramework): Promise<Technology[]>;
  getRecommendedAuth(appType: AppType, backend?: BackendFramework): Promise<Technology[]>;
  getRecommendedTesting(appType: AppType, frontend?: FrontendFramework, backend?: BackendFramework): Promise<Technology[]>;
  getRecommendedHosting(appType: AppType): Promise<Technology[]>;
  getRecommendedPaymentProvider(appType: AppType, backend?: BackendFramework): Promise<Technology[]>;
  
  // Context-aware tech data
  getTechWithContext(category: string, selectedTech: {
    appType?: AppType;
    frontend?: FrontendFramework;
    backend?: BackendFramework;
    database?: Database;
    authentication?: Authentication;
    hosting?: Hosting;
    testing?: TestingFramework;
    payment?: PaymentProvider;
  }): Promise<Technology[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private technologies: Map<number, Technology>;
  private techCompatibility: Map<string, { score: number, notes?: string }>;
  private developmentTasks: Map<number, DevelopmentTask>;
  
  private userId: number;
  private projectId: number;
  private technologyId: number;
  private taskId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.technologies = new Map();
    this.techCompatibility = new Map();
    this.developmentTasks = new Map();
    
    this.userId = 1;
    this.projectId = 1;
    this.technologyId = 1;
    this.taskId = 1;
    
    // Initialize with technology data
    this.seedTechnologies();
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

  // Technology operations
  async createTechnology(technology: InsertTechnology): Promise<Technology> {
    const id = this.technologyId++;
    const newTech: Technology = { ...technology, id };
    this.technologies.set(id, newTech);
    return newTech;
  }

  async getTechnology(id: number): Promise<Technology | undefined> {
    return this.technologies.get(id);
  }

  async getTechnologiesByCategory(category: string): Promise<Technology[]> {
    return Array.from(this.technologies.values()).filter(
      (tech) => tech.category === category
    );
  }

  async getAllTechnologies(): Promise<Technology[]> {
    return Array.from(this.technologies.values());
  }
  
  // Tech compatibility operations
  async createTechCompatibility(primaryTechId: number, compatibleTechId: number, score: number, notes?: string): Promise<void> {
    const key = `${primaryTechId}-${compatibleTechId}`;
    this.techCompatibility.set(key, { score, notes });
  }
  
  async getCompatibleTechnologies(techId: number): Promise<{technology: Technology, compatibilityScore: number}[]> {
    const result: {technology: Technology, compatibilityScore: number}[] = [];
    
    // Find all entries where this tech is the primary
    for (const [key, value] of this.techCompatibility.entries()) {
      const [primaryId, compatibleId] = key.split('-').map(Number);
      
      if (primaryId === techId) {
        const compatibleTech = this.technologies.get(compatibleId);
        if (compatibleTech) {
          result.push({
            technology: compatibleTech,
            compatibilityScore: value.score
          });
        }
      }
    }
    
    return result;
  }
  
  // Development task operations
  async createDevelopmentTask(task: InsertDevelopmentTask): Promise<DevelopmentTask> {
    const id = this.taskId++;
    const newTask: DevelopmentTask = { 
      ...task, 
      id,
      createdAt: new Date(),
      completedAt: null
    };
    this.developmentTasks.set(id, newTask);
    return newTask;
  }
  
  async getTasksForProject(projectId: number): Promise<DevelopmentTask[]> {
    return Array.from(this.developmentTasks.values())
      .filter(task => task.projectId === projectId)
      .sort((a, b) => a.order - b.order);
  }
  
  async updateTaskStatus(taskId: number, status: string): Promise<DevelopmentTask | undefined> {
    const task = this.developmentTasks.get(taskId);
    if (!task) return undefined;
    
    const updatedTask = { 
      ...task, 
      status,
      completedAt: status === 'completed' ? new Date() : task.completedAt
    };
    
    this.developmentTasks.set(taskId, updatedTask);
    return updatedTask;
  }
  
  // Recommendation engine operations
  async getRecommendedFrontend(appType: AppType): Promise<Technology[]> {
    const frontendTechs = await this.getTechnologiesByCategory('frontend');
    
    // Sort based on recommendation criteria
    return frontendTechs.sort((a, b) => {
      // For web apps, prioritize React and Vue
      if (appType === 'web') {
        if (a.name === 'React') return -1;
        if (b.name === 'React') return 1;
        if (a.name === 'Vue') return -1;
        if (b.name === 'Vue') return 1;
      }
      
      // For mobile apps, prioritize React Native and Flutter
      if (appType === 'mobile') {
        if (a.name === 'React Native') return -1;
        if (b.name === 'React Native') return 1;
        if (a.name === 'Flutter') return -1;
        if (b.name === 'Flutter') return 1;
      }
      
      // Default sort by popularity
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }
  
  async getRecommendedBackend(appType: AppType, frontend?: FrontendFramework): Promise<Technology[]> {
    const backendTechs = await this.getTechnologiesByCategory('backend');
    
    return backendTechs.sort((a, b) => {
      // For JS frontends, prioritize Node.js for full-stack JS
      if (frontend === 'react' || frontend === 'vue' || frontend === 'angular' || frontend === 'svelte') {
        if (a.name.includes('Node') || a.name.includes('Express')) return -1;
        if (b.name.includes('Node') || b.name.includes('Express')) return 1;
      }
      
      // For fullstack apps, recommend based on ecosystem integration
      if (appType === 'fullstack') {
        // If using React, prioritize Node.js and .NET
        if (frontend === 'react') {
          if (a.name.includes('Node') || a.name.includes('Express')) return -1;
          if (b.name.includes('Node') || b.name.includes('Express')) return 1;
        }
        
        // If using Vue, prioritize Node.js and Laravel
        if (frontend === 'vue') {
          if (a.name.includes('Laravel')) return -1;
          if (b.name.includes('Laravel')) return 1;
        }
        
        // If using Angular, prioritize .NET and Spring
        if (frontend === 'angular') {
          if (a.name.includes('.NET')) return -1;
          if (b.name.includes('.NET')) return 1;
          if (a.name.includes('Spring')) return -1;
          if (b.name.includes('Spring')) return 1;
        }
      }
      
      // Default sort by South African adoption and popularity
      const aSouthAfricanScore = (a.southAfricanAdoption || 0) * 2 + (a.popularity || 0);
      const bSouthAfricanScore = (b.southAfricanAdoption || 0) * 2 + (b.popularity || 0);
      return bSouthAfricanScore - aSouthAfricanScore;
    });
  }
  
  async getRecommendedDatabase(appType: AppType, backend?: BackendFramework): Promise<Technology[]> {
    const dbTechs = await this.getTechnologiesByCategory('database');
    
    return dbTechs.sort((a, b) => {
      // Match database based on backend
      if (backend === 'nodejs') {
        // For Node.js, MongoDB is often a good pair (MEAN/MERN stack)
        if (a.name === 'MongoDB') return -1;
        if (b.name === 'MongoDB') return 1;
      } else if (backend === 'python') {
        // Python works well with PostgreSQL
        if (a.name === 'PostgreSQL') return -1;
        if (b.name === 'PostgreSQL') return 1;
      } else if (backend === 'java') {
        // Java often uses MySQL or PostgreSQL
        if (a.name === 'PostgreSQL') return -1;
        if (b.name === 'PostgreSQL') return 1;
        if (a.name === 'MySQL') return -1;
        if (b.name === 'MySQL') return 1;
      } else if (backend === 'php') {
        // PHP traditionally pairs with MySQL
        if (a.name === 'MySQL') return -1;
        if (b.name === 'MySQL') return 1;
      } else if (backend === 'ruby') {
        // Ruby on Rails often uses PostgreSQL
        if (a.name === 'PostgreSQL') return -1;
        if (b.name === 'PostgreSQL') return 1;
      }
      
      // For mobile/offline apps, consider SQLite or Firebase
      if (appType === 'mobile') {
        if (a.name === 'Firebase') return -1;
        if (b.name === 'Firebase') return 1;
        if (a.name === 'SQLite') return -1;
        if (b.name === 'SQLite') return 1;
      }
      
      // Default to PostgreSQL for South African market (widely supported)
      if (a.name === 'PostgreSQL') return -1;
      if (b.name === 'PostgreSQL') return 1;
      
      // Then sort by offline capability and South African adoption
      const aScore = (a.offlineCapability || 0) + (a.southAfricanAdoption || 0);
      const bScore = (b.offlineCapability || 0) + (b.southAfricanAdoption || 0);
      return bScore - aScore;
    });
  }
  
  async getRecommendedAuth(appType: AppType, backend?: BackendFramework): Promise<Technology[]> {
    const authTechs = await this.getTechnologiesByCategory('authentication');
    
    return authTechs.sort((a, b) => {
      // For mobile apps, prioritize Firebase Auth and OAuth providers
      if (appType === 'mobile') {
        if (a.name === 'Firebase Authentication') return -1;
        if (b.name === 'Firebase Authentication') return 1;
      }
      
      // For backend-specific recommendations
      if (backend === 'nodejs') {
        if (a.name === 'JWT Authentication') return -1;
        if (b.name === 'JWT Authentication') return 1;
      }
      
      // Default to JWT for simplicity and compatibility
      if (a.name === 'JWT Authentication') return -1;
      if (b.name === 'JWT Authentication') return 1;
      
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }
  
  async getRecommendedTesting(appType: AppType, frontend?: FrontendFramework, backend?: BackendFramework): Promise<Technology[]> {
    const testingTechs = await this.getTechnologiesByCategory('testing');
    
    return testingTechs.sort((a, b) => {
      // For React frontends, prioritize Jest + React Testing Library
      if (frontend === 'react') {
        if (a.name === 'Jest') return -1;
        if (b.name === 'Jest') return 1;
        if (a.name === 'React Testing Library') return -1;
        if (b.name === 'React Testing Library') return 1;
      }
      
      // For Vue, prioritize Vue Test Utils
      if (frontend === 'vue') {
        if (a.name === 'Vue Test Utils') return -1;
        if (b.name === 'Vue Test Utils') return 1;
      }
      
      // For frontend applications, prioritize Cypress for E2E testing
      if (frontend && ['react', 'vue', 'angular', 'svelte'].includes(frontend)) {
        if (a.name === 'Cypress') return -1;
        if (b.name === 'Cypress') return 1;
      }
      
      // For backend, prioritize appropriate testing frameworks
      if (backend === 'nodejs') {
        if (a.name === 'Jest' || a.name === 'Mocha') return -1;
        if (b.name === 'Jest' || b.name === 'Mocha') return 1;
      } else if (backend === 'python') {
        if (a.name === 'pytest') return -1;
        if (b.name === 'pytest') return 1;
      }
      
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }
  
  async getRecommendedHosting(appType: AppType): Promise<Technology[]> {
    const hostingTechs = await this.getTechnologiesByCategory('hosting');
    
    return hostingTechs.sort((a, b) => {
      // For web apps, prioritize Vercel and Netlify
      if (appType === 'web' || appType === 'fullstack') {
        if (a.name === 'Vercel') return -1;
        if (b.name === 'Vercel') return 1;
        if (a.name === 'Netlify') return -1;
        if (b.name === 'Netlify') return 1;
      }
      
      // For backend apps, consider Heroku and Digital Ocean
      if (appType === 'backend') {
        if (a.name === 'Heroku') return -1;
        if (b.name === 'Heroku') return 1;
        if (a.name === 'Digital Ocean') return -1;
        if (b.name === 'Digital Ocean') return 1;
      }
      
      // For South African developers, consider local hosting options
      const aSouthAfricanScore = (a.southAfricanAdoption || 0) * 2;
      const bSouthAfricanScore = (b.southAfricanAdoption || 0) * 2;
      return bSouthAfricanScore - aSouthAfricanScore;
    });
  }
  
  async getRecommendedPaymentProvider(appType: AppType, backend?: BackendFramework): Promise<Technology[]> {
    const paymentTechs = await this.getTechnologiesByCategory('payment');
    
    return paymentTechs.sort((a, b) => {
      // For South African developers, prioritize local payment gateways
      if (a.name === 'PayFast' || a.name.includes('South Africa')) return -1;
      if (b.name === 'PayFast' || b.name.includes('South Africa')) return 1;
      
      // Then Stripe as it's widely adopted
      if (a.name === 'Stripe') return -1;
      if (b.name === 'Stripe') return 1;
      
      // Default sort by South African adoption
      return (b.southAfricanAdoption || 0) - (a.southAfricanAdoption || 0);
    });
  }
  
  // Context-aware tech data method
  async getTechWithContext(category: string, selectedTech: {
    appType?: AppType;
    frontend?: FrontendFramework;
    backend?: BackendFramework;
    database?: Database;
    authentication?: Authentication;
    hosting?: Hosting;
    testing?: TestingFramework;
    payment?: PaymentProvider;
  }): Promise<Technology[]> {
    // Get base technologies for this category
    let technologies = await this.getTechnologiesByCategory(category);
    
    // Find selected technologies to determine compatibility
    let selectedTechIds: number[] = [];
    
    if (selectedTech.frontend) {
      const frontendTechs = await this.getTechnologiesByCategory('frontend');
      const selected = frontendTechs.find(t => t.name.toLowerCase() === selectedTech.frontend);
      if (selected) selectedTechIds.push(selected.id);
    }
    
    if (selectedTech.backend) {
      const backendTechs = await this.getTechnologiesByCategory('backend');
      const selected = backendTechs.find(t => t.name.toLowerCase().includes(selectedTech.backend));
      if (selected) selectedTechIds.push(selected.id);
    }
    
    if (selectedTech.database) {
      const dbTechs = await this.getTechnologiesByCategory('database');
      const selected = dbTechs.find(t => t.name.toLowerCase() === selectedTech.database);
      if (selected) selectedTechIds.push(selected.id);
    }
    
    // For each tech, add a compatibilityScore property based on selected technologies
    const enhancedTechs = await Promise.all(technologies.map(async (tech) => {
      let compatibilityScore = 0;
      
      // Calculate compatibility score based on explicit compatibility data
      for (const selectedId of selectedTechIds) {
        const key = `${selectedId}-${tech.id}`;
        const compatData = this.techCompatibility.get(key);
        if (compatData) {
          compatibilityScore += compatData.score;
        }
      }
      
      // Add contextual recommendations based on app type
      if (selectedTech.appType) {
        if (selectedTech.appType === 'mobile' && tech.offlineCapability && tech.offlineCapability > 7) {
          compatibilityScore += 3;
        }
        
        if (selectedTech.appType === 'fullstack' && tech.learningCurve && tech.learningCurve < 5) {
          compatibilityScore += 2; // Favor easier-to-learn technologies for fullstack
        }
      }
      
      // South African specific recommendations
      if (tech.southAfricanAdoption && tech.southAfricanAdoption > 7) {
        compatibilityScore += 3; // Strongly favor technologies with good adoption in South Africa
      }
      
      return {
        ...tech,
        compatibilityScore
      };
    }));
    
    // Sort by compatibility score and then by popularity
    return enhancedTechs.sort((a, b) => {
      if (b.compatibilityScore !== a.compatibilityScore) {
        return b.compatibilityScore - a.compatibilityScore;
      }
      return (b.popularity || 0) - (a.popularity || 0);
    });
  }
  
  // Seed technology data
  private seedTechnologies(): void {
    // Frontend frameworks
    this.createTechnology({
      category: "frontend",
      name: "React",
      description: "A JavaScript library for building user interfaces with component-based architecture.",
      iconUrl: "https://reactjs.org/favicon.ico",
      advantages: [
        "Component-based architecture",
        "Virtual DOM for performance",
        "Large ecosystem and community",
        "Strong industry adoption"
      ],
      limitations: [
        "Requires additional libraries for routing, state management",
        "JSX syntax can be initially confusing",
        "Frequent updates may require keeping up with changes"
      ],
      useCases: [
        "Single Page Applications (SPAs)",
        "Complex web applications with many UI components",
        "Progressive Web Apps (PWAs)",
        "Dashboard and admin interfaces"
      ],
      learningResources: [
        { title: "Official Documentation", url: "https://reactjs.org/docs/getting-started.html", difficulty: "beginner" },
        { title: "React Tutorial", url: "https://reactjs.org/tutorial/tutorial.html", difficulty: "beginner" },
        { title: "React for Beginners", url: "https://www.youtube.com/watch?v=Ke90Tje7VS0", difficulty: "beginner" }
      ],
      promptSuggestions: [
        { title: "Context API vs Redux", prompt: "When should I use React Context API instead of Redux for state management?" },
        { title: "Component Structure", prompt: "What's the best way to structure components in a large React application?" },
        { title: "React Performance", prompt: "How can I optimize performance in my React application?" }
      ],
      setupCommands: [
        "npx create-react-app my-app",
        "cd my-app",
        "npm start"
      ],
      verificationCommands: [
        "npm test",
        "npm run build"
      ],
      popularity: 95,
      learningCurve: 6,
      maturity: 9,
      southAfricanAdoption: 9,
      offlineCapability: 7,
      communitySupport: 10
    });

    this.createTechnology({
      category: "frontend",
      name: "Vue.js",
      description: "Progressive JavaScript framework for building user interfaces with an incremental adoption path.",
      iconUrl: "https://vuejs.org/images/logo.png",
      advantages: [
        "Easy learning curve",
        "Flexible integration options",
        "Detailed documentation",
        "Single-file components"
      ],
      limitations: [
        "Smaller ecosystem than React",
        "Fewer job opportunities (especially in South Africa)",
        "Less third-party libraries"
      ],
      useCases: [
        "Progressive enhancement of existing pages",
        "SPAs with lightweight requirements",
        "Prototypes and MVPs",
        "Projects needing incremental adoption"
      ],
      learningResources: [
        { title: "Vue.js Guide", url: "https://vuejs.org/v2/guide/", difficulty: "beginner" },
        { title: "Vue Mastery", url: "https://www.vuemastery.com/", difficulty: "intermediate" },
        { title: "Vue School", url: "https://vueschool.io/", difficulty: "beginner" }
      ],
      promptSuggestions: [
        { title: "Composition API", prompt: "Explain the benefits of Vue 3 Composition API compared to Options API" },
        { title: "Vue vs React", prompt: "What are the main differences between Vue.js and React?" },
        { title: "Vuex Store", prompt: "How should I structure my Vuex store for a medium-sized application?" }
      ],
      setupCommands: [
        "npm install -g @vue/cli",
        "vue create my-project",
        "cd my-project",
        "npm run serve"
      ],
      verificationCommands: [
        "npm run test:unit",
        "npm run build"
      ],
      popularity: 85,
      learningCurve: 4,
      maturity: 8,
      southAfricanAdoption: 7,
      offlineCapability: 7,
      communitySupport: 8
    });

    // Styling options
    this.createTechnology({
      category: "styling",
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for rapidly building custom user interfaces.",
      iconUrl: "https://tailwindcss.com/favicon-32x32.png",
      advantages: [
        "Utility-first approach speeds up development",
        "Highly customizable with configuration",
        "Purges unused CSS for small bundle sizes",
        "Works well with component-based frameworks"
      ],
      limitations: [
        "HTML can become cluttered with many utility classes",
        "Learning curve for utility-first approach",
        "Initial setup complexity"
      ],
      useCases: [
        "Rapid prototyping",
        "Consistent design systems",
        "Responsive web design",
        "Custom UI components"
      ],
      learningResources: [
        { title: "Tailwind Documentation", url: "https://tailwindcss.com/docs", difficulty: "beginner" },
        { title: "Tailwind UI", url: "https://tailwindui.com/", difficulty: "beginner" },
        { title: "Tailwind CSS Crash Course", url: "https://www.youtube.com/watch?v=UBOj6rqRUME", difficulty: "beginner" }
      ],
      promptSuggestions: [
        { title: "Custom Configuration", prompt: "How do I extend Tailwind CSS with custom colors and spacing?" },
        { title: "Responsive Design", prompt: "What's the best approach for responsive design patterns with Tailwind?" },
        { title: "Component Extraction", prompt: "When should I extract reusable components vs. using utility classes directly?" }
      ],
      setupCommands: [
        "npm install tailwindcss",
        "npx tailwindcss init",
        "npm install postcss autoprefixer"
      ],
      verificationCommands: [
        "npx tailwindcss -i ./src/input.css -o ./dist/output.css"
      ],
      popularity: 90,
      learningCurve: 5,
      maturity: 8,
      southAfricanAdoption: 9,
      offlineCapability: 10,
      communitySupport: 9
    });

    // Backend options
    this.createTechnology({
      category: "backend",
      name: "Node.js with Express",
      description: "JavaScript runtime with a lightweight framework for building web applications and APIs.",
      iconUrl: "https://nodejs.org/static/images/logo.svg",
      advantages: [
        "JavaScript across entire stack",
        "Non-blocking I/O for high performance",
        "Huge npm ecosystem",
        "Great for APIs and microservices"
      ],
      limitations: [
        "Not ideal for CPU-intensive tasks",
        "Callback patterns can be complex",
        "Error handling requires attention"
      ],
      useCases: [
        "RESTful APIs",
        "Real-time applications (with WebSockets)",
        "Microservices",
        "Full-stack JavaScript applications"
      ],
      learningResources: [
        { title: "Express Guide", url: "https://expressjs.com/en/guide/routing.html", difficulty: "beginner" },
        { title: "Node.js Documentation", url: "https://nodejs.org/en/docs/", difficulty: "intermediate" },
        { title: "Express Tutorial", url: "https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs", difficulty: "beginner" }
      ],
      promptSuggestions: [
        { title: "API Structure", prompt: "What's the best way to structure a REST API with Express?" },
        { title: "Authentication", prompt: "How should I implement JWT authentication in an Express application?" },
        { title: "Performance", prompt: "How can I optimize the performance of my Node.js application?" }
      ],
      setupCommands: [
        "npm init -y",
        "npm install express",
        "node app.js"
      ],
      verificationCommands: [
        "curl http://localhost:3000",
        "npm test"
      ],
      popularity: 90,
      learningCurve: 5,
      maturity: 9,
      southAfricanAdoption: 9,
      offlineCapability: 8,
      communitySupport: 10
    });

    // Database options
    this.createTechnology({
      category: "database",
      name: "PostgreSQL",
      description: "Powerful, open source object-relational database system with strong reputation for reliability and data integrity.",
      iconUrl: "https://www.postgresql.org/media/img/about/press/elephant.png",
      advantages: [
        "ACID compliance for data integrity",
        "Advanced features like JSON storage and full-text search",
        "Scales well for complex queries",
        "Strong data validation"
      ],
      limitations: [
        "Configuration can be complex",
        "Higher resource requirements than SQLite",
        "Requires more setup than MongoDB"
      ],
      useCases: [
        "Complex applications with relational data",
        "Financial applications requiring transactions",
        "Applications with data integrity requirements",
        "Enterprise applications"
      ],
      learningResources: [
        { title: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs/", difficulty: "intermediate" },
        { title: "PostgreSQL Tutorial", url: "https://www.postgresqltutorial.com/", difficulty: "beginner" },
        { title: "SQL Basics", url: "https://www.khanacademy.org/computing/computer-programming/sql", difficulty: "beginner" }
      ],
      promptSuggestions: [
        { title: "Schema Design", prompt: "How should I design a database schema for a social media application?" },
        { title: "Performance", prompt: "What indexes should I create to optimize query performance?" },
        { title: "ORM Integration", prompt: "What's the best ORM to use with PostgreSQL in a Node.js application?" }
      ],
      setupCommands: [
        "sudo apt-get install postgresql",
        "sudo service postgresql start",
        "sudo -u postgres createdb mydb"
      ],
      verificationCommands: [
        "psql -U postgres -d mydb -c '\\dt'",
        "pg_isready"
      ],
      popularity: 85,
      learningCurve: 7,
      maturity: 10,
      southAfricanAdoption: 8,
      offlineCapability: 7,
      communitySupport: 9
    });
  }
}

export const storage = new MemStorage();
