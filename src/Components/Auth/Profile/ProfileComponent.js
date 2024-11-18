import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProfileComponent.css';

const ProfileComponent = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const navigate = useNavigate();

  // Fetch user profile data
  const fetchUserProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.get('http://127.0.0.1:8000/api/trycoon/profile/', {
        headers: { Authorization: `Token ${token}` }
      });

      setUserProfile(response.data);
      setEditedProfile(response.data);
    } catch (err) {
      handleFetchError(err);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // Handle errors during fetch
  const handleFetchError = (err) => {
    console.error('Error fetching profile:', err);

    if (err.response && err.response.status === 401) {
      localStorage.removeItem('authToken');
      navigate('/login');
    } else {
      setError(err.message || 'An error occurred while fetching user profile');
    }
  };

  // Check if user is authenticated, then fetch profile
  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login');
      } else {
        await fetchUserProfile();
      }
    };

    checkAuthAndFetchProfile();
  }, [fetchUserProfile, navigate]);

  // Handle profile input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  // Submit edited profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const token = localStorage.getItem('authToken');
      await axios.put('http://127.0.0.1:8000/api/trycoon/profile/', editedProfile, {
        headers: { Authorization: `Token ${token}` }
      });

      setUserProfile(editedProfile);
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message || 'An error occurred while updating profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  // Conditional rendering based on loading, error, or profile states
  if (isLoading) return <div className="profile-loading">Loading...</div>;
  if (error) {
    return (
      <div className="profile-error">
        <p>Error: {error}</p>
        <button onClick={fetchUserProfile}>Try Again</button>
      </div>
    );
  }
  if (!userProfile) return <div className="profile-not-found">No profile information available.</div>;

  // Render profile form or info view
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      {isEditing ? (
        <ProfileEditForm
          editedProfile={editedProfile}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setIsEditing={setIsEditing}
          isLoading={isLoading}
        />
      ) : (
        <ProfileInfo userProfile={userProfile} setIsEditing={setIsEditing} />
      )}
      <button onClick={fetchUserProfile} disabled={isLoading}>
        {isLoading ? 'Refreshing...' : 'Refresh Profile'}
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

// Profile Edit Form Component
const ProfileEditForm = ({ editedProfile, handleInputChange, handleSubmit, setIsEditing, isLoading }) => (
  <form onSubmit={handleSubmit} className="profile-form">
    <div>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" name="username" value={editedProfile.username || ''} disabled />
    </div>
    <div>
      <label htmlFor="first_name">First Name:</label>
      <input type="text" id="first_name" name="first_name" value={editedProfile.first_name || ''} onChange={handleInputChange} />
    </div>
    <div>
      <label htmlFor="last_name">Last Name:</label>
      <input type="text" id="last_name" name="last_name" value={editedProfile.last_name || ''} onChange={handleInputChange} />
    </div>
    <div>
      <label htmlFor="email">Email:</label>
      <input type="email" id="email" name="email" value={editedProfile.email || ''} onChange={handleInputChange} required />
    </div>
    <button type="submit" disabled={isLoading}>
      {isLoading ? 'Saving...' : 'Save Changes'}
    </button>
    <button type="button" onClick={() => setIsEditing(false)} disabled={isLoading}>
      Cancel
    </button>
  </form>
);

// Profile Info Component
const ProfileInfo = ({ userProfile, setIsEditing }) => (
  <div className="profile-info">
    <p><strong>Username:</strong> {userProfile.username}</p>
    <p><strong>First Name:</strong> {userProfile.first_name}</p>
    <p><strong>Last Name:</strong> {userProfile.last_name}</p>
    <p><strong>Email:</strong> {userProfile.email}</p>
    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
  </div>
);

export default ProfileComponent;
