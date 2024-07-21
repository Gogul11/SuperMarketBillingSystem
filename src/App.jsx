import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'

import Home from './components/home'
import Login from './components/login'
import Admin from './components/admin'
import Payment from './components/payment'
import Bill from './components/bill'
import Register from './components/register'

function App() {
  const[auth, setauth] = useState(false)

  useEffect(() => {
    axios.get("http://localhost:5000/").
    then(res => setauth(res.data.success))
    .catch(setauth(false))
  }, [])

  return(
    <div>
      {auth ? 
      <BrowserRouter>
          <Routes>
              <Route 
                path='/'
                element={<Home/>}/>

                <Route
                  path='/bill'
                  element={<Bill/>}/>

                <Route
                  path='/admin/login'
                  element={<Login/>}/>

                <Route
                  path='/bill/payment'
                  element={<Payment/>}/>

                  
                <Route
                  path='/admin'
                  element={<Admin/>}/>

                <Route
                  path='/admin/register'
                  element={<Register/>}/>
          </Routes>
      </BrowserRouter>
      : <>
          <h1>404 error</h1>
        </>}
    </div>
  )
  
}

export default App
