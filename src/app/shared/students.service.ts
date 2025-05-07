import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StudentDetail } from '../create-student/create-student.configs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  private studentDetails: StudentDetail[] = [
    {
      id: 1,
      firstName: 'Mayuresh',
      lastName: 'Takawane',
      standard: 1,
      gender: 'Male',
      address1: 'Test1',
      address2: 'Test2',
      likesCricket: true,
      likesReading: true,
      likesMusic: true,
    },
  ];

  studentsDetailsObservable = new BehaviorSubject<StudentDetail[]>([
    ...this.studentDetails,
  ]);

  getStudentById(id: number) {
    const student = this.studentDetails.find((x) => x.id === id);
    return student;
  }

  addStudent(student: StudentDetail) {
    this.studentDetails = [...this.studentDetails, student];
    this.studentsDetailsObservable.next(this.studentDetails);
  }

  updateStudent(student: StudentDetail, id: number) {
    const studDetails = this.studentDetails.filter((x) => x.id !== id);
    this.studentDetails = [student, ...studDetails];
    this.studentsDetailsObservable.next(this.studentDetails);
  }

  removeStudent(id: number) {
    this.studentDetails = this.studentDetails.filter((x) => x.id !== id);
    this.studentsDetailsObservable.next(this.studentDetails);
  }
}
