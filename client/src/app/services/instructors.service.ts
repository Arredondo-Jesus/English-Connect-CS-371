import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Instructor } from '../models/Instructor';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private http: HttpClient) { }

  HOST = environment.env.HOST;
  API_URI = this.HOST;

  getInstructors() {
    return this.http.get(`${this.API_URI}/instructors`);
  }

  getInstructor(id: string | number) {
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

  deleteInstructorList() {
    return this.http.delete(`${this.API_URI}/instructors/uploaded`);
  }

  uploadFile(file: File) {
    const formData = new FormData;
    formData.append('csv', file);
    return this.http.post(`${this.API_URI}/instructors/upload`, formData);
  }
}
