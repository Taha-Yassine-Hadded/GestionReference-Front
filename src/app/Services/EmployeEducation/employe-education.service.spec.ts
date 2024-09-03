import { TestBed } from '@angular/core/testing';

import { EmployeEducationService } from './employe-education.service';

describe('EmployeEducationService', () => {
  let service: EmployeEducationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeEducationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
