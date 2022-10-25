import styles from "../styles/Admin.module.css";
import React, { useState } from "react";
import Axios from "axios";

const Admin = () => {
  const registerBoss = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password } = document.forms[0];

    const regInformation = await Axios.post(
      "http://localhost:4000/api/register",
      {
        username: username.value,
        email: email.value,
        password: password.value,
        role: "boss",
      }
    );
    console.log(regInformation);
  };
  return (
    <div className={styles.pageContainer}>
      <section className={styles.adminContainer}>
        <form className={styles.adminForm} onSubmit={registerBoss}>
          <input
            className={styles.adminField}
            type="text"
            placeholder="Ny användare"
            name="username"
          ></input>
          <input
            className={styles.adminField}
            type="password"
            placeholder="Ny användares lösenord"
            name="password"
          ></input>
          <input
            className={styles.adminField}
            type="email"
            placeholder="Ny användares email"
            name="email"
          ></input>
          <button className={styles.adminButton} type="submit">
            Skapa användare
          </button>
        </form>
      </section>
      <div className={styles.listBosses}>List of bosses:</div>
    </div>
  );
};

export default Admin;
