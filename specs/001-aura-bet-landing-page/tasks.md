# Tasks: Aura Bet Landing Page

**Input**: Design documents from `/specs/001-aura-bet-landing-page/`
**Prerequisites**: plan.md ✅ spec.md ✅ research.md ✅ data-model.md ✅ contracts/ ✅

**Tests**: Not requested — no test tasks generated.

**Organization**: Tasks are grouped by user story to enable independent implementation and
testing of each story.

> **Note on Tailwind v4**: The project uses Tailwind CSS v4.1.12. All design tokens are
> defined via `@theme {}` in `src/styles.css` — there is no `tailwind.config.ts`.
> See `research.md D-001` and `contracts/design-tokens.md` for full token reference.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- File paths are relative to the repository root

---

## Phase 1: Setup

**Purpose**: Create the folder structure and configure the global design token system.
All subsequent work depends on tokens being in place.

- [x] T001 Create folder structure: `src/app/shared/`, `src/app/components/`, `src/app/core/`, `src/app/utils/` (mkdir only — no files yet)
- [x] T002 Add Google Fonts `<link rel="preconnect">` and `<link rel="preload">` tags for Syne, JetBrains Mono, and DM Sans to `src/index.html`
- [x] T003 Configure Tailwind v4 `@theme {}` block in `src/styles.css` — add all color tokens (`--color-aura-dark: #0a0e1a`, `--color-aura-navy: #0f172a`, `--color-aura-accent: #f59e0b`, `--color-aura-electric: #3b82f6`, `--color-aura-glow: rgba(245,158,11,0.15)`, `--color-aura-muted: #64748b`, `--color-aura-surface: #1e293b`, `--color-aura-border: rgba(148,163,184,0.12)`), font tokens (`--font-display`, `--font-data`, `--font-body`), shadow tokens (`--shadow-glow-amber`, `--shadow-glow-blue`, `--shadow-card`), spacing tokens (`--spacing-section: 5rem`), and keyframe animations (`ticker-scroll`, `pulse-glow`, `fade-in-up`) per `contracts/design-tokens.md`
- [x] T004 Add `@layer base` block to `src/styles.css` — Google Fonts `@import`, CSS reset (box-sizing, margin 0), `body { background: theme(--color-aura-dark); color: white; font-family: theme(--font-body); }`, global `@media (prefers-reduced-motion: reduce)` rule suppressing all animations
- [x] T005 Add `@layer components` block to `src/styles.css` — define `.btn-primary`, `.btn-secondary`, `.btn-ghost`, `.card-glow`, `.badge-live`, `.data-value`, `.section-title` utility classes per `contracts/design-tokens.md`

**Checkpoint**: `npm start` serves an empty app on a dark navy background with correct fonts loaded. No layout yet.

---

## Phase 2: Foundational (Shared Library + Core Services)

**Purpose**: Build all reusable primitives and services that page sections will consume.
**⚠️ CRITICAL**: No page section work can begin until Phase 2 is complete — shared components must exist before sections import them.

