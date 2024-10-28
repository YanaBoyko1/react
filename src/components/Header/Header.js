import React from 'react';
import { HeaderContainer, Logo, Nav, StyledLink, SearchContainer } from './Header.styles'; 

function Header({ showSearch }) {
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
      <SearchContainer>
        {showSearch && <input type="text" placeholder="Search..." style={{ width: '100%' }} />}
      </SearchContainer>
    </HeaderContainer>
  );
}

export default Header;