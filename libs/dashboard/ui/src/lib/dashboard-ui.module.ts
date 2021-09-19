import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from'@angular/material/progress-bar';
import { UiModule } from '@readily/shared/ui';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { PremiumCardComponent } from './premium-card/premium-card.component';
import { ReadingProgressComponent } from './reading-progress/reading-progress.component';
import { AverageReadingTimeComponent } from './average-reading-time/average-reading-time.component';

const uiModules = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatProgressBarModule,
  UiModule,
];

const components = [
  BookOverviewComponent,
  PremiumCardComponent
];

@NgModule({
  imports: [CommonModule, ...uiModules],
  declarations: [...components, ReadingProgressComponent, AverageReadingTimeComponent],
  exports: [...components, ReadingProgressComponent, AverageReadingTimeComponent],
})
export class DashboardUiModule {}
