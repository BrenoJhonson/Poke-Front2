import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0 0;
  font-size: 1rem;
  opacity: 0.9;
`;

function Header() {
  return (
    <HeaderContainer>
      <Title>🎮 Pokédex Interativa</Title>
      <Subtitle>Explore o mundo dos Pokémon</Subtitle>
    </HeaderContainer>
  );
}

export default Header;
