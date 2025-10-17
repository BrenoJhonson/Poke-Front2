import React, { useState, useEffect } from 'react';
import pokemonService from '../../services/pokemonService';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import SearchBar from '../../components/SearchBar/SearchBar';

function PokemonList({ onPokemonClick }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

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

  const loadPokemonByType = async (type) => {
    try {
      setLoading(true);
      setError(null);
      const pokemonData = await pokemonService.getPokemonByType(type);
      setPokemonList(pokemonData);
    } catch (err) {
      setError('Erro ao carregar Pokémon do tipo selecionado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const searchPokemonByName = async (name) => {
    if (name.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      const pokemonResults = await pokemonService.searchPokemonByName(name);
      setSearchResults(pokemonResults);
    } catch (err) {
      setSearchResults([]);
      // Não mostrar erro para busca por nome, apenas lista vazia
    } finally {
      setIsSearching(false);
    }
  };

  // Carregar Pokémon quando o tipo muda
  useEffect(() => {
    if (selectedType === 'all') {
      loadPokemonList();
    } else {
      loadPokemonByType(selectedType);
    }
  }, [selectedType]);

  // Buscar Pokémon por nome quando o termo muda
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        searchPokemonByName(searchTerm.trim());
      } else {
        setSearchResults([]);
        setIsSearching(false);
      }
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handlePokemonClick = (pokemon) => {
    if (onPokemonClick) {
      onPokemonClick(pokemon);
    } else {
      console.log('Ver detalhes:', pokemon.name);
    }
  };

  // Determinar quais Pokémon mostrar
  const getDisplayPokemon = () => {
    if (searchTerm.trim()) {
      // Se há busca por nome, mostrar resultados da busca
      return searchResults;
    } else {
      // Se não há busca, mostrar lista filtrada por tipo
      return pokemonList;
    }
  };

  const displayPokemon = getDisplayPokemon();

  if (loading || isSearching) {
    const loadingMessage = isSearching 
      ? `Buscando "${searchTerm}"...`
      : selectedType === 'all' 
        ? "Carregando Pokémon..." 
        : `Carregando todos os Pokémon do tipo ${selectedType}...`;
    return <Loading message={loadingMessage} />;
  }

  if (error) {
    return <Error message={error} onRetry={loadPokemonList} />;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Lista de Pokémon</h2>
      
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedType={selectedType}
        onTypeChange={setSelectedType}
      />

      <p>
        {searchTerm.trim() 
          ? (displayPokemon.length > 0 
              ? `Encontrados ${displayPokemon.length} Pokémon com "${searchTerm}"`
              : `Nenhum Pokémon encontrado com o nome "${searchTerm}"`)
          : (selectedType === 'all' 
              ? `Encontrados ${pokemonList.length} Pokémon`
              : `Encontrados ${pokemonList.length} Pokémon do tipo ${selectedType}`)
        }
      </p>
      
      {displayPokemon.length === 0 && !searchTerm.trim() ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          color: '#666'
        }}>
          <p>Nenhum Pokémon encontrado.</p>
        </div>
      ) : displayPokemon.length === 0 && searchTerm.trim() ? (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          color: '#666'
        }}>
          <p>Nenhum Pokémon encontrado com o nome "{searchTerm}".</p>
          <p>Tente um nome diferente ou limpe a busca.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          {displayPokemon.map((pokemon) => (
            <PokemonCard 
              key={pokemon.id}
              pokemon={pokemon}
              onClick={handlePokemonClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonList;
