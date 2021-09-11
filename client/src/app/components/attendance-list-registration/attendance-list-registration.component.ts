import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AttendanceService } from '../../services/attendance.service';
import { Student } from '../../models/Student';
import { Course } from '../../models/Course';
import { Attendance } from '../../models/Attendance';
import { DecryptService } from '../../services/decrypt.service';

@Component({
  selector: 'app-attendance-list-registration',
  templateUrl: './attendance-list-registration.component.html',
  styleUrls: ['./attendance-list-registration.component.css'],
  providers: [DatePipe]
})
export class AttendanceListRegistrationComponent implements OnInit {

  today: any = new Date();
  studentList: any = [];
  options: any = [{option: '1'}];
  values: any = [{value: 'Yes'}, {value: 'No'}];

  list : any = [];
  attendanceValues: any = [];
  attendanceList: any = [];
  filteredStudents: any = [];
  encryptedAttendanceList: any = [];
  count = 0;

  private searchValue: string;

  attendance: Attendance  = {
    id: 0,
    date: new Date(),
    attendance_value: 0,
    lesson: 0,
    student_id: 0,
    status: 'active'
  };

  student: Student = {
    id: 0,
    name: '',
    last_name: '',
    status: ''
  };

  course: Course = {
    id: 0,
    status: ''
  };

  edit = false;
  contentEditable = true;

  get seachName(): string {
    return this.searchValue;
  }

  set searchName(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterName(value);
    this.count = this.filteredStudents.length;
  }

  filterName(searchString: string) {
    return this.studentList.filter(student =>
      student.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private attendanceService: AttendanceService, private router: Router, private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe, private decryptService: DecryptService) {
              this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
            }

  ngOnInit() {
    this.getGroup();
    this.getOptions();
    this.attendance.date = this.today;
  }

  getOptions() {
    for (let i = 1; i < 25; i++) {
      let value: any;
      value = i + 1;
      this.options.push({option: value.toString()});
    }
  }

  getGroup() {
    const params = this.activatedRoute.snapshot.params;
    this.course.id = params.id;
    this.attendance.date = params.date;

    if (params.date) {
      this.edit = true;
    } else {
      this. edit = false;
    }

    if (this.edit === false) {
      this.attendanceService.getGroup(this.course.id).subscribe(
        res => {
          this.studentList = res;
          this.studentList.forEach(element => {
            this.filteredStudents.push(this.decryptData(element));
          });

          this.attendance.lesson = 1;
          this.count = this.studentList.length;
          for (const student of this.studentList) {
            this.attendanceValues.push(1);
          }
        },
        err => console.log(err)
      );
    } else if (this.edit === true) {
      this.attendanceService.getAttendanceByGroup(this.course.id, this.attendance.date).subscribe(
        res => {
          this.studentList = res;
          this.studentList.forEach(element => {
            this.filteredStudents.push(this.decryptData(element));
          });
          this.count = this.filteredStudents.length;
          this.today = this.datePipe.transform(this.studentList[0].date, 'yyyy-MM-dd');
          this.attendance.date = this.today;
          this.attendance.lesson = this.studentList[0].lesson;
          for (const student of this.studentList) {
            this.attendanceValues.push(student.attendance_value);
          }
        },
        err => console.log(err)
      );
    }
  }

  getAttendanceByDate() {
    const params = this.activatedRoute.snapshot.params;
    this.course.id = params.id;

    this.attendanceService.geAttendanceByDate(this.course.id).subscribe(
      res => {
        this.attendanceList = res;
        this.count = this.attendanceList.length;
      },
      err => console.log(err)
    );
  }

  updateAttendance() {
    delete this.attendance.status;

    for (let i = 0; i < this.attendanceValues.length; i++) {
      this.attendance.attendance_value = this.attendanceValues[i];
      this.attendance.student_id = this.studentList[i].student_id;
      this.attendance.id = this.studentList[i].id;

      this.getAttendanceAll();

      this.attendanceService.updateAttendance(this.attendance.id, this.attendance).subscribe(
        res => {
          this.edit = true;
          this.router.navigate([`attendance/group/`, this.course.id]);
        },
        err => console.log(err)
      );
    }
  }

  validateAttendanceRegistration() {
    this.attendanceService.getAttendanceByGroup(this.course.id ,this.attendance.date)
    .subscribe(res => {
      this.list = res;
      if (this.list.length > 0) {
        alert('The attendance has already being registered for ' + this.attendance.date)
      } else {
        this.saveNewAttendanceList();
      }
    });
  }

 
  saveNewAttendanceList() {
    delete this.attendance.created_at;
    delete this.attendance.id;
    delete this.attendance.status;

    this.getAttendanceAll();

    for (const attendance of this.attendanceList) {
      this.attendanceService.saveAttendance(attendance)
      .subscribe(
        res => {
          this.getGroup();
          this.router.navigate(['attendance/group/', this.course.id]);
        },
          err => console.log(err)
      );
    }
  } 

  getAttendanceAll() {

    for (let i = 0; i < this.attendanceValues.length; i++) {

      const newAttendance: Attendance = {};
      newAttendance.id = this.attendance.id;
      newAttendance.date = this.attendance.date;
      newAttendance.attendance_value = this.attendanceValues[i];
      newAttendance.lesson = this.attendance.lesson;
      newAttendance.student_id = this.studentList[i].id;
      this.attendanceList[i] = newAttendance;
    }
  }

  toggleEditable(event) {
    if ( event.target.checked ) {
        this.contentEditable = true;
        this.attendanceValues = [];
        for (const student of this.studentList) {
          this.attendanceValues.push(1);
        }
    } else {
      this.contentEditable = false;
      this.attendanceValues = [];
      for (const student of this.studentList) {
        this.attendanceValues.push(0);
      }
    }
    console.log(this.attendanceValues);
  }

  decryptData(element: any) {
    element.name = this.decryptService.decryptData(element.name);
    element.last_name = this.decryptService.decryptData(element.last_name);

    return element;
  }
}
