import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Logout, updateUser } from '../redux/AuthSlice';
import { post } from '../services/ApiEndpoint';
import { FaBell, FaCalendar, FaHome, FaUsers, FaTasks, FaUser } from 'react-icons/fa';
import './Home.css';
import UserDashboard from '../components/UserModules/UserDashboard';
import UserNotification from '../components/UserModules/UserNotification'
import UserCalender from '../components/UserModules/UserCalender'
import UserProject from '../components/UserModules/UserProject';
import UserProfile from '../components/UserModules/UserProfile';

const Home = () => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');

  useEffect(() => {
    if (!user) {
      dispatch(updateUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout');
      const response = request.data;
      if (request.status === 200) {
        dispatch(Logout());
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleNavItemClicked = (path) => {
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
    setCurrentSection(path);
  };

  const sideNavItems = [
    { name: 'Dashboard', icon: <FaHome />, path: 'dashboard' },
    { name: 'Project', icon: <FaTasks/>, path: 'project'},
    { name: 'Notifications', icon: <FaBell />, path: 'notifications' },
    { name: 'Calendar', icon: <FaCalendar />, path: 'calendar' },
    { name: 'My Profile', icon: <FaUser />, path: 'myprofile' },

  ];

  const sectionComponents = {
    dashboard: <UserDashboard/>,
    project: <UserProject/>,
    notifications: <UserNotification/>,
    calendar: <UserCalender/>,
    myprofile: <UserProfile/>,
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="top-navbar">
        <div className="logo" onClick={toggleSidebar}>
          <img src="./logo.jpeg" alt="Project Pulse Logo" className="logo-img" />
          <span className="project-name">ProjectPulse</span>
        </div>

        <div className="actions">
          <div className="notifications" onClick={() => handleNavItemClicked('notifications')}>
            <FaBell size={20} />
          </div>
          <div className="calendar" onClick={() => handleNavItemClicked('calendar')}>
            <FaCalendar size={20} />
          </div>
        </div>

        <div className="admin-profile">
          <h3>Welcome</h3>
          <p>{user && user.name}</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>

      {/* Sidebar */}
      <div className={`side-navbar ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}>
        <ul className="navbar-items">
          {sideNavItems.map((item, index) => (
            <li key={index} className={currentSection === item.path ? 'active' : ''}>
              <a href={`#${item.path}`} onClick={() => handleNavItemClicked(item.path)}>
                {item.icon}
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className={`admin-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {sectionComponents[currentSection]}
      </div>
    </>
  );
};

export default Home;
