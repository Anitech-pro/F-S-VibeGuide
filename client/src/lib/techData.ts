// Technology information data for display

// Frontend frameworks
export interface TechInfo {
  name: string;
  description: string;
  advantages: string[];
  icon?: React.ReactNode;
}

export type TechCategory = 'frontend' | 'styling' | 'backend' | 'database' | 'authentication' | 'hosting';

const frontendTech: Record<string, TechInfo> = {
  react: {
    name: "React",
    description: "A JavaScript library for building user interfaces, focusing on component-based architecture.",
    advantages: [
      "Component-based architecture",
      "Virtual DOM for performance",
      "Large ecosystem and community",
      "Maintained by Meta (Facebook)"
    ]
  },
  vue: {
    name: "Vue.js",
    description: "Progressive JavaScript framework for building user interfaces with an incremental adoption path.",
    advantages: [
      "Easy learning curve",
      "Flexible integration options",
      "Detailed documentation",
      "Single-file components"
    ]
  },
  angular: {
    name: "Angular",
    description: "Platform and framework for building single-page client applications using HTML and TypeScript.",
    advantages: [
      "Complete frontend solution",
      "Strong typing with TypeScript",
      "Dependency injection",
      "Comprehensive tooling"
    ]
  },
  svelte: {
    name: "Svelte",
    description: "Radical new approach to building user interfaces that compiles at build time.",
    advantages: [
      "No virtual DOM overhead",
      "Write less code",
      "Truly reactive",
      "Small bundle size"
    ]
  }
};

// Styling solutions
const stylingTech: Record<string, TechInfo> = {
  tailwind: {
    name: "Tailwind CSS",
    description: "A utility-first CSS framework for rapidly building custom user interfaces.",
    advantages: [
      "Utility-first approach",
      "Highly customizable",
      "No naming conventions to worry about",
      "Optimized for production with PurgeCSS"
    ]
  },
  css: {
    name: "CSS / SCSS",
    description: "Traditional CSS with optional preprocessing for variables, nesting, and more.",
    advantages: [
      "Complete control over styling",
      "SCSS adds variables and nesting",
      "No framework dependencies",
      "Standard web technology"
    ]
  },
  "styled-components": {
    name: "Styled Components",
    description: "CSS-in-JS library that utilizes tagged template literals to style components.",
    advantages: [
      "Component-scoped styling",
      "Dynamic styling based on props",
      "Automatic vendor prefixing",
      "Theming support"
    ]
  }
};

// Backend frameworks
const backendTech: Record<string, TechInfo> = {
  express: {
    name: "Node.js / Express",
    description: "A minimal and flexible Node.js web application framework for building APIs and web applications.",
    advantages: [
      "JavaScript across the stack",
      "Large ecosystem of middleware",
      "Non-blocking I/O for performance",
      "Active community and packages"
    ]
  },
  django: {
    name: "Python / Django",
    description: "A high-level Python Web framework that encourages rapid development and clean, pragmatic design.",
    advantages: [
      "Batteries-included philosophy",
      "Admin interface out of the box",
      "Object-relational mapper (ORM)",
      "Security features by default"
    ]
  },
  rails: {
    name: "Ruby on Rails",
    description: "A server-side web application framework written in Ruby following the MVC pattern.",
    advantages: [
      "Convention over configuration",
      "Active Record ORM",
      "Built-in testing framework",
      "Large ecosystem of gems"
    ]
  },
  laravel: {
    name: "PHP / Laravel",
    description: "A PHP web application framework with expressive, elegant syntax.",
    advantages: [
      "Elegant syntax",
      "Eloquent ORM",
      "Blade templating engine",
      "Robust ecosystem"
    ]
  }
};

// Databases
const databaseTech: Record<string, TechInfo> = {
  mongodb: {
    name: "MongoDB",
    description: "A document-based NoSQL database designed for scalability and developer productivity.",
    advantages: [
      "Schema-less document structure",
      "Horizontal scaling capabilities",
      "JSON-like document model",
      "Great for rapid development"
    ]
  },
  postgresql: {
    name: "PostgreSQL",
    description: "A powerful, open source object-relational database system with over 30 years of active development.",
    advantages: [
      "ACID compliance",
      "Robust feature set",
      "Handles complex queries well",
      "Strong data integrity"
    ]
  },
  mysql: {
    name: "MySQL",
    description: "A widely used open-source relational database management system.",
    advantages: [
      "Easy to set up and use",
      "Well-documented",
      "Good performance for read-heavy applications",
      "Widely supported"
    ]
  },
  firebase: {
    name: "Firebase",
    description: "A platform developed by Google for creating mobile and web applications.",
    advantages: [
      "Real-time database",
      "Built-in authentication",
      "Cloud functions",
      "Hosting and storage"
    ]
  }
};

// Authentication
const authenticationTech: Record<string, TechInfo> = {
  jwt: {
    name: "JWT Authentication",
    description: "JSON Web Tokens for secure authentication and authorization.",
    advantages: [
      "Stateless authentication",
      "Cross-domain capabilities",
      "Compact and self-contained",
      "Easy to implement"
    ]
  },
  oauth: {
    name: "OAuth 2.0",
    description: "Industry-standard protocol for authorization that allows secure designated access.",
    advantages: [
      "Secure delegated access",
      "No password sharing",
      "Limited access scopes",
      "Time-limited tokens"
    ]
  },
  firebase: {
    name: "Firebase Auth",
    description: "Authentication service provided by Google Firebase platform.",
    advantages: [
      "Multiple authentication methods",
      "User session management",
      "Security rules integration",
      "Easy social login"
    ]
  },
  auth0: {
    name: "Auth0",
    description: "Secure, adaptable, and easy-to-implement authentication service.",
    advantages: [
      "Single sign-on",
      "Multiple auth methods",
      "User management",
      "Enterprise security features"
    ]
  }
};

// Hosting
const hostingTech: Record<string, TechInfo> = {
  vercel: {
    name: "Vercel",
    description: "Platform for frontend frameworks and static sites, built to integrate with your headless content, commerce, or database.",
    advantages: [
      "Optimized for frontend frameworks",
      "Serverless functions",
      "CDN by default",
      "Easy deployment with Git"
    ]
  },
  netlify: {
    name: "Netlify",
    description: "An all-in-one platform for automating modern web projects.",
    advantages: [
      "Continuous deployment",
      "Serverless functions",
      "Form handling",
      "Global CDN"
    ]
  },
  aws: {
    name: "AWS",
    description: "Comprehensive cloud computing platform with a wide range of services.",
    advantages: [
      "Broad set of services",
      "Global infrastructure",
      "High reliability",
      "Flexible pricing"
    ]
  },
  digitalocean: {
    name: "DigitalOcean",
    description: "Cloud infrastructure provider focused on simplicity and scalability.",
    advantages: [
      "Simple pricing",
      "Developer-friendly",
      "Quick deployment",
      "App Platform for easy hosting"
    ]
  }
};

// Complete tech data map
const techData: Record<TechCategory, Record<string, TechInfo>> = {
  frontend: frontendTech,
  styling: stylingTech,
  backend: backendTech,
  database: databaseTech,
  authentication: authenticationTech,
  hosting: hostingTech
};

// Get information about a specific technology
export function getTechInfo(techId: string | null, category: TechCategory): TechInfo {
  if (!techId) {
    return {
      name: "Not Selected",
      description: "No technology selected for this category.",
      advantages: []
    };
  }
  
  return techData[category][techId] || {
    name: techId,
    description: "Custom technology choice.",
    advantages: []
  };
}

export default techData;
