import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  viewChildren,
} from '@angular/core';
import { AuraCardComponent } from '../../shared/card/aura-card.component';
import { AnimationService } from '../../core/animation.service';
import { FeatureItem } from '../../shared/types';

const FEATURE_ITEMS: readonly FeatureItem[] = [
  {
    id: 'feat-1',
    title: 'Dados em Tempo Real',
    description:
      'A Aura ingere dados ao vivo de mais de 40 provedores verificados com latência abaixo de 50ms. ' +
      'Cada estatística, cada lesão, cada mudança de escalação chega ao nosso modelo antes das odds mudarem.',
    accentColor: 'amber',
    metric: '<50ms de latência',
  },
  {
    id: 'feat-2',
    title: 'Precisão das Previsões',
    description:
      'Nosso modelo foi testado retroativamente em 4 milhões de partidas históricas ao longo de 12 anos. ' +
      'A precisão ao vivo é auditada mensalmente por um terceiro independente.',
    accentColor: 'amber',
    metric: '94,2% de precisão',
  },
  {
    id: 'feat-3',
    title: 'Cobertura Multiesportiva',
    description:
      'Futebol, basquete, tênis, críquete e mais 8 modalidades — tudo em um único feed. ' +
      'Cada esporte tem um modelo dedicado treinado com variáveis específicas.',
    accentColor: 'electric',
    metric: '12 esportes',
  },
  {
    id: 'feat-4',
    title: 'Painel de Análise de Risco',
    description:
      'Defina o valor da aposta, o retorno alvo e a tolerância ao risco. ' +
      'A Aura calcula o dimensionamento pelo critério de Kelly e sinaliza riscos de correlação nas suas posições abertas.',
    accentColor: 'electric',
  },
];

@Component({
  selector: 'app-features-section',
  imports: [AuraCardComponent],
  templateUrl: './features-section.component.html',
  styleUrl: './features-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeaturesSectionComponent implements AfterViewInit, OnDestroy {
  readonly features = FEATURE_ITEMS;

  private readonly animationService = inject(AnimationService);
  readonly cardEls = viewChildren<ElementRef<HTMLElement>>('cardEl');

  ngAfterViewInit(): void {
    this.cardEls().forEach((elRef, i) => {
      this.animationService.observe(elRef, () => {
        const el = elRef.nativeElement;
        el.style.animationDelay = `${i * 0.1}s`;
        el.classList.add('is-visible');
        el.classList.remove('opacity-0');
      }, 0.1);
    });
  }

  ngOnDestroy(): void {
    this.cardEls().forEach((elRef) => this.animationService.unobserve(elRef));
  }

  trackByFeature(_index: number, item: FeatureItem): string {
    return item.id;
  }
}
