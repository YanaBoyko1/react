import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TileContainer, TileImage, TileTitle, TileDescription, TilePrice, ViewMoreButton } from './Tile.styles';

function Tile({ id, title, description, image, price, showExtra }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/item/${id}`);
  };

  return (
    <TileContainer>
      {/* Відображення зображення товару */}
      <TileImage src={`http://localhost:5000${image}`} alt={title} /> {/* Додаємо повний шлях до зображення */}

      <TileTitle>{title}</TileTitle>
      <TileDescription>{description}</TileDescription>
      <TilePrice>Price: ${price}</TilePrice>

      {/* Кнопка "View More", якщо showExtra === true */}
      {showExtra && (
        <ViewMoreButton onClick={handleViewMore}>View More</ViewMoreButton>
      )}
    </TileContainer>
  );
}

export default Tile;
