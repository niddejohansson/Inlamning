import styles from "../styles/Admin.module.css";
import React, { useState, useEffect } from "react";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";

const Admin = () => {
  const registerBoss = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password } = document.forms[0];

    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        role: "boss",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  function logout() {
    console.log("här ska man loggas ut");
  }

  return (
    <div className={styles.pageContainer}>
      <h1>DU ÄR ADMIN</h1>
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
      <button className={styles.logoutButton} onClick={logout}>
        Logga ut
      </button>
      <div className={styles.listBosses}>List of bosses:</div>
    </div>
  );
};

export default Admin;
