import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {
  ItemImage,
  TextContainer,
  Title,
  Description,
  Price,
  BackButton,
  AddToCartButton,
} from './ItemPage.styles';

function ItemPage() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${id}`);
        console.log('Fetched item:', response.data); // Лог для перевірки API
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedColor) {
      setError('Please select a color before adding to the cart');
      return;
    }

    if (quantity < 1 || quantity > 10) {
      setError('Quantity must be between 1 and 10');
      return;
    }

    setError('');
    dispatch(addToCart({ ...item, quantity, selectedColor }));
    navigate('/cart');
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (isNaN(value) || value <= 0) {
      setQuantity(1);
    } else {
      setQuantity(Math.min(value, 10)); // Максимальна кількість - 10
    }
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
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '20px',
        }}
      >
        {/* Виправлений шлях до зображення */}
        <div>
          <ItemImage
            src={`http://localhost:5000${item.image.replace('//image', '/image')}`}
            alt={item.title}
          />
        </div>
        <TextContainer>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          <Price>Price: ${item.price}</Price>
          {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <input
              type="number"
              id="quantity"
              value={quantity}
              min="1"
              max="10"  // Максимальна кількість 10
              onChange={handleQuantityChange}
              style={{ width: '60px', textAlign: 'center' }}
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
            <BackButton onClick={() => navigate(-1)}>Go back</BackButton>
            <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
          </div>
        </TextContainer>
      </div>
      <Footer />
    </>
  );
}

export default ItemPage;
