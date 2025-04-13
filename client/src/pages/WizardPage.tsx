import { ProjectSetupForm } from "@/components/ProjectSetupForm";
import ProgressBar from "@/components/ProgressBar";
import { useEffect } from "react";
import { useWizard } from "@/context/WizardContext";

export default function WizardPage() {
  const { setCurrentStep } = useWizard();

  useEffect(() => {
    setCurrentStep("project");
  }, [setCurrentStep]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <ProgressBar />

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">
              <span className="text-purple-400">Full-Stack</span>
              <span className="text-white"> Vibe Guide</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Your interactive guide to building awesome full-stack projects, step-by-step.
            </p>
          </div>

          <ProjectSetupForm />
        </div>
      </main>
    </div>
  );
}