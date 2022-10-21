import styles from "../styles/Index.module.css";
import React, { useState } from "react";
import Axios from "axios";

const Home = () => {
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("kommer jag in här?");

    const { username, password } = document.forms[0];

    const loginUser = await Axios.post("http://localhost:4000/api/login", {
      email: username.value,
      password: password.value,
    });
    console.log(loginUser);
  };
  return (
    <div className={styles.pageContainer}>
      <section className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={login}>
          <input
            type="text"
            className={styles.loginField}
            placeholder="Email"
            name="username"
          ></input>
          <input
            type="text"
            className={styles.loginField}
            placeholder="Lösenord"
            name="password"
          ></input>
          <button className={styles.loginButton} type="submit">
            Logga in
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;
