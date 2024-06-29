import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Logout } from '../redux/AuthSlice';
import { post } from '../services/ApiEndpoint';
import './Home.css'

// ============================================================================
// import StudentDetailBar from '../components/StudentDetailBar/StudentDetailBar';



export default function Home() {
  const user=useSelector ((state) => state.Auth.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const gotoAdmin=()=>{
    navigate('/admin')
  }
  const handleLogout=async()=>{
    try {
      const request=await post('/api/auth/logout')
      const response = request.data 
      if (request.status==200) {
        dispatch(Logout())
        navigate('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <div className='home-container'>
      <div className="user-card">
        <h2>Welcome,{user && user.name}</h2>
        <button className='logout-btn' onClick={handleLogout}>Logout</button>
        
        {user && user.role =='admin' ?<button className='Admin-btn' onClick={gotoAdmin} >Go to Admin</button> : ''}
      
      </div>

      <div>
        {/* <StudentDetailBar/> */}
      </div>
    </div>

    </>
  )
}
