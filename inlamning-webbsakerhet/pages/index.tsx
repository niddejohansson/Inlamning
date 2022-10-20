import styles from '../styles/Index.module.css'
import { useState } from 'react';
import Axios from "axios";

const Home = () => {
  const [userLoginName, setUserLoginName] = useState("")
  const [userLoginPassword, setUserLoginPassword] = useState("")
  // const [userRegisterName, setUserRegisterName] = useState("")
  // const [userRegisterPassword, setUserRegisterPassword] = useState("")

  const login = () => {
    Axios.post("http://localhost:4000/api/register", 
    { 
      username: userLoginName,
      password: userLoginPassword 
    })
  }


  return (
    <div className={styles.pageContainer}>
      <section className={styles.loginContainer}>
        <form className={styles.loginForm}>
          <input 
          type="text" 
          className={styles.loginField} 
          placeholder="Användarnamn" 
          onChange={(e) => 
          { setUserLoginName(e.target.value);
          }}></input>
          <input 
          type="text" 
          className={styles.loginField} 
          placeholder="Lösenord" 
          onChange={(e) => 
            { setUserLoginPassword(e.target.value); 
            }}></input>
          <button className={styles.loginButton} onClick={login}>Logga in</button>
        </form>
      </section>
    </div>
  )
}

export default Home
