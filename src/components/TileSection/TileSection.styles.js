// src/components/TileSection/TileSection.styles.js
import styled from 'styled-components';

export const ButtonContainer = styled.div`
  margin-top: 40px; 
  display: flex;
  margin-bottom: 70px;
  
  justify-content: center; /* Центруємо кнопку */
`;

export const VisitButton = styled.button`
  background-color: rgba(238, 170, 214, 1);
  color: white;
  padding: 15px 50px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: rgba(70, 62, 135, 1);
  }
`;

export const ViewMoreButton = styled.button`
  background-color: rgba(238, 170, 214, 1);
  color: white;
  padding: 15px 40px;
  border: none;
  border-radius: 8px;
  font-size: 20px;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    background-color: rgba(70, 62, 135, 1);
  }
`;
