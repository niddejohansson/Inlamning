import { createContext, useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [routeLoggedOutUser, setRouteLoggedOutUser] = useState(false);
  const [routeLoggedInUser, setRouteLoggedInUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUsers = async () => {
      const response = await fetch("http://localhost:4000/api/getcurrentuser", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 400) {
        setRouteLoggedOutUser(true);
        if (routeLoggedOutUser) {
          router.push("http://localhost:3000/");
        }
      }

      const visitingUser = await response.json();
      if (!visitingUser.username) {
        router.push("http://localhost:3000/");
        return;
      }
      setUser(visitingUser);
    };
    fetchCurrentUsers();
  }, []);

  useEffect(() => {
    if (user?.username === undefined) {
      setRouteLoggedOutUser(true);
      if (routeLoggedOutUser) {
        router.push("http://localhost:3000/");
      }
    }
    if (user?.username !== undefined) {
      setRouteLoggedInUser(true);
      if (routeLoggedInUser) {
        if (router.pathname !== "/" + user.role) {
          router.push("/" + user.role);
        }
      }
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
