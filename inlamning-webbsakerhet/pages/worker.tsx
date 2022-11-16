import styles from "../styles/Worker.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

const Worker = () => {
  const { user, setUser } = useAuthContext();
  const router = useRouter();

  async function logoutUser() {
    const res = await fetch("http://localhost:4000/api/logout", {
      method: "GET",
      credentials: "include",
    });
    console.log(res);
    if (res.status === 204) {
      setUser(null);
      router.push("/");
    }
  }
  return user?.role === "worker" || user?.role[0] === "worker" ? (
    <div className={styles.workerContainer}>
      <h1 className={styles.h1}>DU ÄR LÖNESLAV</h1>

      <button className={styles.logoutButton} onClick={logoutUser}>
        Logga ut
      </button>
    </div>
  ) : (
    ""
  );
};

export default Worker;
