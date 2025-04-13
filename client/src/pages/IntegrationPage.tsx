
import { useWizard } from "@/context/WizardContext";
import ProgressBar from "@/components/ProgressBar";
import WizardNavigation from "@/components/WizardNavigation";
import { useEffect } from "react";

interface IntegrationOption {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
}

const integrationOptions: IntegrationOption[] = [
  {
    id: "github",
    name: "GitHub",
    description: "Connect your repository for version control and CI/CD",
    category: "Version Control",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
      </svg>
    )
  },
  {
    id: "api",
    name: "API Integration",
    description: "Set up external API connections and configurations",
    category: "APIs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-2" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.83-3.4 9.36-7 10.46-3.6-1.1-7-5.63-7-10.46v-4.7l7-3.12z"/>
      </svg>
    )
  }
];

function IntegrationCard({ option, isSelected, onSelect }: { 
  option: IntegrationOption;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div 
      className={`base-card ${isSelected ? 'border-purple-500' : 'border-gray-700'} bg-gray-800 bg-opacity-50 border rounded-xl p-6 cursor-pointer hover:border-purple-400 transition-colors`}
      onClick={onSelect}
    >
      <div className="flex items-center mb-4">
        {option.icon}
        <h3 className="text-lg font-medium text-white">{option.name}</h3>
      </div>
      <p className="text-gray-300 text-sm mb-2">{option.description}</p>
      <span className="text-xs text-purple-400">{option.category}</span>
    </div>
  );
}

export default function IntegrationPage() {
  const { projectConfig, updateProjectConfig, setCurrentStep } = useWizard();
  
  useEffect(() => {
    setCurrentStep("integration");
  }, [setCurrentStep]);

  const toggleIntegration = (integrationId: string) => {
    const currentIntegrations = projectConfig.integrations || [];
    const newIntegrations = currentIntegrations.includes(integrationId)
      ? currentIntegrations.filter(id => id !== integrationId)
      : [...currentIntegrations, integrationId];
    
    updateProjectConfig({ integrations: newIntegrations });
  };

  return (
    <>
      <ProgressBar />
      
      <div className="p-6 md:p-8">
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Integration Selection</h2>
            <span className="text-sm text-purple-400">Step 3 of 8</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrationOptions.map((option) => (
              <IntegrationCard
                key={option.id}
                option={option}
                isSelected={(projectConfig.integrations || []).includes(option.id)}
                onSelect={() => toggleIntegration(option.id)}
              />
            ))}
          </div>
        </div>
        
        <WizardNavigation nextLabel="Next: Build Configuration" />
      </div>
    </>
  );
}
