import { TestBed } from '@angular/core/testing';

import { ReferenceEmployeService } from './reference-employe.service';

describe('ReferenceEmployeService', () => {
  let service: ReferenceEmployeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceEmployeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
