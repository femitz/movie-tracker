# 🎬 Movie Tracker

Um sistema para gerenciar e acompanhar seus filmes favoritos.

## 🚀 Tecnologias Utilizadas

- Docker
- Docker Compose
- Make
- Java 17
- Node.js 18.x
- Spring Boot
- React

## 📋 Pré-requisitos

- Docker instalado
- Docker Compose instalado
- Make instalado 
- Java 17 ou superior
- Node.js 18.x ou superior
- Maven 3.8.x ou superior

## 🛠️ Instalação

### Usando Docker (Recomendado)

1. Clone o repositório:
```bash
git clone https://github.com/femitz/movie-tracker.git
cd movie-tracker
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Execute o projeto usando Make:
```bash
make all
```

O projeto estará disponível em `http://localhost:3000`

### Desenvolvimento Local

1. Clone o repositório:
```bash
git clone https://github.com/femitz/movie-tracker.git
cd movie-tracker
```

2. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

3. Backend (Java):
```bash
# Entre na pasta do backend
cd movie-tracker

# Compile o projeto usando Maven
mvn clean install

# Execute o projeto
mvn spring-boot:run
```

O backend estará disponível em `http://localhost:8080`

4. Frontend:
```bash
# Em outro terminal, entre na pasta do frontend
cd movie-tracker-frontend

# Instale as dependências
npm install
# ou
yarn install

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev
```

O frontend estará disponível em `http://localhost:3000`

### Build dos Containers
```bash
make build
```
Este comando constrói as imagens Docker necessárias para o projeto.

### Iniciar os Containers
```bash
make up
```
Inicia todos os containers em modo detached (background).

### Build e Iniciar
```bash
make all
```
Executa o build e inicia os containers em sequência.

## 🤝 Contribuindo

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add alguma AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

