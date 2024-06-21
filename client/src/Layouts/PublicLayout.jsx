import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from 'react-router-dom';

const PublicLayout = () => {
    const user=useSelector((state)=>state.Auth.user)
    const navigate=useNavigate()
    
    useEffect(()=>{
    if (user) {
        if (user.role==='admin') {
            navigate('/admin')
            
        }else{
            navigate('/')
        }
    }

},[user, navigate])

  return (
    <>
    <Outlet />
    </>
  )
}

export default PublicLayout