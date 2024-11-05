import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header/Header'; // Імпортуємо Header
import Footer from '../../components/Footer/Footer';
import { ItemContext } from '../../context/ItemContext';
import { Image, TextContainer, Title, Description, Price, BackButton, AddToCartButton } from './ItemPage.styles'; // Додайте новий стиль для кнопки

function ItemPage() {
  const { id } = useParams();
  const { items } = useContext(ItemContext);

  const item = items.find((item) => item.id === parseInt(id));

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

