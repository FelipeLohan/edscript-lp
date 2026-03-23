# Aura Bet — Landing Page

AI-powered sports predictions landing page built with **Angular 21** and **Tailwind CSS v4**.

---

## Design Token System

All tokens are defined in `src/styles.css` inside the `@theme {}` block (Tailwind v4 syntax). There is no `tailwind.config.ts`.

### Colors

| Token | CSS Variable | Hex | Usage |
|-------|-------------|-----|-------|
| `aura-dark` | `--color-aura-dark` | `#0a0e1a` | Page background |
| `aura-navy` | `--color-aura-navy` | `#0f172a` | Card/section backgrounds |
| `aura-accent` | `--color-aura-accent` | `#f59e0b` | Primary CTA, highlights, amber glow |
| `aura-electric` | `--color-aura-electric` | `#3b82f6` | Secondary accent, electric badge |
| `aura-muted` | `--color-aura-muted` | `#94a3b8` | Body copy, muted text |
| `aura-glow` | `--color-aura-glow` | `rgba(245,158,11,0.15)` | Ambient amber glow tint |

Use in templates as Tailwind utilities: `bg-aura-dark`, `text-aura-accent`, `border-aura-electric`, etc.

### Typography

| Token | CSS Variable | Font | Usage |
|-------|-------------|------|-------|
| `font-display` | `--font-display` | Syne (800) | All headings (`<h1>`–`<h4>`) |
| `font-mono` | `--font-mono` | JetBrains Mono | All numeric/stats data |
| `font-sans` | `--font-sans` | DM Sans | Body copy, labels |

Use as `font-display`, `font-mono`, `font-sans` Tailwind classes.

> **Rule**: All numbers, odds, percentages, and counters must use `font-mono` / `data-value` class.

### Shadows

| Token | CSS Variable | Effect |
|-------|-------------|--------|
| `shadow-glow-amber` | `--shadow-glow-amber` | `0 0 24px rgba(245,158,11,0.4)` |
| `shadow-glow-blue` | `--shadow-glow-blue` | `0 0 24px rgba(59,130,246,0.4)` |
| `shadow-card-glow` | `--shadow-card-glow` | `0 4px 32px rgba(245,158,11,0.12)` |

### Animations

| Token | Class | Description |
|-------|-------|-------------|
| `ticker-scroll` | `animate-ticker-scroll` | Pure CSS horizontal marquee for hero ticker |
| `pulse-glow` | `animate-pulse-glow` | Amber opacity pulse for LIVE badges |
| `fade-in-up` | `animate-fade-in-up` | Scroll entrance: opacity 0 → 1, translateY 24px → 0 |
| `confidence-fill` | — | Internal keyframe used by `.confidence-bar-animated` |

### Component Classes (`@layer components`)

| Class | Description |
|-------|-------------|
| `.btn-primary` | Amber filled button |
| `.btn-secondary` | Amber outlined button |
| `.btn-ghost` | Transparent button with border |
| `.btn-sm` / `.btn-md` / `.btn-lg` | Size variants |
| `.card-glow` | Dark card with amber glow border |
| `.badge-live` | Red pulsing LIVE indicator |
| `.data-value` | JetBrains Mono numeric display |
| `.section-title` | Syne 800 display heading |
| `.is-visible` | Applied by `AnimationService` to trigger `fade-in-up` |
| `.confidence-bar-animated` | Triggers width animation on the confidence fill bar |

---

## Component API

All components are **standalone** with `ChangeDetectionStrategy.OnPush`.

### `AuraButtonComponent` — `aura-button`

```html
<aura-button variant="primary" size="md" [disabled]="false" ariaLabel="Sign up">
  Sign Up
</aura-button>
```

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size variant |
| `disabled` | `boolean` | `false` | Disables the button |
| `ariaLabel` | `string` | `''` | `aria-label` attribute |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |

| Output | Type | Description |
|--------|------|-------------|
| `clicked` | `MouseEvent` | Emits on click (not emitted when disabled) |

---

### `AuraBadgeComponent` — `aura-badge`

