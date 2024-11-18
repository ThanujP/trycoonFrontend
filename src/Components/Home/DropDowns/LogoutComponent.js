import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Make a request to your backend to invalidate the token
      await axios.post('http://127.0.0.1:8000/api/trycoon/logout/', null, {
        headers: { Authorization: `Token ${token}` }
      });

      // Clear the token from local storage
      localStorage.removeItem('authToken');

      // Redirect to login page or home page
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle any errors (e.g., show an error message to the user)
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutComponent;