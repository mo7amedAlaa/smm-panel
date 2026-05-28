 
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

import { FcGoogle } from "react-icons/fc";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate =
    useNavigate();

  const {
    login,
    loginWithGoogle,
    forgotPassword,
  } = useAuth();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const [showPw, setShowPw] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [
    googleLoading,
    setGoogleLoading,
  ] = useState(false);

  const [
    resetLoading,
    setResetLoading,
  ] = useState(false);

  // =========================
  // Login
  // =========================

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.password
    ) {
      toast.error(
        "أكمل جميع الحقول"
      );

      return;
    }

    try {
      setLoading(true);

      const result =
        await login(
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
        "مرحباً بعودتك 👋"
      );

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        "حدث خطأ أثناء تسجيل الدخول"
      );

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Google Login
  // =========================

  const handleGoogleLogin =
    async () => {
      try {
        setGoogleLoading(true);

        const result =
          await loginWithGoogle();

        if (!result.success) {
          toast.error(
            result.message
          );

          return;
        }

        toast.success(
          "تم تسجيل الدخول 🎉"
        );

        navigate("/dashboard");
      } catch (error) {
        toast.error(
          "فشل تسجيل الدخول"
        );
      } finally {
        setGoogleLoading(false);
      }
    };

  // =========================
  // Forgot Password
  // =========================

  const handleForgotPassword =
    async () => {
      if (!form.email) {
        toast.error(
          "أدخل البريد الإلكتروني أولاً"
        );

        return;
      }

      try {
        setResetLoading(true);

        const result =
          await forgotPassword(
            form.email
          );

        if (!result.success) {
          toast.error(
            result.message
          );

          return;
        }

        toast.success(
          "تم إرسال رابط إعادة تعيين كلمة المرور 📩"
        );
      } catch (error) {
        toast.error(
          "حدث خطأ"
        );
      } finally {
        setResetLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0b0e1a] flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-[#1e2a45] rounded-3xl p-8 shadow-sm">

          <button
            onClick={
              handleGoogleLogin
            }
            disabled={
              googleLoading
            }
            className="w-full flex items-center justify-center gap-3 border border-gray-200 dark:border-[#243041] bg-white dark:bg-[#0f172a] hover:bg-gray-50 dark:hover:bg-[#162033] text-gray-700 dark:text-white py-3 rounded-xl transition-all duration-200 disabled:opacity-60"
          >
            <FcGoogle size={22} />

            {googleLoading
              ? "جاري تسجيل الدخول..."
              : "المتابعة باستخدام Google"}
          </button>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200 dark:bg-[#243041]" />

            <span className="text-xs text-gray-400">
              أو
            </span>

            <div className="flex-1 h-px bg-gray-200 dark:bg-[#243041]" />
          </div>

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-4 text-black dark:text-white text-400 "
          >

            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({
                  ...p,
                  email:
                    e.target.value,
                }))
              }
              placeholder="البريد الإلكتروني"
              className="w-full bg-gray-50 dark:bg-[#0b0e1a] border border-gray-200 dark:border-[#1e2a45] rounded-xl px-4 py-3 text-sm outline-none focus:border-primary"
            />

            <div className="relative">

              <input
                type={
                  showPw
                    ? "text"
                    : "password"
                }
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
                placeholder="••••••••"
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

            <div className="text-left">
              <button
                type="button"
                disabled={
                  resetLoading
                }
                onClick={
                  handleForgotPassword
                }
                className="text-xs text-primary hover:underline"
              >
                {resetLoading
                  ? "جاري الإرسال..."
                  : "نسيت كلمة المرور؟"}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl text-sm font-medium transition-all disabled:opacity-60"
            >
              {loading
                ? "جاري الدخول..."
                : "تسجيل الدخول"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-6">

            ليس لديك حساب؟{" "}

            <Link
              to="/register"
              className="text-primary hover:underline font-medium"
            >
              إنشاء حساب
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
 
