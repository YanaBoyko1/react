import React from 'react';
import Tile from '../Tile/Tile';

import motorboatImage from '../../image/Motorboat Z500.jpg';
import yachtImage from '../../image/Luxury Yacht X300.jpg';
import fishingBoatImage from '../../image/Fishing Boat Pro10.jpg';

function TileSection({ showExtra }) {
  const tilesData = [
    {
      title: 'Luxury Yacht X300',
      description: 'An elegant and spacious yacht designed for luxury and long trips.',
      image: yachtImage,
      price: 2415
    },
    {
      title: 'Motorboat Z500',
      description: 'Fast and agile, perfect for water sports and coastal cruising.',
      image: motorboatImage,
      price: 1200
    },
    {
      title: 'Fishing Boat Pro10',
      description: 'Built for the avid fisherman, this durable boat offers plenty of storage for gear.',
      image: fishingBoatImage,
      price: 900
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
      {tilesData.map((tile, index) => (
        <Tile
          key={index}
          title={tile.title}
          description={tile.description}
          image={tile.image}
          price={tile.price}
          showExtra={showExtra}
        />
      ))}
    </div>
  );
}

export default TileSection;

