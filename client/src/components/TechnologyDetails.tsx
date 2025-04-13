import { useWizard } from "@/context/WizardContext";

interface TechnologyDetailsProps {
  title: string;
  description: string;
  frameworks: string[];
  useCases: string[];
  learningPath: string[];
}

export default function TechnologyDetails({
  title,
  description,
  frameworks,
  useCases,
  learningPath
}: TechnologyDetailsProps) {
  const { projectConfig } = useWizard();
  
  // Display appropriate details based on the selected app type
  if (!projectConfig.appType) return null;
  
  return (
    <div className="mt-10 p-6 border border-gray-700 rounded-lg bg-gray-900 bg-opacity-50">
      <div className="flex items-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        <h3 className="text-lg font-semibold text-white">{title} Explained</h3>
      </div>
      
      <p className="text-gray-300 text-sm mb-4">
        {description}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <h4 className="font-medium text-purple-300">Popular Frameworks:</h4>
          <ul className="space-y-1 text-gray-300">
            {frameworks.map((framework, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                {framework}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-2">
          <h4 className="font-medium text-purple-300">Best Use Cases:</h4>
          <ul className="space-y-1 text-gray-300">
            {useCases.map((useCase, index) => (
              <li key={index} className="flex items-center">
                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-2"></span>
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="mt-4 border-t border-gray-700 pt-4">
        <h4 className="font-medium text-purple-300 mb-2">Recommended Learning Path:</h4>
        <ol className="space-y-1 text-gray-300 text-sm">
          {learningPath.map((step, index) => (
            <li key={index} className="flex items-baseline">
              <span className="text-purple-400 font-medium mr-2">{index + 1}.</span>
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
