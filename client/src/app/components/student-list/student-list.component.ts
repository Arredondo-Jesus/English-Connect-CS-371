import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentsService } from '../../services/students.service';
import { Student } from 'src/app/models/Student';
import { Course } from 'src/app/models/Course';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DecryptService } from '../../services/decrypt.service';
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any = [];
  filteredStudents: any = [];
  permissions: any = [];
  count = 0;
  file: File;

  private searchValue: string;

  student: Student = {
    id: 0,
    status: 'inactive'
  };

  course: Course = {
    id: 0
  };

  delete = false;

  get seachName(): string {
    return this.searchValue;
  }

  set searchName(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterName(value);
    this.count = this.filteredStudents.length;
  }

  filterName(searchString: string) {
    return this.filteredStudents.filter(student =>
      student.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachAge(): string {
    return this.searchValue;
  }

  set searchAge(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterAge(value);
    this.count = this.filteredStudents.length;
  }

  filterAge(searchString: string) {
    return this.filteredStudents.filter(student =>
      student.age.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachEmail(): string {
    return this.searchValue;
  }

  set searchEmail(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterEmail(value);
    this.count = this.filteredStudents.length;
  }

  filterEmail(searchString: string) {
    return this.filteredStudents.filter(student =>
      student.email.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachPhone(): string {
    return this.searchValue;
  }

  set searchPhone(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterPhone(value);
    this.count = this.filteredStudents.length;
  }

  filterPhone(searchString: string) {
    return this.filteredStudents.filter(student =>
      student.phone.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachMember(): string {
    return this.searchValue;
  }

  set searchMember(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterMember(value);
    this.count = this.filteredStudents.length;
  }

  filterMember(searchString: string) {
    return this.filteredStudents.filter(student =>
      student.member.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachWard(): string {
    return this.searchValue;
  }

  set searchWard(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterWard(value);
    this.count = this.filteredStudents.length;
  }

  filterWard(searchString: string) {
    return this.filteredStudents.filter(student =>
      student.ward.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachStatus(): string {
    return this.searchValue;
  }

  set searchStatus(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterStatus(value);
    this.count = this.filteredStudents.length;
  }

  filterStatus(searchString: string) {
    return this.filteredStudents.filter(student =>
      student.status.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachPercentage(): string {
    return this.searchValue;
  }

  set searchPercentage(value: string) {
    this.searchValue = value;
    this.filteredStudents = this.filterPercentage(value);
    this.count = this.filteredStudents.length;
  }

  filterPercentage(searchString: string) {
    return this.filteredStudents.filter(student =>
      student.percentage.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private studentsService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute,
              private userService: UserService, private afAuth: AngularFireAuth,
              private decryptService: DecryptService ) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.getPermissions(this.afAuth.auth.currentUser.email);
      this.getStudentByGroup();
    } else {
      this.getPermissions(this.afAuth.auth.currentUser.email);
      this.getStudents();
    }
  }

  getStudents() {
    this.filteredStudents = [];
    
    this.studentsService.getStudents().subscribe(
      res => {
        this.students = res;
        this.students.forEach(element => {
          this.filteredStudents.push(this.decryptData(element));
        });
        this.count = this.filteredStudents.length;
      },
      err => console.log(err)
    );
  }

  getStudentByGroup() {
    this.course.id = this.activatedRoute.snapshot.params.id;
    this.studentsService.getStudentsInGroup(this.course.id).subscribe(
      res => {
        this.students = res;
        this.students.forEach(element => {
          this.filteredStudents.push(this.decryptData(element));
        });
        this.count = this.filteredStudents.length;
      },
      err => console.log(err)
    );
  }

  deleteStudent(id: number) {
    const params = this.activatedRoute.snapshot.params;
    this.student.id = id;
    this.studentsService.deleteStudent(this.student.id, this.student).subscribe(
      res => {
        if (params.id) {
          this.getStudentByGroup();
        } else {
          this.getStudents();
        }
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

  userDeletionPreference() {
    if (confirm('Are you sure you want to delete this record?') === true) {
      return this.delete = true;
    }
  }

  onFileChange(event: HTMLInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
    }
  }

  onFileUpload () {
    this.studentsService.uploadFile(this.file).subscribe(
      res => {
        this.getStudents();
      },
      err => console.log(err)
    )}

    deleteStudentList(){
      this.studentsService.deleteStudentsList().subscribe(
        res => {
          this.getStudents();
        },
        err => console.log(err)
      )}

      decryptData(element: any) {
        element.name = this.decryptService.decryptData(element.name);
        element.last_name = this.decryptService.decryptData(element.last_name);
        element.email = this.decryptService.decryptData(element.email);
        element.phone = this.decryptService.decryptData(element.phone);
        
        return element;
      }
}