- [x] T006 [P] Create `src/app/utils/format-odds.ts` — export pure function `formatOdds(value: number, format: 'decimal' | 'fractional' = 'decimal'): string`; returns decimal odds to 2dp (e.g., `1.85`) or fractional string (e.g., `"17/20"`); throws on value < 1.0
- [x] T007 [P] Create `src/app/utils/format-percentage.ts` — export pure function `formatPercentage(value: number, decimals = 1): string`; clamps input to 0–100; returns `"87.3%"` format; no Angular dependencies
- [x] T008 [P] Create `src/app/utils/animate-counter.ts` — export pure function `animateCounter(el: HTMLElement, target: number, duration: number): () => void`; uses `requestAnimationFrame` with linear interpolation; updates `el.textContent` each frame; returns cancel handle; no Angular dependencies
- [x] T009 [P] Create `src/app/core/animation.service.ts` — `@Injectable({ providedIn: 'root' })`; property `prefersReducedMotion: boolean` set once at init via `window.matchMedia('(prefers-reduced-motion: reduce)').matches`; method `observe(el: ElementRef, onEnter: () => void, threshold = 0.2): void` registers an IntersectionObserver that calls `onEnter` once when element crosses threshold (skip and call immediately if `prefersReducedMotion`); method `unobserve(el: ElementRef): void`; store observer refs in a `WeakMap` for cleanup
- [x] T010 [P] Create `src/app/core/theme.service.ts` — `@Injectable({ providedIn: 'root' })`; property `readonly theme = 'dark'` (dark-only for now); method `getTheme(): string`; stub ready for future light/dark expansion — no DOM manipulation needed for MVP
- [x] T011 [P] Create `src/app/shared/button/aura-button.component.ts` + `.html` + `.css` — standalone, OnPush; `@Input() variant: 'primary' | 'secondary' | 'ghost' = 'primary'`; `@Input() size: 'sm' | 'md' | 'lg' = 'md'`; `@Input() disabled = false`; `@Input() ariaLabel?: string`; `@Input() type: 'button' | 'submit' = 'button'`; `@Output() clicked = new EventEmitter<MouseEvent>()`; template renders a `<button>` with host class binding applying variant and size Tailwind classes from `@layer components`; `aria-disabled` set when disabled; focus ring via `focus-visible:ring-2 focus-visible:ring-aura-accent`; `<ng-content>` for label
- [x] T012 [P] Create `src/app/shared/badge/aura-badge.component.ts` + `.html` + `.css` — standalone, OnPush; `@Input() variant: 'live' | 'new' | 'hot' | 'ai' = 'live'`; `@Input() label = ''`; `@Input() pulse = false`; template renders a `<span>` with conditional Tailwind classes: `live` → `bg-aura-accent text-aura-dark` + `animate-pulse-glow` when `pulse && !prefersReducedMotion`; `new` → `bg-aura-electric text-white`; `hot` → `bg-aura-accent text-aura-dark`; `ai` → `bg-aura-electric/20 text-aura-electric border border-aura-electric/40`; inject `AnimationService` for `prefersReducedMotion` check
- [x] T013 [P] Create `src/app/shared/card/aura-card.component.ts` + `.html` + `.css` — standalone, OnPush; `@Input() glow: 'none' | 'amber' | 'blue' = 'none'`; `@Input() padding: 'sm' | 'md' | 'lg' = 'md'`; template: `<div>` with `bg-aura-navy border border-aura-border rounded-xl` base classes; `shadow-glow-amber` applied when `glow === 'amber'`; `shadow-glow-blue` when `glow === 'blue'`; named slot `[card-header]` via `<ng-content select="[card-header]">` + default `<ng-content>`
- [x] T014 [P] Create `src/app/shared/stat-card/aura-stat-card.component.ts` + `.html` + `.css` — standalone, OnPush; `@Input() counter!: StatCounter` (import interface from `data-model` types file); `@Input() animate = true`; `@Output() animationComplete = new EventEmitter<void>()`; inject `AnimationService`; template: `<div>` with `bg-aura-surface rounded-xl` wrapper; `<span class="data-value">` for the number (monospace, large); suffix and label as separate elements; in `ngAfterViewInit`: call `animationService.observe(elRef, () => triggerCount())` where `triggerCount()` calls `animateCounter(valueEl.nativeElement, counter.targetValue, counter.animationDuration)` unless `!animate` or `prefersReducedMotion`; unobserve in `ngOnDestroy`
- [x] T015 Create `src/app/shared/live-match-card/live-match-card.component.ts` + `.html` + `.css` — standalone, OnPush; `@Input() prediction!: PredictionCard`; `@Input() animateOnEnter = true`; inject `AnimationService`; template has 4 sub-sections: (1) match header row — `<aura-badge variant="live" label="LIVE" [pulse]="true">`, team shortcodes, minute played in `font-data`; (2) confidence meter — labelled `<div>` with dark track, amber fill bar `[style.width.%]="confidenceScore"` animated via CSS transition width from 0 on IntersectionObserver trigger, `role="progressbar"` ARIA; (3) odds row — 3 cells (home/draw/away) using `formatOdds()`, predicted outcome cell highlighted with `bg-aura-accent/20 border-aura-accent`; (4) stats grid — 3 rows using `*ngFor` with `trackBy: trackByStat`, labels in `text-aura-muted`, values in `font-data`; outer element has `role="region"` `[attr.aria-label]="prediction.match.homeTeam.name + ' vs ' + prediction.match.awayTeam.name"`

