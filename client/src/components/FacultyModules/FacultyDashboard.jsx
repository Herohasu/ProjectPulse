import React, { useEffect, useState } from 'react';
import './FacultyDashboard.css';
import axios from 'axios';
import { useSelector } from 'react-redux';

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
      .then(result => {
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

        // Set approved projects for display in the Supervised Projects section
        setApprovedProjects(approvedProjects);

        // Calculate total projects count
        setTotalProjectsCount(projectsData.length);
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

    </div>
  );
};

export default FacultyDashboard;
