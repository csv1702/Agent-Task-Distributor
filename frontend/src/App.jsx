import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layout/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Agents from "./pages/Agents";
import Upload from "./pages/Upload";
import Distribution from "./pages/Distribution";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/agents"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Agents />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Upload />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/distribution"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Distribution />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
