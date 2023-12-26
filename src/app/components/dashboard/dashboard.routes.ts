import { Routes } from '@angular/router';

import { DashboardGuard } from '../../guards/dashboard/dashboard.guard';
import { ContainerComponent } from './pages/container/container.component';

export const dashboardRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [DashboardGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'vehicles',
        loadChildren: () => import('./modules/vehicles/vehicles.routes').then((r) => r.vehiclesRoutes),
      },
      {
        path: 'accounts',
        loadChildren: () => import('./modules/accounts/accounts.routes').then((r) => r.accountsRoutes),
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
