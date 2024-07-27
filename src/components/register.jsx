import React, { useEffect, useState } from "react";
import {user} from "../img"
import styles from "./login.module.css"
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register(){

    const[name, setName] = useState(" ")
    const[password, setPassword] = useState(" ")
    const[auth, setAuth] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:5000/admin/register", {headers: {
            Authorization: `Bearer ${localStorage.getItem('session')}`
        }})
        .then(res => setAuth(res.data.success))
        .catch(err => window.alert(err.message))
    })

    const handleRegister = () => {
        axios.post("http://localhost:5000/admin/register", {
            username : name,
            password : password
        },{headers: {
            Authorization: `Bearer ${localStorage.getItem('session')}`
        }})
        .then((res) => {
            if(res.data.success){
                window.alert(`User ${name} registered successfully`)
            }
        })
        .catch(err => window.alert(`Something went wrong \n ${err.message}`))
    }

    return(
        <>{auth ? 
        <div className={styles.login}>
            <img className={styles.logo} src={user} alt="user-img" />

            <p className={styles.title}>Supermarkert Name</p>
            <p className={styles.title}>New registration</p>

            <form className={styles.form}>

                <label htmlFor="username">Name</label>
                <input className={styles.input} type="text" 
                    name="username" 
                    id="username" 
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required/>

                <label htmlFor="password">Password</label>
                <input className={styles.input} 
                    type="password" 
                    name="password" 
                    id="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required/>

                <Link to="/admin/login" 
                    className={styles.link3}
                    onClick={handleRegister}>Register</Link>
            </form>

            <Link to="/" className={styles.link3}>BACK</Link>
        </div>
        : <h1>404 error</h1>}
        </>
    )
}