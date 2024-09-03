import { TestBed } from '@angular/core/testing';

import { EmployeLangueNiveauService } from './employe-langue-niveau.service';

describe('EmployeLangueNiveauService', () => {
  let service: EmployeLangueNiveauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeLangueNiveauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
