import styles from "../styles/Admin.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuthContext } from "../context/AuthContext";

type boss = {
  username: string;
  email: string;
};

const Admin = () => {
  const router = useRouter();
  const { user, setUser } = useAuthContext();
  const [allBosses, setAllBosses] = useState<Array<boss>>([]);
  const [wrongPasswords, setWrongPasswords] = useState(false);
  const [toShortPasswords, setToShortPasswords] = useState(false);

  useEffect(() => {
    if (user?.role === "admin") {
      showAllBosses();
    }
  }, [user]);

  async function showAllBosses() {
    const res = await fetch("http://localhost:4000/api/getallbosses", {
      credentials: "include",
    });
    const data = await res.json();
    setAllBosses(data);
  }

  const registerBoss = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setWrongPasswords(false);
    setToShortPasswords(false);

    const { username, email, password, password2 } = document.forms[0];

    if (password.value !== password2.value) {
      setWrongPasswords(true);
      return;
    }

    if (password.value.length < 6) {
      setToShortPasswords(true);
      return;
    }

    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        password2: password2.value,
        role: "boss",
      }),
    });
    const data = await response.json();
    location.reload();
  };

  async function logoutUser() {
    const res = await fetch("http://localhost:4000/api/logout", {
      method: "GET",
      credentials: "include",
    });
    if (res.status === 204) {
      setUser(null);
      router.push("/");
    }
  }

  return user?.role === "admin" ? (
    <div className={styles.pageContainer}>
      <h1>DU ÄR ADMIN {user.username}</h1>
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
            type="password"
            placeholder="Ny användares lösenord igen"
            name="password2"
          ></input>
          {wrongPasswords ? (
            <p style={{ color: "red" }}>Lösenorden är inte samma</p>
          ) : (
            ""
          )}
          {toShortPasswords ? (
            <p style={{ color: "red" }}>
              Lösenorden måste vara minst 6 tecken långt
            </p>
          ) : (
            ""
          )}
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
      <div className={styles.listBosses}>
        List of all bosses:{" "}
        {allBosses.map((boss, index) => {
          return (
            <div key={index}>
              <p>{boss.username}</p>
              <p>{boss.email}</p>
            </div>
          );
        })}
      </div>
      <button className={styles.logoutButton} onClick={logoutUser}>
        Logga ut
      </button>
    </div>
  ) : (
    ""
  );
};

export default Admin;
