import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useWizard } from '../context/WizardContext';
import { Check, Clock, AlertCircle, ChevronDown, ChevronRight, Code, ExternalLink } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

interface Task {
  name: string;
  description: string;
  stage: string;
  order: number;
  commands?: string[];
  duration?: number;
  difficulty?: string;
  status?: string;
}

interface Stage {
  name: string;
  order: number;
}

interface ActionPlan {
  message: string;
  stages: Stage[];
  tasks: Task[];
}

export default function ActionPlanPage() {
  const [location, setLocation] = useLocation();
  const { projectConfig } = useWizard();
  const [loading, setLoading] = useState(true);
  const [actionPlan, setActionPlan] = useState<ActionPlan | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedStages, setExpandedStages] = useState<string[]>([]);

  useEffect(() => {
    // Check if we have a complete project configuration before proceeding
    if (!projectConfig.appType || !projectConfig.frontend || !projectConfig.backend) {
      setError('Incomplete project configuration. Please complete the wizard first.');
      setLoading(false);
      return;
    }

    // Generate an action plan based on the selected technologies
    const generateActionPlan = async () => {
      try {
        setLoading(true);
        const response = await apiRequest('POST', '/api/action-plan', {
          appType: projectConfig.appType,
          frontend: projectConfig.frontend,
          backend: projectConfig.backend,
          database: projectConfig.database,
          authentication: projectConfig.authentication,
        });
        
        const data = await response.json();
        setActionPlan(data);
        
        // Initialize expanded stages with the first stage expanded
        if (data.stages && data.stages.length > 0) {
          setExpandedStages([data.stages[0].name]);
        }
      } catch (err) {
        setError('Failed to generate action plan. Please try again.');
        console.error('Error generating action plan:', err);
      } finally {
        setLoading(false);
      }
    };

    generateActionPlan();
  }, [projectConfig]);

  const toggleStage = (stageName: string) => {
    setExpandedStages((prev) => 
      prev.includes(stageName) 
        ? prev.filter(name => name !== stageName) 
        : [...prev, stageName]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty?.toLowerCase()) {
      case 'easy': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'hard': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return 'Unknown duration';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes > 0 ? remainingMinutes + 'm' : ''}`;
  };

  // Group tasks by stage
  const getTasksByStage = (stageName: string) => {
    return actionPlan?.tasks.filter(task => task.stage === stageName) || [];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent animate-spin rounded-full"></div>
          <p className="text-lg font-medium">Generating your personalized action plan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 bg-card rounded-lg shadow-lg">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-destructive" />
          <h2 className="text-2xl font-bold text-center mb-4">Error</h2>
          <p className="text-center mb-6">{error}</p>
          <div className="flex justify-center">
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => setLocation('/')}
            >
              Return to Wizard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!actionPlan) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="max-w-md p-6 bg-card rounded-lg shadow-lg">
          <AlertCircle className="w-12 h-12 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold text-center mb-4">No Action Plan</h2>
          <p className="text-center mb-6">We couldn't create an action plan with the current selections.</p>
          <div className="flex justify-center">
            <button 
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => setLocation('/')}
            >
              Return to Wizard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Development Action Plan</h1>
        <p className="text-lg text-foreground/80">
          Based on your selections: {projectConfig.frontend}, {projectConfig.backend}{projectConfig.database ? `, ${projectConfig.database}` : ''}{projectConfig.authentication ? `, with ${projectConfig.authentication} authentication` : ''}
        </p>
      </header>

      <div className="mb-6 p-4 bg-card rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Project Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-card border border-border rounded-lg">
            <h3 className="font-medium mb-2">Frontend</h3>
            <p>{projectConfig.frontend || 'Not selected'}</p>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <h3 className="font-medium mb-2">Backend</h3>
            <p>{projectConfig.backend || 'Not selected'}</p>
          </div>
          <div className="p-3 bg-card border border-border rounded-lg">
            <h3 className="font-medium mb-2">Database</h3>
            <p>{projectConfig.database || 'Not selected'}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Development Stages</h2>
        <div className="space-y-4">
          {actionPlan.stages.map((stage) => (
            <div key={stage.name} className="border border-border rounded-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-4 bg-card cursor-pointer"
                onClick={() => toggleStage(stage.name)}
              >
                <div className="flex items-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary mr-3">
                    {stage.order}
                  </span>
                  <h3 className="text-xl font-medium">{stage.name}</h3>
                </div>
                <button className="p-1 hover:bg-muted rounded-full transition-colors">
                  {expandedStages.includes(stage.name) ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {expandedStages.includes(stage.name) && (
                <div className="bg-background p-4 divide-y divide-border">
                  {getTasksByStage(stage.name).map((task, index) => (
                    <div key={index} className="py-4 first:pt-0 last:pb-0">
                      <div className="flex items-start">
                        <div className="flex-1">
                          <h4 className="text-lg font-medium mb-1">{task.name}</h4>
                          <p className="text-foreground/80 mb-3">{task.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-3">
                            {task.difficulty && (
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(task.difficulty)} bg-muted`}>
                                {task.difficulty}
                              </span>
                            )}
                            {task.duration && (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-foreground/80 bg-muted">
                                <Clock className="w-3 h-3 mr-1" />
                                {formatDuration(task.duration)}
                              </span>
                            )}
                          </div>

                          {task.commands && task.commands.length > 0 && (
                            <div className="bg-card rounded-md p-3 mt-2 overflow-x-auto">
                              <div className="flex items-center text-sm font-medium text-foreground/80 mb-2">
                                <Code className="w-4 h-4 mr-1" />
                                <span>Commands</span>
                              </div>
                              <pre className="text-sm font-mono">
                                {task.commands.join('\n')}
                              </pre>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button 
          className="px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
          onClick={() => setLocation('/')}
        >
          Back to Wizard
        </button>
        <button 
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          onClick={() => window.print()}
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Export Plan
        </button>
      </div>
    </div>
  );
}