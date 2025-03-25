import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootLayout } from "./components/layouts/RootLayout";

// Pages
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

// Admin Pages
import { UserManagement } from "./pages/admin/UserManagement";
import { CategoryManagement } from "./pages/admin/CategoryManagement";
import { AuditLogs } from "./pages/admin/AuditLogs";
import { Help } from "./pages/admin/Help";

// Thủ tục hành chính
import { AdminProcedures } from "./pages/procedures/AdminProcedures";
import { SubmitForm } from "./pages/procedures/SubmitForm";
import { ConfirmSubmission } from "./pages/procedures/ConfirmSubmission";
import { TrackProgress } from "./pages/procedures/TrackProgress";
import { ProcedureDetails } from "./pages/procedures/ProcedureDetails";
import { ProcedureHistory } from "./pages/procedures/ProcedureHistory";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="action-history" element={<ActionHistory />} />
              <Route path="settings" element={<Settings />} />
              <Route path="profile" element={<UserProfile />} />
              
              {/* Storage Routes */}
              <Route path="storage">
                <Route index element={<CommonStorage />} />
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
