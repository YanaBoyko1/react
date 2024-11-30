import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchItems } from '../api/api'; // Оновлений шлях до файлу

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [homeItems, setHomeItems] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Хук для редиректу

  const fetchCatalogItems = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken'); // Отримуємо токен із localStorage

      // Якщо токен відсутній і не на сторінках логіну або реєстрації
      if (!token) {
        console.warn('Token is missing. Redirecting to login.');
        if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
          navigate('/login'); // Перенаправлення на сторінку логіну
        }
        return;
      }

      const data = await fetchItems(token);  // Використовуємо імпортовану функцію fetchItems
      setHomeItems(data);
      setCatalogItems(data);
    } catch (error) {
      console.error('Error fetching items:', error.message);
      if (error.response?.status === 401) {
        navigate('/login'); // Перенаправлення на логін у разі помилки авторизації
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // Функція для скидання фільтрів та пошуку
  const resetFiltersAndSearch = useCallback(() => {
    setCatalogItems(homeItems); // Скидання каталогу на початкові значення
    setSearchTerm(''); // Очищення пошукового запиту
  }, [homeItems]);

  // Функція для видалення елемента
  const removeItem = (id) => {
    const updatedItems = homeItems.filter(item => item.id !== id); // Фільтрація елементів
    setHomeItems(updatedItems); // Оновлення списку homeItems
    setCatalogItems(updatedItems); // Оновлення catalogItems
  };

  useEffect(() => {
    fetchCatalogItems(); // Отримуємо дані після монтування компонента
  }, [fetchCatalogItems]);

  return (
    <ItemContext.Provider
      value={{
        homeItems,
        catalogItems,
        loading,
        searchTerm,
        setSearchTerm,
        resetFiltersAndSearch, // Функція для скидання фільтрів
        removeItem, // Функція для видалення елементів
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};
