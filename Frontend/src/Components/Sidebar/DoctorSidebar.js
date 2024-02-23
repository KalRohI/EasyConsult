import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../Assets/Logo.jpeg';


const Sidebar = () => {
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  // Define a function to check if the current route matches a given path
  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <ul className="nav-items">
        <li>
          <Link to="/doctor/" className={isActive('/doctor/') ? 'active' : ''}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/doctor/appointments" className={isActive('/doctor/appointments') ? 'active' : ''}>
            Appointments
          </Link>
        </li>
        <li>
          <Link to="/doctor/consultations" className={isActive('/doctor/consultation') ? 'active' : ''}>
            Consultations
          </Link>
        </li>
        <li>
          <Link to="/doctor/patients" className={isActive('/doctor/patients') ? 'active' : ''}>
            Patients
          </Link>
        </li>
      </ul>
      <div className="settings">
        <button onClick={toggleSettings}>Settings</button>
        
        {showSettings && (
          <ul className="settings-dropdown">
            <li>
              <Link to="/doctor/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
