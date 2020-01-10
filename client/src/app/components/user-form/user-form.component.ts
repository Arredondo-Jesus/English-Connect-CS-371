import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';
import { Instructor } from 'src/app/models/Instructor';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireBaseUser } from 'src/app/models/fireBaseUser';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  users: any = [];

  instructor: Instructor = {
    id: 0,
    name: '',
    last_name: ''
  };

  rols: any = [
    1,
    2
  ];

  fireBaseUser: FireBaseUser = {
    uid: '',
    email: '',
    disabled: false,
    role: 0,
    roleName: '',
    status: ''
  };

  user: User = {
    uid: '',
    email: '',
    role: 2,
    roleName: '',
  };


  edit = false;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    delete this.user.uid;
    delete this.user.password;
    delete this.user.status;
    delete this.user.number_login;

    const params = this.activatedRoute.snapshot.params;
    if (params.uid) {
      this.userService.getUserById(params.uid)
        .subscribe(
          res => {
            this.fireBaseUser = JSON.parse(res.toString());
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }

  getDBUser(uid: string) {
    this.userService.getUserDB(uid).subscribe(
      res => {
        console.log(res);
        this.user = res;
      },
      err => console.log(err)
    );
    return this.user;
  }

  saveNewUser() {
    delete this.fireBaseUser.password;
    delete this.fireBaseUser.disabled;
    delete this.fireBaseUser.roleName;
    delete this.user.roleName;

    this.user.email = this.fireBaseUser.email;
    this.fireBaseUser.role = this.user.role;
    this.fireBaseUser.status = 'active';

    this.userService.saveUser(this.fireBaseUser).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  editUser() {
    delete this.user.uid;
    delete this.user.status;

    this.userService.updateUsers(this.user.uid, this.user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['users']);
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

    this.userService.updateUsers(this.fireBaseUser.uid, this.user)
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
        );
  }

  signUp() {
  delete this.user.roleName;
  delete this.fireBaseUser.roleName;
  return this.afAuth.auth.createUserWithEmailAndPassword(this.fireBaseUser.email, this.fireBaseUser.password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
        this.afAuth.authState.subscribe( user => {
          if (user) {
            this.fireBaseUser.uid = user.uid;
            this.saveNewUser();
            setTimeout(() => {
              this.router.navigate(['users']);
            }, 500);
          }
        });
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  resetPasword() {
    this.afAuth.auth.sendPasswordResetEmail(this.fireBaseUser.email)
    .then((result) => {
      window.alert('Password has been reset successfully');
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  updateUser() {
    this.updateUser2();
    this.userService.updateUser(this.fireBaseUser.uid, this.fireBaseUser).subscribe(
      res => {
        console.log(res);
        this.fireBaseUser = res;
        this.edit = true;
        this.router.navigate(['users']);
      },
      err => console.log(err)
    );
  }

  getById(uid: string) {
    this.userService.getUserById(uid).subscribe(
      res => {
        this.fireBaseUser = res;
        console.log('Found user ' + this.fireBaseUser.uid);
      },
      err => console.log(err)
    );
  }

  disableUser(disabled: boolean) {
    if (disabled === true) {
      this.fireBaseUser.disabled = false;
    } else if (disabled === false) {
      this.fireBaseUser.disabled = true;
    }
    this.userService.updateUser(this.fireBaseUser.uid, this.fireBaseUser).subscribe(
      res => {
        console.log(this.fireBaseUser);
        this.router.navigate(['users']);
      },
      err => console.log(err)
    );
  }

  deleteFirebaseUser() {
    this.userService.deleteUsersFirebase(this.fireBaseUser.uid).subscribe(
      res => {
        this.afAuth.authState.subscribe( user => {
          if (user) {
            setTimeout(() => {
              this.router.navigate(['users']);
            }, 500);
          }
        });
      },
      err => console.log(err)
    );
  }

  deleteUserDB() {
    this.userService.deleteUsers(this.fireBaseUser.uid).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

}
