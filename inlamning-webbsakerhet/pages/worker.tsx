import styles from "../styles/Worker.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const Worker = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/getcurrentuser",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.role !== "worker") {
          router.push("/");
        }
        if (data.role === "worker") {
          setLoading(true);
        }
        console.log("data i fetchrole  :", data);
      } catch (err) {
        console.log("error i fetchrole  :", err);
        const res = await fetch("http://localhost:4000/api/logout", {
          method: "GET",
          credentials: "include",
        });
        console.log(res);
        if (res.status === 204) {
          router.push("/");
        }
      }
    };
    fetchRole();
  }, []);

  async function logoutUser() {
    const res = await fetch("http://localhost:4000/api/logout", {
      method: "GET",
      credentials: "include",
    });
    console.log(res);
    if (res.status === 204) {
      router.push("/");
    }
  }
  return loading ? (
    <div className={styles.container}>
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
