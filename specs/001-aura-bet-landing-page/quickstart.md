# Quickstart: Aura Bet Landing Page

**Branch**: `001-aura-bet-landing-page` | **Date**: 2026-03-23

This guide gets a developer from a fresh clone to a running local dev server
and validates the key acceptance criteria from the spec.

---

## Prerequisites

- Node.js ≥ 20.x
- npm ≥ 11.x (or use the version in `packageManager` field)
- Modern browser (Chrome 120+, Firefox 120+, Safari 17+)

---

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Start the Dev Server

```bash
npm start
# or: npx ng serve
```

Open [http://localhost:4200](http://localhost:4200).

Expected: The landing page loads with a dark navy background. The hero headline is visible
above the fold. The live match ticker animates across the hero section.

---

## 3. Run Unit Tests

```bash
npx vitest run
```

Expected: All utility function tests (`formatOdds`, `formatPercentage`, `animateCounter`)
and shared component tests pass.

---

## 4. Production Build Validation

```bash
npm run build
```

Expected:
- Build completes with no errors.
- No TypeScript strict mode violations.
- Bundle size: check `dist/` output — verify no unexpectedly large third-party chunks.

---

## 5. Manual Acceptance Checks

Walk through these checks after `npm start`:

### Hero Section (US1)
- [ ] Headline visible without scrolling on a 1280×800 viewport.
- [ ] Live match ticker animates automatically.
- [ ] Primary CTA button is clickable and has a visible focus ring when tabbed to.
- [ ] On a 375px-wide viewport, the hero is fully readable with no horizontal overflow.

### How It Works (US2)
- [ ] 3 steps are visible and sequentially numbered/connected.
- [ ] Step titles use the display font (Bebas Neue / Syne).

### Live Predictions Demo (US2)
- [ ] Confidence meter animates when the section scrolls into view.
- [ ] Odds row displays home / draw / away values in monospace font.
- [ ] 3 match stats (shots, possession, form) are visible.
- [ ] On a 375px viewport, the stats reflow into a stacked layout.

### Social Proof (US2)
- [ ] 3 stat counters animate from 0 to their target values on scroll-into-view.
- [ ] With Chrome DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion: reduce", counters display final values instantly (no animation).

### CTA Section (US2, US3)
- [ ] Urgency signal text is visible.
- [ ] Both app store badges are present.
- [ ] If `active: false`, badges show reduced opacity and do not navigate on click.

### Footer (US4)
- [ ] Aura Bet logo, nav links, and responsible gambling notice are all visible.
- [ ] Responsible gambling text has sufficient contrast (visually verify against dark background).
- [ ] All footer links are keyboard-accessible via Tab key.

### Accessibility
- [ ] Tab through the entire page — every interactive element receives a visible focus ring.
- [ ] Run Chrome DevTools Lighthouse → Accessibility audit — score ≥ 90.

### Design Token Compliance
- [ ] Open browser DevTools → Inspector → inspect any button or card.
- [ ] Verify no `color: #f59e0b` or similar inline/hardcoded styles appear in computed styles.
- [ ] All color values should reference CSS custom properties (e.g., `var(--color-aura-accent)`).

---

## 6. Common Issues

**Ticker not animating?**
Check that `src/styles.css` contains the `@keyframes ticker-scroll` definition and the
`ticker-scroll` animation is applied to the ticker container.

**Fonts not loading?**
Verify `index.html` contains `<link rel="preconnect">` for Google Fonts and that the
font import is inside `@layer base` in `src/styles.css`.

**TypeScript strict errors?**
Ensure all `@Input()` properties are either non-optional or have explicit initializers.
Angular 21 with `strictPropertyInitialization` will flag missing defaults.

**Reduced-motion animations still playing?**
The global `@media (prefers-reduced-motion: reduce)` rule in `src/styles.css` must be
inside `@layer base`, not at the root level, to ensure correct cascade order in Tailwind v4.
