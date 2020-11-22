import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';

@Component({
  selector: 'app-attendance-students-list',
  templateUrl: './attendance-students-list.component.html',
  styleUrls: ['./attendance-students-list.component.css']
})
export class AttendanceStudentsListComponent implements OnInit {

  constructor(private studentService: StudentsService) { }

  attendanceStudents: any = [];
  filteredStudents: any = [];
  next: any = [];
  count = 0;

  ngOnInit() {
    this.getAttendancePerUserReport();
  }

  getAttendancePerUserReport() {
    this.studentService.attendancePerStudent().subscribe(
      res => {
        this.attendanceStudents = res;
        this.filteredStudents = this.attendanceStudents;
        this.next = this.filteredStudents.slice();
        this.next.shift();
        this.count = this.filteredStudents.length;
        this.next.push(this.filteredStudents[this.count - 1]);
      },
      err => console.log(err)
    );
  }

}
