import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Documents from "./pages/Documents";
import Workflows from "./pages/Workflows";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import AssistantChatInterface from "./components/AssistantChatInterface";
import FileStorageInterface from "./components/FileStorageInterface";
import LegalDocumentSearch from "./components/LegalDocumentSearch";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          <Header />
          <main className="flex-1 pt-4">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/workflows" element={<Workflows />} />
              <Route path="/assistant" element={<AssistantChatInterface />} />
              <Route path="/storage" element={<FileStorageInterface />} />
              <Route path="/legal" element={<LegalDocumentSearch />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          
          {/* Trợ lý ảo luôn hiển thị ở tất cả các trang */}
          <AssistantChatInterface />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
