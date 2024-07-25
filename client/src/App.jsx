import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Admin from './pages/Admin'
import { Toaster } from 'react-hot-toast'
import AdminLayout from './Layouts/AdminLayout'
import PublicLayout from './Layouts/PublicLayout'
import { useDispatch } from 'react-redux'
import { updateUser } from './redux/AuthSlice'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateUser())
  }, [])
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>


          <Route path='home' element={<Home />} />


          <Route path='/admin' element={<AdminLayout />}>
            <Route index element={<Admin />} />

          </Route>
          <Route path='/' element={<PublicLayout />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />




        </Routes>
      </BrowserRouter>
    </>
  )
}
