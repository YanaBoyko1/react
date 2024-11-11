const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use('/image', express.static(path.join(__dirname, '../public/image')));

let items = [
  { id: 1, title: 'Luxury Yacht X300', description: 'An elegant yacht designed for comfort and luxury.', price: 2415, type: 'Yacht', size: 'Large', material: 'Fiberglass', image: '/image/Fishing_Boat_Pro10.jpg' },
  { id: 2, title: 'Motorboat Z500', description: 'Perfect motorboat for water sports enthusiasts.', price: 1200, type: 'Motorboat', size: 'Medium', material: 'Aluminum', image: '/image/Luxury_Yacht_X300.jpg' },
  { id: 3, title: 'Fishing Boat Pro10', description: 'Built for fishermen who need stability and durability.', price: 900, type: 'Fishing Boat', size: 'Small', material: 'Wood', image: '/image/Fishing_Boat_Pro10.jpg' },
  { id: 4, title: 'Sailing Boat S200', description: 'A small, agile sailing boat suitable for beginners.', price: 1500, type: 'Sailing Boat', size: 'Small', material: 'Wood', image: '/image/Fishing_Boat_Pro10.jpg' },
  { id: 5, title: 'Catamaran C100', description: 'Spacious catamaran for relaxing and leisure on the water.', price: 3000, type: 'Catamaran', size: 'Large', material: 'Fiberglass', image: '/image/Luxury_Yacht_X300.jpg' }
];

// Маршрут для отримання товарів із можливістю фільтрації по `type`, `size`, `material` та `searchTerm`
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
