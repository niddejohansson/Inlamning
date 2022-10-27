import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch("http://localhost:4000/api/getallusers");
      //response.data.json();
      console.log(await response.json());
    };
    fetchAllUsers();
  }, []);

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
