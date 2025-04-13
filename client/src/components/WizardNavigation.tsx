import { useWizard } from "@/context/WizardContext";
import { useLocation } from "wouter";

interface WizardNavigationProps {
  showBack?: boolean;
  nextLabel?: string;
  onNext?: () => void;
}

export default function WizardNavigation({ 
  showBack = true, 
  nextLabel = "Next",
  onNext
}: WizardNavigationProps) {
  const { prevStep, nextStep, currentStep, projectConfig } = useWizard();
  const [, setLocation] = useLocation();
  
  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      nextStep();
      
      switch (currentStep) {
        case "project-type":
          setLocation("/frontend");
          break;
        case "frontend":
          setLocation("/backend");
          break;
        case "backend":
          setLocation("/infrastructure");
          break;
        case "infrastructure":
          setLocation("/summary");
          break;
        default:
          break;
      }
    }
  };
  
  const handleBack = () => {
    prevStep();
    
    switch (currentStep) {
      case "frontend":
        setLocation("/");
        break;
      case "backend":
        setLocation("/frontend");
        break;
      case "infrastructure":
        setLocation("/backend");
        break;
      case "summary":
        setLocation("/infrastructure");
        break;
      default:
        break;
    }
  };
  
  // Determine if next button should be disabled
  const isNextDisabled = () => {
    switch (currentStep) {
      case "project-type":
        return !projectConfig.name || !projectConfig.appType;
      case "frontend":
        // For frontend selection, we need at least a frontend framework if it's a web or fullstack app
        return (projectConfig.appType === "web" || projectConfig.appType === "fullstack") 
          && !projectConfig.frontend;
      case "backend":
        // For backend selection, we need at least a backend framework if it's a backend or fullstack app
        return (projectConfig.appType === "backend" || projectConfig.appType === "fullstack") 
          && !projectConfig.backend;
      default:
        return false;
    }
  };

  return (
    <div className="mt-8 flex justify-between">
      {showBack ? (
        <button 
          type="button" 
          onClick={handleBack}
          className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800"
        >
          <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back
        </button>
      ) : (
        <div></div> // Empty div to maintain flex spacing
      )}
      
      <button 
        type="button" 
        onClick={handleNext}
        disabled={isNextDisabled()}
        className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
          isNextDisabled() 
            ? "bg-gray-600 cursor-not-allowed" 
            : "bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800"
        }`}
      >
        {nextLabel}
        {nextLabel.toLowerCase().includes("next") && (
          <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        )}
      </button>
    </div>
  );
}
