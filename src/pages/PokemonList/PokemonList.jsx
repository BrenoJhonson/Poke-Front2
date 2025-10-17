import React, { useState, useEffect } from 'react';
import pokemonService from '../../services/pokemonService';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

function PokemonList({ onPokemonClick }) {
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

  const handlePokemonClick = (pokemon) => {
    if (onPokemonClick) {
      onPokemonClick(pokemon);
    } else {
      console.log('Ver detalhes:', pokemon.name);
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
        {pokemonList.map((pokemon) => (
          <PokemonCard 
            key={pokemon.id}
            pokemon={pokemon}
            onClick={handlePokemonClick}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
