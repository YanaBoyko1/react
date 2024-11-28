const express = require('express');
const { pool } = require('../db'); // Підключення до бази даних
const authenticate = require('../middleware/authenticate'); // Перевірка токена

const router = express.Router();

// Завантаження кошика


router.get('/', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    const [cartItems] = await pool.query(
      `SELECT carts.*, items.title, items.image 
       FROM carts 
       JOIN items ON carts.item_id = items.id 
       WHERE carts.user_id = ?`,
      [userId]
    );

    res.json({ message: 'Cart fetched successfully', data: cartItems });
  } catch (error) {
    console.error('Error fetching cart:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


// Додавання товару до кошика
router.post('/', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { itemId, quantity, selectedColor, price } = req.body;

  if (!itemId || !quantity || !price) {
    return res.status(400).json({ message: 'Item ID, quantity, and price are required' });
  }

  try {
    const [existingItem] = await pool.query(
      'SELECT * FROM carts WHERE user_id = ? AND item_id = ? AND selected_color = ?',
      [userId, itemId, selectedColor || 'No color']
    );

    if (existingItem.length > 0) {
      // Якщо товар вже є у кошику, збільшуємо кількість
      await pool.query(
        'UPDATE carts SET quantity = quantity + ?, price = ? WHERE user_id = ? AND item_id = ? AND selected_color = ?',
        [quantity, price, userId, itemId, selectedColor || 'No color']
      );
    } else {
      // Якщо товару немає у кошику, додаємо його
      await pool.query(
        'INSERT INTO carts (user_id, item_id, quantity, selected_color, price) VALUES (?, ?, ?, ?, ?)',
        [userId, itemId, quantity, selectedColor || 'No color', price]
      );
    }

    const [updatedCart] = await pool.query(
      `SELECT carts.*, items.title, items.image 
       FROM carts 
       JOIN items ON carts.item_id = items.id 
       WHERE carts.user_id = ?`,
      [userId]
    );

    res.status(201).json({ message: 'Item added to cart', data: updatedCart });
  } catch (error) {
    console.error('Error adding to cart:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Видалення товару з кошика
router.post('/remove', authenticate, async (req, res) => {
  const { id, selectedColor } = req.body;
  const userId = req.user.id;

  if (!id || !selectedColor) {
    return res.status(400).json({ message: 'Missing required fields: id, selectedColor' });
  }

  try {
    const [item] = await pool.query(
      'SELECT * FROM carts WHERE id = ? AND LOWER(selected_color) = LOWER(?) AND user_id = ?',
      [id, selectedColor, userId]
    );

    if (item.length === 0) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    await pool.query(
      'DELETE FROM carts WHERE id = ? AND LOWER(selected_color) = LOWER(?) AND user_id = ?',
      [id, selectedColor, userId]
    );

    const [updatedCart] = await pool.query(
      `SELECT carts.*, items.title, items.image 
       FROM carts 
       JOIN items ON carts.item_id = items.id 
       WHERE carts.user_id = ?`,
      [userId]
    );

    res.json({ message: 'Item removed successfully', data: updatedCart });
  } catch (error) {
    console.error('Error removing item from cart:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Зміна кількості товару
router.put('/quantity', authenticate, async (req, res) => {
  const { id, selectedColor, quantity } = req.body;
  const userId = req.user.id;

  if (!id || !selectedColor || quantity == null) {
    return res.status(400).json({ message: 'Missing required fields: id, selectedColor, quantity' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE carts SET quantity = ? WHERE id = ? AND LOWER(selected_color) = LOWER(?) AND user_id = ?',
      [quantity, id, selectedColor, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Item not found or not associated with this user' });
    }

    res.json({ message: 'Quantity updated successfully' });
  } catch (error) {
    console.error('Error updating quantity:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
// Очистка всього кошика після підтвердження замовлення
router.post('/clear', authenticate, async (req, res) => {
  const userId = req.user.id;

  try {
    // Видаляємо всі товари з кошика користувача
    await pool.query('DELETE FROM carts WHERE user_id = ?', [userId]);

    res.json({ message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Error clearing cart:', error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;
