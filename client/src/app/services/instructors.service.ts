import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Instructor } from '../models/Instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private http: HttpClient) { }

  PROD = '/api';
  DEV = 'localhost:3000/api';
  API_URI = this.PROD;

  getInstructors() {
    return this.http.get(`${this.API_URI}/instructors`);
  }

  getInstructor(id: string) {
    return this.http.get(`${this.API_URI}/instructors/${id}`);
  }

  saveInstructor(instructor: Instructor) {
    return this.http.post(`${this.API_URI}/instructors`, instructor);
  }

  deleteInstructor(id: string | number, updatedStatus: Instructor) {
    return this.http.put(`${this.API_URI}/instructors/delete/${id}`, updatedStatus);
  }

  updateInstructor(id: string | number, updatedInstructor: Instructor) {
    return this.http.put(`${this.API_URI}/instructors/${id}`, updatedInstructor);
  }
}
