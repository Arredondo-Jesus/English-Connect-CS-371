import { TestBed } from '@angular/core/testing';

import { InstructorsService } from './instructors.service';

describe('InstructorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InstructorsService = TestBed.get(InstructorsService);
    expect(service).toBeTruthy();
  });
});
