import React from 'react';

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
    <div 
      onClick={() => onClick && onClick(pokemon)}
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '1rem',
        textAlign: 'center',
        backgroundColor: 'white',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
      onMouseOver={(e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
      }}
      onMouseOut={(e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
      }}
    >
      {/* Imagem do Pokémon */}
      <div style={{
        width: '120px',
        height: '120px',
        margin: '0 auto 1rem',
        backgroundColor: '#f0f0f0',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '3px solid #fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        {pokemon.sprites?.front_default ? (
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'contain' 
            }}
          />
        ) : (
          <span style={{ fontSize: '2rem' }}>🎮</span>
        )}
      </div>

      {/* Nome do Pokémon */}
      <h3 style={{ 
        textTransform: 'capitalize', 
        marginBottom: '0.5rem',
        color: '#333',
        fontSize: '1.1rem'
      }}>
        {pokemon.name}
      </h3>

      {/* ID do Pokémon */}
      <p style={{ 
        color: '#666', 
        fontSize: '0.9rem',
        marginBottom: '0.5rem'
      }}>
        #{pokemon.id.toString().padStart(3, '0')}
      </p>

      {/* Tipos do Pokémon */}
      {pokemon.types && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {pokemon.types.map((typeInfo, index) => (
            <span
              key={index}
              style={{
                backgroundColor: getTypeColor(typeInfo.type.name),
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '12px',
                fontSize: '0.8rem',
                fontWeight: '500',
                textTransform: 'capitalize'
              }}
            >
              {typeInfo.type.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
