# Changelog

Todas as mudanças relevantes deste projeto estão documentadas aqui.

O formato segue [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/), e o versionamento segue [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

## [1.0.0] - 2026-04-18

### Adicionado

- Site estático da landing LavaCash com [Eleventy](https://www.11ty.dev/) e deploy pensado para Netlify.
- CTA para WhatsApp e ajustes de margem entre seções.
- Download do app Android: asset `lavacash.apk` e metadados em `src/_data/lavacash.json` (URL pública do APK, labels).
- Pipeline de build de assets: scripts `build-fonts.mjs`, `build-css-bundle.mjs`, `build-poster.mjs`; bundle JS com esbuild (`build:js` / `dev:js`).
- Fontes self-hosted (Bricolage Grotesque e DM Sans) e bundle CSS gerado (`lavacash.bundle.css`).
- Poster WebP do vídeo do hero e carregamento sob demanda dos vídeos de demo (`lazy-demo-videos.js`).
- Módulos JS auxiliares (ex.: navegação/scroll) integrados ao bundle `app.js`.

### Alterado

- Iterações de layout, conteúdo e CSS da landing (`lavacash-improvements.css` e partials).
- URL do APK atualizada para o caminho servido pelo site.
- `netlify.toml` e scripts npm (`build`, `start`, `clean`) para build reproduzível local e em CI.

[Unreleased]: https://github.com/Fabricio-Ferreira/LandingPage-LavaCash/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/Fabricio-Ferreira/LandingPage-LavaCash/releases/tag/v1.0.0