**Checkpoint**: All shared components compile. Serve a temporary test page with all shared components visible before proceeding to page sections.

---

## Phase 3: User Story 1 — First Impression to Sign-Up (Priority: P1) 🎯 MVP

**Goal**: Build the hero section. A visitor landing on the page sees the headline, live data ticker, and primary CTA above the fold without scrolling.

**Independent Test**: Comment out all sections except `<app-hero-section>` in `app.html`. Open at 1280×800 and 375×812. Verify headline visible, ticker animating, CTA button clickable and keyboard-focusable.

### Implementation for User Story 1

- [x] T016 [US1] Define `MOCK_TICKER_DATA: readonly MatchData[]` — 8 mock `MatchData` objects hardcoded in `src/app/components/hero/hero-section.component.ts`; vary sports (football, basketball, tennis), statuses (live, upcoming), teams with 3-letter codes; ids are unique strings for `trackBy`
- [x] T017 [US1] Build `src/app/components/hero/hero-section.component.ts` — standalone, OnPush; import `AuraButtonComponent`; expose `readonly ticker = [...MOCK_TICKER_DATA, ...MOCK_TICKER_DATA]` (doubled list for seamless CSS loop); no service injection needed
- [x] T018 [US1] Build `src/app/components/hero/hero-section.component.html` — section: `min-h-screen bg-aura-dark flex flex-col justify-center`; headline using `font-display text-6xl md:text-8xl text-white uppercase tracking-tight` with amber word highlight `<span class="text-aura-accent">`; subtitle in `font-body text-aura-muted`; `<aura-button variant="primary" size="lg">Get Started Free</aura-button>` with `ariaLabel="Sign up for Aura Bet"`; hero bottom strip: ticker container with `overflow-hidden` parent and inner `<ul>` flex row using `animate-ticker-scroll` CSS animation; each ticker item renders team codes + score in `font-data text-aura-accent`; `*ngFor` with `trackBy: trackByMatch`
- [x] T019 [US1] Build `src/app/components/hero/hero-section.component.css` — contain only component-specific overrides not achievable via Tailwind utilities; if needed: custom `--ticker-duration` CSS var for speed tuning; keep file minimal
- [x] T020 [US1] Verify hero section standalone: temporarily add `HeroSectionComponent` to `app.html` alone; open in browser at 375px, 768px, 1280px; confirm headline visible above fold on all 3 widths, ticker scrolls, CTA has visible amber focus ring on Tab key

**Checkpoint**: User Story 1 is independently functional. The hero converts on its own.

---

## Phase 4: User Story 2 — Skeptical Visitor Evaluates and Converts (Priority: P2)

**Goal**: Build the 4-section trust journey: How It Works → Predictions Demo → Key Features → Social Proof → CTA. Each section persuades a skeptic to convert.

**Independent Test**: Comment out hero and footer in `app.html`; render only the 5 trust-journey sections. Verify the confidence meter animates, counters roll, and the CTA section is reachable and contains app store badges.

### How It Works Section

- [x] T021 [P] [US2] Define `PROCESS_STEPS: readonly ProcessStep[]` — 3 hardcoded steps in `src/app/components/how-it-works/how-it-works-section.component.ts`: `{ id: 'step-1', stepNumber: 1, title: 'Real-Time Data Ingestion', description: '...', iconName: 'database' }`, `{ id: 'step-2', stepNumber: 2, title: 'Algorithm Processing', description: '...', iconName: 'cpu' }`, `{ id: 'step-3', stepNumber: 3, title: 'Prediction Delivery', description: '...', iconName: 'target' }`; descriptions must be substantive (1–2 sentences each, no lorem ipsum)
- [x] T022 [US2] Build `src/app/components/how-it-works/how-it-works-section.component.ts` + `.html` + `.css` — standalone, OnPush; inject `AnimationService`; template: `<section>` with `py-section bg-aura-navy`; `<h2 class="section-title">` heading; horizontal (desktop) / vertical (mobile) 3-step flex/grid layout with connecting line rendered as an absolute-positioned `<div>` border; each step: step number circle in `text-aura-accent font-data`, SVG icon stub `<img loading="lazy" width="32" height="32">`, title in `font-display`, description in `font-body text-aura-muted`; each step element has `@ViewChild` reference passed to `AnimationService.observe()` for `fade-in-up` entrance; `*ngFor` with `trackBy: trackByStep`

