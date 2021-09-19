import { Route } from '@angular/router';
import { LayoutComponent } from '@readily/shell/layout';

export const shellFeatureRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () =>
          (await import('@readily/dashboard/feature')).DashboardFeatureModule,
      },
    ],
  },
];
