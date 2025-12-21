# Política de Segurança

## Reportando vulnerabilidades

Se você encontrar uma vulnerabilidade de segurança:

1. **Não** abra issue pública com detalhes exploráveis.
2. Envie um reporte responsável via canal privado (se houver) ou abra uma issue com detalhes mínimos e solicite contato.

## Escopo

Este projeto é uma API Node.js com integração PostgreSQL.

## Boas práticas

- Nunca commite `.env`
- Use `CORS_ORIGIN` específico em produção
- Forneça connection string via variáveis de ambiente
