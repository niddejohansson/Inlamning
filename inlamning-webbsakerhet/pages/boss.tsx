import styles from "../styles/Boss.module.css";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";

const Boss = () => {
  const router = useRouter();
  const registerWorker = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, cookie } = document.forms[0];
    console.log(cookie);

    const regInformation = await Axios.post(
      "http://localhost:4000/api/register",
      {
        username: username.value,
        email: email.value,
        password: password.value,
        role: "worker",
      }
    );
    console.log(regInformation);
  };
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
    <div className={styles.pageContainer}>
      <h1>DU ÄR BOSS</h1>
      <section className={styles.bossContainer}>
        <form className={styles.bossForm} onSubmit={registerWorker}>
          <input
            className={styles.bossField}
            type="text"
            placeholder="Ny användare"
            name="username"
          ></input>
          <input
            className={styles.bossField}
            type="password"
            placeholder="Ny användares lösenord"
            name="password"
          ></input>
          <input
            className={styles.bossField}
            type="email"
            placeholder="Ny användares email"
            name="email"
          ></input>
          <button className={styles.bossButton} type="submit">
            Skapa användare
          </button>
        </form>
      </section>
      <button className={styles.logoutButton} onClick={logoutUser}>
        Logga ut
      </button>
      <div className={styles.listWorkers}>List of your coworkers:</div>
    </div>
  );
};

export default Boss;
