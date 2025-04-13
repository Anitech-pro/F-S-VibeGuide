import { useState } from "react";
import { useWizard, AppType } from "@/context/WizardContext";

interface AppTypeCardProps {
  type: AppType;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  isSelected: boolean;
  onSelect: (type: AppType) => void;
}

function AppTypeCard({ 
  type, 
  title, 
  description, 
  icon, 
  features, 
  isSelected, 
  onSelect 
}: AppTypeCardProps) {
  return (
    <div 
      className={`${
        isSelected 
          ? "border-purple-500 border-2 bg-opacity-10 bg-purple-500" 
          : "border-gray-700 border hover:border-purple-400 hover:bg-opacity-50"
      } bg-gray-700 bg-opacity-30 rounded-xl p-6 cursor-pointer transition-all duration-200`}
      onClick={() => onSelect(type)}
    >
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center mb-3">
            {icon}
            <h3 className="text-lg font-semibold text-white">{title}</h3>
          </div>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
        <div className={`h-5 w-5 rounded-full border-2 ${isSelected ? "border-purple-500 bg-purple-500" : "border-gray-600"} flex-shrink-0 flex items-center justify-center`}>
          {isSelected && (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </div>
      
      <div className="mt-4 space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AppTypeSelection() {
  const { projectConfig, updateProjectConfig } = useWizard();
  
  const handleAppTypeSelect = (type: AppType) => {
    updateProjectConfig({ appType: type });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white">Choose Application Type</h2>
      <p className="text-gray-400 text-sm">Select the type of application you want to build. This will determine the available technology options in the next steps.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AppTypeCard
          type="web"
          title="Web Application"
          description="Browser-based applications like SPAs, websites, or progressive web apps"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          }
          features={[
            "Works on all modern browsers",
            "Easier to develop and deploy",
            "PWA capabilities for offline use"
          ]}
          isSelected={projectConfig.appType === "web"}
          onSelect={handleAppTypeSelect}
        />
        
        <AppTypeCard
          type="mobile"
          title="Mobile Application"
          description="Cross-platform mobile apps for Android and iOS devices"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 2a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2V4a2 2 0 00-2-2H7zm3 14a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          }
          features={[
            "Native device capabilities",
            "Offline functionality",
            "App store distribution"
          ]}
          isSelected={projectConfig.appType === "mobile"}
          onSelect={handleAppTypeSelect}
        />
        
        <AppTypeCard
          type="backend"
          title="Backend API"
          description="RESTful or GraphQL APIs for integration with any frontend"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
          }
          features={[
            "Scalable architecture",
            "Multi-client support",
            "Microservice ready"
          ]}
          isSelected={projectConfig.appType === "backend"}
          onSelect={handleAppTypeSelect}
        />
        
        <AppTypeCard
          type="fullstack"
          title="Full Stack App"
          description="Complete solution with integrated frontend and backend systems"
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
          }
          features={[
            "End-to-end development",
            "Complete solution architecture",
            "Unified development experience"
          ]}
          isSelected={projectConfig.appType === "fullstack"}
          onSelect={handleAppTypeSelect}
        />
      </div>
    </div>
  );
}
