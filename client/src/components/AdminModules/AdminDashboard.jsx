import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'

const AdminDashboard = ({ users, handleDelete,handleEdit }) => {

  const handleEditSubmit = (e) => {
    e.preventdefault();
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('role', role)
    formData.append('id',selectedUser._id)
    handleEdit(formData)
  }

  const [selectedUser,setSeclectedUser] = useState(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [show, setShow] = useState(false);


  const handleShow = (user) => {
    setSeclectedUser(user)
    setName(user.name)
    setEmail(user.email)
    setRole(user.role)
    setShow(true)
  }

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div className="admin-dashboard">
      <h2>Manage Users</h2>
      {/* <table> */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="success" onClick={() => handleShow(user)}>Edit</Button>
              </td>
              <td>
                <Button variant="failed" onClick={() => handleDelete(user._id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {show &&
        <div className='editmodal-form'>
          <form onSubmit={handleEditSubmit} encType="multipart/form-data">
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="role">Role</label>
              <select
                id="forWhom"
                className="form-control"
                value={role}
                onChange={(e) => setRole(e.target.value)}>
                <option value="">Select option</option>
                <option value="faculty">Faculty</option>
                <option value="user">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit">Submit</button>
            <button onClick={handleClose}>Close</button>
          </form>
        </div>
      }
    </div>
  );
};

export default AdminDashboard;

