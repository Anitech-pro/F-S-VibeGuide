import { createContext, useContext, useState, ReactNode } from "react";

export type AppType = "web" | "mobile" | "backend" | "fullstack";
export type FrontendFramework = "react" | "vue" | "angular" | "svelte" | null;
export type StylingOption = "tailwind" | "css" | "scss" | "styled-components" | null;
export type BackendFramework = "express" | "django" | "rails" | "laravel" | null;
export type Database = "mongodb" | "postgresql" | "mysql" | "firebase" | null;
export type Authentication = "jwt" | "oauth" | "firebase" | "auth0" | null;
export type Hosting = "vercel" | "netlify" | "aws" | "digitalocean" | null;

export interface ProjectConfig {
  name: string;
  description: string;
  appType: AppType | null;
  frontend: FrontendFramework;
  styling: StylingOption;
  backend: BackendFramework;
  database: Database;
  authentication: Authentication;
  hosting: Hosting;
}

export type WizardStep = "project-type" | "frontend" | "backend" | "integration" | "infrastructure" | "summary";

interface WizardContextType {
  currentStep: WizardStep;
  setCurrentStep: (step: WizardStep) => void;
  projectConfig: ProjectConfig;
  updateProjectConfig: (updates: Partial<ProjectConfig>) => void;
  resetWizard: () => void;
  nextStep: () => void;
  prevStep: () => void;
}

const defaultProjectConfig: ProjectConfig = {
  name: "",
  description: "",
  appType: null,
  frontend: null,
  styling: null,
  backend: null,
  database: null,
  authentication: null,
  hosting: null
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

interface WizardProviderProps {
  children: ReactNode;
}

export function WizardProvider({ children }: WizardProviderProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>("project-type");
  const [projectConfig, setProjectConfig] = useState<ProjectConfig>(defaultProjectConfig);

  const updateProjectConfig = (updates: Partial<ProjectConfig>) => {
    setProjectConfig((prev) => ({
      ...prev,
      ...updates
    }));
  };

  const resetWizard = () => {
    setCurrentStep("project-type");
    setProjectConfig(defaultProjectConfig);
  };

  const stepOrder: WizardStep[] = ["project-type", "frontend", "backend", "integration", "infrastructure", "summary"];

  const nextStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const prevStep = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        projectConfig,
        updateProjectConfig,
        resetWizard,
        nextStep,
        prevStep
      }}
    >
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}