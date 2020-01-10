import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Course } from '../../models/Course';
import { User } from '../../models/User';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  courses: any = [];
  public permissions: any = [];

  course: Course = {
    id: 0,
    status: 'inactive',
    count: 0
  };

  user: User = {
    username: '',
    password: ''
  };

  constructor(public afAuth: AngularFireAuth, private router: Router, private courseService: CoursesService,
              private userService: UserService) {}

  ngOnInit() {
    this.signOut();
  }

  signIn() {
    return this.afAuth.auth.signInWithEmailAndPassword(this.user.username, this.user.password)
    .then((result) => {
      this.getPermissions(this.user.username);
      this.router.navigate(['courses']);
    }).catch((error) => {
      this.router.navigateByUrl('login');
      window.alert(error.message);
    });
  }

  signUp() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.user.username, this.user.password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
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
        console.log(res);
      },
      err => console.log(err)
    );
  }

  getPermissions(email: string) {
    this.userService.getUserPermissions(email).subscribe(
      res => {
        this.permissions = res;
        console.log(res);
      },
      err => console.log(err)
    );
}
}
