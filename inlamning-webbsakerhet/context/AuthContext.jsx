import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [routeLoggedOutUser, setRouteLoggedOutUser] = useState(false);
  const [routeLoggedInUser, setRouteLoggedInUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUsers = async () => {
      const response = await fetch("http://localhost:4000/api/getcurrentuser", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const visitingUser = await response.json();
      if (!user) {
        console.log("ingen användare inne i fetch current user");
        return;
      }
      setUser(visitingUser);

      console.log("context", visitingUser);
    };
    fetchCurrentUsers();
  }, []);

  useEffect(() => {
    console.log("i authcontext", user);
    if (user.username === undefined) {
      setRouteLoggedOutUser(true);
    }
    if (user.username !== undefined) {
      setRouteLoggedInUser(true);
    }
    if (routeLoggedOutUser) {
      router.push("http://localhost:3000/");
    }
    if (routeLoggedInUser) {
      if (router.pathname !== "/" + user.role) {
        router.push("/" + user.role);
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
