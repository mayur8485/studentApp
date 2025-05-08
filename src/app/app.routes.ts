import { Routes } from '@angular/router';
import { ListStudentComponent } from './list-student/list-student.component';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./create-student/create-student.component').then(
        (m) => m.CreateStudentComponent
      ),
  },
  {
    path: 'register/:id',
    loadComponent: () =>
      import('./create-student/create-student.component').then(
        (m) => m.CreateStudentComponent
      ),
  },
  {
    path: 'list',
    component: ListStudentComponent,
  },
  {
    path: '**',
    redirectTo: 'list',
  },
];
