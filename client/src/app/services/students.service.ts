import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student} from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  PROD = '/api';
  DEV = 'localhost:3000/api';
  API_URI = this.PROD;

  getStudents() {
    return this.http.get(`${this.API_URI}/students`);
  }

  getStudent(id: string | number) {
    return this.http.get(`${this.API_URI}/students/${id}`);
  }

  getStudentsByGroup(id: string | number, date: Date | string) {
    return this.http.get(`${this.API_URI}/students/group/${id}/${date}`);
  }

  getStudentsInGroup(id: string | number) {
    return this.http.get(`${this.API_URI}/students/group/${id}`);
  }

  countPerWard() {
    return this.http.get(`${this.API_URI}/students/graphs/stats`);
  }

  saveStudent(id: string | number, student: Student) {
    return this.http.post(`${this.API_URI}/students/add/${id}`, student);
  }

  deleteStudent(id: string | number, updatedStatus: Student) {
    return this.http.put(`${this.API_URI}/students/delete/${id}`, updatedStatus);
  }

  updateStudent(id: string | number, updatedStudent: Student) {
    return this.http.put(`${this.API_URI}/students/${id}`, updatedStudent);
  }
}
