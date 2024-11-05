// src/components/FilterBar/FilterBar.styles.js
import styled from 'styled-components';

export const FilterBarContainer = styled.div`
  display: flex;
  justify-content: space-between; /* Випадаючі списки зліва, кнопка справа */
  align-items: center;
  padding: 10px;
  gap: 10px;
  background-color: rgba(252, 241, 249, 1);
`;

export const FiltersContainer = styled.div`
  display: flex;
  gap: 15px; /* Відстань між фільтрами */
`;