```html
<aura-badge variant="live" [pulse]="true">LIVE</aura-badge>
<aura-badge variant="ai">AI Prediction</aura-badge>
<aura-badge variant="new">New</aura-badge>
```

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `variant` | `'live' \| 'ai' \| 'new' \| 'electric'` | `'ai'` | Color scheme |
| `pulse` | `boolean` | `false` | Adds `animate-pulse-glow` (live variant only; respects `prefers-reduced-motion`) |

---

### `AuraCardComponent` — `aura-card`

```html
<aura-card glow="amber" padding="md">
  <h3 slot="card-header">Title</h3>
  Card content goes here
</aura-card>
```

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `glow` | `'none' \| 'amber' \| 'blue'` | `'none'` | Border glow color |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Inner padding |

Named slot `[card-header]` renders above the default content slot.

---

### `AuraStatCardComponent` — `aura-stat-card`

```html
<aura-stat-card [counter]="statCounter" [animate]="true" />
```

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `counter` | `StatCounter` | ✅ | Stat data object |
| `animate` | `boolean` | — | Enable counter rollup (default `true`) |

| Output | Type | Description |
|--------|------|-------------|
| `animationComplete` | `void` | Fires when number rollup finishes |

```typescript
interface StatCounter {
  label: string;
  value: number;      // Target number
  suffix: string;     // e.g. '%', 'M+'
  duration: number;   // Animation ms
  description?: string;
}
```

---

### `LiveMatchCardComponent` — `aura-live-match-card`

```html
<aura-live-match-card [prediction]="matchData" [animateOnEnter]="true" />
```

| Input | Type | Required | Description |
|-------|------|----------|-------------|
| `prediction` | `PredictionCard` | ✅ | Match and prediction data |
| `animateOnEnter` | `boolean` | — | Trigger confidence animation on viewport entry (default `true`) |

```typescript
interface PredictionCard {
  match: MatchData;
  confidence: number;    // 0–100
  odds: OddsData;
  stats: MatchStat[];
  aiInsight?: string;
}

interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  minute: number;
  league: string;
  isLive: boolean;
}

interface OddsData {
  home: number;
  draw: number;
  away: number;
}

interface MatchStat {
  label: string;
  value: string;
  highlight?: boolean;
}
```

---

## Project Structure

```
src/
├── index.html                    # Font preconnects, meta tags
├── styles.css                    # @theme tokens, @keyframes, @layer base/components
└── app/
    ├── app.ts                    # Root component (OnPush, standalone)
    ├── app.html                  # Nav header + all section selectors
    ├── shared/
    │   ├── types.ts              # All TypeScript interfaces
    │   ├── button/               # AuraButtonComponent
    │   ├── badge/                # AuraBadgeComponent
    │   ├── card/                 # AuraCardComponent
    │   ├── stat-card/            # AuraStatCardComponent
    │   ├── live-match-card/      # LiveMatchCardComponent
    │   └── index.ts              # Barrel export
    ├── core/
    │   ├── animation.service.ts  # IntersectionObserver + reduced-motion
    │   ├── theme.service.ts      # Dark mode stub
    │   └── index.ts              # Barrel export
    ├── utils/
    │   ├── format-odds.ts        # formatOdds(value, format?)
    │   ├── format-percentage.ts  # formatPercentage(value, decimals?)
    │   ├── animate-counter.ts    # animateCounter(el, target, duration)
    │   └── index.ts              # Barrel export
    └── components/
        ├── hero/                 # HeroSectionComponent
        ├── how-it-works/         # HowItWorksSectionComponent
        ├── predictions-demo/     # PredictionsDemoSectionComponent
        ├── features/             # FeaturesSectionComponent
        ├── social-proof/         # SocialProofSectionComponent
        ├── cta/                  # CtaSectionComponent
        ├── footer/               # FooterComponent
        └── index.ts              # Barrel export
```

---

## Development

```bash
npm start          # Dev server at http://localhost:4200
npm run build      # Production build → dist/edscript-lp/
```

---

## Accessibility

- All interactive elements have `aria-label` or visible text labels
- `prefers-reduced-motion` guard in `AnimationService` — animations skip to final state
- Hero ticker has `aria-hidden="true"` (decorative)
- Responsible gambling notice uses `role="note"` with `aria-label`
- Focus rings via `:focus-visible` ring token in `@layer base`
- WCAG AA colour contrast on all text/background combinations