### Predictions Demo Section

- [x] T023 [P] [US2] Define `MOCK_PREDICTION: PredictionCard` — single hardcoded prediction in `src/app/components/predictions-demo/predictions-demo-section.component.ts`; use Man City vs Arsenal, Premier League, status `'live'`, minute 67; `confidenceScore: 73`, `predictedOutcome: 'home'`; `odds: { home: 1.65, draw: 3.80, away: 5.50 }`; 3 stats: `{ id: 'stat-shots', label: 'Shots on Target', homeValue: 7, awayValue: 3 }`, `{ id: 'stat-poss', label: 'Possession', homeValue: '61%', awayValue: '39%', unit: '%' }`, `{ id: 'stat-form', label: 'Recent Form', homeValue: 'W W W D W', awayValue: 'W D W L W' }`
- [x] T024 [US2] Build `src/app/components/predictions-demo/predictions-demo-section.component.ts` + `.html` + `.css` — standalone, OnPush; import `LiveMatchCardComponent`, `AuraBadgeComponent`; template: `<section>` with `py-section bg-aura-dark`; section header with `<aura-badge variant="ai" label="AI Demo">`; `<aura-live-match-card [prediction]="mockPrediction" [animateOnEnter]="true">` centered or alongside supporting copy; supporting copy: 2–3 lines explaining what the card shows

### Key Features Section

- [x] T025 [P] [US2] Define `FEATURE_ITEMS: readonly FeatureItem[]` — 4 items in `src/app/components/features/features-section.component.ts`: Real-time Data Feeds (`accentColor: 'amber'`, metric: `'<50ms latency'`), Prediction Accuracy (`accentColor: 'amber'`, metric: `'94.2% accuracy'`), Multi-Sport Coverage (`accentColor: 'electric'`, metric: `'12 sports'`), Risk Analysis Dashboard (`accentColor: 'electric'`); each description MUST be 2 substantive sentences; no icon-title-description grid layout (use asymmetric layout per constitution)
- [x] T026 [US2] Build `src/app/components/features/features-section.component.ts` + `.html` + `.css` — standalone, OnPush; inject `AnimationService`; import `AuraCardComponent`, `AuraBadgeComponent`; template: `<section>` with `py-section bg-aura-navy`; use CSS grid `grid-cols-1 md:grid-cols-2` with intentional asymmetry (first card spans 2 columns on large screens, others in a sub-grid); each card: `<aura-card [glow]="item.accentColor === 'amber' ? 'amber' : 'blue'"`; `metric` shown as `<span class="data-value">` when present; `*ngFor` with `trackBy: trackByFeature`; animate cards on scroll via `AnimationService`

### Social Proof Section

- [x] T027 [P] [US2] Define `STAT_COUNTERS: readonly StatCounter[]` — 3 counters in `src/app/components/social-proof/social-proof-section.component.ts`: `{ id: 'win-rate', label: 'Win Rate', targetValue: 94, suffix: '%', animationDuration: 1800 }`, `{ id: 'predictions', label: 'Predictions Made', targetValue: 2400000, suffix: '+', animationDuration: 2200 }`, `{ id: 'users', label: 'Active Users', targetValue: 180000, suffix: '+', animationDuration: 2000 }`
- [x] T028 [US2] Build `src/app/components/social-proof/social-proof-section.component.ts` + `.html` + `.css` — standalone, OnPush; import `AuraStatCardComponent`; template: `<section>` with `py-section bg-aura-surface`; headline in `font-display`; 3-column flex/grid of `<aura-stat-card>` components, each receiving a `StatCounter` object; dividers between stat cards using `border-aura-border`; `*ngFor` with `trackBy: trackByStat`

