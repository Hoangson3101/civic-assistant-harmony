import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import Index from "../pages/Index";
import Documents from "../pages/Documents";
import NotFound from "../pages/NotFound";
import LegalDocumentSearch from "../pages/legal/LegalDocumentSearch";
import StorageLayout from "../pages/storage/StorageLayout";
import StorageDashboard from "../pages/storage/StorageDashboard";
import PersonalStorage from "../pages/storage/PersonalStorage";
import TeamStorage from "../pages/storage/TeamStorage";
import DepartmentStorage from "../pages/storage/DepartmentStorage";
import LegalDocumentDetail from "../pages/legal/LegalDocumentDetail";
import WorkflowDashboard from "../pages/workflows/WorkflowDashboard";
import WorkflowDetail from "../pages/workflows/WorkflowDetail";
import DocumentDetail from '../pages/documents/DocumentDetail';
import UserManagement from '../pages/admin/UserManagement';
import CategoryManagement from '../pages/admin/CategoryManagement';
import AuditLogs from '../pages/admin/AuditLogs';
import NotificationManagement from '../pages/admin/NotificationManagement';
import Settings from '../pages/admin/Settings';
import Help from '../pages/admin/Help';
import CustomReports from '../pages/reports/CustomReports';
import Favorites from '../pages/favorites/Favorites';
import UserProfile from '../pages/profile/UserProfile';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Router>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Navigate to="/documents" replace />} />
              <Route path="documents" element={<Documents />} />
              <Route path="documents/:id" element={<DocumentDetail />} />
              <Route path="workflows">
                <Route index element={<WorkflowDashboard />} />
                <Route path=":id" element={<WorkflowDetail />} />
              </Route>
              <Route path="storage" element={<StorageLayout />}>
                <Route index element={<StorageDashboard />} />
                <Route path="personal" element={<PersonalStorage />} />
                <Route path="team" element={<TeamStorage />} />
                <Route path="department" element={<DepartmentStorage />} />
              </Route>
              <Route path="legal">
                <Route index element={<LegalDocumentSearch />} />
                <Route path=":id" element={<LegalDocumentDetail />} />
              </Route>
              <Route path="favorites" element={<Favorites />} />
              <Route path="reports" element={<CustomReports />} />
              
              {/* Admin routes */}
              <Route path="admin/users" element={<UserManagement />} />
              <Route path="admin/categories" element={<CategoryManagement />} />
              <Route path="admin/logs" element={<AuditLogs />} />
              <Route path="admin/notifications" element={<NotificationManagement />} />
              <Route path="admin/settings" element={<Settings />} />
              <Route path="admin/help" element={<Help />} />
              
              {/* User settings */}
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="help" element={<Help />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
} 