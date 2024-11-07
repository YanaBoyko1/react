// App.js
import React, { useContext, useState } from 'react'; // Додаємо useContext та useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainSection from './components/MainSection/MainSection';
import TileSection from './components/TileSection/TileSection';
import Spinner from './components/Spinner/Spinner';
import CatalogPage from './pages/Catalog/CatalogPage';
import ItemPage from './pages/Item/ItemPage';
import { ItemProvider, ItemContext } from './context/ItemContext'; // Імпортуємо ItemContext та ItemProvider

function HomeContent() {
  const { homeItems, loading } = useContext(ItemContext); // Використовуємо homeItems з контексту
  const [visibleItemsCount, setVisibleItemsCount] = useState(3);

  const handleShowMore = () => {
    setVisibleItemsCount(prevCount => prevCount + 3); // Збільшуємо видимі товари на 3 при натисканні
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Header showSearch={false} />
      <MainSection />
      <TileSection
        items={homeItems.slice(0, visibleItemsCount)} // Показуємо тільки обмежену кількість товарів
        isHomePage={true} // Вказуємо, що це головна сторінка
        onShowMore={handleShowMore}
        showMoreVisible={visibleItemsCount < homeItems.length} // Відображаємо кнопку, якщо є ще товари для показу
      />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ItemProvider> {/* Обгортка додатку у контекст */}
      <Router>
        <Routes>
          <Route path="/" element={<HomeContent />} /> {/* Головна сторінка */}
          <Route path="/catalog" element={<CatalogPage />} /> {/* Сторінка каталогу */}
          <Route path="/item/:id" element={<ItemPage />} /> {/* Сторінка товару з деталями */}
        </Routes>
      </Router>
    </ItemProvider>
  );
}

export default App;
