import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShellLayoutModule } from '@readily/shell/layout';
import { shellFeatureRoutes } from './shell-feature.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(shellFeatureRoutes),
    ShellLayoutModule,
  ],
  exports: [RouterModule],
})
export class ShellFeatureModule {}
