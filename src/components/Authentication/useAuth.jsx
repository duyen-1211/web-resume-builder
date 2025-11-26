import React, { useState, useEffect, createContext, useContext } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Navigate } from "react-router-dom";

// ***************** Firebase Initialization ************************
const firebaseConfig = {
  apiKey: "test",
  authDomain: "test",
  projectId: "test",
  storageBucket: "test",
  messagingSenderId: "test",
  appId: "test",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext(null);

// Provider cho toàn app
export const AuthProvider = ({ children }) => {
  const authValue = useProvideAuth();
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

// Hook để gọi nhanh useAuth() trong các component khác
export const useAuth = () => useContext(AuthContext);

//***************** Private Route (v6 syntax) ************************
export const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // Tránh lỗi khi chạy server-side: kiểm tra window tồn tại
  const isInIframe =
    typeof window !== "undefined" ? window.self !== window.top : false;

  // Nếu chưa đăng nhập và KHÔNG phải iframe (tức là truy cập trực tiếp) → redirect
  if (!user && !isInIframe) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã login, hoặc đang trong iframe (react-to-print) → render children
  return children;
};

//***************** Custom Auth Logic ************************
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loadingAuthState, setLoadingAuthState] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? getUser(firebaseUser) : null);
      setLoadingAuthState(false);
    });
    return () => unsubscribe();
  }, []);

  const getUser = (firebaseUser) => {
    if (!firebaseUser) return null;
    const { email, displayName, photoURL } = firebaseUser;
    return { email, name: displayName, photo: photoURL, uid: firebaseUser.uid };
  };

  // sign in with Google
  const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();

    // ⭐ BẮT GOOGLE HIỆN POPUP CHỌN TÀI KHOẢN
    provider.setCustomParameters({
      prompt: "select_account"
    });

    const result = await signInWithPopup(auth, provider);

    setUser(getUser(result.user));
        return result.user;
      } catch (error) {
        console.error("Google SignIn Error:", error);
        throw error;
      }
    };

  // email/password sign in
  const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;   // ⭐ TRẢ VỀ USER
    } catch (error) {
      setAuthError("Email hoặc mật khẩu không đúng");
      return null;
    }
  };


  // sign up
  const signUp = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: name });
      setUser(getUser(result.user));
      return result.user;
    } catch (error) {
      console.error("SignUp Error:", error);
      setUser(null);
      throw error;
    }
  };

  // sign out
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      setUser(null);
      return true;
    } catch (error) {
      console.error("SignOut Error:", error);
      throw error;
    }
  };

  return {
    user,
    loadingAuthState,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };
};

export default useProvideAuth;
