import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import Sidebar from './components/Sidebar.jsx'
import { Routes, Route } from 'react-router-dom'
import Add from './pages/Add.jsx'
import List from './pages/List.jsx'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login.jsx'
import AdminReview from "./pages/AdminReview";


export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')? localStorage.getItem('token'): '');
  
  useEffect(()=>{
    localStorage.setItem('token',token);
  },[token])



  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken}/> : <>
        <Navbar setToken={setToken}/>
        <hr />
        <div className="flex w-full">
          <Sidebar/>
          <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
            <Routes>
              <Route path='/add' element={<Add/>}/>
              <Route path='/list' element={<List/>}/>
              <Route path="/adminreview" element={<AdminReview />} />
            </Routes>
          </div>
        </div>
      </>
      }
    </div>
  )
}

export default App