import { TestBed } from '@angular/core/testing';

import { EmployeDocumentsService } from './employe-documents.service';

describe('EmployeDocumentsService', () => {
  let service: EmployeDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
