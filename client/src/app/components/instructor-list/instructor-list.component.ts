import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InstructorsService } from '../../services/instructors.service';
import { Instructor } from 'src/app/models/Instructor';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  instructors: any = [];
  count = 0;

  intructor: Instructor = {
    id: 0,
    status: 'inactive'
  };

  delete = false;

  constructor(private instructorsService: InstructorsService, private router: Router) { }

  ngOnInit() {
    this.getIntructors();
  }

  getIntructors() {
    this.instructorsService.getInstructors().subscribe(
      res => {
        this.instructors = res;
        this.count = this.instructors.length;
      },
      err => console.log(err)
    );
  }

  deleteInstructor(id: number) {
    this.intructor.id = id;
    this.instructorsService.deleteInstructor(this.intructor.id, this.intructor).subscribe(
      res => {
        console.log(res);
        this.getIntructors();
      },
      err => console.log(err)
    );
  }

  userDeletionPreference() {
    if (confirm('Are you sure you want to delete this record?') === true) {
      return this.delete = true;
    }
  }

}
