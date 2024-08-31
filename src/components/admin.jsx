import React, { useEffect, useState } from "react";
import styles from "./admin.module.css"
import { Link } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading"


const AddComp = () => {

    const[name, setName] = useState("")
    const[p_Id, setP_Id] = useState(0)
    const[price, setPrice] = useState(0)
    const[discount, setDiscount] = useState(0)


    const handleAddProduct = (event) => {
        event.preventDefault();
        axios.post("http://localhost:5000/admin/add",{
            p_id : p_Id,
            name : name,
            price : price,
            discount : discount
        },{headers: {
            Authorization: `Bearer ${localStorage.getItem('session')}`
        }})
        .then((res) => {
            if(res.data.success){
                setName("")
                setP_Id(0)
                setPrice(0)
                setDiscount(0)
                window.alert(`Product ${p_Id} Successfully Added`)
            }})
        .catch(err => window.alert(`something went worng \n ${err.message}`))
    }

    return(
        <div className={styles.add}>
            <form className={styles.form} onSubmit={handleAddProduct}>
                <label htmlFor="id">Product ID</label>
                <input type="number"
                    id="id" 
                    name="p_id" 
                    required
                    value={p_Id}
                    onChange={e => setP_Id(e.target.value)}/>

                <label htmlFor="name">Product Name </label>
                <input type="text" 
                    id="name" 
                    name="name"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}/>

                <label htmlFor="price">Price </label>
                <input type="text" 
                    name="price" 
                    id="price" 
                    required
                    value={price}
                    onChange={e => setPrice(e.target.value)}/>

                <label htmlFor="discount">Discount Price</label>
                <input type="text" 
                    name="discount" 
                    id="discount" 
                    required
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}/>

                <input type="submit" value="ADD ITEM"/>
            </form>
            <br />
            <h3 className={styles.note}>NOTE: Product ID cannot be changed once it is added</h3>
        </div>
    )
}

const UpdateComp = () => {
    
    const[id, setId] = useState(0)
    const[Value, setValue] = useState("name")
    const[updateValue, setUpdateValue] = useState("")

    
    
    const handleUpdateProduct = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/admin/update/${parseInt(id)}`,{
            [Value] : updateValue
        },{headers: {
            Authorization: `Bearer ${localStorage.getItem('session')}`
        }})
        .then((res) => {
            if(res.data.success){
                window.alert(`Product ID ${id} is Successfully Updated`)
                setId(0)
                setUpdateValue("")
                setValue('name')
            }
        })
        .catch(err => window.alert(`Something went wrong with product ${id} \n ${err.message}`))
    }

    return(
        <div className="update">
            <form className={styles.form} onSubmit={handleUpdateProduct}>
            <label htmlFor="id">Product ID</label>
                <input
                    type="number"
                    id="id"
                    name="p_id"
                    value={id}
                    onChange={e => setId(e.target.value)}
                    required
                />

                <label htmlFor="option">Select an option</label>
                <select 
                    id="option"
                    value={Value}
                    onChange={e => setValue(e.target.value)}> 
                    <option value="name">Product Name</option>
                    <option value="price">Product Price</option>
                    <option value="discount">Product Discount</option>
                </select>

                <label htmlFor="selected">Enter {Value}</label>
                <input 
                    type={Value === "name" ? "text" : "number"} 
                    id="selected"
                    value={updateValue}
                    onChange={e => setUpdateValue(e.target.value)}/>


                <input type="submit" value="UPDATE ITEM"/>
            </form>
            <br />
            <p>Enter the details of the product to updated</p><br />
            <h3 className={styles.note}>NOTE: Product ID shall not be updated</h3>
        </div>
    )
}

const DelComp = () => {

    const[d_id, setd_id] = useState(0)


    const handleDeleteProduct = (e) => {
        e.preventDefault()
        axios.delete(`http://localhost:5000/admin/delete/${d_id}`, {headers: {
            Authorization: `Bearer ${localStorage.getItem('session')}`
        }})
        .then((res) => {
            if(res.data.success){
                window.alert(`Product ${d_id} Successfully Deleted...`)
                setd_id(0)
            }
        })
        .catch(err => window.alert(`Something went wrong \n ${err.message}`))
    }

    return(
        
        <div className={styles.delete}>
            <form className={styles.form} onSubmit={handleDeleteProduct}>
                <label htmlFor="d_id">Product Id </label>
                <input type="number" 
                    name="d_id" 
                    id="d_id" 
                    required
                    value={d_id}
                    onChange={e => setd_id(e.target.value)}/>

                <input type="submit" value="Delete Item"/>
            </form>
        </div>
    )
}

export default function Admin(){
    const[cont, setcont] = useState(0)
    const[auth, setAuth] = useState(false)
    const[item, setItem] = useState([])

    const session = localStorage.getItem('session')
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (session) {
                    const response = await axios.get("http://localhost:5000/admin", {
                        headers: {
                            Authorization: `Bearer ${session}`
                        }
                    });
    
                    if (response.data.success) {
                        setAuth(true);
                        setItem(response.data.value);
                        console.log('Authenticated:', response.data.success);
                    } else {
                        setAuth(false);
                        window.alert('Authentication failed.');
                    }
                }
            } catch (error) {
                window.alert(`Error: ${error.message}`);
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []); // Empty dependency array to ensure it runs only once on component mount
    
    const handleLogout = () => {
        localStorage.removeItem('session');
        setAuth(false);
        console.log("logged out")
    }

    let ComponentToRender;

    switch (cont) {
    case 1:
        ComponentToRender = AddComp;
        break;
    case 2:
        ComponentToRender = UpdateComp;
        break;
    case 3:
        ComponentToRender = DelComp;
        break;
    }
        

        return(
            <>{auth ? 
            <div className={styles.admin}>
            
                <div className={styles.options}>
                    <div className={styles.links}>
                        <Link to="/" className={styles.link4} onClick={handleLogout} >Logout</Link>
                        <Link to="/admin/register" className={styles.link4} >New Register</Link>
                    </div>

                    <div className={styles.buttons}>
                        <button className={styles.button} onClick={() => setcont(0)}>View</button>
                        <button className={styles.button} onClick={() => setcont(1)}>Add Item</button>
                        <button className={styles.button} onClick={() => setcont(2)}>Update Item</button>
                        <button className={styles.button} onClick={() => setcont(3)}>Delete Item</button>
                    </div>
                </div>

                <div className={styles.details}>
                    {cont == 0?
                        <ul className={styles.info}>
                            <li className={styles.l1}>Total Turnover : {item[0]} </li>
                            <li className={styles.l1}>No of Products : {item[1]} </li>
                        </ul>
                    :<ComponentToRender/>}
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

)}