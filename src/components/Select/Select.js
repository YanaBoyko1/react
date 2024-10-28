
import React from 'react';
import { StyledSelect } from './Select.styles'; 

function Select({ options }) {
  return (
    <StyledSelect>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </StyledSelect>
  );
}

export default Select;
