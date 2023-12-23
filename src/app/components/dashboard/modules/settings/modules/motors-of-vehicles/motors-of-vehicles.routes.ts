import { Routes } from '@angular/router';

import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { EditComponent } from './pages/edit/edit.component';

export const motorsOfVehiclesRoutes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
