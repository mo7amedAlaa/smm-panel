import { Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  // =========================
  // Loading State
  // =========================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0b0e1a]">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />

          <p className="text-sm text-gray-500 dark:text-gray-400">
            جاري التحقق...
          </p>
        </div>
      </div>
    );
  }

  // =========================
  // Not Authenticated
  // =========================

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =========================
  // Authenticated
  // =========================

  return children;
}