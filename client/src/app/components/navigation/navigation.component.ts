import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Permission } from 'src/app/models/Permission';
import { timeout } from 'q';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  permissions: any = [];

  permission: Permission = {
    access: 0,
    section: '',
    link: ''
  };

  email = '';
  admin = false;
  i = 0;

  constructor(public afAuth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.email = this.afAuth.auth.currentUser.email;
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
          this.permissions = res;
          console.log(res);
        },
        err => console.log(err)
      );
  }
}
