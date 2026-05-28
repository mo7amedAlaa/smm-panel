import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar           from "./components/layout/Navbar";
import Footer           from "./components/layout/Footer";
import ProtectedRoute   from "./components/layout/ProtectedRoute";
import Home             from "./pages/Home";
import Login            from "./pages/Login";
import Register         from "./pages/Register";
import DashboardLayout  from "./pages/dashboard/Layout";
import Overview         from "./pages/dashboard/Overview";
import Services         from "./pages/dashboard/Services";
import NewOrder         from "./pages/dashboard/NewOrder";
import Orders           from "./pages/dashboard/Orders";
import Settings         from "./pages/dashboard/Settings";
import AddFunds         from "./pages/dashboard/AddFunds";
import Support          from "./pages/dashboard/Support";
import BulkOrder        from "./pages/dashboard/BulkOrder";
import Terms            from "./pages/dashboard/Terms";
import Privacy          from "./pages/dashboard/Privacy";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="dark"
            rtl
          />
          <Routes>
            {/* Public */}
            <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
            <Route path="/login"    element={<><Navbar /><Login /></>} />
            <Route path="/register" element={<><Navbar /><Register /></>} />

            {/* Protected Dashboard */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }>
              <Route index                element={<Overview />} />
              <Route path="services"      element={<Services />} />
               <Route path="new-order" element={<NewOrder />} />
          <Route path="services" element={<Services />} />
          <Route path="orders" element={<Orders />} />
          <Route path="add-funds" element={<AddFunds />} />
          <Route path="support" element={<Support />} />
          <Route path="bulk-order" element={<BulkOrder />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
           
              <Route path="settings"      element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}