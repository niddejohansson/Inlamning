import styles from "../styles/Worker.module.css";
import React from "react";
import { useRouter } from "next/router";

const Worker = () => {
  const router = useRouter();

  async function logoutUser() {
    console.log("här ska man loggas ut");
    const res = await fetch("http://localhost:4000/api/logout", {
      method: "GET",
      credentials: "include",
    });
    console.log(res);
    if (res.status === 204) {
      router.push("/");
    }
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>DU ÄR LÖNESLAV</h1>

      <button className={styles.logoutButton} onClick={logoutUser}>
        Logga ut
      </button>
    </div>
  );
};

export default Worker;
