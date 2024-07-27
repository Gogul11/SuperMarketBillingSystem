import React, { useEffect, useState } from "react";
import styles from "./bill.module.css"
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading"

export default function Bill(){

    const[auth, setauth] = useState(false)
    const[Product, setProduct] = useState(null)
    
    const[singleProduct, setSingleProduct] = useState({})
    const[productlist, setProductList] = useState([])

    const[id, setid] = useState(0)
    const[quantity, setquantity] = useState(1)


    useEffect(() => {
        axios.get("http://localhost:5000/bill")
        .then((res) => {
                        setauth(res.data.success)
                        setProduct(res.data.products)
                    })
        .catch(err => console.log(err))
    }, [auth])
    
    const findproduct = () => {
        const foundProduct = Product.find((ele) => ele.p_id === parseInt(id));
        if (foundProduct) {
            setSingleProduct(foundProduct);
        } else {
            setSingleProduct({});
        }
        setid(0)
    }

    const addProduct = () => {
        if(singleProduct.p_id){
            
            singleProduct.quantity = parseInt(quantity)
            const finalPrice = parseInt(singleProduct.price) - (parseInt(singleProduct.price) * (parseInt(singleProduct.discount)/100))
            singleProduct.total = finalPrice * parseInt(quantity)
            setProductList([...productlist,singleProduct])
            setSingleProduct({})
        }
    }

    var amt = 0
    productlist.map((item) => (amt+=item.total))

    return(
        <>
        {auth? 
        <div className={styles.bill}>
            <div className={styles.div1}>
                <div>
                    <p className={styles.p}>Supermarket Name</p>
                </div>

                <div className={styles.items}>
                    <div className={styles.tc}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Discount</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                </tr>
                            </thead>

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
                    <div>
                        <p className={styles.amt}>Total Bill : {amt}</p>
                        <Link to="/bill/payment"
                        state={{ productlist,amt }}
                        className={styles.link1}>Pay</Link>
                    </div>
                </div>

            </div>

            <div className={styles.div2}>
                <div>
                    <Link to="/" className={styles.link1}>HOME</Link>
                </div>
            
                <div className={styles.addItem}>
                    <div>
                        <div>
                            <label htmlFor="id">Product ID : </label>&nbsp;&nbsp;
                            <input type="number" 
                                value={id} 
                                id="id" 
                                name="p_id" 
                                required
                                onChange={e => setid(e.target.value)}/>&nbsp;&nbsp;
                            <button 
                                className={styles.button}
                                onClick={findproduct}>Search</button>
                        </div>
                    </div>

                    <div>
                        <table>
                            <tbody>

                            <tr>
                                <td>Product Name</td>
                                <td>:</td>
                                <td>{singleProduct.name}</td>
                            </tr>

                            <tr>
                                <td>Price</td>
                                <td>:</td>
                                <td>{singleProduct.price}</td>
                            </tr>

                            <tr>
                                <td >Discount</td>
                                <td>:</td>
                                <td>{singleProduct.discount}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div>
                        <label htmlFor="quantity">Quantity : </label>&nbsp;&nbsp;
                        <input 
                            type="number" 
                            id="quntity"
                            onChange={e => setquantity(e.target.value)}/><br /><br />
                        <button 
                            type="button" 
                            className={styles.button}
                            onClick={addProduct}>ADD PRODUCT</button>
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