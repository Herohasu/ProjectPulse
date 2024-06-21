import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
    const user=useSelector((state)=>state.Auth.user)
    const navigate=useNavigate()
    console.log(user)

    useEffect(()=>{
        if(!user || user.role !== 'admin'){
            navigate('/login')
        }
    },[user])
  return (
    <>
    <Outlet />


    </>
  )
}

export default AdminLayout