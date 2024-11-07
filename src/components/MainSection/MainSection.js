import React from 'react';
import { MainSectionContainer, TileImage, TextContainer, Heading, Description } from './MainSection.styles';

function MainSection() {
  return (
    <MainSectionContainer>
      {/* Використовуйте абсолютний шлях до зображення без імпорту */}
      <TileImage src="/image/ship.jpg" alt="Perfect Boat" />
      <TextContainer>
        <Heading>Discover Your Perfect Boat</Heading>
        <Description>
          Explore our exclusive range of boats, designed for adventure and comfort. Whether you're looking for a sleek motorboat, a spacious yacht, or a durable fishing boat, we have something for every sea lover.
        </Description>
      </TextContainer>
    </MainSectionContainer>
  );
}

export default MainSection;
