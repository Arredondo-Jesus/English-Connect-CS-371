import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Attendance } from '../../models/Attendance';
import { AttendanceService } from '../../services/attendance.service';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css'],
  providers: [DatePipe]
})
export class AttendanceListComponent implements OnInit {

  today: any = new Date();
  attendanceList: any = [];
  options: any = [{option: '1'}];
  count = 0;

  attendance: Attendance = {
    id: 0,
    date: new Date(),
    status: 'inactive'
  };

  course: Course = {
    id: 0
  };

  constructor(private attendanceService: AttendanceService, private router: Router, private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) {
    this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
  }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.course.id = params.id;
    this.attendance.date = params.date;
    this.getOptions();
    this.getAttendanceByDate();
  }

  getOptions() {
    for (let i = 0; i < 25; i++) {
      let value: any;
      value = i + 1;
      this.options[i] = {option: value.toString()};
    }
  }

  getAttendance() {
    this.attendanceService.geAttendance().subscribe(
      res => {
        this.attendanceList = res;
      },
      err => console.log(err)
    );
  }

  getAttendanceByDate() {
    this.attendanceService.geAttendanceByDate(this.course.id).subscribe(
      res => {
        this.attendanceList = res;
        this.count = this.attendanceList.length;
      },
      err => console.log(err)
    );
  }

  deleteAttendance(id: number) {
    this.attendance.id = id;
    this.attendanceService.deleteAttendance(this.attendance.id, this.attendance).subscribe(
      res => {
        this.getAttendance();
      },
      err => console.log(err)
    );
  }
}
