/**
 * Aura Bet — Shared TypeScript Interfaces
 * All data shapes used across shared components and page sections.
 * See: specs/001-aura-bet-landing-page/data-model.md
 */

export type SportType = 'football' | 'basketball' | 'tennis' | 'cricket';
export type MatchStatus = 'live' | 'upcoming' | 'finished';
export type Outcome = 'home' | 'draw' | 'away';

export interface TeamInfo {
  name: string;
  shortCode: string; // 3-letter code e.g. 'MCI'
  logoUrl: string;   // SVG path or '' for placeholder
}

export interface MatchData {
  id: string;
  homeTeam: TeamInfo;
  awayTeam: TeamInfo;
  sport: SportType;
  league: string;
  startTime: string;     // ISO 8601
  status: MatchStatus;
  minutePlayed?: number; // only when status === 'live'
}

export interface OddsData {
  home: number;   // decimal e.g. 1.85
  draw?: number;
  away: number;
}

export interface MatchStat {
  id: string;
  label: string;
  homeValue: string | number;
  awayValue: string | number;
  unit?: string;
}

export interface PredictionCard {
  match: MatchData;
  confidenceScore: number; // 0–100
  predictedOutcome: Outcome;
  odds: OddsData;
  stats: MatchStat[];      // exactly 3 for demo card
  aiTag: string;
}

export interface ProcessStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  accentColor: 'amber' | 'electric';
  metric?: string;
}

export interface StatCounter {
  id: string;
  label: string;
  targetValue: number;
  suffix: string;
  prefix?: string;
  animationDuration: number; // ms
}

export interface AppStoreLink {
  id: string;
  platform: 'ios' | 'android';
  href: string;
  active: boolean;
  ariaLabel: string;
  badgeAssetUrl: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}
