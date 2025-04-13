import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import WizardPage from "@/pages/WizardPage";
import FrontendSelection from "@/pages/FrontendSelection";
import BackendSelection from "@/pages/BackendSelection";
import InfraSelection from "@/pages/InfraSelection";
import Summary from "@/pages/Summary";
import AppContainer from "@/components/AppContainer";
import { WizardProvider } from "@/context/WizardContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={WizardPage} />
      <Route path="/frontend" component={FrontendSelection} />
      <Route path="/backend" component={BackendSelection} />
      <Route path="/infrastructure" component={InfraSelection} />
      <Route path="/summary" component={Summary} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContainer>
        <WizardProvider>
          <Router />
        </WizardProvider>
      </AppContainer>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