### CTA Section

- [x] T029 [P] [US2] Define `APP_STORE_LINKS: readonly AppStoreLink[]` — 2 links in `src/app/components/cta/cta-section.component.ts`: `{ id: 'ios', platform: 'ios', href: '#', active: false, ariaLabel: 'Download on the App Store', badgeAssetUrl: 'assets/badges/app-store.svg' }`, `{ id: 'android', platform: 'android', href: '#', active: false, ariaLabel: 'Get it on Google Play', badgeAssetUrl: 'assets/badges/google-play.svg' }`; set `active: true` when real store URLs are known
- [x] T030 [US2] Add App Store and Google Play SVG badge files to `public/assets/badges/app-store.svg` and `public/assets/badges/google-play.svg` — use official badge SVG markup (standard Apple/Google badge geometry); both files must be valid SVG
- [x] T031 [US2] Build `src/app/components/cta/cta-section.component.ts` + `.html` + `.css` — standalone, OnPush; import `AuraButtonComponent`; template: `<section>` with `py-section bg-aura-dark`; full-width layout; conversion headline in `font-display text-5xl`; urgency signal `<p>` with amber text (e.g., "Join 180,000+ bettors already winning"); `<div>` badge row: for each `AppStoreLink`, render `<a [href]="link.active ? link.href : null" [attr.aria-disabled]="!link.active" [class.opacity-40]="!link.active" [class.pointer-events-none]="!link.active" [attr.aria-label]="link.ariaLabel" [attr.rel]="link.active ? 'noopener noreferrer' : null"><img [src]="link.badgeAssetUrl" [alt]="link.ariaLabel" loading="lazy" width="160" height="48"></a>`; `*ngFor` with `trackBy: trackByLink`; primary `<aura-button variant="primary" size="lg">` CTA alongside badges

**Checkpoint**: All 5 trust-journey sections render. Confidence meter animates on scroll. Counters roll. CTA section shows disabled-state badges. User Story 2 is independently testable.

---

## Phase 5: User Story 3 — Mobile User on Return Visit (Priority: P3)

**Goal**: Ensure the full page is usable and fast on a 375px viewport. App store badge disabled state renders correctly on touch.

**Independent Test**: Open Chrome DevTools → device toolbar → iPhone SE (375×667). Scroll the full page. No horizontal overflow, no truncated text, stats reflow correctly in the predictions demo.

- [x] T032 [US3] Audit hero section at 375px: ensure headline font-size steps down gracefully (`text-4xl` on `xs`), ticker items don't overflow, CTA button fills width on mobile (`w-full sm:w-auto`) in `src/app/components/hero/hero-section.component.html`
- [x] T033 [US3] Audit predictions demo at 375px: add `flex-col` breakpoint override in `src/app/shared/live-match-card/live-match-card.component.html` so stats grid becomes single-column stacked layout below `md:` breakpoint; verify no overflow
- [x] T034 [US3] Audit How It Works, Features, Social Proof sections at 375px: confirm `grid-cols-1` on mobile for all multi-column grids; verify step connecting-line hides or becomes vertical on mobile in `src/app/components/how-it-works/how-it-works-section.component.html`
- [x] T035 [US3] Verify app store badge disabled state on touch: in `src/app/components/cta/cta-section.component.html` confirm `pointer-events-none` and `opacity-40` render correctly; verify `aria-disabled="true"` is present on inactive badge anchors

**Checkpoint**: Full page scrolls on 375px viewport with no horizontal overflow. All 7 sections readable. App store badges show disabled state.

---

## Phase 6: User Story 4 — Responsible Gambling Compliance (Priority: P4)

**Goal**: Build the footer with a legally compliant, accessible responsible gambling notice.

**Independent Test**: Render only `<app-footer>` in `app.html`. Tab through the footer — every link is focusable. Use browser DevTools color picker to verify the responsible gambling text contrast ratio is ≥ 4.5:1.

