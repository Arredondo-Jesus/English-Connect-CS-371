import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceListRegistrationComponent } from './attendance-list-registration.component';

describe('AttendanceListRegistrationComponent', () => {
  let component: AttendanceListRegistrationComponent;
  let fixture: ComponentFixture<AttendanceListRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceListRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceListRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
