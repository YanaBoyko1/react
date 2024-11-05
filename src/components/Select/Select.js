// src/components/Select/Select.js
import React from 'react';

function Select({ options, onChange }) {
  return (
    <select onChange={onChange} style={{ padding: '8px', borderRadius: '4px' }}>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
