import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import TenSaturdays from "./pages/TenSaturdays";
import TenSaturdaysSpouses from "./pages/TenSaturdays-spouses";
import ExpertsPage from "./pages/Expertspage";
import ApplicationForm from "./pages/ApplicationForm";



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


        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
