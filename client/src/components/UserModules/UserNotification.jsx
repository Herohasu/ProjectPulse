import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../redux/NotificationSlice';
import NotificationList from '../../redux/NotificationList';
import './UserNotification.css';

const UserNotification = () => {
  const dispatch = useDispatch();
  const { notifications, loading } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  if (loading) {
    return <div className="spinner-border text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>;
  }

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2>User Notifications</h2>
        </div>
        <div className="card-body">
          <NotificationList notifications={notifications} forWhom={"student"} />
        </div>
      </div>
    </div>
  );
};

export default UserNotification;
