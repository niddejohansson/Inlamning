import { createContext, useEffect, useState } from "react";
require("dotenv").config();
import { db, pool } from "../../api-express/database";

export const AuthContext = createContext();

export const AllContextProvider = ({ children }) => {
  const [isWorker, setIsWorker] = useState(false);
  const [isBoss, setIsBoss] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  console.log();

  useEffect(() => {
    db.getRoles = () => {
      return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM Users WHERE role = ?";
        pool.query(sql, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };
    getRoles();
    console.log(sql);
  }, [sql]);

  return (
    <AllContext.Provider
      value={{
        isWorker,
        setIsWorker,
        isBoss,
        setIsBoss,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </AllContext.Provider>
  );
};
