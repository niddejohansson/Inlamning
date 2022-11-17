import styles from "../styles/Index.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const { user, setUser } = useAuthContext();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wrongInput, setWrongInput] = useState(false);

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

        if (!data.role) {
          return;
        }
        router.push("/" + data.role);
      } catch (err) {
        console.log(err);
        const res = await fetch("http://localhost:4000/api/logout", {
          method: "GET",
          credentials: "include",
        });
        if (res.status === 204) {
          router.push("/");
        }
      }
    };
    fetchRole();
  }, []);

  async function login() {
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    setUser(data);
    if (!data.role) {
      setWrongInput(true);
      return;
    }
    router.push("/" + data.role);
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
          {wrongInput ? (
            <p style={{ color: "red" }}>Fel lösenord eller användarnamn</p>
          ) : (
            ""
          )}
          <button className={styles.loginButton} onClick={login}>
            Logga in
          </button>
        </section>
      </section>
    </div>
  );
};

export default Home;
