import { Component, OnInit, HostBinding } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { Instructor } from 'src/app/models/Instructor';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { InstructorsService } from 'src/app/services/instructors.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  instructors: any = [];
  buildings: any = ['Garcia', 'Libramiento / Lincoln', 'Hacienda / Nogal', 'Valle Verde', 'Fryle / San Bernabe 1 / San Bernanbe 2'];
  days: any = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  course: Course = {
    id: 0,
    level: 1,
    year: '',
    day: 'Monday',
    time: '7:00 PM',
    building: 'Garcia',
    created_at: new Date(),
    status: '',
    instructor_id: 0
  };

  instructor: Instructor = {
    id: 0
  };

  edit = false;

  constructor(private courseService: CoursesService, private router: Router, private activatedRoute: ActivatedRoute,
              private instructorService: InstructorsService) { }

  ngOnInit() {
   this.getCourse();
   this.getIntructors();
  }

  getCourse() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.courseService.getCourse(params.id)
        .subscribe(
          res => {
            this.course = res;
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }

  saveNewCourse() {
    delete this.course.created_at;
    delete this.course.id;
    delete this.course.status;

    this.courseService.saveCourse(this.course)
      .subscribe(
        res => {
          this.router.navigate(['courses']);
          this.edit = false;
        },
         err => console.log(err)
      );

  }

  updateCourse() {
    delete this.course.created_at;
    delete this.course.status;

    this.courseService.updateCourse(this.course.id, this.course)
        .subscribe(
          res => {
            this.edit = true;
            this.router.navigate(['courses']);
          },
          err => console.log(err)
        );
  }

  getIntructors() {
    this.instructorService.getInstructors().subscribe(
      res => {
        this.instructors = res;
      },
      err => console.log(err)
    );
  }
}

