import { TestBed } from '@angular/core/testing';

import { EmployePosteService } from './employe-poste.service';

describe('EmployePosteService', () => {
  let service: EmployePosteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployePosteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
