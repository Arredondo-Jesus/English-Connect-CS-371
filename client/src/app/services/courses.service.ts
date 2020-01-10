import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  PROD = '/api';
  DEV = 'localhost:3000/api';
  API_URI = this.PROD;

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get(`${this.API_URI}/courses`);
  }

  getCourse(id: string | number) {
    return this.http.get(`${this.API_URI}/courses/${id}`);
  }

  getStudentsByGroupId(id: string | number) {
    return this.http.get(`${this.API_URI}/courses/course/${id}`);
  }

  saveCourse(course: Course) {
    return this.http.post(`${this.API_URI}/courses`, course);
  }

  deleteCourse(id: string | number, updatedStatus: Course) {
    return this.http.put(`${this.API_URI}/courses/delete/${id}`, updatedStatus);
  }

  updateCourse(id: string | number, updatedCourse: Course) {
    return this.http.put(`${this.API_URI}/courses/${id}`, updatedCourse);
  }
}
