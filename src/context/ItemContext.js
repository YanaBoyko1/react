// src/context/ItemContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [homeItems, setHomeItems] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', size: '', material: '' });

  // Функція для завантаження товарів із затримкою
  const fetchItems = async (params = {}) => {
    setLoading(true);
    try {
      // Штучна затримка в 500 мс
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const response = await axios.get('http://localhost:5000/api/items', { params });
      return response.data;
    } catch (error) {
      console.error('Помилка при отриманні даних:', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Завантаження товарів для головної сторінки
  useEffect(() => {
    const loadItems = async () => {
      const itemsData = await fetchItems();
      setItems(itemsData);
      setHomeItems(itemsData);
    };
    loadItems();
  }, []);

  // Завантаження товарів для каталогу з урахуванням фільтрів і пошуку
  useEffect(() => {
    const loadCatalogItems = async () => {
      const itemsData = await fetchItems({ ...filters, searchTerm });
      setCatalogItems(itemsData);
    };
    loadCatalogItems();
  }, [filters, searchTerm]);

  // Функція для оновлення фільтрів
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <ItemContext.Provider value={{
      items,
      homeItems,
      catalogItems,
      loading,
      setSearchTerm,
      updateFilters,
    }}>
      {children}
    </ItemContext.Provider>
  );
};
