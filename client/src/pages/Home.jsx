import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Logout, updateUser } from '../redux/AuthSlice';
import { post } from '../services/ApiEndpoint';
import { FaBell, FaCalendar, FaHome, FaTasks, FaUser, FaWindowClose } from 'react-icons/fa';
import { RiTeamFill } from "react-icons/ri";
import { FaBarsStaggered } from "react-icons/fa6";
import './Home.css';
import UserDashboard from '../components/UserModules/UserDashboard';
import UserNotification from '../components/UserModules/UserNotification';
import UserCalender from '../components/UserModules/UserCalender';
import UserProject from '../components/UserModules/UserProject';
import UserProfile from '../components/UserModules/UserProfile';
import UserTeam from '../components/UserModules/UserTeam';

const IconButton = ({ isSidebarOpen, onClick }) => (
  <button 
    onClick={onClick} 
    className="icon-button"
  >
    {isSidebarOpen ? 
      <FaWindowClose size={20} color='#193956' /> : 
      <FaBarsStaggered size={20} color='#193956' style={{ transform: 'rotate(180deg)'}}/>
    }
  </button>
);

const Home = () => {
  const user = useSelector((state) => state.Auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState(localStorage.getItem('currentSection') || 'dashboard');

  useEffect(() => {
    if (!user) {
      dispatch(updateUser());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout');
      if (request.status === 200) {
        dispatch(Logout());
        navigate('/')
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
    localStorage.setItem('currentSection', path);
  };

  const sideNavItems = [
    { name: 'Dashboard', icon: <FaHome />, path: 'dashboard' },
    { name: 'My Team', icon: <RiTeamFill />, path: 'myteam' },
    { name: 'Project', icon: <FaTasks />, path: 'project' },
    { name: 'Notifications', icon: <FaBell />, path: 'notifications' },
    { name: 'Calendar', icon: <FaCalendar />, path: 'calendar' },
    { name: 'My Profile', icon: <FaUser />, path: 'myprofile' },
  ];

  const sectionComponents = {
    dashboard: <UserDashboard />,
    project: <UserProject user={user} />,
    myteam: <UserTeam user={user} />,
    notifications: <UserNotification />,
    calendar: <UserCalender />,
    myprofile: <UserProfile />,
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="top-navbar">
        <IconButton isSidebarOpen={isSidebarOpen} onClick={toggleSidebar} />
        <div className="logo">
          <img src="./logo.jpeg" alt="Project Pulse Logo" className="logo-img" />
          <span className="project-name"><h3>ProjectPulse</h3></span>
        </div>
        <div className="center-actions">
        <div className="myprofile" onClick={() => handleNavItemClicked('myprofile')}>
            <FaUser size={20} />
          </div>
          <div className="notifications" onClick={() => handleNavItemClicked('notifications')}>
            <FaBell size={20} />
          </div>
          <div className="calendar" onClick={() => handleNavItemClicked('calendar')}>
            <FaCalendar size={20} />
          </div>
          <div className="admin-profile">
            <h3>Welcome</h3>
            <p>{user && user.name}</p>
          </div>
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
