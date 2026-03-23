import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SocialLink {
  id: string;
  label: string;
  href: string;
}


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
  readonly socialLinks = SOCIAL_LINKS;
  readonly year = new Date().getFullYear();

  trackByLink(_index: number, link: SocialLink): string {
    return link.id;
  }
}
