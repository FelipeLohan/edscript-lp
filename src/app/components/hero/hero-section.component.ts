import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuraButtonComponent } from '../../shared/button/aura-button.component';
import { MatchData } from '../../shared/types';

const MOCK_TICKER_DATA: readonly MatchData[] = [
  {
    id: 'match-001',
    homeTeam: { name: 'Manchester City', shortCode: 'MCI', logoUrl: '' },
    awayTeam: { name: 'Arsenal',          shortCode: 'ARS', logoUrl: '' },
    sport: 'football', league: 'Premier League',
    startTime: new Date().toISOString(), status: 'live', minutePlayed: 67,
  },
  {
    id: 'match-002',
    homeTeam: { name: 'LA Lakers',  shortCode: 'LAL', logoUrl: '' },
    awayTeam: { name: 'Golden State Warriors', shortCode: 'GSW', logoUrl: '' },
    sport: 'basketball', league: 'NBA',
    startTime: new Date().toISOString(), status: 'live', minutePlayed: undefined,
  },
  {
    id: 'match-003',
    homeTeam: { name: 'Real Madrid', shortCode: 'RMA', logoUrl: '' },
    awayTeam: { name: 'Barcelona',   shortCode: 'BAR', logoUrl: '' },
    sport: 'football', league: 'La Liga',
    startTime: new Date().toISOString(), status: 'upcoming',
  },
  {
    id: 'match-004',
    homeTeam: { name: 'Novak Djokovic', shortCode: 'DJO', logoUrl: '' },
    awayTeam: { name: 'Carlos Alcaraz', shortCode: 'ALC', logoUrl: '' },
    sport: 'tennis', league: 'Wimbledon',
    startTime: new Date().toISOString(), status: 'live', minutePlayed: undefined,
  },
  {
    id: 'match-005',
    homeTeam: { name: 'Bayern Munich', shortCode: 'BAY', logoUrl: '' },
    awayTeam: { name: 'Dortmund',      shortCode: 'BVB', logoUrl: '' },
    sport: 'football', league: 'Bundesliga',
    startTime: new Date().toISOString(), status: 'upcoming',
  },
  {
    id: 'match-006',
    homeTeam: { name: 'PSG',     shortCode: 'PSG', logoUrl: '' },
    awayTeam: { name: 'Lyon',    shortCode: 'LYO', logoUrl: '' },
    sport: 'football', league: 'Ligue 1',
    startTime: new Date().toISOString(), status: 'live', minutePlayed: 34,
  },
  {
    id: 'match-007',
    homeTeam: { name: 'Boston Celtics', shortCode: 'BOS', logoUrl: '' },
    awayTeam: { name: 'Miami Heat',     shortCode: 'MIA', logoUrl: '' },
    sport: 'basketball', league: 'NBA',
    startTime: new Date().toISOString(), status: 'upcoming',
  },
  {
    id: 'match-008',
    homeTeam: { name: 'Inter Milan', shortCode: 'INT', logoUrl: '' },
    awayTeam: { name: 'Juventus',    shortCode: 'JUV', logoUrl: '' },
    sport: 'football', league: 'Serie A',
    startTime: new Date().toISOString(), status: 'live', minutePlayed: 78,
  },
];

@Component({
  selector: 'app-hero-section',
  imports: [AuraButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  /** Doubled for seamless CSS ticker loop */
  readonly ticker: readonly MatchData[] = [
    ...MOCK_TICKER_DATA,
    ...MOCK_TICKER_DATA,
  ];

  trackByMatch(_index: number, match: MatchData): string {
    return match.id;
  }
}
