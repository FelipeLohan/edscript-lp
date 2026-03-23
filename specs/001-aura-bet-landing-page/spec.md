# Feature Specification: Aura Bet Landing Page

**Feature Branch**: `001-aura-bet-landing-page`
**Created**: 2026-03-23
**Status**: Draft
**Input**: Convert visitors into app sign-ups by showcasing real-time AI prediction technology for sports betting

## User Scenarios & Testing *(mandatory)*

### User Story 1 — First Impression to Sign-Up (Priority: P1)

A visitor arrives on the landing page for the first time, likely via an ad or social link. They are
greeted by a bold, data-rich hero section that immediately communicates the core value: AI-powered
sports predictions in real time. The animated live match ticker and a prominent CTA ("Download" or
"Sign Up") are above the fold. The visitor is intrigued enough to click the CTA without scrolling.

**Why this priority**: This is the primary conversion path. The majority of sign-ups will come from
visitors who are captured at the hero level — slow or unclear first impressions kill conversion.

**Independent Test**: Deploy only the hero section with a working CTA link. Measure whether visitors
click the CTA without requiring any further scrolling.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the page, **When** the page finishes loading, **Then** the hero
   headline, live data ticker, and primary CTA button are all visible without scrolling on desktop
   and mobile viewports.
2. **Given** the hero is visible, **When** the visitor clicks the primary CTA, **Then** they are
   taken to the sign-up or app download destination.
3. **Given** the live data ticker is displayed, **When** the page is loaded, **Then** the ticker
   animates automatically with mock match data without requiring user interaction.

---

### User Story 2 — Skeptical Visitor Evaluates and Converts (Priority: P2)

A visitor has seen betting apps before and needs more evidence. They scroll past the hero to read
"How It Works", watch the live predictions demo, review the key features, and check the social proof
stats. The animated confidence meter and accuracy stats overcome their skepticism. They reach the
final CTA section and convert.

**Why this priority**: The majority of non-immediate conversions require a trust-building journey.
Every section from How It Works to Social Proof exists to serve this visitor type.

**Independent Test**: The section sequence (How It Works → Live Demo → Features → Social Proof →
CTA) can be viewed in isolation as a scrollable page and evaluated for persuasiveness without
the hero section.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to "How It Works", **When** the section is in view, **Then** a
   clearly readable 3-step flow (data ingestion → algorithm processing → prediction delivery) is
   displayed with distinct visual treatment for each step.
2. **Given** a visitor views the Live Predictions Demo, **When** the demo card is in the viewport,
   **Then** the confidence meter animates, the odds are displayed in a readable format, and at least
   three key match stats (shots, possession, form) are visible.
3. **Given** a visitor views the Social Proof section, **When** stats counters enter the viewport,
   **Then** the numbers animate from zero to their final values (win rate %, total predictions,
   active users), communicating scale and credibility.
4. **Given** a visitor reaches the final CTA section, **When** viewing the section, **Then** an
   urgency signal is visible alongside app store download badges and a clear CTA button.

---

### User Story 3 — Mobile User on Return Visit (Priority: P3)

A returning visitor opens the page on a mobile device, already familiar with the concept. They
scroll quickly to the CTA section to download the app. The page is fully responsive, the app store
badges are tappable, and the experience is fast on a standard mobile connection.

**Why this priority**: Mobile accounts for the majority of sports-betting traffic. Return visitors
converting on mobile represent a significant segment of total sign-ups.

**Independent Test**: Open the page on a 375px-wide viewport. Verify all sections render correctly,
the CTA section is reachable, and the app store badges link correctly.

**Acceptance Scenarios**:

1. **Given** a visitor on a mobile device, **When** they load the page, **Then** all 7 sections
   are readable and fully functional with no horizontal scrolling required.
2. **Given** a visitor taps an app store badge, **When** on a supported mobile device, **Then**
   they are directed to the appropriate store listing (App Store for iOS, Play Store for Android).

---

### User Story 4 — Responsible Gambling Compliance Check (Priority: P4)

A visitor — or a compliance reviewer — scrolls to the footer to verify the responsible gambling
notice and access policy/legal links.

**Why this priority**: Responsible gambling notices are a legal requirement in most regulated
markets. Absence or poor visibility is a compliance failure, not just a UX gap.

**Independent Test**: The footer section can be rendered and audited independently against
responsible gambling display standards.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls to the footer, **When** they view it, **Then** the responsible
   gambling notice is visible and legible with sufficient contrast against the background.
2. **Given** a visitor views the footer, **When** reviewing navigation links, **Then** the logo,
   navigation links, and responsible gambling notice are all accessible via keyboard tab order.

---

### Edge Cases

- What happens if the visitor has a `prefers-reduced-motion` OS setting enabled? All animations
  (ticker, confidence meter, number roll) must respect this preference and show a static fallback.
- What if the app store links are not yet live? CTA badges must display in a non-broken disabled
  state rather than 404ing.
- How does the live predictions demo appear on a narrow screen where the stats panel would overflow?
  Stats must reflow into a stacked layout on mobile.
- What if the responsible gambling notice text wraps to many lines on a very small screen? It must
  remain fully readable without truncation.

## Requirements *(mandatory)*

