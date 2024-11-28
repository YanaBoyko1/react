// src/pages/Item/ItemPage.styles.js
import styled from 'styled-components';

export const ItemImage = styled.img`
  width: 500px;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin: 40px 40px 40px 0px;
  margin-left: -20px;
`;

export const TextContainer = styled.div`
  max-width: 400px;
  margin-left: 20px;
  margin-top: 40px;
`;

export const Title = styled.h1`
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  font-size: 1.1em;
  color: #666;
  margin-bottom: 20px;
`;

export const Price = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 1em;
  color: #333;
  border: 1px solid #333;
  background-color: transparent;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  max-width: 150px;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

export const AddToCartButton = styled.button`
  background-color: rgba(238, 170, 214, 1);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(70, 62, 135, 1);
  }
`;
