import { ReactNode } from 'react';

export interface TechInfo {
  id: string;
  name: string;
  description: string;
  icon: ReactNode;
  advantages: string[];
  limitations: string[];
  useCases: string[];
  tutorialLinks: {
    title: string;
    url: string;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
  }[];
  promptSuggestions: {
    title: string;
    prompt: string;
  }[];
  isRecommendedFor?: string[];
  recommendationReason?: string;
}

export interface TechCategory {
  id: string;
  name: string;
  description: string;
  options: TechInfo[];
}

// Import this function to get tech data based on the user's previous selections
export function getContextAwareTechData(
  category: string,
  previousSelections: Record<string, string>
): TechCategory {
  // Start with the full list of options for the category
  const allOptions = techCategories.find(cat => cat.id === category);
  
  if (!allOptions) {
    throw new Error(`Category ${category} not found`);
  }
  
  // Clone the category to avoid modifying the original
  const result: TechCategory = { ...allOptions, options: [...allOptions.options] };
  
  // Apply filters based on previous selections
  if (category === 'frontend' && previousSelections.appType) {
    // Only show relevant frontend frameworks based on app type
    if (previousSelections.appType === 'mobile') {
      result.options = result.options.filter(option => 
        ['react-native', 'flutter', 'ionic'].includes(option.id)
      );
    }
  }
  
  // Set recommended flags based on context
  result.options = result.options.map(option => ({
    ...option,
    isRecommendedFor: getRecommendationsBasedOnContext(option.id, previousSelections)
  }));
  
  return result;
}

// Helper function to determine recommendations based on context
function getRecommendationsBasedOnContext(
  techId: string, 
  context: Record<string, string>
): string[] {
  const recommendations: string[] = [];
  
  // Web app recommendations
  if (context.appType === 'web') {
    if (['react', 'next'].includes(techId)) {
      recommendations.push('web');
    }
    if (['tailwind'].includes(techId)) {
      recommendations.push('modern');
    }
  }
  
  // Mobile recommendations
  if (context.appType === 'mobile') {
    if (['react-native', 'flutter'].includes(techId)) {
      recommendations.push('crossplatform');
    }
    if (['kotlin'].includes(techId)) {
      recommendations.push('android');
    }
    if (['swift'].includes(techId)) {
      recommendations.push('ios');
    }
  }
  
  // Backend recommendations
  if (context.frontend === 'react') {
    if (['node', 'express'].includes(techId)) {
      recommendations.push('javascript-ecosystem');
    }
  }
  
  return recommendations;
}

