import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { deleteUser, get } from '../services/ApiEndpoint';
import { Logout, updateUser } from '../redux/AuthSlice';
import { post } from '../services/ApiEndpoint';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import { FaBell, FaCalendar, FaHome, FaUsers, FaTasks } from 'react-icons/fa';
import AdminDashboard from '../components/AdminModules/AdminDashboard.jsx';
import AdminMentor from '../components/AdminModules/AdminMentor.jsx';
import AdminProject from '../components/AdminModules/AdminProject.jsx';
import AdminNotification from '../components/AdminModules/AdminNotification';
import AdminCalendar from '../components/AdminModules/AdminCalendar.jsx';


const mapStateToProps = (state) => ({
  loggedInAdmin: state.Auth.user,
});

const mapDispatchToProps = {};

export function Admin({ loggedInAdmin }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentSection, setCurrentSection] = useState('dashboard');

  useEffect(() => {
    const getUsers = async () => {
      try {
        const request = await get('/api/admin/getuser');
        const response = request.data;
        if (request.status === 200) {
          setUsers(response.users);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      const request = await deleteUser(`/api/admin/delete/${id}`);
      const response = request.data;

      if (request.status === 200) {
        toast.success(response.message);
        getUsers();
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

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
    { name: 'Mentor', icon: <FaUsers />, path: 'mentor' },
    { name: 'Projects', icon: <FaTasks />, path: 'projects' },
    { name: 'Notifications', icon: <FaBell />, path: 'notifications' },
    { name: 'Calendar', icon: <FaCalendar />, path: 'calendar' },
  ];

  const sectionComponents = {
    dashboard: <AdminDashboard users={users} handleDelete={handleDelete} />,
    mentor: <AdminMentor />,
    projects: <AdminProject />,
    notifications: <AdminNotification />,
    calendar: <AdminCalendar />,
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
            {/* Replace with actual notification content */}
          </div>
          <div className="calendar" onClick={() => handleNavItemClicked('calendar')}>
            <FaCalendar size={20} />
            {/* Replace with actual calendar content */}
          </div>
        </div>

        <div className="admin-profile">
          <h3>Welcome</h3>
          <p>{loggedInAdmin.name}</p>
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
