const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Дозволяємо доступ до зображень у папці public/image через /image
app.use('/image', express.static(path.join(__dirname, 'public/image')));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


let items = [
  { id: 1, title: 'Luxury Yacht X300', description: 'An elegant yacht.', price: 2415, type: 'Yacht', size: 'Large', material: 'Fiberglass', image: '/image/Fishing_Boat_Pro10.jpg'  },
  { id: 2, title: 'Motorboat Z500', description: 'Perfect for water sports.', price: 1200, type: 'Motorboat', size: 'Medium', material: 'Aluminum', image: '/image/Luxury_Yacht_X300.jpg' },
  { id: 3, title: 'Fishing Boat Pro10', description: 'Built for fishermen.', price: 900, type: 'Fishing Boat', size: 'Small', material: 'Wood', image: '/image/Fishing_Boat_Pro10.jpg' },
  { id: 4, title: 'Sailing Boat S200', description: 'A small, agile sailing boat.', price: 1500, type: 'Sailing Boat', size: 'Small', material: 'Wood', image: '/image/Sailing_Boat_S200.jpg' },
  { id: 5, title: 'Catamaran C100', description: 'Spacious catamaran for leisure.', price: 3000, type: 'Catamaran', size: 'Large', material: 'Fiberglass', image: '/image/Catamaran_C100.jpg' },
  { id: 6, title: 'Speedboat Fast50', description: 'High-speed boat for adrenaline.', price: 2100, type: 'Speedboat', size: 'Medium', material: 'Aluminum', image: '/image/Speedboat_Fast50.jpg' }
];

// Маршрут для отримання всіх товарів із можливістю фільтрації
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

// Маршрут для отримання одного товару за id
app.get('/api/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);

  if (!item) {
    return res.status(404).json({ message: 'Item not found' });
  }

  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
