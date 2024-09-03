import { TestBed } from '@angular/core/testing';

import { SituationFamilialeService } from './situation-familiale.service';

describe('SituationFamilialeService', () => {
  let service: SituationFamilialeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SituationFamilialeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
