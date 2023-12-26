import { Routes } from '@angular/router';

import { authGuard } from '../../guards/auth/auth.guard';
import { ContainerComponent } from './pages/container/container.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'sign-in',
        loadComponent: () => import('./pages/sign-in/sign-in.component').then((c) => c.SignInComponent),
      },
      {
        path: '**',
        redirectTo: 'sign-in',
      },
    ],
  },
];
