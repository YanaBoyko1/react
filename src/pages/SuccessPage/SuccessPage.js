import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SuccessContainer, Title, Message, BackButton } from './SuccessPage.styles';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <SuccessContainer>
      <Title>Success!</Title>
      <Message>Your order was successfully submitted! Check your email for confirmation.</Message>
      <BackButton onClick={() => navigate('/catalog')}>Go back to Catalog</BackButton>
    </SuccessContainer>
  );
};

export default SuccessPage;
