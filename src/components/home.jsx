import React, { useState } from "react";
import {customer } from "../img";
import styles from './home.module.css'
import { Link } from "react-router-dom";

const date = new Date()


export default function Home(){

    return(
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
    )
}