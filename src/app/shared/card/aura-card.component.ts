import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'aura-card',
  templateUrl: './aura-card.component.html',
  styleUrl: './aura-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuraCardComponent {
  glow    = input<'none' | 'amber' | 'blue'>('none');
  padding = input<'sm' | 'md' | 'lg'>('md');

  get cardClasses(): string {
    const paddingMap = { sm: 'p-4', md: 'p-6', lg: 'p-8' };
    const glowClass =
      this.glow() === 'amber' ? 'shadow-glow-amber' :
      this.glow() === 'blue'  ? 'shadow-glow-blue'  : '';

    return `card-glow ${paddingMap[this.padding()]} ${glowClass}`.trim();
  }
}
