import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { Student } from '../../models/Student';
import { Course } from '../../models/Course';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DecryptService } from '../../services/decrypt.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-inactive',
  templateUrl: './list-inactive.component.html',
  styleUrls: ['./list-inactive.component.css']
})
export class ListInactiveComponent implements OnInit {

  constructor(private studentService: StudentsService, private decryptService: DecryptService, 
              private userService: UserService, private afAuth: AngularFireAuth, private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  inactiveStudents: Student[] = [];
  filteredStudents: Student[] = [];
  temp: any = [];
  permissions: any = [];

  count = 0;

  inactiveStudent: Student = {
    id: 0,
    name: '',
    last_name: '',
    phone: '',
    email: '',
    stake: '',
    status: '',
    course_id: ''
  }

  course: Course = {
    id: ''
  };

  ngOnInit() {
    this.getPermissions(this.afAuth.auth.currentUser.email);
    this.getInactiveStudents();
  }

  getStudents() {
    this.filteredStudents = [];
    
    this.studentService.getStudents().subscribe(
      res => {
        this.temp = res;
        this.inactiveStudents = this.temp;
        this.inactiveStudents.forEach(element => {
          this.filteredStudents.push(this.decryptData(element));
        });
        this.count = this.filteredStudents.length;
      },
      err => console.log(err)
    );
  }

  getStudentByGroup() {
    this.course.id = this.activatedRoute.snapshot.params.id;
    this.studentService.getStudentsInGroup(this.course.id).subscribe(
      res => {
        this.temp = res;
        this.inactiveStudents = this.temp;
        this.inactiveStudents.forEach(element => {
          this.filteredStudents.push(this.decryptData(element));
        });
        this.count = this.filteredStudents.length;
      },
      err => console.log(err)
    );
  }

  getInactiveStudents() {
    this.filteredStudents = [];

    this.studentService.getInactiveStudents().subscribe( 
      res => {
      this.temp = res;
      this.inactiveStudents = this.temp;
      this.inactiveStudents.forEach(element => {
        this.filteredStudents.push(this.decryptData(element));
      });
      console.log(res);

      this.count = this.filteredStudents.length;
    },
    err => console.log(err));
  }

  activateStudent(inactiveStudent: Student) {
    delete inactiveStudent.yes;
    delete inactiveStudent.no;

    const params = this.activatedRoute.snapshot.params;
    this.inactiveStudent = inactiveStudent;
    this.inactiveStudent.status = 'active';
    this.studentService.activateStudent(this.inactiveStudent.id, this.inactiveStudent).subscribe(
      res => {
       this.getInactiveStudents();
      },
      err => console.log(err)
    );
  }

  getPermissions(email: string) {
    this.userService.getUserPermissions(email).subscribe(
      res => {
        this.permissions = res;
      },
      err => console.log(err)
    );
  }

  decryptData(element: any) {
    element.name = this.decryptService.decryptData(element.name);
    element.last_name = this.decryptService.decryptData(element.last_name);
    element.email = this.decryptService.decryptData(element.email);
    element.phone = this.decryptService.decryptData(element.phone);
    
    return element;
  }

}
