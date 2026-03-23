import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { AnimationService } from '../../core/animation.service';

@Component({
  selector: 'aura-badge',
  templateUrl: './aura-badge.component.html',
  styleUrl: './aura-badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuraBadgeComponent {
  variant = input<'live' | 'new' | 'hot' | 'ai'>('live');
  label   = input('');
  pulse   = input(false);

  private readonly animationService = inject(AnimationService);

  get shouldPulse(): boolean {
    return this.pulse() && !this.animationService.prefersReducedMotion;
  }

  get badgeClasses(): string {
    const v = this.variant();
    const base = 'badge-live';
    const pulse = this.shouldPulse ? 'animate-pulse-glow' : '';

    switch (v) {
      case 'live':
        return `${base} bg-aura-accent text-aura-dark ${pulse}`.trim();
      case 'new':
        return `${base} bg-aura-electric text-white`;
      case 'hot':
        return `${base} bg-aura-accent text-aura-dark`;
      case 'ai':
        return `${base} border border-aura-electric text-aura-electric`;
      default:
        return base;
    }
  }
}
