import styles from "../styles/Index.module.css";
import React, { useState } from "react";
import Axios from "axios";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    console.log("kommer jag in här?");

    console.log(email);

    /*     await Axios.post("http://localhost:4000/api/login", {
      email: username.value,
      password: password.value,
    })
      .then(function (response) {
        console.log(response);
        
      })
      .catch(function (err) {
        console.log(err);
      }); */

    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log(data);
  }
  return (
    <div className={styles.pageContainer}>
      <section className={styles.loginContainer}>
        <section className={styles.loginForm}>
          <input
            type="text"
            className={styles.loginField}
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></input>
          <input
            type="password"
            className={styles.loginField}
            placeholder="Lösenord"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <button className={styles.loginButton} onClick={login}>
            Logga in
          </button>
        </section>
      </section>
    </div>
  );
};

export default Home;
