import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderContainer, Logo, Nav, StyledLink, SearchContainer } from './Header.styles';
import { ItemContext } from '../../context/ItemContext';

function Header({ showSearch }) {
  const navigate = useNavigate();
  const context = useContext(ItemContext);
  const [inputValue, setInputValue] = useState('');

  if (!context || !context.setSearchTerm) {
    console.error('setSearchTerm is not defined in ItemContext. Ensure ItemProvider wraps your application.');
    return null;
  }

  const { setSearchTerm } = context;

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(inputValue);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user'); // Видаляємо дані авторизації
    navigate('/login'); // Перенаправляємо на сторінку логіну
  };

  return (
    <HeaderContainer>
      <Logo>BoatPro</Logo>
      <Nav>
        <ul>
          <li><StyledLink to="/">Home</StyledLink></li>
          <li><StyledLink to="/catalog">Catalog</StyledLink></li>
          <li><StyledLink to="/cart">Cart</StyledLink></li>
          <li><button onClick={handleSignOut} style={{ border: 'none', background: 'none', color: '#007BFF', cursor: 'pointer' }}>Sign Out</button></li>
        </ul>
      </Nav>
      {showSearch && (
        <SearchContainer>
          <input
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            style={{ width: '100%' }}
          />
        </SearchContainer>
      )}
    </HeaderContainer>
  );
}

export default Header;
