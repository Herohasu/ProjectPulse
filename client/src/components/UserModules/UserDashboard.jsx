import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './UserDashboard.css'; 

const UserDashboard = () => {
  const [ProjectsData, setProjectsData] = useState([]);
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    axios.get(`http://localhost:4000/ShowProjectsByEmail/${user.email}`)
      .then(result => {
        setProjectsData(result.data);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
      });

      axios.get(`http://localhost:4000/ShowTeamsByEmail/${user.email}`)
      .then(result => {
        setTeamsData(result.data);
      })
      .catch(error => {
        console.error("There was an error fetching the teams!", error);
      });
  }, [user.email]);

  const approvedProjects = ProjectsData.filter((project) => project.Status === 'yes');
  const approvedProjectsCount = approvedProjects.length;

  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Total Approved Projects: {approvedProjectsCount}</p>
      <div className="projects-in-userDashboard">
        {approvedProjects.length > 0 ? (
          <ul className="projects-list-in-userDashboard">
            {approvedProjects.map((project, index) => (
              <li key={index} className="project-item">
                <h3 className="project-title">{project.ProjectTitle}</h3>
                <p><strong>Description:</strong> {project.ProjectDescription}</p>
                <p><strong>Mentor Name:</strong> {project.MentorName}</p>
                <p><strong>Team Name:</strong> {project.TeamName}</p>
                <p><strong>Year:</strong> {project.Year}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No approved projects available.</p>
        )}
      </div>
      <div className="teams-in-userDashboard">

      </div>
    </div>
  );
};

export default UserDashboard;
