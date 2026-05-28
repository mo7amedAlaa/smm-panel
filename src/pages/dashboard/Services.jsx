import { useEffect, useMemo, useState } from "react";
import { getServices } from "../../api/services";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaSearch } from "react-icons/fa";

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      const res = await getServices();

      if (res.success) {
        setServices(res.data);
        console.log(res.data);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  // 🔍 FILTER + SEARCH
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchSearch = s.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        category === "all" || s.category === category;

      return matchSearch && matchCategory;
    });
  }, [services, search, category]);

  // ⏳ Loading skeleton
  if (loading) {
    return (
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-gray-200 dark:bg-white/10 rounded-xl"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* 🔍 SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">

        {/* Search */}
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-2 w-full md:w-96">
          <FaSearch className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="bg-transparent outline-none w-full text-sm"
          />
        </div>

        {/* Filter */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-white/5 text-sm"
        >
          <option value="all">All</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="youtube">YouTube</option>
        </select>

      </div>

      {/* 📦 GRID */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        <AnimatePresence>
          {filteredServices.map((s) => (
            <motion.div
              key={s.service}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#0b0f25] hover:shadow-lg transition flex flex-col justify-between min-h-[170px]"
            >

              {/* TOP */}
              <div className="flex justify-between items-start">

                <div>
                  <p className="text-xs text-gray-400">
                    ID: {s.service}
                  </p>

                  <h3 className="font-semibold mt-1 text-sm md:text-base leading-snug">
                    {s.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {s.category}
                  </p>
                </div>

                <button className="text-gray-400 hover:text-yellow-400 transition">
                  <FaStar />
                </button>

              </div>

              {/* BOTTOM */}
              <div className="mt-4 flex items-center justify-between">

                <p className="text-primary font-bold text-sm md:text-base">
                  ${s.rate}
                </p>

                <button className="px-3 py-1 rounded-lg bg-primary text-white text-sm hover:scale-105 transition">
                  Order
                </button>

              </div>

            </motion.div>
          ))}
        </AnimatePresence>

      </div>

    </div>
  );
}