import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "@/contexts/AuthContext"; // 🔒 Auth removed
// import { ProtectedRoute } from "@/components/ProtectedRoute"; // 🔒 Auth removed
import Index from "./pages/Index";
// import Auth from "./pages/Auth"; // 🔒 Auth page removed
import Docs from "./pages/Docs";
import TaxGenius from "./pages/TaxGenius";
import More from "./pages/More";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <AuthProvider> */} {/* 🔒 Auth provider removed */}
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* <Route path="/auth" element={<Auth />} /> */} {/* 🔒 Auth route removed */}

            {/* Removed ProtectedRoute wrappers since auth is disabled */}
            <Route path="/" element={<Index />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/tax-genius" element={<TaxGenius />} />
            <Route path="/more" element={<More />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    {/* </AuthProvider> */} {/* 🔒 Auth provider removed */}
  </QueryClientProvider>
);

export default App;