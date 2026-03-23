# Contract: Design Token Reference (Tailwind v4 `@theme`)

**Branch**: `001-aura-bet-landing-page` | **Date**: 2026-03-23

All tokens below are defined in the `@theme {}` block in `src/styles.css`.
Tailwind v4 auto-generates utility classes from every `@theme` property.

**Naming rule**: `--[category]-[role]-[variant]`
- `--color-aura-dark` → utility class `bg-aura-dark`, `text-aura-dark`, etc.
- `--font-display` → utility class `font-display`
- `--shadow-glow-amber` → utility class `shadow-glow-amber`

---

## Color Tokens

| Token | Hex value | Utility class | Usage |
|---|---|---|---|
| `--color-aura-dark` | `#0a0e1a` | `bg-aura-dark` / `text-aura-dark` | Page background, deepest surface |
| `--color-aura-navy` | `#0f172a` | `bg-aura-navy` / `text-aura-navy` | Card backgrounds, nav, sections |
| `--color-aura-accent` | `#f59e0b` | `bg-aura-accent` / `text-aura-accent` | Primary CTA, confidence bar, live badge |
| `--color-aura-electric` | `#3b82f6` | `bg-aura-electric` / `text-aura-electric` | Secondary accents, AI badge, blue glow |
| `--color-aura-glow` | `rgba(245,158,11,0.15)` | `bg-aura-glow` | Subtle amber background tint |
| `--color-aura-muted` | `#64748b` | `text-aura-muted` | Secondary text, labels, captions |
| `--color-aura-surface` | `#1e293b` | `bg-aura-surface` | Elevated card surface, dividers |
| `--color-aura-border` | `rgba(148,163,184,0.12)` | `border-aura-border` | Subtle card borders |

**PROHIBITED color additions**: No pure-white backgrounds, no pastel colors, no purple tones.

---

## Typography Tokens

| Token | Value | Utility class | Usage |
|---|---|---|---|
| `--font-display` | `'Bebas Neue', sans-serif` | `font-display` | Hero headline, section titles |
| `--font-data` | `'JetBrains Mono', monospace` | `font-data` | Odds, percentages, scores, timestamps |
| `--font-body` | `'DM Sans', sans-serif` | `font-body` | Body copy, descriptions, nav, labels |

**Rule**: `font-display` MUST be used for all `<h1>` and `<h2>` elements. `font-data` MUST
be used for all numeric data rendered in odds rows, stat values, and live counters.

---

## Shadow / Glow Tokens

| Token | Value | Utility class | Usage |
|---|---|---|---|
| `--shadow-glow-amber` | `0 0 20px rgba(245,158,11,0.4), 0 0 60px rgba(245,158,11,0.15)` | `shadow-glow-amber` | Confidence bar glow, primary CTA hover |
| `--shadow-glow-blue` | `0 0 20px rgba(59,130,246,0.4), 0 0 60px rgba(59,130,246,0.15)` | `shadow-glow-blue` | Electric accent elements, AI badge glow |
| `--shadow-card` | `0 4px 24px rgba(0,0,0,0.4)` | `shadow-card` | Elevated card shadow |

---

## Animation / Keyframe Tokens

| Token / Keyframe | Duration | Timing | Usage |
|---|---|---|---|
| `ticker-scroll` | `30s` | `linear infinite` | Hero live match data ticker horizontal scroll |
| `pulse-glow` | `2s` | `ease-in-out infinite` | Live badge pulse, confidence bar shimmer |
| `number-roll` | Applied via JS (`animateCounter`) | — | Social proof stat counters |
| `fade-in-up` | `0.6s` | `ease-out forwards` | Section entrance animation (IntersectionObserver triggered) |

**`ticker-scroll` keyframe**:
```css
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

**`pulse-glow` keyframe**:
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: var(--shadow-glow-amber); opacity: 1; }
  50%       { box-shadow: none; opacity: 0.7; }
}
```

**`fade-in-up` keyframe**:
```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**`prefers-reduced-motion` rule** (applied globally in `@layer base`):
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Spacing & Layout Tokens

| Token | Value | Utility class | Usage |
|---|---|---|---|
| `--spacing-section` | `5rem` (80px) | `py-section` | Vertical padding for all page sections |
| `--spacing-container` | `1280px` | Used in `max-w-container` | Max content width |

---

## `@layer components` Utilities (defined in `src/styles.css`)

These are CSS classes available globally without component-level imports:

| Class | Description |
|---|---|
| `.btn-primary` | Primary button base styles (use with AuraButtonComponent `variant="primary"`) |
| `.card-glow` | Card with `bg-aura-navy` + `border-aura-border` + `shadow-card` |
| `.badge-live` | Live badge base: `bg-aura-accent`, `text-aura-dark`, `font-body`, `pulse-glow` |
| `.data-value` | Monospace number display: `font-data`, `text-aura-accent`, tabular-nums |
| `.section-title` | Section heading: `font-display`, large tracking, `text-white` |

---

## Constitution Compliance Notes

- Every utility class used in templates MUST trace back to a token in this document or
  a standard Tailwind utility (spacing scale, flex, grid, etc.).
- If a new token is needed, it MUST be added to `src/styles.css` `@theme` block AND
  documented here before use in templates.
- This document is the canonical reference for code review of Principle II compliance.