// Main tech categories with detailed information
export const techCategories: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Frameworks',
    description: 'Choose the main technology for building your user interface',
    options: [
      {
        id: 'react',
        name: 'React',
        description: 'A JavaScript library for building user interfaces with a component-based architecture',
        icon: null, // Icons are added in the UI components
        advantages: [
          'Component-based architecture for reusable UI elements',
          'Virtual DOM provides excellent performance',
          'Large ecosystem with many libraries and tools',
          'Strong community support and regular updates',
          'Used by many large companies (Facebook, Instagram, etc.)'
        ],
        limitations: [
          'Requires additional libraries for routing, state management, etc.',
          'JSX syntax has a learning curve for beginners',
          'Many ways to do the same thing can be overwhelming',
          'Can be overkill for simple websites or applications'
        ],
        useCases: [
          'Single-page applications (SPAs)',
          'Interactive dashboards and data visualization',
          'Complex web applications with rich user interfaces',
          'Progressive web apps (PWAs)',
          'Content-focused websites with dynamic elements'
        ],
        tutorialLinks: [
          {
            title: 'Official React Tutorial - Tic-Tac-Toe Game',
            url: 'https://react.dev/learn/tutorial-tic-tac-toe',
            difficulty: 'beginner'
          },
          {
            title: 'React Crash Course (Traversy Media)',
            url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8',
            difficulty: 'beginner'
          },
          {
            title: 'Full Modern React Tutorial (Net Ninja)',
            url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d',
            difficulty: 'beginner'
          }
        ],
        promptSuggestions: [
          {
            title: 'React Component Structure',
            prompt: "I'm building a React application that needs to display a list of items with filter functionality. Can you show me how to structure the components with proper state management and how to implement the filtering logic?"
          },
          {
            title: 'React Hooks Usage',
            prompt: 'Explain how to use React hooks (useState, useEffect, useContext, useMemo, useCallback) with practical examples for each. When should I use each one, and what are common mistakes to avoid?'
          }
        ]
      },
      {
        id: 'vue',
        name: 'Vue.js',
        description: 'Progressive JavaScript framework for building UIs with an incremental adoption path',
        icon: null,
        advantages: [
          'Gentle learning curve for beginners',
          'Flexible integration options',
          'Comprehensive and well-organized documentation',
          'Single-file components for easy organization',
          'Built-in features like routing and state management'
        ],
        limitations: [
          'Smaller ecosystem compared to React or Angular',
          'Fewer job opportunities than React',
          'Some plugins and libraries may lack maintenance',
          'Can face integration issues with certain third-party tools'
        ],
        useCases: [
          'Progressive enhancement of existing websites',
          'Single-page applications of all sizes',
          'Prototyping and MVPs that need quick development',
          'Interactive web interfaces with smooth transitions',
          'Applications that need to start small and scale up gradually'
        ],
        tutorialLinks: [
          {
            title: 'Vue.js Official Documentation',
            url: 'https://vuejs.org/guide/introduction.html',
            difficulty: 'beginner'
          },
          {
            title: 'Vue.js Crash Course (Traversy Media)',
            url: 'https://www.youtube.com/watch?v=qZXt1Aom3Cs',
            difficulty: 'beginner'
          },
          {
            title: 'Vue Mastery - Free Courses',
            url: 'https://www.vuemastery.com/courses/intro-to-vue-3/intro-to-vue3/',
            difficulty: 'beginner'
          }
        ],
        promptSuggestions: [
          {
            title: 'Vue Component Structure',
            prompt: 'I'm new to Vue.js and need to create a form with validation. Can you show me how to create a Vue component for a registration form with name, email, and password fields that validates the input before submitting?'
          },
          {
            title: 'Vue State Management',
            prompt: 'I'm building a medium-sized Vue application. Can you explain when I should use Vue's built-in reactivity system versus Pinia or Vuex for state management? Please provide examples of each approach.'
          }
        ]
      },
      {
        id: 'angular',
        name: 'Angular',
        description: 'Comprehensive TypeScript-based framework with a complete solution for large applications',
        icon: null,
        advantages: [
          'Complete solution with built-in tools and features',
          'Strong typing with TypeScript integration',
          'Dependency injection for better testability',
          'Comprehensive CLI for project scaffolding and management',
          'Good for large enterprise applications'
        ],
        limitations: [
          'Steeper learning curve than React or Vue',
          'More verbose code and boilerplate',
          'Can be overkill for smaller applications',
          'Slower development cycles due to stronger structure',
          'Version updates can be challenging to migrate'
        ],
        useCases: [
          'Large-scale enterprise applications',
          'Applications needing strong typing and structure',
          'Projects with multiple developers and teams',
          'Complex business applications with many features',
          'Applications requiring long-term maintenance'
        ],
        tutorialLinks: [
          {
            title: 'Angular Official Tutorial - Tour of Heroes',
            url: 'https://angular.io/tutorial',
            difficulty: 'intermediate'
          },
          {
            title: 'Angular Crash Course (Traversy Media)',
            url: 'https://www.youtube.com/watch?v=3dHNOWTI7H8',
            difficulty: 'intermediate'
          },
          {
            title: 'Angular University - Free Lessons',
            url: 'https://blog.angular-university.io/',
            difficulty: 'intermediate'
          }
        ],
        promptSuggestions: [
          {
            title: 'Angular Architecture',
            prompt: 'I'm designing an Angular application for a company's internal dashboard. Can you explain the best practices for structuring Angular modules, components, and services? How should I organize feature modules and shared modules?'
          },
          {
            title: 'Angular Performance',
            prompt: 'My Angular application is becoming slow as it grows. Can you provide strategies for improving performance, including change detection optimization, lazy loading, and OnPush strategy? Include code examples.'
          }
        ]
      },
      {
        id: 'react-native',
        name: 'React Native',
        description: 'Build native mobile applications for iOS and Android using React and JavaScript',
        icon: null,
        advantages: [
          'Code reuse across iOS and Android platforms',
          'Familiar React component model',
          'Access to native APIs and components',
          'Hot reloading for faster development',
          'Large community and extensive libraries'
        ],
        limitations: [
          'Performance can lag behind fully native apps for complex animations',
          'Native modules may require platform-specific code',
          'Upgrades between versions can be challenging',
          'Debugging can be more complex than web development',
          'Some platform-specific features still require native code'
        ],
        useCases: [
          'Cross-platform mobile apps with shared codebase',
          'Startups needing to launch on multiple platforms quickly',
          'MVPs and prototypes for mobile applications',
          'Mobile apps with moderate complexity and customization',
          'Teams with existing React web development experience'
        ],
        tutorialLinks: [
          {
            title: 'React Native - Getting Started',
            url: 'https://reactnative.dev/docs/getting-started',
            difficulty: 'intermediate'
          },
          {
            title: 'React Native Crash Course (Traversy Media)',
            url: 'https://www.youtube.com/watch?v=Hf4MJH0jDb4',
            difficulty: 'intermediate'
          },
          {
            title: 'CS50 Mobile App Development with React Native',
            url: 'https://www.youtube.com/playlist?list=PLhQjrBD2T382gdfveyad09Ierl_3Jh_wR',
            difficulty: 'intermediate'
          }
        ],
        promptSuggestions: [
          {
            title: 'React Native Navigation',
            prompt: 'I'm building a React Native app with multiple screens. Can you explain the different navigation options (Stack, Tab, Drawer) using React Navigation v6, and show examples of implementing nested navigation with authentication flows?'
          },
          {
            title: 'React Native UI Components',
            prompt: 'What are the best practices for creating reusable UI components in React Native? Can you provide examples of building a custom button component, a card component, and a form input with styling that works well on both iOS and Android?'
          }
        ]
      },
      {
        id: 'flutter',
        name: 'Flutter',
        description: 'Google's UI toolkit for building natively compiled applications from a single codebase',
        icon: null,
        advantages: [
          'Single codebase for mobile, web, and desktop',
          'High performance with compiled native code',
          'Rich set of pre-designed widgets',
          'Hot reload for fast development cycles',
          'Beautiful out-of-the-box UI components'
        ],
        limitations: [
          'Dart language has a learning curve',
          'Larger app sizes compared to native',
          'Newer ecosystem compared to React Native',
          'Some platform-specific features require plugins',
          'Integration with existing native code can be challenging'
        ],
        useCases: [
          'Cross-platform applications with pixel-perfect UI',
          'Apps requiring smooth animations and transitions',
          'MVPs that need a polished look quickly',
          'Applications targeting multiple platforms',
          'Projects where UI consistency is critical'
        ],
        tutorialLinks: [
          {
            title: 'Flutter - Get Started',
            url: 'https://flutter.dev/docs/get-started/install',
            difficulty: 'intermediate'
          },
          {
            title: 'Flutter Crash Course (Traversy Media)',
            url: 'https://www.youtube.com/watch?v=1gDhl4leEzA',
            difficulty: 'intermediate'
          },
          {
            title: 'Flutter Codelabs',
            url: 'https://flutter.dev/docs/codelabs',
            difficulty: 'beginner'
          }
        ],
        promptSuggestions: [
          {
            title: 'Flutter State Management',
            prompt: 'I'm building a Flutter app and need advice on state management. Can you compare Provider, Riverpod, Bloc, and GetX approaches with examples of when to use each one? Include a simple todo app example with each approach.'
          },
          {
            title: 'Flutter UI Design',
            prompt: 'I need to create a custom UI design in Flutter. Can you show me how to implement a curved bottom navigation bar, custom sliders, and animated page transitions? Include code examples and explain the widget tree structure.'
          }
        ]
      }
    ]
  },
  {
    id: 'styling',
    name: 'Styling Solutions',
    description: 'Choose how you want to style your application',
    options: [
      {
        id: 'tailwind',
        name: 'Tailwind CSS',
        description: 'A utility-first CSS framework for rapidly building custom user interfaces',
        icon: null,
        advantages: [
          'Utility-first approach speeds up development',
          'Highly customizable design system',
          'No need to create and name CSS classes',
          'Responsive design utilities built-in',
          'Small production bundles with PurgeCSS'
        ],
        limitations: [
          'HTML can become cluttered with many utility classes',
          'Initial learning curve for utility approach',
          'Requires build step for optimal performance',
          'May require extra work for complex custom designs',
          'Can be difficult to maintain without component abstraction'
        ],
        useCases: [
          'Rapid prototyping and MVPs',
          'Projects needing consistent design systems',
          'Teams wanting to avoid CSS conflicts',
          'Responsive web applications',
          'Projects with designers who code'
        ],
        tutorialLinks: [
          {
            title: 'Tailwind CSS - Get Started',
            url: 'https://tailwindcss.com/docs/installation',
            difficulty: 'beginner'
          },
          {
            title: 'Tailwind CSS Crash Course (Traversy Media)',
            url: 'https://www.youtube.com/watch?v=UBOj6rqRUME',
            difficulty: 'beginner'
          },
          {
            title: 'Learn Tailwind CSS - Full Course (Scrimba)',
            url: 'https://scrimba.com/learn/tailwind',
            difficulty: 'beginner'
          }
        ],
        promptSuggestions: [
          {
            title: 'Tailwind Component Design',
            prompt: 'I need to create a responsive card component with Tailwind CSS that includes an image, title, description, and action buttons. It should look good on mobile, tablet, and desktop. Can you provide the HTML with Tailwind classes?'
          },
          {
            title: 'Tailwind Theme Customization',
            prompt: 'How can I customize the Tailwind theme to match my brand colors, fonts, and spacing? Show me how to set up a tailwind.config.js file with custom colors, typography, and breakpoints that I can use throughout my project.'
          }
        ]
      },
      {
        id: 'css',
        name: 'CSS / SCSS',
        description: 'Traditional CSS with optional preprocessing for variables, nesting, and more',
        icon: null,
        advantages: [
          'Full control over styling',
          'SCSS adds variables, mixins, and nesting',
          'No dependencies on framework-specific patterns',
          'Widely understood by all web developers',
          'Natural CSS cascade for inheritance'
        ],
        limitations: [
          'Requires careful organization to avoid specificity issues',
          'Can lead to CSS bloat without discipline',
          'Manual work for responsive designs',
          'Potential for naming conflicts in larger projects',
          'No built-in design system like utility frameworks'
        ],
        useCases: [
          'Projects requiring highly custom designs',
          'Teams with strong CSS expertise',
          'When full control over styling is needed',
          'Smaller projects with less complexity',
          'Integration with existing CSS codebases'
        ],
        tutorialLinks: [
          {
            title: 'CSS Crash Course For Absolute Beginners',
            url: 'https://www.youtube.com/watch?v=yfoY53QXEnI',
            difficulty: 'beginner'
          },
          {
            title: 'SCSS Crash Course',
            url: 'https://www.youtube.com/watch?v=roywYSEPSvc',
            difficulty: 'beginner'
          },
          {
            title: 'CSS-Tricks - A Complete Guide to Flexbox',
            url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/',
            difficulty: 'beginner'
          }
        ],
        promptSuggestions: [
          {
            title: 'CSS Architecture',
            prompt: 'I'm building a large website and need help organizing my CSS. Can you explain BEM, SMACSS, and ITCSS methodologies with examples of each? Which would you recommend for my project and why?'
          },
          {
            title: 'Advanced SCSS Techniques',
            prompt: 'Show me how to create an SCSS architecture with variables, mixins, and functions for a complete design system. Include examples for responsive breakpoints, color themes, typography scaling, and component styling.'
          }
        ]
      },
      {
        id: 'styled-components',
        name: 'Styled Components',
        description: 'CSS-in-JS library that allows you to write actual CSS in your JavaScript',
        icon: null,
        advantages: [
          'Component-scoped styling prevents conflicts',
          'Dynamic styling based on props',
          'No class name bugs or conflicts',
          'Automatic vendor prefixing',
          'Seamless integration with React components'
        ],
        limitations: [
          'Adds runtime overhead for style generation',
          'Learning curve for CSS-in-JS approach',
          'Devtools integration not as good as plain CSS',
          'Bundle size increase from the library',
          'Harder to share styles across different frameworks'
        ],
        useCases: [
          'React applications needing component-based styling',
          'Projects requiring dynamic, prop-based styling',
          'Teams wanting to avoid CSS naming conflicts',
          'Applications with theme switching features',
          'When tight coupling between component and styles is desired'
        ],
        tutorialLinks: [
          {
            title: 'Styled Components Crash Course',
            url: 'https://www.youtube.com/watch?v=02zO0hZmwnw',
            difficulty: 'intermediate'
          },
          {
            title: 'Official Styled Components Docs',
            url: 'https://styled-components.com/docs',
            difficulty: 'intermediate'
          },
          {
            title: 'Mastering Styled Components',
            url: 'https://egghead.io/courses/build-a-modern-user-interface-with-chakra-ui-fac68106',
            difficulty: 'intermediate'
          }
        ],
        promptSuggestions: [
          {
            title: 'Styled Components Theme',
            prompt: 'I need to create a themeable UI component library with styled-components. Show me how to set up a theme provider with dark/light mode, and how to create button, card, and form components that respond to the theme.'
          },
          {
            title: 'Styled Components Best Practices',
            prompt: 'What are the best practices for using styled-components in a large React application? How should I organize my components, handle global styles, and optimize performance? Include examples of common patterns and anti-patterns.'
          }
        ]
      }
    ]
  }
  // Additional categories would be defined here
];