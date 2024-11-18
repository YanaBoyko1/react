import styled from 'styled-components';

export const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;

`;

export const CartTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
`;

export const CartItemContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ddd;
`;

export const TotalAmount = styled.div`
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #ccc;
  cursor: pointer;

  &:hover {
    background-color: #bbb;
  }
`;

export const ContinueButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
