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
          <Link to="/patient/" className={isActive('/patient/') ? 'active' : ''}>
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/patient/consultations" className={isActive('/patient/consultations') ? 'active' : ''}>
            Consultations
          </Link>
        </li>
        <li>
          <Link to="/patient/activeconsultation" className={isActive('/patient/activeconsultation') ? 'active' : ''}>
            Active Consultation
          </Link>
        </li>
        <li>
          <Link to="/patient/searchdoctor" className={isActive('/patient/searchdoctor') ? 'active' : ''}>
            Search for Doctor
          </Link>
        </li> 
        {/* <li>
          <Link to="/patient/doctordetails" className={isActive('/patient/doctordetails') ? 'active' : ''}>
            Doctor Details
          </Link>
        </li> */}
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
