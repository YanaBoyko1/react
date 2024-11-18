const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());
app.use('/image', express.static(path.join(__dirname, '../public/image')));

// Дані товарів
let items = [
  { id: 1, title: 'Luxury Yacht X300', description: 'An elegant yacht designed for comfort and luxury.', price: 2415, type: 'Yacht', size: 'Large', material: 'Fiberglass', maxQuantity: 4, image: '/image/Fishing_Boat_Pro10.jpg' },
  { id: 2, title: 'Motorboat Z500', description: 'Perfect motorboat for water sports enthusiasts.', price: 1200, type: 'Motorboat', size: 'Medium', material: 'Aluminum',maxQuantity: 2, image: '/image/Luxury_Yacht_X300.jpg' },
  { id: 3, title: 'Fishing Boat Pro10',description: 'Built for fishermen who need stability and durability.', price: 900, type: 'Fishing Boat', size: 'Small', material:'Wood', maxQuantity: 1, image: '/image/Fishing_Boat_Pro10.jpg' },
  { id: 4, title: 'Sailing Boat S200', description: 'A small, agile sailing boat suitable for beginners.', price: 1500, type: 'Sailing Boat', size: 'Small', material: 'Wood', maxQuantity: 8, image: '/image/Fishing_Boat_Pro10.jpg' },
  { id: 5, title: 'Catamaran C100', description: 'Spacious catamaran for relaxing and leisure on the water.', price: 3000, type: 'Catamaran', size: 'Large', material: 'Fiberglass', maxQuantity: 7, image: '/image/Luxury_Yacht_X300.jpg' }
];


app.get('/api/items', (req, res) => {
  let filteredItems = items;
  const { type, size, material, searchTerm } = req.query;

  if (type) filteredItems = filteredItems.filter(item => item.type === type);
  if (size) filteredItems = filteredItems.filter(item => item.size === size);
  if (material) filteredItems = filteredItems.filter(item => item.material === material);
  if (searchTerm) {
    filteredItems = filteredItems.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  res.json(filteredItems);
});
// Шлях до файлу корзини
const cartFilePath = path.join(__dirname, 'data', 'cart.json');

// Функція для зчитування даних корзини з файлу
const getCartData = () => {
  try {
    const data = fs.readFileSync(cartFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];  // Якщо файл не існує або є помилка при зчитуванні, повертаємо порожній масив
  }
};

// Функція для запису даних корзини в файл
const saveCartData = (cartData) => {
  try {
    fs.writeFileSync(cartFilePath, JSON.stringify(cartData, null, 2));
  } catch (error) {
    console.error('Error saving cart data:', error);
  }
};

// Отримання всіх товарів
app.get('/api/items', (req, res) => {
  res.json(items);
});

// Отримання конкретного товару
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Отримання даних корзини
app.get('/api/cart', (req, res) => {
  const cart = getCartData();  // Читаємо корзину з файлу
  res.json(cart);
});

// Додавання товару в корзину
app.post('/api/cart', (req, res) => {
  const { id, quantity, selectedColor } = req.body;

  if (!id || !quantity || !selectedColor) {
    return res.status(400).json({ message: 'Missing required fields: id, quantity, selectedColor' });
  }

  const item = items.find(i => i.id === id);
  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  if (quantity > item.maxQuantity) {
    return res.status(400).json({ message: `Максимальна кількість для цього товару: ${item.maxQuantity}` });
  }

  const cart = getCartData();
  const existingCartItem = cart.find(c => c.id === id && c.selectedColor === selectedColor);

  if (existingCartItem) {
    existingCartItem.quantity = Math.min(existingCartItem.quantity + quantity, item.maxQuantity);
  } else {
    cart.push({ ...item, quantity, selectedColor });
  }

  saveCartData(cart);
  res.json(cart);
});

// Видалення товару з корзини
app.post('/api/cart/remove', (req, res) => {
  const { id, selectedColor } = req.body;

  if (!id || !selectedColor) {
    return res.status(400).json({ message: 'Missing required fields: id, selectedColor' });
  }

  const cart = getCartData();
  const updatedCart = cart.filter(item => !(item.id === id && item.selectedColor === selectedColor)); // Фільтруємо товар

  if (updatedCart.length === cart.length) {
    return res.status(404).json({ message: 'Item not found in cart' });
  }

  saveCartData(updatedCart);
  res.json(updatedCart);  // Відправляємо оновлену корзину назад
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
