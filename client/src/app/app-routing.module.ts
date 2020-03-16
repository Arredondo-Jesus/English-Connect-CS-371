import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, CanActivate, Router } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { InstructorFormComponent } from './components/instructor-form/instructor-form.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
import { StudentListGroupComponent } from './components/student-list-group/student-list-group.component';
import { AttendanceListRegistrationComponent } from './components/attendance-list-registration/attendance-list-registration.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { Resolver } from '../app/resolver';
import { RegisterComponent } from './components/register/register.component';
import { GraphsListComponent } from './components/graphs-list/graphs-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'students/graphs/stats',
    component: GraphsListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance/group/:id',
    component: AttendanceListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance/register/:id',
    component: AttendanceListRegistrationComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'attendance/edit/:id/:date',
    component: AttendanceListRegistrationComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'courses',
    component: CourseListComponent
  },
  {
    path: 'course/add',
    component: CourseFormComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'course/edit/:id',
    component: CourseFormComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'course/delete/:id',
    component: CourseListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'instructors',
    component: InstructorListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'instructors/add',
    component: InstructorFormComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'instructor/edit/:id',
    component: InstructorFormComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'instructor/delete/:id',
    component: InstructorListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'students',
    component: StudentListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'student/add/:cid',
    component: StudentFormComponent
  },
  {
    path: 'student/edit/:sid',
    component: StudentFormComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'student/delete/:id',
    component: StudentListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'students/group/:id/:date',
    component: StudentListGroupComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'students/group/:id',
    component: StudentListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'users',
    component: UserListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'users/add',
    component: UserFormComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'users/delete/:id',
    component: UserListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'user/update/:uid',
    component: UserFormComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: 'users/:email',
    component: UserFormComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
