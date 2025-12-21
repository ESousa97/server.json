# API

Base URL (local): `http://localhost:3000`

## Endpoints

### GET /api/cards

Alias de compatibilidade: `GET /api/cardlist`

Resposta: array de cards.

### GET /api/categories

Retorna a lista de procedimentos (formato atual do projeto).

### GET /api/procedure?id=1

Compatibilidade Vercel rewrite: `GET /api/procedure/1`

Resposta: objeto do procedimento.

### GET /api/search?query=termo

Busca por `conteudo ILIKE`.

Notas:

- quando `similarity()` não estiver disponível no banco, o endpoint usa fallback sem ordenação por similaridade.

## CORS

Os handlers aplicam CORS com base em `CORS_ORIGIN`.
Em produção, configure um domínio específico.
