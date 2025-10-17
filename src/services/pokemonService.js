// Serviço para comunicação com a PokéAPI
const API_BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonService {
  // Buscar lista de Pokémon (primeiros 20) com detalhes completos
  async getPokemonList() {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon?limit=20`);
      if (!response.ok) {
        throw new Error('Erro ao buscar lista de Pokémon');
      }
      const data = await response.json();
      
      // Buscar detalhes completos de cada Pokémon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const details = await this.getPokemonDetails(pokemon.url);
          return details;
        })
      );
      
      return {
        results: pokemonDetails,
        count: data.count,
        next: data.next,
        previous: data.previous
      };
    } catch (error) {
      console.error('Erro ao buscar lista de Pokémon:', error);
      throw error;
    }
  }

  // Buscar detalhes de um Pokémon específico
  async getPokemonDetails(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do Pokémon');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar detalhes do Pokémon:', error);
      throw error;
    }
  }

  // Buscar Pokémon por nome parcial
  async searchPokemonByName(name) {
    try {
      // Buscar uma lista maior de Pokémon para fazer busca parcial
      const response = await fetch(`${API_BASE_URL}/pokemon?limit=1000`);
      if (!response.ok) {
        throw new Error('Erro ao buscar lista de Pokémon');
      }
      const data = await response.json();
      
      // Filtrar Pokémon que contenham o nome buscado
      const matchingPokemon = data.results.filter(pokemon => 
        pokemon.name.toLowerCase().includes(name.toLowerCase())
      );
      
      // Buscar detalhes completos apenas dos Pokémon que correspondem
      const pokemonDetails = await Promise.all(
        matchingPokemon.slice(0, 20).map(async (pokemon) => {
          const details = await this.getPokemonDetails(pokemon.url);
          return details;
        })
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error('Erro ao buscar Pokémon por nome:', error);
      throw error;
    }
  }

  // Buscar Pokémon por nome
  async getPokemonByName(name) {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${name.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar Pokémon por nome:', error);
      throw error;
    }
  }

  // Buscar Pokémon por tipo
  async getPokemonByType(type) {
    try {
      const response = await fetch(`${API_BASE_URL}/type/${type}`);
      if (!response.ok) {
        throw new Error('Tipo não encontrado');
      }
      const data = await response.json();
      
      // Buscar detalhes completos de TODOS os Pokémon do tipo
      const pokemonDetails = await Promise.all(
        data.pokemon.map(async (pokemonInfo) => {
          const details = await this.getPokemonDetails(pokemonInfo.pokemon.url);
          return details;
        })
      );
      
      return pokemonDetails;
    } catch (error) {
      console.error('Erro ao buscar Pokémon por tipo:', error);
      throw error;
    }
  }
}

export default new PokemonService();
