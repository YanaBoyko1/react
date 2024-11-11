import React, { useState, useContext } from 'react';
import { HeaderContainer, Logo, Nav, StyledLink, SearchContainer } from './Header.styles';
import { ItemContext } from '../../context/ItemContext'; // Імпортуємо ItemContext

function Header({ showSearch }) {
  const { setSearchTerm } = useContext(ItemContext); // Отримуємо setSearchTerm з контексту
  const [inputValue, setInputValue] = useState(''); // Локальний стан для пошукового поля

  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Оновлюємо значення поля
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue); // Застосовуємо пошуковий термін при натисканні Enter
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
            onKeyPress={handleKeyPress} // Пошук тригериться тільки при Enter
            style={{ width: '100%' }}
          />
        </SearchContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
