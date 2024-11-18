import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AccountDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate(); // Optional: for programmatic navigation on logout

  const styles = {
    accountDropdown: {
      position: 'relative',
      display: 'inline-block',
    },
    accountDropdownToggle: {
      backgroundColor: '#14213D',
      color: '#FFFFFF',
      padding: '10px 15px',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    accountDropdownMenu: {
      position: 'absolute',
      top: '100%',
      right: '0',
      backgroundColor: '#FFFFFF',
      border: '1px solid #14213D',
      borderRadius: '5px',
      boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      minWidth: '150px',
      zIndex: 1,
    },
    link: {
      display: 'block',
      padding: '10px 15px',
      textDecoration: 'none',
      color: '#000000',
      transition: 'background-color 0.3s',
    },
    linkHover: {
      backgroundColor: '#F8F8F8',
    },
  };

  const handleLogout = () => {
    setIsOpen(false);
    navigate('/login');
  };


  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div style={styles.accountDropdown} ref={dropdownRef}>
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        style={styles.accountDropdownToggle}
      >
        Account
      </div>
      {isOpen && (
        <div style={styles.accountDropdownMenu}>
          <Link 
            to="/profile" 
            onClick={() => setIsOpen(false)} 
            style={styles.link}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F8F8F8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Profile
          </Link>
          <Link 
            to="/settings" 
            onClick={() => setIsOpen(false)} 
            style={styles.link}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F8F8F8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Settings
          </Link>
          <div 
            onClick={handleLogout} 
            style={{ ...styles.link, cursor: 'pointer' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#F8F8F8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropDown;
