import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DashboardUiModule } from '@readily/dashboard/ui';
import { DashboardComponent } from './dashboard.component';

const uiModules = [
  MatListModule,
  MatButtonModule,
  DashboardUiModule,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent },
    ]),
    ...uiModules,
  ],
  declarations: [DashboardComponent],
})
export class DashboardFeatureModule {}
