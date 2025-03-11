import { createContext, useContext, useMemo, useState } from "react";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  //const [userFriends, setUserFriends] = useState(null);

  // User token
  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  useMemo(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // User Info
  const loadUserInfo = async (token, setUser) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}API/v1/users/private-info`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      const data = json.data;

      setUser(data);
    } catch (error) {
        console.error(error);
        setUser(null);
    }
  };

  useMemo(() => {
    token != "" && loadUserInfo(token, setUser);
  }, [token]);

  const userRefresh = () => loadUserInfo(token, setUser);

  // User friends
  /*const loadUserFriends = async (token, setUserFriends) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}API/v1/friends`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message);
      }

      const data = json.data;

      setUserFriends(data);
    } catch (error) {
        console.error(error);
        setUserFriends(null);
    }
  };

  useMemo(() => {
    token != "" && loadUserFriends(token, setUserFriends);
  }, [token]);

  const userFriendsRefresh = () => loadUserFriends(token, setUserFriends);*/

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        userRefresh,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
