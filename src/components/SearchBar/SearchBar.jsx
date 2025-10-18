import React, { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const SearchBarMain = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchInputContainer = styled.div`
  flex: 1;
  position: relative;
  min-width: 200px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s ease;
  padding-left: 2.5rem;
  box-sizing: border-box;

  &:focus {
    border-color: #667eea;
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.2rem;
`;

const FilterButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: ${props => props.selectedType === 'all' ? '#667eea' : props.typeColor};
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    opacity: 0.9;
  }
`;

const ArrowIcon = styled.span`
  transform: ${props => props.isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
`;

const ClearButton = styled.button`
  padding: 0.75rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: #5a6268;
  }
`;

const FilterPanel = styled.div`
  border-top: 1px solid #e1e5e9;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const FilterTitle = styled.h4`
  margin-bottom: 1rem;
  color: #333;
  font-size: 1rem;
  font-weight: 600;
  margin-top: 0;
`;

const TypeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 0.5rem;
`;

const TypeButton = styled.button`
  padding: 0.5rem;
  border: 2px solid;
  border-color: ${props => props.isSelected ? props.typeColor : '#e1e5e9'};
  background-color: ${props => props.isSelected ? props.typeColor : 'white'};
  color: ${props => props.isSelected ? 'white' : '#333'};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: capitalize;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  &:hover {
    background-color: ${props => props.isSelected ? props.typeColor : '#f0f0f0'};
  }
`;

function SearchBar({ searchTerm, onSearchChange, selectedType, onTypeChange }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const pokemonTypes = [
    'all', 'normal', 'fire', 'water', 'electric', 'grass', 'ice', 
    'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 
    'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
  ];

  const getTypeColor = (type) => {
    const colors = {
      all: '#666',
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

  const getTypeIcon = (type) => {
    const icons = {
      all: '🔍',
      normal: '⚪',
      fire: '🔥',
      water: '💧',
      electric: '⚡',
      grass: '🌱',
      ice: '❄️',
      fighting: '👊',
      poison: '☠️',
      ground: '🏔️',
      flying: '🕊️',
      psychic: '🔮',
      bug: '🐛',
      rock: '🪨',
      ghost: '👻',
      dragon: '🐉',
      dark: '🌙',
      steel: '⚙️',
      fairy: '🧚'
    };
    return icons[type] || '❓';
  };

  const handleClearFilters = () => {
    onSearchChange('');
    onTypeChange('all');
    setIsExpanded(false);
  };

  return (
    <SearchContainer>
      <SearchBarMain>
        <SearchInputContainer>
          <SearchInput
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar Pokémon por nome..."
          />
          <SearchIcon>🔍</SearchIcon>
        </SearchInputContainer>

        <FilterButton
          selectedType={selectedType}
          typeColor={getTypeColor(selectedType)}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{getTypeIcon(selectedType)}</span>
          <span>{selectedType === 'all' ? 'Todos' : selectedType}</span>
          <ArrowIcon isExpanded={isExpanded}>▼</ArrowIcon>
        </FilterButton>

        {(searchTerm || selectedType !== 'all') && (
          <ClearButton onClick={handleClearFilters}>
            ✕
          </ClearButton>
        )}
      </SearchBarMain>

      {isExpanded && (
        <FilterPanel>
          <FilterTitle>Filtrar por Tipo:</FilterTitle>
          
          <TypeGrid>
            {pokemonTypes.map((type) => (
              <TypeButton
                key={type}
                onClick={() => {
                  onTypeChange(type);
                  setIsExpanded(false);
                }}
                isSelected={selectedType === type}
                typeColor={getTypeColor(type)}
              >
                <span>{getTypeIcon(type)}</span>
                <span>{type === 'all' ? 'Todos' : type}</span>
              </TypeButton>
            ))}
          </TypeGrid>
        </FilterPanel>
      )}
    </SearchContainer>
  );
}

export default SearchBar;