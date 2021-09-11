import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';
import { Course } from 'src/app/models/Course';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DecryptService } from '../../services/decrypt.service';
import { Permission } from 'src/app/models/Permission';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  filteredCourses: Course[] = [];

  public permissions: Permission[] = [{
    id: 0,
    access: 0
  }];

  temp: any = [];
  
  email =  '';
  count = 0;
  file: File;

  private searchValue: string;

  course: Course = {
    id: 0,
    name: '',
    generation: '',
    status: 'inactive',
    count: 0,
    instructor_name: '',
    instructor_last_name: '',
    instructor_email: '',
    instructor_id: 0,
    start: new Date(),
    stake: ''
  };

  admin = false;
  available = true;
  delete = false;
  currentYear = new Date().getFullYear().toString();

  get seachName(): string {
    return this.searchValue;
  }

  set searchName(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterName(value);
    this.count = this.filteredCourses.length;
  }

  filterName(searchString: string) {
    return this.filteredCourses.filter(course =>
      course.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachDay_1(): string {
    return this.searchValue;
  }

  set searchDay_1(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterDay_1(value);
    this.count = this.filteredCourses.length;
  }

  filterDay_1(searchString: string) {
    return this.filteredCourses.filter(course =>
      course.day_1.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachDay_2(): string {
    return this.searchValue;
  }

  set searchDay_2(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterDay_2(value);
    this.count = this.filteredCourses.length;
  }

  filterDay_2(searchString: string) {
    return this.filteredCourses.filter(course =>
      course.day_2.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachTime_1(): string {
    return this.searchValue;
  }

  set searchTime_1(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterTime_1(value);
    this.count = this.filteredCourses.length;
  }

  filterTime_1(searchString: string) {
    return this.filteredCourses.filter(course =>
      course.time_1.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachTime_2(): string {
    return this.searchValue;
  }

  set searchTime_2(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterTime_2(value);
    this.count = this.filteredCourses.length;
  }

  filterTime_2(searchString: string) {
    return this.filteredCourses.filter(course =>
      course.time_2.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachGeneration(): string {
    return this.searchValue;
  }

  set searchGeneration(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterGeneration(value);
    this.count = this.filteredCourses.length;
  }

  filterGeneration(searchString: string) {
    return this.filteredCourses.filter(course =>
      course.generation.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }


  
  get seachStake(): string {
    return this.searchValue;
  }

  set searchStake(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterStake(value);
    this.count = this.filteredCourses.length;
  }

  filterStake(searchString: string) {
    return this.filteredCourses.filter(course =>
      course.stake.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachInstructor(): string {
    return this.searchValue;
  }

  set searchInstructor(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterInstructor(value);
    this.count = this.filteredCourses.length;
  }

  filterInstructor(searchString: string) {
    return this.filteredCourses.filter(course =>
      course.instructor_name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private coursesService: CoursesService, private studentService: StudentsService, private router: Router,
              private userService: UserService, private afAuth: AngularFireAuth, private decryptDataService: DecryptService) { }

  ngOnInit() {
    this.email = this.afAuth.auth.currentUser.email;
    this.getPermissions(this.email);
    this.getCourses();
  }

  getCourses() {
    this.filteredCourses = [];
    this.coursesService.getCourses().subscribe(
      res => {

        this.temp = res;
        this.courses = this.temp;
        
        this.courses.forEach(element => {
          this.filteredCourses.push(this.decryptData(element));  
        });

        this.count = this.filteredCourses.length;
      },
      err => console.log(err)
    );
  }

  deleteCourse(id: number) {
    delete this.course.count;

    this.course.id = id;
    this.coursesService.deleteCourse(this.course.id, this.course).subscribe(
      res =>  {
        this.getCourses();
      },
      err => console.log(err)
    );
  }

  getPermissions(email: string) {
    this.userService.getUserPermissions(email).subscribe(
      res => {
        this.temp = res;
        this.permissions = this.temp;
        if (this.permissions[0].name === 'admin') {
          this.admin = true;
        }
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
  this.coursesService.uploadFile(this.file).subscribe(
    res => {
      this.getCourses();
    },
    err => console.log(err)
  )}

  deleteCourseList(){
    this.coursesService.deleteCourseList().subscribe(
      res => {
        this.getCourses();
      },
      err => console.log(err)
    )}

    decryptData(element: any) {
      
          element.instructor_name = this.decryptDataService.decryptData(element.instructor_name);
          element.instructor_last_name = this.decryptDataService.decryptData(element.instructor_last_name);
          element.instructor_email = this.decryptDataService.decryptData(element.instructor_email);
      return element;
    }

}
