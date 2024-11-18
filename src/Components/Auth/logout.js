import React, { useEffect, useState } from 'react';
import { logout } from '../../../api';
import { useHistory } from 'react-router-dom';
import './logout.css';

function Logout() {
  const [message, setMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout();
        setMessage('Logout successful.');
        // Redirect to login after a short delay
        setTimeout(() => {
          history.push('/login');
        }, 1500); // 1.5 second delay
      } catch (error) {
        setMessage('Error logging out. Please try again.');
      }
    };

    handleLogout();
  }, [history]);

  return (
    <div>
      <h2>Logout</h2>
      <p>{message}</p>
    </div>
  );
}

export default Logout;
