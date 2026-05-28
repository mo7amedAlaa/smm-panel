import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../../components/layout/Sidebar";
import Topbar from "../../components/layout/Topbar";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "../../components/layout/Topbar";

export default function DashboardLayout() {
  const location = useLocation();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <div className="h-screen flex overflow-hidden bg-white dark:bg-[#060816] text-black dark:text-white">

      {/* SIDEBAR DESKTOP */}
      <div className="hidden md:flex">
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />
      </div>

      {/* MOBILE DRAWER */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />

          <div className="relative w-72 h-full bg-white dark:bg-[#060816]">
            <Sidebar
              collapsed={false}
              setMobileOpen={setMobileOpen}
            />
          </div>

        </div>
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* TOPBAR */}
        <header className="h-16 flex items-center justify-between border-b border-black/10 dark:border-white/10 px-4">

          <TopBar pathname={location.pathname} />

          <div className="flex items-center gap-2">

            {/* mobile button */}
            <button
              className="md:hidden px-3 py-1 rounded bg-black/5 dark:bg-white/10"
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>

            {/* collapse desktop */}
            <button
              className="hidden md:block px-3 py-1 rounded bg-black/5 dark:bg-white/10"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? "➡️" : "⬅️"}
            </button>

          </div>

        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
}