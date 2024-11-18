import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Image, TextContainer, Title, Description, Price, BackButton, AddToCartButton } from './ItemPage.styles';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState(''); // Для зберігання помилки
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    // Перевірка на вибір кольору
    if (!selectedColor) {
      setError('Please select a color before adding to the cart');
      return;
    }

    // Перевірка на кількість
    if (quantity > item.maxQuantity) {
      setError(`Maximum quantity available is ${item.maxQuantity}`);
      return;
    }

    // Очищення повідомлення про помилку
    setError('');

    // Додавання товару до кошика
    dispatch(addToCart({ ...item, quantity, selectedColor }));
    navigate('/cart');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px' }}>
        <Image src={item.image} alt={item.title} />
        <TextContainer>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          <Price>Price: ${item.price}</Price>

          {error && <div style={{ color: 'red' }}>{error}</div>} {/* Виведення повідомлення про помилку */}

          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              max={item.maxQuantity}
              onChange={(e) => setQuantity(Math.min(Number(e.target.value), item.maxQuantity))}
              style={{ marginLeft: '10px', width: '60px' }}
            />
          </div>

          <div style={{ marginTop: '10px' }}>
            <label htmlFor="color">Select Color:</label>
            <select
              id="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{ marginLeft: '10px' }}
            >
              <option value="">Choose a color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <BackButton onClick={() => window.history.back()}>Go back</BackButton>
            <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
          </div>
        </TextContainer>
      </div>
      <Footer />
    </>
  );
}

export default ItemPage;
