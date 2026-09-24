# Build checks

- `npm run check` checks the source files and Astro configuration listed in `tsconfig.json`.
- `npm run build` runs the type check, Astro, Jampack, and output validation.
- `npm run lint` checks ESLint rules.

Astro/Vite already minifies `_astro/**/*.js`. Jampack 0.15's additional
JavaScript compressor does not handle these ES modules, so only those bundles
are excluded from its second compression pass. Image and HTML optimization
remain enabled.

Open Graph fonts are bundled under `src/assets/fonts` with their license, so
image generation does not require network access. Sharing images use post slugs
and `/index.png`; `verify-build.mjs` checks their references in the built HTML
and verifies the Apple touch icon's format and dimensions.
