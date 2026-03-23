<!--
SYNC IMPACT REPORT
==================
Version change: N/A → 1.0.0 (initial ratification)
Modified principles: none (initial)
Added sections:
  - Core Principles (7 principles)
  - Technology Stack & Constraints
  - Development Workflow
  - Governance
Removed sections: none (initial)
Templates updated:
  ✅ .specify/templates/plan-template.md — Constitution Check gates populated
  ✅ .specify/templates/spec-template.md — no changes required (generic structure sufficient)
  ✅ .specify/templates/tasks-template.md — no changes required (generic structure sufficient)
Deferred TODOs: none
-->

# Aura Bet Constitution

## Core Principles

### I. Dark Premium Design Language

Every UI element MUST conform to the Aura Bet visual identity: deep navy/black backgrounds,
electric accent colors (neon amber `#F59E0B` family or electric blue `#3B82F6` family), and
monospace type for live data displays. The aesthetic targets a "Bloomberg terminal meets luxury
sportsbook" standard — data-dense, high-contrast, deliberately non-decorative.

**Non-negotiable rules**:
- Background palette: `bg-navy-950` / `bg-black` variants only; no light-mode surfaces.
- Accent palette: neon amber or electric blue as the sole primary interactive color families.
- Live data (odds, scores, timestamps) MUST use a monospace font token defined in `tailwind.config.ts`.
- No decorative gradients unless they serve explicit depth or hierarchy purposes.

**Rationale**: The landing page is the first impression for a premium sportsbook product.
Visual inconsistency or generic aesthetics undermine brand trust before a single bet is placed.

### II. Tailwind Token Discipline (NON-NEGOTIABLE)

All design values — colors, fonts, spacing, shadows, animations — MUST be defined as custom
theme tokens in `tailwind.config.ts`. Templates MUST reference only Tailwind utility classes
or CSS custom properties derived from that config. Hardcoded hex values, pixel literals, or
inline styles in `.html` templates are PROHIBITED.

**Non-negotiable rules**:
- `tailwind.config.ts` is the single source of truth for all design tokens.
- Arbitrary value syntax (e.g., `text-[#abc123]`, `p-[17px]`) is PROHIBITED in templates
  unless a code-comment justification is present for a documented one-off exception.
- Token naming MUST follow the semantic pattern `[role]-[variant]`
  (e.g., `accent-amber`, `surface-dark`, `text-muted`).

**Rationale**: Token discipline ensures design consistency across all components and enables
global theme changes without template surgery.

### III. Shared-First Component Architecture

Global visual elements — buttons, cards, badges, typography scale, dividers — MUST be
implemented as reusable Angular components or Tailwind `@layer` utilities in `shared/`
before being consumed by page-section components. Page sections MUST NOT reimplement
visual primitives inline.

**Non-negotiable rules**:
- Any visual pattern used in more than one location MUST live in `shared/`.
- `shared/` components MUST declare `ChangeDetectionStrategy.OnPush`.
- `shared/` display components MUST expose only `@Input` / `@Output`; no service injection
  for display-only components.
- Tailwind `@layer components` utilities reused across sections MUST be defined in the
  shared stylesheet, not duplicated in component-level styles.

**Rationale**: Prevents visual drift between sections and makes design-system updates a
single-file operation.

### IV. Folder Responsibility Boundaries

Each folder has a strictly defined responsibility. Code MUST NOT cross these boundaries:

| Folder | Responsibility |
|---|---|
| `shared/` | Reusable UI primitives, design-system components, global `@layer` utilities |
| `components/` | Page section components: hero, features, predictions-demo, CTA, footer |
| `core/` | App-wide services, HTTP interceptors, configuration providers |
| `utils/` | Pure functions only — formatters, odds calculators, date helpers; no Angular deps |

**Non-negotiable rules**:
- `utils/` functions MUST be pure (no side effects, no Angular injection tokens).
- `core/` MUST NOT import from `components/` or `shared/` UI components.
- Page sections in `components/` MAY import from `shared/` and `utils/`; MUST NOT import
  directly from `core/` services without a facade abstraction.

**Rationale**: Clear folder contracts prevent circular dependencies and keep the codebase
navigable as sections grow.

### V. Performance First

Performance optimizations are not optional enhancements — they are baseline requirements
that ship with every component.

