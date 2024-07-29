import React,{useEffect,useState} from 'react'
import axios from 'axios'

const UserProfile = () => {

  const [studentdata,setStudentdata] = useState([])
  const [loading,setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(()=>{
    // const fetch
  })
  return (
    <div>
      <h1>Student Profile</h1>
      {student && (
        <div>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Enrollment Number:</strong> {student.enrollmentnumber}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Mobile Number:</strong> {student.mobilenumber}</p>
          <p><strong>Branch:</strong> {student.branch}</p>
          <p><strong>Semester:</strong> {student.semester}</p>
          <p><strong>Division:</strong> {student.division}</p>
        </div>
      )}
    </div>
  )
}

export default UserProfile