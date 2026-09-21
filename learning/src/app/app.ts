import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Student } from './models/student';
import { StudentService } from './services/student';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  imports: [FormsModule,RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  students: Student[] = [];

  student: Student = {
    id: 0,
    name: '',
    email: '',
    age: 0
  };

  editing = false;

  constructor(private studentService: StudentService) {
    this.loadStudents();
  }

  loadStudents(): void {
    this.students = this.studentService.getStudents();
  }

  saveStudent(): void {

    if (this.editing) {

      this.studentService.updateStudent(this.student);

    } else {

      const newStudent: Student = {
        ...this.student,
        id: this.students.length + 1
      };

      this.studentService.addStudent(newStudent);
    }

    this.loadStudents();
    this.resetForm();
  }

  editStudent(student: Student): void {
    this.student = { ...student };
    this.editing = true;
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
    this.loadStudents();
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {

    this.student = {
      id: 0,
      name: '',
      email: '',
      age: 0
    };

    this.editing = false;
  }
}