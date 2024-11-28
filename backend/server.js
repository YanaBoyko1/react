require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const { checkDatabaseConnection } = require('./db');

// Налаштування CORS
app.use(cors({
  origin: 'http://localhost:3000', // Дозволити доступ з вашого фронтенду
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use('/image', express.static(path.join(__dirname, 'image')));
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const itemRoutes = require('./routes/items');

// Middleware
app.use(express.json());

// Перевірка підключення до бази даних
checkDatabaseConnection();

// Підключення маршрутів
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/items', itemRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Static files served from: ${path.join(__dirname, '../public/image')}`);
});
