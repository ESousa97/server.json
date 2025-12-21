# Contribuindo

Obrigado por contribuir!

## Requisitos

- Node.js 20+ (recomendado)
- npm 9+
- Postgres para executar endpoints que consultam o banco

## Setup

1. `npm ci`
2. Copie `.env.example` para `.env` e preencha `DATABASE_URL`

## Rodando localmente

- `npm start`

## Padrão de commits (Conventional Commits)

Use o formato:

- `feat: ...` (nova funcionalidade)
- `fix: ...` (correção)
- `docs: ...` (documentação)
- `refactor: ...`
- `test: ...`
- `chore: ...`

Exemplo:

- `feat: add /api/cards alias`

## Qualidade

Antes de abrir PR:

- `npm run format`
- `npm run lint`
- `npm test`

## Pull Requests

- Inclua descrição e como validar.
- Se alterar contrato, atualize `docs/API.md` e documente migração.
