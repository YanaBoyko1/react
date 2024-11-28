import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TileContainer, TileImage, TileTitle, TileDescription, TilePrice, ViewMoreButton } from './Tile.styles';

function Tile({ id, title, description, image, price, showExtra }) {
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/item/${id}`);
  };

  // Формуємо правильний шлях до зображення, усуваючи зайві слеші
  const formattedImage = image.replace(/\/+/g, '/'); // Усуває зайві слеші між частинами шляху

  console.log("Formatted Image URL:", formattedImage); // Логування шляху до зображення

  return (
    <TileContainer>
      <TileImage
        src={`http://localhost:5000${formattedImage}`}  // Використовуємо правильний шлях для зображення
        alt={title}
      />
      
      <TileTitle>{title}</TileTitle>
      <TileDescription>{description}</TileDescription>
      <TilePrice>Price: ${price}</TilePrice>

      {showExtra && (
        <ViewMoreButton onClick={handleViewMore}>View More</ViewMoreButton>
      )}
    </TileContainer>
  );
}

export default Tile;
