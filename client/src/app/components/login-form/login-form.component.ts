import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Course } from '../../models/Course';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';
import { Permission } from 'src/app/models/Permission';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  courses: any = [];

  public permissions: Permission[] = []
  temp: any = [];

  course: Course = {
    id: 0,
    status: 'inactive',
    count: 0
  };

  user: User = {
    username: '',
    password: '',
    email: ''
  };

  constructor(public afAuth: AngularFireAuth, private router: Router, private courseService: CoursesService,
              private userService: UserService) {}

  ngOnInit() {
    this.signOut();
  }

  signIn() {
    return this.afAuth.auth.signInWithEmailAndPassword(this.user.username, this.user.password)
    .then((result) => {
      this.router.navigate(['courses']);
      this.getPermissions(this.user.username);
    }).catch((error) => {
      this.router.navigateByUrl('login');
      window.alert(error.message);
    });
  }

  signUp() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.user.username, this.user.password)
      .then((result) => {
        window.alert('You have been successfully registered!');
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  resetPasword() {
    this.afAuth.auth.sendPasswordResetEmail(this.user.username)
    .then((result) => {
      window.alert('Password has been reset successfully');
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  getCourses() {
    this.courseService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.log(err)
    );
  }

  getPermissions(email: string) {
    this.userService.getUserPermissions(email).subscribe(
      res => {
        this.temp = res;
        this.permissions = this.temp;
      },
      err => console.log(err)
    );
  }


}
