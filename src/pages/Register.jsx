 
import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  HiEye,
  HiEyeSlash,
} from "react-icons/hi2";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate =
    useNavigate();

  const { register } =
    useAuth();

  const [form, setForm] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [showPw, setShowPw] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.password
    ) {
      toast.error(
        "أكمل جميع الحقول"
      );

      return;
    }

    if (
      form.password.length < 6
    ) {
      toast.error(
        "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
      );

      return;
    }

    try {
      setLoading(true);

      const result =
        await register(
          form.name,
          form.email,
          form.password
        );

      if (!result.success) {
        toast.error(
          result.message
        );

        return;
      }

      toast.success(
        "تم إنشاء الحساب 🎉"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        "حدث خطأ أثناء التسجيل"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-[#0b0e1a]">

      <div className="w-full max-w-md bg-white dark:bg-[#111827] border border-gray-100 dark:border-[#1e2a45] rounded-3xl p-8">

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4 text-black dark:text-white text-400"
        >

          <input
            type="text"
            placeholder="الاسم"
            value={form.name}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                name:
                  e.target.value,
              }))
            }
            className="w-full bg-gray-50 dark:bg-[#0b0e1a] border border-gray-200 dark:border-[#1e2a45] rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
          />

          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={form.email}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                email:
                  e.target.value,
              }))
            }
            className="w-full bg-gray-50 dark:bg-[#0b0e1a] border border-gray-200 dark:border-[#1e2a45] rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
          />

          <div className="relative">

            <input
              type={
                showPw
                  ? "text"
                  : "password"
              }
              placeholder="كلمة المرور"
              value={
                form.password
              }
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  password:
                    e.target.value,
                }))
              }
              className="w-full bg-gray-50 dark:bg-[#0b0e1a] border border-gray-200 dark:border-[#1e2a45] rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <button
              type="button"
              onClick={() =>
                setShowPw(
                  (p) => !p
                )
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPw ? (
                <HiEyeSlash
                  size={18}
                />
              ) : (
                <HiEye
                  size={18}
                />
              )}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-60"
          >
            {loading
              ? "جاري إنشاء الحساب..."
              : "إنشاء حساب"}
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-6">

          لديك حساب بالفعل؟{" "}

          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}


