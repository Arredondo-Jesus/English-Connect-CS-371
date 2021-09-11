import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Permission } from 'src/app/models/Permission';
import { User } from '../../models/User'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public permissions: Permission[] = [];

  temp: any = [];

  permission: Permission = {
    access: 0,
    section: '',
    link: '',
    group: ''
  };

  user: User = {
    role: 0
  }

  email = '';
  admin = false;
  i = 0;
  uid = '';

  constructor(public afAuth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.email = this.afAuth.auth.currentUser.email;
    this.uid = this.afAuth.auth.currentUser.uid
    this.getUser();
    this.getPermissions(this.email);
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  getPermissions(email: string) {
      this.userService.getUserPermissions(email).subscribe(
        res => {
          this.temp = res;
          this.permissions = this.temp;
          return this.permissions;
        },
        err => console.log(err)
      );
  }

  getUser() {
    this.userService.getUserDB(this.uid).subscribe(
      res => {
        this.user = res;
      },
      err => console.log(err)
    );
  }
}
