import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavLink } from '../../shared/types';

interface SocialLink {
  id: string;
  label: string;
  href: string;
}

const NAV_LINKS: readonly NavLink[] = [
  { id: 'nav-home',         label: 'Início',               href: '#top' },
  { id: 'nav-features',     label: 'Funcionalidades',      href: '#features' },
  { id: 'nav-how-it-works', label: 'Como Funciona',        href: '#how-it-works' },
  { id: 'nav-predictions',  label: 'Previsões',            href: '#predictions' },
  { id: 'nav-privacy',      label: 'Política de Privacidade', href: '/privacy' },
];

const SOCIAL_LINKS: readonly SocialLink[] = [
  { id: 'twitter',  label: 'Twitter / X',  href: '#' },
  { id: 'instagram', label: 'Instagram',   href: '#' },
  { id: 'discord',  label: 'Discord',      href: '#' },
];

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly navLinks = NAV_LINKS;
  readonly socialLinks = SOCIAL_LINKS;
  readonly year = new Date().getFullYear();

  trackByLink(_index: number, link: NavLink | SocialLink): string {
    return link.id;
  }
}
