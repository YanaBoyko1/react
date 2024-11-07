// api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/items';

export const fetchItems = async (filters = {}) => {
  const response = await axios.get(API_URL, { params: filters });
  return response.data;
};
