import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Link2,
  Hash,
  AtSign,
  MessageSquare,
  ShoppingCart,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { getServices } from "../../api/services";

const SERVICE_FIELDS = {
  Default: ["link", "quantity", "runs", "interval"],

  Package: ["link"],

  "Custom Comments": ["link", "comments"],

  Mentions: ["link", "quantity", "usernames"],

  "Mentions Hashtag": [
    "link",
    "quantity",
    "hashtag",
  ],

  "Custom Comments Package": [
    "link",
    "comments",
  ],

  "Comment Likes": [
    "link",
    "quantity",
    "username",
  ],

  Poll: ["link", "quantity", "answer_number"],

  "Comment Replies": [
    "link",
    "username",
    "comments",
  ],

  Subscriptions: [
    "username",
    "min",
    "max",
    "posts",
    "old_posts",
    "delay",
    "expiry",
  ],
};

const FIELD_CONFIG = {
  link: {
    label: "Link",
    type: "url",
    placeholder: "https://...",
    icon: Link2,
  },

  quantity: {
    label: "Quantity",
    type: "number",
    placeholder: "1000",
    icon: ShoppingCart,
  },

  runs: {
    label: "Runs",
    type: "number",
    placeholder: "5",
  },

  interval: {
    label: "Interval (minutes)",
    type: "number",
    placeholder: "30",
  },

  comments: {
    label: "Comments",
    type: "textarea",
    placeholder: "One comment per line",
    icon: MessageSquare,
  },

  usernames: {
    label: "Usernames",
    type: "textarea",
    placeholder: "username1\nusername2",
    icon: AtSign,
  },

  hashtag: {
    label: "Hashtag",
    type: "text",
    placeholder: "#viral",
    icon: Hash,
  },

  username: {
    label: "Username",
    type: "text",
    placeholder: "@username",
    icon: AtSign,
  },

  answer_number: {
    label: "Poll Answer Number",
    type: "number",
    placeholder: "1",
  },

  min: {
    label: "Minimum",
    type: "number",
    placeholder: "100",
  },

  max: {
    label: "Maximum",
    type: "number",
    placeholder: "1000",
  },

  posts: {
    label: "Posts",
    type: "number",
    placeholder: "5",
  },

  old_posts: {
    label: "Old Posts",
    type: "number",
    placeholder: "0",
  },

  delay: {
    label: "Delay",
    type: "number",
    placeholder: "60",
  },

  expiry: {
    label: "Expiry",
    type: "date",
  },
};

