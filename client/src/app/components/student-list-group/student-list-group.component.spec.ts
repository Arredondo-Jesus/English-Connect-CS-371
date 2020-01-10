import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentListGroupComponent } from './student-list-group.component';

describe('StudentListGroupComponent', () => {
  let component: StudentListGroupComponent;
  let fixture: ComponentFixture<StudentListGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentListGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
