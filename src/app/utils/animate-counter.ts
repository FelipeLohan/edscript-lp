/**
 * animateCounter — Pure function, no Angular dependencies.
 * Animates a DOM element's text content from 0 to `target` over `duration` ms.
 * Uses requestAnimationFrame for smooth, paint-cycle-aligned updates.
 * Returns a cancel handle: call it to stop the animation early.
 */
export function animateCounter(
  el: HTMLElement,
  target: number,
  duration: number,
): () => void {
  let rafId: number;
  const start = performance.now();

  function tick(now: number): void {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const current = Math.round(progress * target);

    el.textContent = formatLargeNumber(current);

    if (progress < 1) {
      rafId = requestAnimationFrame(tick);
    }
  }

  rafId = requestAnimationFrame(tick);

  return () => cancelAnimationFrame(rafId);
}

/** Locale-aware thousands separator (e.g. 2400000 → "2,400,000") */
function formatLargeNumber(value: number): string {
  return value.toLocaleString('en-US');
}
