# 🎮 Pokédex Interativa

Uma aplicação web moderna desenvolvida em React que permite explorar o mundo dos Pokémon através da PokéAPI.

## 🌐 Aplicação Online

**🔗 [Acesse a aplicação aqui](https://pokedexinterativa.netlify.app/)**

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como trabalho prático para demonstrar conhecimentos em desenvolvimento web moderno com React. A aplicação consome dados da PokéAPI para exibir informações detalhadas sobre Pokémon, incluindo tipos, estatísticas e habilidades.

## ✨ Funcionalidades Implementadas

### 🎯 Funcionalidades Principais
- ✅ **Listagem de Pokémon**: Exibe lista paginada de Pokémon com imagens e tipos
- ✅ **Visualização de Detalhes**: Página completa com estatísticas, tipos e habilidades
- ✅ **Busca Inteligente**: Busca parcial por nome com debounce (500ms)
- ✅ **Filtros por Tipo**: Filtro visual com ícones coloridos para todos os tipos
- ✅ **Estados de Feedback**: Loading e Error states com componentes visuais
- ✅ **Design Responsivo**: Interface adaptável para diferentes dispositivos

### 🔍 Recursos de Busca
- **Busca por Nome**: Digite qualquer parte do nome do Pokémon
- **Filtro por Tipo**: Selecione um tipo específico para ver todos os Pokémon desse tipo
- **Limpeza de Filtros**: Botão para resetar busca e filtros
- **Feedback Visual**: Contador de resultados encontrados

### 📊 Informações dos Pokémon
- **Tipos**: Badges coloridos com cores oficiais dos tipos
- **Estatísticas**: HP, Ataque, Defesa, Ataque Especial, Defesa Especial, Velocidade
- **Habilidades**: Habilidades normais e ocultas com diferenciação visual
- **Imagens**: Sprites oficiais dos Pokémon

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 18** - Biblioteca principal para interface
- **Styled Components** - Estilização componentizada
- **Vite** - Build tool moderno e rápido
- **JavaScript ES6+** - Programação assíncrona com async/await

### API e Dados
- **PokéAPI** - API REST pública para dados dos Pokémon
- **Fetch API** - Comunicação HTTP assíncrona

### Desenvolvimento
- **ESLint** - Linting de código
- **Git** - Controle de versão
- **Netlify** - Deploy e hospedagem

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/poke-front2.git

# Entre no diretório
cd poke-front2

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev      # Servidor de desenvolvimento
npm run build    # Build para produção
npm run preview  # Preview do build
npm run lint     # Verificação de código
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header/         # Cabeçalho da aplicação
│   ├── Loading/        # Componente de carregamento
│   ├── Error/          # Componente de erro
│   ├── PokemonCard/    # Card individual do Pokémon
│   └── SearchBar/      # Barra de busca e filtros
├── pages/              # Páginas principais
│   ├── PokemonList/    # Lista de Pokémon
│   └── PokemonDetails/ # Detalhes do Pokémon
├── services/           # Serviços de API
│   └── pokemonService.js
├── App.jsx            # Componente principal
└── main.jsx           # Ponto de entrada
```

## 🎨 Design e UX

### Características Visuais
- **Paleta de Cores**: Baseada nas cores oficiais dos tipos Pokémon
- **Tipografia**: Fonte moderna e legível
- **Animações**: Transições suaves e hover effects
- **Layout**: Grid responsivo para cards de Pokémon
- **Componentes**: Design system consistente com Styled Components

### Responsividade
- **Mobile First**: Otimizado para dispositivos móveis
- **Breakpoints**: Adaptação para tablet e desktop
- **Touch Friendly**: Botões e elementos adequados para touch

## 🔧 Arquitetura Técnica

### Padrões Implementados
- **Componentização**: Componentes funcionais reutilizáveis
- **Props**: Comunicação entre componentes pai e filho
- **Estado Local**: useState para gerenciamento de estado
- **Efeitos**: useEffect para side effects e API calls
- **Debounce**: Otimização de busca para evitar requests excessivos

### Otimizações
- **Lazy Loading**: Carregamento sob demanda dos detalhes
- **Memoização**: Evita re-renders desnecessários
- **Error Boundaries**: Tratamento de erros em componentes
- **Loading States**: Feedback visual durante carregamento

## 📊 Requisitos Atendidos

### ✅ Requisitos Funcionais
- [x] Listagem de conteúdo da API externa
- [x] Visualização de detalhes ao clicar
- [x] Comunicação assíncrona com API REST
- [x] Estilização avançada com Styled Components
- [x] Filtragem e pesquisa por nome/tipo
- [x] Feedback visual (loading/error)

### ✅ Requisitos Técnicos
- [x] React com componentes funcionais
- [x] JSX para estruturação
- [x] Props para comunicação
- [x] Styled Components (zero CSS tradicional)
- [x] Programação assíncrona (async/await)
- [x] API REST pública (PokéAPI)
- [x] Deploy online (Netlify)

## 🤝 Contribuição

Este é um projeto acadêmico, mas sugestões e melhorias são bem-vindas!

## 📄 Licença

Este projeto foi desenvolvido para fins educacionais.

---

**Desenvolvido por Carlos Breno usando React e PokéAPI**