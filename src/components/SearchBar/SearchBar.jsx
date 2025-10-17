import React, { useState } from 'react';

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
    <div style={{
      backgroundColor: 'white',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      marginBottom: '2rem',
      overflow: 'hidden',
      transition: 'all 0.3s ease'
    }}>
      {/* Barra de pesquisa principal */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        gap: '1rem'
      }}>
        {/* Campo de busca */}
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar Pokémon por nome..."
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              border: '2px solid #e1e5e9',
              borderRadius: '8px',
              fontSize: '1rem',
              outline: 'none',
              transition: 'border-color 0.2s ease',
              paddingLeft: '2.5rem'
            }}
            onFocus={(e) => e.target.style.borderColor = '#667eea'}
            onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
          />
          <span style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '1.2rem'
          }}>
            🔍
          </span>
        </div>

        {/* Botão de filtros */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            padding: '0.75rem 1rem',
            backgroundColor: selectedType === 'all' ? '#667eea' : getTypeColor(selectedType),
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s ease'
          }}
        >
          <span>{getTypeIcon(selectedType)}</span>
          <span>{selectedType === 'all' ? 'Todos' : selectedType}</span>
          <span style={{ 
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}>
            ▼
          </span>
        </button>

        {/* Botão limpar */}
        {(searchTerm || selectedType !== 'all') && (
          <button
            onClick={handleClearFilters}
            style={{
              padding: '0.75rem',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ✕
          </button>
        )}
      </div>

      {/* Painel de filtros expandido */}
      {isExpanded && (
        <div style={{
          borderTop: '1px solid #e1e5e9',
          padding: '1rem',
          backgroundColor: '#f8f9fa'
        }}>
          <h4 style={{ 
            marginBottom: '1rem', 
            color: '#333',
            fontSize: '1rem',
            fontWeight: '600'
          }}>
            Filtrar por Tipo:
          </h4>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
            gap: '0.5rem'
          }}>
            {pokemonTypes.map((type) => (
              <button
                key={type}
                onClick={() => {
                  onTypeChange(type);
                  setIsExpanded(false);
                }}
                style={{
                  padding: '0.5rem',
                  border: '2px solid',
                  borderColor: selectedType === type ? getTypeColor(type) : '#e1e5e9',
                  backgroundColor: selectedType === type ? getTypeColor(type) : 'white',
                  color: selectedType === type ? 'white' : '#333',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  textTransform: 'capitalize',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.25rem'
                }}
                onMouseOver={(e) => {
                  if (selectedType !== type) {
                    e.target.style.backgroundColor = '#f0f0f0';
                  }
                }}
                onMouseOut={(e) => {
                  if (selectedType !== type) {
                    e.target.style.backgroundColor = 'white';
                  }
                }}
              >
                <span>{getTypeIcon(type)}</span>
                <span>{type === 'all' ? 'Todos' : type}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
