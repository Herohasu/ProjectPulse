import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FacultyDashboard.css';
import { useSelector } from 'react-redux';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const FacultyDashboard = () => {
  const user = useSelector((state) => state.Auth.user);
  const [pendingApprovalsCount, setPendingApprovalsCount] = useState(0);
  const [rejectedProjectsCount, setRejectedProjectsCount] = useState(0);
  const [approvedProjectsCount, setApprovedProjectsCount] = useState(0);
  const [totalProjectsCount, setTotalProjectsCount] = useState(0);
  const [approvedProjects, setApprovedProjects] = useState([]);

  useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:4000/ProjectDetailByFaculty/${user.email}`)
      .then(async result => {
        const projectsData = result.data;

        // Calculate pending approvals count
        const pendingApprovals = projectsData.filter(project => project.Approval === 'pending');
        setPendingApprovalsCount(pendingApprovals.length);

        // Calculate rejected projects count
        const rejectedProjects = projectsData.filter(project => project.Approval === 'no');
        setRejectedProjectsCount(rejectedProjects.length);

        // Calculate approved projects count
        const approvedProjects = projectsData.filter(project => project.Approval === 'yes');
        setApprovedProjectsCount(approvedProjects.length);

        // Set approved projects for display in the dashboard
        setApprovedProjects(approvedProjects);

        // Calculate total projects count
        setTotalProjectsCount(projectsData.length);

        const updatedProjects = await Promise.all(approvedProjects.map(async project => {
          try {
            const progressResponse = await axios.get(`http://localhost:4000/api/ShowProgress/${project._id}`);
            return {
              ...project,
              progress: progressResponse.data.progress || 0
            };
          } catch (error) {
            console.error('Error fetching progress data:', error);
            return {
              ...project,
              progress: 0 
            };
          }
        }));

        setApprovedProjects(updatedProjects);
      })
      .catch(error => {
        console.error('Error fetching project data:', error);
      });
  }, [user]);

  return (
    <div className="faculty-dashboard">
      {/* Summary Cards */}
      <div className="summary-cards-faculty">
        <div className="card-faculty">
          <h3>Total Projects</h3>
          <p>{totalProjectsCount}</p>
        </div>
        <div className="card-faculty">
          <h3>Approved Projects</h3>
          <p>{approvedProjectsCount}</p>
        </div>
        <div className="card-faculty">
          <h3>Rejected Projects</h3>
          <p>{rejectedProjectsCount}</p>
        </div>
        <div className="card-faculty">
          <h3>Pending Projects</h3>
          <p>{pendingApprovalsCount}</p>
        </div>
      </div>
<br /> <br /> <br />
      {/* Circular Progress Bar for Approved Projects */}
      <div className="circular-progress-section">
        <h1>Approved Projects Progress</h1><br /> 
        <div className="circular-progress-container">
          {approvedProjects.length === 0 ? (
            <p>No approved projects yet.</p>
          ) : (
            approvedProjects.map((project) => (
              <div key={project._id} className="circular-progress-main-card">
                <div className='circular-progress-text-card' >
                  <h2>{project.ProjectTitle}</h2><br />
                  <p><strong style={{color:'black'}}>Description:</strong> {project.ProjectDescription}</p>
                  <p><strong style={{color:'black'}}>Team Name:</strong> {project.TeamName}</p>

                </div>

                <div className="circular-progress-bar-area">
                <CircularProgressbar
                    value={project.progress}
                    maxValue={100} 
                    text={`${project.progress}%`}
                    styles={{
                      path: {
                        stroke: `#4CAF50`, 
                        strokeLinecap: 'round',
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                      },
                      trail: {
                        stroke: '#D6D6D6', 
                      },
                      text: {
                        fill: '#1DABFF',
                        fontSize: '16px',
                      },
                    }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
