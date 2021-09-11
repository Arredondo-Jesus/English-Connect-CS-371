import { Component, OnInit, HostBinding } from '@angular/core';
import { InstructorsService } from '../../services/instructors.service';
import { Instructor } from 'src/app/models/Instructor';
import { Router, ActivatedRoute } from '@angular/router';
import { EncryptService } from '../../services/encrypt.service';
import { DecryptService } from '../../services/decrypt.service';
@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit {

  constructor(private instructorService: InstructorsService, private router: Router, private activatedRoute: ActivatedRoute,
              private encryptDataService: EncryptService, private decryptDataService: DecryptService) { }

  @HostBinding ('class') classes = 'row';

  instructor: Instructor = {
    id: 0,
    name: '',
    last_name: '',
    phone: '',
    email: '',
    stake: '',
    created_at: new Date(),
    modified_on: new Date(),
    status: ''
  };

  edit = false;

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.instructorService.getInstructor(params.id)
        .subscribe(
          res => {
            this.instructor = res;
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }

  saveNewInstructor() {
    delete this.instructor.created_at;
    delete this.instructor.id;
    delete this.instructor.status;
    delete this.instructor.modified_on;

    this.encryptData();

    this.instructorService.saveInstructor(this.instructor)
      .subscribe(
        res => {
          this.router.navigate(['instructors']);
        },
         err => console.log(err)
      );

  }
  updateInstructor() {
    delete this.instructor.created_at;
    delete this.instructor.status;
    delete this.instructor.modified_on;

    this.instructorService.updateInstructor(this.instructor.id, this.instructor)
        .subscribe(
          res => {
            this.router.navigate(['instructors']);
          },
          err => console.log(err)
        );
  }

  encryptData(){
    this.instructor.name = this.encryptDataService.encryptData(this.instructor.name);
    this.instructor.last_name = this.encryptDataService.encryptData(this.instructor.last_name);
    this.instructor.phone = this.encryptDataService.encryptData(this.instructor.phone);
    this.instructor.email = this.encryptDataService.encryptData(this.instructor.email);
  }
}
