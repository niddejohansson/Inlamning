import styles from "../styles/Admin.module.css";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

type boss = {
  username: string;
  email: string;
};

const Admin = () => {
  const router = useRouter();
  const [allBosses, setAllBosses] = useState<Array<boss>>([]);
  const [wrongPasswords, setWrongPasswords] = useState(false);

  useEffect(() => {
    showAllBosses();
  }, []);

  async function showAllBosses() {
    const res = await fetch("http://localhost:4000/api/getallbosses");
    const data = await res.json();
    console.log("i showallworkers", data);
    setAllBosses(data);
  }

  const registerBoss = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, password2 } = document.forms[0];

    if(password !== password2) {
      setWrongPasswords(true)
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
    console.log(data);
  };

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
            type="password"
            placeholder="Ny användares lösenord igen"
            name="password2"
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
      <button className={styles.logoutButton} onClick={logoutUser}>
        Logga ut
      </button>
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
    </div>
  );
};

export default Admin;
