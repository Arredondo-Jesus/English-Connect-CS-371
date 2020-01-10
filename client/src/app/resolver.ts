import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class Resolver implements Resolve<Observable<string>> {
    constructor(private api: UserService, private afAuth: AngularFireAuth) { }

    resolve(): any {
      return this.api.getUserPermissions(this.afAuth.auth.currentUser.email);
    }
}


