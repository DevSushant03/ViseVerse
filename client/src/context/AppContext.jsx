import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [isLoggedIn, setisLoggedIn] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("isLoggedIn");
    if (stored === "true") {
      setisLoggedIn(true);
    }
  }, []);

  const value = { isLoggedIn, setisLoggedIn };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
