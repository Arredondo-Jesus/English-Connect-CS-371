import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Attendance } from '../models/Attendance';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  HOST = environment.env.HOST;
  API_URI = this.HOST;

  geAttendance() {
    return this.http.get(`${this.API_URI}/attendance`);
  }

  geAttendanceByDate(id: string | number) {
    return this.http.get(`${this.API_URI}/attendance/group/${id}`);
  }

  getAttendanceByGroup(id: string | number, date: Date) {
    return this.http.get(`${this.API_URI}/attendance/edit/${id}/${date}`);
  }

  getGroup(id: string | number) {
    return this.http.get(`${this.API_URI}/attendance/register/${id}`);
  }

  getOneAttendance(id: string) {
    return this.http.get(`${this.API_URI}/attendance/${id}`);
  }

  saveAttendance(attendance: Attendance) {
    return this.http.post(`${this.API_URI}/attendance`, attendance);
  }

  editAttendance(id: string | number, updateAttendance: Attendance) {
    return this.http.put(`${this.API_URI}/attendance/edit/${id}`, updateAttendance);
  }

  deleteAttendance(id: string | number, updatedStatus: Attendance) {
    return this.http.put(`${this.API_URI}/attendance/delete/${id}`, updatedStatus);
  }

  updateAttendance(id: string | number, updatedAttendance: Attendance) {
    return this.http.put(`${this.API_URI}/attendance/edit/${id}`, updatedAttendance);
  }
}
