import styles from "../styles/Boss.module.css";
import React, { useState } from "react";
import Axios from "axios";

const Boss = () => {
  const registerWorker = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password } = document.forms[0];

    const regInformation = await Axios.post(
      "http://localhost:4000/api/register",
      {
        username: username.value,
        email: email.value,
        password: password.value,
      }
    );
    console.log(regInformation);
  };

  return (
    <div className={styles.pageContainer}>
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
      <div className={styles.listWorkers}>List of your coworkers:</div>
    </div>
  );
};

export default Boss;
