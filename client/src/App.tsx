import React from 'react';
import { WizardProvider } from './context/WizardContext';
import { WizardLayout } from './components/WizardLayout';
import { ProjectTypeStep } from './pages/ProjectTypeStep';
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import WizardPage from "@/pages/WizardPage";
import FrontendSelection from "@/pages/FrontendSelection";
import BackendSelection from "@/pages/BackendSelection";
import InfraSelection from "@/pages/InfraSelection";
import Summary from "@/pages/Summary";
import ActionPlanPage from "@/pages/ActionPlanPage";
import AppContainer from "@/components/AppContainer";
import { EnvironmentSetup } from "@/components/setup";
import TestComponent from "./test-component";
import AppTest from "./app-test";
import IntegrationPage from "@/pages/IntegrationPage"; // Assuming this component exists

function Router() {
  return (
    <Switch>
      <Route path="/" component={WizardPage} />
      <Route path="/frontend" component={FrontendSelection} />
      <Route path="/backend" component={BackendSelection} />
      <Route path="/integration" component={IntegrationPage} />
      <Route path="/infrastructure" component={InfraSelection} />
      <Route path="/summary" component={Summary} />
      <Route path="/action-plan" component={ActionPlanPage} />
      <Route path="/environment-setup" component={EnvironmentSetup} />
      <Route path="/test" component={TestComponent} />
      <Route path="/app-test" component={AppTest} />
      <Route component={NotFound} />
    </Switch>
  );
}

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContainer>
          <WizardProvider>
            <Router />
          </WizardProvider>
        </AppContainer>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;