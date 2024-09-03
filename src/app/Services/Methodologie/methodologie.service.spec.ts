import { TestBed } from '@angular/core/testing';

import { MethodologieService } from './methodologie.service';

describe('MethodologieService', () => {
  let service: MethodologieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethodologieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
