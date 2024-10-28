
import styled from 'styled-components';

export const StyledSelect = styled.select`
  padding: 5px 50px;
  border: 1px solid rgba(70, 62, 135, 1);
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  appearance: none;
  background-color: white;
  margin-left: 30px;

  &:focus {
    outline: none;
    border-color: #aaa;
  }
`;
