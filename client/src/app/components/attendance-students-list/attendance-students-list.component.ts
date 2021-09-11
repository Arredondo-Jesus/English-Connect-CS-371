import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { DecryptService } from '../../services/decrypt.service';

@Component({
  selector: 'app-attendance-students-list',
  templateUrl: './attendance-students-list.component.html',
  styleUrls: ['./attendance-students-list.component.css']
})
export class AttendanceStudentsListComponent implements OnInit {

  constructor(private studentService: StudentsService, private decryptService: DecryptService) { }

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
        //this.filteredStudents = this.attendanceStudents;
        this.attendanceStudents.forEach(element => {
          this.filteredStudents.push(this.decryptData(element));
        });
        this.next = this.filteredStudents.slice();
        this.next.shift();
        this.count = this.filteredStudents.length;
        this.next.push(this.filteredStudents[this.count - 1]);
      },
      err => console.log(err)
    );
  }

  decryptData(element: any) {
    element.instructor_name = this.decryptService.decryptData(element.instructor_name);
    element.instructor_last_name = this.decryptService.decryptData(element.instructor_last_name);

    return element;
  }

}
