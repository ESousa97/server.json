# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## 1.0.0 (2026-01-14)


### ⚠ BREAKING CHANGES

* Complete repository restructure for production-readiness

### Features

* Server corrigido localmente. ([0a23ab3](https://github.com/ESousa97/server.json/commit/0a23ab3210d2ad4ffedfa29d66d2fcb09b248e19))
* teste local. ([6ebda4e](https://github.com/ESousa97/server.json/commit/6ebda4e7f2cc89e04a8e5424e5b03caa5aa7b32c))


### Bug Fixes

* remove deprecated package-name from release-please and fix qs vulnerability ([36a3d53](https://github.com/ESousa97/server.json/commit/36a3d5395bfd224ea419eb61a29d686b519a4d61))


### Code Refactoring

* transform repository to A+ quality standard ([19a69cf](https://github.com/ESousa97/server.json/commit/19a69cfae40608ab87d2d4884ccf0cf72b4f3c3c))

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
