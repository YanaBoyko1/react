import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Використовуємо useNavigate для редиректу

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [homeItems, setHomeItems] = useState([]);
  const [catalogItems, setCatalogItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Хук для редиректу

  // Функція для отримання даних
  const fetchItems = useCallback(async () => {
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

      // Запит на сервер
      const response = await axios.get('http://localhost:5000/api/items', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Збереження отриманих даних
      setHomeItems(response.data);
      setCatalogItems(response.data); // ініціалізація каталогу
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
    fetchItems(); // Отримання даних після монтування компонента
  }, [fetchItems]);

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
