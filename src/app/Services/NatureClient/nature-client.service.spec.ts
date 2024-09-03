import { TestBed } from '@angular/core/testing';

import { NatureClientService } from './nature-client.service';

describe('NatureClientService', () => {
  let service: NatureClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
