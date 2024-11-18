import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/trycoon';

// Define axios instance with base URL for easy reuse
const API = axios.create({
    baseURL: API_URL,
});

// Login function with detailed error handling
export const login = async (username, password) => {
    try {
        const response = await API.post('/login/', { username, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Invalid credentials');
        } else if (error.request) {
            throw new Error('No response from server. Check your network connection.');
        } else {
            throw new Error('An error occurred. Please try again later.');
        }
    }
};

// Signup function with error handling
export const signup = async (userData) => {
    try {
        const response = await API.post('/signup/', userData);
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Signup failed. Please try again.');
        } else if (error.request) {
            throw new Error('No response from server. Check your network connection.');
        } else {
            throw new Error('An error occurred. Please try again later.');
        }
    }
};

// Logout function with error handling
export const logout = async () => {
    try {
        const response = await API.post('/logout/');
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Logout failed. Please try again.');
        } else if (error.request) {
            throw new Error('No response from server. Check your network connection.');
        } else {
            throw new Error('An error occurred. Please try again later.');
        }
    }
};
