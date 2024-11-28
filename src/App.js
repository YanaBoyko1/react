import React, { useState, useContext } from 'react'; // Import useState and useContext
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CatalogPage from './pages/Catalog/CatalogPage';
import CartPage from './pages/CartPage/CartPage';
import { ItemProvider, ItemContext } from './context/ItemContext'; // Import ItemContext and ItemProvider
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import SuccessPage from './pages/SuccessPage/SuccessPage';
import MainSection from './components/MainSection/MainSection';
import TileSection from './components/TileSection/TileSection';
import ItemPage from './pages/Item/ItemPage';

function HomeContent() {
  const { homeItems, loading } = useContext(ItemContext); // Using ItemContext
  const [visibleItemsCount, setVisibleItemsCount] = useState(3); // Using useState

  const handleShowMore = () => {
    setVisibleItemsCount((prevCount) => prevCount + 3);
  };

  if (loading) {
    return <div>Завантаження...</div>;
  }

  if (homeItems.length === 0) {
    return <div>No items available</div>;
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

function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Provider store={store}>
      <Router> {/* Ensure Router wraps the entire app */}
        <ItemProvider> {/* Ensure ItemProvider is inside Router */}
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<ProtectedRoute><HomeContent /></ProtectedRoute>} />
            <Route path="/catalog" element={<ProtectedRoute><CatalogPage /></ProtectedRoute>} />
            <Route path="/item/:id" element={<ProtectedRoute><ItemPage /></ProtectedRoute>} />
            <Route path="/checkout" element={<CheckoutPage />} /> 
            <Route path="/success" element={<SuccessPage />} /> 
      
            <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />


            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </ItemProvider>
      </Router>
    </Provider>
  );
}

export default App;
