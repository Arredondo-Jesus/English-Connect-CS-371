import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Student } from '../../models/Student';
import { StudentsService} from '../../services/students.service';
import { Course } from 'src/app/models/Course';
import { Attendance } from 'src/app/models/Attendance';
import { AttendanceService } from '../../services/attendance.service';
import { DecryptService } from '../../services/decrypt.service';

@Component({
  selector: 'app-student-list-group',
  templateUrl: './student-list-group.component.html',
  styleUrls: ['./student-list-group.component.css']
})
export class StudentListGroupComponent implements OnInit {

  students: any = [];
  encryptedStudents: any = [];
  count = 0;

  edit = false;

  student: Student = {
    id: 0,
    status: 'inactive'
  };
  course: Course = {
    id: 0
  };

  attendance: Attendance = {
    id: 0,
    date: new Date(),
    attendance_value: 0,
    lesson: 0
  };

  constructor(private studentService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute,
              private attendaceService: AttendanceService, private decryptService: DecryptService) { }

  ngOnInit() {
    this.getByGroup();
  }

  getByGroup() {
    this.course.id = this.activatedRoute.snapshot.params.id;
    this.attendance.date = this.activatedRoute.snapshot.params.date;


    this.studentService.getStudentsByGroup(this.course.id, this.attendance.date).subscribe(
      res => {
        this.encryptedStudents = res;
        this.encryptedStudents.forEach(element => {
          this.students.push(this.decryptData(element));
        });
        this.count = this.students.length;
      },
      err => console.log(err)
    );
  }

  updateAttendance(id: string) {
    this.attendance.date = this.activatedRoute.snapshot.params.date;
    this.attendaceService.updateAttendance(id, this.attendance).subscribe(
      res => {
        this.getByGroup();
        this.edit = true;
      },
      err => console.log(err)
    );
  }

  decryptData(element: any) {
    element.name = this.decryptService.decryptData(element.name);
    element.last_name = this.decryptService.decryptData(element.last_name);

    return element;
  }

}
