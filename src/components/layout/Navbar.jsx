import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { HiSun, HiMoon, HiMenuAlt3, HiX } from "react-icons/hi";
import { useState } from "react";

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchLang = () => {
    const next = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(next);
    localStorage.setItem("smm_lang", next);
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/",        label: t("nav.home") },
    { to: "/services",label: t("nav.services") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#0d1120] border-b border-gray-100 dark:border-[#1e2a45]">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-white font-semibold text-base">
            M
          </div>
          <div>
            <p className="text-gray-900 dark:text-[#e0e7ff] text-sm font-semibold leading-none">
              mandovd
            </p>
            <p className="text-[10px] text-primary leading-none mt-0.5 tracking-widest">
              SMM PANEL
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to}
              className="px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary-light hover:bg-gray-50 dark:hover:bg-[#1e2a45]/50 transition-colors">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Lang */}
          <button onClick={switchLang}
            className="px-3 py-1.5 rounded-lg text-xs font-medium border border-gray-200 dark:border-[#1e2a45] text-gray-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors">
            {i18n.language === "ar" ? "EN" : "AR"}
          </button>

          {/* Dark toggle */}
          <button onClick={toggle}
            className="w-9 h-9 rounded-lg border border-gray-200 dark:border-[#1e2a45] flex items-center justify-center text-gray-600 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors">
            {dark ? <HiSun size={16} /> : <HiMoon size={16} />}
          </button>

          {user ? (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/dashboard"
                className="px-4 py-2 rounded-lg text-sm bg-primary hover:bg-primary-hover text-white transition-colors">
                {t("nav.dashboard")}
              </Link>
              <button onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-sm border border-gray-200 dark:border-[#1e2a45] text-gray-600 dark:text-slate-400 hover:border-red-400 hover:text-red-400 transition-colors">
                {t("nav.logout")}
              </button>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link to="/login"
                className="px-4 py-2 rounded-lg text-sm text-gray-600 dark:text-slate-400 hover:text-primary transition-colors">
                {t("nav.login")}
              </Link>
              <Link to="/register"
                className="px-4 py-2 rounded-lg text-sm bg-primary hover:bg-primary-hover text-white transition-colors">
                {t("nav.register")}
              </Link>
            </div>
          )}

          {/* Mobile menu btn */}
          <button onClick={() => setMenuOpen(p => !p)}
            className="md:hidden w-9 h-9 rounded-lg border border-gray-200 dark:border-[#1e2a45] flex items-center justify-center text-gray-600 dark:text-slate-400">
            {menuOpen ? <HiX size={18} /> : <HiMenuAlt3 size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0d1120] border-t border-gray-100 dark:border-[#1e2a45] px-4 py-3 flex flex-col gap-2">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 rounded-lg text-sm text-gray-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-[#1e2a45]/50">
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm bg-primary text-white text-center">
                {t("nav.dashboard")}
              </Link>
              <button onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="px-4 py-2.5 rounded-lg text-sm text-red-400 border border-red-400/30 text-center">
                {t("nav.logout")}
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm text-gray-600 dark:text-slate-400 text-center border border-gray-200 dark:border-[#1e2a45]">
                {t("nav.login")}
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm bg-primary text-white text-center">
                {t("nav.register")}
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}