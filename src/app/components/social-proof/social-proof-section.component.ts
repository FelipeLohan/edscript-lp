import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuraStatCardComponent } from '../../shared/stat-card/aura-stat-card.component';
import { StatCounter } from '../../shared/types';

const STAT_COUNTERS: readonly StatCounter[] = [
  {
    id: 'win-rate',
    label: 'Taxa de Acerto',
    targetValue: 94,
    suffix: '%',
    animationDuration: 1800,
  },
  {
    id: 'predictions',
    label: 'Previsões Feitas',
    targetValue: 2400000,
    suffix: '+',
    animationDuration: 2200,
  },
  {
    id: 'users',
    label: 'Usuários Ativos',
    targetValue: 180000,
    suffix: '+',
    animationDuration: 2000,
  },
];

@Component({
  selector: 'app-social-proof-section',
  imports: [AuraStatCardComponent],
  templateUrl: './social-proof-section.component.html',
  styleUrl: './social-proof-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialProofSectionComponent {
  readonly counters = STAT_COUNTERS;

  trackByStat(_index: number, stat: StatCounter): string {
    return stat.id;
  }
}