- [x] T036 [P] [US4] Define `NAV_LINKS: readonly NavLink[]` — 5 links in `src/app/components/footer/footer.component.ts`: Home (`href: '#top'`), Features (`href: '#features'`), How It Works (`href: '#how-it-works'`), Predictions (`href: '#predictions'`), Privacy Policy (`href: '/privacy'`, `external: false`); also define `SOCIAL_LINKS` array for placeholder social icon anchors
- [x] T037 [US4] Build `src/app/components/footer/footer.component.ts` + `.html` + `.css` — standalone, OnPush; template: `<footer>` with `bg-aura-dark border-t border-aura-border py-12`; top row: Aura Bet logo `<img>` (SVG, `alt="Aura Bet"`, `width="120"` `height="32"`) + `<nav aria-label="Footer navigation">` with `<ul>` of nav links using `*ngFor trackBy: trackByLink`; each `<a>` has `class="text-aura-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-aura-accent"`; social icon row; bottom row: copyright `<p class="text-aura-muted text-sm">`; responsible gambling notice in separate `<div class="border-t border-aura-border mt-8 pt-6">` with `role="note"` `aria-label="Responsible gambling notice"`: `<p class="text-aura-muted text-sm leading-relaxed">` containing the full notice text
- [x] T038 [US4] Add `public/assets/logo.svg` — Aura Bet wordmark SVG (can be a text-based SVG placeholder with `font-family="sans-serif"` rendering "AURA BET" in dark theme for now); must be valid SVG, `width="120"` `height="32"`
- [x] T039 [US4] Verify footer accessibility: manually tab through `<app-footer>` in isolation; confirm: (a) all `<a>` elements receive visible amber focus ring; (b) `aria-label="Responsible gambling notice"` present on the notice container; (c) DevTools accessibility tree shows footer landmark with nav region

**Checkpoint**: Footer renders with visible responsible gambling notice. All links keyboard-accessible.

---

## Phase 7: App Shell & Polish

**Purpose**: Wire all sections into the app shell, add the sticky nav header, and run final cross-cutting validation.

- [x] T040 Build sticky nav header in `src/app/app.html` — `<header class="sticky top-0 z-50 bg-aura-dark/90 backdrop-blur-sm border-b border-aura-border">` containing Aura Bet logo `<img>` (reuse `assets/logo.svg`) and `<aura-button variant="ghost" size="sm">Sign Up</aura-button>`; import `AuraButtonComponent` in `src/app/app.ts`
- [x] T041 Wire all 7 sections in `src/app/app.html` — add section components in order: `<app-hero-section>`, `<app-how-it-works-section id="how-it-works">`, `<app-predictions-demo-section id="predictions">`, `<app-features-section id="features">`, `<app-social-proof-section>`, `<app-cta-section id="cta">`, `<app-footer>`; import all section components in `src/app/app.ts`; set `changeDetection: ChangeDetectionStrategy.OnPush` in `app.ts`
- [x] T042 Add `scroll-behavior: smooth` to `<html>` in `src/styles.css` `@layer base`; verify anchor links in nav header (`#features`, `#how-it-works`, `#cta`) scroll smoothly to their target sections
- [x] T043 OnPush audit — grep all component `.ts` files and confirm `ChangeDetectionStrategy.OnPush` is declared in every `@Component` decorator; fix any missing declarations in `src/app/shared/`, `src/app/components/`
- [x] T044 Accessibility final audit — Tab through entire page from top to bottom; verify: no focus trap, every button/link has visible amber focus ring, `aria-label` present on all icon-only elements, landmark regions present (`<header>`, `<main>`, `<footer>`); wrap section components in `<main>` in `src/app/app.html`
- [x] T045 Token compliance audit — search all `.html` files for `style="`, `text-\[#`, `bg-\[#`, `p-\[`, `m-\[`; confirm zero hardcoded color or spacing values; all references trace to Tailwind token classes from `contracts/design-tokens.md`
- [x] T046 Run quickstart.md validation — execute all manual acceptance checks from `specs/001-aura-bet-landing-page/quickstart.md` in sequence; confirm each checkbox passes; `npm run build` completes with no errors

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: No dependencies — start immediately
- **Phase 2 (Foundational)**: Depends on Phase 1 completion (tokens must exist before components use them)
- **Phase 3 (US1 Hero)**: Depends on Phase 2 — needs `AuraButtonComponent`, utils
- **Phase 4 (US2 Trust Journey)**: Depends on Phase 2 — needs all shared components; can run in parallel with Phase 3
- **Phase 5 (US3 Mobile)**: Depends on Phase 3 + Phase 4 — all sections must exist before responsive audit
- **Phase 6 (US4 Footer)**: Depends on Phase 2 only — footer has no section dependencies; can run in parallel with Phase 3/4
- **Phase 7 (Polish)**: Depends on all prior phases complete

