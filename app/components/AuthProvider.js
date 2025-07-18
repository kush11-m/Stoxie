// AuthProvider.js
// Provides authentication context using React Context API and useState

"use client";
import { createContext, useContext, useState, useEffect } from "react";

// Create AuthContext
const AuthContext = createContext();

// AuthProvider component wraps children with AuthContext.Provider
export default function AuthProvider({ children }) {
  // State for user
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("stoxie_user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("stoxie_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("stoxie_user");
    }
  }, [user]);

  // Login function (could be extended to call an API)
  const login = (username) => setUser({ username });
  // Logout function
  const logout = () => setUser(null);
  // Signup function (could be extended to call an API)
  const signup = (username) => setUser({ username });

  // Provide user and auth functions to children
  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming AuthContext
export function useAuth() {
  return useContext(AuthContext);
} 