import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';


import { StudentsService } from './../../services/students.service';
import { Student } from './../../models/Student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {


  @HostBinding('class') classes = 'row';

  wards: any = ['Garcia', 'Lincoln', 'Libramiento', 'Hacienda', 'Nogal', 'San Bernabe 1', 'San Bernabe 2', 'Frayle', 'Valle Verde' ];
  ages: any = ['Mayor de 18', 'Entre 12 y 17'];
  members: any = ['Miembro de la Iglesia', 'No miembro de la iglesia'];

  student: Student = {
    id: 0,
    name: '',
    last_name: '',
    age: '',
    email: '',
    phone: '',
    created_at: new Date(),
    status: '',
    course_id: 0,
    member: '',
    ward: ''
  };

  edit = false;
  registration = false;

  constructor(private studentsService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.getStudent();
  }

  getStudent() {
    const params = this.activatedRoute.snapshot.params;
    if (params.sid) {
      this.studentsService.getStudent(params.sid)
        .subscribe(
          res => {
            console.log(res);
            this.student = res;
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

    this.studentsService.saveStudent(this.student.course_id, this.student)
      .subscribe(
        res => {
          console.log(this.activatedRoute.snapshot.params.cid);
          this.router.navigate(['student/add']);
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

    this.studentsService.updateStudent(this.student.id, this.student)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['students']);
          },
          err => console.log(err)
        );
  }
}