### User Story Dependencies

- **User Story 1 (P1)**: Depends on Foundational phase only
- **User Story 2 (P2)**: Depends on Foundational phase only; can run in parallel with US1
- **User Story 3 (P3)**: Depends on US1 + US2 complete
- **User Story 4 (P4)**: Depends on Foundational phase only; can run in parallel with US1/US2

### Within Each User Story

- Mock data definitions [P] tasks can start immediately (they're just TS constants)
- Component `.ts` file before `.html` template
- Shared components imported into section only after the shared component is complete
- AnimationService integration after component shell exists

---

## Parallel Opportunities

### Phase 2 (Foundational) — all [P] tasks run together

```bash
# Launch in parallel:
T006  format-odds.ts
T007  format-percentage.ts
T008  animate-counter.ts
T009  animation.service.ts
T010  theme.service.ts
T011  aura-button.component.*
T012  aura-badge.component.*
T013  aura-card.component.*
T014  aura-stat-card.component.*
# T015 LiveMatchCard depends on T011+T012 — run after those complete
```

### Phase 3 + Phase 4 + Phase 6 — run all three phases in parallel

```bash
# Once Phase 2 complete, launch simultaneously:
# Thread A: Phase 3 (US1 Hero) — T016 → T017 → T018 → T019 → T020
# Thread B: Phase 4 (US2 Trust) — T021–T031 in order within phase
# Thread C: Phase 6 (US4 Footer) — T036 → T037 → T038 → T039
```

### Phase 4 internal — mock data tasks are [P] with each other

```bash
# Launch simultaneously at Phase 4 start:
T021  PROCESS_STEPS mock data
T023  MOCK_PREDICTION mock data
T025  FEATURE_ITEMS mock data
T027  STAT_COUNTERS mock data
T029  APP_STORE_LINKS mock data
# Then build sections in dependency order
```

---

## Implementation Strategy

### MVP (User Story 1 only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (Hero)
4. **STOP and validate**: Hero section renders at 375px and 1280px; CTA clickable and focusable
5. Deploy preview — this alone demonstrates the brand and captures early sign-ups

### Incremental Delivery

1. Phase 1 + 2 → Foundation ready
2. Phase 3 → Hero live → demo and validate US1
3. Phase 4 + Phase 6 in parallel → Trust journey + Footer live → validate US2 + US4
4. Phase 5 → Mobile audit → validate US3
5. Phase 7 → Full page wired and polished → production-ready

### Parallel Team Strategy

With two developers:

- **Dev A**: Phase 1 → Phase 2 (T006–T010 utils + services) → Phase 3 (US1 Hero)
- **Dev B**: Phase 2 (T011–T015 shared components) → Phase 4 (US2 + CTA) + Phase 6 (Footer)
- Both merge after Phase 2; Dev A and Dev B integrate via Phase 7

---

## Notes

- [P] tasks = different files, no incomplete dependencies — safe to run in parallel
- Tailwind v4 token correction: user input referenced `tailwind.config.ts` — all token work goes in `src/styles.css` `@theme {}` block (T003–T005)
- `utils/` functions have no Angular dependencies — they can be developed and mentally tested in isolation
- `AnimationService.prefersReducedMotion` is checked once at service init — components do not need to re-check it themselves
- All `*ngFor` loops require `trackBy` — IDs are defined in mock data specifically for this
- App store badges start as `active: false` — flip to `true` in T029 when real store URLs are known
- Commit after each phase checkpoint to keep the branch history clean and reviewable
