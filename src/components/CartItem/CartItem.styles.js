// src/components/CartItem/CartItem.styles.js
import styled from 'styled-components';

export const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

export const ItemDetails = styled.div`
  flex: 1;
  margin-left: 15px;
`;

export const ItemTitle = styled.span`
  font-size: 1rem;
  font-weight: bold;
  color: #333;
`;

export const ItemProperty = styled.span`
  font-size: 0.9rem;
  color: #666;
  margin-top: 5px;
  display: block;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const QuantityButton = styled.button`
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 1rem;
  border-radius: 4px;

  &:hover {
    background-color: #ddd;
  }
`;

export const ItemPrice = styled.span`
  font-weight: bold;
  font-size: 1rem;
  color: #333;
`;

export const RemoveButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 14px;

  &:hover {
    background-color: darkred;
  }
`;

