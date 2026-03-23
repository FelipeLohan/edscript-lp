# Contract: Shared Components API

**Branch**: `001-aura-bet-landing-page` | **Date**: 2026-03-23

All shared components live in `src/app/shared/`. Each MUST declare:
- `ChangeDetectionStrategy.OnPush`
- `standalone: true`
- Only `@Input` / `@Output` bindings — no service injection for display-only components

---

## AuraButtonComponent

**Selector**: `aura-button`
**File**: `src/app/shared/button/aura-button.component.ts`

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size token mapped to padding/font-size |
| `disabled` | `boolean` | `false` | Disables the button; adds `aria-disabled` |
| `ariaLabel` | `string \| undefined` | `undefined` | Explicit aria-label (required when no text content) |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Native button type attribute |

### Outputs

| Output | Type | Description |
|---|---|---|
| `clicked` | `EventEmitter<MouseEvent>` | Emits on click when not disabled |

### Slots

- Default `<ng-content>` for button label text or icon+text combinations.

### Usage example

```html
<aura-button variant="primary" size="lg" ariaLabel="Sign up for Aura Bet">
  Get Started Free
</aura-button>
```

### Constitution gates

- ✅ Tailwind variant classes MUST reference tokens only (e.g., `bg-aura-accent`, not `bg-[#f59e0b]`)
- ✅ Focus ring MUST use `focus-visible:ring-2 focus-visible:ring-aura-accent` or equivalent token class
- ✅ `disabled` state MUST set `aria-disabled="true"` and suppress `clicked` emission

---

## AuraBadgeComponent

**Selector**: `aura-badge`
**File**: `src/app/shared/badge/aura-badge.component.ts`

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `variant` | `'live' \| 'new' \| 'hot' \| 'ai'` | `'live'` | Controls color and optional pulse animation |
| `label` | `string` | required | Badge text content |
| `pulse` | `boolean` | `true` for `'live'`; `false` otherwise | Adds `pulse-glow` animation |

### Outputs

None.

### Variant behavior

| Variant | Accent color | Pulse | Typical use |
|---|---|---|---|
| `live` | `aura-accent` (amber) | Yes | Live match indicator |
| `new` | `aura-electric` (blue) | No | New feature callout |
| `hot` | `aura-accent` (amber) | No | Trending prediction |
| `ai` | `aura-electric` (blue) | No | AI-generated prediction tag |

### Constitution gates

- ✅ `pulse` behavior MUST be suppressed when `prefers-reduced-motion` is active
- ✅ Background and text color combination MUST meet 4.5:1 contrast ratio

---

## AuraCardComponent

**Selector**: `aura-card`
**File**: `src/app/shared/card/aura-card.component.ts`

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `glow` | `'none' \| 'amber' \| 'blue'` | `'none'` | Optional glow border treatment |
| `padding` | `'sm' \| 'md' \| 'lg'` | `'md'` | Internal padding size |

### Outputs

None.

### Slots

- Default `<ng-content>` — card body content.
- Named slot `[card-header]` — optional header above the content divider.

### Constitution gates

- ✅ `glow` values MUST map to `shadow-glow-amber` / `shadow-glow-blue` tokens
- ✅ Background MUST use `bg-aura-navy` or `bg-aura-dark` — never a light color
- ✅ No glassmorphism (`backdrop-blur` as primary surface treatment is PROHIBITED)

---

## AuraStatCardComponent

**Selector**: `aura-stat-card`
**File**: `src/app/shared/stat-card/aura-stat-card.component.ts`

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `counter` | `StatCounter` | required | Data model object (see data-model.md) |
| `animate` | `boolean` | `true` | When false, displays `targetValue` statically |

### Outputs

| Output | Type | Description |
|---|---|---|
| `animationComplete` | `EventEmitter<void>` | Fires when the counter reaches its target value |

### Behavior

- When `animate === true` and `prefers-reduced-motion` is NOT set: counter animates from
  0 to `counter.targetValue` over `counter.animationDuration` ms using `animateCounter()`.
- When `animate === false` OR `prefers-reduced-motion` IS set: displays `counter.targetValue`
  immediately (no animation).
- Numeric value is formatted via `formatPercentage()` when `counter.suffix === '%'`,
  otherwise displayed as a plain integer with locale-aware thousands separator.

### Constitution gates

- ✅ Numeric value MUST use `font-data` (JetBrains Mono) token class
- ✅ Animation MUST be driven by `animateCounter()` pure util, not inline JavaScript

---

## LiveMatchCardComponent

**Selector**: `aura-live-match-card`
**File**: `src/app/shared/live-match-card/live-match-card.component.ts`

### Inputs

| Input | Type | Default | Description |
|---|---|---|---|
| `prediction` | `PredictionCard` | required | Full prediction data (see data-model.md) |
| `animateOnEnter` | `boolean` | `true` | Triggers confidence bar animation on viewport entry |

### Outputs

None (display-only component).

### Rendered sub-sections

1. **Match header**: League badge (`aura-badge variant="live"`), team names + short codes,
   live indicator dot + minute played.
2. **Confidence meter**: Labelled progress bar filling from left to right to `confidenceScore`%
   over `~800ms` cubic-bezier easing. Amber fill color + `pulse-glow` box-shadow on the
   filled segment.
3. **Odds row**: Home / Draw / Away odds formatted via `formatOdds()`. Monospace font.
   Highlighted odds cell for the predicted outcome.
4. **Stats grid**: 3 rows of `MatchStat` data. Label centered, home/away values flanking.
   Monospace font for numeric values.

### Constitution gates

- ✅ All odds and stat values MUST use `font-data` (JetBrains Mono) token
- ✅ Confidence bar fill color MUST use `bg-aura-accent` token — no hardcoded amber hex
- ✅ `animateOnEnter` animation MUST respect `prefers-reduced-motion` via `AnimationService`
- ✅ ARIA: card MUST have `role="region"` with `aria-label` containing the match name
