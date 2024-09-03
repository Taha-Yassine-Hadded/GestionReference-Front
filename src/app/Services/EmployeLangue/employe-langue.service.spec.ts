import { TestBed } from '@angular/core/testing';

import { EmployeLangueService } from './employe-langue.service';

describe('EmployeLangueService', () => {
  let service: EmployeLangueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeLangueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
