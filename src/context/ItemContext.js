import React, { createContext, useState, useEffect } from 'react';
import motorboatImage from '../image/Motorboat Z500.jpg';
import yachtImage from '../image/Luxury Yacht X300.jpg';
import fishingBoatImage from '../image/Fishing Boat Pro10.jpg';

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items] = useState([
    {
      id: 1,
      title: 'Luxury Yacht X300',
      description: 'An elegant and spacious yacht designed for luxury and long trips.',
      price: 2415,
      type: 'Yacht',
      size: 'Large',
      material: 'Fiberglass',
      image: yachtImage,
    },
    {
      id: 2,
      title: 'Motorboat Z500',
      description: 'Fast and agile, perfect for water sports and coastal cruising.',
      price: 1200,
      type: 'Motorboat',
      size: 'Medium',
      material: 'Aluminum',
      image: motorboatImage,
    },
    {
      id: 3,
      title: 'Fishing Boat Pro10',
      description: 'Built for the avid fisherman, this durable boat offers plenty of storage for gear.',
      price: 900,
      type: 'Fishing Boat',
      size: 'Small',
      material: 'Wood',
      image: fishingBoatImage,
    },
    {
      id: 4,
      title: 'Fish 10',
      description: 'Built for the avid fisherman, this durable boat offers plenty of storage for gear.',
      price: 90,
      type: 'Fishing Boat',
      size: 'Small',
      material: 'Wood',
      image: fishingBoatImage,
    },
  ]);

  const [filteredItems, setFilteredItems] = useState(items);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ type: '', size: '', material: '' });

  const applyFilters = () => {
    let filtered = items;

    if (filters.type) {
      filtered = filtered.filter(item => item.type === filters.type);
    }

    if (filters.size) {
      filtered = filtered.filter(item => item.size === filters.size);
    }

    if (filters.material) {
      filtered = filtered.filter(item => item.material === filters.material);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  };

  const updateFilters = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  return (
    <ItemContext.Provider value={{ items, filteredItems, setSearchTerm, updateFilters, applyFilters }}>
      {children}
    </ItemContext.Provider>
  );
};
