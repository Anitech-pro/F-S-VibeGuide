import { useWizard } from "@/context/WizardContext";

export default function ProjectSetupForm() {
  const { projectConfig, updateProjectConfig } = useWizard();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectConfig({ name: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectConfig({ description: e.target.value });
  };

  return (
    <div className="space-y-6 mb-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Project Basics</h2>
        <span className="text-sm text-purple-400">Step 1 of 4</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-gray-300 mb-1">
            Project Name
          </label>
          <input 
            type="text" 
            id="project-name" 
            name="project-name" 
            placeholder="My Awesome App" 
            value={projectConfig.name}
            onChange={handleNameChange}
            className="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent" 
          />
        </div>
        
        <div>
          <label htmlFor="project-description" className="block text-sm font-medium text-gray-300 mb-1">
            Short Description
          </label>
          <input 
            type="text" 
            id="project-description" 
            name="project-description" 
            placeholder="A web app that helps developers..." 
            value={projectConfig.description}
            onChange={handleDescriptionChange}
            className="w-full bg-gray-900 bg-opacity-50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-purple-400 focus:border-transparent" 
          />
        </div>
      </div>
    </div>
  );
}
