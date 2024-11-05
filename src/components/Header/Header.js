// src/components/Header/Header.js
import React, { useContext } from 'react';
import { HeaderContainer, Logo, Nav, StyledLink, SearchContainer } from './Header.styles';
import { ItemContext } from '../../context/ItemContext';

function Header({ showSearch }) {
  const { setSearchTerm, applyFilters } = useContext(ItemContext); // Отримуємо applyFilters

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applyFilters(); 
    }
  };

  return (
    <HeaderContainer>
      <Logo>BoatPro</Logo>
      <Nav>
        <ul>
          <li><StyledLink to="/">Home</StyledLink></li>
          <li><StyledLink to="/catalog">Catalog</StyledLink></li>
          <li><StyledLink to="/cart">Cart</StyledLink></li>
        </ul>
      </Nav>
      {showSearch && (
        <SearchContainer>
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress} // Додаємо обробник клавіш
            style={{ width: '100%' }}
          />
        </SearchContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
