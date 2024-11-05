// src/components/Tile/Tile.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TileContainer, TileImage, TileTitle, TileDescription, TilePrice, ViewMoreButton } from './Tile.styles';

function Tile({ id, title, description, image, price, showExtra }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/item/${id}`); // Перехід на сторінку з ідентифікатором товару
  };

  return (
    <TileContainer>
      <TileImage src={image} alt={title} />
      <TileTitle>{title}</TileTitle>
      <TileDescription>{description}</TileDescription>

      {showExtra && ( // Відображаємо кнопку "View more" тільки якщо showExtra === true
        <>
          <TilePrice>Price: ${price}</TilePrice>
          <ViewMoreButton onClick={handleViewMore}>View more</ViewMoreButton>
        </>
      )}
    </TileContainer>
  );
}

export default Tile;
