import { useWizard, BackendFramework, Database } from "@/context/WizardContext";
import ProgressBar from "@/components/ProgressBar";
import WizardNavigation from "@/components/WizardNavigation";
import { useEffect } from "react";

interface TechOption {
  id: string;
  name: string;
  description: string;
  advantages: string[];
  icon: React.ReactNode;
}

function OptionCard({ 
  option, 
  isSelected, 
  onSelect 
}: { 
  option: TechOption; 
  isSelected: boolean; 
  onSelect: () => void; 
}) {
  return (
    <div 
      className={`base-card option-card ${
        isSelected ? "selected-card" : ""
      } bg-gray-700 bg-opacity-30 border rounded-xl p-6 cursor-pointer transition-all duration-200`}
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="info-click-area">
          <div className="flex items-center mb-2">
            {option.icon}
            <span className="font-medium text-white">{option.name}</span>
          </div>
          <p className="text-sm text-gray-300 mb-4">{option.description}</p>
        </div>
        <div className="input-container">
          <div className={`h-5 w-5 rounded-full border-2 ${isSelected ? "border-purple-500 bg-purple-500 flex items-center justify-center" : "border-gray-600"}`}>
            {isSelected && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </div>
      </div>
      
      <div className="space-y-2 mt-4">
        {option.advantages.map((advantage, index) => (
          <div key={index} className="flex items-center text-sm text-gray-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{advantage}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BackendSelection() {
  const { projectConfig, updateProjectConfig, setCurrentStep } = useWizard();
  
  useEffect(() => {
    // Update current step when this page loads
    setCurrentStep("backend");
  }, [setCurrentStep]);
  
  // If the app type doesn't need backend, skip this step
  const shouldSkipBackend = projectConfig.appType === "web" && !projectConfig.appType?.includes("fullstack");
  
  // Backend framework options
  const backendOptions: TechOption[] = [
    {
      id: "express",
      name: "Node.js / Express",
      description: "A minimal and flexible Node.js web application framework for building APIs and web applications.",
      advantages: [
        "JavaScript across the stack",
        "Large ecosystem of middleware",
        "Non-blocking I/O for performance",
        "Active community and packages"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M12 21.85c-.3 0-.6-.08-.85-.23l-2.7-1.6c-.4-.23-.2-.32-.08-.35.54-.2.65-.24 1.23-.56.06-.03.14-.02.2.02l2.1 1.24c.06.05.16.05.25 0l8.14-4.7c.08-.04.13-.13.13-.22v-9.4c0-.1-.05-.18-.14-.23l-8.13-4.7c-.08-.04-.17-.04-.25 0l-8.13 4.7c-.1.05-.14.14-.14.23v9.4c0 .1.05.18.14.23l2.23 1.27c1.2.6 1.94-.1 1.94-.83v-9.26c0-.13.1-.24.25-.24h1.03c.14 0 .25.1.25.24v9.26c0 1.6-.88 2.54-2.4 2.54-.47 0-.84 0-1.87-.5l-2.12-1.22C.58 17.2.25 16.65.25 16.04v-9.4c0-.6.33-1.17.85-1.47l8.14-4.73c.5-.3 1.18-.3 1.7 0l8.13 4.7c.54.3.87.86.87 1.47v9.4c0 .6-.32 1.16-.86 1.47l-8.13 4.7c-.26.15-.55.23-.85.23m2.44-6.22c-3.56 0-4.3-1.64-4.3-3 0-.13.1-.24.25-.24h1.06c.12 0 .22.08.24.2.16 1.1.64 1.65 2.74 1.65 1.7 0 2.4-.38 2.4-1.27 0-.5-.2-.88-2.82-1.13-2.2-.25-3.56-.7-3.56-2.48 0-1.62 1.36-2.6 3.65-2.6 2.56 0 3.82.9 4 2.8.. 0 .12.08.12.17 0 .08-.04.16-.12.2l-1.05.64c-.12.07-.25.04-.33-.07-.5-.57-.8-1.25-2.6-1.25-1.9 0-2.13.67-2.13 1.17 0 .6.27.8 2.74 1.13 2.46.35 3.65.83 3.65 2.46 0 1.75-1.46 2.72-4 2.72" />
        </svg>
      )
    },
    {
      id: "django",
      name: "Python / Django",
      description: "A high-level Python Web framework that encourages rapid development and clean, pragmatic design.",
      advantages: [
        "Batteries-included philosophy",
        "Admin interface out of the box",
        "Object-relational mapper (ORM)",
        "Security features by default"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z" />
        </svg>
      )
    }
  ];
  
  // Database options
  const databaseOptions: TechOption[] = [
    {
      id: "mongodb",
      name: "MongoDB",
      description: "A document-based NoSQL database designed for scalability and developer productivity.",
      advantages: [
        "Schema-less document structure",
        "Horizontal scaling capabilities",
        "JSON-like document model",
        "Great for rapid development"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z" />
        </svg>
      )
    },
    {
      id: "postgresql",
      name: "PostgreSQL",
      description: "A powerful, open source object-relational database system with over 30 years of active development.",
      advantages: [
        "ACID compliance",
        "Robust feature set",
        "Handles complex queries well",
        "Strong data integrity"
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-6 w-6 text-purple-400 mr-2">
          <path fill="currentColor" d="M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2324-1.63.3353-2.2795.1482-2.4789-.0176.7507-1.1426 1.3823-2.3961 1.94-3.7579 1.121-2.7358 1.6799-5.24384.0337-6.45024-.8577-.63192-1.9096-.93949-3.131-.93949-1.8043 0-3.5343.68659-4.0797.94383-.2452-.05077-.4914-.09843-.7386-.1431-1.3768-.24948-2.7962-.36731-4.20944-.34744-1.29983.0181-2.44239.29963-3.30799.8156-.82334.49087-1.2723 1.14266-1.27884 1.8419-.00393.43452.14653.87189.4446 1.29388 1.14653 1.63258 3.94303 2.62331 4.96598 2.89517-.2788.08072-.51382.11755-.67196.12839-1.16878.07958-1.83039.45335-1.96359.88545-.17684.57747.17349 1.4209.9329 2.2669.59699.6615 1.31303.8641 1.96359.8641.36892 0 .6988-.0776.9761-.20675.916-.42322 1.9005-1.3443 2.9665-2.4414.1857.9421.3911 1.7485.595 2.3949-.8482.2527-3.4601 1.0918-3.5123 3.0262-.0243.8945.4066 1.8209 1.1903 2.5622.7322.6958 1.7259 1.0603 2.8021 1.0603.216 0 .4378-.0195.6534-.0586 1.4303-.249 2.8491-1.1996 4.0291-2.6845.4923-.616.969-1.3454 1.4215-2.1853.7348.2808 1.6468.504 2.739.5446 1.1942.0435 2.115-.1879 2.7329-.6863.6227-.501.9294-1.1599.9098-1.956-.0392-1.5965-1.1496-2.4753-2.1614-3.0686.6227-1.7788.4981-3.2642.3684-3.766-.0496-.1948-.1063-.3731-.166-.5413.2024-.0643.3969-.1346.5827-.209.4476-.1819 1.1518-.5538 1.8051-1.1075.8005-.6757 1.0257-1.3608 1.0788-1.78256.0882-.6965-.3872-1.3804-.9805-1.41665h-.0001zm-3.4113.1455c.2138 0 .4196.1689.402.3877-.0142.1751-.0355.3973-.0781.6566-1.0747 1.1226-2.5181 1.5366-3.955 1.6066-.7064.0342-1.4222-.0062-2.0969-.081.2507-.3224.5207-.6397.8087-.9504.7294-.7865 1.6562-1.4807 2.6737-2.0034 1.3823-.7122 2.0055-.7972 2.2456-.61zm-6.8294 13.7264h-.0001c-1.331 1.7336-2.5413 2.4322-3.5272 2.6132-.1547.0284-.3079.0422-.458.0422-.7036 0-1.2763-.2507-1.722-.7506-.5153-.5797-.7003-1.1994-.6825-1.7283.0407-1.1964 1.7506-1.723 2.6882-1.9024.3391-.0652.7046-.1176 1.0888-.1621-.004.0051-.0081.0103-.0121.0154.336.7607.7396 1.4553 1.2066 2.0601.1175.1516.2448.295.3823.4254.0044.0059.0078.012.0124.0178.0195.0215.0434.0328.0649.0529l.0221.0264zm-1.4981-5.8641a54.5208 54.5208 0 0 1-.5949-2.4911c.3086-.1258.6166-.2435.922-.3511.5147-.1817 1.024-.31 1.514-.3844.014.0048.0285.0094.0428.0137.8235.2625 1.4343.7908 1.7504 1.5224.0785.1809.1488.3703.2097.5702.1371.4495.201.948.206 1.5064-1.0364.4077-1.8918.927-2.5285 1.5493-.8296.8107-1.3408 1.6662-1.5625 2.5979-.6627-1.8587-1.0134-3.1214-1.018-4.3584.0047-.1546.0103-.2817.0188-.3911.0028-.0374.0067-.0744.0109-.1112.3053-.169.6251-.3218.9533-.4736h-.0001zM9.62384 15.034c-.14551-.9436-.21662-1.9256-.21618-2.9359 0-1.7547.26167-3.55613.78535-5.35758.2087-.7143.46588-1.38655.77431-2.00327.4298.40412.81774.8711 1.13528 1.39893.8043 1.33522.872 2.998.1728 4.56212-.5114 1.1389-1.40702 2.1593-2.63156 3.03z" />
        </svg>
      )
    }
  ];
  
  // Handle framework selection
  const handleFrameworkSelect = (framework: BackendFramework) => {
    updateProjectConfig({ backend: framework });
  };
  
  // Handle database selection
  const handleDatabaseSelect = (database: Database) => {
    updateProjectConfig({ database: database });
  };

  return (
    <>
      <ProgressBar />
      
      <div className="p-6 md:p-8">
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Backend Selection</h2>
            <span className="text-sm text-purple-400">Step 3 of 4</span>
          </div>
          
          {shouldSkipBackend ? (
            <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
              <div className="flex items-center text-yellow-300 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Note</span>
              </div>
              <p className="text-gray-300">
                Since you selected a frontend-only application, you can skip the backend selection. Click Next to continue to the infrastructure selection.
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h3 className="section-header text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
                  Backend Framework
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {backendOptions.map((option) => (
                    <OptionCard 
                      key={option.id}
                      option={option}
                      isSelected={projectConfig.backend === option.id as BackendFramework}
                      onSelect={() => handleFrameworkSelect(option.id as BackendFramework)}
                    />
                  ))}
                </div>
              </section>
              
              <section>
                <h3 className="section-header text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2 mb-4">
                  Database
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {databaseOptions.map((option) => (
                    <OptionCard 
                      key={option.id}
                      option={option}
                      isSelected={projectConfig.database === option.id as Database}
                      onSelect={() => handleDatabaseSelect(option.id as Database)}
                    />
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
        
        <WizardNavigation nextLabel="Next: Infrastructure Selection" />
      </div>
    </>
  );
}
