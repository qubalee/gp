import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

import Layout from "@/components/Layout";
import Index from "./pages/Index";
import TagPage from "./pages/TagPage";
import NotFound from "./pages/NotFound";

// ✅ Import Firebase Auth
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";

const queryClient = new QueryClient();

const App = () => {
  // ✅ Automatically log in anonymously once per session
  useEffect(() => {
    signInAnonymously(auth).catch((error) => {
      console.error("Anonymous login failed:", error);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="tags/:tag" element={<TagPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
