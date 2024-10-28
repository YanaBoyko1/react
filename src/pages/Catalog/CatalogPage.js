import React from 'react';
import Footer from '../../components/Footer/Footer';
import TileSection from '../../components/TileSection/TileSection';
import FilterBar from '../../components/FilterBar/FilterBar';

function CatalogPage() {
  return (
    <div>
      <FilterBar />
      <TileSection showExtra />
      <Footer />
    </div>
  );
}

export default CatalogPage;


