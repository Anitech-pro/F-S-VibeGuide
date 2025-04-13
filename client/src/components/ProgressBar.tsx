
import { useWizard, WizardStep } from "@/context/WizardContext";
import React from 'react';

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

  const steps: { step: WizardStep; label: string }[] = [
    { step: "project-type", label: "Project Registration" },
    { step: "frontend", label: "Stack Selection" },
    { step: "backend", label: "Integration" },
    { step: "infrastructure", label: "Build & Deploy" }
  ];

  const getCurrentStepIndex = () => {
    return steps.findIndex(s => s.step === currentStep);
  };

  const getStepStatus = (stepIndex: number): "active" | "completed" | "inactive" => {
    const currentIndex = getCurrentStepIndex();
    if (stepIndex === currentIndex) return "active";
    if (stepIndex < currentIndex) return "completed";
    return "inactive";
  };

  const getProgressPercentage = (lineIndex: number) => {
    const currentIndex = getCurrentStepIndex();
    if (lineIndex < currentIndex) return 100;
    if (lineIndex === currentIndex) return 50;
    return 0;
  };

  return (
    <div className="bg-gray-900 bg-opacity-50 px-6 py-4 border-b border-gray-700">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.step}>
            <StepIndicator
              step={index + 1}
              label={step.label}
              status={getStepStatus(index)}
            />
            {index < steps.length - 1 && (
              <ProgressLine 
                progress={getProgressPercentage(index)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
