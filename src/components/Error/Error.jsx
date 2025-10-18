import React from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  margin: 1rem;
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h3`
  color: #c33;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  margin-top: 0;
`;

const ErrorMessage = styled.p`
  color: #c33;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const RetryButton = styled.button`
  background-color: #c33;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #a22;
  }
`;

function Error({ message = "Algo deu errado!", onRetry }) {
  return (
    <ErrorContainer>
      <ErrorIcon>⚠️</ErrorIcon>
      <ErrorTitle>Erro</ErrorTitle>
      <ErrorMessage>{message}</ErrorMessage>
      {onRetry && (
        <RetryButton onClick={onRetry}>
          Tentar novamente
        </RetryButton>
      )}
    </ErrorContainer>
  );
}

export default Error;
