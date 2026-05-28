import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaPowerOff,
  FaPlus,
  FaList,
  FaWallet,
  FaHeadset,
  FaBox,
  FaFileContract,
  FaShieldAlt,
  FaRocket,
  FaUserEdit,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

export default function Sidebar({
  collapsed = false,
  setMobileOpen,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const links = [
    { to: "/dashboard/new-order", label: "طلب جديد", icon: FaPlus },
    { to: "/dashboard/services", label: "الخدمات", icon: FaRocket },
    { to: "/dashboard/orders", label: "سجل الطلبات", icon: FaList },
    { to: "/dashboard/add-funds", label: "إضافة أموال", icon: FaWallet },
    { to: "/dashboard/support", label: "الدعم الفني", icon: FaHeadset },
    { to: "/dashboard/bulk-order", label: "طلب مجمع", icon: FaBox },
    { to: "/dashboard/terms", label: "الشروط", icon: FaFileContract },
    { to: "/dashboard/privacy", label: "الخصوصية", icon: FaShieldAlt },
    { to: "/dashboard/settings", label: "الإعدادات", icon: FaUserEdit },
  ];

  const userName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "User";

  const userLetter = userName.charAt(0);

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="
        h-full flex flex-col
        border-r border-black/10 dark:border-white/10
        bg-white dark:bg-[#060816]
        overflow-hidden
      "
    >

      {/* BRAND */}
      <div className="h-16 flex items-center justify-center border-b border-black/10 dark:border-white/10">
        <h1 className="font-black tracking-tight text-lg">
          <span className="text-primary">SMM</span>
          {!collapsed && <span className="ml-1">Panel</span>}
        </h1>
      </div>

      {/* USER */}
      {!collapsed && (
        <div className="flex items-center justify-between p-4 border-b border-black/10 dark:border-white/10">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
              {userLetter}
            </div>

            <div>
              <h4 className="text-sm font-semibold">{userName}</h4>
              <p className="text-xs text-gray-500 truncate max-w-[120px]">
                {user?.email}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="text-red-500 hover:scale-110 transition"
          >
            <FaPowerOff />
          </button>
        </div>
      )}

      {/* LINKS */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">

        {links.map((link, i) => {
          const active = location.pathname === link.to;
          const Icon = link.icon;

          return (
            <Link
              key={i}
              to={link.to}
              onClick={() => setMobileOpen?.(false)}
              className={`
                relative flex items-center gap-3
                p-3 rounded-xl
                transition-all duration-200
                hover:bg-black/5 dark:hover:bg-white/5
                ${collapsed ? "justify-center" : ""}
                ${active ? "bg-primary/10 text-primary" : ""}
              `}
            >

              {/* active indicator */}
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-primary rounded-full" />
              )}

              <Icon className="text-base" />

              {!collapsed && (
                <span className="text-sm font-medium">
                  {link.label}
                </span>
              )}

            </Link>
          );
        })}

      </nav>

    </motion.aside>
  );
}