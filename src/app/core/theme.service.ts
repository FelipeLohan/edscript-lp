import { Injectable } from '@angular/core';

/**
 * ThemeService — App-wide theme management.
 * Currently dark-only; stubbed for future light/dark toggle expansion.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = 'dark' as const;

  getTheme(): string {
    return this.theme;
  }
}
