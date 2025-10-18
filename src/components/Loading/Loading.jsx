// Imports necessários
import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animação de rotação para o spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Container principal do componente de loading
const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
`;

// Spinner animado
const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #333;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

// Texto de loading
const LoadingText = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin: 0;
`;

// Componente de loading com spinner e mensagem personalizada
function Loading({ message = "Carregando..." }) {
  return (
    <LoadingContainer>
      <Spinner />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
}

export default Loading;
