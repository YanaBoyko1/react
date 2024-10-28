import React from 'react';
import { TileContainer, TileImage, TileTitle, TileDescription, TilePrice, ViewMoreButton } from './Tile.styles';

function Tile({ title, description, image, price, showExtra }) {
  return (
    <TileContainer>
      <TileImage src={image} alt={title} />
      <TileTitle>{title}</TileTitle>
      <TileDescription>{description}</TileDescription>

      {showExtra && (
        <>
          <TilePrice>Price: ${price}</TilePrice>
          <ViewMoreButton>View more</ViewMoreButton>
        </>
      )}
    </TileContainer>
  );
}

export default Tile;