**Non-negotiable rules**:
- All `*ngFor` loops MUST include a `trackBy` function.
- All image assets MUST use `loading="lazy"` with explicit `width` and `height` attributes
  to prevent cumulative layout shift (CLS).
- Every Angular component MUST declare `ChangeDetectionStrategy.OnPush`.
- No synchronous blocking operations in component lifecycle hooks (`ngOnInit`, `ngAfterViewInit`).
- Third-party runtime dependencies require explicit justification in the plan before addition.

**Rationale**: Landing page performance directly affects conversion rates. A slow first
paint is a lost user.

### VI. Accessibility (WCAG AA)

The landing page MUST meet WCAG 2.1 AA conformance for all interactive and informational
content.

**Non-negotiable rules**:
- All interactive elements (`<button>`, `<a>`, custom controls) MUST carry an `aria-label`
  or associated visible label text.
- Text contrast against background MUST meet 4.5:1 (normal text) and 3:1 (large text /
  UI components) minimum ratios.
- All CTAs MUST be keyboard-navigable with a visible `:focus-visible` ring styled via a
  Tailwind token (not removed or suppressed).
- Decorative images MUST use `alt=""`. Informational images MUST have descriptive `alt` text.
- Tab order MUST follow the visual reading order of the page.

**Rationale**: Accessibility is a legal requirement in most jurisdictions and a measurable
signal of product quality to discerning users.

### VII. No Generic AI Aesthetics (NON-NEGOTIABLE)

The Aura Bet landing page MUST NOT adopt visual patterns associated with generic AI-generated
or template-driven design.

**Prohibited patterns**:
- Purple-on-white or pastel gradient hero sections.
- Inter, Roboto, or system-sans-serif as the primary display typeface.
- Cookie-cutter 3-column feature card grids (icon + title + paragraph with equal whitespace).
- Glassmorphism blur panels as the primary surface treatment.
- Generic "sparkle", "stars", or AI-chip iconography.

**Rationale**: The target audience is sophisticated bettors who recognize and reject generic
SaaS aesthetics. Every design decision must earn its place against the premium, data-driven
brand standard defined in Principle I.

## Technology Stack & Constraints

**Framework**: Angular 21 with standalone components API; NgModules are PROHIBITED for new code.
**Styling**: Tailwind CSS (preset configuration); all design tokens defined in `tailwind.config.ts`.
**Language**: TypeScript — strict mode enabled; `any` requires an explicit suppression comment.
**Build**: Angular CLI / Vite; production builds MUST enable tree-shaking and minification.
**Fonts**: Web fonts MUST be loaded via `<link rel="preload">` to prevent FOIT; font family
tokens MUST be declared in `tailwind.config.ts`.
**Images**: SVG preferred for icons and logos; raster assets MUST be served in WebP format
with a JPEG fallback.

No runtime CSS frameworks (Bootstrap, Material Design) may be introduced. No third-party
Angular component libraries (PrimeNG, NG-Zorro, etc.) without an explicit constitution amendment.

## Development Workflow

- All new visual patterns MUST be implemented and validated in `shared/` before consumption
  by page-section components in `components/`.
- Constitution Check gates defined in the plan template MUST be verified before any
  implementation phase and re-checked after the design phase.
- Code review MUST confirm: OnPush declared, `trackBy` present on every `*ngFor`, ARIA
  labels on all interactive elements, no hardcoded design values, correct folder placement.
- Any complexity introduced beyond the minimum required MUST be documented in the plan's
  Complexity Tracking table with a written justification.

## Governance

This constitution supersedes all other style guides, component conventions, and ad-hoc design
decisions for the Aura Bet landing page project. Amendments require:

1. A written rationale documenting why the current principle is insufficient or incorrect.
2. A version bump following the versioning policy below, applied on the same commit.
3. Propagation to all dependent templates (plan, spec, tasks) in the same commit.

**Versioning policy**:
- MAJOR: Removal or backward-incompatible redefinition of an existing principle.
- MINOR: New principle or section added, or materially expanded guidance.
- PATCH: Wording clarifications, typo fixes, non-semantic refinements.

**Compliance review**: Every pull request MUST include a Constitution Check confirmation
in the plan. Intentional violations MUST be logged in the plan's Complexity Tracking table
with a justification; unlogged violations are grounds for PR rejection.

**Version**: 1.0.0 | **Ratified**: 2026-03-23 | **Last Amended**: 2026-03-23
