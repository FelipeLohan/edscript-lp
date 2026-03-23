# edscript-lp Development Guidelines

Auto-generated from all feature plans. Last updated: 2026-03-23

## Active Technologies

- TypeScript 5.9 / Angular 21.1 + @angular/core 21.1, @angular/router 21.1, Tailwind CSS 4.1 (via `@tailwindcss/postcss`) (001-aura-bet-landing-page)

## Project Structure

```text
src/
├── styles.css                  # Global styles: @import "tailwindcss"; @theme tokens; @layer base/components/utilities
└── app/
    ├── shared/                 # Reusable UI primitives (AuraButton, AuraBadge, AuraCard, AuraStatCard, LiveMatchCard)
    ├── components/             # Page section components (hero, how-it-works, predictions-demo, features, social-proof, cta, footer)
    ├── core/                   # App-wide services (ThemeService, AnimationService)
    └── utils/                  # Pure functions only (format-odds, format-percentage, animate-counter)
```

## Commands

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build
npx vitest run     # Unit tests
```

## Code Style

- Angular 21 standalone components only — no NgModules
- All components MUST use `ChangeDetectionStrategy.OnPush`
- All `*ngFor` MUST have a `trackBy` function
- TypeScript strict mode — no `any` without suppression comment
- Design tokens: ALL colors/fonts/shadows reference `@theme` tokens in `src/styles.css` — no hardcoded hex values in templates
- Tailwind v4: use CSS `@theme {}` in `src/styles.css` (not `tailwind.config.ts`)
- `utils/` functions must be pure (no side effects, no Angular injection tokens)
- `core/` services must not import from `shared/` or `components/`
- Animations must respect `prefers-reduced-motion` via `AnimationService`

## Recent Changes

- 001-aura-bet-landing-page: Added TypeScript 5.9 / Angular 21.1 + @angular/core 21.1, @angular/router 21.1, Tailwind CSS 4.1 (via `@tailwindcss/postcss`)

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->
