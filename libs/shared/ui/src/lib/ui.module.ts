import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { RatingComponent } from './rating/rating.component';
import { VerticalBarChartNormalizedComponent } from './vertical-bar-chart-normalized/vertical-bar-chart-normalized.component';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { SearchBoxComponent } from './search-box/search-box.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { DropContainerDirective } from './drop-container/drop-container.directive';

const uiModules = [
  MatIconModule,
  MatButtonModule,
  NgxChartsModule,
  MatSnackBarModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
];

const components = [
  RatingComponent,
  VerticalBarChartNormalizedComponent,
  DoughnutChartComponent,
  SearchBoxComponent,
  FileUploaderComponent,
  DropContainerDirective,
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...uiModules],
  declarations: [...components],
  exports: [...components, FileUploaderComponent, DropContainerDirective],
})
export class UiModule { }
