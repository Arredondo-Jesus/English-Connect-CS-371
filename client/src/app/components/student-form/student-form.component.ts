import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';


import { StudentsService } from './../../services/students.service';
import { Student } from './../../models/Student';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { DecryptService } from '../../services/decrypt.service';
import { EncryptService } from '../../services/encrypt.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {


  @HostBinding('class') classes = 'row';

  student: Student = {
    id: 0,
    name: '',
    last_name: '',
    email: '',
    phone: '',
    stake: '',
    created_at: new Date(),
    status: '',
    course_id: 0
  };

  edit = false;
  registration = false;

  constructor(private studentsService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute,
              private http: HttpClient, private decryptService: DecryptService, private encryptService: EncryptService) { }

  ngOnInit() {
   this.getStudent();
  }

  getStudent() {
    const params = this.activatedRoute.snapshot.params;
    if (params.sid) {
      this.studentsService.getStudent(params.sid)
        .subscribe(
          res => {
            this.student = res;
            this.decryptData(this.student);
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }

  saveNewStudent() {
    delete this.student.created_at;
    delete this.student.id;
    delete this.student.status;
    this.student.course_id = this.activatedRoute.snapshot.params.cid;

    this.encryptData();

    this.studentsService.saveStudent(this.student.course_id, this.student)
      .subscribe(
        res => {
          console.log(this.activatedRoute.snapshot.params.cid);
          this.router.navigate(['courses']);
          this.registration = true;
        },
         err => {
          console.log(err);
          this.registration = false;
         }
      );

  }

  updateStudent() {
    delete this.student.created_at;
    delete this.student.status;

    this.encryptData();

    this.studentsService.updateStudent(this.student.id, this.student)
        .subscribe(
          res => {
            this.router.navigate(['students']);
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

  encryptData() {
    this.student.name = this.encryptService.encryptData(this.student.name);
    this.student.last_name = this.encryptService.encryptData(this.student.last_name);
    this.student.email = this.encryptService.encryptData(this.student.email);
    this.student.phone = this.encryptService.encryptData(this.student.phone);
  }
}
