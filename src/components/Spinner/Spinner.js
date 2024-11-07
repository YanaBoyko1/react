import React from 'react';
import { SpinnerContainer, Bounce } from './Spinner.styles'; // Імпортуємо стилі

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Bounce />
      <Bounce />
    </SpinnerContainer>
  );
};

export default Spinner;
