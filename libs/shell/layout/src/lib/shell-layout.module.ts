import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainViewComponent } from './main-view/main-view.component';

const uiModules = [
  LayoutModule,
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatButtonModule
];

@NgModule({
  imports: [CommonModule, RouterModule, ...uiModules],
  declarations: [
    LayoutComponent,
    MainViewComponent
  ],
  exports: [LayoutComponent]
})
export class ShellLayoutModule { }
