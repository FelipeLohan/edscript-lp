# Research: Aura Bet Landing Page

**Branch**: `001-aura-bet-landing-page` | **Date**: 2026-03-23

## Decision Log

---

### D-001: Tailwind CSS v4 — CSS `@theme` replaces `tailwind.config.ts`

**Decision**: Use Tailwind v4's CSS-native `@theme {}` block in `src/styles.css` for all
design token definitions (colors, fonts, spacing, shadows, animations).

**Rationale**: The project has Tailwind CSS v4.1.12 already installed. In v4, the
`tailwind.config.ts` file is no longer used; all theme customization is done via
`@theme { ... }` in CSS. The `.postcssrc.json` is already configured with
`@tailwindcss/postcss`. The spirit of Constitution Principle II (single source of truth,
no hardcoded values in templates) is fully preserved — the mechanism is just CSS-first
rather than JS-first.

**Alternatives considered**:
- Downgrade to Tailwind v3: Rejected — unnecessary migration risk, adds complexity.
- Use CSS custom properties without `@theme`: Rejected — loses Tailwind's utility class
  generation from theme tokens; templates would require manual var() references.

**Implementation notes**:
- `@theme` block goes at the top of `src/styles.css`, immediately after `@import "tailwindcss"`.
- Token naming convention: `--color-aura-dark`, `--color-aura-navy`, `--font-display`, etc.
- Tailwind v4 auto-generates utility classes from `@theme` tokens (e.g., `bg-aura-dark`,
  `text-aura-accent`, `font-display`).
- `@layer base`, `@layer components`, `@layer utilities` work identically to v3.

---

### D-002: Angular 21 Standalone Components — No NgModules

**Decision**: Use Angular 21 standalone components API throughout. No NgModules created.

**Rationale**: The project scaffold (app.ts) already uses the standalone API. Angular 21
makes standalone the default. NgModules add boilerplate with no benefit for a single-page
landing page.

**Implementation notes**:
- Each component declares `standalone: true` (or omits the field — standalone is default
  in Angular 19+).
- Shared components are imported directly in the `imports` array of each consuming component.
- `app.config.ts` uses `provideRouter()` and other functional providers.

---

### D-003: Scroll-Triggered Animations — IntersectionObserver via AnimationService

**Decision**: Use the native `IntersectionObserver` API, wrapped in `AnimationService`
in `src/app/core/animation.service.ts`, to trigger animations when elements enter the
viewport.

**Rationale**:
- No third-party animation library needed (avoids bundle bloat).
- IntersectionObserver is supported in all modern browsers and Safari 12.1+.
- Centralizing in a service allows consistent `prefers-reduced-motion` handling and
  easy cleanup of observers.

**Alternatives considered**:
- GSAP / Anime.js: Rejected — third-party runtime dependency requires constitution amendment;
  CSS animations + IntersectionObserver achieves the same result for this use case.
- Angular Animations (`@angular/animations`): Viable but adds a runtime dependency. CSS
  animations triggered by class toggles via IntersectionObserver are simpler and lighter.

**Implementation notes**:
- `AnimationService.observe(el, callback)` registers an IntersectionObserver.
- `AnimationService` checks `window.matchMedia('(prefers-reduced-motion: reduce)')` at
  init and skips animation registration if reduced motion is preferred — returning
  the final state immediately instead.
- Components use `@ViewChild` / `ElementRef` to pass their root element to the service.
- Observers are cleaned up in `ngOnDestroy`.

---

### D-004: Web Fonts — Bebas Neue (display), JetBrains Mono (data), DM Sans (body)

**Decision**: Load fonts via Google Fonts CDN using `<link rel="preconnect">` and
`<link rel="preload">` in `index.html`. Define font-family tokens in the `@theme` block.

**Font assignments**:
- `font-display` → Bebas Neue (bold headlines, section titles)
- `font-data` → JetBrains Mono (odds, percentages, scores, timestamps)
- `font-body` → DM Sans (body copy, descriptions, navigation)

**Rationale**:
- Bebas Neue: condensed, high-impact, legitimately premium — used by Bloomberg and
  several tier-1 sports media properties.
