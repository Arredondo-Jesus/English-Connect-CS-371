import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAuthNavigationComponent } from './non-auth-navigation.component';

describe('NonAuthNavigationComponent', () => {
  let component: NonAuthNavigationComponent;
  let fixture: ComponentFixture<NonAuthNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NonAuthNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NonAuthNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
