import styles from '../styles/Admin.module.css'


const Admin = () => {
  return (
    <div className={styles.pageContainer}>  
      <section className={styles.adminContainer}>
        <article className={styles.adminForm}>
          <input className={styles.adminField} type="text" placeholder="Ny användare"></input>
          <input className={styles.adminField} type="password" placeholder="Ny användares lösenord"></input>
          <button className={styles.adminButton}>Skapa användare</button>
        </article>  
    </section>
      <div className={styles.listBosses}>
        List of bosses:
      </div>
    </div>
  )
}

export default Admin
