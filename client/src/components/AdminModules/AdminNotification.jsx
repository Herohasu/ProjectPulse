import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/NotificationSlice';
import './AdminNotification.css';

const AdminNotification = () => {
  const [message, setMessage] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [forWhom, setForWhom] = useState('');
  const dispatch = useDispatch();

  const handleAddNotification = () => {
    dispatch(addNotification({ message, deadlineDate, forWhom }));
    setMessage('');
    setDeadlineDate('');
    setForWhom('');
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2>Admin Notification</h2>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <input
              id="message"
              type="text"
              className="form-control"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadlineDate">Deadline Date</label>
            <input
              id="deadlineDate"
              type="text"
              className="form-control"
              placeholder="Enter deadline date"
              value={deadlineDate}
              onChange={(e) => setDeadlineDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="forWhom">For Whom</label>
            <input
              id="forWhom"
              type="text"
              className="form-control"
              placeholder="Enter recipient"
              value={forWhom}
              onChange={(e) => setForWhom(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddNotification}>Add Notification</button>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;
