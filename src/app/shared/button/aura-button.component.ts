import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'aura-button',
  imports: [NgTemplateOutlet],
  templateUrl: './aura-button.component.html',
  styleUrl: './aura-button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuraButtonComponent {
  variant = input<'primary' | 'secondary' | 'ghost'>('primary');
  size    = input<'sm' | 'md' | 'lg'>('md');
  disabled = input(false);
  ariaLabel = input<string | undefined>(undefined);
  type = input<'button' | 'submit'>('button');
  href = input<string | undefined>(undefined);
  target = input<string | undefined>(undefined);

  clicked = output<MouseEvent>();

  onClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }

  get buttonClasses(): string {
    const variant = this.variant();
    const size = this.size();
    const variantClass = `btn-${variant}`;
    const sizeClass = `btn-${size}`;
    return `${variantClass} ${sizeClass}`;
  }
}
