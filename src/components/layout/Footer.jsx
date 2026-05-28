import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-[#0d1120] border-t border-gray-100 dark:border-[#1e2a45] mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-semibold text-sm">M</div>
              <span className="text-gray-900 dark:text-[#e0e7ff] font-semibold">mandovd</span>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-500 leading-relaxed">
              أفضل منصة لخدمات السوشيال ميديا بأسعار تنافسية وجودة مضمونة
            </p>
            <div className="flex gap-3 mt-4">
              {[FaInstagram, FaTelegram, FaTwitter].map((Icon, i) => (
                <button key={i}
                  className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-[#1e2a45] flex items-center justify-center text-gray-500 dark:text-slate-500 hover:text-primary transition-colors">
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-semibold text-gray-700 dark:text-slate-300 mb-3 tracking-widest uppercase">الخدمات</p>
            {["Instagram", "TikTok", "YouTube", "Telegram"].map(p => (
              <Link key={p} to="/dashboard/services"
                className="block text-xs text-gray-500 dark:text-slate-500 hover:text-primary py-1 transition-colors">
                {p}
              </Link>
            ))}
          </div>

          {/* Account */}
          <div>
            <p className="text-xs font-semibold text-gray-700 dark:text-slate-300 mb-3 tracking-widest uppercase">الحساب</p>
            {[
              { to: "/login",    label: t("nav.login") },
              { to: "/register", label: t("nav.register") },
              { to: "/dashboard",label: t("nav.dashboard") },
            ].map(l => (
              <Link key={l.to} to={l.to}
                className="block text-xs text-gray-500 dark:text-slate-500 hover:text-primary py-1 transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-100 dark:border-[#1e2a45] pt-5 flex items-center justify-between">
          <p className="text-xs text-gray-400 dark:text-slate-600">
            © {new Date().getFullYear()} mandovd. جميع الحقوق محفوظة.
          </p>
          <p className="text-xs text-gray-400 dark:text-slate-600">Powered by mandovd API</p>
        </div>
      </div>
    </footer>
  );
}