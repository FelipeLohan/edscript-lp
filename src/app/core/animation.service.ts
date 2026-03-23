import { ElementRef, Injectable } from '@angular/core';

/**
 * AnimationService — Wraps IntersectionObserver for scroll-triggered animations.
 * Checks prefers-reduced-motion once at init; components use this service rather
 * than checking the media query themselves.
 */
@Injectable({ providedIn: 'root' })
export class AnimationService {
  readonly prefersReducedMotion: boolean =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  private readonly observers = new WeakMap<Element, IntersectionObserver>();

  /**
   * Observe an element and call `onEnter` once when it crosses the viewport
   * threshold. If prefersReducedMotion is true, calls `onEnter` immediately.
   */
  observe(
    elRef: ElementRef<Element>,
    onEnter: () => void,
    threshold = 0.2,
  ): void {
    if (this.prefersReducedMotion) {
      onEnter();
      return;
    }

    const el = elRef.nativeElement;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          onEnter();
          observer.unobserve(el);
          this.observers.delete(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    this.observers.set(el, observer);
  }

  /** Stop observing an element and clean up the observer. */
  unobserve(elRef: ElementRef<Element>): void {
    const el = elRef.nativeElement;
    const observer = this.observers.get(el);
    if (observer) {
      observer.unobserve(el);
      this.observers.delete(el);
    }
  }
}
