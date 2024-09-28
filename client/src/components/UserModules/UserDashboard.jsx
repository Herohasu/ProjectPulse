// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import axios from 'axios';
// import './UserDashboard.css'; 

// const UserDashboard = () => {
//   const [ProjectsData, setProjectsData] = useState([]);
//   const [selectedProject, setSelectedProject] = useState(null); 
//   const [isModalOpen, setIsModalOpen] = useState(false); 
//   const [projectProgress, setProjectProgress] = useState({}); // New state for project progress
//   const user = useSelector((state) => state.Auth.user);

//   useEffect(() => {
//     axios.get(`http://localhost:4000/ShowProjectsByEmail/${user.email}`)
//       .then(async (result) => {
//         const projectsData = result.data;
//         setProjectsData(projectsData);

//         // Fetch progress for each project
//         const progressData = await Promise.all(projectsData.map(async (project) => {
//           try {
//             const progressResponse = await axios.get(`http://localhost:4000/api/ShowProgress/${project._id}`);
//             return {
//               projectId: project._id,
//               progress: progressResponse.data.progress || 0
//             };
//           } catch (error) {
//             console.error('Error fetching progress data:', error);
//             return {
//               projectId: project._id,
//               progress: 0 
//             };
//           }
//         }));

//         // Update projectProgress state
//         const progressMap = {};
//         progressData.forEach(item => {
//           progressMap[item.projectId] = item.progress;
//         });
//         setProjectProgress(progressMap);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the projects!", error);
//       });
//   }, [user.email]);

//   const approvedProjects = ProjectsData.filter((project) => project.Status === 'yes');
//   const approvedProjectsCount = approvedProjects.length;

//   const handleDetailClick = (project) => {
//     setSelectedProject(project);
//     setIsModalOpen(true); 
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false); 
//     setSelectedProject(null); 
//   };

//   return (
//     <div className="user-dashboard">
//       <h2>User Dashboard</h2>
//       <p>Total Approved Projects: {approvedProjectsCount}</p>
      
//       <div className="projects-in-userDashboard">
//         {approvedProjects.length > 0 ? (
//           <div className="projects-list-in-userDashboard">
//             {approvedProjects.map((project, index) => (
//               <div key={index} className="project-item">
//                 <h3 className="project-title">{project.ProjectTitle}</h3>
//                 <p><strong>Description:</strong> {project.ProjectDescription}</p>
//                 <p><strong>Mentor Name:</strong> {project.MentorName}</p>
//                 <p><strong>Team Name:</strong> {project.TeamName}</p>
//                 <p><strong>Year:</strong> {project.Year}</p>
//                 <p><strong>Progress:</strong> {projectProgress[project._id] !== undefined ? `${projectProgress[project._id]}%` : "Loading..."}</p> {/* Display progress */}
//                 <button className='detail-team-in-user' onClick={() => handleDetailClick(project)}>Details</button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p>No approved projects available.</p>
//         )}
//       </div>

//       {/* Modal for Project Details */}
//       {isModalOpen && selectedProject && (
//         <div className="modal">
//           <div className="modal-content">
//             <span className="close" onClick={handleCloseModal}>&times;</span>
//             <h4>Team Details</h4>
//             <p><strong>Team Name:</strong> {selectedProject.TeamName}</p>
//             <p><strong>Mentor Name:</strong> {selectedProject.MentorName}</p>
//             <p>
//               <strong>Team Members:</strong> 
//               {Array.isArray(selectedProject.TeamMembers) ? 
//                 selectedProject.TeamMembers.join(', ') : 
//                 "No team members available"}
//             </p>
//             <p><strong>Progress:</strong> {projectProgress[selectedProject._id] !== undefined ? `${projectProgress[selectedProject._id]}%` : "Loading..."}</p> {/* Display progress */}
//             <p><strong>Uploads:</strong> {selectedProject.Uploads || "No uploads available"}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './UserDashboard.css'; 

