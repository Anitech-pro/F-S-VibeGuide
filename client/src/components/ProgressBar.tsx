import { useWizard, WizardStep } from "@/context/WizardContext";

interface StepIndicatorProps {
  step: number;
  label: string;
  status: "active" | "completed" | "inactive";
}

function StepIndicator({ step, label, status }: StepIndicatorProps) {
  const statusClasses = {
    active: "bg-purple-500 text-white",
    completed: "bg-purple-400 text-white",
    inactive: "bg-gray-700 text-gray-400"
  };
  
  const labelClasses = {
    active: "text-purple-400",
    completed: "text-purple-400",
    inactive: "text-gray-400"
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`step-indicator ${status} h-8 w-8 rounded-full flex items-center justify-center mb-1 text-sm font-medium ${statusClasses[status]}`}>
        {step}
      </div>
      <span className={`text-xs ${labelClasses[status]} font-medium`}>{label}</span>
    </div>
  );
}

function ProgressLine({ progress = 0 }: { progress?: number }) {
  return (
    <div className="h-0.5 flex-1 mx-2 bg-gray-700 relative">
      <div 
        className="absolute inset-0 bg-purple-400 transition-all duration-300" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}

export default function ProgressBar() {
  const { currentStep } = useWizard();
  
  // Calculate progress percentages
  const getProgress = (current: WizardStep) => {
    switch (current) {
      case "project-type":
        return [0, 0, 0];
      case "frontend":
        return [100, 0, 0];
      case "backend":
        return [100, 100, 0];
      case "infrastructure":
        return [100, 100, 100];
      case "summary":
        return [100, 100, 100];
      default:
        return [0, 0, 0];
    }
  };
  
  // Get status for each step
  const getStatus = (step: WizardStep, currentStep: WizardStep): "active" | "completed" | "inactive" => {
    const order: WizardStep[] = ["project-type", "frontend", "backend", "infrastructure", "summary"];
    const currentIndex = order.indexOf(currentStep);
    const stepIndex = order.indexOf(step);
    
    if (stepIndex === currentIndex) return "active";
    if (stepIndex < currentIndex) return "completed";
    return "inactive";
  };
  
  const progress = getProgress(currentStep);

  return (
    <div className="bg-gray-900 bg-opacity-50 px-6 py-4 border-b border-gray-700">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <StepIndicator 
          step={1} 
          label="Project Type" 
          status={getStatus("project-type", currentStep)} 
        />
        
        <ProgressLine progress={progress[0]} />
        
        <StepIndicator 
          step={2} 
          label="Frontend" 
          status={getStatus("frontend", currentStep)} 
        />
        
        <ProgressLine progress={progress[1]} />
        
        <StepIndicator 
          step={3} 
          label="Backend" 
          status={getStatus("backend", currentStep)} 
        />
        
        <ProgressLine progress={progress[2]} />
        
        <StepIndicator 
          step={4} 
          label="Infrastructure" 
          status={getStatus("infrastructure", currentStep)} 
        />
      </div>
    </div>
  );
}
