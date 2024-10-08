import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, addNotification } from '../../redux/NotificationSlice';
import './AdminNotification.css';

const AdminNotification = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [forWhom, setForWhom] = useState('');
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  const handleAddNotification = () => {
    dispatch(addNotification({ subject, message, deadlineDate, forWhom }));
    setSubject('');
    setMessage('');
    setDeadlineDate('');
    setForWhom('');
  };

  if (loading) {
    return <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>;
  }

  return (
    <div className="container">
      <div className="card cardadd">
        <div className="card-header">
          <h2>Admin Notification</h2>
        </div>
        <div className="card-body">
          <div className="form-container">
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  className="form-control"
                  placeholder="Enter subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
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
                  type="date"
                  className="form-control"
                  value={deadlineDate}
                  onChange={(e) => setDeadlineDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="forWhom">For Whom</label>
                <select
                  id="forWhom"
                  className="form-control"
                  value={forWhom}
                  onChange={(e) => setForWhom(e.target.value)}
                >
                  <option value="">Select option</option>
                  <option value="faculty">Faculty</option>
                  <option value="student">Student</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            <div className="btn-container">
              <button className="btn btn-primary" onClick={handleAddNotification}>Add Notification</button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="card cardshow">
        <div className="card-header">
          <h2>Existing Notifications</h2>
        </div>
        <div className="card-body">
          <ul className="list-group">
            {notifications.map((notification, index) => (
              <li key={index} className="list-group-item">
                <strong>Subject:</strong> {notification.subject}<br />
                <strong>Message:</strong> {notification.message}<br />
                <strong>Deadline Date:</strong> {new Date(notification.deadlineDate).toLocaleDateString()}<br />
                <strong>For Whom:</strong> {notification.forWhom.charAt(0).toUpperCase() + notification.forWhom.slice(1)}<br />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNotification;