### Functional Requirements

**Hero Section**
- **FR-001**: Page MUST display a hero section with a primary headline communicating AI-powered
  sports predictions.
- **FR-002**: Hero MUST include an animated live match data ticker that cycles through mock match
  data automatically on page load.
- **FR-003**: Hero MUST include a primary CTA button (labelled "Download" or "Sign Up") that is
  visible without scrolling on all viewport sizes ≥ 320px wide.

**How It Works**
- **FR-004**: Page MUST display a "How It Works" section presenting a 3-step sequential flow:
  (1) Real-time data ingestion, (2) Algorithm processing, (3) Prediction delivery.
- **FR-005**: Each step in the flow MUST be visually distinct and sequentially numbered or
  connected to communicate ordering.

**Live Predictions Demo**
- **FR-006**: Page MUST display a mock live match card containing: team names, a confidence
  percentage meter that animates on viewport entry, odds displayed in a readable numeric format,
  and at least three key stats (shots on target, possession percentage, recent form).
- **FR-007**: The confidence meter animation MUST respect the visitor's `prefers-reduced-motion`
  media query — displaying a static value when motion is reduced.

**Key Features**
- **FR-008**: Page MUST display a Key Features section with cards for: Real-time data feeds,
  Prediction accuracy rate, Multi-sport coverage, and Risk analysis dashboard.
- **FR-009**: Each feature card MUST include a title and a supporting description. No decorative
  card grids that merely restate the title.

**Social Proof**
- **FR-010**: Page MUST display a Social Proof section with animated counters for: win rate
  percentage, total number of predictions made, and number of active users.
- **FR-011**: Number counters MUST animate from zero to their final value when scrolled into
  the viewport, and respect `prefers-reduced-motion` by displaying the final value statically.

**CTA Section**
- **FR-012**: Page MUST include a final CTA section containing: a conversion headline, an urgency
  signal (e.g., limited offer, user count milestone, or time-bound incentive), and app store
  download badges for iOS and Android.
- **FR-013**: App store badges MUST link to their respective store listings; if a link is not yet
  active, the badge MUST render in a visually distinct disabled state rather than generating a
  broken link.

**Footer**
- **FR-014**: Page MUST include a footer containing: the Aura Bet logo, navigation links, and a
  responsible gambling notice.
- **FR-015**: The responsible gambling notice MUST be legible on all viewport sizes with contrast
  meeting WCAG 2.1 AA standards (4.5:1 minimum for normal text).

**Cross-Cutting**
- **FR-016**: All interactive elements (buttons, badges, links) MUST carry accessible labels
  readable by screen readers and be fully keyboard-navigable.
- **FR-017**: Page MUST be responsive across viewport widths from 320px to 1920px with no
  horizontal overflow.
- **FR-018**: All images MUST have appropriate `alt` text (descriptive for informational images,
  empty for decorative images).

### Key Entities

- **Landing Page**: The single-page experience comprising 7 ordered sections (Hero, How It Works,
  Live Predictions Demo, Key Features, Social Proof, CTA, Footer).
- **Live Match Card**: A mock data display unit showing two competing teams, a confidence
  percentage with animated meter, formatted odds, and a set of key match statistics.
- **Animated Stat Counter**: A numeric display that transitions from zero to a target value
  when entering the viewport, used in the Social Proof section.
- **App Store Badge**: A linked image component directing visitors to iOS App Store or Google
  Play Store; supports an inactive/disabled state.
- **Responsible Gambling Notice**: A mandatory compliance element displayed in the footer,
  communicating safe betting resources and legal disclaimers.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: The hero CTA button is reachable and clickable within 3 seconds of the page
  finishing load on a standard broadband connection.
- **SC-002**: All animated elements (ticker, confidence meter, number counters) start playing
  automatically — no user gesture required beyond page load or scroll-into-view.
- **SC-003**: Page passes a WCAG 2.1 AA automated accessibility audit with zero critical
  violations (contrast, missing labels, keyboard navigation).
- **SC-004**: First meaningful paint occurs in under 2.5 seconds on a 4G mobile connection.
- **SC-005**: All 7 page sections render without overflow, truncation, or layout breakage on
  viewport widths of 320px, 768px, 1280px, and 1920px.
- **SC-006**: A code audit confirms zero hardcoded color or spacing values in page templates —
  all visual tokens reference the design system.
- **SC-007**: The responsible gambling notice is visible in the rendered footer with a measured
  contrast ratio of ≥ 4.5:1 against its background.
- **SC-008**: The full page (all 7 sections) can be navigated end-to-end using keyboard alone,
  with a visible focus indicator at every interactive element.

## Assumptions

- Mock data for the live match card and ticker is static/hardcoded for the landing page — no
  live API integration is required for the MVP landing page.
- "Urgency element" in the CTA section is a copywriting/design decision; the spec assumes a
  text-based signal (e.g., user count, offer expiry) rather than a countdown timer with real
  backend logic.
- App store links may be placeholder `#` anchors for initial launch, rendered in disabled state,
  until the app listings go live.
- The landing page is a single scrollable page — no routing or multi-page navigation is required.
- Both iOS and Android app store badges are required; no web-app-only CTA path.
