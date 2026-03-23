import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { AuraBadgeComponent } from '../badge/aura-badge.component';
import { AnimationService } from '../../core/animation.service';
import { formatOdds } from '../../utils/format-odds';
import { MatchStat, PredictionCard } from '../types';

@Component({
  selector: 'aura-live-match-card',
  imports: [AuraBadgeComponent],
  templateUrl: './live-match-card.component.html',
  styleUrl: './live-match-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveMatchCardComponent implements AfterViewInit, OnDestroy {
  prediction    = input.required<PredictionCard>();
  animateOnEnter = input(true);

  private readonly animationService = inject(AnimationService);
  private readonly elRef = inject(ElementRef<HTMLElement>);
  private readonly cardRef = viewChild<ElementRef<HTMLElement>>('cardEl');

  /** Signal toggled by IntersectionObserver to trigger confidence bar CSS animation */
  readonly confidenceVisible = signal(false);

  ngAfterViewInit(): void {
    if (this.animateOnEnter()) {
      this.animationService.observe(this.elRef, () => {
        this.confidenceVisible.set(true);
      });
    } else {
      this.confidenceVisible.set(true);
    }
  }

  ngOnDestroy(): void {
    this.animationService.unobserve(this.elRef);
  }

  formatOddsValue(value: number): string {
    return formatOdds(value);
  }

  isHighlightedOutcome(cell: 'home' | 'draw' | 'away'): boolean {
    return this.prediction().predictedOutcome === cell;
  }

  trackByStat(_index: number, stat: MatchStat): string {
    return stat.id;
  }
}
