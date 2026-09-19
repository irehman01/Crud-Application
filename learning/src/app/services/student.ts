import { Injectable } from '@angular/core';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students: Student[] = [
    {
      id: 1,
      name: 'Ali',
      email: 'ali@gmail.com',
      age: 22
    },
    {
      id: 2,
      name: 'Ahmed',
      email: 'ahmed@gmail.com',
      age: 24
    }
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(student: Student): void {
    this.students.push(student);
  }

  updateStudent(student: Student): void {
    const index = this.students.findIndex(
      s => s.id === student.id
    );

    if (index !== -1) {
      this.students[index] = student;
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(
      s => s.id !== id
    );
  }
}