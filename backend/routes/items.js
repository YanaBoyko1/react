const express = require('express');
const { pool } = require('../db'); // Підключення до бази даних
const path = require('path');

const router = express.Router();

// Отримання всіх товарів
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM items');
    const items = rows.map((item) => ({
      ...item,
      image: `/image/${item.image}`, // Додаємо динамічний шлях до зображення
    }));
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Отримання одного товару за ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query('SELECT * FROM items WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    const item = {
      ...rows[0],
      image: `/image/${rows[0].image}`, // Додаємо динамічний шлях до зображення
    };
    res.json(item);
  } catch (error) {
    console.error('Error fetching item by ID:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Додавання нового товару
router.post('/', async (req, res) => {
  const { title, description, price, type, size, material, maxQuantity, image } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO items (title, description, price, type, size, material, maxQuantity, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, price, type, size, material, maxQuantity, image]
    );
    res.status(201).json({ message: 'Item added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding item:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Оновлення товару
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, price, type, size, material, maxQuantity, image } = req.body;

  try {
    const [result] = await pool.query(
      'UPDATE items SET title = ?, description = ?, price = ?, type = ?, size = ?, material = ?, maxQuantity = ?, image = ? WHERE id = ?',
      [title, description, price, type, size, material, maxQuantity, image, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Видалення товару
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query('DELETE FROM items WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
