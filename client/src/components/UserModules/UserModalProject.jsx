import React, { useState } from 'react';
import './UserModalProject.css';
import ConfirmDeleteModal from '../UserModules/ComfirmDeleteModal.jsx';
import UserGoToProject from '../UserModules/UserGoToProject.jsx';
import UserDashboard from './UserDashboard.jsx';
import toast from 'react-hot-toast';

const UserModalProject = ({ isModalOpen, ProjectsData, handleDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const [showUserGoToProject, setShowUserGoToProject] = useState(false); 
  const [selectedProject, setSelectedProject] = useState(null);

  const handleShowConfirmModal = (projectId) => {
    setProjectToDelete(projectId);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
    setProjectToDelete(null);
  };

  const handleConfirmDelete = () => {
    handleDelete(projectToDelete);
    setShowConfirmModal(false);
  };

  const handleGoToProject = (project) => {
    setSelectedProject(project);
    setShowUserGoToProject(true); 
  };

  const handleCloseUserGoToProject = () => {
    setShowUserGoToProject(false); 
    setSelectedProject(null);
  };

  if (isModalOpen) return null;

  return (
    <div className="project-page-wrapper">
      <div className="projects-list">
        {ProjectsData.map((project, index) => {
          
          const cardClass = project.Status === 'yes' ? 'project-card green-bg' : 'project-card';
          
          return (
            <div key={index} className={cardClass}>
              <center><h2>{project.ProjectTitle}</h2></center>
              <p><strong>Description:</strong> {project.ProjectDescription}</p>
              <p><strong>Mentor Name:</strong> {project.MentorName}</p>
              <p><strong>Team Name:</strong> {project.TeamName}</p>
              <p><strong>Year:</strong> {project.Year}</p>
              <p><strong>Status:</strong> {project.Status}</p>
              <div className="button-container">
                <button className="go-to-button" onClick={() => handleGoToProject(project)}>GO TO</button>
                <button
                  className="delete-button"
                  onClick={() => handleShowConfirmModal(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <ConfirmDeleteModal
        show={showConfirmModal}
        handleClose={handleCloseConfirmModal}
        handleConfirm={handleConfirmDelete}
      />
      {showUserGoToProject && <UserGoToProject project={selectedProject} onClose={handleCloseUserGoToProject} />} 
    </div>
  );
};

export default UserModalProject;
