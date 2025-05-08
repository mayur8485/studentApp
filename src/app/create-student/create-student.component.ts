import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

import { STANDARDS } from './create-student.configs';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../shared/students.service';

@Component({
  selector: 'app-create-student',
  imports: [
    NgFor,
    NgIf,
    NgClass,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatGridListModule,
    MatDividerModule,
  ],
  standalone: true,
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.css',
})
export class CreateStudentComponent implements OnInit {
  standards: any[] = STANDARDS;
  form!: FormGroup;

  mode: 'CREATE' | 'UPDATE' = 'CREATE';
  editStudentId: number = -1;

  hasError: boolean = false;
  genderHasError: boolean = false;
  formSubmitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentsService
  ) {
    this.prepareForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.onModeSet(id);
    });
  }

  onModeSet(id: any) {
    this.mode = id ? 'UPDATE' : 'CREATE';
    this.editStudentId = id ? parseInt(id) : -1;
    this.hasError = false;
    if (this.mode === 'CREATE') {
      this.form.reset();
    } else {
      const studentInfo = this.studentService.getStudentById(parseInt(id));
      if (studentInfo) {
        this.form.patchValue(studentInfo);
      } else {
        this.onModeSet(null);
      }
    }
  }

  prepareForm() {
    this.form = this.fb.group({
      firstName: [''],
      lastName: [''],
      address1: [''],
      address2: [''],
      gender: [''],
      standard: [''],
      likesCricket: [false],
      likesReading: [false],
      likesMusic: [false],
    });

    // This is to chnage error message from enable to disable if form is valid
    this.form.valueChanges.subscribe(() => {
      if (this.formSubmitted) {
        this.hasError = !this.form.valid;
      }
    });
  }

  onGenderSelected() {
    this.genderHasError = false;
  }

  getRandomId() {
    return new Date().getTime();
  }

  navigateToList() {
    this.router.navigate(['/list']);
  }

  createStudent(studentInfo: any) {
    studentInfo['id'] = this.getRandomId();
    this.studentService.addStudent(studentInfo);
  }

  updateStudent(studentInfo: any) {
    this.studentService.updateStudent(
      { ...studentInfo, id: this.editStudentId },
      this.editStudentId
    );
  }

  submit() {
    this.formSubmitted = true;
    if (this.form.valid) {
      const studentInfo = this.form.value;
      if (this.mode === 'CREATE') {
        this.createStudent(studentInfo);
      } else {
        this.updateStudent(studentInfo);
      }
      this.navigateToList();
      this.form.reset();
      this.editStudentId = -1;
    } else {
      this.hasError = true;
      this.genderHasError =
        this.form.get('gender')?.hasError('required') || false;
    }
  }

  onCancel() {
    this.navigateToList();
  }
}
