import { Component, OnInit, HostBinding } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { Instructor } from 'src/app/models/Instructor';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { CoursesService } from '../../services/courses.service';
import { InstructorsService } from 'src/app/services/instructors.service';
import { EncryptService } from '../../services/encrypt.service';
import { DecryptService } from '../../services/decrypt.service'; 
@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css'],
  providers: [DatePipe]
})
export class CourseFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  instructors: any = [];
  tempInstructors: any = [];
  buildings: any = ['Garcia', 'Libramiento / Lincoln', 'Hacienda / Nogal', 'Valle Verde', 'Fryle / San Bernabe 1 / San Bernanbe 2'];
  days: any = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  course: Course = {
    id: '',
    level: 1,
    generation: '',
    day_1: 'Lunes',
    time_1: '',
    day_2: 'Lunes',
    time_2: '',
    created_at: new Date(),
    status: '',
    start: new Date(),
    instructor_name: '',
    instructor_last_name: ''
  };

  instructor: Instructor = {
    id: 0,
    name: '',
    last_name: ''
  };

  edit = false;
  today: any = new Date();

  constructor(private courseService: CoursesService, private router: Router, private activatedRoute: ActivatedRoute,
              private instructorService: InstructorsService, private datePipe: DatePipe, private encryptDataService: EncryptService,
              private decryptDataService: DecryptService) { 
                  this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
              }

  ngOnInit() {
   this.getCourse();
   this.getInstructors();

   if (this.edit === false) {
    this.course.start = this.today;
   } 
  }

  getCourse() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.courseService.getCourse(params.id)
        .subscribe(
          res => {
            this.course = res;
            this.today = this.datePipe.transform(this.course.start, 'yyyy-MM-dd');
            this.course.start = this.today;
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }

  saveNewCourse() {
    delete this.course.created_at;
    delete this.course.status;

    this.instructors = this.getInstructors();
    this.course.instructor_name = this.instructor.name;
    this.course.instructor_last_name = this.instructor.last_name;

    this.courseService.saveCourse(this.course)
      .subscribe(
        res => {
          this.router.navigate(['courses']);
          this.edit = false;
          console.log(this.course);
        },
         err => console.log(err)
      );

  }

  updateCourse() {
    delete this.course.created_at;
    delete this.course.status;

    this.getInstructor();
    this.course.instructor_name = this.instructor.name;
    this.course.instructor_last_name = this.instructor.last_name;

    this.courseService.updateCourse(this.course.id, this.course)
        .subscribe(
          res => {
            this.edit = true;
            this.router.navigate(['courses']);
          },
          err => console.log(err)
        );
  }

  getInstructors() {
    this.instructorService.getInstructors().subscribe(
      res => {
        this.tempInstructors = res;
        this.tempInstructors.forEach(element => {
          this.instructors.push(this.decryptData(element));   
         });
      },
      err => console.log(err)
    );
  }

  getInstructor(){
    this.instructorService.getInstructor(this.course.instructor_id).subscribe(
      res => {
        this.instructor = res;
      }
    );
  }

  encryptData(){
    this.course.instructor_name = this.encryptDataService.encryptData(this.course.instructor_name);
    this.course.instructor_last_name = this.encryptDataService.encryptData(this.course.instructor_last_name);
  }

  decryptData(element: any) {
    element.name = this.decryptDataService.decryptData(element.name);
    element.last_name = this.decryptDataService.decryptData(element.last_name);
    return element;
}
}

