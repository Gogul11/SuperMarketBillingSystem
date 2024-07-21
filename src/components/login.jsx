import React from "react";
import {user} from "../img"
import styles from "./login.module.css"
import { Link } from "react-router-dom";

export default function Login(){

    return(
        <div className={styles.login}>
            <img className={styles.logo} src={user} alt="user-img" />

            <p className={styles.title}>Supermarkert Name</p>

            <form className={styles.form}>

                <label htmlFor="username">Admin Name</label>
                <input className={styles.input} type="text" name="username" id="username" required/>

                <label htmlFor="password">Password</label>
                <input className={styles.input} type="password" name="password" id="password" required/>

                <Link to="/admin" className={styles.link3}>LOGIN</Link>
            </form>

            <Link to="/" className={styles.link3}>BACK</Link>
        </div>
    )
}