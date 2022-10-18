import styles from '../styles/Boss.module.css'


const Boss = () => {
  return (
    <div className={styles.pageContainer}>  
      <section className={styles.bossContainer}>
        <article className={styles.bossForm}>
          <input className={styles.bossField} type="text" placeholder="Ny användare"></input>
          <input className={styles.bossField} type="password" placeholder="Ny användares lösenord"></input>
          <button className={styles.bossButton}>Skapa användare</button>
        </article>  
    </section>
      <div className={styles.listWorkers}>
        List of your coworkers:
      </div>
    </div>
    
  )
}

export default Boss
