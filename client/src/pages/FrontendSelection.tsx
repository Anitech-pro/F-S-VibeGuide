import { useWizard, FrontendFramework, StylingOption } from "@/context/WizardContext";
import ProgressBar from "@/components/ProgressBar";
import WizardNavigation from "@/components/WizardNavigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface TechOption {
  id: string;
  name: string;
  description: string;
  advantages: string[];
  icon: React.ReactNode;
}

function OptionCard({ 
  option, 
  isSelected, 
  onSelect 
}: { 
  option: TechOption; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  return (
    <div 
      className={`base-card option-card ${
        isSelected ? "selected-card" : ""
      } bg-gray-700 bg-opacity-30 border rounded-xl p-6 cursor-pointer transition-all duration-200`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="info-click-area">
          <div className="flex items-center mb-2">
            {option.icon}
            <span className="font-medium text-white">{option.name}</span>
          </div>
          <p className="text-sm text-gray-300 mb-4">{option.description}</p>
        </div>
        <div className="input-container">
          <div className={`h-5 w-5 rounded-full border-2 ${isSelected ? "border-purple-500 bg-purple-500 flex items-center justify-center" : "border-gray-600"}`}>
            {isSelected && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mt-4">
        {option.advantages.map((advantage, index) => (
          <div key={index} className="flex items-center text-sm text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{advantage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FrontendSelection() {
  const { projectConfig, updateProjectConfig, setCurrentStep } = useWizard();
  
  useEffect(() => {
    // Update current step when this page loads
    setCurrentStep("frontend");
  }, [setCurrentStep]);
  
  // Fetch tech stack options from the backend
  const { data: techStackData, isLoading } = useQuery({
    queryKey: ['/api/tech-stacks?category=frontend'],
  });
  
  // If the app type doesn't need frontend, skip this step
  const shouldSkipFrontend = projectConfig.appType === "backend";
  
  // Frontend framework options
  const frontendOptions: TechOption[] = [
    {
      id: "react",
      name: "React",
      description: "A JavaScript library for building user interfaces, focusing on component-based architecture.",
      advantages: [
        "Component-based architecture",
        "Virtual DOM for performance",
        "Large ecosystem and community",
        "Maintained by Meta (Facebook)"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 100-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578l.101.213-.101.213a23.307 23.307 0 00-1.363 3.578l-.133.467zM5.317 8.95c-2.674.751-4.315 1.9-4.315 3.046 0 1.145 1.641 2.294 4.315 3.046a24.95 24.95 0 011.182-3.046A24.752 24.752 0 015.317 8.95zm12.675 7.305l-.133-.469a23.357 23.357 0 00-1.364-3.577l-.101-.213.101-.213a23.42 23.42 0 001.364-3.578l.133-.468.473.119c3.517.889 5.535 2.398 5.535 4.14s-2.018 3.25-5.535 4.139l-.473.12zm-.491-4.259c.48 1.039.877 2.06 1.182 3.046 2.675-.752 4.315-1.901 4.315-3.046 0-1.146-1.641-2.294-4.315-3.046a24.788 24.788 0 01-1.182 3.046z" />
          <path fill="currentColor" d="M5.31 8.945l-.133-.467C4.188 4.992 4.488 2.494 6 1.622c1.483-.856 3.864.155 6.359 2.716l.34.349-.34.349a23.552 23.552 0 00-2.422 2.967l-.135.193-.235.02a23.657 23.657 0 00-3.785.61l-.472.119zm1.896-6.63c-.268 0-.505.058-.705.173-.994.573-1.17 2.565-.485 5.253a25.122 25.122 0 013.233-.501 24.847 24.847 0 012.052-2.544c-1.56-1.519-3.037-2.381-4.095-2.381zm9.589 20.362c-.001 0-.001 0 0 0-1.425 0-3.255-1.073-5.154-3.023l-.34-.349.34-.349a23.53 23.53 0 002.421-2.968l.135-.193.234-.02a23.63 23.63 0 003.787-.609l.472-.119.134.468c.987 3.484.688 5.983-.824 6.854a2.38 2.38 0 01-1.205.308zm-4.096-3.381c1.56 1.519 3.037 2.381 4.095 2.381h.001c.267 0 .505-.058.704-.173.994-.573 1.171-2.566.485-5.254a25.02 25.02 0 01-3.234.501 24.674 24.674 0 01-2.051 2.545z" />
        </svg>
      )
    },
    {
      id: "vue",
      name: "Vue.js",
      description: "Progressive JavaScript framework for building user interfaces with an incremental adoption path.",
      advantages: [
        "Easy learning curve",
        "Flexible integration options",
        "Detailed documentation",
        "Single-file components"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M24 1.61h-9.94L12 5.16 9.94 1.61H0l12 20.78zM12 14.08L5.16 2.23h4.43L12 6.41l2.41-4.18h4.43z" />
        </svg>
      )
    }
  ];
  
  // Styling options
  const stylingOptions: TechOption[] = [
    {
      id: "tailwind",
      name: "Tailwind CSS",
      description: "A utility-first CSS framework for rapidly building custom user interfaces.",
      advantages: [
        "Utility-first approach",
        "Highly customizable",
        "No naming conventions to worry about",
        "Optimized for production with PurgeCSS"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      )
    },
    {
      id: "css",
      name: "CSS / SCSS",
      description: "Traditional CSS with optional preprocessing for variables, nesting, and more.",
      advantages: [
        "Complete control over styling",
        "SCSS adds variables and nesting",
        "No framework dependencies",
        "Standard web technology"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z" />
        </svg>
      )
    }
  ];
  
  // Handle framework selection
  const handleFrameworkSelect = (framework: FrontendFramework) => {
    updateProjectConfig({ frontend: framework });
  };
  
  // Handle styling selection
  const handleStylingSelect = (styling: StylingOption) => {
    updateProjectConfig({ styling: styling });
  };

  return (
    <>
      <ProgressBar />
      
      <div className="p-6 md:p-8">
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Frontend Selection</h2>
            <span className="text-sm text-purple-400">Step 2 of 4</span>
          </div>
          
          {shouldSkipFrontend ? (
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <div className="flex items-center text-yellow-300 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Note</span>
              </div>
              <p className="text-gray-300">
                Since you selected a backend-only application, you can skip the frontend selection. Click Next to continue to the backend selection.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h3 className="section-header text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
                  Frontend Framework
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {frontendOptions.map((option) => (
                    <OptionCard 
                      key={option.id}
                      option={option}
                      isSelected={projectConfig.frontend === option.id as FrontendFramework}
                      onSelect={() => handleFrameworkSelect(option.id as FrontendFramework)}
                    />
                  ))}
                </div>
              </section>
              
              <section>
                <h3 className="section-header text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
                  Styling Solution
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stylingOptions.map((option) => (
                    <OptionCard 
                      key={option.id}
                      option={option}
                      isSelected={projectConfig.styling === option.id as StylingOption}
                      onSelect={() => handleStylingSelect(option.id as StylingOption)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
        
        <WizardNavigation nextLabel="Next: Backend Selection" />
      </div>
    </>
  );
}
