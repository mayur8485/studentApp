import { Routes } from '@angular/router';
import { CreateStudentComponent } from './create-student/create-student.component';
import { ListStudentComponent } from './list-student/list-student.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'register',
  },
  {
    path: 'register',
    component: CreateStudentComponent,
  },
  {
    path: 'register/:id',
    component: CreateStudentComponent,
  },
  {
    path: 'list',
    component: ListStudentComponent,
  },
  {
    path: '**',
    redirectTo: 'register',
  },
];
