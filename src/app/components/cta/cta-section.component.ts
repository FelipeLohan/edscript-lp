import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuraButtonComponent } from '../../shared/button/aura-button.component';
import { AppStoreLink } from '../../shared/types';

const APP_STORE_LINKS: readonly AppStoreLink[] = [
  {
    id: 'ios',
    platform: 'ios',
    href: '#',
    active: false,
    ariaLabel: 'Baixar o Aura Bet na App Store',
    badgeAssetUrl: 'assets/badges/app-store.svg',
  },
  {
    id: 'android',
    platform: 'android',
    href: '#',
    active: false,
    ariaLabel: 'Baixar o Aura Bet no Google Play',
    badgeAssetUrl: 'assets/badges/google-play.svg',
  },
];

@Component({
  selector: 'app-cta-section',
  imports: [AuraButtonComponent],
  templateUrl: './cta-section.component.html',
  styleUrl: './cta-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaSectionComponent {
  readonly appStoreLinks = APP_STORE_LINKS;

  trackByLink(_index: number, link: AppStoreLink): string {
    return link.id;
  }
}
