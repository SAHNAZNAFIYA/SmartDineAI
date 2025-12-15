import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationProvider } from "./contexts/LocationContext";
import Navigation from "./components/Navigation";
import ErrorBoundary from "./components/ErrorBoundary";
import Index from "./pages/Index";
import Preferences from "./pages/Preferences";
import Results from "./pages/Results";
import Coach from "./pages/Coach";
import Dashboard from "./pages/Dashboard";
import SurpriseMe from "./pages/SurpriseMe";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LocationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path="/results" element={<Results />} />
              <Route path="/coach" element={<Coach />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/surprise" element={<SurpriseMe />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </LocationProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
