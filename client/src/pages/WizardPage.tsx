import { useWizard } from "@/context/WizardContext";
import ProjectSetupForm from "@/components/ProjectSetupForm";
import AppTypeSelection from "@/components/AppTypeSelection";
import TechnologyDetails from "@/components/TechnologyDetails";
import WizardNavigation from "@/components/WizardNavigation";
import ProgressBar from "@/components/ProgressBar";
import { useEffect } from "react";

const webAppDetails = {
  title: "Web Applications",
  description: "Web applications run in browsers and can range from simple static sites to complex single-page applications. They're accessible across multiple devices without installation and are easier to update and maintain.",
  frameworks: [
    "React (Meta's UI library)",
    "Vue.js (Progressive framework)",
    "Angular (Google's full framework)",
    "Svelte (Compile-time framework)"
  ],
  useCases: [
    "Content-focused websites",
    "Admin dashboards and tools",
    "Social media platforms",
    "E-commerce solutions"
  ],
  learningPath: [
    "Learn HTML, CSS, and JavaScript fundamentals",
    "Choose a frontend framework (React recommended for beginners)",
    "Learn state management and routing concepts",
    "Study API integration and asynchronous programming",
    "Explore backend integration or serverless approaches"
  ]
};

const mobileAppDetails = {
  title: "Mobile Applications",
  description: "Mobile applications run natively on devices like smartphones and tablets. They can access device features and provide better performance compared to web apps on mobile.",
  frameworks: [
    "React Native (JavaScript/React)",
    "Flutter (Dart)",
    "Xamarin (C#)",
    "Kotlin (Android) / Swift (iOS)"
  ],
  useCases: [
    "Social networking apps",
    "Utility applications",
    "Games and entertainment",
    "Business and productivity tools"
  ],
  learningPath: [
    "Learn programming fundamentals (JavaScript for React Native or Dart for Flutter)",
    "Study mobile UI/UX principles",
    "Master components and navigation patterns",
    "Understand device APIs and permissions",
    "Learn app deployment and distribution processes"
  ]
};

const backendAppDetails = {
  title: "Backend APIs",
  description: "Backend APIs handle data processing, business logic, and database operations. They provide services that client applications can consume via standardized interfaces.",
  frameworks: [
    "Express (Node.js)",
    "Django (Python)",
    "Spring Boot (Java)",
    "Laravel (PHP)"
  ],
  useCases: [
    "RESTful APIs",
    "GraphQL services",
    "Microservices architecture",
    "Serverless functions"
  ],
  learningPath: [
    "Learn server-side programming language fundamentals",
    "Understand HTTP, REST principles, and API design",
    "Master database interactions and ORM concepts",
    "Implement authentication and authorization",
    "Learn about scaling, caching, and performance optimization"
  ]
};

const fullstackAppDetails = {
  title: "Full-Stack Applications",
  description: "Full-stack applications combine frontend interfaces with backend services in a cohesive solution. They provide end-to-end functionality from user interface to data storage.",
  frameworks: [
    "MERN Stack (MongoDB, Express, React, Node.js)",
    "MEAN Stack (MongoDB, Express, Angular, Node.js)",
    "Next.js (React with server-side rendering)",
    "Ruby on Rails (MVC framework)"
  ],
  useCases: [
    "SaaS platforms",
    "E-commerce websites",
    "Content management systems",
    "Enterprise applications"
  ],
  learningPath: [
    "Learn both frontend and backend fundamentals",
    "Understand client-server architecture",
    "Master data flow between frontend and backend",
    "Study database design and management",
    "Focus on security, deployment, and DevOps practices"
  ]
};

export default function WizardPage() {
  const { projectConfig, setCurrentStep } = useWizard();
  
  useEffect(() => {
    // Reset current step when this page loads
    setCurrentStep("project-type");
  }, [setCurrentStep]);
  
  // Determine which details to show based on selected app type
  const getDetailsComponent = () => {
    if (!projectConfig.appType) return null;
    
    switch (projectConfig.appType) {
      case "web":
        return <TechnologyDetails {...webAppDetails} />;
      case "mobile":
        return <TechnologyDetails {...mobileAppDetails} />;
      case "backend":
        return <TechnologyDetails {...backendAppDetails} />;
      case "fullstack":
        return <TechnologyDetails {...fullstackAppDetails} />;
      default:
        return null;
    }
  };

  return (
    <>
      <ProgressBar />
      <div className="p-6 md:p-8">
        <ProjectSetupForm />
        
        <div className="section-divider my-8 h-0.5 bg-gradient-to-r from-gray-800 via-purple-500 to-gray-800 opacity-50"></div>
        
        <AppTypeSelection />
        
        {getDetailsComponent()}
        
        <WizardNavigation nextLabel="Next: Frontend Selection" />
      </div>
    </>
  );
}
