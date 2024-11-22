import React from 'react';
import styled from 'styled-components';

const ErrorSummaryContainer = styled.div`
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
`;

const ErrorList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ErrorItem = styled.li`
  font-size: 14px;
`;

const ErrorSummary = ({ errors }) => {
  const errorMessages = Object.entries(errors).map(([field, message]) => ({
    field,
    message,
  }));

  return (
    errorMessages.length > 0 && (
      <ErrorSummaryContainer>
        <p>Please fix the following errors:</p>
        <ErrorList>
          {errorMessages.map((error, index) => (
            <ErrorItem key={index}>
              {error.message}
            </ErrorItem>
          ))}
        </ErrorList>
      </ErrorSummaryContainer>
    )
  );
};

export default ErrorSummary;

