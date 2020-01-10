import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  authenticated = false;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      this.afAuth.authState.subscribe(
        res => {
          if (this.afAuth.auth.currentUser) {
            this.authenticated = true;
            this.router.navigate(['/courses']);
          } else if (!this.afAuth.auth.currentUser) {
            this.authenticated = false;
            this.router.navigate(['/login']);
          }
        },
        err => console.log(err)
      );
      return this.authenticated;
  }

  canActivate(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      this.afAuth.authState.subscribe(
        res => {
          if (this.afAuth.auth.currentUser) {
            this.authenticated = true;
          } else if (!this.afAuth.auth.currentUser) {
            this.router.navigate(['/login']);
          }
        },
        err => console.log(err)
      );
      return this.authenticated;
  }

}
