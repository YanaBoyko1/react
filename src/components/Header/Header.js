// Header.js
import React, { useState } from 'react';
import { HeaderContainer, Logo, Nav, StyledLink, SearchContainer } from './Header.styles';

function Header({ showSearch, setSearchTerm }) {
  const [inputValue, setInputValue] = useState(''); // Local state for search input

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Update input field value only
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue); // Apply search term only when Enter is pressed
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
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Trigger search only on Enter key press
            style={{ width: '100%' }}
          />
        </SearchContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;

