import React, { useContext, useState } from 'react';  
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainSection from './components/MainSection/MainSection';
import TileSection from './components/TileSection/TileSection';
import CatalogPage from './pages/Catalog/CatalogPage';
import ItemPage from './pages/Item/ItemPage'; 
import { ItemProvider, ItemContext } from './context/ItemContext'; 

function HomeContent() {
  const { items } = useContext(ItemContext); 
  const [visibleItemsCount, setVisibleItemsCount] = useState(3); // Кількість видимих елементів

  const handleShowMore = () => {
    setVisibleItemsCount(prevCount => prevCount + 3); 
  };

  return (
    <>
      <Header />
      <MainSection />
      <TileSection items={items.slice(0, visibleItemsCount)} showExtra={true} onShowMore={handleShowMore} isHomePage={true} />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ItemProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomeContent />} /> 
          <Route path="/catalog" element={<CatalogPage />} /> 
          <Route path="/item/:id" element={<ItemPage />} /> 
        </Routes>
      </Router>
    </ItemProvider>
  );
}

export default App;


