import React, { useState } from 'react'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'
import Error from './components/Error/Error'

function App() {
  const [showLoading, setShowLoading] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleShowLoading = () => {
    setShowLoading(true)
    setShowError(false)
    setTimeout(() => setShowLoading(false), 2000)
  }

  const handleShowError = () => {
    setShowError(true)
    setShowLoading(false)
  }

  const handleReset = () => {
    setShowLoading(false)
    setShowError(false)
  }

  return (
    <div className="App">
      <Header />
      <main style={{ padding: '2rem' }}>
        <h2>Bem-vindo ao mundo dos Pokémon!</h2>
        <p>Em breve você poderá explorar todos os Pokémon aqui.</p>
        
        <div style={{ marginTop: '2rem' }}>
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

        {showLoading && <Loading message="Carregando Pokémon..." />}
        {showError && <Error message="Erro ao carregar dados!" onRetry={handleReset} />}
      </main>
    </div>
  )
}

export default App
