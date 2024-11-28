const express = require('express');
const { pool } = require('../db');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/', authenticate, async (req, res) => {
  const userId = req.user.id;
  const { firstName, lastName, email, phone, address } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO orders (user_id, first_name, last_name, email, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, firstName, lastName, email, phone, address]
    );

    const orderId = result.insertId;

    await pool.query(
      'INSERT INTO order_items (order_id, item_id, quantity, selected_color) SELECT ?, item_id, quantity, selected_color FROM carts WHERE user_id = ?',
      [orderId, userId]
    );

    await pool.query('DELETE FROM carts WHERE user_id = ?', [userId]);

    res.status(201).json({ success: true, message: 'Order created successfully', orderId });
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
