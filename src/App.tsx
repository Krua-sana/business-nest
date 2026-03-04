import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TenSaturdays from "./pages/TenSaturdays";
import TenSaturdaysSpouses from "./pages/TenSaturdays-spouses";
import ExpertsPage from "./pages/ExpertsPage";
import ApplicationForm from "./pages/ApplicationForm";
import Events from "./pages/Events";
import QualityAssuranceWorkshop from "./pages/events/QualityAssuranceWorkshop";
import AICoCreatorWorkshop from "./pages/events/AICoCreatorWorkshop";
import CreateYourOnlinePresence from "./pages/events/Create-your-online-presence";
import FinancialTransitionLab from "./pages/events/Financial-transition-lab";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/*<BrowserRouter basename={import.meta.env.BASE_URL}>*/}
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          <Route path="/program" element={<TenSaturdays />} />
          <Route path="/program-spouses" element={<TenSaturdaysSpouses />} />
          <Route path="/experts" element={<ExpertsPage />} />
          <Route path="/apply" element={<ApplicationForm />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/quality-assurance-ai" element={<QualityAssuranceWorkshop />}/>
          <Route path="/events/ai-co-creator" element={<AICoCreatorWorkshop />}/>
          <Route path="/events/create-your-online-presence" element={<CreateYourOnlinePresence />}/>
          <Route path="/events/financial-transition-lab" element={<FinancialTransitionLab />}/>



        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
