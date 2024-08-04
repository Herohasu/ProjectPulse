import React from 'react';
import './UserGoToProject.css';

const UserGoToProject = ({ project, onClose }) => {
  return (
    <div className="user-go-to-overlay">
      <div className="user-go-to-container">
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="user-go-to-container1">
          <h2>{project.ProjectTitle}</h2>
          <p><strong>Description:</strong> {project.ProjectDescription}</p>
          <p><strong>Mentor Name:</strong> {project.MentorName}</p>
          <p><strong>Team Name:</strong> {project.TeamName}</p>
          <p><strong>Year:</strong> {project.Year}</p>
          <p><strong>Status:</strong> {project.Status}</p>
        </div>
        <div className="user-go-to-container2">
          <p>Additional details or actions can go here.</p>
        </div>
        <div className="user-go-to-container3">
          <p>More details or actions can go here.</p>
        </div>
      </div>
    </div>
  );
};

export default UserGoToProject;
