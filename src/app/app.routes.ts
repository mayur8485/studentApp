import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register',
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
    loadComponent: () =>
      import('./list-student/list-student.component').then(
        (m) => m.ListStudentComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'register',
  },
];
