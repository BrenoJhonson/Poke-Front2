import React, { useState, useEffect } from 'react';
import pokemonService from '../../services/pokemonService';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPokemonList();
  }, []);

  const loadPokemonList = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await pokemonService.getPokemonList();
      setPokemonList(data.results);
    } catch (err) {
      setError('Erro ao carregar lista de Pokémon');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Carregando Pokémon..." />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPokemonList} />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lista de Pokémon</h2>
      <p>Encontrados {pokemonList.length} Pokémon:</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
        gap: '1rem',
        marginTop: '1rem'
      }}>
        {pokemonList.map((pokemon, index) => (
          <div 
            key={pokemon.name}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              backgroundColor: '#f9f9f9'
            }}
          >
            <h3 style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>
              {pokemon.name}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              ID: {index + 1}
            </p>
            <button 
              style={{
                marginTop: '0.5rem',
                padding: '0.25rem 0.5rem',
                fontSize: '0.8rem',
                backgroundColor: '#333',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => console.log('Ver detalhes:', pokemon.name)}
            >
              Ver Detalhes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
