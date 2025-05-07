import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { StudentDetail } from '../create-student/create-student.configs';
import { StudentsService } from '../shared/students.service';

import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-list-student',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
  standalone: true,
  templateUrl: './list-student.component.html',
  styleUrl: './list-student.component.css',
})
export class ListStudentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'standard',
    'gender',
    'actions',
  ];
  dataSource = new MatTableDataSource<StudentDetail>();

  private studentSubscription!: Subscription;

  constructor(
    private studentSerivce: StudentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentSubscription =
      this.studentSerivce.studentsDetailsObservable.subscribe({
        next: (students) => {
          this.dataSource.data = students; // only update data
          this.dataSource.paginator = this.paginator; // reattach paginator if needed
        },
      });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    if (this.studentSubscription) {
      this.studentSubscription.unsubscribe();
    }
  }

  onRegisterStudent() {
    this.router.navigate(['/register']);
  }

  onUpdate(element: StudentDetail) {
    this.router.navigate(['/register', element.id]);
  }

  onDelete(element: StudentDetail) {
    this.studentSerivce.removeStudent(element.id);
  }
}
