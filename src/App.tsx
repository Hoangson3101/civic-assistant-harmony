
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import RootLayout from "./components/RootLayout";

// Pages
import Index from "./pages/Index";
import Documents from "./pages/Documents";
import { Dashboard } from "./pages/Dashboard";
import { Reports } from "./pages/Reports";
import { ActionHistory } from "./pages/ActionHistory";
import { Settings } from "./pages/Settings";
import { UserProfile } from "./pages/UserProfile";
import { NotFound } from "./pages/NotFound";

// Storage Pages
import { CommonStorage } from "./pages/storage/CommonStorage";
import { DepartmentDetails } from "./pages/storage/DepartmentDetails";
import { DepartmentDocuments } from "./pages/storage/DepartmentDocuments";
import { DepartmentMembers } from "./pages/storage/DepartmentMembers";
import StorageLayout from "./pages/storage/StorageLayout";
import StorageDashboard from "./pages/storage/StorageDashboard";
import PersonalStorage from "./pages/storage/PersonalStorage";
import TeamStorage from "./pages/storage/TeamStorage";
import DepartmentStorage from "./pages/storage/DepartmentStorage";

// Admin Pages
import { UserManagement } from "./pages/admin/UserManagement";
import { CategoryManagement } from "./pages/admin/CategoryManagement";
import { AuditLogs } from "./pages/admin/AuditLogs";
import { Help } from "./pages/admin/Help";
import NotificationManagement from "./pages/admin/NotificationManagement";

// Thủ tục hành chính
import { AdminProcedures } from "./pages/procedures/AdminProcedures";
import { SubmitForm } from "./pages/procedures/SubmitForm";
import { ConfirmSubmission } from "./pages/procedures/ConfirmSubmission";
import { TrackProgress } from "./pages/procedures/TrackProgress";
import { ProcedureDetails } from "./pages/procedures/ProcedureDetails";
import { ProcedureHistory } from "./pages/procedures/ProcedureHistory";

// Legal documents
import LegalDocumentSearch from "./pages/LegalDocumentSearch";
import LegalDocumentDetail from "./pages/legal/LegalDocumentDetail";

// Workflows
import WorkflowDashboard from "./pages/workflows/WorkflowDashboard";
import WorkflowDetail from "./pages/workflows/WorkflowDetail";

// Documents
import DocumentDetail from './pages/documents/DocumentDetail';
import CustomReports from './pages/reports/CustomReports';
import Favorites from './pages/favorites/Favorites';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Index />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="documents" element={<Documents />} />
              <Route path="documents/:id" element={<DocumentDetail />} />
              <Route path="reports" element={<Reports />} />
              <Route path="action-history" element={<ActionHistory />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="legal" element={<LegalDocumentSearch />} />
              <Route path="legal/:id" element={<LegalDocumentDetail />} />
              <Route path="workflows" element={<WorkflowDashboard />} />
              <Route path="workflows/:id" element={<WorkflowDetail />} />
              <Route path="favorites" element={<Favorites />} />
              <Route path="custom-reports" element={<CustomReports />} />
              
              {/* Storage Routes */}
              <Route path="storage" element={<StorageLayout />}>
                <Route index element={<StorageDashboard />} />
                <Route path="personal" element={<PersonalStorage />} />
                <Route path="team" element={<TeamStorage />} />
                <Route path="department" element={<DepartmentStorage />} />
                <Route path="common" element={<CommonStorage />} />
                <Route path="department/:id" element={<DepartmentDetails />}>
                  <Route index element={<DepartmentDocuments />} />
                  <Route path="documents" element={<DepartmentDocuments />} />
                  <Route path="members" element={<DepartmentMembers />} />
                </Route>
              </Route>

              {/* Admin Routes */}
              <Route path="admin">
                <Route path="users" element={<UserManagement />} />
                <Route path="categories" element={<CategoryManagement />} />
                <Route path="logs" element={<AuditLogs />} />
                <Route path="notifications" element={<NotificationManagement />} />
                <Route path="help" element={<Help />} />
              </Route>

              {/* Thủ tục hành chính Routes */}
              <Route path="procedures">
                <Route index element={<AdminProcedures />} />
                <Route path="submit" element={<SubmitForm />} />
                <Route path="confirm/:id" element={<ConfirmSubmission />} />
                <Route path="track/:id" element={<TrackProgress />} />
                <Route path="details/:id" element={<ProcedureDetails />} />
                <Route path="history" element={<ProcedureHistory />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
