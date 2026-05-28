 
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "../firebase/firebase";

const AuthCtx = createContext(null);

const googleProvider =
  new GoogleAuthProvider();

export function AuthProvider({
  children,
}) {
  // =========================
  // States
  // =========================

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  // =========================
  // Auth Listener
  // =========================

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  // =========================
  // Login
  // =========================

  const login = async (
    email,
    password
  ) => {
    try {
      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      return {
        success: true,
        user:
          userCredential.user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          getFirebaseError(
            error.code
          ),
      };
    }
  };

  // =========================
  // Register
  // =========================

  const register = async (
    name,
    email,
    password
  ) => {
    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      await updateProfile(
        userCredential.user,
        {
          displayName: name,
        }
      );

      return {
        success: true,
        user:
          userCredential.user,
      };
    } catch (error) {
      return {
        success: false,
        message:
          getFirebaseError(
            error.code
          ),
      };
    }
  };

  // =========================
  // Google Login
  // =========================

  const loginWithGoogle =
    async () => {
      try {
        const result =
          await signInWithPopup(
            auth,
            googleProvider
          );

        return {
          success: true,
          user: result.user,
        };
      } catch (error) {
        return {
          success: false,
          message:
            getFirebaseError(
              error.code
            ),
        };
      }
    };

  // =========================
  // Forgot Password
  // =========================

  const forgotPassword =
    async (email) => {
      try {
        await sendPasswordResetEmail(
          auth,
          email
        );

        return {
          success: true,
        };
      } catch (error) {
        return {
          success: false,
          message:
            getFirebaseError(
              error.code
            ),
        };
      }
    };

  // =========================
  // Logout
  // =========================

  const logout = async () => {
    try {
      await signOut(auth);

      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message:
          getFirebaseError(
            error.code
          ),
      };
    }
  };

  // =========================
  // Error Handler
  // =========================

  const getFirebaseError = (
    code
  ) => {
    switch (code) {
      case "auth/user-not-found":
        return "الحساب غير موجود";

      case "auth/wrong-password":
        return "كلمة المرور غير صحيحة";

      case "auth/email-already-in-use":
        return "البريد مستخدم بالفعل";

      case "auth/weak-password":
        return "كلمة المرور ضعيفة";

      case "auth/invalid-email":
        return "البريد الإلكتروني غير صالح";

      case "auth/popup-closed-by-user":
        return "تم إغلاق نافذة Google";

      case "auth/network-request-failed":
        return "تحقق من اتصال الإنترنت";

      default:
        return "حدث خطأ غير متوقع";
    }
  };

  // =========================
  // Provider
  // =========================

  return (
    <AuthCtx.Provider
      value={{
        user,
        loading,

        login,
        register,

        loginWithGoogle,

        forgotPassword,

        logout,

        isAuthenticated:
          !!user,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () =>
  useContext(AuthCtx);

export default AuthProvider;
