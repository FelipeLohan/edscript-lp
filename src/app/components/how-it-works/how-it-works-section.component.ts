import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  inject,
  viewChildren,
} from '@angular/core';
import { AnimationService } from '../../core/animation.service';
import { ProcessStep } from '../../shared/types';

const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Coleta de Dados em Tempo Real',
    description:
      'A Aura ingere feeds ao vivo de mais de 40 provedores — estatísticas de jogadores, ' +
      'condições climáticas, boletins de lesões e histórico de confrontos — processados em menos de 50ms por evento.',
    iconName: 'database',
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Processamento pelo Algoritmo',
    description:
      'Uma rede neural multicamada pondera mais de 2.000 variáveis simultaneamente, ' +
      'recalibrando continuamente conforme as condições da partida evoluem em tempo real.',
    iconName: 'cpu',
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Entrega da Previsão',
    description:
      'As previsões chegam ao seu feed com pontuação de confiança, tipo de aposta recomendado ' +
      'e valor sugerido com base no seu perfil de risco — antes do mercado se mover.',
    iconName: 'target',
  },
];

@Component({
  selector: 'app-how-it-works-section',
  templateUrl: './how-it-works-section.component.html',
  styleUrl: './how-it-works-section.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HowItWorksSectionComponent implements AfterViewInit, OnDestroy {
  readonly steps = PROCESS_STEPS;

  private readonly animationService = inject(AnimationService);
  readonly stepEls = viewChildren<ElementRef<HTMLElement>>('stepEl');

  ngAfterViewInit(): void {
    this.stepEls().forEach((elRef, i) => {
      this.animationService.observe(
        elRef,
        () => {
          const el = elRef.nativeElement;
          el.style.animationDelay = `${i * 0.15}s`;
          el.classList.add('is-visible');
          el.classList.remove('opacity-0');
        },
        0.15,
      );
    });
  }

  ngOnDestroy(): void {
    this.stepEls().forEach((elRef) => this.animationService.unobserve(elRef));
  }

  trackByStep(_index: number, step: ProcessStep): string {
    return step.id;
  }
}
