import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Using useNavigate instead of window.location.href

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [homeItems, setHomeItems] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // React Router's navigate function for redirects

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('Token is missing. Redirecting to login.');
        navigate('/login'); // Redirect to login using React Router
        return;
      }

      const response = await axios.get('http://localhost:5000/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHomeItems(response.data);
      setCatalogItems(response.data); // Initialize the catalog
    } catch (error) {
      console.error('Error fetching items:', error.message);
      if (error.response?.status === 401) {
        navigate('/login'); // Redirect to login if unauthorized
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const resetFiltersAndSearch = useCallback(() => {
    setCatalogItems(homeItems); // Reset to the original data
    setSearchTerm(''); // Clear search field
  }, [homeItems]);

  const removeItem = (id) => {
    const updatedItems = homeItems.filter(item => item.id !== id);  // Filter out item
    setHomeItems(updatedItems);  // Update homeItems state
    setCatalogItems(updatedItems);  // Ensure catalogItems is also updated
  };

  useEffect(() => {
    fetchItems(); // Fetch items when the component mounts
  }, [fetchItems]);

  return (
    <ItemContext.Provider
      value={{
        homeItems,
        catalogItems,
        loading,
        searchTerm,
        setSearchTerm,
        resetFiltersAndSearch, // Pass reset function to context
        removeItem, // Providing removeItem method to context
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
