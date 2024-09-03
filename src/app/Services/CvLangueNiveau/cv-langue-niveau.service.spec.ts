import { TestBed } from '@angular/core/testing';

import { CvLangueNiveauService } from './cv-langue-niveau.service';

describe('CvLangueNiveauService', () => {
  let service: CvLangueNiveauService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvLangueNiveauService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
