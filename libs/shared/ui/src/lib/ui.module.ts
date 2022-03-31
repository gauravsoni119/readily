import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RatingComponent } from './rating/rating.component';
import { VerticalBarChartNormalizedComponent } from './vertical-bar-chart-normalized/vertical-bar-chart-normalized.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';

const uiModules = [
  MatIconModule,
  MatButtonModule,
  NgxChartsModule,
];

const components = [
  RatingComponent,
  VerticalBarChartNormalizedComponent,
  DoughnutChartComponent,
];

@NgModule({
  imports: [CommonModule, ...uiModules],
  declarations: [...components],
  exports: [...components],
})
export class UiModule { }
