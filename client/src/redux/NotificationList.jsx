import React from 'react';
//import './NotificationList.css';

const NotificationList = ({ notifications , forWhom }) => {
  
  function filteernotificationdata(forWhom){
    return notifications.filter(notifications=> notifications.forWhom === forWhom || notifications.forWhom === "both")
  }
  notifications = filteernotificationdata(forWhom)
  console.log(notifications)

  return (
    <ul className="list-group">
      {notifications.map((notification, index) => (
        <li key={index} className="list-group-item">
          <strong>Subject:</strong> {notification.subject}<br />
          <strong>Message:</strong> {notification.message}<br />
          <strong>Deadline Date:</strong> {new Date(notification.deadlineDate).toLocaleDateString()}<br />
          {/* <strong>For Whom:</strong> {notification.forWhom.charAt(0).toUpperCase() + notification.forWhom.slice(1)}<br /> */}
        </li>
      ))}
    </ul>
  );
};

export default NotificationList;
