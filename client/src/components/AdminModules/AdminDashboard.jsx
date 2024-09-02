import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import './AdminDashboard.css';

const DeleteConfirmationDialog = ({ show, handleClose, handleConfirm }) => {
  if (!show) return null;

  return (
    <div className="delete-dialog-overlay">
      <div className="delete-dialog">
        <h3 className="delete-dialog-title">Confirm Deletion</h3>
        <p className="delete-dialog-message">Are you sure you want to delete this user?</p>
        <div className="delete-dialog-buttons">
          <Button className="delete-dialog-button" onClick={handleConfirm}>
            Yes
          </Button>
          <Button className="delete-dialog-button cancel" onClick={handleClose}>
            No
          </Button>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = ({ users, handleDelete, handleEdit }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleShowEdit = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setRole(user.role);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setShowEditModal(false);
  };

  const handleShowDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const handleCloseDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = async () => {
    await handleDelete(selectedUser._id);
    setShowDeleteDialog(false);
    window.location.reload(); 
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: name,
      email: email,
      role: role,
    };
    await handleEdit(selectedUser._id, formData);
    setShowEditModal(false);
  };

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-dashboard-title">Manage Users</h2>
      <Table striped bordered hover className="admin-dashboard-table">
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
                <Button variant="success" onClick={() => handleShowEdit(user)} className="admin-dashboard-table btn btn-success">
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleShowDelete(user)} className="admin-dashboard-table btn btn-failed">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {showEditModal && (
        <div className="admin-dashboard-editmodal">
          <form onSubmit={handleEditSubmit} encType="multipart/form-data">
            <div className="admin-dashboard-input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="admin-dashboard-input-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="admin-dashboard-input-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select option</option>
                <option value="faculty">Faculty</option>
                <option value="user">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <button type="submit" className="admin-dashboard-button">Submit</button>
            <button type="button" onClick={handleCloseEdit} className="admin-dashboard-button admin-dashboard-button-close">Close</button>
          </form>
        </div>
      )}

      <DeleteConfirmationDialog
        show={showDeleteDialog}
        handleClose={handleCloseDelete}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default AdminDashboard;