const UserDashboard = () => {
  const [ProjectsData, setProjectsData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [projectProgress, setProjectProgress] = useState({}); // New state for project progress and uploads
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    const fetchWeeklyReportCount = async (projectId) => {
      try {
        const response = await axios.get(`http://localhost:4000/ShowWeeklyReports/${projectId}`);
        return response.data.length; // Return the number of reports
      } catch (error) {
        console.error('Error fetching weekly report count', error);
        return 0; // Return 0 in case of an error
      }
    };

    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/ShowProjectsByEmail/${user.email}`);
        const projectsData = result.data;
        setProjectsData(projectsData);

        // Fetch progress and uploads for each project
        const progressData = await Promise.all(projectsData.map(async (project) => {
          try {
            const [progressResponse, reportCount] = await Promise.all([
              axios.get(`http://localhost:4000/api/ShowProgress/${project._id}`),
              fetchWeeklyReportCount(project._id)
            ]);
            return {
              projectId: project._id,
              progress: progressResponse.data.progress || 0,
              uploads: reportCount // Add uploads count here
            };
          } catch (error) {
            console.error('Error fetching progress or report count:', error);
            return {
              projectId: project._id,
              progress: 0,
              uploads: 0 // Default 0 in case of an error
            };
          }
        }));

        // Update projectProgress state
        const progressMap = {};
        progressData.forEach(item => {
          progressMap[item.projectId] = {
            progress: item.progress,
            uploads: item.uploads
          };
        });
        setProjectProgress(progressMap);
      } catch (error) {
        console.error("There was an error fetching the projects!", error);
      }
    };

    fetchData();
  }, [user.email]);

  const approvedProjects = ProjectsData.filter((project) => project.Status === 'yes');
  const approvedProjectsCount = approvedProjects.length;

  const handleDetailClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    setSelectedProject(null); 
  };

  return (
    <div className="user-dashboard">
      <h2>User Dashboard</h2>
      <p>Total Approved Projects: {approvedProjectsCount}</p>
      
      <div className="projects-in-userDashboard">
        {approvedProjects.length > 0 ? (
          <div className="projects-list-in-userDashboard">
            {approvedProjects.map((project, index) => (
              <div key={index} className="project-item">
                <h3 className="project-title">{project.ProjectTitle}</h3>
                <p><strong>Description:</strong> {project.ProjectDescription}</p>
                <p><strong>Mentor Name:</strong> {project.MentorName}</p>
                <p><strong>Team Name:</strong> {project.TeamName}</p>
                <p><strong>Year:</strong> {project.Year}</p>
                <p><strong>Progress:</strong> {projectProgress[project._id]?.progress !== undefined ? `${projectProgress[project._id].progress}%` : "Loading..."}</p>
                {/* <p><strong>Uploads:</strong> {projectProgress[project._id]?.uploads !== undefined ? projectProgress[project._id].uploads : "No uploads available"}</p> */}
                <button className='detail-team-in-user' onClick={() => handleDetailClick(project)}>Details</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No approved projects available.</p>
        )}
      </div>

      {/* Modal for Project Details */}
      {isModalOpen && selectedProject && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h4>Team Details</h4>
            <p><strong>Team Name:</strong> {selectedProject.TeamName}</p>
            <p><strong>Mentor Name:</strong> {selectedProject.MentorName}</p>
            <p>
              <strong>Team Members:</strong> 
              {Array.isArray(selectedProject.TeamMembers) ? 
                selectedProject.TeamMembers.join(', ') : 
                "No team members available"}
            </p>
            <p><strong>Progress:</strong> {projectProgress[selectedProject._id]?.progress !== undefined ? `${projectProgress[selectedProject._id].progress}%` : "Loading..."}</p>
            <p><strong>Uploads:</strong> {projectProgress[selectedProject._id]?.uploads !== undefined ? projectProgress[selectedProject._id].uploads : "No uploads available"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
