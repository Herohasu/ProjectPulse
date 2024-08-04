import React from 'react'

const UserModalProject = ({ isModalOpen, ProjectsData, handleDelete }) => {

    if (isModalOpen) return null;
  return (
    
    
    <div className="project-page-wrapper">
      <div className="projects-list">
        {ProjectsData.map((project, index) => (
          <div key={index} className="project-card">
            <h3>{project.ProjectTitle}</h3>
            <p><strong>Description:</strong> {project.ProjectDescription}</p>
            <p><strong>Mentor ID:</strong> {project.MentorName}</p>
            <p><strong>Team ID:</strong> {project.TeamName}</p>
            <p><strong>Year:</strong> {project.Year}</p>
            <button className="delete-button" onClick={() => handleDelete(project._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserModalProject