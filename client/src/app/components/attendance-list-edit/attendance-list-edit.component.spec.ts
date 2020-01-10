import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceListEditComponent } from './attendance-list-edit.component';

describe('AttendanceListEditComponent', () => {
  let component: AttendanceListEditComponent;
  let fixture: ComponentFixture<AttendanceListEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendanceListEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendanceListEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
