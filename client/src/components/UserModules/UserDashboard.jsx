import React from 'react';
import { useState,useEffect} from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const UserDashboard = () => {
  const [ProjectsData, setProjectsData] = useState([])
  const user = useSelector((state) => state.Auth.user);

  useEffect(() => {
    axios.get(`http://localhost:4000/ShowProjectsByEmail/${user.email}`)
      .then(result => {
        setProjectsData(result.data)
      })
  })
   const approvedProjectsCount = ProjectsData.filter((project) => project.Status === 'yes').length;
 
  return (
    <div>
      <h2>User Dashboard</h2>
      <p>Total Approved Projects: {approvedProjectsCount}</p>
      <p>Project Details </p>
    </div>
  );
};

export default UserDashboard;
