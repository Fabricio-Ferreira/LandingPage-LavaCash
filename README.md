# Landing Page — LavaCash

Site estático com [Eleventy](https://www.11ty.dev/) e deploy no [Netlify](https://www.netlify.com/).

## Estrutura

- `src/index.njk` — página principal
- `src/_includes/partials/` — blocos reutilizáveis (nav, hero, secções, footer)
- `src/_layouts/base.njk` — layout base (meta, fontes, CSS, JS)
- `src/assets/` — CSS modular (`tokens-base`, `header-hero-marquee`, `sections-demos-pain`, etc.), JS e imagens (copiados para `_site/assets/`)
- `src/_js/` — fonte JavaScript (ESM); `npm run build` gera `src/assets/js/app.js`
- `src/videos/` — ficheiros MP4 (copiados para `_site/videos/`)

## Comandos

```bash
npm install
npm run start    # servidor local com live reload
npm run build    # gera _site/
```

## Netlify

O ficheiro `netlify.toml` define `publish = "_site"` e `command = "npm run build"`.

Liga o repositório Git ao Netlify ou faz deploy manual da pasta `_site` após `npm run build`.

## Vídeos

Os quatro vídeos devem manter os nomes esperados em `src/videos/`:

- `video-visaogeralapp.mp4`
- `video-atendimento.mp4`
- `video-cadastrocliente.mp4`
- `video-relatorios.mp4`

## Acessibilidade

- Link “Ir para o conteúdo”
- FAQ com `<details>` / `<summary>` (sem dependência de JS)
- Navegação móvel com `aria-expanded` e fecho com Escape
