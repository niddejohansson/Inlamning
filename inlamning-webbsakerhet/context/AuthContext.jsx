import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [routeLoggedOutUser, setRouteLoggedOutUser] = useState(false);
  const [routeLoggedInUser, setRouteLoggedInUser] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUsers = async () => {
      const response = await fetch("http://localhost:4000/api/getcurrentuser", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      //här måste jag kolla om res är status 400
      if (response.status === 400) {
        console.log("fel i jwttoken");
        setRouteLoggedOutUser(true);
        if (routeLoggedOutUser) {
          router.push("http://localhost:3000/");
        }
      }
      //console.log("efter fetch");

      const visitingUser = await response.json();
      //console.log(visitingUser);
      if (!visitingUser.username) {
        console.log("ingen användare inne i fetch current user");
        router.push("http://localhost:3000/");
        return;
      }
      setUser(visitingUser);

      //console.log("context", visitingUser);
    };
    fetchCurrentUsers();
  }, []);

  useEffect(() => {
    //console.log("i authcontext", user);
    if (user.username === undefined) {
      setRouteLoggedOutUser(true);
      if (routeLoggedOutUser) {
        router.push("http://localhost:3000/");
      }
    }
    if (user.username !== undefined) {
      setRouteLoggedInUser(true);
      if (routeLoggedInUser) {
        if (router.pathname !== "/" + user.role) {
          router.push("/" + user.role);
        }
      }
    }
  }, [user]);

  useEffect(() => {});

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
