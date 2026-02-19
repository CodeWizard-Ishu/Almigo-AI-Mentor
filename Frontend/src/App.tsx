import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Layout } from "@/components/layout/Layout";
import ChatPage from "@/pages/ChatPage";
import RoadmapPage from "@/pages/RoadmapPage";
import SummarizePage from "@/pages/SummarizePage";
import SearchPage from "@/pages/SearchPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 5 * 60 * 1000,
    },
    mutations: {
      retry: 1,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<ChatPage />} />
                <Route path="/roadmap" element={<RoadmapPage />} />
                <Route path="/summarize" element={<SummarizePage />} />
                <Route path="/search" element={<SearchPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
