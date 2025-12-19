# Sistema de Gestão Residencial

Sistema completo para gestão financeira residencial com controle de transações, categorias e usuários.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Backend (.NET)
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- SQLite (já incluído no projeto)

### Frontend (React + TypeScript)
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm ou yarn

## 🚀 Como Rodar o Projeto

### 1. Backend (API .NET)

1. Abra um terminal e navegue até a pasta do backend:
```bash
cd Sistema_Gestao_Residencial
```

2. Restaure as dependências:
```bash
dotnet restore
```

3. Execute as migrations para criar o banco de dados:
```bash
dotnet ef database update
```

4. Execute o projeto:
```bash
dotnet run
```

A API estará disponível em: `https://localhost:7165` ou `http://localhost:5075`

**Documentação da API (Swagger):** Acesse `https://localhost:7165/swagger` após iniciar o backend

### 2. Frontend (React)

1. Abra um **novo terminal** e navegue até a pasta do frontend:
```bash
cd Sistema_Gestao_UI
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

## 🔧 Configuração

### Backend
O arquivo de configuração principal está em [`appsettings.json`](Sistema_Gestao_Residencial/appsettings.json):
- **Connection String**: SQLite configurado como `sistema_gestao.db`
- CORS habilitado para desenvolvimento local

### Frontend
O arquivo de configuração da API está em [`src/services/api.ts`](Sistema_Gestao_UI/src/services/api.ts):
- **Base URL**: Certifique-se de que aponta para a URL correta do backend

## 📱 Funcionalidades

- ✅ **Gestão de Usuários**: Criar, editar, listar e remover usuários
- ✅ **Gestão de Categorias**: Organizar transações por categorias personalizadas
- ✅ **Gestão de Transações**: Registrar entradas e saídas financeiras
- ✅ **Dashboard**: Visualização consolidada dos dados financeiros
- ✅ **Validações**: Sistema completo de validação de dados

## 🧪 Testando a Aplicação

1. **Inicie o backend primeiro** (porta 7165/5075)
2. **Depois inicie o frontend** (porta 5173)
3. Acesse `http://localhost:5173` no navegador
4. Use o Swagger em `https://localhost:7165/swagger` para testar os endpoints da API

## 🛠️ Tecnologias Utilizadas

### Backend
- .NET 8
- Entity Framework Core
- SQLite
- Swagger/OpenAPI

### Frontend
- React 19
- TypeScript
- Vite
- Axios
- React Router DOM

## 📝 Estrutura do Projeto

```
Sistema_Gestao_Residencial/    # Backend .NET
├── Controllers/               # Controladores da API
├── Services/                  # Lógica de negócio
├── Models/                    # Modelos e DTOs
├── Data/                      # Contexto do banco de dados
└── Migrations/                # Migrations do EF Core

Sistema_Gestao_UI/             # Frontend React
├── src/
│   ├── components/            # Componentes reutilizáveis
│   ├── pages/                 # Páginas da aplicação
│   ├── services/              # Serviços de API
│   ├── hooks/                 # Custom hooks
│   └── types/                 # Definições de tipos TypeScript
```