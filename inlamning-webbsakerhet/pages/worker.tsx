import styles from "../styles/Worker.module.css";

const Worker = () => {
  function logout() {
    console.log("här ska man loggas ut");
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>DU ÄR LÖNESLAV</h1>

      <button className={styles.logoutButton} onClick={logout}>
        Logga ut
      </button>
    </div>
  );
};

export default Worker;
