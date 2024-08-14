import React, { useEffect, useState } from "react";
import {customer } from "../img";
import styles from './home.module.css'
import { Link } from "react-router-dom";
import ReactLoading from "react-loading"
import axios from "axios";

const date = new Date()


export default function Home(){

    const[auth, setAuth] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:5000/")
            .then((res) =>  setAuth(res.data.success))
    }, [])
    return(
        <>{auth?
        <div className={styles.main}>

            <div className={styles.title}>
                <p className={styles.name}>Supermarket Name</p>
                <p>{date.toDateString()}</p>
            </div>

            <div className={styles.content}>

                <div className={styles.des}>
                    <p className={styles.moto}>
                        Your destination for fresh and <br/> 
                        tasty delights...
                    </p>
                    
                            <Link to="/bill"  className={styles.link}>Billing</Link>
                            <Link to="/admin/login" className={styles.link}>Admin login</Link>
                    
                    
                </div>

                <div className={styles.img}>
                            <img src={customer} className={styles.img1} alt="customer-img" />
                </div>

            </div>

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
        }</>

    )
}