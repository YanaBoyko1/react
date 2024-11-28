import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  SuccessContainer,
  Title,
  Message,
  BackButton,
} from './SuccessPage.styles'; // Make sure the path is correct

const SuccessPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Function to clear the cart
  const clearCart = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      await axios.post(
        'http://localhost:5000/api/cart/clear', // API endpoint to clear the cart
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearCart(); // Call to clear the cart when the page loads
  }, []);

  // Function to navigate to catalog page
  const handleBackToCatalog = () => {
    navigate('/catalog');
  };

  return (
    <SuccessContainer>
      <Title>Success!</Title>
      <Message>Your order was successfully submitted! Your cart has been cleared.</Message>

      {loading ? (
        <p>Clearing cart...</p>
      ) : (
        <BackButton onClick={handleBackToCatalog}>Back to Catalog</BackButton>
      )}
    </SuccessContainer>
  );
};

export default SuccessPage;
