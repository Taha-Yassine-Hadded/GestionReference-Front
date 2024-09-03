import { TestBed } from '@angular/core/testing';

import { ReferenceDocumentsService } from './reference-documents.service';

describe('ReferenceDocumentsService', () => {
  let service: ReferenceDocumentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferenceDocumentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
