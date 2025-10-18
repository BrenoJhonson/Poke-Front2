import React from 'react';
import styled from 'styled-components';

const DetailsContainer = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2rem;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #555;
  }
`;

const DetailsCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const PokemonImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PokemonImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PokemonIcon = styled.span`
  font-size: 4rem;
`;

const PokemonName = styled.h1`
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 2rem;
  margin-top: 0;
`;

const PokemonId = styled.p`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  margin-top: 0;
`;

const TypesSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
  margin-top: 0;
`;

const TypesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const TypeBadge = styled.span`
  background-color: ${props => props.color};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: capitalize;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const StatCard = styled.div`
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const StatName = styled.div`
  font-weight: 600;
  color: #333;
  text-transform: capitalize;
  margin-bottom: 0.5rem;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
`;

const AbilityBadge = styled.span`
  background-color: #667eea;
  color: white;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  margin: 0.2rem;
  display: inline-block;
`;

const HiddenAbilityBadge = styled(AbilityBadge)`
  background-color: #f56565;
`;

function PokemonDetails({ pokemon, onBack }) {
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

  if (!pokemon) {
    return <div>Pokémon não encontrado</div>;
  }

  return (
    <DetailsContainer>
      <BackButton onClick={onBack}>
        ← Voltar à lista
      </BackButton>

      <DetailsCard>
        <PokemonImageContainer>
          {pokemon.sprites?.front_default ? (
            <PokemonImage 
              src={pokemon.sprites.front_default} 
              alt={pokemon.name}
            />
          ) : (
            <PokemonIcon>🎮</PokemonIcon>
          )}
        </PokemonImageContainer>

        <PokemonName>{pokemon.name}</PokemonName>
        <PokemonId>#{pokemon.id.toString().padStart(3, '0')}</PokemonId>

        <TypesSection>
          <SectionTitle>Tipos:</SectionTitle>
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
        </TypesSection>

        {pokemon.stats && (
          <div>
            <SectionTitle>Estatísticas:</SectionTitle>
            <StatsGrid>
              {pokemon.stats.map((stat, index) => (
                <StatCard key={index}>
                  <StatName>
                    {stat.stat.name.replace('-', ' ')}
                  </StatName>
                  <StatValue>
                    {stat.base_stat}
                  </StatValue>
                </StatCard>
              ))}
            </StatsGrid>
          </div>
        )}

        {pokemon.abilities && (
          <div style={{ marginTop: '2rem' }}>
            <SectionTitle>Habilidades:</SectionTitle>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem' }}>
              {pokemon.abilities.map((abilityInfo, index) => (
                abilityInfo.is_hidden ? (
                  <HiddenAbilityBadge key={index} title="Habilidade Oculta">
                    {abilityInfo.ability.name.replace('-', ' ')} (Oculta)
                  </HiddenAbilityBadge>
                ) : (
                  <AbilityBadge key={index}>
                    {abilityInfo.ability.name.replace('-', ' ')}
                  </AbilityBadge>
                )
              ))}
            </div>
          </div>
        )}
      </DetailsCard>
    </DetailsContainer>
  );
}

export default PokemonDetails;