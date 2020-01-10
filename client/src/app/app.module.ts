import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { InstructorFormComponent } from './components/instructor-form/instructor-form.component';
import { AttendanceFormComponent } from './components/attendance-form/attendance-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';
import { HttpClientModule } from '@angular/common/http';

import { CoursesService} from './services/courses.service';
import { AttendanceService } from './services/attendance.service';
import { InstructorsService } from './services/instructors.service';
import { StudentsService } from './services/students.service';
import { StudentListGroupComponent } from './components/student-list-group/student-list-group.component';
import { AttendanceListRegistrationComponent } from './components/attendance-list-registration/attendance-list-registration.component';
import { AttendanceListEditComponent } from './components/attendance-list-edit/attendance-list-edit.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';

// Import your library
import {FirebaseUIModule, firebase, firebaseui} from 'firebaseui-angular';

import {AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { AuthGuard } from '../app/guards/auth.guard';
import { Resolver } from './resolver';
import { RegisterComponent } from './components/register/register.component';
import { NonAuthNavigationComponent } from './components/non-auth-navigation/non-auth-navigation.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
  ],
  // tosUrl: '<your-tos-link>',
  // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.NONE
};


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    CourseFormComponent,
    StudentFormComponent,
    InstructorFormComponent,
    AttendanceFormComponent,
    AttendanceListComponent,
    LoginFormComponent,
    CourseListComponent,
    StudentListComponent,
    InstructorListComponent,
    StudentListGroupComponent,
    AttendanceListRegistrationComponent,
    AttendanceListEditComponent,
    UserFormComponent,
    UserListComponent,
    RegisterComponent,
    NonAuthNavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireAuthModule
  ],
  providers: [
    CoursesService,
    InstructorsService,
    StudentsService,
    AttendanceService,
    AuthGuard,
    Resolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
