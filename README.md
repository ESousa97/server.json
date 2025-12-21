# EsDataBase API

![CI](../../actions/workflows/ci.yml/badge.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

API Node.js + Express com integração PostgreSQL, pronta para rodar localmente e para deploy em **Vercel Functions**.

Este repositório foca em:

- endpoints HTTP simples e estáveis
- integração com Postgres via variáveis de ambiente
- boas práticas de manutenção (lint, testes, CI, docs e governança)

## Funcionalidades

- Listagem de cards
- Listagem de procedimentos
- Consulta de procedimento por id
- Busca por conteúdo (`ILIKE`) com fallback quando `similarity()` não existir

## Stack e requisitos

- Node.js 20+ (recomendado)
- npm 9+
- PostgreSQL (para endpoints que consultam o banco)

## Instalação

```bash
npm ci
```

## Configuração

Crie `.env` a partir de `.env.example`:

```bash
copy .env.example .env
```

Preencha `DATABASE_URL` (local) ou use as variáveis fornecidas pela Vercel (ex.: `POSTGRES_URL`).

## Uso (local)

Subir o servidor:

```bash
npm start
```

Teste rápido:

```bash
curl http://localhost:3000/
curl http://localhost:3000/api/cards
curl "http://localhost:3000/api/procedure?id=1"
curl "http://localhost:3000/api/procedure/1"
curl "http://localhost:3000/api/search?query=termo"
```

## Endpoints

Documentação completa em [docs/API.md](docs/API.md).

## Arquitetura

Visão geral e diagrama textual em [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Scripts

- `npm start`: servidor local
- `npm run lint`: lint
- `npm run format`: format
- `npm test`: testes

## Contribuição

Veja [CONTRIBUTING.md](CONTRIBUTING.md).

## Segurança

Veja [SECURITY.md](SECURITY.md).

## Licença

MIT. Veja [LICENSE](LICENSE).

## Status do projeto

Maintained.
