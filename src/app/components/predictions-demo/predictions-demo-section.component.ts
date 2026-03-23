import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuraBadgeComponent } from '../../shared/badge/aura-badge.component';
import { LiveMatchCardComponent } from '../../shared/live-match-card/live-match-card.component';
import { PredictionCard } from '../../shared/types';

const MOCK_PREDICTION: PredictionCard = {
  match: {
    id: 'demo-match-001',
    homeTeam: { name: 'Manchester City', shortCode: 'MCI', logoUrl: '' },
    awayTeam: { name: 'Arsenal',          shortCode: 'ARS', logoUrl: '' },
    sport: 'football',
    league: 'Premier League',
    startTime: new Date().toISOString(),
    status: 'live',
    minutePlayed: 67,
  },
  confidenceScore: 73,
  predictedOutcome: 'home',
  odds: { home: 1.65, draw: 3.80, away: 5.50 },
  stats: [
    { id: 'stat-shots',  label: 'Chutes a Gol',  homeValue: 7,           awayValue: 3 },
    { id: 'stat-poss',   label: 'Posse de Bola', homeValue: '61%',       awayValue: '39%' },
    { id: 'stat-form',   label: 'Forma Recente', homeValue: 'V V V E V', awayValue: 'V E V D V' },
  ],
  aiTag: 'Alta Confiança',
};

@Component({
  selector: 'app-predictions-demo-section',
  imports: [AuraBadgeComponent, LiveMatchCardComponent],
  templateUrl: './predictions-demo-section.component.html',
  styleUrl: './predictions-demo-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PredictionsDemoSectionComponent {
  readonly mockPrediction = MOCK_PREDICTION;

  readonly features = [
    'Pontuação de confiança atualizada a cada 30 segundos',
    'Odds decimais em tempo real de mais de 20 casas de apostas',
    'Forma, posse e chutes exibidos lado a lado',
  ];
}
