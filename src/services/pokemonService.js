// Serviço para comunicação com a PokéAPI
const API_BASE_URL = 'https://pokeapi.co/api/v2';

class PokemonService {
  // Buscar lista de Pokémon (primeiros 20)
  async getPokemonList() {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon?limit=20`);
      if (!response.ok) {
        throw new Error('Erro ao buscar lista de Pokémon');
      }
      const data = await response.json();
      return data;
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

  // Buscar Pokémon por ID
  async getPokemonById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/pokemon/${id}`);
      if (!response.ok) {
        throw new Error('Pokémon não encontrado');
      }
      return await response.json();
    } catch (error) {
      console.error('Erro ao buscar Pokémon por ID:', error);
      throw error;
    }
  }
}

export default new PokemonService();
