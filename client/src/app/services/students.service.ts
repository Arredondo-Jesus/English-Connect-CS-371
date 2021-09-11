import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student} from '../models/Student';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  HOST = environment.env.HOST;
  API_URI = this.HOST;

  getStudents() {
    return this.http.get(`${this.API_URI}/students`);
  }

  getInactiveStudents() {
    return this.http.get(`${this.API_URI}/students/inactive`);
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

  attendancePerWard() {
    return this.http.get(`${this.API_URI}/students/graphs/attendanceperward`);
  }

  attendancePerStudent() {
    return this.http.get(`${this.API_URI}/students/reports/attendanceperstudent`);
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

  activateStudent(id: string | number, updatedStudent: Student) {
    return this.http.put(`${this.API_URI}/students/activate/${id}`, updatedStudent);
  }

  deleteStudentsList() {
    return this.http.delete(`${this.API_URI}/students/upload`);
  }

  uploadFile(file: File) {
    const formData = new FormData;
    formData.append('csv', file);
    return this.http.post(`${this.API_URI}/students/upload`, formData);
  }
}
