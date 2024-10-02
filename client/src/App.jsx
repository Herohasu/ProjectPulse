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
import ForgotPassword from './pages/ForgotPassword'
import FacultyLayout from './Layouts/FacultyLayout'
import PasswordReset from './pages/PasswordReset'
import Faculty from './pages/Faculty'
// import Chat from './components/Chat/chat'


export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateUser());
  }, [dispatch]);

  return (
    <>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path='/home' element={<Home />} />
        

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<Admin />} />
        </Route>

        <Route path='/faculty' element={<FacultyLayout />}>
          <Route index element={<Faculty/>} />
        </Route>

          <Route path='/' element={<PublicLayout />} />
          
          <Route path='/reset-password/:token' element={<PasswordReset />} />
          <Route path="/reset-password" element={<PasswordReset/>} />

          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

        </Routes>
        
      </BrowserRouter>
    </>
  )
}
