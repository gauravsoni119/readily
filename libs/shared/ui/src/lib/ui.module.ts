import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RatingComponent } from './rating/rating.component';
import { VerticalBarChartNormalizedComponent } from './vertical-bar-chart-normalized/vertical-bar-chart-normalized.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { SearchBoxComponent } from './search-box/search-box.component';

const uiModules = [
  MatIconModule,
  MatButtonModule,
  NgxChartsModule,
  MatAutocompleteModule,
];

const components = [
  RatingComponent,
  VerticalBarChartNormalizedComponent,
  DoughnutChartComponent,
  SearchBoxComponent,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...uiModules],
  declarations: [...components],
  exports: [...components],
})
export class UiModule { }
