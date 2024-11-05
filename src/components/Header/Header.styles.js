import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: rgba(243, 248, 251, 1);
  color: black;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  max-width: 40px;
  color: rgba(70, 62, 135, 1);
`;

export const Nav = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  margin-left: -10px;

  ul {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin-left: -40px;
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    gap: 65px;
  }
`;

export const StyledLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: rgba(254, 165, 221, 1);
  }
`;

export const SearchContainer = styled.div`
  max-width: 100px; 
`;
