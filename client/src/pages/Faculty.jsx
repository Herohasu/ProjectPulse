import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Logout } from '../redux/AuthSlice';
import { post } from '../services/ApiEndpoint';
import { useNavigate } from 'react-router-dom';
import { IoIosChatbubbles } from "react-icons/io";
import './Faculty.css';
import { FaBell, FaCalendar, FaHome, FaTasks, FaWindowClose, FaUser } from 'react-icons/fa';
import { FaBarsStaggered } from "react-icons/fa6";
import FacultyDashboard from '../components/FacultyModules/FacultyDashboard.jsx';
import FacultyProject from '../components/FacultyModules/FacultyProject.jsx';
import FacultyNotification from '../components/FacultyModules/FacultyNotification';
import FacultyCalendar from '../components/FacultyModules/FacultyCalendar.jsx';
import FacultyProfile from '../components/FacultyModules/FacultyProfile.jsx';
import Chat from '../components/Chat/chat.jsx';

const mapStateToProps = (state) => ({
  loggedInFaculty: state.Auth.user,
});

const mapDispatchToProps = {};

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

export function Faculty({ loggedInFaculty }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
  const [currentSection, setCurrentSection] = useState(localStorage.getItem('facultyCurrentSection') || 'dashboard');

  useEffect(() => {
    if (loggedInFaculty) {
      if (!localStorage.getItem('facultyCurrentSection')) {
        navigate('/faculty#dashboard');
        setCurrentSection('dashboard');
      } else {
       
        localStorage.setItem('facultyCurrentSection', currentSection);
      }
    } else {
      navigate('/');
    }
  }, [loggedInFaculty, currentSection, navigate]);

  const handleLogout = async () => {
    try {
      const request = await post('/api/auth/logout');
      if (request.status === 200) {
        dispatch(Logout());
        localStorage.removeItem('facultyCurrentSection'); 
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
    localStorage.setItem('facultyCurrentSection', path);
    navigate(`/faculty#${path}`);
  };

  const sideNavItems = [
    { name: 'Dashboard', icon: <FaHome />, path: 'dashboard' },
    { name: 'Projects', icon: <FaTasks />, path: 'projects' },
    { name: 'Chat', icon: <IoIosChatbubbles />, path: 'chat' },
    { name: 'Notifications', icon: <FaBell />, path: 'notifications' },
    { name: 'Calendar', icon: <FaCalendar />, path: 'calendar' },
    { name: 'My Profile', icon: <FaUser />, path: 'myprofile' }
  ];

  const sectionComponents = {
    dashboard: <FacultyDashboard />,
    projects: <FacultyProject />,
    notifications: <FacultyNotification />,
    chat:<Chat user={loggedInFaculty} role="faculty"/>,
    calendar: <FacultyCalendar />,
    myprofile: <FacultyProfile />
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
          <div className="notifications" onClick={() => handleNavItemClicked('notifications')}>
            <FaBell size={20} />
          </div>
          <div className="calendar" onClick={() => handleNavItemClicked('calendar')}>
            <FaCalendar size={20} />
          </div>
          <div className="faculty-profile">
            <h3>Welcome</h3>
            <p>{loggedInFaculty.name}</p>
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
      <div className={`faculty-container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        {sectionComponents[currentSection]}
      </div>
    </>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Faculty);
