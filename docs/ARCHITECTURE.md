# Arquitetura

## Visão geral

Este repositório implementa uma API simples com **Node.js** + **Express** e endpoints compatíveis com **Vercel Functions**.

- Em produção (Vercel), cada arquivo em `api/*.js` é um endpoint serverless.
- Em desenvolvimento local, `api/index.js` sobe um servidor Express e monta as mesmas rotas para facilitar testes manuais.

## Camadas

```
api/           → Entrypoints/handlers HTTP (contrato público)
src/
  ├── config/  → Carregamento de variáveis de ambiente
  ├── db/      → Pool de conexão e queries SQL centralizadas
  └── http/    → CORS, validação, responses, error handling, createHandler
tests/         → Testes automatizados com Jest + Supertest
```

## Padrão de Handler (DRY)

Todos os handlers usam `createHandler()` para eliminar boilerplate:

```javascript
// api/cardlist.js
const { createHandler, ok } = require('../src/http');
const { query, getQuery } = require('../src/db');

module.exports = createHandler(async (req, res) => {
  const { rows } = await query(getQuery('getAllCards'), []);
  return ok(res, rows);
});
```

O `createHandler` encapsula:

- CORS preflight (`OPTIONS`)
- Validação de método (`GET` only)
- Try/catch com `handleError`
- Security headers automáticos

## Fluxo de uma requisição

1. `createHandler` aplica CORS e security headers
2. Valida método HTTP (rejeita não-GET com 405)
3. Executa a lógica do handler
4. Em caso de erro, `handleError` retorna 500 padronizado

## Diagrama textual

```
Client
  → Vercel / Express
    → api/<endpoint>.js
      → createHandler (CORS + security headers + try/catch)
        → src/http/* (validation/respond)
        → src/db/* (client/queries)
          → PostgreSQL
```

## Segurança

Headers automáticos em toda resposta:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## Configuração de banco

O pool de Postgres é criado sob demanda e lê a connection string nesta ordem:

- `DATABASE_URL` (local)
- `POSTGRES_URL` / `POSTGRES_URL_NON_POOLING` / `POSTGRES_PRISMA_URL` (Vercel Postgres)

SSL:

- em Vercel, SSL é habilitado automaticamente (`rejectUnauthorized: false`).
- localmente, por padrão SSL fica desligado; use `PGSSL_DISABLE=1` para forçar desligado.
