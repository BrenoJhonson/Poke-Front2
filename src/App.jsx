import React, { useState } from 'react'
import Header from './components/Header/Header'
import Loading from './components/Loading/Loading'
import Error from './components/Error/Error'
import PokemonList from './pages/PokemonList/PokemonList'
import PokemonDetails from './pages/PokemonDetails/PokemonDetails'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="pokeball" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="8" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1"/><path d="M2 10 L18 10" stroke="rgba(255,255,255,0.1)" stroke-width="1"/><circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.1)"/></pattern></defs><rect width="100" height="100" fill="url(%23pokeball)"/></svg>');
    opacity: 0.3;
    animation: float 20s ease-in-out infinite;
    z-index: -1;
    pointer-events: none;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const HomeContainer = styled.main`
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto;
`;

const WelcomeCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 3rem 2rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: slideUp 0.8s ease-out;
  margin-bottom: 2rem;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const HomeTitle = styled.h2`
  color: #2d3748;
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 2s ease-in-out infinite alternate;

  @keyframes glow {
    from { filter: drop-shadow(0 0 5px rgba(102, 126, 234, 0.3)); }
    to { filter: drop-shadow(0 0 20px rgba(102, 126, 234, 0.6)); }
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HomeDescription = styled.p`
  color: #4a5568;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  line-height: 1.6;
  font-weight: 400;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  padding: 1.5rem;
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  animation: fadeInUp 0.6s ease-out ${props => props.delay || '0s'};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.95);
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const FeatureDescription = styled.p`
  color: #718096;
  font-size: 0.9rem;
  line-height: 1.4;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const HomeButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(102, 126, 234, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px);
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
            <WelcomeCard>
              <HomeTitle>Bem-vindo ao mundo dos Pokémon!</HomeTitle>
              <HomeDescription>Venha se aventurar pelos mais diversos tipos de Pokémon.</HomeDescription>
              
              <FeaturesGrid>
                <FeatureCard delay="0.1s">
                  <FeatureIcon>🔍</FeatureIcon>
                  <FeatureTitle>Busca Inteligente</FeatureTitle>
                  <FeatureDescription>Encontre qualquer Pokémon digitando parte do nome</FeatureDescription>
                </FeatureCard>
                
                <FeatureCard delay="0.2s">
                  <FeatureIcon>🎨</FeatureIcon>
                  <FeatureTitle>Filtros por Tipo</FeatureTitle>
                  <FeatureDescription>Explore Pokémon por tipo com filtros visuais coloridos</FeatureDescription>
                </FeatureCard>
                
                <FeatureCard delay="0.3s">
                  <FeatureIcon>📊</FeatureIcon>
                  <FeatureTitle>Estatísticas Detalhadas</FeatureTitle>
                  <FeatureDescription>Veja todas as informações e habilidades dos Pokémon</FeatureDescription>
                </FeatureCard>
              </FeaturesGrid>
              
              <ButtonContainer>
                <HomeButton onClick={() => setCurrentView('pokemon')}>
                  🚀 Explorar Pokédex
                </HomeButton>
              </ButtonContainer>
            </WelcomeCard>
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