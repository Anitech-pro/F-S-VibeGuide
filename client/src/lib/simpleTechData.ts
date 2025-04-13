import { ReactNode } from 'react';

export interface TechInfo {
  id: string;
  name: string;
  description: string;
  icon?: ReactNode;
  advantages: string[];
  limitations: string[];
  useCases: string[];
  isRecommended?: boolean;
}

export const frontendOptions: TechInfo[] = [
  {
    id: 'react',
    name: 'React',
    description: 'A JavaScript library for building user interfaces, focusing on component-based architecture.',
    advantages: [
      'Component-based architecture',
      'Virtual DOM for performance',
      'Large ecosystem and community',
      'Maintained by Meta (Facebook)'
    ],
    limitations: [
      'Requires additional libraries for routing, state management',
      'JSX syntax has a learning curve for beginners',
      'Many ways to do the same thing can be overwhelming',
      'Can be overkill for simple websites'
    ],
    useCases: [
      'Single-page applications (SPAs)',
      'Interactive dashboards',
      'Complex web applications',
      'Progressive web apps (PWAs)'
    ],
    isRecommended: true
  },
  {
    id: 'vue',
    name: 'Vue.js',
    description: 'Progressive JavaScript framework for building UIs with an incremental adoption path.',
    advantages: [
      'Easy learning curve',
      'Flexible integration options',
      'Detailed documentation',
      'Single-file components'
    ],
    limitations: [
      'Smaller ecosystem compared to React',
      'Fewer job opportunities than React',
      'Some plugins may lack maintenance',
      'Integration issues with certain tools'
    ],
    useCases: [
      'Progressive enhancement of existing sites',
      'Single-page applications',
      'Prototyping and MVPs',
      'Interactive web interfaces'
    ]
  },
  {
    id: 'angular',
    name: 'Angular',
    description: 'Complete TypeScript-based MVC framework with comprehensive tooling.',
    advantages: [
      'Complete solution with built-in tools',
      'Strong typing with TypeScript',
      'Dependency injection for testing',
      'Good for large enterprise apps'
    ],
    limitations: [
      'Steeper learning curve',
      'More verbose code and boilerplate',
      'Slower development cycles',
      'Version updates can be challenging'
    ],
    useCases: [
      'Large-scale enterprise applications',
      'Applications needing strong typing',
      'Projects with multiple teams',
      'Long-term maintained applications'
    ]
  }
];

export const stylingOptions: TechInfo[] = [
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework for rapidly building custom user interfaces.',
    advantages: [
      'Utility-first approach',
      'Highly customizable',
      'No naming conventions to worry about',
      'Optimized for production with PurgeCSS'
    ],
    limitations: [
      'HTML can become cluttered with classes',
      'Learning curve for utility approach',
      'Requires build step for optimal performance',
      'More difficult for complex designs'
    ],
    useCases: [
      'Rapid prototyping and MVPs',
      'Projects needing consistent design',
      'Teams wanting to avoid CSS conflicts',
      'Responsive web applications'
    ],
    isRecommended: true
  },
  {
    id: 'css',
    name: 'CSS / SCSS',
    description: 'Traditional CSS with optional preprocessing for variables, nesting, and more.',
    advantages: [
      'Complete control over styling',
      'SCSS adds variables and nesting',
      'No framework dependencies',
      'Standard web technology'
    ],
    limitations: [
      'Requires careful organization',
      'Can lead to CSS bloat without discipline',
      'Manual work for responsive designs',
      'Potential for naming conflicts'
    ],
    useCases: [
      'Projects requiring custom designs',
      'Teams with strong CSS expertise',
      'When full control is needed',
      'Smaller projects with less complexity'
    ]
  },
  {
    id: 'styled-components',
    name: 'Styled Components',
    description: 'CSS-in-JS library that lets you write actual CSS in your JavaScript components.',
    advantages: [
      'Component-scoped styling',
      'Dynamic styling based on props',
      'No class name conflicts',
      'Seamless integration with React'
    ],
    limitations: [
      'Runtime overhead for style generation',
      'Learning curve for CSS-in-JS approach',
      'Limited devtools integration',
      'Bundle size increase'
    ],
    useCases: [
      'React applications',
      'Projects requiring dynamic styling',
      'Teams avoiding CSS naming conflicts',
      'Applications with theme switching'
    ]
  }
];

export const backendOptions: TechInfo[] = [
  {
    id: 'express',
    name: 'Express.js',
    description: 'Fast, unopinionated, minimalist web framework for Node.js',
    advantages: [
      'Lightweight and flexible',
      'Large ecosystem of middleware',
      'Easy to learn and use',
      'JavaScript throughout stack'
    ],
    limitations: [
      'Less structured than full frameworks',
      'Requires more manual configuration',
      'Middleware-heavy apps can be complex',
      'Performance not as good as compiled languages'
    ],
    useCases: [
      'RESTful APIs',
      'Microservices',
      'Real-time applications with WebSockets',
      'Server-side rendering for JavaScript apps'
    ],
    isRecommended: true
  }
];

export function getRecommendationReason(id: string, category: string): string {
  const reasons: Record<string, string> = {
    'react': "React is recommended for web applications due to its large ecosystem, extensive documentation, and strong community support. It's widely used in South Africa and has excellent learning resources.",
    'tailwind': "Tailwind CSS is recommended for its utility-first approach that speeds up development and ensures consistency. It's especially useful for developers who aren't design experts but want professional-looking UIs.",
    'express': "Express.js is recommended as it pairs well with React frontend and provides a lightweight, flexible backend. JavaScript throughout the stack reduces context switching and makes it easier for frontend developers to contribute to backend code."
  };

  return reasons[id] || "";
}