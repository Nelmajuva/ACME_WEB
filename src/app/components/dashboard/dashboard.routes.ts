import { Routes } from '@angular/router';

import { ContainerComponent } from './pages/container/container.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./modules/vehicles/vehicles.routes').then((r) => r.authRoutes),
      },
      {
        path: 'settings',
        loadChildren: () => import('./modules/settings/settings.routes').then((r) => r.settingsRoutes),
      },
      {
        path: '**',
        redirectTo: '',
      }
    ],
  },
];
