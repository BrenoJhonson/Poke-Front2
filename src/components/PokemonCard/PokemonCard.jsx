import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

const PokemonImageContainer = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  border: 3px solid #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PokemonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PokemonName = styled.h3`
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 1.1rem;
  margin-top: 0;
`;

const PokemonId = styled.p`
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  margin-top: 0;
`;

const TypesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
`;

const TypeBadge = styled.span`
  background-color: ${props => props.color || '#666'};
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
`;

function PokemonCard({ pokemon, onClick }) {
  const getTypeColor = (type) => {
    const colors = {
      normal: '#A8A878',
      fire: '#F08030',
      water: '#6890F0',
      electric: '#F8D030',
      grass: '#78C850',
      ice: '#98D8D8',
      fighting: '#C03028',
      poison: '#A040A0',
      ground: '#E0C068',
      flying: '#A890F0',
      psychic: '#F85888',
      bug: '#A8B820',
      rock: '#B8A038',
      ghost: '#705898',
      dragon: '#7038F8',
      dark: '#705848',
      steel: '#B8B8D0',
      fairy: '#EE99AC'
    };
    return colors[type] || '#666';
  };

  return (
    <CardContainer onClick={() => onClick && onClick(pokemon)}>
      <PokemonImageContainer>
        {pokemon.sprites?.front_default ? (
          <PokemonImage 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
          />
        ) : (
          '🎮'
        )}
      </PokemonImageContainer>

      <PokemonName>{pokemon.name}</PokemonName>
      <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>

      <TypesContainer>
        {pokemon.types?.map((typeInfo, index) => (
          <TypeBadge 
            key={index} 
            color={getTypeColor(typeInfo.type.name)}
          >
            {typeInfo.type.name}
          </TypeBadge>
        ))}
      </TypesContainer>
    </CardContainer>
  );
}

export default PokemonCard;
