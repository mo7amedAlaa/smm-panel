import { motion } from "framer-motion";

const titles = {
  "/dashboard/new-order": "طلب جديد",
  "/dashboard/services": "الخدمات",
  "/dashboard/orders": "سجل الطلبات",
  "/dashboard/add-funds": "إضافة أموال",
  "/dashboard/support": "الدعم الفني",
  "/dashboard/bulk-order": "طلب مجمع",
  "/dashboard/terms": "الشروط والأحكام",
  "/dashboard/privacy": "سياسة الخصوصية",
};

export default function TopBar({ pathname }) {
  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="
        flex items-center 
        backdrop-blur-xl
        bg-white/60 dark:bg-[#060816]/60
      "
    >
      <h1 className="text-base md:text-lg font-bold">
        {titles[pathname] || "Dashboard"}
      </h1>
    </motion.div>
  );
}