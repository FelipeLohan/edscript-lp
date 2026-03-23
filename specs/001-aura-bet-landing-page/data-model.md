# Data Model: Aura Bet Landing Page

**Branch**: `001-aura-bet-landing-page` | **Date**: 2026-03-23

All entities below are TypeScript interfaces representing static/mock data shapes.
No persistence layer exists — data is hardcoded in component files.

---

## MatchData

Used in: `HeroSectionComponent` (ticker), `LiveMatchCardComponent`

```typescript
interface MatchData {
  id: string;               // Unique identifier for trackBy
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  sport: SportType;         // 'football' | 'basketball' | 'tennis' | 'cricket'
  league: string;           // e.g., 'Premier League', 'NBA'
  startTime: string;        // ISO 8601 string, displayed via formatDate util
  status: MatchStatus;      // 'live' | 'upcoming' | 'finished'
  minutePlayed?: number;    // Present when status === 'live'
}

interface TeamInfo {
  name: string;
  shortCode: string;        // 3-letter code, e.g., 'MCI', 'ARS'
  logoUrl: string;          // Path to SVG asset; use '' for placeholder
}

type SportType = 'football' | 'basketball' | 'tennis' | 'cricket';
type MatchStatus = 'live' | 'upcoming' | 'finished';
```

**Validation rules**:
- `id` MUST be unique within the ticker data set (used as `trackBy` key).
- `logoUrl` MUST be an SVG path or empty string (never null/undefined).
- `minutePlayed` is only meaningful when `status === 'live'`.

---

## PredictionCard

Used in: `LiveMatchCardComponent`, `PredictionsDemoSectionComponent`

```typescript
interface PredictionCard {
  match: MatchData;
  confidenceScore: number;      // 0–100 integer; displayed as percentage
  predictedOutcome: Outcome;    // 'home' | 'draw' | 'away'
  odds: OddsData;
  stats: MatchStat[];           // Exactly 3 stats displayed in the demo card
  aiTag: string;                // Badge label, e.g., 'AI Pick', 'High Confidence'
}

interface OddsData {
  home: number;                 // Decimal odds, e.g., 1.85
  draw?: number;                // Optional — not applicable to all sports
  away: number;                 // Decimal odds, e.g., 4.20
}

interface MatchStat {
  id: string;                   // Unique key for trackBy
  label: string;                // e.g., 'Shots on Target', 'Possession', 'Form'
  homeValue: string | number;
  awayValue: string | number;
  unit?: string;                // e.g., '%' for possession; omit for counts
}

type Outcome = 'home' | 'draw' | 'away';
```

**Validation rules**:
- `confidenceScore` MUST be an integer between 0 and 100 inclusive.
- `stats` array MUST contain exactly 3 items for the demo card layout.
- Decimal odds MUST be positive numbers ≥ 1.0.

---

## ProcessStep

Used in: `HowItWorksSectionComponent`

```typescript
interface ProcessStep {
  id: string;           // Unique key for trackBy
  stepNumber: number;   // 1, 2, 3
  title: string;        // e.g., 'Real-Time Data Ingestion'
  description: string;  // 1–2 sentence supporting copy
  iconName: string;     // SVG icon identifier (maps to asset in public/icons/)
}
```

---

## FeatureItem

Used in: `FeaturesSectionComponent`

```typescript
interface FeatureItem {
  id: string;           // Unique key for trackBy
  title: string;        // e.g., 'Real-Time Data Feeds'
  description: string;  // 2–3 sentence description; no generic filler text
  accentColor: 'amber' | 'electric'; // Controls which glow token is applied
  metric?: string;      // Optional highlighted metric, e.g., '94.2% accuracy'
}
```

**Validation rules**:
- `description` MUST be substantive; lorem ipsum is PROHIBITED.
- `accentColor` maps to `glow-amber` or `glow-blue` shadow token.

---

## StatCounter

Used in: `AuraStatCardComponent`, `SocialProofSectionComponent`

```typescript
interface StatCounter {
  id: string;           // Unique key for trackBy
  label: string;        // e.g., 'Win Rate', 'Predictions Made', 'Active Users'
  targetValue: number;  // Final animated value, e.g., 847200
  suffix: string;       // e.g., '%', '+', 'K' — appended after formatted value
  prefix?: string;      // e.g., '$' — prepended before value if needed
  animationDuration: number; // ms; recommended 1500–2500
}
```

**Validation rules**:
- `targetValue` MUST be a non-negative integer.
- `animationDuration` MUST be between 500ms and 4000ms.

---

## AppStoreLink

Used in: `CtaSectionComponent`

```typescript
interface AppStoreLink {
  id: string;           // 'ios' | 'android'
  platform: 'ios' | 'android';
  href: string;         // Store URL or '#' if not yet live
  active: boolean;      // false = render in disabled state
  ariaLabel: string;    // e.g., 'Download on the App Store'
  badgeAssetUrl: string;// Path to platform badge SVG
}
```

**Validation rules**:
- When `active === false`, the rendered element MUST have `aria-disabled="true"` and
  `pointer-events: none`.
- `ariaLabel` MUST be set (non-empty) regardless of `active` state.

---

## NavLink

Used in: `FooterComponent`, `AppComponent` (nav header)

```typescript
interface NavLink {
  id: string;           // Unique key for trackBy
  label: string;        // Visible link text
  href: string;         // Anchor or route, e.g., '#features', '#cta'
  external?: boolean;   // If true, adds rel="noopener noreferrer" and target="_blank"
}
```

---

## Entity Relationships

```text
PredictionCard
  └── match: MatchData
        ├── homeTeam: TeamInfo
        └── awayTeam: TeamInfo
  ├── odds: OddsData
  └── stats: MatchStat[]

SocialProofSectionComponent
  └── counters: StatCounter[]       (3 counters: win rate, predictions, users)

CtaSectionComponent
  └── appStoreLinks: AppStoreLink[] (2 links: iOS, Android)

HowItWorksSectionComponent
  └── steps: ProcessStep[]          (exactly 3 steps)

FeaturesSectionComponent
  └── features: FeatureItem[]       (4 items)
```

---

## State Notes

- All entity data is statically defined as `readonly` arrays/objects in each section
  component's TypeScript file.
- No `@ngrx/store`, `BehaviorSubject`, or shared state management is required.
- The only runtime state is: animation trigger flags (boolean signals toggled by
  IntersectionObserver) and the ticker animation play state (CSS-driven).
