
import React, { useContext } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import TileSection from '../../components/TileSection/TileSection';
import FilterBar from '../../components/FilterBar/FilterBar';
import { ItemContext } from '../../context/ItemContext';

function CatalogPage() {
  const { filteredItems } = useContext(ItemContext); 

  return (
    <div>
      <Header showSearch />
      <FilterBar /> 
      <TileSection items={filteredItems} showExtra showViewMore={false} /> 
      <Footer />
    </div>
  );
}

export default CatalogPage;
