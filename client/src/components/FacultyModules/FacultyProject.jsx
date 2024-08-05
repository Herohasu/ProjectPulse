import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './FacultyProject.css';

const FacultyProject = () => {
  const user = useSelector((state) => state.Auth.user);
  const [ProjectsData, setProjectsData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
      .then(result => {
        setProjectsData(result.data);
      });
  }, [user.email]);

  const handleGoToClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  return (
    <div className="faculty-project-page-wrapper">
      <div className="project-faculty-header bg-primary text-white">
        <h2 style={{ backgroundColor: "var(--primary-color)", color: "white", alignItems: "center", padding: "10px 20px", marginBottom: "30px", textAlign: "center", border: "2px solid Black" }}>Projects To Watch Out</h2>
      </div>
      <ul className="faculty-projects-list">
        {ProjectsData.map((project, index) => (
          <li key={index} className="faculty-project-item">
            <div className="faculty-project-header">
              <h2 className="faculty-project-title">{project.ProjectTitle}</h2>
              <button
                className="faculty-go-to-button"
                onClick={() => handleGoToClick(project)}
              >
                GO TO
              </button>
            </div>
            <p><strong>Team Name:</strong> {project.TeamName}</p>
          </li>
        ))}
      </ul>

      {selectedProject && (
        <div className="faculty-project-details-container">
          <h2 className="faculty-project-title">{selectedProject.ProjectTitle}</h2>
          <p><strong>Description:</strong> {selectedProject.ProjectDescription}</p>
          <p><strong>Mentor Name:</strong> {user.name}</p>
          <p><strong>Team Name:</strong> {selectedProject.TeamName}</p>
          <p><strong>Year:</strong> {selectedProject.Year}</p>
          <button id="approved-btn-faculty">Approved</button>
          <button id="reject-btn-faculty">Reject</button>
          <button id="comment-btn-faculty">Comment</button>
          <button className="faculty-close-details-button" onClick={handleCloseDetails}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default FacultyProject;
