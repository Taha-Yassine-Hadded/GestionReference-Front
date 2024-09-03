import { TestBed } from '@angular/core/testing';

import { EmployeExperienceService } from './employe-experience.service';

describe('EmployeExperienceService', () => {
  let service: EmployeExperienceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeExperienceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
