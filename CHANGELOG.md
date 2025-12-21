# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Baseline, padronização do repo e documentação inicial.
- `createHandler` factory para eliminar boilerplate nos endpoints.
- Barrel exports em `src/http/index.js` e `src/db/index.js`.
- Security headers automáticos (X-Content-Type-Options, X-Frame-Options, X-XSS-Protection).
- Security audit no CI (`npm audit --audit-level=high`).
- Scripts `test:coverage` e `audit:fix` no package.json.
- 11 testes automatizados cobrindo todos os endpoints.

### Changed

- Refatoração dos handlers para reduzir duplicação e melhorar segurança.
- Handlers reduzidos de ~20 linhas para ~7 linhas cada.
- Documentação de arquitetura atualizada com padrão DRY.

### Fixed

- Rewrite do Vercel para `/api/procedure/:id` (mapeia `id`).
