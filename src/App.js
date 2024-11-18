// src/App.js
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainSection from './components/MainSection/MainSection';
import TileSection from './components/TileSection/TileSection';
import Spinner from './components/Spinner/Spinner';
import CatalogPage from './pages/Catalog/CatalogPage';
import ItemPage from './pages/Item/ItemPage';
import CartPage from './pages/CartPage/CartPage';
import { ItemProvider, ItemContext } from './context/ItemContext';

function HomeContent() {
  const { homeItems, loading } = useContext(ItemContext);
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);

  const handleShowMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + 3);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header showSearch={false} />
      <MainSection />
      <TileSection
        items={homeItems.slice(0, visibleItemsCount)}
        isHomePage={true}
        onShowMore={handleShowMore}
        showMoreVisible={visibleItemsCount < homeItems.length}
      />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ItemProvider>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/" element={<HomeContent />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/item/:id" element={<ItemPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </Provider>
    </ItemProvider>
  );
}

export default App;
