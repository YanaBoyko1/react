import React from 'react';
import { StyledButton } from './PrimaryButton.styles'; 

function PrimaryButton({ children }) {
  return <StyledButton>{children}</StyledButton>;
}

export default PrimaryButton;

