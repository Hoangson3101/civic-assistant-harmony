
// This is a placeholder file to avoid the error with route collision
// The actual Settings component is in src/pages/Settings.tsx

import { Navigate } from "react-router-dom";

export function Settings() {
  return <Navigate to="/settings" replace />;
}

export default Settings;
