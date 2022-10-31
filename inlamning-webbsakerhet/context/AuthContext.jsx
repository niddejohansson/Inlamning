import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  /* useEffect(() => {
    const fetchAllUsers = async () => {
      const response = await fetch("http://localhost:4000/api/getallusers");
      const visitingUser = response.data.json();

      //setUser(visitingUser.role[0])

      console.log("alla användare i databasen: ", allUsers);
    };
    fetchAllUsers();
  }, []); */

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
