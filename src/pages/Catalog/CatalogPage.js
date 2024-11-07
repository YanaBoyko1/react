// CatalogPage.js
import React, { useContext } from 'react';
import { ItemContext } from '../../context/ItemContext';
import TileSection from '../../components/TileSection/TileSection';
import FilterBar from '../../components/FilterBar/FilterBar';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Spinner from '../../components/Spinner/Spinner';

function CatalogPage() {
  const { catalogItems, loading, setSearchTerm, updateFilters } = useContext(ItemContext);

  return (
    <>
      <Header showSearch={true} setSearchTerm={setSearchTerm} />
      <FilterBar onFilterChange={updateFilters} />
      {loading ? (
        <Spinner />
      ) : (
        <TileSection
          items={catalogItems}
          isHomePage={false} // Вказуємо, що це не головна сторінка, показуємо "View More"
          showExtra={true} // Показуємо кнопку "View More" на кожному елементі каталогу
        />
      )}
      <Footer />
    </>
  );
}

export default CatalogPage;
