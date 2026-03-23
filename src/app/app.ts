import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuraButtonComponent } from './shared/button/aura-button.component';
import { HeroSectionComponent } from './components/hero/hero-section.component';
import { HowItWorksSectionComponent } from './components/how-it-works/how-it-works-section.component';
import { PredictionsDemoSectionComponent } from './components/predictions-demo/predictions-demo-section.component';
import { FeaturesSectionComponent } from './components/features/features-section.component';
import { SocialProofSectionComponent } from './components/social-proof/social-proof-section.component';
import { CtaSectionComponent } from './components/cta/cta-section.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [
    AuraButtonComponent,
    HeroSectionComponent,
    HowItWorksSectionComponent,
    PredictionsDemoSectionComponent,
    FeaturesSectionComponent,
    SocialProofSectionComponent,
    CtaSectionComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
