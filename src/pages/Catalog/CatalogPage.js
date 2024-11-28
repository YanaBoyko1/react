import React, { useContext, useEffect } from 'react';
import { ItemContext } from '../../context/ItemContext';
import TileSection from '../../components/TileSection/TileSection';
import FilterBar from '../../components/FilterBar/FilterBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';

const CatalogPage = () => {
  const { catalogItems, loading, loadCatalogItems, resetFiltersAndSearch } = useContext(ItemContext);

  useEffect(() => {
    resetFiltersAndSearch(); // Очищення фільтрів при завантаженні сторінки
  }, [resetFiltersAndSearch]);

  const handleFilterChange = (filters) => {
    loadCatalogItems(filters);
  };

  return (
    <>
      <Header showSearch={true} />
      <FilterBar onFilterChange={handleFilterChange} />
      {loading ? (
        <Spinner />
      ) : (
        <TileSection items={catalogItems} isHomePage={false} showExtra={true} />
      )}
      <Footer />
    </>
  );
};

export default CatalogPage;
