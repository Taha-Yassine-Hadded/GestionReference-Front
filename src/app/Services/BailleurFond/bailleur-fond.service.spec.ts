import { TestBed } from '@angular/core/testing';

import { BailleurFondService } from './bailleur-fond.service';

describe('BailleurFondService', () => {
  let service: BailleurFondService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BailleurFondService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
