import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  const fetchUser = async () => {
    try {
      const res = await axios.get(SERVER_URL + "/userData", {
        withCredentials: true,
      });

      if (res.data.success) {
        console.log(res.data.user);
        
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

  useEffect(() => {
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
