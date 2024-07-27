import React, { useEffect, useState } from "react";
import styles from "./payment.module.css"
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ReactLoading from 'react-loading'

export default function Payment(){

    const location = useLocation()
    const { productlist, amt } = location.state || { productlist: [], amt: 0 };



    const[auth, setAuth] = useState(false)
    const[number, setNumber] = useState(null)

    useEffect(() => {

        axios.get("http://localhost:5000/bill/payment")
        .then(res => setAuth(res.data.success))

    }, [auth])

    const handlePay = (event) => {
        if(number.toString().length == 10){

            axios.post(`http://localhost:5000/bill/${parseInt(number)}/${parseInt(amt)}`,{
                bill: productlist
            })
            .then(res => console.log(res.data.success))
            .catch(err => console.log(err.message))
        }
        else {
            event.preventDefault();
            window.alert("Please enter a valid 10-digit number");
        }
    }

    const send = () => {
        window.alert("Order Confirmed")
    }

    return(
        <>
    {auth? 
        <div className={styles.payment}>

            <div className={styles.bill}>
                <p className={styles.title}>Supermarket Name</p>
                <div className={styles.billList}>
                <table className={styles.table}>
                            <tbody>
                                {productlist.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.p_id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.price}</td>
                                        <td>{item.discount}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.total}</td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                </div>
                <Link to="/bill" 
                    className={styles.link2}
                    onClick={handlePay}
                    >PAID!</Link>
            </div>

            <div className={styles.details}>
                <div>
                    <div>   
                    <label htmlFor="detail">Enter Mobile number </label><br />
                    <input 
                        type="number" value={number}
                        name="number"  
                        className={styles.input} 
                        placeholder="Mobile number"
                        onChange={e => setNumber(e.target.value)}/><br />
                    </div>

                    <div>
                    <button className={styles.button} onClick={send} type="button">Send Bill</button>
                    <p className={styles.finalpay}>TOTAL AMOUNT : {amt}</p>
                    </div>
                </div>
            </div>
        </div>
    
    :<div className="loadingComp">
        <ReactLoading
            type="spinningBubbles"
            color="#D9D9D9"
            height={200}
            width={200}
        />
    </div>}

        </>

    )
}