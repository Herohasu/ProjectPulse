import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import './FacultyProject.css';
import UserFileUpload from '../UserModules/UserFileUpload';
import UserWeeklyReport from '../UserModules/UserWeeklyReport';
import Modal from 'react-modal';
import FacultyProgressBar from './FacultyProgressBar';

const FacultyProject = () => {
  const user = useSelector((state) => state.Auth.user);
  if (!user) {
    return null;
  }

  const [ProjectsData, setProjectsData] = useState([]);
  const [statusPendingProject, setStatusPendingProject] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);

  const [isApproveRejectModalOpen, setIsApproveRejectModalOpen] = useState(false);
  const [isProgressModalOpen, setIsProgressModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  const [commentType, setCommentType] = useState('');
  const [comment, setComment] = useState('');
  const [modalContent, setModalContent] = useState(null); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`);
        const projects = result.data;

        // Fetch progress for each project
        const projectsWithProgress = await Promise.all(projects.map(async (project) => {
          try {
            const progressResponse = await axios.get(`http://localhost:4000/api/ShowProgress/${project._id}`);
            return {
              ...project,
              Progress: progressResponse.data.progress || 0
            };
          } catch (err) {
            console.error('Error fetching progress for project:', err);
            return project;
          }
        }));

        setProjectsData(projectsWithProgress);
      } catch (err) {
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
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
  
  const handleApproveRejectModalOpen = () => {
    setIsApproveRejectModalOpen(true);
  };

  const handleProgressModalOpen = (project) => {
    setModalContent(
      <FacultyProgressBar
        projectId={project._id}
        onUpdateProgress={(newProgress) => handleProgressUpdate(project._id, newProgress, project)}
      />
    );
    setIsProgressModalOpen(true);
  };

  const handleDocumentModalOpen = (project) => {
    setModalContent(
      <>
        <UserWeeklyReport project={project} showOnlyReports={true} />
        <UserFileUpload project={project} showOnlyUploadedFiles={true} />
      </>
    );
    setIsDocumentModalOpen(true);
  };

  const handleModalClose = () => {
    setIsApproveRejectModalOpen(false);
    setIsProgressModalOpen(false);
    setIsDocumentModalOpen(false);
    setComment('');
    setModalContent(null); 
  };

  const handleCommentSubmit = () => {
    if (selectedProject) {
      selectedProject.Approval = commentType;
      selectedProject.comment = comment;
    }
    axios.put(`http://localhost:4000/EditProjects/${selectedProject._id}`, selectedProject)
      .then(() => {
        axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
          .then(result => {
            setProjectsData(result.data);
          });
      })
      .catch(err => console.log(err));
    setSelectedProject(null);
    handleModalClose();
  };

  const handleProgressUpdate = (projectId, newProgress, project) => {
    setProjectsData((prevData) =>
      prevData.map((proj) =>
        proj._id === projectId ? { ...proj, Progress: newProgress } : proj
      )
    );

    toast.success(`Progress has been updated for Team: ${project.TeamName}`);
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
          <p><strong>Progress:</strong> {selectedProject.Progress !== undefined ? `${selectedProject.Progress}%` : 'Not updated'}</p>
          <button className='faculty-action-details-button' onClick={handleApproveRejectModalOpen}>ACTION</button>
          <button className="faculty-close-details-button" onClick={handleCloseDetails}>
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
              <p><strong>Progress:</strong> {project.Progress !== undefined ? `${project.Progress}%` : 'Not updated'}</p>
              <div className="faculty-approved-buttons">
                <button
                  className='Progress-of-project-faculty'
                  onClick={() => handleProgressModalOpen(project)}
                >
                  Progress
                </button>
                <button
                  className="documents-report-file-btn-facultyproject"
                  onClick={() => handleDocumentModalOpen(project)}
                >
                  Documents
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

      {/* Modal for Approve or Reject */}
      <Modal
        isOpen={isApproveRejectModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Approve or Reject"
        className="faculty-project-modal-approve-reject"
        overlayClassName="faculty-project-modal-overlay"
      >
        <div className="faculty-project-modal-content">
          <span className="close" onClick={handleModalClose}>&times;</span>
          <h2>Project Status Update</h2><br />
          <label>
            <input
              type="radio"
              name="commentType"
              className='approvecomment-to-approve-reject-project'
              onChange={() => setCommentType('yes')}
            />
            Approve With Comment
          </label>
          <label>
            <input
              type="radio"
              name="commentType"
              className='rejectcomment-to-approve-reject-project'
              onChange={() => setCommentType('no')}
            />
            Reject With Comment
          </label>
          <textarea
            className='submitcomment-to-approve-reject-project'
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comment here..."
          />
          <button className='submitcomment-to-approve-reject-project-btn' onClick={handleCommentSubmit}>Submit</button>
        </div>
      </Modal>

      {/* Modal for dynamic content */}
      <Modal
        isOpen={isProgressModalOpen || isDocumentModalOpen}
        onRequestClose={handleModalClose}
        contentLabel="Project Details"
        className="faculty-project-modal-uploaded"
        overlayClassName="faculty-project-modal-overlay"
      >
        <div className="faculty-project-modal-content">
          <span className="close" onClick={handleModalClose}>&times;</span>
          {modalContent}
        </div>
      </Modal>
    </div>
  );
};

export default FacultyProject;

