import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

// Create context
export const AuthContext = createContext();

// Custom Hook
export const useAuth = () => useContext(AuthContext);

// Provider component
const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Signup
  const signup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully ✅");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  // Login
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully ✅");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };
  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      toast.info("Logged out 👋");
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Persist Login State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Context Value
  const value = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
