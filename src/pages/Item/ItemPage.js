// src/pages/Item/ItemPage.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Image, TextContainer, Title, Description, Price, BackButton, AddToCartButton } from './ItemPage.styles';

function ItemPage() {
  const { id } = useParams(); // Отримуємо id з URL
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${id}`); // Запит до бекенду
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleAddToCart = () => {
    console.log(`Added ${item.title} to cart`);
  };

  return (
    <>
      <Header />
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px' }}>
        <Image src={item.image} alt={item.title} />
        <TextContainer>
          <Title>{item.title}</Title>
          <Description>{item.description}</Description>
          <Price>Price: ${item.price}</Price>
          <div style={{ display: 'flex', gap: '10px' }}>
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

