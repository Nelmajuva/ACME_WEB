import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./components/dashboard/dashboard.routes').then((r) => r.dashboardRoutes),
  },
  {
    path: 'auth',
    loadChildren: () => import('./components/auth/auth.routes').then((r) => r.authRoutes),
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
