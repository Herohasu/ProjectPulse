import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/ApiEndpoint.js'
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setUser } from '../redux/AuthSlice.js';

export default function Login() {

    const dispatch= useDispatch()
    const [email,setEmail]=useState('')
    const navigate =useNavigate()
    const [password,setPassword]=useState('')

    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(email,password)
try {
    const request=await post('/api/auth/login', {email,password})
    const response=request.data
    
    if (request.status==200) {
        if (response.user.role == 'admin') {
            navigate('/admin')
        }else if(response.user.role =='user'){
            navigate('/')
        }
        toast.success(response.message)
        dispatch(setUser(response.user))
    }
} catch (error) {
    console.log(error)
}
    }
  return (
    <>
    
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="Email">Email</label>
                    <input type="email" name="" id="email" 
                    onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="" id="password" 
                    onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type='submit'>Login</button>
                <p className='register-link'>
                    Not Registered? <Link to={'/register'}>Register here</Link>
                </p>


            </form>
        </div>
    </>
  )
}
