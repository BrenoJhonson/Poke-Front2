import React, { useState } from 'react'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'
import Error from './components/Error/Error'
import PokemonList from './pages/PokemonList/PokemonList'
import PokemonDetails from './pages/PokemonDetails/PokemonDetails'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f7fa;
`;

const HomeContainer = styled.main`
  padding: 2rem;
  text-align: center;
`;

const HomeTitle = styled.h2`
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const HomeDescription = styled.p`
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const HomeButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #5a67d8;
  }
`;

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'pokemon', 'pokemon-details', 'loading', 'error'
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const handleReset = () => {
    setCurrentView('home')
    setSelectedPokemon(null)
  }

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon)
    setCurrentView('pokemon-details')
  }

  const handleBackToList = () => {
    setCurrentView('pokemon')
    setSelectedPokemon(null)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'pokemon':
        return <PokemonList onPokemonClick={handlePokemonClick} />
      case 'pokemon-details':
        return <PokemonDetails pokemon={selectedPokemon} onBack={handleBackToList} />
      case 'loading':
        return <Loading message="Carregando Pokémon..." />
      case 'error':
        return <Error message="Erro ao carregar dados!" onRetry={handleReset} />
      default:
        return (
          <HomeContainer>
            <HomeTitle>Bem-vindo ao mundo dos Pokémon!</HomeTitle>
            <HomeDescription>Venha se aventurar pelos mais diversos tipos de Pokémon.</HomeDescription>
            
            <ButtonContainer>
              <HomeButton onClick={() => setCurrentView('pokemon')}>
                Ver Lista de Pokémon
              </HomeButton>
            </ButtonContainer>
          </HomeContainer>
        )
    }
  }

  return (
    <AppContainer>
      <Header />
      {renderContent()}
    </AppContainer>
  )
}

export default App