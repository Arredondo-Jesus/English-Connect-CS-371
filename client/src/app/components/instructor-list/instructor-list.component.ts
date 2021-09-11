import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { InstructorsService } from '../../services/instructors.service';
import { Instructor } from 'src/app/models/Instructor';
import { DecryptService } from '../../services/decrypt.service';
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  instructors: Instructor[] = [];
  filteredInstructors: Instructor[] = [];
  temp: any = [];

  c: any = [];
  count = 0;
  file: File;

  instructor: Instructor = {
    id: 0,
    name: '',
    last_name: '',
    phone: '',
    email: '',
    stake: '',
    status: 'inactive'
  };

  delete = false;
  searchValue = '';


  get seachLastName(): string {
    return this.searchValue;
  }

  set searchLastName(value: string) {
    this.searchValue = value;
    this.filteredInstructors = this.filterLastName(value);
    this.count = this.filteredInstructors.length;
  }

  filterLastName(searchString: string) {
    return this.filteredInstructors.filter(instructor =>
      instructor.last_name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachName(): string {
    return this.searchValue;
  }

  set searchName(value: string) {
    this.searchValue = value;
    this.filteredInstructors = this.filterName(value);
    this.count = this.filteredInstructors.length;
  }

  filterName(searchString: string) {
    return this.filteredInstructors.filter(instructor =>
      instructor.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachEmail(): string {
    return this.searchValue;
  }

  set searchEmail(value: string) {
    this.searchValue = value;
    this.filteredInstructors = this.filterEmail(value);
    this.count = this.filteredInstructors.length;
  }

  filterEmail(searchString: string) {
    return this.filteredInstructors.filter(instructor =>
      instructor.email.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachPhone(): string {
    return this.searchValue;
  }

  set searchPhone(value: string) {
    this.searchValue = value;
    this.filteredInstructors = this.filterPhone(value);
    this.count = this.filteredInstructors.length;
  }

  filterPhone(searchString: string) {
    return this.filteredInstructors.filter(instructor =>
      instructor.phone.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachStake(): string {
    return this.searchValue;
  }

  set searchStake(value: string) {
    this.searchValue = value;
    this.filteredInstructors = this.filterStake(value);
    this.count = this.filteredInstructors.length;
  }

  filterStake(searchString: string) {
    return this.filteredInstructors.filter(instructor =>
      instructor.stake.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private instructorsService: InstructorsService, private router: Router,
            private decryptDataService: DecryptService) { }

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors() {
    this.instructorsService.getInstructors().subscribe(
      res => {
        this.temp = res;
        this.instructors = this.temp;
        
        this.instructors.forEach(element => {
          this.filteredInstructors.push(this.decryptData(element));  
        });

        this.count = this.filteredInstructors.length;
      },
      err => console.log(err)
    );
  }

  deleteInstructor(id: number) {
    this.instructor.id = id;
    this.instructorsService.deleteInstructor(this.instructor.id, this.instructor).subscribe(
      res => {
        this.getInstructors();
      },
      err => console.log(err)
    );
  }

  userDeletionPreference() {
    if (confirm('Are you sure you want to delete this record?') === true) {
      return this.delete = true;
    }
  }

  onFileChange(event: HTMLInputEvent) {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0];
    }
  }

  onFileUpload () {
    this.instructorsService.uploadFile(this.file).subscribe(
      res => {
        this.getInstructors();
      },
      err => console.log(err)
    )}

    deleteInstructorList(){
      this.instructorsService.deleteInstructorList().subscribe(
        res => {
          this.getInstructors();
        },
        err => console.log(err)
      )}

      decryptData(element: any) {
          element.name = this.decryptDataService.decryptData(element.name);
          element.last_name = this.decryptDataService.decryptData(element.last_name);
          element.phone = this.decryptDataService.decryptData(element.phone);
          element.email = this.decryptDataService.decryptData(element.email);
          element.stake = element.stake;
          element.id = element.id;
          element.status = element.status;
         
        return element;
      }
}
