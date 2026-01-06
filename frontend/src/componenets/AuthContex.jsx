import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [role,setRole] = useState(null)

  const path = import.meta.env.VITE_SERVER;

  const checkAuth = async () => {
    try {
      const res = await axios.get(`${path}/user/me`, {
        withCredentials: true,
      });

      setLoggedIn(res.data.loggedIn);
      setRole(res.data.role)
    } catch {
      setLoggedIn(false);
      setRole(null)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{ loggedIn, setLoggedIn, checkAuth, loading,setLoading ,role,setRole}}
    >
      {children}
    </AuthContext.Provider>
  );    
};

export const useAuth = () => useContext(AuthContext);
