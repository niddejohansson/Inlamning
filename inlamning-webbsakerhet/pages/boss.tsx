import styles from "../styles/Boss.module.css";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
type user = {
  username: string;
  email: string;
};

const Boss = () => {
  const [allUsers, setAllUsers] = useState<Array<user>>([]);
  const router = useRouter();

  useEffect(() => {
    showAllWorkers();
  }, []);

  const registerWorker = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, email, password, password2 } = document.forms[0];

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
        role: "worker",
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  async function showAllWorkers() {
    const res = await fetch("http://localhost:4000/api/getallworkers");
    const data = await res.json();
    console.log("i showallworkers", data);
    setAllUsers(data);
  }

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
            type="password"
            placeholder="Ny användares lösenord igen"
            name="password2"
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
      <div className={styles.listWorkers}>
        List of your coworkers:{" "}
        {allUsers.map((user, index) => {
          return (
            <div key={index}>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Boss;
