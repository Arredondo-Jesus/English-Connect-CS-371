import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceStudentsListComponent } from './attendance-students-list.component';

describe('AttendanceStudentsListComponent', () => {
  let component: AttendanceStudentsListComponent;
  let fixture: ComponentFixture<AttendanceStudentsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceStudentsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceStudentsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
