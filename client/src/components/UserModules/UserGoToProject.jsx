import React from 'react';
import './UserGoToProject.css';
import UserFileUpload from './UserFileUpload';
import UserWeeklyReport from './UserWeeklyReport';
import Chat from '../Chat/chat';

const UserGoToProject = ({ project, onClose }) => {


  const cardBackgroundClass = project.Status === 'Yes' ? 'bg-green' : '';

  return (
    <div className="user-go-to-overlay">
      <div className={`user-go-to-container ${cardBackgroundClass}`}>
        <button className="close-button" onClick={onClose}>Close</button>
        <div className="user-go-to-content">
          <div className="user-go-to-container1">
            <h2>{project.ProjectTitle}</h2>
            <p><strong>Description:</strong> {project.ProjectDescription}</p>
            <p><strong>Mentor Name:</strong> {project.MentorName}</p>
            <p><strong>Team Name:</strong> {project.TeamName}</p>
            <p><strong>Year:</strong> {project.Year}</p>
            <p><strong>Status:</strong> {project.Status}</p>
            <p><strong>Comment:</strong> {project.Comment}</p>
          </div>
          {project.Status === "yes" && (
            <>
              <div className="user-go-to-container2">
                <Chat project={project}/>
              </div>

              <div className="user-go-to-container2">
                <UserFileUpload project={project}/>
              </div>
              <div className="user-go-to-container3">
                <UserWeeklyReport project={project}/>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserGoToProject;
