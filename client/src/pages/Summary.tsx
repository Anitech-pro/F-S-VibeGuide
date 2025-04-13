import { useWizard } from "@/context/WizardContext";
import ProgressBar from "@/components/ProgressBar";
import WizardNavigation from "@/components/WizardNavigation";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { getTechInfo } from "@/lib/techData";
import { Loader2 } from "lucide-react";

interface CommandItem {
  command: string;
  explanation: string;
}

export default function Summary() {
  const { projectConfig, setCurrentStep } = useWizard();
  const [commands, setCommands] = useState<CommandItem[]>([]);
  
  // Generate commands based on selected technologies
  const generateCommandsMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/generate-commands", {
        frontend: projectConfig.frontend,
        backend: projectConfig.backend,
        database: projectConfig.database
      });
      return response.json();
    },
    onSuccess: (data) => {
      setCommands(data.commands || []);
    }
  });
  
  useEffect(() => {
    // Update current step when this page loads
    setCurrentStep("summary");
    
    // Generate commands
    generateCommandsMutation.mutate();
  }, [setCurrentStep, generateCommandsMutation]);
  
  const getProjectTypeText = () => {
    switch (projectConfig.appType) {
      case "web":
        return "Web Application";
      case "mobile":
        return "Mobile Application";
      case "backend":
        return "Backend API";
      case "fullstack":
        return "Full Stack Application";
      default:
        return "Application";
    }
  };
  
  const handleStartOver = () => {
    window.location.href = "/";
  };
  
  return (
    <>
      <ProgressBar />
      
      <div className="p-6 md:p-8">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Project Summary</h2>
            <div className="text-sm text-purple-400 px-3 py-1 bg-purple-900 bg-opacity-25 rounded-full">Complete</div>
          </div>
          
          {/* Project Overview Card */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Project Overview</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-gray-400 text-sm mb-1">Project Name</div>
                <div className="text-white font-medium">{projectConfig.name || "Unnamed Project"}</div>
              </div>
              
              <div>
                <div className="text-gray-400 text-sm mb-1">Project Type</div>
                <div className="text-white font-medium">{getProjectTypeText()}</div>
              </div>
              
              <div className="md:col-span-2">
                <div className="text-gray-400 text-sm mb-1">Description</div>
                <div className="text-white">{projectConfig.description || "No description provided."}</div>
              </div>
            </div>
          </div>
          
          {/* Technology Stack Card */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Technology Stack</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Frontend */}
              <div className="space-y-3">
                <h4 className="text-purple-400 font-medium border-b border-gray-700 pb-2">Frontend</h4>
                
                {projectConfig.frontend ? (
                  <div className="p-3 bg-gray-900 bg-opacity-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-900 bg-opacity-25 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 10h-4V4h4m0 0l-4 4m4-4v12a2 2 0 01-2 2H8a2 2 0 01-2-2V4c0-1.1.9-2 2-2h4l6 6z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{getTechInfo(projectConfig.frontend, "frontend").name}</div>
                        <div className="text-xs text-gray-400">Framework</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">No frontend framework selected</div>
                )}
                
                {projectConfig.styling && (
                  <div className="p-3 bg-gray-900 bg-opacity-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-900 bg-opacity-25 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M12 16v-4"></path>
                          <path d="M12 8h.01"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{getTechInfo(projectConfig.styling, "styling").name}</div>
                        <div className="text-xs text-gray-400">Styling</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Backend */}
              <div className="space-y-3">
                <h4 className="text-purple-400 font-medium border-b border-gray-700 pb-2">Backend</h4>
                
                {projectConfig.backend ? (
                  <div className="p-3 bg-gray-900 bg-opacity-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-900 bg-opacity-25 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
                          <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
                          <line x1="6" y1="6" x2="6.01" y2="6"></line>
                          <line x1="6" y1="18" x2="6.01" y2="18"></line>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{getTechInfo(projectConfig.backend, "backend").name}</div>
                        <div className="text-xs text-gray-400">Framework</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">No backend framework selected</div>
                )}
                
                {projectConfig.database && (
                  <div className="p-3 bg-gray-900 bg-opacity-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-900 bg-opacity-25 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                          <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{getTechInfo(projectConfig.database, "database").name}</div>
                        <div className="text-xs text-gray-400">Database</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Infrastructure */}
              <div className="space-y-3">
                <h4 className="text-purple-400 font-medium border-b border-gray-700 pb-2">Infrastructure</h4>
                
                {projectConfig.authentication ? (
                  <div className="p-3 bg-gray-900 bg-opacity-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-900 bg-opacity-25 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0110 0v4"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{getTechInfo(projectConfig.authentication, "authentication").name}</div>
                        <div className="text-xs text-gray-400">Authentication</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-sm text-gray-400">No authentication selected</div>
                )}
                
                {projectConfig.hosting && (
                  <div className="p-3 bg-gray-900 bg-opacity-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="bg-purple-900 bg-opacity-25 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                        <svg className="h-5 w-5 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 12H2"></path>
                          <path d="M5 12v-4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4"></path>
                          <path d="M5 12v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-white">{getTechInfo(projectConfig.hosting, "hosting").name}</div>
                        <div className="text-xs text-gray-400">Hosting</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Setup Commands Card */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Setup Commands</h3>
            
            {generateCommandsMutation.isPending ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 text-purple-500 animate-spin" />
                <span className="ml-3 text-gray-400">Generating commands...</span>
              </div>
            ) : commands.length > 0 ? (
              <div className="space-y-4">
                <p className="text-gray-300 text-sm">
                  These commands will help you get started with your project. Copy and run them in your terminal.
                </p>
                
                {commands.map((item, index) => (
                  <div key={index} className="bg-gray-900 bg-opacity-50 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                      <div className="text-gray-300 text-sm font-mono">Terminal</div>
                      <button 
                        onClick={() => navigator.clipboard.writeText(item.command)}
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Copy
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="bg-black bg-opacity-50 p-3 rounded font-mono text-gray-300 text-sm overflow-x-auto">
                        {item.command}
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        {item.explanation}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-400">
                No commands generated for the selected technologies.
              </div>
            )}
          </div>
          
          {/* Next Steps Card */}
          <div className="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Next Steps</h3>
            
            <ol className="space-y-3 text-gray-300">
              <li className="flex items-baseline">
                <div className="bg-purple-900 bg-opacity-25 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-purple-400 font-medium">1</div>
                <div>
                  Run the setup commands to initialize your project
                </div>
              </li>
              <li className="flex items-baseline">
                <div className="bg-purple-900 bg-opacity-25 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-purple-400 font-medium">2</div>
                <div>
                  Set up version control (Git) for your project
                </div>
              </li>
              <li className="flex items-baseline">
                <div className="bg-purple-900 bg-opacity-25 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-purple-400 font-medium">3</div>
                <div>
                  Create your project structure following best practices
                </div>
              </li>
              <li className="flex items-baseline">
                <div className="bg-purple-900 bg-opacity-25 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-purple-400 font-medium">4</div>
                <div>
                  Implement features incrementally with testing
                </div>
              </li>
              <li className="flex items-baseline">
                <div className="bg-purple-900 bg-opacity-25 h-6 w-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0 text-purple-400 font-medium">5</div>
                <div>
                  Deploy your application to your chosen hosting platform
                </div>
              </li>
            </ol>
          </div>
        </div>
        
        <div className="mt-8 flex justify-between">
          <button 
            type="button" 
            onClick={handleStartOver}
            className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Start Over
          </button>
          
          <button 
            type="button" 
            className="inline-flex items-center px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-800"
          >
            Save Project
            <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
