import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      loadUserInfo(token);
    } else {
      setUser(null);
    }
  }, [token]);

  const loadUserInfo = async (authToken) => {
    if (!authToken) return;

    try {
      const response = await fetch("http://localhost:3000/api/getUserByToken", {
        headers: { Authorization: token },
        cache: "no-store",
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data);
      } else {
        throw new Error(data.message);
      }

    } catch (error) {
      console.error("Error al obtener usuario:", error);
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  /*useEffect(() => {
    if (token != "null") {
      if (token) loadUserInfo(token);
    }
  }, [token]);

  const userRefresh = async () => {
    await loadUserInfo(token, setUser);
    console.log(user);
  };*/

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        //userRefresh,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
