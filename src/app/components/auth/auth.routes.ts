import { Routes } from '@angular/router';

import { ContainerComponent } from './pages/container/container.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
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
