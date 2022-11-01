import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUsers = async () => {
      const response = await fetch("http://localhost:4000/api/getcurrentuser", {
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const visitingUser = await response.json();
      if (!user) {
        return;
      }
      setUser(visitingUser);

      console.log("context", visitingUser);
    };
    fetchCurrentUsers();
  }, []);

  useEffect(() => {
    console.log("i authcontext");
    if (user.username !== undefined) {
      console.log(router, user.role);
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
