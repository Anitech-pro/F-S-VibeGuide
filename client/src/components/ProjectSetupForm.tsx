
import { useState } from "react";
import { useWizard } from "@/context/WizardContext";
import { useLocation } from "wouter";

export function ProjectSetupForm() {
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const { updateProjectConfig } = useWizard();
  const [, setLocation] = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjectConfig({ 
      name: projectName,
      description: description 
    });
    setLocation("/frontend");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Enter Your Project Name"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Briefly describe your project..."
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[120px]"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
      >
        Start Building →
      </button>
    </form>
  );
}