- JetBrains Mono: purpose-built monospace with excellent numeral rendering; signals
  technical precision for live data.
- DM Sans: clean, geometric, readable at small sizes — pairs well with condensed display
  without the generic SaaS associations of Inter/Roboto (prohibited by Principle VII).

**Alternatives considered**:
- Self-hosted fonts: Better privacy and performance; viable if CLS becomes an issue.
  Can be swapped in post-launch by replacing the `<link>` tags.
- Syne (alternative to Bebas Neue): Equally valid — more geometric, slightly less
  aggressive. Bebas Neue chosen for maximum impact at hero scale.

**Implementation notes**:
- `<link rel="preconnect" href="https://fonts.googleapis.com">` in `index.html`.
- Font CSS `@import` inside `src/styles.css` `@layer base` block.
- `@theme` declares `--font-display`, `--font-data`, `--font-body` CSS custom properties.

---

### D-005: Live Match Ticker — CSS Animation (`ticker-scroll`) + Static Mock Data

**Decision**: The hero ticker uses a CSS `animation: ticker-scroll` keyframe (horizontal
scroll) defined in `@theme` / `@keyframes`, applied to a duplicated list of mock match
items to create a seamless loop.

**Mock data**: 6-8 hardcoded `MatchData` objects in `hero-section.component.ts`.

**Rationale**:
- Pure CSS animation is GPU-accelerated and requires no JavaScript tick loop.
- Seamless loop achieved by duplicating the item list and animating from `translateX(0)`
  to `translateX(-50%)`.
- `prefers-reduced-motion: reduce` pauses the animation via `animation-play-state: paused`.

**Alternatives considered**:
- JavaScript `requestAnimationFrame` ticker: More flexible but heavier; pure CSS is
  sufficient for this use case.
- Third-party slider library (Swiper, etc.): Rejected — adds a runtime dependency;
  overkill for a static ticker.

---

### D-006: Confidence Meter Animation — CSS `@keyframes` + `pulse-glow`

**Decision**: The confidence meter bar uses a CSS width transition from 0% to the target
value, triggered by an `IntersectionObserver` class toggle. The pulsing glow uses the
`pulse-glow` keyframe animation defined in `@theme`.

**Rationale**: CSS transitions on `width` with a cubic-bezier easing provide a smooth,
visually impressive fill animation without JavaScript. Combined with the amber glow shadow
token, this creates the premium data-reveal aesthetic.

---

### D-007: Animated Number Counters (`animateCounter`) — `requestAnimationFrame`

**Decision**: The `animateCounter(el, target, duration)` utility function in
`src/app/utils/animate-counter.ts` uses `requestAnimationFrame` with a linear interpolation
to count from 0 to the target value over `duration` ms. It is a pure function that returns
a `() => void` cancel handle.

**Rationale**: `requestAnimationFrame`-based counters are smooth, respect the browser's
paint cycle, and are trivially cancellable. Keeping this as a pure utility (no Angular deps)
satisfies Principle IV (Folder Responsibility Boundaries).

**Implementation notes**:
- `AnimationService` wraps the call and checks `prefers-reduced-motion` before invoking,
  setting the final value directly if motion is reduced.

---

### D-008: Testing Strategy — Vitest + jsdom

**Decision**: Use the existing Vitest 4.0 + jsdom setup for unit tests on utils and shared
components. No E2E framework is added for the landing page MVP.

**Rationale**: Vitest is already in the project (`package.json`). Landing page unit tests
focus on pure utility functions (`formatOdds`, `formatPercentage`, `animateCounter`) and
shared component rendering. Full E2E testing is deferred as it is not in scope for the
MVP landing page specification.

---

### D-009: App Store Badge Links — Disabled State for Placeholder URLs

**Decision**: `AppStoreLink` objects carry an `active: boolean` flag. When `false`, the
badge renders with `aria-disabled="true"`, reduced opacity via a Tailwind token class, and
`pointer-events: none`. No broken `href` is rendered.

**Rationale**: Addresses the edge case in the spec — app store links not yet live at
initial launch. The disabled state is visually distinct and accessible without producing
404s or broken links.
