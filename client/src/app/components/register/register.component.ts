import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';
import { Course } from 'src/app/models/Course';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  courses: any = [];
  filteredCourses: any = [];
  count = 0;
  currentYear = new Date().getFullYear().toString();

  course: Course = {
    id: '',
    name: '',
    generation: '',
    status: 'inactive',
    count: 0,
    instructor_name: '',
    instructor_last_name: '',
    instructor_email: ''
  };

  private searchValue: string;

  get seachName(): string {
    return this.searchValue;
  }

  set searchName(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterName(value);
    this.count = this.filteredCourses.length;
  }

  filterName(searchString: string) {
    return this.courses.filter(course =>
      course.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachYear(): string {
    return this.searchValue;
  }

  set searchYear(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterYear(value);
    this.count = this.filteredCourses.length;
  }

  filterYear(searchString: string) {
    return this.courses.filter(course =>
      course.year.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachDay(): string {
    return this.searchValue;
  }

  set searchDay(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterDay(value);
    this.count = this.filteredCourses.length;
  }

  filterDay(searchString: string) {
    return this.courses.filter(course =>
      course.day.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachTime(): string {
    return this.searchValue;
  }

  set searchTime(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterTime(value);
    this.count = this.filteredCourses.length;
  }

  filterTime(searchString: string) {
    return this.courses.filter(course =>
      course.time.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachBuilding(): string {
    return this.searchValue;
  }

  set searchBuilding(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterBuilding(value);
    this.count = this.filteredCourses.length;
  }

  filterBuilding(searchString: string) {
    return this.courses.filter(course =>
      course.building.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachStudents(): string {
    return this.searchValue;
  }

  set searchStudents(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterStudents(value);
    this.count = this.filteredCourses.length;
  }

  filterStudents(searchString: string) {
    return this.courses.filter(course =>
      course.count.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
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
    return this.courses.filter(course =>
      course.instructorName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private coursesService: CoursesService, private studentService: StudentsService, private router: Router,
              private userService: UserService, private afAuth: AngularFireAuth, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses().subscribe(
      res => {
        this.courses = res;
        this.filteredCourses = this.filterYear(this.course.generation);
        this.count = this.courses.length;
      },
      err => console.log(err)
    );
  }
}
