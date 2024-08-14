import React, { useEffect, useState } from "react";
import {user} from "../img"
import styles from "./login.module.css"
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading"


export default function Login(){

    const[name, setName] = useState("")
    const[password, setPassword] = useState("")
    const[auth, setAuth] = useState(false)
    
    const handleLogin = async() => {
        await axios.post("http://localhost:5000/admin/login", {
            username: name,
            password: password
        })
        .then(res => {
                if(res.data.success) localStorage.setItem('session',res.data.authenticate)
                if(!res.data.success) window.alert(res.data.message)})
        .catch(err => window.alert(err.message))
    }

    useEffect(() => {
        axios.get("http://localhost:5000/admin/login")
            .then((res) => {if(res.data.success) setAuth(true)})
            
    }, [])

    return(
        <>
        {auth?
        <div className={styles.login}>
            <img className={styles.logo} src={user} alt="user-img" />

            <p className={styles.title}>Supermarkert Name</p>

            <form className={styles.form}>

                <label htmlFor="username">Admin Name</label>
                <input className={styles.input} 
                    type="text" 
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

                <Link 
                    to="/admin" 
                    className={styles.link3}
                    onClick={handleLogin}>LOGIN</Link>
            </form>

            <Link to="/" className={styles.link3}>BACK</Link>
        </div>
        :
            <div className="loadingComp">
                <ReactLoading
                    type="spinningBubbles"
                    color="#D9D9D9"
                    height={200}
                    width={200}
                />
            </div>
        }
        </>

    )
}