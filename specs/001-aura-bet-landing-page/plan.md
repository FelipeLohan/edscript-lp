# Implementation Plan: Aura Bet Landing Page

**Branch**: `001-aura-bet-landing-page` | **Date**: 2026-03-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-aura-bet-landing-page/spec.md`

## Summary

Build a single-page, dark-premium marketing landing page for the Aura Bet sports betting app.
The page converts visitors into app sign-ups by showcasing real-time AI prediction technology
through 7 animated sections: Hero, How It Works, Live Predictions Demo, Key Features, Social
Proof, CTA, and Footer. The stack is Angular 21 (standalone components, OnPush throughout),
Tailwind CSS v4 (CSS `@theme` design token system in `src/styles.css`), and TypeScript strict
mode. All data is static/mock — no backend integration is required for this landing page.

## Technical Context

**Language/Version**: TypeScript 5.9 / Angular 21.1
**Primary Dependencies**: @angular/core 21.1, @angular/router 21.1, Tailwind CSS 4.1 (via `@tailwindcss/postcss`)
**Storage**: N/A — static landing page with hardcoded mock data only
**Testing**: Vitest 4.0 + jsdom (unit tests for utils and shared components); Angular CLI build validation
**Target Platform**: Web (modern evergreen browsers); mobile-first responsive design; iOS Safari and Chrome Android are the primary mobile targets
**Project Type**: Single-page web application (marketing / conversion landing page)
**Performance Goals**: LCP < 2.5s on 4G; CLS < 0.1; FID < 100ms; hero CTA visible above the fold on load
**Constraints**: No runtime API calls; WCAG 2.1 AA compliance mandatory; no third-party Angular component libraries; all animations MUST respect `prefers-reduced-motion`
**Scale/Scope**: 1 page, 7 sections, ~15 components (5 shared primitives + 7 page sections + app shell)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Gate | Principle | Status | Notes |
|---|---|---|---|
| Design language | I. Dark Premium Design Language | ✅ PASS | `aura-dark`/`aura-navy` backgrounds; amber + electric blue accents; JetBrains Mono for odds/stats |
| Token discipline | II. Tailwind Token Discipline | ✅ PASS* | All tokens in CSS `@theme` block (Tailwind v4 equivalent of `tailwind.config.ts`) — see Complexity Tracking |
| Shared-first | III. Shared-First Component Architecture | ✅ PASS | AuraButton, AuraBadge, AuraCard, AuraStatCard, LiveMatchCard all built in `shared/` first |
| Folder boundaries | IV. Folder Responsibility Boundaries | ✅ PASS | `utils/` = pure functions; `core/` = services; `shared/` = UI primitives; `components/` = page sections |
| Performance | V. Performance First | ✅ PASS | OnPush on every component; `trackBy` on every `*ngFor`; lazy + explicit-sized images; IntersectionObserver for scroll animations |
| Accessibility | VI. Accessibility (WCAG AA) | ✅ PASS | ARIA labels on all interactive elements; focus rings via Tailwind token; 4.5:1 contrast verified against dark backgrounds |
| No generic aesthetics | VII. No Generic AI Aesthetics | ✅ PASS | Bebas Neue / Syne display font; asymmetric section layouts; amber glow treatment; no prohibited patterns (no purple, no Inter/Roboto, no 3-col icon grid, no glassmorphism) |

*Vocabulary note: Constitution references `tailwind.config.ts` — in Tailwind v4 (the installed version) this is the CSS `@theme` block in `src/styles.css`. See Complexity Tracking for full justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-aura-bet-landing-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/
│   ├── shared-components.md   # Shared component Input/Output API contracts
│   └── design-tokens.md       # Tailwind v4 @theme token reference
└── tasks.md             # Phase 2 output (/speckit.tasks — not created here)
```

### Source Code (repository root)

```text
src/
├── styles.css                              # Global: @import "tailwindcss"; @theme tokens; @layer base/components/utilities
└── app/
    ├── app.ts                              # Root AppComponent (OnPush, standalone)
    ├── app.html                            # Root template: nav + 7 section components in sequence
    ├── app.css                             # Root-level styles (minimal, section-specific styles in component files)
    ├── app.config.ts                       # Angular app config (provideRouter, etc.)
    ├── app.routes.ts                       # Single route '/' → AppComponent
    │
    ├── shared/                             # Reusable UI primitives (Principle III)
    │   ├── button/
    │   │   ├── aura-button.component.ts
    │   │   ├── aura-button.component.html
    │   │   └── aura-button.component.css
    │   ├── badge/
    │   │   ├── aura-badge.component.ts
    │   │   ├── aura-badge.component.html
    │   │   └── aura-badge.component.css
    │   ├── card/
    │   │   ├── aura-card.component.ts
    │   │   ├── aura-card.component.html
    │   │   └── aura-card.component.css
    │   ├── stat-card/
    │   │   ├── aura-stat-card.component.ts
    │   │   ├── aura-stat-card.component.html
    │   │   └── aura-stat-card.component.css
    │   └── live-match-card/
    │       ├── live-match-card.component.ts
    │       ├── live-match-card.component.html
    │       └── live-match-card.component.css
    │
    ├── components/                         # Page section components (Principle IV)
    │   ├── hero/
    │   │   ├── hero-section.component.ts
    │   │   ├── hero-section.component.html
    │   │   └── hero-section.component.css
    │   ├── how-it-works/
    │   │   ├── how-it-works-section.component.ts
    │   │   ├── how-it-works-section.component.html
    │   │   └── how-it-works-section.component.css
    │   ├── predictions-demo/
    │   │   ├── predictions-demo-section.component.ts
    │   │   ├── predictions-demo-section.component.html
    │   │   └── predictions-demo-section.component.css
    │   ├── features/
    │   │   ├── features-section.component.ts
    │   │   ├── features-section.component.html
    │   │   └── features-section.component.css
    │   ├── social-proof/
    │   │   ├── social-proof-section.component.ts
    │   │   ├── social-proof-section.component.html
    │   │   └── social-proof-section.component.css
    │   ├── cta/
    │   │   ├── cta-section.component.ts
    │   │   ├── cta-section.component.html
    │   │   └── cta-section.component.css
    │   └── footer/
    │       ├── footer.component.ts
    │       ├── footer.component.html
    │       └── footer.component.css
    │
    ├── core/                               # App-wide services (Principle IV)
    │   ├── theme.service.ts
    │   └── animation.service.ts
    │
    └── utils/                              # Pure functions only, no Angular deps (Principle IV)
        ├── format-odds.ts
        ├── format-percentage.ts
        └── animate-counter.ts
```

**Structure Decision**: Single Angular project using the existing Angular CLI / Vite scaffold.
The existing `src/app/` shell is extended with `shared/`, `components/`, `core/`, and `utils/`
sub-folders. No additional build configurations, workspaces, or monorepo tooling is required.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|--------------------------------------|
| Constitution Principle II references `tailwind.config.ts`; project uses CSS `@theme` block | Tailwind v4 (the installed version, v4.1.12) replaces `tailwind.config.ts` with a CSS-native `@theme {}` block in `src/styles.css`. The spirit of Principle II — a single source of truth for all design tokens, no hardcoded values in templates — is fully preserved. | Downgrading to Tailwind v3 introduces unnecessary migration risk and dependency churn on an already-configured v4 project. The `@theme` block is strictly equivalent in token-discipline terms; only the file location differs. |
