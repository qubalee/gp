import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

// ✅ Page and layout imports
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import TagsPage from "./pages/TagsPage";   // ✅ static tag list
import TagPage from "./pages/TagPage";     // ✅ dynamic tag filter
import NotFound from "./pages/NotFound";

// ✅ Firebase Auth
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";

// ✅ Create QueryClient for React Query
const queryClient = new QueryClient();

const App = () => {
  // ✅ Log in anonymously on app load
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

            {/* ✅ All tags list */}
            <Route path="tags" element={<TagsPage />} />

            {/* ✅ Prompts filtered by individual tag */}
            <Route path="tags/:tag" element={<TagPage />} />

            {/* ✅ Fallback 404 route */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
