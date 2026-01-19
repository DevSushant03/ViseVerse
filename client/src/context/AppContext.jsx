import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // null = not logged in

  const value = {
    user,
    setUser,
    isLoggedIn: !!user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
