import { Routes } from '@angular/router';

import { ContainerComponent } from './pages/container/container.component';

export const settingsRoutes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        loadComponent:  () => import('./pages/start/start.component').then((c) => c.StartComponent),
      },
      {
        path: 'cities',
        loadChildren: () => import('./modules/cities/cities.routes').then((r) => r.citiesRoutes),
      },
      {
        path: 'motors-of-vehicles',
        loadChildren: () => import('./modules/motors-of-vehicles/motors-of-vehicles.routes').then((r) => r.motorsOfVehiclesRoutes),
      },
      {
        path: 'types-of-vehicles',
        loadChildren: () => import('./modules/types-of-vehicles/types-of-vehicles.routes').then((r) => r.typesOfVehiclesRoutes),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
