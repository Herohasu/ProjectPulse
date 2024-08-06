// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import './FacultyProject.css';

// const FacultyProject = () => {
//   const user = useSelector((state) => state.Auth.user);
//   const [ProjectsData, setProjectsData] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null);

//   useEffect(() => {
//     axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
//       .then(result => {
//         setProjectsData(result.data);
//       });
//   });

//   const handleGoToClick = (project) => {
//     setSelectedProject(project);
//   };

//   const handleCloseDetails = () => {
//     setSelectedProject(null);
//   };

//   return (
//     <div className="faculty-project-page-wrapper">
//       <div className="project-faculty-header bg-primary text-white">
//         <h2 style={{ backgroundColor: "var(--primary-color)", color: "white", alignItems: "center", padding: "10px 20px", marginBottom: "30px", textAlign: "center", border: "2px solid Black" }}>Projects To Watch Out</h2>
//       </div>
//       <ul className="faculty-projects-list">
//         {ProjectsData.map((project, index) => (
//           <li key={index} className="faculty-project-item">
//             <div className="faculty-project-header">
//               <h2 className="faculty-project-title">{project.ProjectTitle}</h2>
//               <button
//                 className="faculty-go-to-button"
//                 onClick={() => handleGoToClick(project)}
//               >
//                 GO TO
//               </button>
//             </div>
//             <p><strong>Team Name:</strong> {project.TeamName}</p>
//           </li>
//         ))}
//       </ul>

//       {selectedProject && (
//         <div className="faculty-project-details-container">
//           <h2 className="faculty-project-title">{selectedProject.ProjectTitle}</h2>
//           <p><strong>Description:</strong> {selectedProject.ProjectDescription}</p>
//           <p><strong>Mentor Name:</strong> {user.name}</p>
//           <p><strong>Team Name:</strong> {selectedProject.TeamName}</p>
//           <p><strong>Year:</strong> {selectedProject.Year}</p>
//           <button id="approved-btn-faculty">Approved</button>
//           <button id="reject-btn-faculty">Reject</button>
//           <button id="comment-btn-faculty">Comment</button>
//           <button className="faculty-close-details-button" onClick={handleCloseDetails}>
//             Close
//           </button>
//         </div>
//       )}
//       <div className='project-approved-byfaculty'>
//         <div className="project-faculty-header bg-primary text-white">
//           <h2 style={{ backgroundColor: "var(--primary-color)", color: "white", alignItems: "center", padding: "10px 20px", marginBottom: "30px", textAlign: "center", border: "2px solid Black" }}>Approved Projects</h2>
//         </div>



//       </div>
//     </div>
//   );
// };

// export default FacultyProject;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast'
import './FacultyProject.css';

const FacultyProject = () => {
  const user = useSelector((state) => state.Auth.user);
  if(!user){
    return
  }
  const [ProjectsData, setProjectsData] = useState([]);
  const [statusPendingProject, setstatusPendingProject] = useState([])
  const [selectedProject, setSelectedProject] = useState(null);
  const [approvedProjects, setApprovedProjects] = useState([]);
  const [rejectedProjects, setRejectedProjects] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentType, setCommentType] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
      .then(result => {
        setProjectsData(result.data);
        console.log(result.data)
      });
  }, [user.email]);

  useEffect(() => {
    const projectpendingData = ProjectsData.filter(project => project.Approval == "pending")
    const approved = ProjectsData.filter(project => project.Approval === 'yes');
    const rejected = ProjectsData.filter(project => project.Approval == 'no');
    setstatusPendingProject(projectpendingData)
    setApprovedProjects(approved);
    setRejectedProjects(rejected);
  }, [ProjectsData]);

  const handleGoToClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseDetails = () => {
    setSelectedProject(null);
  };

  // const handleApproveProject = (project) => {
  //   setApprovedProjects([...approvedProjects, { ...project, Status: 'yes' }]);
  //   setProjectsData(ProjectsData.filter(p => p !== project));
  //   setSelectedProject(null);
  // };

  // const handleRejectProject = (project) => {
  //   setRejectedProjects([...rejectedProjects, { ...project, Status: 'no' }]);
  //   setProjectsData(ProjectsData.filter(p => p !== project));
  //   setSelectedProject(null);
  // };

  const handleCommentClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setComment('');
  };

  const handleCommentSubmit = () => {
    if (selectedProject) {
      selectedProject.Approval = commentType
      selectedProject.comment = comment
    }
    console.log("egrfhj", selectedProject)
    axios.put(`http://localhost:4000/EditProjects/${selectedProject._id}`, selectedProject)
      .then(result => {
        axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
        .then(result => {
          setProjectsData(result.data);
          console.log(result.data)
        });
      })
      .catch(err => console.log(err))
    setSelectedProject(null);
    handleModalClose();
  };

  return (
    <div className="faculty-project-page-wrapper">
      <div className="project-faculty-header bg-primary text-white">
        <h2 style={{ backgroundColor: "var(--primary-color)", color: "white", alignItems: "center", padding: "10px 20px", marginBottom: "30px", textAlign: "center", border: "2px solid Black" }}>Projects To Watch Out</h2>
      </div>
      <ul className="faculty-projects-list">
        {statusPendingProject.map((project, index) => (
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
          {/* <button id="approved-btn-faculty" onClick={() => handleApproveProject(selectedProject)}>Approved</button>
          <button id="reject-btn-faculty" onClick={() => handleRejectProject(selectedProject)}>Reject</button> */}
          <button id="comment-btn-faculty" onClick={handleCommentClick}>ACTION</button>
          <button className="faculty-close-details-button" onClick={handleCloseDetails}>
            Close
          </button>
        </div>
      )}

      {/* Approved Projects */}
      <div className='project-approved-byfaculty'>
        <div className="project-faculty-header bg-primary text-white">
          <h2 style={{ backgroundColor: "var(--primary-color)", color: "white", alignItems: "center", padding: "10px 20px", marginBottom: "30px", textAlign: "center", border: "2px solid Black" }}>Approved Projects</h2>
        </div>
        <ul className="faculty-approved-projects-list">
          {approvedProjects.map((project, index) => (
            <li key={index} className="faculty-approved-project-item">
              <h2 className="faculty-project-title">{project.ProjectTitle}</h2>
              <p><strong>Team Name:</strong> {project.TeamName}</p>
              <p><strong>Status:</strong> {project.Approval}</p>
              <p><strong>Comment:</strong> {project.Comment}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Rejected Projects */}
      <div className='project-rejected-byfaculty'>
        <div className="project-faculty-header bg-primary text-white">
          <h2 style={{ backgroundColor: "var(--primary-color)", color: "white", alignItems: "center", padding: "10px 20px", marginBottom: "30px", textAlign: "center", border: "2px solid Black" }}>Rejected Projects</h2>
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

      {/* To Approve or Reject  */}
      {isModalOpen && (
        <div className="modal" id='modal-faculty-comment'>
          <div className="modal-content" id='modal-content-faculty-comment'>
            <span className="close" id='close-modal-faculty-comment' onClick={handleModalClose}>&times;</span>
            <h2>Add Comment</h2>
            <label>
              <input
                type="radio"
                name="commentType"
                onChange={() => setCommentType('yes')}
              />
              Approve With Comment
            </label>
            <label>
              <input
                type="radio"
                name="commentType"
                onChange={() => setCommentType('no')}
              />
              Reject With Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment here..."
            />
            <button onClick={handleCommentSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacultyProject;
