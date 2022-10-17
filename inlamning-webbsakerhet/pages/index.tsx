import styles from '../styles/Index.module.css'

const Home = () => {
  return (
    <div className={styles.pageContainer}>
      <section className={styles.loginContainer}>
        <form className={styles.loginForm}>
          <input className={styles.loginField} placeholder="Användarnamn"></input>
          <input className={styles.loginField} placeholder="Lösenord"></input>
          <button className={styles.loginButton}>Logga in</button>
        </form>
      </section>
    </div>
  )
}

export default Home
