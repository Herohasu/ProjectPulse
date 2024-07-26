import React from 'react';
import './UserDashboard.css'; // Ensure this CSS file is updated

const UserDashboard = () => {
  // Mock data for demonstration purposes
  const progress = 75; // Replace this with actual progress data from your API

  return (
    <div className="dashboard-container">
      <div className="dashboard-cards">
        <div className="dashboard-card">Total project</div>
        <div className="dashboard-card">Work Done</div>
        <div className="dashboard-card">To Do</div>
        <div className="dashboard-card">Left work</div>
      </div>
      <div className="dashboard-large-containers">
        <div className="dashboard-large-container">Student detail about in which project he is enrolled</div>
        <div className="dashboard-large-container">His teams name and members</div>
      </div>
      <div className="progress-section">
        <div className="progress-box">
          <h2>Overall Progress</h2>
          <div className="progress-bar">
            <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="progress-label">{progress}% Completed</span>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
