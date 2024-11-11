import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [homeItems, setHomeItems] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Додаємо `searchTerm` та `setSearchTerm`

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/items');
      setHomeItems(response.data);
      setCatalogItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setHomeItems([]);
      setCatalogItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Автоматичне завантаження елементів при зміні `searchTerm`
  useEffect(() => {
    loadCatalogItems({ searchTerm });
  }, [searchTerm]);

  const loadCatalogItems = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/items', { params: filters });
      setCatalogItems(response.data);
    } catch (error) {
      console.error('Error loading filtered items:', error);
      setCatalogItems([]);
    } finally {
      setLoading(false);
    }
  };

  const resetFiltersAndSearch = () => {
    setCatalogItems(homeItems);
    setSearchTerm(''); // Скидаємо пошук
  };

  return (
    <ItemContext.Provider value={{
      homeItems,
      catalogItems,
      loading,
      setSearchTerm, // Додаємо setSearchTerm до контексту
      loadCatalogItems,
      resetFiltersAndSearch,
    }}>
      {children}
    </ItemContext.Provider>
  );
};

export default ItemProvider;
