// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import MainSection from './components/MainSection/MainSection';
import TileSection from './components/TileSection/TileSection';
import CatalogPage from './pages/Catalog/CatalogPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header /> 
              <MainSection />
              <TileSection /> 
              <Footer />
            </>
          } 
        />
        
        <Route 
          path="/catalog" 
          element={
            <>
              <Header showSearch /> 
              <CatalogPage />
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
;
