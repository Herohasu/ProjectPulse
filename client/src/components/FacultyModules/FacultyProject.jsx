import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import './FacultyProject.css';

const FacultyProject = () => {
  const user = useSelector((state) => state.Auth.user);
  if (!user) {
    return null;
  }

  const [ProjectsData, setProjectsData] = useState([]);
  const [statusPendingProject, setStatusPendingProject] = useState([]);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportFile, setReportFile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
      .then(result => {
        setProjectsData(result.data);
        console.log(result.data);
      });
  }, [user.email]);

  useEffect(() => {
    const projectPendingData = ProjectsData.filter(project => project.Approval === "pending");
    const approved = ProjectsData.filter(project => project.Approval === 'yes');
    const rejected = ProjectsData.filter(project => project.Approval === 'no');
    setStatusPendingProject(projectPendingData);
    setApprovedProjects(approved);
    setRejectedProjects(rejected);
  }, [ProjectsData]);

  const handleGoToClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  const handleModalOpen = (file) => {
    setReportFile(file);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setReportFile(null);
  };

  return (
    <div className="faculty-project-page-wrapper">
      <div className="project-faculty-header bg-primary text-white">
        <h2 className="section-title">Projects To Watch Out</h2>
      </div>
      <ul className="faculty-projects-list">
        {statusPendingProject.map((project, index) => (
          <li key={index} className="faculty-project-item">
            <div className="faculty-project-header">
              <h2 className="faculty-project-title">{project.ProjectTitle}</h2>
              <button
                className="faculty-go-to-button-facultyproject"
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
          <button className="faculty-action-details-button" onClick={handleCloseDetails}>
            Close
          </button>
        </div>
      )}

      {/* Approved Projects */}
      <div className='project-approved-byfaculty'>
        <div className="project-faculty-header bg-primary text-white">
          <h2 className="section-title">Approved Projects</h2>
        </div>
        <ul className="faculty-approved-projects-list">
          {approvedProjects.map((project, index) => (
            <li key={index} className="faculty-approved-project-item">
              <h2 className="faculty-project-title">{project.ProjectTitle}</h2>
              <p><strong>Team Name:</strong> {project.TeamName}</p>
              <p><strong>Status:</strong> {project.Approval}</p>
              <p><strong>Comment:</strong> {project.Comment}</p>
              <div className="faculty-approved-buttons">
                <button className="report-btn-facultyproject" onClick={() => handleModalOpen(project.ReportFile)}>
                  Report
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

       {/* Rejected Projects */}
       <div className='project-rejected-byfaculty'>
         <div className="project-faculty-header bg-primary text-white">
           <h2 className="section-title">Rejected Projects</h2>
        </div>
        <ul className="faculty-rejected-projects-list">
           {rejectedProjects.map((project, index) => (
            <li key={index} className="faculty-rejected-project-item">
              <h2 className="faculty-project-title">{project.ProjectTitle}</h2>
              <p><strong>Team Name:</strong> {project.TeamName}</p>
              <p><strong>Status:</strong> {project.Approval}</p>
              <p><strong>Comment:</strong> {project.Comment}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal for Viewing Report */}
      {isModalOpen && reportFile && (
        <div className="modal" onClick={handleModalClose}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={handleModalClose}>&times;</span>
            <iframe 
              src={`http://localhost:4000/${reportFile}`} 
              style={{ width: '100%', height: '80vh', border: 'none' }} 
              title="Uploaded Report"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProject;
