import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import { AnimationService } from '../../core/animation.service';
import { animateCounter } from '../../utils/animate-counter';
import { StatCounter } from '../types';

@Component({
  selector: 'aura-stat-card',
  templateUrl: './aura-stat-card.component.html',
  styleUrl: './aura-stat-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuraStatCardComponent implements AfterViewInit, OnDestroy {
  counter = input.required<StatCounter>();
  animate = input(true);

  animationComplete = output<void>();

  private readonly animationService = inject(AnimationService);
  private readonly elRef = inject(ElementRef<HTMLElement>);

  valueEl = viewChild<ElementRef<HTMLElement>>('valueEl');

  private cancelCounter?: () => void;

  ngAfterViewInit(): void {
    this.animationService.observe(this.elRef, () => this.triggerCount());
  }

  ngOnDestroy(): void {
    this.cancelCounter?.();
    this.animationService.unobserve(this.elRef);
  }

  private triggerCount(): void {
    const el = this.valueEl()?.nativeElement;
    if (!el) return;

    if (!this.animate() || this.animationService.prefersReducedMotion) {
      el.textContent = this.counter().targetValue.toLocaleString('en-US');
      this.animationComplete.emit();
      return;
    }

    const c = this.counter();
    this.cancelCounter = animateCounter(el, c.targetValue, c.animationDuration);
    setTimeout(() => this.animationComplete.emit(), c.animationDuration);
  }
}
