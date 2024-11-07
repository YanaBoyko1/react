// src/components/TileSection/TileSection.js
import React from 'react';
import Tile from '../Tile/Tile';
import { ButtonContainer, VisitButton } from './TileSection.styles';

function TileSection({ items, onShowMore, isHomePage, showMoreVisible }) {
  if (!items || items.length === 0) {
    return <div>No items found</div>;
  }

  return (
    <>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {items.map((item) => (
          <Tile
            key={item.id}
            id={item.id}
            title={item.title}
            description={item.description}
            image={item.image}
            price={item.price}
            showExtra={!isHomePage} // Відображаємо "View More" тільки на сторінці каталогу
          />
        ))}
      </div>

      {isHomePage && showMoreVisible && ( // Відображаємо кнопку "Visit" тільки на головній сторінці
        <ButtonContainer>
          <VisitButton onClick={onShowMore}>
            Show More
          </VisitButton>
        </ButtonContainer>
      )}
    </>
  );
}

export default TileSection;
