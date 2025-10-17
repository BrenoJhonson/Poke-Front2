import React from 'react';

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
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      {/* Botão de voltar */}
      <button 
        onClick={onBack}
        style={{
          backgroundColor: '#333',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '2rem'
        }}
      >
        ← Voltar para Lista
      </button>

      {/* Card de detalhes */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        {/* Imagem grande */}
        <div style={{
          width: '200px',
          height: '200px',
          margin: '0 auto 1.5rem',
          backgroundColor: '#f0f0f0',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '5px solid #fff',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
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
            <span style={{ fontSize: '4rem' }}>🎮</span>
          )}
        </div>

        {/* Nome e ID */}
        <h1 style={{ 
          textTransform: 'capitalize', 
          marginBottom: '0.5rem',
          color: '#333',
          fontSize: '2rem'
        }}>
          {pokemon.name}
        </h1>
        
        <p style={{ 
          color: '#666', 
          fontSize: '1.2rem',
          marginBottom: '1.5rem'
        }}>
          #{pokemon.id.toString().padStart(3, '0')}
        </p>

        {/* Tipos */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>Tipos:</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            {pokemon.types?.map((typeInfo, index) => (
              <span
                key={index}
                style={{
                  backgroundColor: getTypeColor(typeInfo.type.name),
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  textTransform: 'capitalize'
                }}
              >
                {typeInfo.type.name}
              </span>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        {pokemon.stats && (
          <div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>Estatísticas:</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {pokemon.stats.map((stat, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}>
                  <div style={{ 
                    fontWeight: '600', 
                    color: '#333',
                    textTransform: 'capitalize',
                    marginBottom: '0.5rem'
                  }}>
                    {stat.stat.name.replace('-', ' ')}
                  </div>
                  <div style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    color: '#667eea' 
                  }}>
                    {stat.base_stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonDetails;
