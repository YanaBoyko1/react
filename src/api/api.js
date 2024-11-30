import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

export const fetchItems = async (token) => {
  try {
    const response = await axios.get('http://localhost:5000/api/items', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data; // Повертаємо дані
  } catch (error) {
    throw error.response?.data?.message || 'Error fetching items';
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      username,
      email,
      password
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

