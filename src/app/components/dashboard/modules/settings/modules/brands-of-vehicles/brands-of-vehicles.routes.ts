import { Routes } from '@angular/router';

export const brandsOfVehiclesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/list/list.component').then((c) => c.ListComponent),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add/add.component').then((c) => c.AddComponent),
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./pages/edit/edit.component').then((c) => c.EditComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
