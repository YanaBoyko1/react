// src/components/PrimaryButton/PrimaryButton.js
import React from 'react';

function PrimaryButton({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '10px 20px', cursor: 'pointer' }}>
      {children}
    </button>
  );
}

export default PrimaryButton;
