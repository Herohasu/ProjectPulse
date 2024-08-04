import React, { useState } from 'react';
import './UserModalProject.css';
import ConfirmDeleteModal from '../UserModules/ComfirmDeleteModal.jsx';

const UserModalProject = ({ isModalOpen, ProjectsData, handleDelete }) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);

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

  if (isModalOpen) return null;

  return (
    <div className="project-page-wrapper">
      <div className="projects-list">
        {ProjectsData.map((project, index) => (
          <div key={index} className="project-card">
            <center><h2>{project.ProjectTitle}</h2></center>
            <p><strong>Description:</strong> {project.ProjectDescription}</p>
            <p><strong>Mentor Name:</strong> {project.MentorName}</p>
            <p><strong>Team Name:</strong> {project.TeamName}</p>
            <p><strong>Year:</strong> {project.Year}</p>
            <div className="button-container">
              <button className="go-to-button">GO TO</button>
              <button
                className="delete-button"
                onClick={() => handleShowConfirmModal(project._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <ConfirmDeleteModal
        show={showConfirmModal}
        handleClose={handleCloseConfirmModal}
        handleConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default UserModalProject;
