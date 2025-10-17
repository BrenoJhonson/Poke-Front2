import React, { useState } from 'react'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'
import Error from './components/Error/Error'
import PokemonList from './pages/PokemonList/PokemonList'
import PokemonDetails from './pages/PokemonDetails/PokemonDetails'

function App() {
  const [currentView, setCurrentView] = useState('home') // 'home', 'pokemon', 'pokemon-details', 'loading', 'error'
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const handleShowLoading = () => {
    setCurrentView('loading')
    setTimeout(() => setCurrentView('home'), 2000)
  }

  const handleShowError = () => {
    setCurrentView('error')
  }

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
          <main style={{ padding: '2rem' }}>
            <h2>Bem-vindo ao mundo dos Pokémon!</h2>
            <p>Em breve você poderá explorar todos os Pokémon aqui.</p>
            
            <div style={{ marginTop: '2rem' }}>
              <button 
                onClick={() => setCurrentView('pokemon')}
                style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
              >
                Ver Lista de Pokémon
              </button>
              <button 
                onClick={handleShowLoading}
                style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
              >
                Testar Loading
              </button>
              <button 
                onClick={handleShowError}
                style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}
              >
                Testar Error
              </button>
              <button 
                onClick={handleReset}
                style={{ padding: '0.5rem 1rem' }}
              >
                Reset
              </button>
            </div>
          </main>
        )
    }
  }

  return (
    <div className="App">
      <Header />
      {renderContent()}
    </div>
  )
}

export default App
