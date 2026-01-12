import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

 
  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData?.token && authData?.user) {
      setIsLoggedIn(true);
      setUser(authData.user);
    }
  }, []);

 
  const login = (authData) => {
    localStorage.setItem("auth", JSON.stringify(authData));
    setIsLoggedIn(true);
    setUser(authData.user);
  };


  const logout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
