import React, { useEffect, useState } from 'react'
import { deleteUser, get } from '../services/ApiEndpoint'
import toast from 'react-hot-toast'
import './Admin.css'

export default function Admin() {
  const [users, setUsers] = useState('')
  console.log('this is user', users)

  useEffect(() => {
    const Getuser = async () => {
      try {
        const request = await get('/api/admin/getuser')
        const response = request.data
        if (request.status == 200) {
          setUsers(response.users)
        }
        
      } catch (error) {
        console.log(error)
      }
    }
    Getuser()
  }, [])

  const handleDelet = async (id) => {
    try {
      const request=await deleteUser(`/api/admin/delet/${id}`)
      const response=request.data
      
      if (request.status==200) {
        toast.success(response.message)
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message)
      }
      
    }

  }
  return (
    <>
      <div className="admin-container">
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((elem, index) => {
              return (
                <tr key={index}>
                  <td>{elem.name}</td>
                  <td>{elem.email}</td>
                  <td>
                    <button onClick={() => handleDelet(elem._id)}>Delete</button>
                  </td>
                </tr>
              )
            })}

          </tbody>

        </table>
      </div>
    </>
  )
}