export default function OrderPage() {
  const [services, setServices] = useState([]);

  const [selectedServiceId, setSelectedServiceId] =
    useState("");

  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({});

  const [loadingServices, setLoadingServices] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getServices();

        if (res.success) {
          setServices(res.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingServices(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFormData({});
  }, [selectedServiceId]);

  const filteredServices = useMemo(() => {
    return services.filter((service) =>
      service.name
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [services, search]);

  const selectedService = useMemo(() => {
    return services.find(
      (service) =>
        String(service.service) ===
        String(selectedServiceId)
    );
  }, [selectedServiceId, services]);

  const fields = useMemo(() => {
    if (!selectedService) return [];

    return (
      SERVICE_FIELDS[selectedService.type] || []
    );
  }, [selectedService]);

  const estimatedPrice = useMemo(() => {
    if (
      !selectedService ||
      !formData.quantity
    ) {
      return null;
    }

    return (
      (selectedService.rate / 1000) *
      Number(formData.quantity)
    ).toFixed(2);
  }, [selectedService, formData.quantity]);

  function handleChange(name, value) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm() {
    if (!selectedService) {
      return "Please select a service";
    }

    if (
      formData.quantity &&
      Number(formData.quantity) <
        selectedService.min
    ) {
      return `Minimum quantity is ${selectedService.min}`;
    }

    if (
      formData.quantity &&
      Number(formData.quantity) >
        selectedService.max
    ) {
      return `Maximum quantity is ${selectedService.max}`;
    }

    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);

      return;
    }

    try {
      setSubmitting(true);

      setError("");

      setSuccess("");

      const payload = {
        service: selectedService.service,
      };

      fields.forEach((field) => {
        const value = formData[field];

        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          payload[field] = value;
        }
      });

      const response = await fetch(
        "/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to create order"
        );
      }

      setSuccess(
        `Order #${data.order} created successfully`
      );

      setFormData({});
    } catch (err) {
      setError(
        err.message || "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white px-4 py-10">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_350px] gap-8">
        {/* LEFT */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 md:p-8 shadow-2xl">
          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-4xl font-black tracking-tight mb-3">
              Create Order
            </h1>

            <p className="text-zinc-400 text-lg">
              Fast. Dynamic. Clean.
              Enterprise vibes only 😌
            </p>
          </div>

          {/* ALERTS */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-red-400"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {success && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="mb-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-4 text-emerald-400 flex items-center gap-3"
              >
                <CheckCircle2 size={20} />

                {success}
              </motion.div>
            )}
          </AnimatePresence>

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* SEARCH */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Search Service
              </label>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                />

                <input
                  type="text"
                  placeholder="Instagram Followers..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="w-full h-14 rounded-2xl bg-zinc-900/70 border border-zinc-700 pl-12 pr-4 outline-none focus:border-white transition"
                />
              </div>
            </div>

            {/* SELECT */}
            <div>
              <label className="text-sm text-zinc-400 mb-2 block">
                Select Service
              </label>

              {loadingServices ? (
                <div className="h-14 rounded-2xl bg-zinc-800 animate-pulse" />
              ) : (
                <select
                  value={selectedServiceId}
                  onChange={(e) =>
                    setSelectedServiceId(
                      e.target.value
                    )
                  }
                  className="w-full h-14 rounded-2xl bg-zinc-900/70 border border-zinc-700 px-4 outline-none focus:border-white"
                >
                  <option value="">
                    Choose a service
                  </option>

                  {filteredServices.map(
                    (service) => (
                      <option
                        key={service.service}
                        value={
                          service.service
                        }
                      >
                        {service.name}
                      </option>
                    )
                  )}
                </select>
              )}
            </div>

            {/* SERVICE INFO */}
            {selectedService && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="grid md:grid-cols-4 gap-4"
              >
                {[
                  {
                    label: "Type",
                    value:
                      selectedService.type,
                  },

                  {
                    label: "Rate",
                    value: `$${selectedService.rate}`,
                  },

                  {
                    label: "Min",
                    value:
                      selectedService.min,
                  },

                  {
                    label: "Max",
                    value:
                      selectedService.max,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl bg-zinc-900/70 border border-zinc-800 p-5"
                  >
                    <div className="text-zinc-500 text-sm mb-2">
                      {item.label}
                    </div>

                    <div className="text-xl font-bold">
                      {item.value}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* FIELDS */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedServiceId}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {fields.map((field) => {
                  const config =
                    FIELD_CONFIG[field];

                  if (!config) return null;

                  const Icon =
                    config.icon;

                  if (
                    config.type ===
                    "textarea"
                  ) {
                    return (
                      <div
                        key={field}
                        className="md:col-span-2"
                      >
                        <label className="text-sm text-zinc-400 mb-2 block">
                          {config.label}
                        </label>

                        <div className="relative">
                          {Icon && (
                            <Icon
                              size={18}
                              className="absolute top-5 left-4 text-zinc-500"
                            />
                          )}

                          <textarea
                            rows={6}
                            value={
                              formData[
                                field
                              ] || ""
                            }
                            onChange={(e) =>
                              handleChange(
                                field,
                                e.target.value
                              )
                            }
                            placeholder={
                              config.placeholder
                            }
                            className="w-full rounded-2xl bg-zinc-900/70 border border-zinc-700 p-4 pl-12 outline-none focus:border-white resize-none"
                          />
                        </div>

                        {field ===
                          "comments" && (
                          <div className="text-xs text-zinc-500 mt-2">
                            {
                              (
                                formData[
                                  field
                                ] || ""
                              )
                                .split(
                                  "\n"
                                )
                                .filter(
                                  Boolean
                                ).length
                            }{" "}
                            lines
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={field}>
                      <label className="text-sm text-zinc-400 mb-2 block">
                        {config.label}
                      </label>

                      <div className="relative">
                        {Icon && (
                          <Icon
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                          />
                        )}

                        <input
                          type={config.type}
                          value={
                            formData[
                              field
                            ] || ""
                          }
                          onChange={(e) =>
                            handleChange(
                              field,
                              e.target.value
                            )
                          }
                          placeholder={
                            config.placeholder
                          }
                          className={`w-full h-14 rounded-2xl bg-zinc-900/70 border border-zinc-700 px-4 ${
                            Icon
                              ? "pl-12"
                              : ""
                          } outline-none focus:border-white`}
                        />
                      </div>

                      {field ===
                        "quantity" && (
                        <div className="text-xs text-zinc-500 mt-2">
                          Min:{" "}
                          {
                            selectedService.min
                          }{" "}
                          — Max:{" "}
                          {
                            selectedService.max
                          }
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={
                !selectedService ||
                submitting
              }
              className="w-full h-14 rounded-2xl bg-white text-black font-bold text-lg transition hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <div className="flex items-center justify-center gap-3">
                  <Loader2 className="animate-spin" />

                  Creating Order...
                </div>
              ) : (
                "Launch Order 🚀"
              )}
            </button>
          </form>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">
          {/* PREVIEW */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 shadow-2xl sticky top-8">
            <h2 className="text-2xl font-bold mb-6">
              Live Preview
            </h2>

            {selectedService ? (
              <div className="space-y-5">
                <div>
                  <div className="text-zinc-500 text-sm mb-1">
                    Service
                  </div>

                  <div className="font-semibold text-lg">
                    {selectedService.name}
                  </div>
                </div>

                <div>
                  <div className="text-zinc-500 text-sm mb-1">
                    Type
                  </div>

                  <div className="font-semibold">
                    {selectedService.type}
                  </div>
                </div>

                {formData.quantity && (
                  <div>
                    <div className="text-zinc-500 text-sm mb-1">
                      Quantity
                    </div>

                    <div className="font-semibold">
                      {
                        formData.quantity
                      }
                    </div>
                  </div>
                )}

                {estimatedPrice && (
                  <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-5">
                    <div className="text-emerald-400 text-sm mb-1">
                      Estimated Price
                    </div>

                    <div className="text-3xl font-black text-emerald-300">
                      $
                      {
                        estimatedPrice
                      }
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-zinc-800">
                  <div className="text-zinc-500 text-sm mb-2">
                    Delivery
                  </div>

                  <div className="text-white font-medium">
                    Usually instant ⚡
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-zinc-500 leading-relaxed">
                Select a service to preview
                your order details.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}