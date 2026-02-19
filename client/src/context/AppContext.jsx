"use client";
import { createContext, useEffect, useState } from "react";
import api from "@/lib/api";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/userData");

      if (res.data.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

    // Avoid fetching user on auth pages or while a redirect is happening
    useEffect(() => {
      try {
        const pathname = window.location.pathname;
        if (pathname === "/login" || window.__redirectingToLogin) return;
      } catch (e) {}

      fetchUser();
    }, []);

  const value = {
    user,
    setUser,
    isLoggedIn: !!user,
    loadingUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
