import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { FireBaseUser } from 'src/app/models/fireBaseUser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  fireBaseUsers: any = [];
  count = 0;

  user: User = {
    uid: '',
    email: '',
    password: '',
    role: 0,
    status: 'inactive'
  };

  fireBaseUser: FireBaseUser = {
    uid: '',
    email: '',
    disabled: false
  };

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getFirebaseUsers();
    this.getUsersDB();

  }

  getUsersDB() {
    this.userService.getUsersDB().subscribe(
      res => {
        console.log(res);
        this.users = res;
        this.count = this.users.length;
        this.users.forEach(user => {
          this.fireBaseUser.role = user.role;
        });
      },
      err => console.log(err)
    );
  }

  getFirebaseUsers() {
    this.userService.getUsers().subscribe(
      res => {
        console.log(res);
        this.fireBaseUsers = res;
      },
      err => console.log(err)
    );
  }

  getDBUser(uid: string) {
    this.userService.getUserDB(uid).subscribe(
      res => {
        console.log(res);
        this.user = res;
      },
      err => console.log(err)
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        console.log(res);
        this.users = res;
      },
      err => console.log(err)
    );
  }

  deleteUser(uid: string) {
    this.user.uid = uid;
    this.userService.deleteUsers(this.user.uid).subscribe(
      res => {
        console.log(res);
        this.getUsers();
      },
      err => console.log(err)
    );
  }

  getById(uid: string) {
    this.userService.getUserById(uid).subscribe(
      res => {
        this.fireBaseUser = JSON.parse(res.toString());
        console.log('Found user ' + this.fireBaseUser.uid);
        this.router.navigate(['/user/update', this.fireBaseUser.uid]);
      },
      err => console.log(err)
    );
  }

  updateUser2() {
    delete this.user.status;
    delete this.user.number_login;
    delete this.user.password;
    delete this.user.roleName;

    this.user.email = this.fireBaseUser.email;
    const count = this.fireBaseUsers.length;

    this.userService.updateUsers(this.fireBaseUsers[this.fireBaseUsers[count - 1]].uid, this.user)
        .subscribe(
          res => {
            console.log(count);
          },
          err => console.log(err)
        );
  }
}
